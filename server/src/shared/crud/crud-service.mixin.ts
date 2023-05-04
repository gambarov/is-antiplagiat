import {
    FindManyOptions,
    Repository,
    FindOptionsWhere,
    FindOneOptions,
} from 'typeorm';
import { RequestManyDTO } from 'src/shared/crud/dto/request-many.dto';
import { ResponseManyDTO } from 'src/shared/crud/dto/response-many.dto';
import { ResponseManyMetaDTO } from 'src/shared/crud/dto/response-many-meta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from '@nestjs/common';

export interface ICrudService<T> {
    findByIdOrFail(id: number, options?: FindOneOptions<T>): Promise<T>;
    findMany(
        optionsDTO: RequestManyDTO,
        options?: FindManyOptions<T>,
    ): Promise<ResponseManyDTO<T>>;
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
            optionsDTO: RequestManyDTO,
            options?: FindManyOptions<T>,
        ): Promise<ResponseManyDTO<T>> {
            const [entities, itemCount] = await this.repo.findAndCount({
                ...options,
                take: optionsDTO.take,
                skip: optionsDTO.skip,
            });

            const meta = new ResponseManyMetaDTO({
                itemCount,
                requestDto: optionsDTO,
            });

            return new ResponseManyDTO(entities, meta);
        }
    }

    return CrudServiceHost;
}
