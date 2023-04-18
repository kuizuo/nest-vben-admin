import { InjectQueue } from '@nestjs/bull';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { UnknownElementException } from '@nestjs/core/errors/exceptions/unknown-element.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Queue } from 'bull';
import { isEmpty } from 'lodash';
import { ApiException } from '@/exceptions/api.exception';
import { TaskEntity } from '@/modules/system/task/task.entity';
import { AppLoggerService } from '@/modules/shared/services/app-logger.service';
import { RedisService } from '@/modules/shared/services/redis.service';
import { MISSION_DECORATOR_KEY } from '/@/mission/mission.decorator';
import { TaskCreateDto, TaskPageDto, TaskUpdateDto } from './task.dto';

import { Pagination } from '@/helper/paginate/pagination';
import { ErrorEnum } from '@/constants/error';
import { SYS_TASK_QUEUE_NAME, SYS_TASK_QUEUE_PREFIX } from '@/constants/task';
import { paginate } from '@/helper/paginate';

@Injectable()
export class TaskService implements OnModuleInit {
  constructor(
    @InjectRepository(TaskEntity) private taskRepo: Repository<TaskEntity>,
    @InjectQueue(SYS_TASK_QUEUE_NAME) private taskQueue: Queue,
    private moduleRef: ModuleRef,
    private reflector: Reflector,
    private redisService: RedisService,
    private logger: AppLoggerService,
  ) {}

  /**
   * module init
   */
  async onModuleInit() {
    await this.initTask();
  }

  /**
   * 初始化任务，系统启动前调用
   */
  async initTask(): Promise<void> {
    const initKey = `${SYS_TASK_QUEUE_PREFIX}:init`;
    // 防止重复初始化
    const result = await this.redisService
      .getRedis()
      .multi()
      .setnx(initKey, new Date().getTime())
      .expire(initKey, 60 * 30)
      .exec();
    if (result[0][1] === 0) {
      // 存在锁则直接跳过防止重复初始化
      this.logger.log('Init task is lock', TaskService.name);
      return;
    }
    const jobs = await this.taskQueue.getJobs([
      'active',
      'delayed',
      'failed',
      'paused',
      'waiting',
      'completed',
    ]);
    for (let i = 0; i < jobs.length; i++) {
      // 先移除所有已存在的任务
      await jobs[i].remove();
    }
    // 查找所有需要运行的任务
    const tasks = await this.taskRepo.findBy({ status: 1 });
    if (tasks && tasks.length > 0) {
      for (const t of tasks) {
        await this.start(t);
      }
    }
    // 启动后释放锁
    await this.redisService.getRedis().del(initKey);
  }

  /**
   * 分页查询
   */
  async page({
    page,
    pageSize,
    name,
    service,
    type,
    status,
  }: TaskPageDto): Promise<Pagination<TaskEntity>> {
    const queryBuilder = this.taskRepo
      .createQueryBuilder('task')
      .where({
        ...(name ? { name: Like(`%${name}%`) } : null),
        ...(service ? { service: Like(`%${service}%`) } : null),
        ...(type ? { type: type } : null),
        ...(status ? { status: status } : null),
      })
      .orderBy('task.id', 'ASC');

    return paginate(queryBuilder, { page, pageSize });
  }

  /**
   * count task
   */
  async count(): Promise<number> {
    return await this.taskRepo.count();
  }

  /**
   * task info
   */
  async info(id: number): Promise<TaskEntity> {
    return await this.taskRepo.findOneBy({ id });
  }

  /**
   * delete task
   */
  async delete(task: TaskEntity): Promise<void> {
    if (!task) {
      throw new BadRequestException('Task is Empty');
    }
    await this.stop(task);
    await this.taskRepo.delete(task.id);
  }

  /**
   * 手动执行一次
   */
  async once(task: TaskEntity): Promise<void | never> {
    if (task) {
      await this.taskQueue.add(
        { id: task.id, service: task.service, args: task.data },
        { jobId: task.id, removeOnComplete: true, removeOnFail: true },
      );
    } else {
      throw new BadRequestException('Task is Empty');
    }
  }

  /**
   * 添加任务
   */
  async addOrUpdate(param: TaskCreateDto | TaskUpdateDto): Promise<void> {
    const result = await this.taskRepo.save(param);
    const task = await this.info(result.id);
    if (result.status === 0) {
      await this.stop(task);
    } else if (result.status === 1) {
      await this.start(task);
    }
  }

