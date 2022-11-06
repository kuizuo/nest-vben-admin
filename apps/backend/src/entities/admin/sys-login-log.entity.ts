import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_login_log' })
export default class SysLoginLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true, name: 'user_id' })
  @ApiProperty({ description: '用户ID' })
  userId: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'IP' })
  ip: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '地址' })
  address: string;

  @Column({ type: 'datetime', nullable: true })
  @ApiProperty({ description: '登录时间' })
  time: Date;

  @Column({ length: 500, nullable: true })
  @ApiProperty({ description: '浏览器ua' })
  ua: string;
}
