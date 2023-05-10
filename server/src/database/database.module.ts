import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { StudentEntity } from '../user/entities/student.entity';
import { SupervisorEntity } from '../user/entities/supervisor.entity';
import { CourseEntity } from '../course/entities/course.entity';
import { AssignmentEntity } from '../assignment/entities/assignment.entity';
import { AnswerEntity } from '../answer/entites/answer.entity';
import { AnswerResultEntity } from '../answer/entites/answer-result.entity';
import { SubmissionEntity } from '../submission/entities/submission.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: [
                    UserEntity,
                    StudentEntity,
                    SupervisorEntity,
                    CourseEntity,
                    AssignmentEntity,
                    AnswerEntity,
                    AnswerResultEntity,
                    SubmissionEntity,
                ],
                synchronize: true,
            }),
        }),
    ],
})
export class DatabaseModule {}
