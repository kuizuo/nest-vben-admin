import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

import { AbstractEntity } from '~/common/entity/abstract.entity'

@Entity({ name: 'sys_config' })
export class DictEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  @ApiProperty({ description: '配置名' })
  name: string

  @Column({ type: 'varchar', length: 50, unique: true })
  @ApiProperty({ description: '配置键名' })
  key: string

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: '配置值' })
  value: string

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({ description: '配置描述' })
  remark: string
}
