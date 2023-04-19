import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';

import { ApiResult } from '@/decorators/api-result.decorator';
import { Pagination } from '@/helper/paginate/pagination';
import { DemoEntity } from '@/modules/apps/demo/demo.entity';

import {
  DemoCreateDto,
  DemoUpdateDto,
  DemoDeleteDto,
  DemoDetailDto,
  DemoPageDto,
} from './demo.dto';
import { DemoService } from './demo.service';

@ApiTags('Business - Demo模块')
@ApiExtraModels(DemoEntity)
@Controller('demo')
export class DemoController {
  constructor(private readonly testService: DemoService) {}

  @Get('list')
  @ApiOperation({ summary: '获取Demo列表' })
  @ApiResult({ type: [DemoEntity] })
  async list(): Promise<DemoEntity[]> {
    return this.testService.list();
  }

  @Get('page')
  @ApiOperation({ summary: '分页获取Demo列表' })
  @ApiResult({ type: [DemoEntity], isPage: true })
  async page(@Query() dto: DemoPageDto): Promise<Pagination<DemoEntity>> {
    return this.testService.page(dto);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取Demo详情' })
  @ApiResult({ type: DemoEntity })
  async detail(@Query() dto: DemoDetailDto): Promise<DemoEntity> {
    return this.testService.detail(dto.id);
  }

  @Post('create')
  @ApiOperation({ summary: '创建Demo' })
  async create(@Body() dto: DemoCreateDto): Promise<void> {
    await this.testService.create(dto);
  }

  @Post('update')
  @ApiOperation({ summary: '更新Demo' })
  async update(@Body() dto: DemoUpdateDto): Promise<void> {
    await this.testService.update(dto);
  }

  @Post('delete')
  @ApiOperation({ summary: '删除Demo' })
  async delete(@Body() dto: DemoDeleteDto): Promise<void> {
    await this.testService.delete(dto.id);
  }
}
