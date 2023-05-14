import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AntiplagiatService } from 'src/antiplagiat/antiplagiat.service';
import { FileService } from 'src/file/file.service';
import { parse } from 'path';
import { AnswerEntity } from './entites/answer.entity';
import { AnswerResultEntity } from './entites/answer-result.entity';
import { CheckAnswerDTO } from './dto/check-answer.dto';
import { AnswerResultStatus } from './enums/answer-result-status.enum';
import { CrudService } from 'src/shared/crud/crud-service.mixin';
import { AnswerStatus } from './enums/answer-status.enum';
import { SubmissionStatus } from '../submission/enums/submission-status.enum';
import { UserEntity } from '../user/entities/user.entity';
import { SubmissionEntity } from '../submission/entities/submission.entity';
import { SubmissionService } from '../submission/submission.service';
import { StudentEntity } from '../user/entities/student.entity';
import { StudentEduType } from '../user/enums/student-edu-type.enum';

@Injectable()
export class AnswerService extends CrudService(AnswerEntity) {
    constructor(
        @InjectRepository(AnswerResultEntity)
        private resultRepo: Repository<AnswerResultEntity>,
        private antiplagiatService: AntiplagiatService,
        private fileService: FileService,
        private submService: SubmissionService,
    ) {
        super();
    }

    async upload(
        user: UserEntity,
        submission: SubmissionEntity,
        file: Express.Multer.File,
    ): Promise<AnswerEntity> {
        if (!this.canUpload(submission))
            throw new ConflictException(
                'Загрузка ответа в данный момент невозможна',
            );

        const fileName = await this.fileService.uploadFile(file);

        const DocId = await this.antiplagiatService.uploadWork({
            data: {
                FileName: parse(file.originalname).name,
                FileType: parse(file.originalname).ext,
                Data: file.buffer.toString('base64'),
                ExternalUserID: user.student.ExternalUserID,
            },
        });
        // FIXME: Добавить работу в очередь для отправки на проверку
        await this.antiplagiatService.checkWork(DocId);

        const answer = this.repo.create({
            file_url: fileName,
            result: this.resultRepo.create({
                DocId,
                Status: AnswerResultStatus.InProgress,
            }),
        });
        submission.answers = [...submission.answers, answer];
        submission.status = SubmissionStatus.PENDING;
        await this.submService.repo.save(submission);
        return answer;
    }

    async getStatus(
        user: UserEntity,
        submission: SubmissionEntity,
        { docId }: CheckAnswerDTO,
    ) {
        const status = await this.antiplagiatService.checkStatusWork(docId);
        const result = await this.resultRepo.findOne({
            where: { DocId: docId },
            relations: ['answer'],
        });

        // Если работа еще проверена или результаты уже были занесены
        if (
            status.Status in ['InProgress', 'None'] ||
            result.Status in
                [AnswerResultStatus.Ready, AnswerResultStatus.Failed]
        )
            return result;

        // Работа прошла проверку
        if (status.Status == 'Ready') {
            // TODO: Если студент не прошел, то нужно открыть новую попытку
            result.answer.status = this.getStudentVerdict(
                user.student,
                status.Summary.DetailedScore.Unknown,
            );
            // FIXME: Думаю есть более хороший вариант для этого
            submission.status =
                result.answer.status == AnswerStatus.FAILED
                    ? SubmissionStatus.FAILED
                    : SubmissionStatus.PASSED;
        } else if (status.Status == 'Failed') {
            result.answer.status = AnswerStatus.FAILED;
            submission.comment = status.FailDetails;
            submission.status = SubmissionStatus.FAILED;
        }

        await this.resultRepo.update(
            { DocId: docId },
            {
                ...result,
                ...status.Summary.DetailedScore,
                IsSuspicious: status.Summary.IsSuspicious,
                Status: status.Status as AnswerResultStatus,
            },
        );
        await this.submService.repo.save(submission);

        return status;
    }

    // FIXME: Вынести логику, сделать проценту конфигурируемыми
    private getStudentVerdict(
        student: StudentEntity,
        score: number,
    ): AnswerStatus {
        const requirements = {
            [StudentEduType.BACHELOR]: 50,
            [StudentEduType.SPECIALIST]: 60,
            [StudentEduType.MASTER]: 70,
            [StudentEduType.POSTGRADUATE]: 75,
        };

        return score >= requirements[student.edu_type]
            ? AnswerStatus.PASSED
            : AnswerStatus.FAILED;
    }

    private canUpload(submission: SubmissionEntity): boolean {
        const noUploadStatuses = [
            SubmissionStatus.PENDING,
            SubmissionStatus.PASSED,
            SubmissionStatus.ON_REVIEW,
        ];

        if (submission.status in noUploadStatuses) return false;

        return true;
    }
}
