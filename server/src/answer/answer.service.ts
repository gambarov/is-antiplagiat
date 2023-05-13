import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AntiplagiatService } from 'src/antiplagiat/antiplagiat.service';
import { FileService } from 'src/file/file.service';
import { parse } from 'path';
import { AnswerEntity } from './entites/answer.entity';
import { AnswerResultEntity } from './entites/answer-result.entity';
import { UploadAnswerDTO } from './dto/upload-answer.dto';
import { CheckAnswerDTO } from './dto/check-answer.dto';
import { AnswerResultStatus } from './enums/answer-result-status.enum';
import { CrudService } from 'src/shared/crud/crud-service.mixin';
import { AnswerStatus } from './enums/answer-status.enum';
import { SubmissionStatus } from '../submission/enums/submission-status.enum';

@Injectable()
export class AnswerService extends CrudService(AnswerEntity) {
    constructor(
        @InjectRepository(AnswerResultEntity)
        private resultRepo: Repository<AnswerResultEntity>,
        private antiplagiatService: AntiplagiatService,
        private fileService: FileService,
    ) {
        super();
    }

    async upload(
        dto: UploadAnswerDTO,
        file: Express.Multer.File,
    ): Promise<AnswerEntity> {
        // FIXME: Перенести часть логики в SubmissionService

        // TODO: Студент не может загрузить ответ на задание,
        // если он уже загружал ответ на это задание И (ответ еще не прошел проверку или проверка прошла успешно)
        // Загрузка возможно, если студент еще не загружал работу
        // или работа не прошла проверку и была добавлена новая попыка.

        const fileName = await this.fileService.uploadFile(file);

        const DocId = await this.antiplagiatService.uploadWork({
            data: {
                FileName: parse(file.originalname).name,
                FileType: parse(file.originalname).ext,
                Data: file.buffer.toString('base64'),
                ExternalUserID: 'fenditester',
            },
        });
        // FIXME:
        // Заметка: не получается обновить только часть объекта, если попытаться, то создается новый с null полями!
        const { id } = await this.createOne({
            ...dto,
            file_url: fileName,
            result: this.resultRepo.create({ DocId }),
        });
        const answer = await this.findByIdOrFail(id, {
            relations: ['submission'],
        });
        answer.submission.status = SubmissionStatus.PENDING;
        return await this.updateOne(answer.id, answer);
    }

    async check(dto: CheckAnswerDTO) {
        return await this.antiplagiatService.checkWork(dto.docId);
    }

    async getStatus({ docId }: CheckAnswerDTO) {
        const status = await this.antiplagiatService.checkStatusWork(docId);

        // Работа прошла проверку
        if (status.Status == 'Ready') {
            const result = await this.resultRepo.findOne({
                where: { DocId: docId },
                relations: ['answer'],
            });

            // Результат еще не обновлялся
            if (result.Status != AnswerResultStatus.Ready) {
                await this.resultRepo.update(
                    { DocId: docId },
                    {
                        ...result,
                        ...status.Summary.DetailedScore,
                        IsSuspicious: status.Summary.IsSuspicious,
                        Status: AnswerResultStatus.Ready,
                    },
                );

                // TODO: проверка результатов работы (проверка пройдена успешно или нет)
                // Success on
                // > 50% при бакалавриате
                // > % при магистратуре

                // FIXME:
                const answer = await this.findByIdOrFail(result.answer.id, {
                    relations: ['submission'],
                });
                answer.status = AnswerStatus.PASSED;
                answer.submission.status = SubmissionStatus.PASSED;
                await this.updateOne(answer.id, answer);
            }
        }

        return status;
    }
}
