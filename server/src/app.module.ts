import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AntiplagiatModule } from './antiplagiat/antiplagiat.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { AssignmentModule } from './assignment/assignment.module';
import { AnswerModule } from './answer/answer.module';
import { SubmissionModule } from './submission/submission.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
        }),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static'),
        }),
        DatabaseModule,
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
