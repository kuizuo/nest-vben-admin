import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { findIndex, isEmpty } from 'lodash';
import { ApiException } from '@/common/exceptions/api.exception';
import { SysUserRole } from '@/entities/admin/sys-user-role.entity';
import { SysUser } from '@/entities/admin/sys-user.entity';
import { SysRole } from '@/entities/admin/sys-role.entity';
import { UtilService } from '@/shared/services/util.service';
import { EntityManager, In, Like, Not, Repository } from 'typeorm';
import {
  UserCreateDto,
  UserPageDto,
  PasswordUpdateDto,
  UserUpdateDto,
  UserInfoUpdateDto,
} from './user.dto';
import { RegisterInfoDto } from '../../login/login.dto';
import { AccountInfo, UserInfoPage } from './user.modal';
import { RedisService } from '@/shared/services/redis.service';
import { SysParamConfigService } from '../param-config/param-config.service';
import { SYS_USER_INITPASSWORD } from '@/common/constants/param-config';
import { PageResult } from '@/common/class/res.class';
import { QQService } from '@/shared/services/qq.service';
import { AppConfigService } from '@/shared/services/app/app-config.service';
import { AppGeneralService } from '/@/shared/services/app/app-general.service';
import { ErrorEnum } from '@/common/constants/error';

@Injectable()
export class SysUserService {
  constructor(
    private readonly redisService: RedisService,
    private readonly paramConfigService: SysParamConfigService,
    @InjectRepository(SysUser)
    private readonly userRepo: Repository<SysUser>,
    @InjectRepository(SysRole)
    private readonly roleRepo: Repository<SysRole>,
    @InjectRepository(SysUserRole)
    private userRoleRepo: Repository<SysUserRole>,
    @InjectEntityManager() private entityManager: EntityManager,
    private readonly qqService: QQService,
    private readonly util: UtilService,
    private readonly generalService: AppGeneralService,
    private readonly configService: AppConfigService,
  ) {}

  /**
   * 根据用户名查找已经启用的用户
   */
  async findUserByUserName(username: string): Promise<SysUser | undefined> {
    return await this.userRepo.findOneBy({
      username: username,
      status: 1,
    });
  }

  /**
   * 获取用户信息
   * @param uid user id
   */
  async getAccountInfo(uid: number): Promise<AccountInfo> {
    const user: SysUser = await this.userRepo.findOneBy({ id: uid });
    if (isEmpty(user)) {
      throw new ApiException(ErrorEnum.CODE_1017);
    }
    return {
      username: user.username,
      nickName: user.nickName,
      email: user.email,
      phone: user.phone,
      remark: user.remark,
      avatar: user.avatar,
      qq: user.qq,
    };
  }

  /**
   * 更新个人信息
   */
  async updateAccountInfo(uid: number, info: UserInfoUpdateDto): Promise<void> {
    const user = await this.userRepo.findOneBy({ id: uid });
    if (isEmpty(user)) {
      throw new ApiException(ErrorEnum.CODE_1017);
    }

    const data = {
      ...(info.nickName ? { nickName: info.nickName } : null),
      ...(info.avatar ? { avatar: info.avatar } : null),
      ...(info.email ? { email: info.email } : null),
      ...(info.phone ? { phone: info.phone } : null),
      ...(info.qq ? { qq: info.qq } : null),
      ...(info.remark ? { remark: info.remark } : null),
    };

    if (!info.avatar && info.qq) {
      // 如果qq不等于原qq，则更新qq头像
      if (info.qq !== user.qq) {
        data.avatar = await this.qqService.getAvater(info.qq);
      }
    }

    await this.userRepo.update(uid, data);
  }

  /**
   * 更改密码
   */
  async updatePassword(uid: number, dto: PasswordUpdateDto): Promise<void> {
    const user = await this.userRepo.findOneBy({ id: uid });
    if (isEmpty(user)) {
      throw new ApiException(ErrorEnum.CODE_1017);
    }
    const comparePassword = this.util.md5(`${dto.oldPassword}${user.psalt}`);
    // 原密码不一致，不允许更改
    if (user.password !== comparePassword) {
      throw new ApiException(ErrorEnum.CODE_1011);
    }
    const password = this.util.md5(`${dto.newPassword}${user.psalt}`);
    await this.userRepo.update({ id: uid }, { password });
    await this.upgradePasswordV(user.id);
  }

