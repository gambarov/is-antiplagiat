import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AntiplagiatModule } from './antiplagiat/antiplagiat.module';
import { WorkModule } from './work/work.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkEntity } from './work/work.entity';
import { WorkResultEntity } from './work/work-result.entity';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/user.entity';
import { StudentEntity } from './user/student.entity';
import { SupervisorEntity } from './user/supervisor.entity';
import { CourseModule } from './course/course.module';
import { CourseEntity } from './course/course.entity';

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
                WorkEntity,
                WorkResultEntity,
                UserEntity,
                StudentEntity,
                SupervisorEntity,
                CourseEntity,
            ],
            synchronize: true,
        }),
        AntiplagiatModule,
        WorkModule,
        FileModule,
        UserModule,
        CourseModule,
    ],
})
export class AppModule {}
