import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiResult } from '@/decorators/api-result.decorator';
import { IdParam } from '@/decorators/id-param.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { Pagination } from '@/helper/paginate/pagination';
import { Permission } from '@/modules/rbac/decorators';
import { DictEntity } from '@/modules/system/dict/dict.entity';

import { DictDto, DictQueryDto } from './dict.dto';
import { DictService } from './dict.service';
import { PermissionDict } from './permission';

@ApiTags('System - 字典配置模块')
@ApiSecurityAuth()
@Controller('dicts')
export class DictController {
  constructor(private dictService: DictService) {}

  @Get()
  @ApiOperation({ summary: '获取字典配置列表' })
  @ApiResult({ type: [DictEntity] })
  @Permission(PermissionDict.LIST)
  async list(@Query() dto: DictQueryDto): Promise<Pagination<DictEntity>> {
    return this.dictService.page(dto);
  }

  @Post()
  @ApiOperation({ summary: '新增字典配置' })
  @Permission(PermissionDict.CREATE)
  async create(@Body() dto: DictDto): Promise<void> {
    await this.dictService.isExistKey(dto.key);
    await this.dictService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询字典配置信息' })
  @ApiResult({ type: DictEntity })
  @Permission(PermissionDict.READ)
  async info(@IdParam() id: number): Promise<DictEntity> {
    return this.dictService.findOne(id);
  }

  @Post(':id')
  @ApiOperation({ summary: '更新字典配置' })
  @Permission(PermissionDict.UPDATE)
  async update(@IdParam() id: number, @Body() dto: DictDto): Promise<void> {
    await this.dictService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除指定的字典配置' })
  @Permission(PermissionDict.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.dictService.delete(id);
  }
}
