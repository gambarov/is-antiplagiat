import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { RequestManyDTO } from 'src/shared/crud/dto/request-many.dto';
import { AssignmentEntity } from './entities/assignment.entity';
import { ResponseManyDTO } from 'src/shared/crud/dto/response-many.dto';
import { UpdateAssignmentDTO } from './dto/update-assignment.dto';
import { CreateAssignmentDTO } from './dto/create-assignment.dto';

@Controller('assignments')
export class AssignmentController {
    constructor(private assService: AssignmentService) {}

    @Get()
    async findAll(
        @Query() optionsDTO: RequestManyDTO,
    ): Promise<ResponseManyDTO<AssignmentEntity>> {
        return await this.assService.findMany(optionsDTO);
    }

    @Get(':id')
    async findOneById(@Param('id') id: number) {
        return await this.assService.findByIdOrFail(id);
    }

    @Post()
    async create(@Body() dto: CreateAssignmentDTO) {
        return await this.assService.createOne(dto);
    }

    @Post(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateAssignmentDTO) {
        return await this.assService.updateOne(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.assService.deleteOne(id);
    }
}
