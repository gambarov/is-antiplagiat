import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentEntity } from './assignment.entity';
import { Repository } from 'typeorm';
import { PaginatedMetaDTO } from 'src/shared/dto/paginated-meta.dto';
import { PaginatedOptionsDTO } from 'src/shared/dto/paginated-meta-params.dto';
import { PaginatedDTO } from 'src/shared/dto/paginated.dto';
import { CreateAssignmentDTO } from './dto/create-assignment.dto';
import { UpdateAssignmentDTO } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentService {
    constructor(
        @InjectRepository(AssignmentEntity)
        private assignmentRepo: Repository<AssignmentEntity>,
    ) {}

    async findOneAssignmentById(id: number): Promise<AssignmentEntity> {
        return await this.assignmentRepo.findOneByOrFail({ id });
    }

    async findAllAssignments(
        optionsDTO: PaginatedOptionsDTO,
    ): Promise<PaginatedDTO<AssignmentEntity>> {
        const [entities, itemCount] = await this.assignmentRepo.findAndCount({
            take: optionsDTO.take,
            skip: optionsDTO.skip,
            order: { name: optionsDTO.order },
        });

        const meta = new PaginatedMetaDTO({
            itemCount,
            paginatedOptionsDTO: optionsDTO,
        });

        return {
            data: entities,
            meta,
        };
    }

    async createAssignment(
        dto: CreateAssignmentDTO,
    ): Promise<AssignmentEntity> {
        return await this.assignmentRepo.save(this.assignmentRepo.create(dto));
    }

    async updateAssignment(
        id: number,
        dto: UpdateAssignmentDTO,
    ): Promise<AssignmentEntity> {
        const assignments = await this.findOneAssignmentById(id);
        return await this.assignmentRepo.save({ ...assignments, ...dto });
    }

    async deleteAssignment(id: number): Promise<number> {
        await this.findOneAssignmentById(id);
        await this.assignmentRepo.delete({ id });
        return id;
    }
}
