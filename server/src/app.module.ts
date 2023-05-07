import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AntiplagiatModule } from './antiplagiat/antiplagiat.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { StudentEntity } from './user/entities/student.entity';
import { SupervisorEntity } from './user/entities/supervisor.entity';
import { CourseModule } from './course/course.module';
import { CourseEntity } from './course/entities/course.entity';
import { AssignmentModule } from './assignment/assignment.module';
import { AssignmentEntity } from './assignment/entities/assignment.entity';
import { AnswerModule } from './answer/answer.module';
import { SubmissionModule } from './submission/submission.module';
import { AnswerEntity } from './answer/entites/answer.entity';
import { AnswerResultEntity } from './answer/entites/answer-result.entity';
import { SubmissionEntity } from './submission/entities/submission.entity';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static'),
        }),
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
        AntiplagiatModule,
        FileModule,
        UserModule,
        CourseModule,
        AssignmentModule,
        AnswerModule,
        SubmissionModule,
        AuthModule,
    ],
})
export class AppModule {}
