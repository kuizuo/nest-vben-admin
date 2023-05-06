import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PageOptionsDto } from '@/common/dto/page-options.dto';
import { ApiResult } from '@/decorators/api-result.decorator';
import { IdParam } from '@/decorators/id-param.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Pagination } from '@/helper/paginate/pagination';
import { DictEntity } from '@/modules/system/dict/dict.entity';

import { DictCreateDto, DictUpdateDto } from './dict.dto';
import { DictService } from './dict.service';

@ApiTags('System - 字典配置模块')
@ApiSecurityAuth()
@Controller('dicts')
export class DictController {
  constructor(private dictService: DictService) {}

  @ApiOperation({ summary: '获取字典配置列表' })
  @ApiResult({ type: [DictEntity] })
  @Get()
  async list(@Query() dto: PageOptionsDto): Promise<Pagination<DictEntity>> {
    return this.dictService.page(dto);
  }

  @Post()
  @ApiOperation({ summary: '新增字典配置' })
  async create(@Body() dto: DictCreateDto): Promise<void> {
    await this.dictService.isExistKey(dto.key);
    await this.dictService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询单个字典配置信息' })
  @ApiResult({ type: DictEntity })
  async info(@IdParam() id: number): Promise<DictEntity> {
    return this.dictService.findOne(id);
  }

  @Post(':id')
  @ApiOperation({ summary: '更新单个字典配置' })
  async update(
    @IdParam() id: number,
    @Body() dto: DictUpdateDto,
  ): Promise<void> {
    await this.dictService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除指定的字典配置' })
  async delete(@IdParam() id: number): Promise<void> {
    await this.dictService.delete(id);
  }
}
