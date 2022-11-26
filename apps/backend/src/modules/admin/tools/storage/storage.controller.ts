import { PageResult } from '@/common/class/res.class';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { ApiSecurityAuth } from '@/common/decorators/swagger.decorator';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { StorageInfo } from './storage.class';

import { StorageDeleteDto, StoragePageDto } from './storage.dto';
import { StorageService } from './storage.service';

@ApiTags('存储模块')
@ApiSecurityAuth()
@ApiExtraModels(StorageInfo)
@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @ApiOperation({ summary: '获取本地存储列表' })
  @ApiResult({ type: StorageInfo, struct: 'page' })
  @Get('list')
  async list(@Query() dto: StoragePageDto): Promise<PageResult<StorageInfo>> {
    const items = await this.storageService.page(dto);
    const count = await this.storageService.count();
    return {
      items,
      total: count,
    };
  }

  @ApiOperation({ summary: '删除文件' })
  @Post('delete')
  async delete(@Body() dto: StorageDeleteDto): Promise<void> {
    await this.storageService.delete(dto.ids);
  }
}
