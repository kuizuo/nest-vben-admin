import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiResult } from '@/decorators/api-result.decorator';
import { IdParam } from '@/decorators/id-param.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Permission } from '@/modules/rbac/decorators';
import { RoleEntity } from '@/modules/system/role/role.entity';

import { MenuService } from '../menu/menu.service';

import { PermissionRole } from './permission';
import { RoleDto } from './role.dto';
import { RoleService } from './role.service';

@ApiTags('System - 角色模块')
@ApiSecurityAuth()
@Controller('roles')
export class RoleController {
  constructor(
    private roleService: RoleService,
    private menuService: MenuService,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取角色列表' })
  @ApiResult({ type: [RoleEntity] })
  @Permission(PermissionRole.LIST)
  async list(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取角色信息' })
  @ApiResult({ type: RoleEntity })
  @Permission(PermissionRole.READ)
  async info(@IdParam() id: number) {
    return this.roleService.info(id);
  }

  @Post()
  @ApiOperation({ summary: '新增角色' })
  @Permission(PermissionRole.CREATE)
  async create(@Body() dto: RoleDto): Promise<void> {
    await this.roleService.create(dto);
  }

  @Post(':id')
  @ApiOperation({ summary: '更新角色' })
  @Permission(PermissionRole.UPDATE)
  async update(
    @IdParam() id: number,
    @Body() dto: Partial<RoleDto>,
  ): Promise<void> {
    await this.roleService.update(id, dto);
    await this.menuService.refreshOnlineUserPerms();
  }

  @Delete()
  @ApiOperation({ summary: '删除角色' })
  @Permission(PermissionRole.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.roleService.delete(id);
    await this.menuService.refreshOnlineUserPerms();
  }
}
