import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiException } from '@/common/exceptions/api.exception';
import { AdminUser } from '@/common/decorators/admin-user.decorator';
import { ADMIN_PREFIX } from '../../admin.constants';
import { IAdminUser } from '/@/interfaces/auth';
import { LogDisabled } from '@/common/decorators/log-disabled.decorator';
import { OnlineUserInfo } from './online.class';
import { KickDto } from './online.dto';
import { SysOnlineService } from './online.service';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { ErrorEnum } from '@/common/constants/error';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('在线用户模块')
@ApiExtraModels(OnlineUserInfo)
@Controller('online')
export class SysOnlineController {
  constructor(private onlineService: SysOnlineService) {}

  @ApiOperation({ summary: '查询当前在线用户' })
  @ApiResult({ type: [OnlineUserInfo] })
  @LogDisabled()
  @Get('list')
  async list(@AdminUser() user: IAdminUser): Promise<OnlineUserInfo[]> {
    return await this.onlineService.listOnlineUser(user.uid);
  }

  @ApiOperation({ summary: '下线指定在线用户' })
  @Post('kick')
  async kick(@Body() dto: KickDto, @AdminUser() user: IAdminUser): Promise<void> {
    if (dto.id === user.uid) {
      throw new ApiException(ErrorEnum.CODE_1012);
    }
    await this.onlineService.kickUser(dto.id, user.uid);
  }
}
