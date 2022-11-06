import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { PageResult } from '@/common/class/res.class';
import { ADMIN_PREFIX } from '../../admin.constants';
import {
  UserCreateDto,
  UserDeleteDto,
  UserInfoDto,
  UserPageDto,
  UserPasswordDto,
  UserUpdateDto,
} from './user.dto';
import { UserInfoPage, UserDetailInfo } from './user.class';
import { SysUserService } from './user.service';
import { SysMenuService } from '../menu/menu.service';
import { ApiResult } from '@/common/decorators/api-result.decorator';

@ApiSecurity(ADMIN_PREFIX)
@ApiTags('用户模块')
@ApiExtraModels(UserInfoPage)
@Controller('user')
export class SysUserController {
  constructor(private userService: SysUserService, private menuService: SysMenuService) {}

  @Post('add')
  @ApiOperation({ summary: '新增用户' })
  async add(@Body() dto: UserCreateDto): Promise<void> {
    await this.userService.add(dto);
  }

  @Get('info')
  @ApiOperation({ summary: '查询用户信息' })
  @ApiResult({ type: UserDetailInfo })
  async info(@Query() dto: UserInfoDto): Promise<UserDetailInfo> {
    return await this.userService.info(dto.id);
  }

  @Post('delete')
  @ApiOperation({ summary: '根据ID删除用户' })
  async delete(@Body() dto: UserDeleteDto): Promise<void> {
    await this.userService.delete(dto.ids);
    await this.userService.multiForbidden(dto.ids);
  }

  @Get('list')
  @ApiOperation({ summary: '获取用户列表' })
  @ApiResult({ type: [UserInfoPage] })
  async list(@Query() dto: UserPageDto): Promise<PageResult<UserInfoPage>> {
    return await this.userService.page(dto);
  }

  @Post('update')
  @ApiOperation({ summary: '更新用户信息' })
  async update(@Body() dto: UserUpdateDto): Promise<void> {
    await this.userService.update(dto);
    await this.menuService.refreshPerms(dto.id);
  }

  @Post('password')
  @ApiOperation({ summary: '更改指定用户密码' })
  async password(@Body() dto: UserPasswordDto): Promise<void> {
    await this.userService.forceUpdatePassword(dto.id, dto.password);
  }
}
