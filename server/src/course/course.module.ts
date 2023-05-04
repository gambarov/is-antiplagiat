import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';
import { AssignmentEntity } from 'src/assignment/assignment.entity';

@Module({
    controllers: [CourseController],
    providers: [CourseService],
    // exports: [CourseService],
    imports: [TypeOrmModule.forFeature([CourseEntity, AssignmentEntity])],
})
export class CourseModule {}
