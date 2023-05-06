import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { difference, isEmpty } from 'lodash';
import { EntityManager, In, Like, Not, Repository } from 'typeorm';

import { IAppConfig } from '@/config';
import { paginate } from '@/helper/paginate';
import { Pagination } from '@/helper/paginate/pagination';
import { MenuEntity } from '@/modules/system/menu/menu.entity';
import { RoleEntity } from '@/modules/system/role/role.entity';

import { RoleDto, RolePageDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 列举所有角色：除去超级管理员
   */
  async findAll(): Promise<RoleEntity[]> {
    const result = await this.roleRepository.findBy({
      // id: Not(this.adminRoleId),
    });

    return result;
  }

  /**
   * 列举所有角色条数：除去超级管理员
   */
  async count(): Promise<number> {
    const count = await this.roleRepository.countBy({
      id: Not(this.configService.get<IAppConfig>('app').adminRoleId),
    });
    return count;
  }

  /**
   * 根据角色获取角色信息
   */
  async info(rid: number): Promise<any> {
    const info = await this.roleRepository.findOneBy({ id: rid });
    const menus = await this.menuRepository.findBy({ roles: { id: rid } });

    return { ...info, menus };
  }

  async delete(id: number): Promise<void> {
    if (id === this.configService.get<IAppConfig>('app').adminRoleId) {
      throw new Error('不能删除超级管理员');
    }

    await this.roleRepository.delete(id);
  }

  /**
   * 增加角色
   */
  async create({ menus, ...data }: RoleDto): Promise<{ roleId: number }> {
    const role = await this.roleRepository.save({
      ...data,
      menus: menus ? await this.menuRepository.findByIds(menus) : [],
    });

    return { roleId: role.id };
  }

  /**
   * 更新角色信息
   */
  async update(id, { menus, ...data }: Partial<RoleDto>): Promise<void> {
    // 对比 menu 差异
    const originMenus = await this.menuRepository.find({
      where: { roles: { id } },
    });
    const originMenuIds = originMenus.map((m) => m.id);
    const insertMenusRowIds = difference(menus, originMenuIds);
    const deleteMenusRowIds = difference(originMenuIds, menus);

    // using transaction
    await this.entityManager.transaction(async (manager) => {
      if (!isEmpty(menus)) {
        await manager
          .createQueryBuilder()
          .relation(RoleEntity, 'menus')
          .of(id)
          .addAndRemove(insertMenusRowIds, deleteMenusRowIds);
      }
    });
  }

  /**
   * 分页加载角色信息
   */
  async page({
    page,
    pageSize,
    name,
    value,
    status,
  }: RolePageDto): Promise<Pagination<RoleEntity>> {
    const queryBuilder = await this.roleRepository
      .createQueryBuilder('role')
      .where({
        ...(value ? { value: Like(`%${value}%`) } : null),
        ...(name ? { name: Like(`%${name}%`) } : null),
        ...(status ? { status } : null),
      })
      .orderBy('role.id', 'ASC');

    return paginate(queryBuilder, { page, pageSize });
  }

  /**
   * 根据用户id查找角色信息
   */
  async getRoleIdsByUser(id: number): Promise<number[]> {
    const roles = await this.roleRepository.find({
      where: {
        users: { id },
      },
    });

    if (!isEmpty(roles)) {
      return roles.map((r) => r.id);
    }
    return [];
  }

  async getRoleValues(ids: number[]): Promise<string[]> {
    return (
      await this.roleRepository.findBy({
        id: In(ids),
      })
    ).map((r) => r.value);
  }

  async isAdminRoleByUser(uid: number): Promise<boolean> {
    const roles = await this.roleRepository.find({
      where: {
        users: { id: uid },
      },
    });

    if (!isEmpty(roles)) {
      return roles.some(
        (r) => r.id === this.configService.get('app').adminRoleId,
      );
    }
    return false;
  }

  hasAdminRole(rids: number[]): boolean {
    return rids.some(
      (r) => r === this.configService.get<IAppConfig>('app').adminRoleId,
    );
  }
}
