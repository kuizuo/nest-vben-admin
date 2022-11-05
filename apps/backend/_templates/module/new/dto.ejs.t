---
to: src/modules/apps/<%= name %>/<%= name %>.dto.ts
---
import { PaginateDto } from '@/common/dto/page.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class <%= Name %>CreateDto {}

export class <%= Name %>UpdateDto extends PartialType(<%= Name %>CreateDto) {
  @ApiProperty({ description: 'ID', example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  id: number;
}

export class <%= Name %>DeleteDto {
  @ApiProperty({ description: 'ID', example: 1 })
  id: number;
}

export class <%= Name %>DetailDto extends PartialType(<%= Name %>DeleteDto) {}

export class <%= Name %>PageDto extends PaginateDto {}
