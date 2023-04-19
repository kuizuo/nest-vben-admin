import { ApiProperty } from '@nestjs/swagger';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { AbstractEntity } from '@/common/entity/abstract.entity';

import { MenuEntity } from '../menu/menu.entity';
import { UserEntity } from '../user/entities/user.entity';

@Entity({ name: 'sys_role' })
export class RoleEntity extends AbstractEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 50, unique: true })
  @ApiProperty({ description: '角色名' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ description: '角色标识' })
  value: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '角色描述' })
  remark: string;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  @ApiProperty({ description: '状态：1启用，0禁用' })
  status: number;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];

  @ManyToMany(() => MenuEntity, (menu) => menu.roles, {})
  @JoinTable()
  menus: MenuEntity[];
}
