import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServeStatInfo } from './serve.class';
import { ServeService } from './serve.service';
import { ApiResult } from '@/decorators/api-result.decorator';
import { AllowAnonPermission } from '@/decorators';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';

@ApiTags('System - 服务监控')
@ApiSecurityAuth()
@ApiExtraModels(ServeStatInfo)
@Controller('serve')
@UseInterceptors(CacheInterceptor)
@CacheKey('serve_stat')
@CacheTTL(10)
export class ServeController {
  constructor(private serveService: ServeService) {}

  @Get('stat')
  @ApiOperation({ summary: '获取服务器运行信息' })
  @ApiResult({ type: ServeStatInfo })
  @AllowAnonPermission()
  async stat(): Promise<ServeStatInfo> {
    return await this.serveService.getServeStat();
  }
}