  /**
   * 直接更改密码
   */
  async forceUpdatePassword(uid: number, password: string): Promise<void> {
    const user = await this.userRepo.findOneBy({ id: uid });
    if (isEmpty(user)) {
      throw new ApiException(ErrorEnum.CODE_1017);
    }
    const newPassword = this.util.md5(`${password}${user.psalt}`);
    await this.userRepo.update({ id: uid }, { password: newPassword });
    await this.upgradePasswordV(user.id);
  }

  /**
   * 增加系统用户，如果返回false则表示已存在该用户
   * @param param Object 对应SysUser实体类
   */
  async add(param: UserCreateDto): Promise<void> {
    // const insertData: any = { ...CreateUserDto };
    const exists = await this.userRepo.findOneBy({
      username: param.username,
    });
    if (!isEmpty(exists)) {
      throw new ApiException(ErrorEnum.CODE_1001);
    }
    await this.entityManager.transaction(async (manager) => {
      const salt = this.util.generateRandomValue(32);

      let password;
      if (!param.password) {
        const initPassword = await this.paramConfigService.findValueByKey(
          SYS_USER_INITPASSWORD,
        );
        password = this.util.md5(`${initPassword ?? 'a123456'}${salt}`);
      } else {
        password = this.util.md5(`${param.password ?? 'a123456'}${salt}`);
      }

      const avatar = await this.qqService.getAvater(param.qq);
      const nickName =
        param.nickName || (await this.qqService.getNickname(param.qq));
      const u = manager.create(SysUser, {
        username: param.username,
        password,
        nickName,
        avatar,
        qq: param.qq,
        email: param.email,
        phone: param.phone,
        remark: param.remark,
        status: param.status,
        psalt: salt,
      });
      const result = await manager.save(u);
      const { roles } = param;
      const insertRoles = roles.map((e) => {
        return {
          roleId: e,
          userId: result.id,
        };
      });
      // 分配角色
      await manager.insert(SysUserRole, insertRoles);
    });
  }

  /**
   * 更新用户信息
   */
  async update(param: UserUpdateDto): Promise<void> {
    if (this.generalService.isRootUser(param.id)) {
      throw new BadRequestException('不能更新超级管理员');
    }

    await this.entityManager.transaction(async (manager) => {
      if (param.password) {
        await this.forceUpdatePassword(param.id, param.password);
      }

      const avatar = await this.qqService.getAvater(param.qq);
      await manager.update(SysUser, param.id, {
        username: param.username,
        nickName: param.nickName,
        qq: param.qq,
        avatar,
        email: param.email,
        phone: param.phone,
        remark: param.remark,
        status: param.status,
      });
      // 先删除原来的角色关系
      await manager.delete(SysUserRole, { userId: param.id });
      const insertRoles = param.roles.map((e) => {
        return {
          roleId: e,
          userId: param.id,
        };
      });
      // 重新分配角色
      await manager.insert(SysUserRole, insertRoles);
      if (param.status === 0) {
        // 禁用状态
        await this.forbidden(param.id);
      }
    });
  }

  /**
   * 查找用户信息
   * @param id 用户id
   */
  async info(id: number): Promise<SysUser & { roles: number[] }> {
    const user: SysUser = await this.userRepo.findOneBy({ id });
    if (isEmpty(user)) {
      throw new ApiException(ErrorEnum.CODE_1017);
    }
    const roleRows = await this.userRoleRepo.findBy({ userId: user.id });
    const roles = roleRows.map((e) => {
      return e.roleId;
    });
    delete user.password;
    delete user.psalt;
    return { ...user, roles };
  }

  /**
   * 查找列表里的信息
   */
  async infoList(ids: number[]): Promise<SysUser[]> {
    const users = await this.userRepo.findByIds(ids);
    return users;
  }

  /**
   * 根据ID列表删除用户
   */
  async delete(userIds: number[]): Promise<void | never> {
    const rootUserId = await this.findRootUserId();
    if (userIds.includes(rootUserId)) {
      throw new BadRequestException('不能删除root用户!');
    }
    await this.userRepo.delete(userIds);
    await this.userRoleRepo.delete({ userId: In(userIds) });
  }

  /**
   * 根据部门ID列举用户条数：除去超级管理员
   */
  async count(uid: number): Promise<number> {
    const rootUserId = await this.findRootUserId();

    return await this.userRepo.countBy({
      id: Not(In([rootUserId, uid])),
    });
  }

  /**
   * 查找超管的用户ID
   */
  async findRootUserId(): Promise<number> {
    return this.configService.appConfig.rootUserId;
  }

