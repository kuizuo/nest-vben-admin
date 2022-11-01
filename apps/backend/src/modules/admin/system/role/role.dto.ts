import { PaginateDto } from '@/common/dto/page.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

export class DeleteRoleDto {
  @ApiProperty({ description: '需要删除的角色ID列表', type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}

export class CreateRoleDto {
  @ApiProperty({ description: '角色名称' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: '角色值' })
  @Matches(/^[a-z0-9A-Z]+$/)
  @MinLength(2)
  @IsString()
  value: string;

  @ApiProperty({ description: '角色备注', required: false })
  @IsString()
  @IsOptional()
  remark: string;

  @ApiProperty({ description: '状态' })
  @IsIn([0, 1])
  @IsOptional()
  status: number;

  @ApiProperty({ description: '关联菜单、权限编号', required: false })
  @IsOptional()
  @IsArray()
  menus: number[];
}

export class UpdateRoleDto extends CreateRoleDto {
  @ApiProperty({ description: '关联部门编号' })
  @IsInt()
  @Min(0)
  id: number;
}

export class InfoRoleDto {
  @ApiProperty({ description: '需要查找的角色ID' })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  id: number;
}

export class PageSearchRoleDto extends PaginateDto {
  @ApiProperty({ description: '角色名称' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: '角色值' })
  @IsString()
  @IsOptional()
  value: string;

  @ApiProperty({ description: '状态' })
  @IsOptional()
  status: number;
}