  /**
   * 启动任务
   */
  async start(task: TaskEntity): Promise<void> {
    if (!task) {
      throw new BadRequestException('Task is Empty');
    }
    // 先停掉之前存在的任务
    await this.stop(task);
    let repeat: any;
    if (task.type === 1) {
      // 间隔 Repeat every millis (cron setting cannot be used together with this setting.)
      repeat = {
        every: task.every,
      };
    } else {
      // cron
      repeat = {
        cron: task.cron,
      };
      // Start date when the repeat job should start repeating (only with cron).
      if (task.startTime) {
        repeat.startDate = task.startTime;
      }
      if (task.endTime) {
        repeat.endDate = task.endTime;
      }
    }
    if (task.limit > 0) {
      repeat.limit = task.limit;
    }
    const job = await this.taskQueue.add(
      { id: task.id, service: task.service, args: task.data },
      { jobId: task.id, removeOnComplete: true, removeOnFail: true, repeat },
    );
    if (job && job.opts) {
      await this.taskRepo.update(task.id, {
        jobOpts: JSON.stringify(job.opts.repeat),
        status: 1,
      });
    } else {
      // update status to 0，标识暂停任务，因为启动失败
      job && (await job.remove());
      await this.taskRepo.update(task.id, { status: 0 });
      throw new BadRequestException('Task Start failed');
    }
  }

  /**
   * 停止任务
   */
  async stop(task: TaskEntity): Promise<void> {
    if (!task) {
      throw new BadRequestException('Task is Empty');
    }
    const exist = await this.existJob(task.id.toString());
    if (!exist) {
      await this.taskRepo.update(task.id, { status: 0 });
      return;
    }
    const jobs = await this.taskQueue.getJobs([
      'active',
      'delayed',
      'failed',
      'paused',
      'waiting',
      'completed',
    ]);
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].data.id === task.id) {
        await jobs[i].remove();
      }
    }
    await this.taskRepo.update(task.id, { status: 0 });
    // if (task.jobOpts) {
    //   await this.app.queue.sys.removeRepeatable(JSON.parse(task.jobOpts));
    //   // update status
    //   await this.getRepo().admin.sys.Task.update(task.id, { status: 0 });
    // }
  }

  /**
   * 查看队列中任务是否存在
   */
  async existJob(jobId: string): Promise<boolean> {
    // https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueremoverepeatablebykey
    const jobs = await this.taskQueue.getRepeatableJobs();
    const ids = jobs.map((e) => {
      return e.id;
    });
    return ids.includes(jobId);
  }

  /**
   * 更新是否已经完成，完成则移除该任务并修改状态
   */
  async updateTaskCompleteStatus(tid: number): Promise<void> {
    const jobs = await this.taskQueue.getRepeatableJobs();
    const task = await this.taskRepo.findOneBy({ id: tid });
    // 如果下次执行时间小于当前时间，则表示已经执行完成。
    for (const job of jobs) {
      const currentTime = new Date().getTime();
      if (job.id === tid.toString() && job.next < currentTime) {
        // 如果下次执行时间小于当前时间，则表示已经执行完成。
        await this.stop(task);
        break;
      }
    }
  }

  /**
   * 检测service是否有注解定义
   * @param serviceName service
   */
  async checkHasMissionMeta(
    nameOrInstance: string | unknown,
    exec: string,
  ): Promise<void | never> {
    try {
      let service: any;
      if (typeof nameOrInstance === 'string') {
        service = await this.moduleRef.get(nameOrInstance, { strict: false });
      } else {
        service = nameOrInstance;
      }
      // 所执行的任务不存在
      if (!service || !(exec in service)) {
        throw new ApiException(ErrorEnum.CODE_1302);
      }
      // 检测是否有Mission注解
      const hasMission = this.reflector.get<boolean>(
        MISSION_DECORATOR_KEY,
        service.constructor,
      );
      // 如果没有，则抛出错误
      if (!hasMission) {
        throw new ApiException(ErrorEnum.CODE_1301);
      }
    } catch (e) {
      if (e instanceof UnknownElementException) {
        // 任务不存在
        throw new ApiException(ErrorEnum.CODE_1302);
      } else {
        // 其余错误则不处理，继续抛出
        throw e;
      }
    }
  }

  /**
   * 根据serviceName调用service，例如 LogService.clearReqLog
   */
  async callService(serviceName: string, args: string): Promise<void> {
    if (serviceName) {
      const arr = serviceName.split('.');
      if (arr.length < 1) {
        throw new BadRequestException('serviceName define BadRequestException');
      }
      const methodName = arr[1];
      const service = await this.moduleRef.get(arr[0], { strict: false });
      // 安全注解检查
      await this.checkHasMissionMeta(service, methodName);
      if (isEmpty(args)) {
        await service[methodName]();
      } else {
        // 参数安全判断
        const parseArgs = this.safeParse(args);

        if (Array.isArray(parseArgs)) {
          // 数组形式则自动扩展成方法参数回掉
          await service[methodName](...parseArgs);
        } else {
          await service[methodName](parseArgs);
        }
      }
    }
  }

  safeParse(args: string): unknown | string {
    try {
      return JSON.parse(args);
    } catch (e) {
      return args;
    }
  }
}
