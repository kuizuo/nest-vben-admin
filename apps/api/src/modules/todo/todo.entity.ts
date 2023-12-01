import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm'

import { AbstractEntity } from '~/common/entity/abstract.entity'
import { UserEntity } from '~/modules/user/entities/user.entity'

@Entity('todo')
export class TodoEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ description: 'todo' })
  value: string

  @ApiProperty({ description: 'todo' })
  @Column({ default: false })
  status: boolean

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: Relation<UserEntity>
}
