import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_menu' })
export default class SysMenu extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'parent', nullable: true })
  @ApiProperty()
  parent: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ nullable: true })
  @ApiProperty()
  path: string;

  @Column({ nullable: true })
  @ApiProperty()
  permission: string;

  @Column({ type: 'tinyint', default: 0 })
  @ApiProperty()
  type: number;

  @Column({ nullable: true, default: '' })
  @ApiProperty()
  icon: string;

  @Column({ name: 'order_no', type: 'int', nullable: true, default: 0 })
  @ApiProperty()
  orderNo: number;

  @Column({ name: 'component', nullable: true })
  @ApiProperty()
  component: string;

  @Column({ type: 'tinyint', default: 0 })
  @ApiProperty()
  external: number;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  keepalive: number;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  show: number;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  status: number;
}
