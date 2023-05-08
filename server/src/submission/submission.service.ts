import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/crud/crud-service.mixin';
import { SubmissionEntity } from './entities/submission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubmissionService extends CrudService(SubmissionEntity) {
    constructor(
        @InjectRepository(SubmissionEntity)
        private readonly courseRepo: Repository<SubmissionEntity>,
    ) {
        super();
    }
}
