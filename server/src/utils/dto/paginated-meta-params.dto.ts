import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { PaginatedOrder } from './constants';

export interface PaginatedMetaDTOParams {
    paginatedOptionsDTO: PaginatedOptionsDTO;
    itemCount: number;
}

export class PaginatedOptionsDTO {
    @ApiPropertyOptional({ enum: PaginatedOrder, default: PaginatedOrder.ASC })
    @IsEnum(PaginatedOrder)
    @IsOptional()
    readonly order?: PaginatedOrder = PaginatedOrder.ASC;

    @ApiPropertyOptional({
        minimum: 1,
        default: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page?: number = 1;

    @ApiPropertyOptional({
        minimum: 1,
        maximum: 50,
        default: 10,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional()
    readonly take?: number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}
