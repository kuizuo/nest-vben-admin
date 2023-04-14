import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../../common/abstract.entity';

@Entity({ name: 'sys_user' })
export class SysUser extends AbstractEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: '用户名' })
  username: string;

  @Column()
  @ApiProperty({ description: '密码' })
  password: string;

  @Column({ length: 32 })
  @ApiProperty({ description: '盐值' })
  psalt: string;

  @Column({ name: 'nick_name', nullable: true })
  @ApiProperty({ description: '昵称' })
  nickName: string;

  @Column({ name: 'avatar', nullable: true })
  @ApiProperty({ description: '头像' })
  avatar: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'qq' })
  qq: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '邮箱' })
  email: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '手机号' })
  phone: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '备注' })
  remark: string;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  @ApiProperty()
  status: number;

  @Column()
  @ApiProperty({ description: '部门ID' })
  deptId: number;
}
