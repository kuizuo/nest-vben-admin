import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm'

import { TaskEntity } from '../../task/task.entity'
import { AbstractEntity } from '@/common/entity/abstract.entity'

@Entity({ name: 'sys_task_log' })
export class TaskLogEntity extends AbstractEntity {
  @Column({ type: 'tinyint', default: 0 })
  @ApiProperty({ description: '任务状态：0失败，1成功' })
  status: number

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: '任务日志信息' })
  detail: string

  @Column({ type: 'int', nullable: true, name: 'consume_time', default: 0 })
  @ApiProperty({ description: '任务耗时' })
  consumeTime: number

  @ManyToOne(() => TaskEntity)
  @JoinColumn()
  task: Relation<TaskEntity>
}
