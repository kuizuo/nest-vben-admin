import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysLoginLog } from '@/entities/admin/sys-login-log.entity';
import { SysTaskLog } from '@/entities/admin/sys-task-log.entity';
import { Between, Like, Repository } from 'typeorm';
import { UAParser } from 'ua-parser-js';
import { LoginLogInfo, TaskLogInfo } from './log.class';
import { LoginLogPageDto } from './log.dto';
import { SysUserService } from '../user/user.service';
import { IpService } from '@/shared/services/ip.service';

@Injectable()
export class SysLogService {
  constructor(
    @InjectRepository(SysLoginLog)
    private loginLogRepository: Repository<SysLoginLog>,
    @InjectRepository(SysTaskLog)
    private taskLogRepository: Repository<SysTaskLog>,
    private userService: SysUserService,
    private ipService: IpService,
  ) {}

  /**
   * 记录登录日志
   */
  async saveLoginLog(uid: number, ip: string, ua: string): Promise<void> {
    const address = await this.ipService.getAddress(ip);

    await this.loginLogRepository.save({
      ip,
      userId: uid,
      ua,
      address,
    });
  }

  /**
   * 计算登录日志日志总数
   */
  async countLoginLog(): Promise<number> {
    return await this.loginLogRepository.count();
  }

  /**
   * 分页加载日志信息
   */
  async pageGetLoginLog(dto: LoginLogPageDto): Promise<LoginLogInfo[]> {
    const { page, pageSize, username, ip, address, time } = dto;

    const where = {
      ...(ip ? { ip: Like(`%${ip}%`) } : null),
      ...(address ? { address: Like(`%${address}%`) } : null),
      ...(time ? { createdAt: Between(time[0], time[1]) } : null),
    };

    if (username) {
      const user = await this.userService.findUserByUserName(username);
      where['userId'] = user?.id;
    }

    const result = await this.loginLogRepository
      .createQueryBuilder('login_log')
      .innerJoinAndSelect('sys_user', 'user', 'login_log.user_id = user.id')
      .where(where)
      .orderBy('login_log.created_at', 'DESC')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .getRawMany();
    const parser = new UAParser();

    return result.map((e) => {
      const u = parser.setUA(e.login_log_ua).getResult();
      return {
        id: e.login_log_id,
        ip: e.login_log_ip,
        address: e.login_log_address,
        os: `${u.os.name} ${u.os.version}`,
        browser: `${u.browser.name} ${u.browser.version}`,
        time: e.login_log_created_at,
        username: e.user_username,
      };
    });
  }

  /**
   * 清空表中的所有数据
   */
  async clearLoginLog(): Promise<void> {
    await this.loginLogRepository.clear();
  }
  // ----- task

  /**
   * 记录任务日志
   */
  async recordTaskLog(tid: number, status: number, time?: number, err?: string): Promise<number> {
    const result = await this.taskLogRepository.save({
      taskId: tid,
      status,
      detail: err,
    });
    return result.id;
  }

  /**
   * 计算日志总数
   */
  async countTaskLog(): Promise<number> {
    return await this.taskLogRepository.count();
  }

  /**
   * 分页加载日志信息
   */
  async page(page: number, count: number): Promise<TaskLogInfo[]> {
    const result = await this.taskLogRepository
      .createQueryBuilder('task_log')
      .leftJoinAndSelect('sys_task', 'task', 'task_log.task_id = task.id')
      .orderBy('task_log.id', 'DESC')
      .offset(page * count)
      .limit(count)
      .getRawMany();
    return result.map((e) => {
      return {
        id: e.task_log_id,
        taskId: e.task_id,
        name: e.task_name,
        createdAt: e.task_log_created_at,
        consumeTime: e.task_log_consume_time,
        detail: e.task_log_detail,
        status: e.task_log_status,
      };
    });
  }

  /**
   * 清空表中的所有数据
   */
  async clearTaskLog(): Promise<void> {
    await this.taskLogRepository.clear();
  }
}
