import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/common/entity/abstract.entity';

@Entity()
export class DemoEntity extends AbstractEntity {
  @Column()
  @ApiProperty({ description: 'demo' })
  name: string;
}
