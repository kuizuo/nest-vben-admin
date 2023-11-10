import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '@/common/decorators/api-result.decorator'
import { IdParam } from '@/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '@/common/decorators/swagger.decorator'
import { Pagination } from '@/helper/paginate/pagination'
import { Permission } from '@/modules/auth/decorators/permission.decorator'
import { TaskEntity } from '@/modules/system/task/task.entity'

import { TaskDto, TaskQueryDto } from './task.dto'
import { TaskService } from './task.service'

export const Permissions = {
  LIST: 'system:task:list',
  CREATE: 'system:task:create',
  READ: 'system:task:read',
  UPDATE: 'system:task:update',
  DELETE: 'system:task:delete',

  ONCE: 'system:task:once',
  START: 'system:task:start',
  STOP: 'system:task:stop',
} as const

@ApiTags('System - 任务调度模块')
@ApiSecurityAuth()
@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: '获取任务列表' })
  @ApiResult({ type: [TaskEntity] })
  @Permission(Permissions.LIST)
  async list(@Query() dto: TaskQueryDto): Promise<Pagination<TaskEntity>> {
    return this.taskService.list(dto)
  }

  @Post()
  @ApiOperation({ summary: '添加任务' })
  @Permission(Permissions.CREATE)
  async create(@Body() dto: TaskDto): Promise<void> {
    const serviceCall = dto.service.split('.')
    await this.taskService.checkHasMissionMeta(serviceCall[0], serviceCall[1])
    await this.taskService.create(dto)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新任务' })
  @Permission(Permissions.UPDATE)
  async update(
    @IdParam() id: number,
    @Body() dto: Partial<TaskDto>,
  ): Promise<void> {
    const serviceCall = dto.service.split('.')
    await this.taskService.checkHasMissionMeta(serviceCall[0], serviceCall[1])
    await this.taskService.update(id, dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询任务详细信息' })
  @ApiResult({ type: TaskEntity })
  @Permission(Permissions.READ)
  async info(@IdParam() id: number): Promise<TaskEntity> {
    return this.taskService.info(id)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除任务' })
  @Permission(Permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    const task = await this.taskService.info(id)
    await this.taskService.delete(task)
  }

  @Put(':id/once')
  @ApiOperation({ summary: '手动执行一次任务' })
  @Permission(Permissions.ONCE)
  async once(@IdParam() id: number): Promise<void> {
    const task = await this.taskService.info(id)
    await this.taskService.once(task)
  }

  @Put(':id/stop')
  @ApiOperation({ summary: '停止任务' })
  @Permission(Permissions.STOP)
  async stop(@IdParam() id: number): Promise<void> {
    const task = await this.taskService.info(id)
    await this.taskService.stop(task)
  }

  @Put(':id/start')
  @ApiOperation({ summary: '启动任务' })
  @Permission(Permissions.START)
  async start(@IdParam() id: number): Promise<void> {
    const task = await this.taskService.info(id)

    await this.taskService.start(task)
  }
}
