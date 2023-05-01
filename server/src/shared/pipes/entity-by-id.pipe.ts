import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { BaseService } from '../services/base-service.service';
import { BaseEntity } from '../entities/base-entity';

@Injectable()
export class EntityByIdPipe<T extends BaseEntity>
    implements PipeTransform<number, Promise<T>>
{
    constructor(
        // private readonly entity: T,
        private readonly service: BaseService<T>,
    ) {}

    async transform(id: number, metadata: ArgumentMetadata): Promise<T> {
        const entity = await this.service.findByIdOrFail(id as number);
        return entity;
    }
}
