import {
    FindManyOptions,
    Repository,
    FindOptionsWhere,
    FindOneOptions,
    DeepPartial,
} from 'typeorm';
import { RequestManyDTO } from './dto/request-many.dto';
import { ResponseManyDTO } from './dto/response-many.dto';
import { ResponseManyMetaDTO } from './dto/response-many-meta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Type, mixin } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

export interface ICrudService<T> {
    repo: Repository<T>;

    findByIdOrFail(id: number, options?: FindOneOptions<T>): Promise<T>;
    findMany(
        optionsDTO: RequestManyDTO,
        options?: FindManyOptions<T>,
    ): Promise<ResponseManyDTO<T>>;
    createOne(dto: T | DeepPartial<T>): Promise<T>;
    updateOne(id: number, dto: T | DeepPartial<T>): Promise<T>;
    deleteOne(id: number): Promise<number>;
}

type Constructor<I> = new (...args: any[]) => I;

export function CrudService<T>(entity: Constructor<T>): Type<ICrudService<T>> {
    class CrudServiceHost implements ICrudService<T> {
        @InjectRepository(entity) public readonly repo: Repository<T>;

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

        async createOne(dto: T | DeepPartial<T>): Promise<T> {
            const entity = this.prepareToSave(dto);
            console.log(entity);
            return this.repo.save(this.repo.create(entity)) as T;
        }

        async updateOne(id: number, dto: T | DeepPartial<T>): Promise<T> {
            const entity = await this.findByIdOrFail(id);
            return await this.repo.save({ ...entity, ...dto });
        }

        async deleteOne(id: number): Promise<number> {
            await this.findByIdOrFail(id);
            await this.repo.delete({ id } as unknown as FindOptionsWhere<T>);
            return id;
        }

        protected get entityType(): Type<T> {
            return this.repo.target as Type<T>;
        }

        protected prepareToSave(dto: T | DeepPartial<T>): T {
            return plainToInstance(this.entityType, dto);
        }
    }

    return mixin(CrudServiceHost);
}
