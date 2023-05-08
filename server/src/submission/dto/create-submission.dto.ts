import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { SubmissionStatus } from '../enums/submission-status.enum';

export class CreateSubmissionDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(SubmissionStatus)
    status?: SubmissionStatus;

    @IsOptional()
    @IsNotEmpty()
    comment?: string;
}
