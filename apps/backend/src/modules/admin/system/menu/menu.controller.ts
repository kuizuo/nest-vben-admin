import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { flattenDeep } from 'lodash';
import { ADMIN_PREFIX, FORBIDDEN_OP_MENU_ID_INDEX } from '@/modules/admin/admin.constants';
import { ApiException } from '@/common/exceptions/api.exception';
import SysMenu from '@/entities/admin/sys-menu.entity';
import { IAdminUser } from '../../admin.interface';
import { AdminUser } from '../../core/decorators/admin-user.decorator';
import { MenuItemAndParentInfoResult } from './menu.class';
import {
  CreateMenuDto,
  DeleteMenuDto,
  InfoMenuDto,
  SearchMenuDto,
  UpdateMenuDto,
} from './menu.dto';
import { SysMenuService } from './menu.service';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('菜单权限模块')
@Controller('menu')
export class SysMenuController {
  constructor(private menuService: SysMenuService) {}

  @ApiOperation({ summary: '获取所有菜单列表' })
  @ApiOkResponse({ type: [SysMenu] })
  @Get('list')
  async list(): Promise<string[]> {
    return await this.menuService.list();
  }

  @ApiOperation({ summary: '新增菜单或权限' })
  @Post('add')
  async add(@Body() dto: CreateMenuDto): Promise<void> {
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
  async update(@Body() dto: UpdateMenuDto): Promise<void> {
    if (dto.id <= FORBIDDEN_OP_MENU_ID_INDEX) {
      // 系统内置功能不提供删除
      throw new ApiException(10016);
    }
    // check
    await this.menuService.check(dto);
    if (dto.parent === -1 || !dto.parent) {
      dto.parent = null;
    }
    const insertData: CreateMenuDto & { id: number } = {
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
  async delete(@Body() dto: DeleteMenuDto): Promise<void> {
    // 68为内置init.sql中插入最后的索引编号
    if (dto.id <= FORBIDDEN_OP_MENU_ID_INDEX) {
      // 系统内置功能不提供删除
      throw new ApiException(10016);
    }
    // 如果有子目录，一并删除
    const childMenus = await this.menuService.findChildMenus(dto.id);
    await this.menuService.deleteMenuItem(flattenDeep([dto.id, childMenus]));
    // 刷新在线用户权限
    await this.menuService.refreshOnlineUserPerms();
  }

  @ApiOperation({ summary: '获取菜单或权限信息' })
  @ApiOkResponse({ type: MenuItemAndParentInfoResult })
  @Get('info')
  async info(@Query() dto: InfoMenuDto): Promise<MenuItemAndParentInfoResult> {
    return await this.menuService.getMenuItemAndParentInfo(dto.menuId);
  }
}
