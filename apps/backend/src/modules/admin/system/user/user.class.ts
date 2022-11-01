import { ApiProperty } from '@nestjs/swagger';
import SysUser from '@/entities/admin/sys-user.entity';

export class AccountInfo {
  @ApiProperty()
  username: string;

  @ApiProperty()
  nickName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  remark: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  qq: string;
}

export class PageSearchUserInfo {
  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  qq: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nickName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  remark: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  departmentName: string;

  @ApiProperty({
    type: [String],
  })
  roleNames: string[];
}

export class UserDetailInfo extends SysUser {
  @ApiProperty({
    description: '关联角色',
  })
  roles: number[];
}
