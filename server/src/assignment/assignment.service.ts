import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentEntity } from './assignment.entity';
import { Repository } from 'typeorm';
import { ResponseManyMetaDTO } from 'src/shared/crud/dto/response-many-meta.dto';
import { RequestManyDTO } from 'src/shared/crud/dto/request-many.dto';
import { ResponseManyDTO } from 'src/shared/crud/dto/response-many.dto';
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
        optionsDTO: RequestManyDTO,
    ): Promise<ResponseManyDTO<AssignmentEntity>> {
        const [entities, itemCount] = await this.assignmentRepo.findAndCount({
            take: optionsDTO.take,
            skip: optionsDTO.skip,
            order: { name: optionsDTO.order },
        });

        const meta = new ResponseManyMetaDTO({
            itemCount,
            requestDto: optionsDTO,
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
