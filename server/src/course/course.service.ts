import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(CourseEntity)
        private courseRepo: Repository<CourseEntity>,
    ) {}

    async findOneById(id: number): Promise<CourseEntity> {
        return await this.courseRepo.findOneByOrFail({ id });
    }

    async findAll(): Promise<CourseEntity[]> {
        return await this.courseRepo.find();
    }

    async createCourse(dto: CreateCourseDTO): Promise<CourseEntity> {
        return await this.courseRepo.save(this.courseRepo.create(dto));
    }

    async updateCourse(
        id: number,
        dto: UpdateCourseDTO,
    ): Promise<CourseEntity> {
        const course = await this.findOneById(id);
        return await this.courseRepo.save({ ...course, ...dto });
    }

    async deleteCourse(id: number): Promise<number> {
        await this.findOneById(id);
        await this.courseRepo.delete({ id });
        return id;
    }
}
