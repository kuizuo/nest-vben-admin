import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsInt,
  IsNotEmpty,
  Min,
} from 'class-validator';

/**
 * 单个删除
 */
export class DeleteDto {
  @ApiProperty({ description: '待删除的ID', type: Number, required: true })
  @IsDefined()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id!: number;
}

/**
 * 批量删除
 */
export class DeleteManyDto {
  @ApiProperty({
    description: '待删除的ID列表',
    type: [Number],
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  ids!: number[];
}
