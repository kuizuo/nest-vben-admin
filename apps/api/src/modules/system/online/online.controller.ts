import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ErrorEnum } from '@/constants/error-code.constant';
import { ApiResult } from '@/decorators/api-result.decorator';
import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { ApiException } from '@/exceptions/api.exception';

import { AuthUser } from '@/modules/auth/decorators';

import { Permission } from '@/modules/rbac/decorators';

import { KickDto } from './online.dto';
import { OnlineUserInfo } from './online.model';
import { OnlineService } from './online.service';

@ApiTags('System - 在线用户模块')
@ApiSecurityAuth()
@ApiExtraModels(OnlineUserInfo)
@Controller('online')
export class OnlineController {
  constructor(private onlineService: OnlineService) {}

  @Get('list')
  @ApiOperation({ summary: '查询当前在线用户' })
  @ApiResult({ type: [OnlineUserInfo] })
  @Permission('system:online:list')
  async list(@AuthUser() user: IAuthUser): Promise<OnlineUserInfo[]> {
    return this.onlineService.listOnlineUser(user.uid);
  }

  @Post('kick')
  @ApiOperation({ summary: '下线指定在线用户' })
  @Permission('system:online:kick')
  async kick(@Body() dto: KickDto, @AuthUser() user: IAuthUser): Promise<void> {
    if (dto.id === user.uid) {
      throw new ApiException(ErrorEnum.NOT_ALLOWED_TO_LOGOUT_USER);
    }
    await this.onlineService.kickUser(dto.id, user.uid);
  }
}
