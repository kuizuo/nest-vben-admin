import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class DictCreateDto {
  @ApiProperty({ description: '参数名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '参数键名' })
  @IsString()
  @MinLength(3)
  key: string;

  @ApiProperty({ description: '参数值' })
  @IsString()
  value: string;

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string;
}

export class DictUpdateDto {
  @ApiProperty({ description: '配置编号' })
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({ description: '参数名称' })
  @IsString()
  name: string;

  @ApiProperty({ description: '参数值' })
  @IsString()
  value: string;

  @ApiProperty({ description: '备注' })
  @IsOptional()
  @IsString()
  remark?: string;
}

export class DictDeleteDto {
  @ApiProperty({ description: '需要删除的配置id列表', type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}

export class DictInfoDto {
  @ApiProperty({ description: '需要查询的配置编号' })
  @IsInt()
  @Type(() => Number)
  id: number;
}
