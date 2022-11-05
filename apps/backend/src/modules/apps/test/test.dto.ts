import { PaginateDto } from '@/common/dto/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class TestCreateDto {}

export class TestUpdateDto extends PartialType(TestCreateDto) {
  @ApiProperty({ description: 'ID', example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number;
}

export class TestDeleteDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number;
}

export class TestDetailDto extends PartialType(TestDeleteDto) {}

export class TestPageDto extends PaginateDto {}
