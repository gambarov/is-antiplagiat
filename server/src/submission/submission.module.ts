import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from 'src/user/entities/student.entity';
import { SubmissionEntity } from './entities/submission.entity';
import { AssignmentEntity } from 'src/assignment/entities/assignment.entity';
import { AnswerEntity } from 'src/answer/entites/answer.entity';

@Module({
    controllers: [SubmissionController],
    providers: [SubmissionService],
    imports: [
        TypeOrmModule.forFeature([
            SubmissionEntity,
            StudentEntity,
            AssignmentEntity,
            AnswerEntity,
        ]),
    ],
    exports: [SubmissionService],
})
export class SubmissionModule {}
