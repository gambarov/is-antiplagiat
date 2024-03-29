import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentEntity } from './entities/assignment.entity';
import { CourseEntity } from 'src/course/entities/course.entity';

@Module({
    controllers: [AssignmentController],
    providers: [AssignmentService],
    exports: [AssignmentService],
    imports: [TypeOrmModule.forFeature([AssignmentEntity, CourseEntity])],
})
export class AssignmentModule {}
