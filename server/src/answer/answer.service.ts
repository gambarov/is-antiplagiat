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

@Injectable()
export class AnswerService extends CrudService(AnswerEntity) {
    constructor(
        @InjectRepository(AnswerEntity)
        private answerRepo: Repository<AnswerEntity>,
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
        const fileName = await this.fileService.uploadFile(file);

        const DocId = await this.antiplagiatService.uploadWork({
            data: {
                FileName: parse(file.originalname).name,
                FileType: parse(file.originalname).ext,
                Data: file.buffer.toString('base64'),
                ExternalUserID: 'fenditester',
            },
        });

        const answer = this.answerRepo.create({
            ...dto,
            file_url: fileName,
            result: this.resultRepo.create({ DocId }),
        });
        await this.answerRepo.save(answer);
        return answer;
    }

    async check(dto: CheckAnswerDTO) {
        return await this.antiplagiatService.checkWork(dto.docId);
    }

    async getStatus({ docId }: CheckAnswerDTO) {
        const status = await this.antiplagiatService.checkStatusWork(docId);

        if (status.Status == 'Ready') {
            const result = await this.resultRepo.findOneBy({
                DocId: docId,
            });

            if (result.Status != AnswerResultStatus.Ready) {
                this.resultRepo.update(
                    { DocId: docId },
                    {
                        ...result,
                        ...status.Summary.DetailedScore,
                        IsSuspicious: status.Summary.IsSuspicious,
                        Status: AnswerResultStatus.Ready,
                    },
                );
            }
        }

        return status;
    }
}
