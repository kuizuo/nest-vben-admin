import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AdminUser } from '@/common/decorators/admin-user.decorator';
import { ADMIN_PREFIX } from '@/modules/admin/admin.constants';
import { IAdminUser } from '/@/interfaces/auth';
import { PermissionOptional } from '@/common/decorators/permission-optional.decorator';
import { LoginService } from '../login/login.service';
import { AccountInfo } from '../system/user/user.class';
import { PasswordUpdateDto, UserInfoUpdateDto, UserExistDto } from '../system/user/user.dto';
import { SysUserService } from '../system/user/user.service';
import { ApiResult } from '@/common/decorators/api-result.decorator';
import { SysMenu } from '@/entities/admin/sys-menu.entity';

@ApiTags('账户模块')
@ApiExtraModels(AccountInfo)
@ApiSecurity(ADMIN_PREFIX)
@Controller()
export class AccountController {
  constructor(private userService: SysUserService, private loginService: LoginService) {}

  @Get('info')
  @ApiOperation({ summary: '获取账户资料' })
  @ApiResult({ type: AccountInfo })
  @PermissionOptional()
  async info(@AdminUser() user: IAdminUser): Promise<AccountInfo> {
    return await this.userService.getAccountInfo(user.uid);
  }

  @Post('update')
  @ApiOperation({ summary: '更改账户资料' })
  @PermissionOptional()
  async update(@Body() dto: UserInfoUpdateDto, @AdminUser() user: IAdminUser): Promise<void> {
    await this.userService.updateAccountInfo(user.uid, dto);
  }

  @Post('password')
  @ApiOperation({ summary: '更改账户密码' })
  @PermissionOptional()
  async password(@Body() dto: PasswordUpdateDto, @AdminUser() user: IAdminUser): Promise<void> {
    await this.userService.updatePassword(user.uid, dto);
  }

  @Get('logout')
  @ApiOperation({ summary: '账户登出' })
  @PermissionOptional()
  async logout(@AdminUser() user: IAdminUser): Promise<void> {
    await this.loginService.clearLoginStatus(user.uid);
  }

  @Get('menu')
  @ApiOperation({ summary: '获取菜单列表' })
  @ApiResult({ type: [SysMenu] })
  @PermissionOptional()
  async menu(@AdminUser() user: IAdminUser): Promise<string[]> {
    return await this.loginService.getMenu(user.uid);
  }

  @Get('perm')
  @ApiOperation({ summary: '获取权限列表' })
  @ApiResult({ type: [String] })
  @PermissionOptional()
  async perm(@AdminUser() user: IAdminUser): Promise<string[]> {
    return await this.loginService.getPerm(user.uid);
  }

  @Get('exist')
  @ApiOperation({ summary: '判断用户名是否存在' })
  @PermissionOptional()
  async exist(@Query() dto: UserExistDto) {
    return this.userService.exist(dto.username);
  }
}
