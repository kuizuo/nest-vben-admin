import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { IsEntityExist } from '@/common/constraints/entity-exist.constraint';
import { PageOptionDto } from '@/common/paginate.dto';
import { Test } from '@/entities/apps/test.entity';

export class TestCreateDto {}

export class TestUpdateDto extends PartialType(TestCreateDto) {
  @ApiProperty({ description: 'ID', example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsEntityExist(Test, { message: 'Test不存在' })
  id: number;
}

export class TestDeleteDto {
  @ApiProperty({ description: 'ID', example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsEntityExist(Test, { message: 'Test不存在' })
  id: number;
}

export class TestDetailDto extends PartialType(TestDeleteDto) {}

export class TestPageDto extends PageOptionDto {}
