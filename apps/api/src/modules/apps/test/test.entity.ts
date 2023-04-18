import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '@/common/entity/abstract.entity';

@Entity()
export class Test extends AbstractEntity {
  @Column()
  @ApiProperty({ description: 'test' })
  name: string;
}
