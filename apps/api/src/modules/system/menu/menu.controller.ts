import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { flattenDeep } from 'lodash';

import { IAppConfig } from '@/config';
import { ErrorEnum } from '@/constants/error';
import { ApiResult } from '@/decorators/api-result.decorator';
import { IdParam } from '@/decorators/id-param.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { ApiException } from '@/exceptions/api.exception';
import { Permission } from '@/modules/rbac/decorators';
import { MenuEntity } from '@/modules/system/menu/menu.entity';

import { MenuDto, MenuQueryDto } from './menu.dto';
import { MenuService } from './menu.service';
import { PermissionMenu } from './permission';

@ApiTags('System - 菜单权限模块')
@ApiSecurityAuth()
@Controller('menus')
export class MenuController {
  constructor(
    private menuService: MenuService,
    private configService: ConfigService,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取所有菜单列表' })
  @ApiResult({ type: [MenuEntity] })
  @Permission(PermissionMenu.LIST)
  async list(@Query() dto: MenuQueryDto) {
    return this.menuService.list(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取菜单或权限信息' })
  @Permission(PermissionMenu.READ)
  async info(@IdParam() id: number) {
    return this.menuService.getMenuItemAndParentInfo(id);
  }

  @Post()
  @ApiOperation({ summary: '新增菜单或权限' })
  @Permission(PermissionMenu.CREATE)
  async create(@Body() dto: MenuDto): Promise<void> {
    // check
    await this.menuService.check(dto);
    if (!dto.parent) {
      dto.parent = null;
    }
    if (dto.type === 0) {
      dto.component = 'LAYOUT';
    }

    await this.menuService.create(dto);
    if (dto.type === 2) {
      // 如果是权限发生更改，则刷新所有在线用户的权限
      await this.menuService.refreshOnlineUserPerms();
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '更新菜单或权限' })
  @Permission(PermissionMenu.UPDATE)
  async update(
    @IdParam() id: number,
    @Body() dto: Partial<MenuDto>,
  ): Promise<void> {
    if (id <= this.configService.get<IAppConfig>('app').protectSysPermMenuMaxId)
      throw new ApiException(ErrorEnum.CODE_1016);

    // check
    await this.menuService.check(dto);
    if (dto.parent === -1 || !dto.parent) {
      dto.parent = null;
    }

    await this.menuService.update(id, dto);
    if (dto.type === 2) {
      // 如果是权限发生更改，则刷新所有在线用户的权限
      await this.menuService.refreshOnlineUserPerms();
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除菜单或权限' })
  @Permission(PermissionMenu.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    // 68为内置init.sql中插入最后的索引编号
    if (
      id <= this.configService.get<IAppConfig>('app').protectSysPermMenuMaxId
    ) {
      // 系统内置功能不提供删除
      throw new ApiException(ErrorEnum.CODE_1016);
    }
    // 如果有子目录，一并删除
    const childMenus = await this.menuService.findChildMenus(id);
    await this.menuService.deleteMenuItem(flattenDeep([id, childMenus]));
    // 刷新在线用户权限
    await this.menuService.refreshOnlineUserPerms();
  }
}
