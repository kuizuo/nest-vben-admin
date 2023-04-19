import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AllowAnonPermission } from '@/decorators/allow-anon-permission.decorator';
import { ApiResult } from '@/decorators/api-result.decorator';
import { AuthUser } from '@/decorators/auth-user.decorator';

import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { IAuthUser } from '@/interfaces/auth';

import { MenuEntity } from '@/modules/system/menu/menu.entity';

import { AuthService } from '../auth/auth.service';
import {
  PasswordUpdateDto,
  UserInfoUpdateDto,
  UserExistDto,
} from '../system/user/user.dto';
import { AccountInfo } from '../system/user/user.modal';
import { UserService } from '../system/user/user.service';

@ApiTags('System - 账户模块')
@ApiSecurityAuth()
@ApiExtraModels(AccountInfo)
@Controller()
export class AccountController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('info')
  @ApiOperation({ summary: '获取账户资料' })
  @ApiResult({ type: AccountInfo })
  @AllowAnonPermission()
  async info(@AuthUser() user: IAuthUser): Promise<AccountInfo> {
    return this.userService.getAccountInfo(user.uid);
  }

  @Post('update')
  @ApiOperation({ summary: '更改账户资料' })
  @AllowAnonPermission()
  async update(
    @Body() dto: UserInfoUpdateDto,
    @AuthUser() user: IAuthUser,
  ): Promise<void> {
    await this.userService.updateAccountInfo(user.uid, dto);
  }

  @Post('password')
  @ApiOperation({ summary: '更改账户密码' })
  @AllowAnonPermission()
  async password(
    @Body() dto: PasswordUpdateDto,
    @AuthUser() user: IAuthUser,
  ): Promise<void> {
    await this.userService.updatePassword(user.uid, dto);
  }

  @Get('logout')
  @ApiOperation({ summary: '账户登出' })
  @AllowAnonPermission()
  async logout(@AuthUser() user: IAuthUser): Promise<void> {
    await this.authService.clearLoginStatus(user.uid);
  }

  @Get('menu')
  @ApiOperation({ summary: '获取菜单列表' })
  @ApiResult({ type: [MenuEntity] })
  @AllowAnonPermission()
  async menu(@AuthUser() user: IAuthUser): Promise<string[]> {
    return this.authService.getMenu(user.uid);
  }

  @Get('perm')
  @ApiOperation({ summary: '获取权限列表' })
  @ApiResult({ type: [String] })
  @AllowAnonPermission()
  async perm(@AuthUser() user: IAuthUser): Promise<string[]> {
    return this.authService.getPerm(user.uid);
  }

  @Get('exist')
  @ApiOperation({ summary: '判断用户名是否存在' })
  @AllowAnonPermission()
  async exist(@Query() dto: UserExistDto) {
    return this.userService.exist(dto.username);
  }
}
