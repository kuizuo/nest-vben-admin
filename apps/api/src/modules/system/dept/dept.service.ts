import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Like, Repository, TreeRepository } from 'typeorm';
import { includes, isEmpty } from 'lodash';
import { ApiException } from '@/exceptions/api.exception';
import { UserEntity } from '@/modules/system/user/entities/user.entity';
import { DeptEntity } from '@/modules/system/dept/dept.entity';
import { RoleService } from '../role/role.service';
import { DeptDetailInfo, DeptTree } from './dept.modal';
import {
  MoveDept,
  DeptUpdateDto,
  DeptCreateDto,
  DeptListDto,
} from './dept.dto';
import { filterTree, list2Tree } from '@/utils/list2tree';
import { ErrorEnum } from '@/constants/error';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from '@/config';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(DeptEntity)
    private deptRepository: TreeRepository<DeptEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
    private roleService: RoleService,
    private configService: ConfigService,
  ) {}

  /**
   * 获取所有部门
   */
  async list(): Promise<DeptEntity[]> {
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

    const dept = new DeptEntity();
    dept.name = name;
    dept.parent = parent;
    dept.orderNo = orderNo;
    await this.deptRepository.save(dept);
  }

  /**
   * 新增部门
   */
  async add(dto: DeptCreateDto): Promise<void> {
    const { name, parentId, orderNo } = dto;
    const parent = await this.deptRepository.findOne({
      where: { id: parentId },
    });

    const dept = new DeptEntity();
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
    return await this.userRepository.countBy({ depts: { id } });
  }

  /**
   * 查找当前部门下的子部门数量
   */
  async countChildDept(id: number): Promise<number> {
    const item = await this.deptRepository.findOneBy({ id });
    return await this.deptRepository.countDescendants(item);
  }

  /**
   * 获取部门列表树结构
   */
  async getDeptTree(uid: number, dto: DeptListDto): Promise<DeptTree[]> {
    if (uid === this.configService.get<IAppConfig>('app').rootRoleId) {
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
  async getDepts(uid: number): Promise<DeptEntity[]> {
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
