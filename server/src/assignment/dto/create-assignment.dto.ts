import { IsNotEmpty } from 'class-validator';

export class CreateAssignmentDTO {
    @IsNotEmpty()
    name: string;
}
