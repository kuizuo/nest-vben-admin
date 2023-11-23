import { Column, Entity, ManyToMany } from 'typeorm'

import { RoleEntity } from '../role/role.entity'
import { AbstractEntity } from '@/common/entity/abstract.entity'

@Entity({ name: 'sys_menu' })
export class MenuEntity extends AbstractEntity {
  @Column({ nullable: true })
  parent: number

  @Column()
  name: string

  @Column({ nullable: true })
  path: string

  @Column({ nullable: true })
  permission: string

  @Column({ type: 'tinyint', default: 0 })
  type: number

  @Column({ nullable: true, default: '' })
  icon: string

  @Column({ name: 'order_no', type: 'int', nullable: true, default: 0 })
  orderNo: number

  @Column({ name: 'component', nullable: true })
  component: string

  @Column({ type: 'tinyint', default: 0 })
  external: number

  @Column({ type: 'tinyint', default: 1 })
  keepalive: number

  @Column({ type: 'tinyint', default: 1 })
  show: number

  @Column({ type: 'tinyint', default: 1 })
  status: number

  @ManyToMany(() => RoleEntity, role => role.menus)
  roles: RoleEntity[]
}
