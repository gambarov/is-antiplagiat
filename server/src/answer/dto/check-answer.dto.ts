import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CheckAnswerDTO {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly docId: number;
}
