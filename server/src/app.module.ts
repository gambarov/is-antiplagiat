import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AntiplagiatModule } from './antiplagiat/antiplagiat.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { StudentEntity } from './user/entities/student.entity';
import { SupervisorEntity } from './user/supervisor.entity';
import { CourseModule } from './course/course.module';
import { CourseEntity } from './course/entities/course.entity';
import { AssignmentModule } from './assignment/assignment.module';
import { AssignmentEntity } from './assignment/entities/assignment.entity';
import { AnswerModule } from './answer/answer.module';
import { SubmissionModule } from './submission/submission.module';
import { AnswerEntity } from './answer/entites/answer.entity';
import { AnswerResultEntity } from './answer/entites/answer-result.entity';
import { SubmissionEntity } from './submission/entities/submission.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static'),
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
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
        AntiplagiatModule,
        FileModule,
        UserModule,
        CourseModule,
        AssignmentModule,
        AnswerModule,
        SubmissionModule,
    ],
})
export class AppModule {}