  /**
   * 分页查询用户列表
   */
  async page(dto: UserPageDto): Promise<PageResult<UserInfoPage>> {
    const { page, pageSize, username, nickName, email, status } = dto;
    const where = {
      ...(username ? { username: Like(`%${username}%`) } : null),
      ...(nickName ? { nickName: Like(`%${nickName}%`) } : null),
      ...(email ? { email: Like(`%${email}%`) } : null),
      ...(status ? { status: status } : null),
    };
    const rootUserId = await this.findRootUserId();
    const result = await this.userRepo
      .createQueryBuilder('user')
      .innerJoinAndSelect(
        'sys_user_role',
        'user_role',
        'user_role.user_id = user.id',
      )
      .innerJoinAndSelect('sys_role', 'role', 'role.id = user_role.role_id')
      // .where('user.id NOT IN (:...ids)', { ids: [rootUserId, uid] })
      .where(where)
      .offset(pageSize * (page - 1))
      .limit(pageSize)
      .orderBy('user.id', 'ASC')
      .getRawMany();
    const dealResult: UserInfoPage[] = [];
    // 过滤去重
    result.forEach((e) => {
      const index = findIndex(dealResult, (e2) => e2.id === e.user_id);
      if (index < 0) {
        // 当前元素不存在则插入
        dealResult.push({
          createdAt: e.user_created_at,
          email: e.user_email,
          qq: e.user_qq,
          avatar: e.user_avatar,
          id: e.user_id,
          name: e.user_name,
          nickName: e.user_nick_name,
          phone: e.user_phone,
          remark: e.user_remark,
          status: e.user_status,
          updatedAt: e.user_updated_at,
          username: e.user_username,
          roleNames: [e.role_name],
        });
      } else {
        // 已存在
        dealResult[index].roleNames.push(e.role_name);
      }
    });

    const total = await this.userRepo
      .createQueryBuilder('user')
      .where(where)
      .getCount();

    return {
      items: dealResult,
      total: total,
    };
  }

  /**
   * 禁用用户
   */
  async forbidden(uid: number): Promise<void> {
    await this.redisService.getRedis().del(`admin:passwordVersion:${uid}`);
    await this.redisService.getRedis().del(`admin:token:${uid}`);
    await this.redisService.getRedis().del(`admin:perms:${uid}`);
  }

  /**
   * 禁用多个用户
   */
  async multiForbidden(uids: number[]): Promise<void> {
    if (uids) {
      const pvs: string[] = [];
      const ts: string[] = [];
      const ps: string[] = [];
      uids.forEach((e) => {
        pvs.push(`admin:passwordVersion:${e}`);
        ts.push(`admin:token:${e}`);
        ps.push(`admin:perms:${e}`);
      });
      await this.redisService.getRedis().del(pvs);
      await this.redisService.getRedis().del(ts);
      await this.redisService.getRedis().del(ps);
    }
  }

  /**
   * 升级用户版本密码
   */
  async upgradePasswordV(id: number): Promise<void> {
    // admin:passwordVersion:${param.id}
    const v = await this.redisService
      .getRedis()
      .get(`admin:passwordVersion:${id}`);
    if (!isEmpty(v)) {
      await this.redisService
        .getRedis()
        .set(`admin:passwordVersion:${id}`, parseInt(v) + 1);
    }
  }

  /**
   * 判断用户名是否存在
   */
  async exist(username: string) {
    const user = await this.userRepo.findOneBy({ username });
    if (isEmpty(user)) {
      throw new ApiException(ErrorEnum.CODE_1001);
    }
    return true;
  }

  /**
   * 注册
   */
  async register(param: RegisterInfoDto): Promise<void> {
    const exists = await this.userRepo.findOneBy({
      username: param.username,
    });
    if (!isEmpty(exists)) throw new ApiException(ErrorEnum.CODE_1001);

    await this.entityManager.transaction(async (manager) => {
      const salt = this.util.generateRandomValue(32);

      const password = this.util.md5(`${param.password ?? 'a123456'}${salt}`);
      const avatar = await this.qqService.getAvater(param.qq);
      const nickName = await this.qqService.getNickname(param.qq);
      const u = manager.create(SysUser, {
        username: param.username,
        password: password,
        nickName,
        avatar,
        qq: param.qq,
        email: param.email,
        // phone: param.phone,
        status: 1,
        psalt: salt,
      });
      const result = await manager.save(u);
      const role = await this.roleRepo.findOneBy({ value: 'user' });
      if (!role) throw new ApiException(ErrorEnum.CODE_1022);

      const r = manager.create(SysUserRole, {
        userId: result.id,
        roleId: role.id,
      });

      // 分配角色
      await manager.insert(SysUserRole, r);
    });
  }
}
