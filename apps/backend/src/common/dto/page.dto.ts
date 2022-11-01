import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginateDto {
  @ApiProperty({
    description: '当前页数',
    required: false,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly pageSize: number = 10;

  @ApiProperty({
    description: '当前页包含数量',
    required: false,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page: number = 1;

  @ApiProperty({
    description: '时间戳',
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly _t: number;
}
