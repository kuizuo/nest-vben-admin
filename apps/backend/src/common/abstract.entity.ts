import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  @ApiProperty()
  updatedAt: Date;
}
