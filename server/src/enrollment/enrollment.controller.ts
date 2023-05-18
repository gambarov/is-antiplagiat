import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { ResponseManyDTO } from '../shared/crud/dto/response-many.dto';
import { RequestManyDTO } from '../shared/crud/dto/request-many.dto';

@Controller('enrollment')
export class EnrollmentController {
    constructor(private enrollmentService: EnrollmentService) {}

    @Get()
    async findMany(
        @Query() optionsDTO: RequestManyDTO,
    ): Promise<ResponseManyDTO<EnrollmentEntity>> {
        return await this.enrollmentService.findMany(optionsDTO);
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.enrollmentService.findByIdOrFail(id);
    }

    @Post()
    async createOne(@Body() dto: EnrollmentEntity) {
        return await this.enrollmentService.createOne(dto);
    }

    @Post(':id')
    async updateOne(@Param('id') id: number, @Body() dto: EnrollmentEntity) {
        return await this.enrollmentService.updateOne(id, dto);
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: number) {
        return await this.enrollmentService.deleteOne(id);
    }
}
