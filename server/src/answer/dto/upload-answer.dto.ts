import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadAnswerDTO {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    readonly submission_id: number;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    readonly file: Express.Multer.File;
}
