import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LessThan, Repository } from 'typeorm';

import { paginateRaw } from '@/helper/paginate';

import { TaskLogQueryDto } from '../dtos/log.dto';
import { TaskLogEntity } from '../entities/task-log.entity';

@Injectable()
export class TaskLogService {
  constructor(
    @InjectRepository(TaskLogEntity)
    private taskLogRepository: Repository<TaskLogEntity>,
  ) {}

  async create(
    tid: number,
    status: number,
    time?: number,
    err?: string,
  ): Promise<number> {
    const result = await this.taskLogRepository.save({
      taskId: tid,
      status,
      detail: err,
    });
    return result.id;
  }

  async paginate({ page, pageSize }: TaskLogQueryDto) {
    const queryBuilder = await this.taskLogRepository
      .createQueryBuilder('task_log')
      .leftJoinAndSelect('sys_task', 'task', 'task_log.task_id = task.id')
      .orderBy('task_log.id', 'DESC');

    const { items, ...rest } = await paginateRaw<TaskLogEntity>(queryBuilder, {
      page,
      pageSize,
    });

    const taskInfos = await Promise.all(
      items.map(async (e: any) => {
        return {
          id: e.task_log_id,
          taskId: e.task_id,
          name: e.task_name,
          createdAt: e.task_log_created_at,
          consumeTime: e.task_log_consume_time,
          detail: e.task_log_detail,
          status: e.task_log_status,
        };
      }),
    );

    return {
      items: taskInfos,
      ...rest,
    };
  }

  async clearLog(): Promise<void> {
    await this.taskLogRepository.clear();
  }

  async clearLogBeforeTime(time: Date): Promise<void> {
    await this.taskLogRepository.delete({ createdAt: LessThan(time) });
  }
}
