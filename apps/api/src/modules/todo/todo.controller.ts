import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ApiResult } from '@/common/decorators/api-result.decorator';
import { IdParam } from '@/common/decorators/id-param.decorator';

import { Permission } from '@/modules/auth/decorators/permission.decorator';
import { Resource } from '@/modules/auth/decorators/resource.decorator';

import { ResourceGuard } from '@/modules/auth/guards/resource.guard';
import { TodoEntity } from '@/modules/todo/todo.entity';

import { TodoDto } from './todo.dto';
import { TodoService } from './todo.service';

export const Permissions = {
  LIST: 'todo:list',
  CREATE: 'todo:create',
  READ: 'todo:read',
  UPDATE: 'todo:update',
  DELETE: 'todo:delete',
} as const;

@ApiTags('Business - Todo模块')
@UseGuards(ResourceGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: '获取Todo列表' })
  @ApiResult({ type: [TodoEntity] })
  @Permission(Permissions.LIST)
  async list(): Promise<TodoEntity[]> {
    return this.todoService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取Todo详情' })
  @ApiResult({ type: TodoEntity })
  @Permission(Permissions.READ)
  async info(@IdParam() id: number): Promise<TodoEntity> {
    return this.todoService.detail(id);
  }

  @Post()
  @ApiOperation({ summary: '创建Todo' })
  @Permission(Permissions.CREATE)
  async create(@Body() dto: TodoDto): Promise<void> {
    await this.todoService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新Todo' })
  @Permission(Permissions.UPDATE)
  @Resource(TodoEntity)
  async update(
    @IdParam() id: number,
    @Body() dto: Partial<TodoDto>,
  ): Promise<void> {
    await this.todoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除Todo' })
  @Permission(Permissions.DELETE)
  @Resource(TodoEntity)
  async delete(@IdParam() id: number): Promise<void> {
    await this.todoService.delete(id);
  }
}
