import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCourseDTO {
    @IsOptional()
    @IsNotEmpty()
    name?: string;
}
