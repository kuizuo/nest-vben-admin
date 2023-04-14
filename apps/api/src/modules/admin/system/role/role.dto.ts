import { PageOptionDto } from '@/common/paginate.dto';
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
  MinLength,
} from 'class-validator';

export class RoleCreateDto {
  @ApiProperty({ description: '角色名称' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: '角色值' })
  @IsString()
  @Matches(/^[a-z0-9A-Z]+$/)
  @MinLength(2)
  value: string;

  @ApiProperty({ description: '角色备注' })
  @IsOptional()
  @IsString()
  remark?: string;

  @ApiProperty({ description: '状态' })
  @IsIn([0, 1])
  status: number;

  @ApiProperty({ description: '关联菜单、权限编号' })
  @IsOptional()
  @IsArray()
  menus?: number[];
}

export class RoleUpdateDto extends RoleCreateDto {
  @ApiProperty({ description: '关联部门编号' })
  @IsInt()
  id: number;
}

export class RoleInfoDto {
  @ApiProperty({ description: '需要查找的角色ID' })
  @IsInt()
  @Type(() => Number)
  id: number;
}

export class RoleDeleteDto {
  @ApiProperty({ description: '需要删除的角色ID列表', type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  ids: number[];
}

export class RolePageDto extends PageOptionDto {
  @ApiProperty({ description: '角色名称' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: '角色值' })
  @IsOptional()
  @IsString()
  value?: string;

  @ApiProperty({ description: '状态' })
  @IsOptional()
  status?: number;
}
