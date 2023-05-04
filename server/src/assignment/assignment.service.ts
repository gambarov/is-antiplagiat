import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentEntity } from './entities/assignment.entity';
import { Repository } from 'typeorm';
import { CrudService } from 'src/shared/crud/crud-service.mixin';

@Injectable()
export class AssignmentService extends CrudService(AssignmentEntity) {
    constructor(
        @InjectRepository(AssignmentEntity)
        private assignmentRepo: Repository<AssignmentEntity>,
    ) {
        super();
    }
}
