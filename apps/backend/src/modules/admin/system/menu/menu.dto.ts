import { PaginateDto } from '@/common/dto/page.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

/**
 * 增加菜单
 */
export class CreateMenuDto {
  @ApiProperty({ description: '菜单类型' })
  @IsIn([0, 1, 2])
  type: number;

  @ApiProperty({ description: '父级菜单' })
  @IsOptional()
  parent: number;

  @ApiProperty({ description: '菜单或权限名称' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: '排序' })
  @IsInt()
  @Min(0)
  orderNo: number;

  @ApiProperty({ description: '前端路由地址' })
  // @Matches(/^[/]$/)
  @ValidateIf((o) => o.type !== 2)
  path: string;

  @ApiProperty({ description: '是否外链', required: false, default: 1 })
  @IsIn([0, 1])
  @ValidateIf((o) => o.type !== 2)
  readonly external: number;

  @ApiProperty({ description: '菜单是否显示', required: false, default: 1 })
  @IsIn([0, 1])
  @ValidateIf((o) => o.type !== 2)
  readonly show: number;

  @ApiProperty({ description: '开启页面缓存', required: false, default: 1 })
  @IsIn([0, 1])
  @ValidateIf((o) => o.type === 1)
  readonly keepalive: number;

  @ApiProperty({ description: '状态', required: false, default: 1 })
  @IsIn([0, 1])
  readonly status: number;

  @ApiProperty({ description: '菜单图标', required: false })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.type !== 2)
  icon: string;

  @ApiProperty({ description: '对应权限' })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.type === 2)
  permission: string;

  @ApiProperty({ description: '菜单路由路径或外链' })
  @ValidateIf((o) => o.type !== 2)
  @IsString()
  @IsOptional()
  component: string;
}

export class UpdateMenuDto extends CreateMenuDto {
  @ApiProperty({ description: '更新的菜单ID' })
  @IsInt()
  @Min(0)
  id: number;
}

/**
 * 删除菜单
 */
export class DeleteMenuDto {
  @ApiProperty({ description: '删除的菜单ID' })
  @IsInt()
  @Min(0)
  id: number;
}

/**
 * 查询菜单
 */
export class InfoMenuDto {
  @ApiProperty({ description: '查询的菜单ID' })
  @IsInt()
  @Min(0)
  @Type(() => Number)
  menuId: number;
}

export class SearchMenuDto {
  @ApiProperty({ description: '菜单名称' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ description: '路由' })
  @IsString()
  @IsOptional()
  path: string;

  @ApiProperty({ description: '权限标识' })
  @IsString()
  @IsOptional()
  permission: string;

  @ApiProperty({ description: '组件' })
  @IsString()
  @IsOptional()
  component: string;

  @ApiProperty({ description: '状态' })
  @IsOptional()
  status: number;
}
