import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { Repository } from 'typeorm';
import { CrudService } from 'src/shared/crud/crud-service.mixin';

@Injectable()
export class CourseService extends CrudService(CourseEntity) {
    constructor(
        @InjectRepository(CourseEntity)
        private courseRepo: Repository<CourseEntity>,
    ) {
        super();
    }
}
