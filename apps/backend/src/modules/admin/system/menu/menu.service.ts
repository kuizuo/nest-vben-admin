import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { concat, includes, isEmpty, uniq } from 'lodash';
import { ROOT_ROLE_ID } from '@/modules/admin/admin.constants';
import { ApiException } from '@/common/exceptions/api.exception';
import SysMenu from '@/entities/admin/sys-menu.entity';
import { In, IsNull, Like, Not, Repository } from 'typeorm';
import { SysRoleService } from '../role/role.service';
import { MenuItemAndParentInfoResult } from './menu.class';
import { MenuCreateDto, MenuSearchDto } from './menu.dto';
import { RedisService } from '@/shared/services/redis.service';
import { generatorMenu, generatorRouters } from '@/common/permission';

@Injectable()
export class SysMenuService {
  constructor(
    @InjectRepository(SysMenu) private menuRepository: Repository<SysMenu>,
    private redisService: RedisService,
    @Inject(ROOT_ROLE_ID) private rootRoleId: number,
    private roleService: SysRoleService,
  ) {}

  /**
   * 获取所有菜单以及权限
   */
  async list(): Promise<string[]> {
    // const { name, path, permission, component, status } = dto;
    // const where = {
    //   ...(name ? { name: Like(`%${name}%`) } : null),
    //   ...(path ? { path: Like(`%${path}%`) } : null),
    //   ...(permission ? { permission: Like(`%${permission}%`) } : null),
    //   ...(component ? { component: Like(`%${component}%`) } : null),
    //   ...(status ? { status: status } : null),
    // };
    const menus = await this.menuRepository.find({
      order: { orderNo: 'ASC' },
    });
    const menuList = generatorMenu(menus);
    return menuList;
  }

  /**
   * 保存或新增菜单
   */
  async save(menu: MenuCreateDto & { id?: number }): Promise<void> {
    await this.menuRepository.save(menu);
  }

  /**
   * 根据角色获取所有菜单
   */
  async getMenus(uid: number): Promise<string[]> {
    const roleIds = await this.roleService.getRoleIdByUser(uid);
    let menus: SysMenu[] = [];
    if (includes(roleIds, this.rootRoleId)) {
      menus = await this.menuRepository.find({ order: { orderNo: 'ASC' } });
    } else {
      menus = await this.menuRepository
        .createQueryBuilder('menu')
        .innerJoinAndSelect('sys_role_menu', 'role_menu', 'menu.id = role_menu.menu_id')
        .andWhere('role_menu.role_id IN (:...roldIds)', { roldIds: roleIds })
        .orderBy('menu.order_no', 'ASC')
        .getMany();
    }

    const menuList = generatorRouters(menus);
    return menuList;
  }

  /**
   * 检查菜单创建规则是否符合
   */
  async check(dto: MenuCreateDto): Promise<void | never> {
    if (dto.type === 2 && !dto.parent) {
      // 无法直接创建权限，必须有parent
      throw new ApiException(10005);
    }
    if (dto.type === 1 && dto.parent) {
      const parent = await this.getMenuItemInfo(dto.parent);
      if (isEmpty(parent)) {
        throw new ApiException(10014);
      }
      if (parent && parent.type === 1) {
        // 当前新增为菜单但父节点也为菜单时为非法操作
        throw new ApiException(10006);
      }
    }
  }

  /**
   * 查找当前菜单下的子菜单，目录以及菜单
   */
  async findChildMenus(mid: number): Promise<any> {
    const allMenus: any = [];
    const menus = await this.menuRepository.findBy({ parent: mid });
    // if (_.isEmpty(menus)) {
    //   return allMenus;
    // }
    // const childMenus: any = [];
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].type !== 2) {
        // 子目录下是菜单或目录，继续往下级查找
        const c = await this.findChildMenus(menus[i].id);
        allMenus.push(c);
      }
      allMenus.push(menus[i].id);
    }
    return allMenus;
  }

  /**
   * 获取某个菜单的信息
   * @param mid menu id
   */
  async getMenuItemInfo(mid: number): Promise<SysMenu> {
    const menu = await this.menuRepository.findOneBy({ id: mid });
    return menu;
  }

  /**
   * 获取某个菜单以及关联的父菜单的信息
   */
  async getMenuItemAndParentInfo(mid: number): Promise<MenuItemAndParentInfoResult> {
    const menu = await this.menuRepository.findOneBy({ id: mid });
    let parentMenu: SysMenu | undefined = undefined;
    if (menu && menu.parent) {
      parentMenu = await this.menuRepository.findOneBy({ id: menu.parent });
    }
    return { menu, parentMenu };
  }

  /**
   * 查找节点路由是否存在
   */
  async findRouterExist(path: string): Promise<boolean> {
    const menus = await this.menuRepository.findOneBy({ path });
    return !isEmpty(menus);
  }

  /**
   * 获取当前用户的所有权限
   */
  async getPerms(uid: number): Promise<string[]> {
    const roleIds = await this.roleService.getRoleIdByUser(uid);
    let permission: any[] = [];
    let result: any = null;
    if (includes(roleIds, this.rootRoleId)) {
      result = await this.menuRepository.findBy({
        permission: Not(IsNull()),
        type: In([1, 2]),
      });
    } else {
      if (isEmpty(roleIds)) {
        return permission;
      }
      result = await this.menuRepository
        .createQueryBuilder('menu')
        .innerJoinAndSelect('sys_role_menu', 'role_menu', 'menu.id = role_menu.menu_id')
        .andWhere('role_menu.role_id IN (:...roldIds)', { roldIds: roleIds })
        .andWhere('menu.type IN (1,2)')
        .andWhere('menu.permission IS NOT NULL')
        .getMany();
    }
    if (!isEmpty(result)) {
      result.forEach((e) => {
        if (e.permission) {
          permission = concat(permission, e.permission.split(','));
        }
      });
      permission = uniq(permission);
    }
    return permission;
  }

  /**
   * 删除多项菜单
   */
  async deleteMenuItem(mids: number[]): Promise<void> {
    await this.menuRepository.delete(mids);
  }

  /**
   * 刷新指定用户ID的权限
   */
  async refreshPerms(uid: number): Promise<void> {
    const perms = await this.getPerms(uid);
    const online = await this.redisService.getRedis().get(`admin:token:${uid}`);
    if (online) {
      // 判断是否在线
      await this.redisService.getRedis().set(`admin:perms:${uid}`, JSON.stringify(perms));
    }
  }

  /**
   * 刷新所有在线用户的权限
   */
  async refreshOnlineUserPerms(): Promise<void> {
    const onlineUserIds: string[] = await this.redisService.getRedis().keys('admin:token:*');
    if (onlineUserIds && onlineUserIds.length > 0) {
      for (let i = 0; i < onlineUserIds.length; i++) {
        const uid = onlineUserIds[i].split('admin:token:')[1];
        if (!uid) continue;
        const perms = await this.getPerms(parseInt(uid));
        await this.redisService.getRedis().set(`admin:perms:${uid}`, JSON.stringify(perms));
      }
    }
  }
}
