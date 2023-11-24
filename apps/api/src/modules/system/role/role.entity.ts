import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinTable, ManyToMany, Relation } from 'typeorm'

import { UserEntity } from '../../user/entities/user.entity'
import { MenuEntity } from '../menu/menu.entity'
import { AbstractEntity } from '@/common/entity/abstract.entity'

@Entity({ name: 'sys_role' })
export class RoleEntity extends AbstractEntity {
  @Column({ length: 50, unique: true })
  @ApiProperty({ description: '角色名' })
  name: string

  @Column({ unique: true })
  @ApiProperty({ description: '角色标识' })
  value: string

  @Column({ nullable: true })
  @ApiProperty({ description: '角色描述' })
  remark: string

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  @ApiProperty({ description: '状态：1启用，0禁用' })
  status: number

  @ManyToMany(() => UserEntity, user => user.roles)
  users: Relation<UserEntity[]>

  @ManyToMany(() => MenuEntity, menu => menu.roles, {})
  @JoinTable()
  menus: Relation<MenuEntity[]>
}
