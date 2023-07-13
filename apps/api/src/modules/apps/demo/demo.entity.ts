import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '@/common/entity/abstract.entity';
import { UserEntity } from '@/modules/system/user/entities/user.entity';

@Entity('demo')
export class DemoEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ description: 'demo' })
  name: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
