import { Body, Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';

import { ApiResult } from '@/decorators/api-result.decorator';
import { IdParam } from '@/decorators/id-param.decorator';
import { DemoEntity } from '@/modules/apps/demo/demo.entity';

import { DemoDto } from './demo.dto';
import { DemoService } from './demo.service';

@ApiTags('Business - Demo模块')
@ApiExtraModels(DemoEntity)
@Controller('demo')
export class DemoController {
  constructor(private readonly testService: DemoService) {}

  @Get()
  @ApiOperation({ summary: '获取Demo列表' })
  @ApiResult({ type: [DemoEntity] })
  async list(): Promise<DemoEntity[]> {
    return this.testService.list();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取Demo详情' })
  @ApiResult({ type: DemoEntity })
  async info(@IdParam() id: number): Promise<DemoEntity> {
    return this.testService.detail(id);
  }

  @Post()
  @ApiOperation({ summary: '创建Demo' })
  async create(@Body() dto: DemoDto): Promise<void> {
    await this.testService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新Demo' })
  async update(
    @IdParam() id: number,
    @Body() dto: Partial<DemoDto>,
  ): Promise<void> {
    await this.testService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除Demo' })
  async delete(@IdParam() id: number): Promise<void> {
    await this.testService.delete(id);
  }
}
