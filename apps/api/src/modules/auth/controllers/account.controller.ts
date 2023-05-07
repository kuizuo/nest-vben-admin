import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiResult } from '@/decorators/api-result.decorator';

import { ApiSecurityAuth } from '@/decorators/swagger.decorator';
import { AuthUser } from '@/modules/auth/decorators';

import { AllowAnon } from '@/modules/rbac/decorators';
import { MenuEntity } from '@/modules/system/menu/menu.entity';

import { PasswordUpdateDto } from '@/modules/system/user/dto/password.dto';

import { AccountInfo } from '../../system/user/user.model';
import { UserService } from '../../system/user/user.service';
import { AuthService } from '../auth.service';
import { AccountUpdateDto } from '../dto/account.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('Account - 账户模块')
@ApiSecurityAuth()
@ApiExtraModels(AccountInfo)
@UseGuards(JwtAuthGuard)
@Controller('account')
export class AccountController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('profile')
  @ApiOperation({ summary: '获取账户资料' })
  @ApiResult({ type: AccountInfo })
  @AllowAnon()
  async profile(@AuthUser() user: IAuthUser): Promise<AccountInfo> {
    return this.userService.getAccountInfo(user.uid);
  }

  @Get('logout')
  @ApiOperation({ summary: '账户登出' })
  @AllowAnon()
  async logout(@AuthUser() user: IAuthUser): Promise<void> {
    await this.authService.clearLoginStatus(user.uid);
  }

  @Get('menus')
  @ApiOperation({ summary: '获取菜单列表' })
  @ApiResult({ type: [MenuEntity] })
  @AllowAnon()
  async menu(@AuthUser() user: IAuthUser): Promise<string[]> {
    return this.authService.getMenus(user.uid);
  }

  @Get('permissions')
  @ApiOperation({ summary: '获取权限列表' })
  @ApiResult({ type: [String] })
  @AllowAnon()
  async permissions(@AuthUser() user: IAuthUser): Promise<string[]> {
    return this.authService.getPermissions(user.uid);
  }

  @Put('update')
  @ApiOperation({ summary: '更改账户资料' })
  @AllowAnon()
  async update(
    @AuthUser() user: IAuthUser,
    @Body() dto: AccountUpdateDto,
  ): Promise<void> {
    await this.userService.updateAccountInfo(user.uid, dto);
  }

  @Post('password')
  @ApiOperation({ summary: '更改账户密码' })
  @AllowAnon()
  async password(
    @AuthUser() user: IAuthUser,
    @Body() dto: PasswordUpdateDto,
  ): Promise<void> {
    await this.userService.updatePassword(user.uid, dto);
  }
}
