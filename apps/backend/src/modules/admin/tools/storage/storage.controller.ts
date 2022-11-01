import { PageResult } from '@/common/class/res.class';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StorageInfo } from './storage.class';

import { DeleteStorageDto, PageSearchStorageDto } from './storage.dto';
import { StorageService } from './storage.service';

@ApiTags('存储模块')
@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @ApiOperation({ summary: '获取本地存储列表' })
  @Get('list')
  async list(@Query() dto: PageSearchStorageDto): Promise<PageResult<StorageInfo>> {
    const items = await this.storageService.page(dto);
    const count = await this.storageService.count();
    return {
      items,
      total: count,
    };
  }

  @ApiOperation({ summary: '删除文件' })
  @Post('delete')
  async delete(@Body() dto: DeleteStorageDto): Promise<void> {
    return await this.storageService.delete(dto.ids);
  }
}
