import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedMetaDTO } from './paginated-meta.dto';

export class PaginatedDTO<T> {
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: T[];

    @ApiProperty({ type: () => PaginatedMetaDTO })
    readonly meta: PaginatedMetaDTO;

    constructor(data: T[], meta: PaginatedMetaDTO) {
        this.data = data;
        this.meta = meta;
    }
}
