import { AbstractEntity } from '@/common/entity/abstract.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'sys_login_log' })
export class LoginLogEntity extends AbstractEntity {
  @Column({ nullable: true, name: 'user_id' })
  @ApiProperty({ description: '用户ID' })
  userId: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'IP' })
  ip: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '地址' })
  address: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '登录方式' })
  provider: string;

  @Column({ type: 'datetime', nullable: true })
  @ApiProperty({ description: '登录时间' })
  time: Date;

  @Column({ length: 500, nullable: true })
  @ApiProperty({ description: '浏览器ua' })
  ua: string;
}
