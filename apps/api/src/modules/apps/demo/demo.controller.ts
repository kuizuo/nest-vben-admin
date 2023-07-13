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
import { DemoEntity } from '@/modules/apps/demo/demo.entity';

import { Permission } from '@/modules/rbac/decorators';
import { Resource } from '@/modules/rbac/decorators/resource.decorator';

import { ResourceGuard } from '@/modules/rbac/guards/resource.guard';

import { DemoDto } from './demo.dto';
import { PermissionDemo } from './demo.permission';
import { DemoService } from './demo.service';

@ApiTags('Business - Demo模块')
@ApiExtraModels(DemoEntity)
@UseGuards(ResourceGuard)
@Controller('demo')
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  @ApiOperation({ summary: '获取Demo列表' })
  @ApiResult({ type: [DemoEntity] })
  @Permission(PermissionDemo.LIST)
  async list(): Promise<DemoEntity[]> {
    return this.demoService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取Demo详情' })
  @ApiResult({ type: DemoEntity })
  @Permission(PermissionDemo.READ)
  async info(@IdParam() id: number): Promise<DemoEntity> {
    return this.demoService.detail(id);
  }

  @Post()
  @ApiOperation({ summary: '创建Demo' })
  @Permission(PermissionDemo.CREATE)
  async create(@Body() dto: DemoDto): Promise<void> {
    await this.demoService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新Demo' })
  @Permission(PermissionDemo.UPDATE)
  async update(
    @IdParam() id: number,
    @Body() dto: Partial<DemoDto>,
  ): Promise<void> {
    await this.demoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除Demo' })
  @Permission(PermissionDemo.DELETE)
  @Resource(DemoEntity)
  async delete(@IdParam() id: number): Promise<void> {
    await this.demoService.delete(id);
  }
}
