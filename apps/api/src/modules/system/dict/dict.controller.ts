import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { Pagination } from '~/helper/paginate/pagination'
import { Permission } from '~/modules/auth/decorators/permission.decorator'
import { DictEntity } from '~/modules/system/dict/dict.entity'

import { DictDto, DictQueryDto } from './dict.dto'
import { DictService } from './dict.service'

export const Permissions = {
  LIST: 'system:dict:list',
  CREATE: 'system:dict:create',
  READ: 'system:dict:read',
  UPDATE: 'system:dict:update',
  DELETE: 'system:dict:delete',
} as const

@ApiTags('System - 字典配置模块')
@ApiSecurityAuth()
@Controller('dicts')
export class DictController {
  constructor(private dictService: DictService) {}

  @Get()
  @ApiOperation({ summary: '获取字典配置列表' })
  @ApiResult({ type: [DictEntity] })
  @Permission(Permissions.LIST)
  async list(@Query() dto: DictQueryDto): Promise<Pagination<DictEntity>> {
    return this.dictService.page(dto)
  }

  @Post()
  @ApiOperation({ summary: '新增字典配置' })
  @Permission(Permissions.CREATE)
  async create(@Body() dto: DictDto): Promise<void> {
    await this.dictService.isExistKey(dto.key)
    await this.dictService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询字典配置信息' })
  @ApiResult({ type: DictEntity })
  @Permission(Permissions.READ)
  async info(@IdParam() id: number): Promise<DictEntity> {
    return this.dictService.findOne(id)
  }

  @Post(':id')
  @ApiOperation({ summary: '更新字典配置' })
  @Permission(Permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: DictDto): Promise<void> {
    await this.dictService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除指定的字典配置' })
  @Permission(Permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.dictService.delete(id)
  }
}
