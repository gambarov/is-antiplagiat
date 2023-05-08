import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSubmissionDTO {
    @IsOptional()
    @IsNotEmpty()
    comment?: string;
}
