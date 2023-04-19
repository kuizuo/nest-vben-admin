import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiResult } from '@/decorators/api-result.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';

import { Pagination } from '@/helper/paginate/pagination';

import { StorageDeleteDto, StoragePageDto } from './storage.dto';
import { StorageInfo } from './storage.modal';

import { StorageService } from './storage.service';

@ApiTags('System - 存储模块')
@ApiSecurityAuth()
@ApiExtraModels(StorageInfo)
@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @ApiOperation({ summary: '获取本地存储列表' })
  @ApiResult({ type: StorageInfo, isPage: true })
  @Get('list')
  async list(@Query() dto: StoragePageDto): Promise<Pagination<StorageInfo>> {
    return this.storageService.page(dto);
  }

  @ApiOperation({ summary: '删除文件' })
  @Post('delete')
  async delete(@Body() dto: StorageDeleteDto): Promise<void> {
    await this.storageService.delete(dto.ids);
  }
}
