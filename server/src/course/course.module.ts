import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './entities/course.entity';
import { AssignmentEntity } from 'src/assignment/entities/assignment.entity';

@Module({
    controllers: [CourseController],
    providers: [CourseService],
    // exports: [CourseService],
    imports: [TypeOrmModule.forFeature([CourseEntity, AssignmentEntity])],
})
export class CourseModule {}
