import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, Min } from 'class-validator';

/**
 * 详情查询
 */
export class DetailDto {
  @ApiProperty({ description: '详情ID', required: true })
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id!: number;
}
