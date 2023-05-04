import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseManyMetaDTO } from './response-many-meta.dto';

export class ResponseManyDTO<T> {
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: T[];

    @ApiProperty({ type: () => ResponseManyMetaDTO })
    readonly meta: ResponseManyMetaDTO;

    constructor(data: T[], meta: ResponseManyMetaDTO) {
        this.data = data;
        this.meta = meta;
    }
}
