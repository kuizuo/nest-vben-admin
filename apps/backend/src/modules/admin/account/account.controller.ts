import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUser } from '@/common/decorators/auth-user.decorator';
import { IAuthUser } from '/@/interfaces/auth';
import { LoginService } from '../login/login.service';
import { AccountInfo } from '../system/user/user.class';
import {
  PasswordUpdateDto,
  UserInfoUpdateDto,
  UserExistDto,
} from '../system/user/user.dto';
import { SysUserService } from '../system/user/user.service';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { SysMenu } from '@/entities/admin/sys-menu.entity';
import { AllowAnonPermission } from '@/common/decorators/allow-anon-permission.decorator';

@ApiTags('账户模块')
@ApiExtraModels(AccountInfo)
@Controller()
export class AccountController {
  constructor(
    private userService: SysUserService,
    private loginService: LoginService,
  ) {}

  @Get('info')
  @ApiOperation({ summary: '获取账户资料' })
  @ApiResult({ type: AccountInfo })
  @AllowAnonPermission()
  async info(@AuthUser() user: IAuthUser): Promise<AccountInfo> {
    return await this.userService.getAccountInfo(user.uid);
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
    await this.loginService.clearLoginStatus(user.uid);
  }

  @Get('menu')
  @ApiOperation({ summary: '获取菜单列表' })
  @ApiResult({ type: [SysMenu] })
  @AllowAnonPermission()
  async menu(@AuthUser() user: IAuthUser): Promise<string[]> {
    return await this.loginService.getMenu(user.uid);
  }

  @Get('perm')
  @ApiOperation({ summary: '获取权限列表' })
  @ApiResult({ type: [String] })
  @AllowAnonPermission()
  async perm(@AuthUser() user: IAuthUser): Promise<string[]> {
    return await this.loginService.getPerm(user.uid);
  }

  @Get('exist')
  @ApiOperation({ summary: '判断用户名是否存在' })
  @AllowAnonPermission()
  async exist(@Query() dto: UserExistDto) {
    return this.userService.exist(dto.username);
  }
}
