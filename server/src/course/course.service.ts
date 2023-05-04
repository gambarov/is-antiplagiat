import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { RequestManyDTO } from 'src/shared/crud/dto/request-many.dto';
import { ResponseManyDTO } from 'src/shared/crud/dto/response-many.dto';
import { CrudService } from 'src/shared/crud/crud-service.mixin';

@Injectable()
export class CourseService extends CrudService(CourseEntity) {
    constructor(
        @InjectRepository(CourseEntity)
        private courseRepo: Repository<CourseEntity>,
    ) {
        super(courseRepo);
    }

    async findByIdOrFail(id: number): Promise<CourseEntity> {
        return await super.findByIdOrFail(id, {
            relations: ['assignments'],
        });
    }

    async findAllPaginated(
        optionsDTO: RequestManyDTO,
    ): Promise<ResponseManyDTO<CourseEntity>> {
        return await super.findMany(optionsDTO, {
            order: { id: optionsDTO.order },
        });
    }

    async createCourse(dto: CreateCourseDTO): Promise<CourseEntity> {
        return await this.courseRepo.save(this.courseRepo.create(dto));
    }

    async updateCourse(
        id: number,
        dto: UpdateCourseDTO,
    ): Promise<CourseEntity> {
        const course = await super.findByIdOrFail(id);
        return await this.courseRepo.save({ ...course, ...dto });
    }

    async deleteCourse(id: number): Promise<number> {
        await super.findByIdOrFail(id);
        await this.courseRepo.delete({ id });
        return id;
    }
}
