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
import { PaginatedOptionsDTO } from 'src/utils/dto/paginated-meta-params.dto';
import { AssignmentEntity } from './assignment.entity';
import { PaginatedDTO } from 'src/utils/dto/paginated.dto';
import { UpdateAssignmentDTO } from './dto/update-assignment.dto';
import { CreateAssignmentDTO } from './dto/create-assignment.dto';

@Controller('assignments')
export class AssignmentController {
    constructor(private assService: AssignmentService) {}

    @Get()
    async findAll(
        @Query() optionsDTO: PaginatedOptionsDTO,
    ): Promise<PaginatedDTO<AssignmentEntity>> {
        return await this.assService.findAllAssignments(optionsDTO);
    }

    @Get(':id')
    async findOneById(@Param('id') id: number) {
        return await this.assService.findOneAssignmentById(id);
    }

    @Post()
    async create(@Body() dto: CreateAssignmentDTO) {
        return await this.assService.createAssignment(dto);
    }

    @Post(':id')
    async update(@Param('id') id: number, @Body() dto: UpdateAssignmentDTO) {
        return await this.assService.updateAssignment(id, dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return await this.assService.deleteAssignment(id);
    }
}
