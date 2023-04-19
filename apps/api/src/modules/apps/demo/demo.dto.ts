import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

import { PageOptionsDto } from '@/common/dto/page-options.dto';
import { IsEntityExist } from '@/constraints/entity-exist.constraint';
import { DemoEntity } from '@/modules/apps/demo/demo.entity';

export class DemoCreateDto {}

export class DemoUpdateDto extends PartialType(DemoCreateDto) {
  @ApiProperty({ description: 'ID', example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsEntityExist(DemoEntity, { message: 'Demo不存在' })
  id: number;
}

export class DemoDeleteDto {
  @ApiProperty({ description: 'ID', example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsEntityExist(DemoEntity, { message: 'Demo不存在' })
  id: number;
}

export class DemoDetailDto extends PartialType(DemoDeleteDto) {}

export class DemoPageDto extends PageOptionsDto {}
