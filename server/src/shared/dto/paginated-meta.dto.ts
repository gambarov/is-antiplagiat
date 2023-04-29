import { ApiProperty } from '@nestjs/swagger';
import { PaginatedMetaDTOParams } from './paginated-meta-params.dto';

export class PaginatedMetaDTO {
    @ApiProperty()
    readonly page: number;

    @ApiProperty()
    readonly take: number;

    @ApiProperty()
    readonly itemCount: number;

    @ApiProperty()
    readonly pageCount: number;

    @ApiProperty()
    readonly hasPreviousPage: boolean;

    @ApiProperty()
    readonly hasNextPage: boolean;

    constructor({ paginatedOptionsDTO, itemCount }: PaginatedMetaDTOParams) {
        this.page = paginatedOptionsDTO.page;
        this.take = paginatedOptionsDTO.take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
