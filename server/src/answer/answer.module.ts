import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AntiplagiatModule } from 'src/antiplagiat/antiplagiat.module';
import { FileModule } from 'src/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from './entites/answer.entity';
import { AnswerResultEntity } from './entites/answer-result.entity';
import { AnswerService } from './answer.service';
import { CrudService } from 'src/shared/crud/crud-service.mixin';
import { SubmissionModule } from '../submission/submission.module';

@Module({
    providers: [
        AnswerService,
        { provide: 'CRUD_SERVICE', useClass: CrudService(AnswerEntity) },
    ],
    controllers: [AnswerController],
    imports: [
        AntiplagiatModule,
        FileModule,
        SubmissionModule,
        TypeOrmModule.forFeature([AnswerEntity, AnswerResultEntity]),
    ],
})
export class AnswerModule {}
