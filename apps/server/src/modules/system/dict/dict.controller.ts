import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '@server/common/decorators/api-result.decorator'
import { IdParam } from '@server/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '@server/common/decorators/swagger.decorator'
import { Pagination } from '@server/helper/paginate/pagination'
import { Perm, PermissionMap } from '@server/modules/auth/decorators/permission.decorator'
import { DictEntity } from '@server/modules/system/dict/dict.entity'

import { DictDto, DictQueryDto } from './dict.dto'
import { DictService } from './dict.service'

export const permissions: PermissionMap<'system:dict'> = {
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
  constructor(private dictService: DictService) { }

  @Get()
  @ApiOperation({ summary: '获取字典配置列表' })
  @ApiResult({ type: [DictEntity] })
  @Perm(permissions.LIST)
  async list(@Query() dto: DictQueryDto): Promise<Pagination<DictEntity>> {
    return this.dictService.page(dto)
  }

  @Post()
  @ApiOperation({ summary: '新增字典配置' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: DictDto): Promise<void> {
    await this.dictService.isExistKey(dto.key)
    await this.dictService.create(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询字典配置信息' })
  @ApiResult({ type: DictEntity })
  @Perm(permissions.READ)
  async info(@IdParam() id: number): Promise<DictEntity> {
    return this.dictService.findOne(id)
  }

  @Post(':id')
  @ApiOperation({ summary: '更新字典配置' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body() dto: DictDto): Promise<void> {
    await this.dictService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除指定的字典配置' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.dictService.delete(id)
  }
}
