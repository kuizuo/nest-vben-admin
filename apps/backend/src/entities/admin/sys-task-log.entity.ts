import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_task_log' })
export default class SysTaskLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'task_id' })
  @ApiProperty({ description: '任务ID' })
  taskId: number;

  @Column({ type: 'tinyint', default: 0 })
  @ApiProperty({ description: '任务状态：0失败，1成功' })
  status: number;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: '任务日志信息' })
  detail: string;

  @Column({ type: 'int', nullable: true, name: 'consume_time', default: 0 })
  @ApiProperty({ description: '任务耗时' })
  consumeTime: number;
}
