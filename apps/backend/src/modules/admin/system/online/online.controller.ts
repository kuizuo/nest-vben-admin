import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { ApiException } from '@/common/exceptions/api.exception';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { IAuthUser } from '/@/interfaces/auth';
import { LogDisabled } from '@/common/decorators/log-disabled.decorator';
import { OnlineUserInfo } from './online.class';
import { KickDto } from './online.dto';
import { SysOnlineService } from './online.service';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { ErrorEnum } from '@/common/constants/error';

@ApiTags('在线用户模块')
@ApiExtraModels(OnlineUserInfo)
@Controller('online')
export class SysOnlineController {
  constructor(private onlineService: SysOnlineService) {}

  @ApiOperation({ summary: '查询当前在线用户' })
  @ApiResult({ type: [OnlineUserInfo] })
  @LogDisabled()
  @Get('list')
  async list(@AuthUser() user: IAuthUser): Promise<OnlineUserInfo[]> {
    return await this.onlineService.listOnlineUser(user.uid);
  }

  @ApiOperation({ summary: '下线指定在线用户' })
  @Post('kick')
  async kick(@Body() dto: KickDto, @AuthUser() user: IAuthUser): Promise<void> {
    if (dto.id === user.uid) {
      throw new ApiException(ErrorEnum.CODE_1012);
    }
    await this.onlineService.kickUser(dto.id, user.uid);
  }
}
