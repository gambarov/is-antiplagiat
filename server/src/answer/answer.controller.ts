import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    Param,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadAnswerDTO } from './dto/upload-answer.dto';
import { CheckAnswerDTO } from './dto/check-answer.dto';
import { EntityByIdPipe } from 'src/shared/pipes/entity-by-id.pipe';
import { AnswerEntity } from './entites/answer.entity';
import { BaseService } from 'src/shared/services/base-service.service';

@Controller('answers')
export class AnswerController {
    constructor(private answerService: BaseService<AnswerEntity>) {}

    @Get(':id')
    async findById(@Param('id', EntityByIdPipe) answer: AnswerEntity) {
        return answer;
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload(
        @Body() dto: UploadAnswerDTO,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({
                        fileType:
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        return await (this.answerService as AnswerService).upload(dto, file);
    }

    @Post('check')
    async check(@Body() dto: CheckAnswerDTO) {
        console.log(dto);
        return await (this.answerService as AnswerService).check(dto);
    }

    @Post('status')
    async status(@Body() dto: CheckAnswerDTO) {
        return await (this.answerService as AnswerService).getStatus(dto);
    }
}
