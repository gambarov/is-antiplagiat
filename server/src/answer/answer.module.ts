import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AntiplagiatModule } from 'src/antiplagiat/antiplagiat.module';
import { FileModule } from 'src/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from './entites/answer.entity';
import { AnswerResultEntity } from './entites/answer-result.entity';
import { AnswerService } from './answer.service';
import { BaseService } from 'src/shared/services/base-service.service';

@Module({
    providers: [
        { provide: BaseService<AnswerEntity>, useClass: AnswerService },
    ],
    controllers: [AnswerController],
    imports: [
        AntiplagiatModule,
        FileModule,
        TypeOrmModule.forFeature([AnswerEntity, AnswerResultEntity]),
    ],
})
export class AnswerModule {}
