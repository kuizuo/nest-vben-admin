import { ApiProperty } from '@nestjs/swagger';

export class AccountInfo {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '昵称' })
  nickName: string;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '手机号' })
  phone: string;

  @ApiProperty({ description: '备注' })
  remark: string;

  @ApiProperty({ description: '头像' })
  avatar: string;

  @ApiProperty({ description: 'qq' })
  qq: string;
}

export class UserInfoPage {
  @ApiProperty({ description: '创建时间' })
  createdAt: string;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: 'qq' })
  qq: string;

  @ApiProperty({ description: '头像' })
  avatar: string;

  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: '用户名' })
  name: string;

  @ApiProperty({ description: '昵称' })
  nickName: string;

  @ApiProperty({ description: '手机号' })
  phone: string;

  @ApiProperty({ description: '备注' })
  remark: string;

  @ApiProperty({ description: '状态' })
  status: number;

  @ApiProperty({ description: '更新时间' })
  updatedAt: string;

  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '部门名' })
  deptName: string;

  @ApiProperty({ type: [String], description: '角色' })
  roleNames: string[];
}
