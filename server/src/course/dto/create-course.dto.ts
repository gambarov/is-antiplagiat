import { IsNotEmpty } from 'class-validator';

export class CreateCourseDTO {
    @IsNotEmpty()
    name: string;
}
