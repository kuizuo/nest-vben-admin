import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_role' })
export default class SysRole extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 50, unique: true })
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  value: string;

  @Column({ nullable: true })
  @ApiProperty()
  remark: string;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  @ApiProperty()
  status: number;
}
