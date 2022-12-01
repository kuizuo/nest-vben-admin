---
to: src/modules/apps/<%= name %>/<%= name %>.dto.ts
---
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { IsEntityExist } from '@/common/constraints/entity-exist.constraint';
import { PaginateDto } from '@/common/dto/page.dto';
import { <%= Name %> } from '@/entities/apps/<%= name %>.entity';

export class <%= Name %>CreateDto {}

export class <%= Name %>UpdateDto extends PartialType(<%= Name %>CreateDto) {
  @ApiProperty({ description: 'ID' })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsEntityExist(<%= Name %>, { message: '<%= Name %>不存在' })
  id: number;
}

export class <%= Name %>DeleteDto {
  @ApiProperty({ description: 'ID' })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsEntityExist(<%= Name %>, { message: '<%= Name %>不存在' })
  id: number;
}

export class <%= Name %>DetailDto extends PartialType(<%= Name %>DeleteDto) {}

export class <%= Name %>PageDto extends PaginateDto {}
