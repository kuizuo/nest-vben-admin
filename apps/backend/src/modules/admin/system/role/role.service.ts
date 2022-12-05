import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { difference, filter, includes, isEmpty, map } from 'lodash';
import { EntityManager, In, Like, Not, Repository } from 'typeorm';
import { SysRole } from '@/entities/admin/sys-role.entity';
import { SysMenu } from '@/entities/admin/sys-menu.entity';
import { SysRoleMenu } from '@/entities/admin/sys-role-menu.entity';
import { SysUserRole } from '@/entities/admin/sys-user-role.entity';
import { RoleCreateDto, RoleUpdateDto } from './role.dto';
import { RolePageDto } from './role.dto';
import { PageRespData } from '@/common/response.modal';
import { AppGeneralService } from '@/shared/services/app/app-general.service';
import { AppConfigService } from '@/shared/services/app/app-config.service';

@Injectable()
export class SysRoleService {
  constructor(
    @InjectRepository(SysRole) private roleRepo: Repository<SysRole>,
    @InjectRepository(SysMenu) private menuRepo: Repository<SysMenu>,
    @InjectRepository(SysRoleMenu)
    private roleMenuRepo: Repository<SysRoleMenu>,
    @InjectRepository(SysUserRole)
    private userRoleRepo: Repository<SysUserRole>,
    @InjectEntityManager() private entityManager: EntityManager,
    private readonly configService: AppConfigService,
    private readonly generalService: AppGeneralService,
  ) {}

  /**
   * 列举所有角色：除去超级管理员
   */
  async list(): Promise<SysRole[]> {
    const result = await this.roleRepo.findBy({
      // id: Not(this.rootRoleId),
    });

    return result;
  }

  /**
   * 列举所有角色条数：除去超级管理员
   */
  async count(): Promise<number> {
    const count = await this.roleRepo.countBy({});
    return count;
  }

  /**
   * 根据角色获取角色信息
   */
  async info(rid: number): Promise<any> {
    const info = await this.roleRepo.findOneBy({ id: rid });
    const roleMenus = await this.roleMenuRepo.findBy({ roleId: rid });
    const menus = roleMenus.map((m) => m.menuId);

    return { ...info, menus };
  }

  /**
   * 根据角色Id数组删除
   */
  async delete(roleIds: number[]): Promise<void> {
    const rootUser = await this.userRoleRepo.findOneBy({
      userId: this.configService.appConfig.rootUserId,
    });

    if (includes(roleIds, rootUser.roleId)) {
      throw new BadRequestException('不能删除超级管理员');
    }

    await this.entityManager.transaction(async (manager) => {
      await manager.delete(SysRole, roleIds);
      await manager.delete(SysRoleMenu, { roleId: In(roleIds) });
    });
  }

  /**
   * 增加角色
   */
  async add(param: RoleCreateDto): Promise<{ roleId: number }> {
    const { name, value, remark, menus } = param;
    const role = await this.roleRepo.insert({
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
      await this.roleMenuRepo.insert(insertRows);
    }
    return { roleId };
  }

  /**
   * 更新角色信息
   */
  async update(param: RoleUpdateDto): Promise<SysRole> {
    const { id: roleId, name, value, remark, status, menus } = param;
    const role = await this.roleRepo.save({
      id: roleId,
      name,
      value,
      remark,
      status,
    });
    const originMenuRows = await this.roleMenuRepo.findBy({ roleId });
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
  async page(dto: RolePageDto): Promise<PageRespData<SysRole>> {
    const { page, pageSize, name, value, status } = dto;
    const where = {
      ...(value ? { value: Like(`%${value}%`) } : null),
      ...(name ? { name: Like(`%${name}%`) } : null),
      ...(status ? { status: status } : null),
    };
    const [items, total] = await this.roleRepo
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
  async getRoleIdByUser(uid: number): Promise<number[]> {
    const result = await this.userRoleRepo.findBy({
      userId: uid,
    });
    if (!isEmpty(result)) {
      return result.map((e) => e.roleId);
    }
    return [];
  }

  /**
   * 根据角色id返回所有用户id
   */
  async getUserIdsByRole(rid: number): Promise<number[]> {
    const result = await this.userRoleRepo.findBy({
      roleId: rid,
    });
    if (!isEmpty(result)) {
      return result.map((v) => v.userId);
    }
    return [];
  }

  /**
   * 根据角色ID列表查找关联用户ID
   */
  async countUserIdByRole(ids: number[]): Promise<number | never> {
    const rootUser = await this.userRoleRepo.findOneBy({
      userId: this.configService.appConfig.rootUserId,
    });

    if (includes(ids, rootUser.roleId)) {
      throw new BadRequestException('不支持删除根角色');
    }
    return await this.userRoleRepo.countBy({ roleId: In(ids) });
  }
}
