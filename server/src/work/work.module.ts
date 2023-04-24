import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { AntiplagiatModule } from 'src/antiplagiat/antiplagiat.module';
import { FileModule } from 'src/file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkEntity } from './work.entity';
import { WorkResultEntity } from './work-result.entity';

@Module({
    providers: [WorkService],
    controllers: [WorkController],
    imports: [
        AntiplagiatModule,
        FileModule,
        TypeOrmModule.forFeature([WorkEntity, WorkResultEntity]),
    ],
})
export class WorkModule {}
