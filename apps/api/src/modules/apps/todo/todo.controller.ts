import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';

import { ApiResult } from '@/decorators/api-result.decorator';
import { IdParam } from '@/decorators/id-param.decorator';
import { TodoEntity } from '@/modules/apps/todo/todo.entity';

import { Permission } from '@/modules/rbac/decorators';
import { Resource } from '@/modules/rbac/decorators/resource.decorator';

import { ResourceGuard } from '@/modules/rbac/guards/resource.guard';

import { TodoDto } from './todo.dto';
import { PermissionTodo } from './todo.permission';
import { TodoService } from './todo.service';

@ApiTags('Business - Todo模块')
@ApiExtraModels(TodoEntity)
@UseGuards(ResourceGuard)
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: '获取Todo列表' })
  @ApiResult({ type: [TodoEntity] })
  @Permission(PermissionTodo.LIST)
  async list(): Promise<TodoEntity[]> {
    return this.todoService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取Todo详情' })
  @ApiResult({ type: TodoEntity })
  @Permission(PermissionTodo.READ)
  async info(@IdParam() id: number): Promise<TodoEntity> {
    return this.todoService.detail(id);
  }

  @Post()
  @ApiOperation({ summary: '创建Todo' })
  @Permission(PermissionTodo.CREATE)
  async create(@Body() dto: TodoDto): Promise<void> {
    await this.todoService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新Todo' })
  @Permission(PermissionTodo.UPDATE)
  async update(
    @IdParam() id: number,
    @Body() dto: Partial<TodoDto>,
  ): Promise<void> {
    await this.todoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除Todo' })
  @Permission(PermissionTodo.DELETE)
  @Resource(TodoEntity)
  async delete(@IdParam() id: number): Promise<void> {
    await this.todoService.delete(id);
  }
}
