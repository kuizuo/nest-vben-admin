import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PageResult } from '@/common/class/res.class';
import { ADMIN_PREFIX } from '../../admin.constants';
import { IAdminUser } from '../../admin.interface';
import { AdminUser } from '../../core/decorators/admin-user.decorator';
import {
  CreateUserDto,
  DeleteUserDto,
  InfoUserDto,
  PageSearchUserDto,
  PasswordUserDto,
  UpdateUserDto,
  UserExistDto,
} from './user.dto';
import { PageSearchUserInfo, UserDetailInfo } from './user.class';
import { SysUserService } from './user.service';
import { SysMenuService } from '../menu/menu.service';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('用户模块')
@Controller('user')
export class SysUserController {
  constructor(private userService: SysUserService, private menuService: SysMenuService) {}

  @ApiOperation({ summary: '新增用户' })
  @Post('add')
  async add(@Body() dto: CreateUserDto): Promise<void> {
    await this.userService.add(dto);
  }

  @ApiOperation({ summary: '查询用户信息' })
  @ApiOkResponse({ type: UserDetailInfo })
  @Get('info')
  async info(@Query() dto: InfoUserDto): Promise<UserDetailInfo> {
    return await this.userService.info(dto.id);
  }

  @ApiOperation({ summary: '根据ID删除用户' })
  @Post('delete')
  async delete(@Body() dto: DeleteUserDto): Promise<void> {
    await this.userService.delete(dto.ids);
    await this.userService.multiForbidden(dto.ids);
  }

  @ApiOperation({ summary: '获取用户列表' })
  @ApiOkResponse({ type: [PageSearchUserInfo] })
  @Get('list')
  async list(
    @Query() dto: PageSearchUserDto,
    @AdminUser() user: IAdminUser,
  ): Promise<PageResult<PageSearchUserInfo>> {
    return await this.userService.page(dto);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @Post('update')
  async update(@Body() dto: UpdateUserDto): Promise<void> {
    await this.userService.update(dto);
    await this.menuService.refreshPerms(dto.id);
  }

  @ApiOperation({ summary: '更改指定用户密码' })
  @Post('password')
  async password(@Body() dto: PasswordUserDto): Promise<void> {
    await this.userService.forceUpdatePassword(dto.id, dto.password);
  }
}
