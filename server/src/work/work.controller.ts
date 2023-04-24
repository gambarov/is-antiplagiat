import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    ParseFilePipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadWorkDTO } from './dto/upload-work.dto';
import { WorkService } from './work.service';
import { CheckWorkDTO } from './dto/check-work.dto';

@Controller('works')
export class WorkController {
    constructor(private workService: WorkService) {}

    @Get()
    async getWorks() {
        return await this.workService.getWorks();
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadWork(
        @Body() dto: UploadWorkDTO,
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
        const work = await this.workService.uploadWork(dto, file);
        return work;
    }

    @Post('check')
    async checkWork(@Body() dto: CheckWorkDTO) {
        console.log(dto);
        return await this.workService.checkWork(dto);
    }

    @Post('status')
    async checkWorkStatus(@Body() dto: CheckWorkDTO) {
        return await this.workService.checkWorkStatus(dto);
    }
}
