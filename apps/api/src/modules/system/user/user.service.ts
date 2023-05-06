import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { findIndex, isEmpty, isNil } from 'lodash';

import { EntityManager, Like, Repository } from 'typeorm';

import { IAppConfig } from '@/config';
import { ErrorEnum } from '@/constants/error';
import { SYS_USER_INITPASSWORD } from '@/constants/param-config';
import { ApiException } from '@/exceptions/api.exception';

import { paginateRaw } from '@/helper/paginate';
import { Pagination } from '@/helper/paginate/pagination';
import { AccountUpdateDto } from '@/modules/auth/dto/account.dto';
import { RegisterDto } from '@/modules/auth/dto/auth.dto';
import { QQService } from '@/modules/shared/qq/qq.service';
import { RedisService } from '@/modules/shared/redis/redis.service';

import { MD5, randomValue } from '@/utils';

import { DictService } from '../dict/dict.service';

import { RoleEntity } from '../role/role.entity';

import { PasswordUpdateDto } from './dto/password.dto';
import { UserDto, UserListDto } from './dto/user.dto';
import { UserEntity } from './entities/user.entity';
import { AccountInfo, UserInfoPage } from './user.modal';

@Injectable()
export class UserService {
  constructor(
    private readonly redisService: RedisService,
    private readonly dictService: DictService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
    private readonly qqService: QQService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 根据用户名查找已经启用的用户
   */
  async findUserByUserName(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({
      username,
      status: 1,
    });
  }

  /**
   * 获取用户信息
   * @param uid user id
   */
  async getAccountInfo(uid: number): Promise<AccountInfo> {
    const user: UserEntity = await this.userRepository.findOneBy({ id: uid });
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
  async updateAccountInfo(uid: number, info: AccountUpdateDto): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: uid });
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

    await this.userRepository.update(uid, data);
  }

  /**
   * 更改密码
   */
  async updatePassword(uid: number, dto: PasswordUpdateDto): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: uid });
    if (isEmpty(user)) {
      throw new ApiException(ErrorEnum.CODE_1017);
    }
    const comparePassword = MD5(`${dto.oldPassword}${user.psalt}`);
    // 原密码不一致，不允许更改
    if (user.password !== comparePassword) {
      throw new ApiException(ErrorEnum.CODE_1011);
    }
    const password = MD5(`${dto.newPassword}${user.psalt}`);
    await this.userRepository.update({ id: uid }, { password });
    await this.upgradePasswordV(user.id);
  }

  /**
   * 直接更改密码
   */
  async forceUpdatePassword(uid: number, password: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: uid });

    const newPassword = MD5(`${password}${user.psalt}`);
    await this.userRepository.update({ id: uid }, { password: newPassword });
    await this.upgradePasswordV(user.id);
  }

  /**
   * 增加系统用户，如果返回false则表示已存在该用户
   */
  async create({
    username,
    password,
    roleIds: roles,
    deptId,
    ...data
  }: UserDto): Promise<void> {
    const exists = await this.userRepository.findOneBy({
      username,
    });
    if (!isEmpty(exists)) {
      throw new ApiException(ErrorEnum.CODE_1001);
    }

    await this.entityManager.transaction(async (manager) => {
      const salt = randomValue(32);

      let password;
      if (!password) {
        const initPassword = await this.dictService.findValueByKey(
          SYS_USER_INITPASSWORD,
        );
        password = MD5(`${initPassword ?? '123456'}${salt}`);
      } else {
        password = MD5(`${password ?? '123456'}${salt}`);
      }

      const u = manager.create(UserEntity, {
        username,
        password,
        ...data,
        psalt: salt,
        roles: await this.roleRepository.findByIds(roles),
      });

      const result = await manager.save(u);
      return result;
    });
  }

  /**
   * 更新用户信息
   */
  async update(
    id,
    { password, deptId, roleIds, status, ...data }: UserDto,
  ): Promise<void> {
    await this.entityManager.transaction(async (manager) => {
      if (password) {
        await this.forceUpdatePassword(id, password);
      }

      await manager.update(UserEntity, id, {
        ...data,
        status,
      });

      const user = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'roles')
        .leftJoinAndSelect('user.depts', 'depts')
        .where('user.id = :id', { id })
        .getOne();

      await manager
        .createQueryBuilder()
        .relation(UserEntity, 'roles')
        .of(id)
        .addAndRemove(roleIds, user.roles);

      await manager
        .createQueryBuilder()
        .relation(UserEntity, 'depts')
        .of(id)
        .addAndRemove(deptId, user.depts);

      if (status === 0) {
        // 禁用状态
        await this.forbidden(id);
      }
    });
  }

  /**
   * 查找用户信息
   * @param id 用户id
   */
  async info(id: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .leftJoinAndSelect('user.depts', 'depts')
      .where('user.id = :id', { id })
      .getOne();

    delete user.password;
    delete user.psalt;

    return user;
  }

  /**
   * 根据ID列表删除用户
   */
  async delete(userIds: number[]): Promise<void | never> {
    const rootUserId = await this.findRootUserId();
    if (userIds.includes(rootUserId)) {
      throw new BadRequestException('不能删除root用户!');
    }
    await this.userRepository.delete(userIds);
    await this.userRepository.delete(userIds);
  }

  /**
   * 查找超管的用户ID
   */
  async findRootUserId(): Promise<number> {
    const user = await this.userRepository.findOneBy({
      roles: { id: this.configService.get<IAppConfig>('app').adminRoleId },
    });
    return user.id;
  }

  /**
   * 查询用户列表
   */
  async findAll({
    page,
    pageSize,
    username,
    nickName,
    deptId,
    email,
    status,
  }: UserListDto): Promise<Pagination<UserInfoPage>> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.depts', 'dept')
      .innerJoinAndSelect('user.roles', 'role')
      // .where('user.id NOT IN (:...ids)', { ids: [rootUserId, uid] })
      .where({
        ...(username ? { username: Like(`%${username}%`) } : null),
        ...(nickName ? { nickName: Like(`%${nickName}%`) } : null),
        ...(email ? { email: Like(`%${email}%`) } : null),
        ...(status ? { status } : null),
      });

    if (deptId) {
      queryBuilder.andWhere('dept.id = :deptId', { deptId });
    }

    const { items, ...rest } = await paginateRaw<UserEntity>(queryBuilder, {
      page,
      pageSize,
    });

    const dealResult: UserInfoPage[] = [];
    // 过滤去重
    items.forEach((e: any) => {
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
          deptName: e.dept_name,
          roleNames: [e.role_name],
        });
      } else {
        // 已存在
        dealResult[index].roleNames.push(e.role_name);
      }
    });

    return {
      items: dealResult,
      meta: {
        ...rest.meta,
        itemCount: dealResult.length,
      },
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
    const user = await this.userRepository.findOneBy({ username });
    if (isNil(user)) {
      throw new ApiException(ErrorEnum.CODE_1001);
    }
    return true;
  }

  /**
   * 注册
   */
  async register({ username, ...data }: RegisterDto): Promise<void> {
    const exists = await this.userRepository.findOneBy({
      username,
    });
    if (!isEmpty(exists)) throw new ApiException(ErrorEnum.CODE_1001);

    await this.entityManager.transaction(async (manager) => {
      const salt = randomValue(32);

      const password = MD5(`${data.password ?? 'a123456'}${salt}`);

      const u = manager.create(UserEntity, {
        username,
        password,
        status: 1,
        psalt: salt,
      });

      const user = await manager.save(u);

      return user;
    });
  }
}
