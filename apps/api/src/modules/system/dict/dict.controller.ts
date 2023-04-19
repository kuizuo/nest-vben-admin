import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PageOptionsDto } from '@/common/dto/page-options.dto';
import { ApiResult } from '@/decorators/api-result.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Pagination } from '@/helper/paginate/pagination';
import { DictEntity } from '@/modules/system/dict/dict.entity';

import {
  DictCreateDto,
  DictDeleteDto,
  DictInfoDto,
  DictUpdateDto,
} from './dict.dto';
import { DictService } from './dict.service';

@ApiTags('System - 参数配置模块')
@ApiSecurityAuth()
@Controller('dict')
export class DictController {
  constructor(private paramConfigService: DictService) {}

  @ApiOperation({ summary: '分页获取参数配置列表' })
  @ApiResult({ type: [DictEntity] })
  @Get('page')
  async page(@Query() dto: PageOptionsDto): Promise<Pagination<DictEntity>> {
    return this.paramConfigService.page(dto.page, dto.pageSize);
  }

  @ApiOperation({ summary: '新增参数配置' })
  @Post('add')
  async add(@Body() dto: DictCreateDto): Promise<void> {
    await this.paramConfigService.isExistKey(dto.key);
    await this.paramConfigService.add(dto);
  }

  @ApiOperation({ summary: '查询单个参数配置信息' })
  @ApiResult({ type: DictEntity })
  @Get('info')
  async info(@Query() dto: DictInfoDto): Promise<DictEntity> {
    return this.paramConfigService.findOne(dto.id);
  }

  @ApiOperation({ summary: '更新单个参数配置' })
  @Post('update')
  async update(@Body() dto: DictUpdateDto): Promise<void> {
    await this.paramConfigService.update(dto);
  }

  @ApiOperation({ summary: '删除指定的参数配置' })
  @Post('delete')
  async delete(@Body() dto: DictDeleteDto): Promise<void> {
    await this.paramConfigService.delete(dto.ids);
  }
}
