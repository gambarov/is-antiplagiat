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
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadAnswerDTO } from './dto/upload-answer.dto';
import { CheckAnswerDTO } from './dto/check-answer.dto';
import { EntityByIdPipe } from 'src/shared/pipes/entity-by-id.pipe';
import { AnswerEntity } from './entites/answer.entity';
import { ApiConsumes } from '@nestjs/swagger';
import { SubmissionService } from '../submission/submission.service';
import { User } from '../user/decorators/user.decorator';
import { UserEntity } from '../user/entities/user.entity';

@Controller('submissions/:submission_id/answers')
export class AnswerController {
    constructor(
        private answerService: AnswerService,
        private submService: SubmissionService,
    ) {}

    @Get(':id')
    async findById(@Param('id', EntityByIdPipe) answer: AnswerEntity) {
        return answer;
    }

    @Post('upload')
    @ApiConsumes('multipart/form-data')
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
        @Param('submission_id') sub_id: number,
        @User() user: UserEntity,
    ) {
        const submission = await this.submService.findByIdOrFail(sub_id, {
            relations: ['answers'],
        });
        return await this.answerService.upload(user, submission, file);
    }

    @Post('status')
    async status(
        @Body() dto: CheckAnswerDTO,
        @User() user: UserEntity,
        @Param('submission_id') sub_id: number,
    ) {
        const submission = await this.submService.findByIdOrFail(sub_id, {
            relations: ['answers'],
        });
        return await this.answerService.getStatus(user, submission, dto);
    }
}
