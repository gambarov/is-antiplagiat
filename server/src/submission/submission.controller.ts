import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionEntity } from './entities/submission.entity';
import { RequestManyDTO } from '../shared/crud/dto/request-many.dto';
import { ResponseManyDTO } from '../shared/crud/dto/response-many.dto';
import { UpdateSubmissionDTO } from './dto/update-submission.dto';
import { CreateSubmissionDTO } from './dto/create-submission.dto';

@Controller('submissions')
export class SubmissionController {
    constructor(private submService: SubmissionService) {}

    @Get()
    async findMany(
        @Query() optionsDTO: RequestManyDTO,
    ): Promise<ResponseManyDTO<SubmissionEntity>> {
        return await this.submService.findMany(optionsDTO);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.submService.findByIdOrFail(id, {
            relations: ['answers'],
        });
    }

    @Post()
    async createOne(@Body() dto: CreateSubmissionDTO) {
        return await this.submService.createOne(dto);
    }

    @Post(':id')
    async updateOne(@Param('id') id: number, @Body() dto: UpdateSubmissionDTO) {
        return await this.submService.updateOne(id, dto);
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: number) {
        return await this.submService.deleteOne(id);
    }
}
