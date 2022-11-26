import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { AbstractEntity } from '../../common/abstract.entity';

@Entity({ name: 'sys_role' })
export class SysRole extends AbstractEntity {
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
}
