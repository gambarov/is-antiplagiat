import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSubmissionDTO {
    @IsOptional()
    @IsNotEmpty()
    comment?: string;
}
