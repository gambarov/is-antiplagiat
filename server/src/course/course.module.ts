import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseEntity } from './course.entity';

@Module({
    controllers: [CourseController],
    providers: [CourseService],
    exports: [CourseService],
    imports: [TypeOrmModule.forFeature([CourseEntity])],
})
export class CourseModule {}
