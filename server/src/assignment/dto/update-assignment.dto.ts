import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAssignmentDTO {
    @IsOptional()
    @IsNotEmpty()
    name?: string;
}
