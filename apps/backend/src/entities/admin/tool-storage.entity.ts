import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'tool-storage' })
export default class ToolStorage extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 200, comment: '文件名' })
  @ApiProperty()
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true, comment: '真实文件名' })
  @ApiProperty()
  fileName: string;

  @Column({ name: 'ext_name', type: 'varchar', nullable: true })
  @ApiProperty()
  extName: string;

  @Column({ type: 'varchar' })
  @ApiProperty()
  path: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  type: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  size: string;

  @Column({ nullable: true, name: 'user_id' })
  @ApiProperty()
  userId: number;
}
