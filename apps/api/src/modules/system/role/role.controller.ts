import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiResult } from '@/decorators/api-result.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Pagination } from '@/helper/paginate/pagination';

import { RoleEntity } from '@/modules/system/role/role.entity';

import { MenuService } from '../menu/menu.service';

import {
  RolePageDto,
  RoleCreateDto,
  RoleDeleteDto,
  RoleInfoDto,
  RoleUpdateDto,
} from './role.dto';

import { RoleService } from './role.service';

@ApiTags('System - 角色模块')
@ApiSecurityAuth()
@Controller('role')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private menuService: MenuService,
  ) {}

  @ApiOperation({ summary: '获取角色列表' })
  @ApiResult({ type: [RoleEntity] })
  @Get('list')
  async list(): Promise<RoleEntity[]> {
    return this.roleService.list();
  }

  @ApiOperation({ summary: '分页查询角色信息' })
  @ApiResult({ type: [RoleEntity] })
  @Get('page')
  async page(@Query() dto: RolePageDto): Promise<Pagination<RoleEntity>> {
    return this.roleService.page(dto);
  }

  @ApiOperation({ summary: '获取角色信息' })
  @Get('info')
  async info(@Query() dto: RoleInfoDto) {
    return this.roleService.info(dto.id);
  }

  @ApiOperation({ summary: '新增角色' })
  @Post('add')
  async add(@Body() dto: RoleCreateDto): Promise<void> {
    await this.roleService.create(dto);
  }

  @ApiOperation({ summary: '更新角色' })
  @Post('update')
  async update(@Body() dto: RoleUpdateDto): Promise<void> {
    await this.roleService.update(dto);
    await this.menuService.refreshOnlineUserPerms();
  }

  @ApiOperation({ summary: '删除角色' })
  @Post('delete')
  async delete(@Body() dto: RoleDeleteDto): Promise<void> {
    await this.roleService.delete(dto.ids);
    await this.menuService.refreshOnlineUserPerms();
  }
}
