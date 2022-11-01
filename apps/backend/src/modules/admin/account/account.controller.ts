import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ADMIN_PREFIX } from '@/modules/admin/admin.constants';
import { IAdminUser } from '../admin.interface';
import { AdminUser } from '../core/decorators/admin-user.decorator';
import { PermissionOptional } from '../core/decorators/permission-optional.decorator';
import { MenuInfo, PermInfo } from '../login/login.class';
import { LoginService } from '../login/login.service';
import { AccountInfo } from '../system/user/user.class';
import { UpdatePasswordDto, UpdateUserInfoDto, UserExistDto } from '../system/user/user.dto';
import { SysUserService } from '../system/user/user.service';

@ApiTags('账户模块')
@ApiSecurity(ADMIN_PREFIX)
@Controller()
export class AccountController {
  constructor(private userService: SysUserService, private loginService: LoginService) {}

  @ApiOperation({ summary: '获取账户资料' })
  @ApiOkResponse({ type: AccountInfo })
  @PermissionOptional()
  @Get('info')
  async info(@AdminUser() user: IAdminUser): Promise<AccountInfo> {
    return await this.userService.getAccountInfo(user.uid);
  }

  @ApiOperation({ summary: '更改账户资料' })
  @PermissionOptional()
  @Post('update')
  async update(@Body() dto: UpdateUserInfoDto, @AdminUser() user: IAdminUser): Promise<void> {
    await this.userService.updateAccountInfo(user.uid, dto);
  }

  @ApiOperation({ summary: '更改账户密码' })
  @PermissionOptional()
  @Post('password')
  async password(@Body() dto: UpdatePasswordDto, @AdminUser() user: IAdminUser): Promise<void> {
    await this.userService.updatePassword(user.uid, dto);
  }

  @ApiOperation({ summary: '账户登出' })
  @PermissionOptional()
  @Get('logout')
  async logout(@AdminUser() user: IAdminUser): Promise<void> {
    await this.loginService.clearLoginStatus(user.uid);
  }

  @ApiOperation({ summary: '获取菜单列表' })
  @ApiOkResponse({ type: MenuInfo })
  @PermissionOptional()
  @Get('menu')
  async menu(@AdminUser() user: IAdminUser): Promise<string[]> {
    return await this.loginService.getMenu(user.uid);
  }

  @ApiOperation({ summary: '获取权限列表' })
  @ApiOkResponse({ type: PermInfo })
  @PermissionOptional()
  @Get('perm')
  async perm(@AdminUser() user: IAdminUser): Promise<string[]> {
    return await this.loginService.getPerm(user.uid);
  }

  @ApiOperation({ summary: '判断用户名是否存在' })
  @PermissionOptional()
  @Get('exist')
  async exist(@Query() dto: UserExistDto) {
    return this.userService.exist(dto.username);
  }
}
