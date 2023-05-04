import { ApiProperty } from '@nestjs/swagger';
import { RequestManyDTO } from './request-many.dto';

interface ResponseManyMetaDTOParams {
    requestDto: RequestManyDTO;
    itemCount: number;
}

export class ResponseManyMetaDTO {
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

    constructor({ requestDto, itemCount }: ResponseManyMetaDTOParams) {
        this.page = requestDto.page;
        this.take = requestDto.take;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.take);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }
}
