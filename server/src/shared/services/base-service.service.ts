import {
    FindManyOptions,
    Repository,
    FindOptionsWhere,
    FindOneOptions,
} from 'typeorm';
import { PaginatedOptionsDTO } from 'src/shared/dto/paginated-meta-params.dto';
import { PaginatedDTO } from 'src/shared/dto/paginated.dto';
import { PaginatedMetaDTO } from 'src/shared/dto/paginated-meta.dto';
import { BaseEntity } from '../entities/base-entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService<T extends BaseEntity> {
    constructor(private repo: Repository<T>) {}

    async findByIdOrFail(id: number, options?: FindOneOptions<T>) {
        const findOptions: FindOneOptions<T> = {
            ...options,
            where: {
                id,
            } as unknown as FindOptionsWhere<T>,
        };
        return await this.repo.findOneOrFail(findOptions);
    }

    async findAllPaginated(
        optionsDTO: PaginatedOptionsDTO,
        options?: FindManyOptions<T>,
    ): Promise<PaginatedDTO<T>> {
        const [entities, itemCount] = await this.repo.findAndCount({
            ...options,
            take: optionsDTO.take,
            skip: optionsDTO.skip,
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
}
