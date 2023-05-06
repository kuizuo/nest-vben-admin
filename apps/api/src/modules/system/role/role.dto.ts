import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { PageOptionsDto } from '@/common/dto/page-options.dto';

export class RoleDto {
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

export class RolePageDto extends PageOptionsDto {
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
