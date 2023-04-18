import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { flattenDeep } from 'lodash';
import { ApiResult } from '@/decorators/api-result.decorator';
import { ApiException } from '@/exceptions/api.exception';
import { MenuEntity } from '@/modules/system/menu/menu.entity';
import {
  MenuCreateDto,
  MenuDeleteDto,
  MenuInfoDto,
  MenuSearchDto,
  MenuUpdateDto,
} from './menu.dto';
import { MenuService } from './menu.service';
import { ErrorEnum } from '@/constants/error';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from '@/config';

@ApiTags('System - 菜单权限模块')
@ApiSecurityAuth()
@Controller('menu')
export class MenuEntityController {
  constructor(
    private menuService: MenuService,
    private configService: ConfigService,
  ) {}

  @ApiOperation({ summary: '获取所有菜单列表' })
  @ApiResult({ type: [MenuEntity] })
  @Get('list')
  async list(): Promise<string[]> {
    return await this.menuService.list();
  }

  @ApiOperation({ summary: '新增菜单或权限' })
  @Post('add')
  async add(@Body() dto: MenuCreateDto): Promise<void> {
    // check
    await this.menuService.check(dto);
    if (!dto.parent) {
      dto.parent = null;
    }
    if (dto.type === 0) {
      dto.component = 'LAYOUT';
    }

    await this.menuService.save(dto);
    if (dto.type === 2) {
      // 如果是权限发生更改，则刷新所有在线用户的权限
      await this.menuService.refreshOnlineUserPerms();
    }
  }

  @ApiOperation({ summary: '更新菜单或权限' })
  @Post('update')
  async update(@Body() dto: MenuUpdateDto): Promise<void> {
    if (
      dto.id <=
      this.configService.get<IAppConfig>('app').protectSysPermMenuMaxId
    ) {
      // 系统内置功能不提供删除
      throw new ApiException(ErrorEnum.CODE_1016);
    }
    // check
    await this.menuService.check(dto);
    if (dto.parent === -1 || !dto.parent) {
      dto.parent = null;
    }
    const insertData: MenuCreateDto & { id: number } = {
      ...dto,
      id: dto.id,
    };
    await this.menuService.save(insertData);
    if (dto.type === 2) {
      // 如果是权限发生更改，则刷新所有在线用户的权限
      await this.menuService.refreshOnlineUserPerms();
    }
  }

  @ApiOperation({ summary: '删除菜单或权限' })
  @Post('delete')
  async delete(@Body() dto: MenuDeleteDto): Promise<void> {
    // 68为内置init.sql中插入最后的索引编号
    if (
      dto.id <=
      this.configService.get<IAppConfig>('app').protectSysPermMenuMaxId
    ) {
      // 系统内置功能不提供删除
      throw new ApiException(ErrorEnum.CODE_1016);
    }
    // 如果有子目录，一并删除
    const childMenus = await this.menuService.findChildMenus(dto.id);
    await this.menuService.deleteMenuItem(flattenDeep([dto.id, childMenus]));
    // 刷新在线用户权限
    await this.menuService.refreshOnlineUserPerms();
  }

  @ApiOperation({ summary: '获取菜单或权限信息' })
  @Get('info')
  async info(@Query() dto: MenuInfoDto) {
    return await this.menuService.getMenuItemAndParentInfo(dto.menuId);
  }
}
