import {
    FindManyOptions,
    Repository,
    FindOptionsWhere,
    FindOneOptions,
} from 'typeorm';
import { PaginatedOptionsDTO } from 'src/shared/dto/paginated-meta-params.dto';
import { PaginatedDTO } from 'src/shared/dto/paginated.dto';
import { PaginatedMetaDTO } from 'src/shared/dto/paginated-meta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from '@nestjs/common';

export interface ICrudService<T> {
    findByIdOrFail(id: number, options?: FindOneOptions<T>): Promise<T>;
    findMany(optionsDTO: PaginatedOptionsDTO, options?: FindManyOptions<T>);
}

type Constructor<I> = new (...args: any[]) => I;

export function CrudService<T>(entity: Constructor<T>): Type<ICrudService<T>> {
    class CrudServiceHost implements ICrudService<T> {
        @InjectRepository(entity) readonly repo: Repository<T>;

        async findByIdOrFail(id: number, options?: FindOneOptions<T>) {
            const findOptions: FindOneOptions<T> = {
                ...options,
                where: {
                    id,
                } as unknown as FindOptionsWhere<T>,
            };
            return await this.repo.findOneOrFail(findOptions);
        }

        async findMany(
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

    return CrudServiceHost;
}
