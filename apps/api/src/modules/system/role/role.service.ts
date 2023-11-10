import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { isEmpty } from 'lodash'
import { EntityManager, In, Repository } from 'typeorm'

import { PageOptionsDto } from '@/common/dto/page-options.dto'
import { IAppConfig } from '@/config'
import { paginate } from '@/helper/paginate'
import { Pagination } from '@/helper/paginate/pagination'
import { MenuEntity } from '@/modules/system/menu/menu.entity'
import { RoleEntity } from '@/modules/system/role/role.entity'

import { RoleDto } from './role.dto'
import { RoleInfo } from './role.model'

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
  async findAll({
    page,
    pageSize,
  }: PageOptionsDto): Promise<Pagination<RoleEntity>> {
    return paginate(this.roleRepository, { page, pageSize })
  }

  /**
   * 根据角色获取角色信息
   */
  async info(id: number): Promise<RoleInfo> {
    const info = await this.roleRepository
      .createQueryBuilder('role')
      .where({
        id,
      })
      .getOne()

    // if (id === this.configService.get<IAppConfig>('app').adminRoleId) {
    //   const menus = await this.menuRepository.find({ select: ['id'] });
    //   return { ...info, menuIds: menus.map((m) => m.id) };
    // }

    const menus = await this.menuRepository.find({
      where: { roles: { id } },
      select: ['id'],
    })

    return { ...info, menuIds: menus.map((m) => m.id) }
  }

  async delete(id: number): Promise<void> {
    if (id === this.configService.get<IAppConfig>('app').adminRoleId) {
      throw new Error('不能删除超级管理员')
    }

    await this.roleRepository.delete(id)
  }

  /**
   * 增加角色
   */
  async create({ menuIds, ...data }: RoleDto): Promise<{ roleId: number }> {
    const role = await this.roleRepository.save({
      ...data,
      menus: menuIds
        ? await this.menuRepository.findBy({ id: In(menuIds) })
        : [],
    })

    return { roleId: role.id }
  }

  /**
   * 更新角色信息
   */
  async update(id, { menuIds, ...data }: Partial<RoleDto>): Promise<void> {
    await this.roleRepository.update(id, data)

    if (!isEmpty(menuIds)) {
      // using transaction
      await this.entityManager.transaction(async (manager) => {
        const menus = await this.menuRepository.find({
          where: { id: In(menuIds) },
        })

        const role = await this.roleRepository.findOne({ where: { id } })
        role.menus = menus
        await manager.save(role)
      })
    }
  }

  /**
   * 根据用户id查找角色信息
   */
  async getRoleIdsByUser(id: number): Promise<number[]> {
    const roles = await this.roleRepository.find({
      where: {
        users: { id },
      },
    })

    if (!isEmpty(roles)) {
      return roles.map((r) => r.id)
    }
    return []
  }

  async getRoleValues(ids: number[]): Promise<string[]> {
    return (
      await this.roleRepository.findBy({
        id: In(ids),
      })
    ).map((r) => r.value)
  }

  async isAdminRoleByUser(uid: number): Promise<boolean> {
    const roles = await this.roleRepository.find({
      where: {
        users: { id: uid },
      },
    })

    if (!isEmpty(roles)) {
      return roles.some(
        (r) => r.id === this.configService.get('app').adminRoleId,
      )
    }
    return false
  }

  hasAdminRole(rids: number[]): boolean {
    return rids.some(
      (r) => r === this.configService.get<IAppConfig>('app').adminRoleId,
    )
  }

  /**
   * 根据角色ID查找是否有关联用户
   */
  async checkUserByRoleId(id: number): Promise<boolean> {
    return !!(await this.roleRepository.findOne({
      where: {
        users: {
          id,
        },
      },
    }))
  }
}
