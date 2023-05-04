import { Injectable, PipeTransform } from '@nestjs/common';
import { ICrudService } from '../crud/crud-service.service';
import { Inject } from '@nestjs/common';

@Injectable()
export class EntityByIdPipe<T> implements PipeTransform<number, Promise<T>> {
    constructor(
        @Inject('CRUD_SERVICE') private readonly crudService: ICrudService<T>,
    ) {}

    async transform(id: number): Promise<T> {
        return this.crudService.findByIdOrFail(id);
    }
}
