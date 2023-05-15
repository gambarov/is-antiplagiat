import { Injectable } from '@nestjs/common';
import { CrudService } from '../shared/crud/crud-service.mixin';
import { EnrollmentEntity } from './entities/enrollment.entity';

@Injectable()
export class EnrollmentService extends CrudService(EnrollmentEntity) {}
