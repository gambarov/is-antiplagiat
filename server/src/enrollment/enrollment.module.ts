import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    providers: [EnrollmentService],
    controllers: [EnrollmentController],
    exports: [EnrollmentService],
    imports: [TypeOrmModule.forFeature([EnrollmentEntity])],
})
export class EnrollmentModule {}
