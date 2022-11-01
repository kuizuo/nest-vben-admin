import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { difference, filter, includes, isEmpty, map } from 'lodash';
import { EntityManager, In, Like, Not, Repository } from 'typeorm';
import SysRole from '@/entities/admin/sys-role.entity';
import SysMenu from '@/entities/admin/sys-menu.entity';
import SysRoleMenu from '@/entities/admin/sys-role-menu.entity';
import SysUserRole from '@/entities/admin/sys-user-role.entity';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { CreatedRoleId } from './role.class';
import { ROOT_ROLE_ID } from '@/modules/admin/admin.constants';
import { PageSearchRoleDto } from './role.dto';
import { PageResult } from '@/common/class/res.class';

@Injectable()
export class SysRoleService {
  constructor(
    @InjectRepository(SysRole) private roleRepository: Repository<SysRole>,
    @InjectRepository(SysMenu) private menuRepository: Repository<SysMenu>,
    @InjectRepository(SysRoleMenu) private roleMenuRepository: Repository<SysRoleMenu>,
    @InjectRepository(SysUserRole) private userRoleRepository: Repository<SysUserRole>,
    @InjectEntityManager() private entityManager: EntityManager,
    @Inject(ROOT_ROLE_ID) private rootRoleId: number,
  ) {}

  /**
   * 列举所有角色：除去超级管理员
   */
  async list(): Promise<SysRole[]> {
    const result = await this.roleRepository.findBy({
      // id: Not(this.rootRoleId),
    });

    return result;
  }

  /**
   * 列举所有角色条数：除去超级管理员
   */
  async count(): Promise<number> {
    const count = await this.roleRepository.countBy({
      id: Not(this.rootRoleId),
    });
    return count;
  }

  /**
   * 根据角色获取角色信息
   */
  async info(rid: number): Promise<any> {
    const info = await this.roleRepository.findOneBy({ id: rid });
    const roleMenus = await this.roleMenuRepository.findBy({ roleId: rid });
    const menus = roleMenus.map((m) => m.menuId);

    return { ...info, menus };
  }

  /**
   * 根据角色Id数组删除
   */
  async delete(roleIds: number[]): Promise<void> {
    if (includes(roleIds, this.rootRoleId)) {
      throw new Error('不能删除超级管理员');
    }
    await this.entityManager.transaction(async (manager) => {
      await manager.delete(SysRole, roleIds);
      await manager.delete(SysRoleMenu, { roleId: In(roleIds) });
    });
  }

  /**
   * 增加角色
   */
  async add(param: CreateRoleDto): Promise<CreatedRoleId> {
    const { name, value, remark, menus } = param;
    const role = await this.roleRepository.insert({
      name,
      value,
      remark,
    });
    const { identifiers } = role;
    const roleId = parseInt(identifiers[0].id);
    if (menus && menus.length > 0) {
      // 关联菜单
      const insertRows = menus.map((m) => {
        return {
          roleId,
          menuId: m,
        };
      });
      await this.roleMenuRepository.insert(insertRows);
    }
    return { roleId };
  }

  /**
   * 更新角色信息
   */
  async update(param: UpdateRoleDto): Promise<SysRole> {
    const { id: roleId, name, value, remark, status, menus } = param;
    const role = await this.roleRepository.save({
      id: roleId,
      name,
      value,
      remark,
      status,
    });
    const originMenuRows = await this.roleMenuRepository.findBy({ roleId });
    const originMenuIds = originMenuRows.map((e) => {
      return e.menuId;
    });

    // 开始对比差异
    const insertMenusRowIds = difference(menus, originMenuIds);
    const deleteMenusRowIds = difference(originMenuIds, menus);
    // using transaction
    await this.entityManager.transaction(async (manager) => {
      // 菜单
      if (insertMenusRowIds.length > 0) {
        // 有条目更新
        const insertRows = insertMenusRowIds.map((e) => {
          return {
            roleId,
            menuId: e,
          };
        });
        await manager.insert(SysRoleMenu, insertRows);
      }
      if (deleteMenusRowIds.length > 0) {
        // 有条目需要删除
        const realDeleteRowIds = filter(originMenuRows, (e) => {
          return includes(deleteMenusRowIds, e.menuId);
        }).map((e) => {
          return e.id;
        });
        await manager.delete(SysRoleMenu, realDeleteRowIds);
      }
    });
    return role;
  }

  /**
   * 分页加载角色信息
   */
  async page(dto: PageSearchRoleDto): Promise<PageResult<SysRole>> {
    const { page, pageSize, name, value, status } = dto;
    const where = {
      ...(value ? { value: Like(`%${value}%`) } : null),
      ...(name ? { name: Like(`%${name}%`) } : null),
      ...(status ? { status: status } : null),
    };
    const [items, total] = await this.roleRepository
      .createQueryBuilder('role')
      .where({
        // id: Not(this.rootRoleId),
        ...where,
      })
      .orderBy('role.id', 'ASC')
      .skip(pageSize * (page - 1))
      .take(pageSize)
      .getManyAndCount();

    return { items, total };
  }

  /**
   * 根据用户id查找角色信息
   */
  async getRoleIdByUser(id: number): Promise<number[]> {
    const result = await this.userRoleRepository.findBy({
      userId: id,
    });
    if (!isEmpty(result)) {
      return map(result, (v) => {
        return v.roleId;
      });
    }
    return [];
  }

  /**
   * 根据角色ID列表查找关联用户ID
   */
  async countUserIdByRole(ids: number[]): Promise<number | never> {
    if (includes(ids, this.rootRoleId)) {
      throw new Error('Not Support Delete Root');
    }
    return await this.userRoleRepository.countBy({ roleId: In(ids) });
  }
}
