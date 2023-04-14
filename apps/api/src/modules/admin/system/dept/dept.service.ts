import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Like, Repository, TreeRepository } from 'typeorm';
import { includes, isEmpty } from 'lodash';
import { ApiException } from 'src/common/exceptions/api.exception';
import { SysUser } from '@/entities/admin/sys-user.entity';
import { SysDept } from '@/entities/admin/sys-dept.entity';
import { SysRoleService } from '../role/role.service';
import { SysRoleDept } from '@/entities/admin/sys-role-dept.entity';
import { DeptDetailInfo, DeptTree } from './dept.modal';
import {
  MoveDept,
  DeptUpdateDto,
  DeptCreateDto,
  DeptListDto,
} from './dept.dto';
import { filterTree, list2Tree } from '@/utils/list2tree';
import { ErrorEnum } from '@/common/constants/error';
import { AppConfigService } from '@/shared/services/app/app-config.service';

@Injectable()
export class SysDeptService {
  constructor(
    @InjectRepository(SysUser)
    private userRepository: Repository<SysUser>,
    @InjectRepository(SysDept)
    private deptRepository: TreeRepository<SysDept>,
    @InjectRepository(SysRoleDept)
    private roleDeptRepository: Repository<SysRoleDept>,
    @InjectEntityManager() private entityManager: EntityManager,
    private roleService: SysRoleService,
    private configService: AppConfigService,
  ) {}

  /**
   * 获取所有部门
   */
  async list(): Promise<SysDept[]> {
    return await this.deptRepository.find({ order: { orderNo: 'DESC' } });
  }

  /**
   * 根据ID查找部门信息
   */
  async info(id: number): Promise<DeptDetailInfo> {
    const dept = await this.deptRepository.findOneBy({ id });
    if (isEmpty(dept)) {
      throw new ApiException(ErrorEnum.CODE_1019);
    }
    let parent = null;
    if (dept.parent?.id) {
      parent = await this.deptRepository.findOneBy({
        id: dept.parent.id,
      });
    }
    return { ...dept, parent };
  }

  /**
   * 更新部门信息
   */
  async update(dto: DeptUpdateDto): Promise<void> {
    const { name, orderNo, parentId } = dto;
    const parent = await this.deptRepository.findOneBy({ id: parentId });

    const dept = new SysDept();
    dept.name = name;
    dept.parent = parent;
    dept.orderNo = orderNo;
    await this.deptRepository.save(dept);
  }

  /**
   * 转移部门
   */
  async transfer(userIds: number[], deptId: number): Promise<void> {
    await this.userRepository.update({ id: In(userIds) }, { deptId: deptId });
  }

  /**
   * 新增部门
   */
  async add(dto: DeptCreateDto): Promise<void> {
    const { name, parentId, orderNo } = dto;
    const parent = await this.deptRepository.findOne({
      where: { id: parentId },
    });

    const dept = new SysDept();
    dept.name = name;
    dept.parent = parent;
    dept.orderNo = orderNo;

    await this.deptRepository.save(dept);
  }

  /**
   * 移动排序
   */
  async move(depts: MoveDept[]): Promise<void> {
    await this.entityManager.transaction(async (manager) => {
      for (let i = 0; i < depts.length; i++) {
        const dept = depts[i];
        await manager.save(dept);
      }
    });
  }

  /**
   * 根据ID删除部门
   */
  async delete(deptId: number): Promise<void> {
    await this.deptRepository.delete(deptId);
  }

  /**
   * 根据部门查询关联的用户数量
   */
  async countUserByDeptId(id: number): Promise<number> {
    return await this.userRepository.countBy({ deptId: id });
  }

  /**
   * 查找当前部门下的子部门数量
   */
  async countChildDept(id: number): Promise<number> {
    const item = await this.deptRepository.findOneBy({ id });
    return await this.deptRepository.countDescendants(item);
  }

  /**
   * 根据大区查询关联的角色数量
   */
  async countRoleByDeptId(id: number): Promise<number> {
    return await this.roleDeptRepository.countBy({ deptId: id });
  }

  /**
   * 获取部门列表树结构
   */
  async getDeptTree(uid: number, dto: DeptListDto): Promise<DeptTree[]> {
    if (uid === this.configService.appConfig.rootUserId) {
      return await this.deptRepository.findTrees();
    } else {
      const set = new Set<number>();
      const depts = await this.deptRepository
        .createQueryBuilder('dept')
        .leftJoinAndSelect('dept.parent', 'parent')
        .leftJoinAndSelect('dept.children', 'children')
        .andWhere('user_dept.user_id = :uid', { uid })
        .getMany();

      const deptTree = await this.deptRepository.findTrees();

      const ids = Array.from(set);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return filterTree(deptTree, (item) => ids.includes(item.id));
    }
  }

  /**
   * 根据当前角色id获取部门列表
   */
  async getDepts(uid: number): Promise<SysDept[]> {
    const roleIds = await this.roleService.getRoleIdByUser(uid);
    let depts: any = [];

    if (includes(roleIds, 1)) {
      // root find all
      depts = await this.deptRepository.find();
    } else {
      // [ 1, 2, 3 ] role find
      depts = await this.deptRepository
        .createQueryBuilder('dept')
        .innerJoinAndSelect(
          'sys_role_dept',
          'role_dept',
          'dept.id = role_dept.dept_id',
        )
        .andWhere('role_dept.role_id IN (:...roldIds)', { roldIds: roleIds })
        .orderBy('dept.order_no', 'ASC')
        .getMany();
    }
    return depts;
  }
}
