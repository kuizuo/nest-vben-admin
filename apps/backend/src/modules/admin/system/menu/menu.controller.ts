import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { flattenDeep } from 'lodash';
import { ADMIN_PREFIX, FORBIDDEN_OP_MENU_ID_INDEX } from '@/modules/admin/admin.constants';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { ApiException } from '@/common/exceptions/api.exception';
import { SysMenu } from '@/entities/admin/sys-menu.entity';
import { MenuItemAndParentInfoResult } from './menu.class';
import {
  MenuCreateDto,
  MenuDeleteDto,
  MenuInfoDto,
  MenuSearchDto,
  MenuUpdateDto,
} from './menu.dto';
import { SysMenuService } from './menu.service';
import { ErrorEnum } from '@/common/constants/error';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('菜单权限模块')
@ApiExtraModels(MenuItemAndParentInfoResult)
@Controller('menu')
export class SysMenuController {
  constructor(private menuService: SysMenuService) {}

  @ApiOperation({ summary: '获取所有菜单列表' })
  @ApiResult({ type: [SysMenu] })
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
    if (dto.id <= FORBIDDEN_OP_MENU_ID_INDEX) {
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
    if (dto.id <= FORBIDDEN_OP_MENU_ID_INDEX) {
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
  @ApiResult({ type: MenuItemAndParentInfoResult })
  @Get('info')
  async info(@Query() dto: MenuInfoDto): Promise<MenuItemAndParentInfoResult> {
    return await this.menuService.getMenuItemAndParentInfo(dto.menuId);
  }
}
