import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../../common/abstract.entity';

@Entity({ name: 'sys_user_role' })
export class SysUserRole extends AbstractEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'user_id' })
  @ApiProperty({ description: '用户ID' })
  userId: number;

  @Column({ name: 'role_id' })
  @ApiProperty({ description: '角色ID' })
  roleId: number;
}
