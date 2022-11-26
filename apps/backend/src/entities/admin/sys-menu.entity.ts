import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../../common/abstract.entity';

@Entity({ name: 'sys_menu' })
export class SysMenu extends AbstractEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true })
  @ApiProperty({ description: '父级菜单ID' })
  parent: number;

  @Column()
  @ApiProperty({ description: '菜单名称' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '菜单路径' })
  path: string;

  @Column({ nullable: true })
  @ApiProperty({ description: '菜单权限' })
  permission: string;

  @Column({ type: 'tinyint', default: 0 })
  @ApiProperty({ description: '菜单类型 0：目录 1：菜单 2：按钮' })
  type: number;

  @Column({ nullable: true, default: '' })
  @ApiProperty({ description: '菜单图标' })
  icon: string;

  @Column({ name: 'order_no', type: 'int', nullable: true, default: 0 })
  @ApiProperty({ description: '排序号' })
  orderNo: number;

  @Column({ name: 'component', nullable: true })
  @ApiProperty({ description: '前端组件' })
  component: string;

  @Column({ type: 'tinyint', default: 0 })
  @ApiProperty({ description: '是否外链' })
  external: number;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty({ description: '是否缓存' })
  keepalive: number;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty({ description: '是否显示' })
  show: number;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty({ description: '是否启用' })
  status: number;
}
