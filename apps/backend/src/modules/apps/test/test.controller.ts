import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiExtraModels } from '@nestjs/swagger';
import { TestService } from './test.service';
import {
  TestCreateDto,
  TestUpdateDto,
  TestDeleteDto,
  TestDetailDto,
  TestPageDto,
} from './test.dto';
import Test from '@/entities/apps/test.entity';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { PageResult } from '@/common/class/res.class';

@ApiTags('System - Test模块')
@ApiExtraModels(Test)
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('list')
  @ApiOperation({ summary: '获取Test列表' })
  @ApiResult({ type: [Test] })
  async list(): Promise<Test[]> {
    return await this.testService.list();
  }

  @Get('page')
  @ApiOperation({ summary: '分页获取Test列表' })
  @ApiResult({ type: [Test], struct: 'page' })
  async page(@Query() dto: TestPageDto): Promise<PageResult<Test>> {
    return await this.testService.page(dto);
  }

  @Get('detail')
  @ApiOperation({ summary: '获取Test详情' })
  @ApiResult({ type: Test })
  async detail(@Query() dto: TestDetailDto): Promise<Test> {
    return await this.testService.detail(dto.id);
  }

  @Post('create')
  @ApiOperation({ summary: '创建Test' })
  async create(@Body() dto: TestCreateDto): Promise<void> {
    await this.testService.create(dto);
  }

  @Post('update')
  @ApiOperation({ summary: '更新Test' })
  async update(@Body() dto: TestUpdateDto): Promise<void> {
    await this.testService.update(dto);
  }

  @Post('delete')
  @ApiOperation({ summary: '删除Test' })
  async delete(@Body() dto: TestDeleteDto): Promise<void> {
    await this.testService.delete(dto.id);
  }
}
