import { ApiProperty } from '@nestjs/swagger';

export class UploadAnswerDTO {
    @ApiProperty({ type: 'string', format: 'binary', required: true })
    readonly file: Express.Multer.File;
}
