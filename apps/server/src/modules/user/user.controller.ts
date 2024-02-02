import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { IdParam } from '@server/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '@server/common/decorators/swagger.decorator'
import { MenuService } from '@server/modules/system/menu/menu.service'

import { Perm, PermissionMap } from '../auth/decorators/permission.decorator'

import { UserPasswordDto } from './dto/password.dto'
import { UserDto, UserQueryDto, UserUpdateDto } from './dto/user.dto'
import { UserService } from './user.service'

export const permissions: PermissionMap<'system:user'> = {
  LIST: 'system:user:list',
  CREATE: 'system:user:create',
  READ: 'system:user:read',
  UPDATE: 'system:user:update',
  DELETE: 'system:user:delete',

  PASSWORD_UPDATE: 'system:user:password:update',
  PASSWORD_RESET: 'system:user:pass:reset',
} as const

@ApiTags('System - 用户模块')
@ApiSecurityAuth()
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private menuService: MenuService,
  ) { }

  @Get()
  @ApiOperation({ summary: '获取用户列表' })
  @Perm(permissions.LIST)
  async list(@Query() dto: UserQueryDto) {
    return this.userService.list(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '查询用户' })
  @Perm(permissions.READ)
  async read(@IdParam() id: number) {
    return this.userService.info(id)
  }

  @Post()
  @ApiOperation({ summary: '新增用户' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: UserDto): Promise<void> {
    await this.userService.create(dto)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新用户' })
  @Perm(permissions.UPDATE)
  async update(
    @IdParam() id: number,
    @Body() dto: UserUpdateDto,
  ): Promise<void> {
    await this.userService.update(id, dto)
    await this.menuService.refreshPerms(id)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.userService.delete([id])
    await this.userService.multiForbidden([id])
  }

  @Post(':id/password')
  @ApiOperation({ summary: '更改用户密码' })
  @Perm(permissions.PASSWORD_UPDATE)
  async password(@Body() dto: UserPasswordDto): Promise<void> {
    await this.userService.forceUpdatePassword(dto.id, dto.password)
  }
}
