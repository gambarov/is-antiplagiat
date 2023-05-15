import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentController } from './enrollment.controller';

@Module({
    providers: [EnrollmentService],
    controllers: [EnrollmentController],
    exports: [EnrollmentService],
})
export class EnrollmentModule {}
