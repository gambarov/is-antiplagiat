import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkEntity } from './work.entity';
import { UploadWorkDTO } from './dto/upload-work.dto';
import { WorkResultEntity } from './work-result.entity';
import { AntiplagiatService } from 'src/antiplagiat/antiplagiat.service';
import { FileService } from 'src/file/file.service';
import { parse } from 'path';
import { CheckWorkDTO } from './dto/check-work.dto';
import { WorkResultStatus } from './work-result-status.enum';

@Injectable()
export class WorkService {
    constructor(
        @InjectRepository(WorkEntity) private workRepo: Repository<WorkEntity>,
        @InjectRepository(WorkResultEntity)
        private workResultRepo: Repository<WorkResultEntity>,
        private antiplagiatService: AntiplagiatService,
        private fileService: FileService,
    ) {}

    async uploadWork(
        dto: UploadWorkDTO,
        file: Express.Multer.File,
    ): Promise<WorkEntity> {
        const fileName = await this.fileService.uploadFile(file);

        const DocId = await this.antiplagiatService.uploadWork({
            data: {
                FileName: parse(file.originalname).name,
                FileType: parse(file.originalname).ext,
                Data: file.buffer.toString('base64'),
                ExternalUserID: 'fenditester',
            },
        });
        const result = await this.workResultRepo.save(
            this.workResultRepo.create({ DocId }),
        );

        const work = this.workRepo.create({
            ...dto,
            file_url: fileName,
            result: result,
        });
        await this.workRepo.save(work);
        return work;
    }

    async checkWork(dto: CheckWorkDTO) {
        return await this.antiplagiatService.checkWork(dto.docId);
    }

    async checkWorkStatus({ docId }: CheckWorkDTO) {
        const status = await this.antiplagiatService.checkStatusWork(docId);

        if (status.Status == 'Ready') {
            const result = await this.workResultRepo.findOneBy({
                DocId: docId,
            });

            if (result.Status != WorkResultStatus.Ready) {
                this.workResultRepo.update(
                    { DocId: docId },
                    {
                        ...result,
                        ...status.Summary.DetailedScore,
                        IsSuspicious: status.Summary.IsSuspicious,
                        Status: WorkResultStatus.Ready,
                    },
                );
            }
        }

        return status;
    }

    async getWorks() {
        return await this.workRepo.find({ relations: ['result'] });
    }
}
