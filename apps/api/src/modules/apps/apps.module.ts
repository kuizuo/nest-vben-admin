import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodoEntity } from '@/modules/apps/todo/todo.entity';

import { SystemModule } from '../system/system.module';

import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [
    forwardRef(() => SystemModule),
    TypeOrmModule.forFeature([TodoEntity]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TypeOrmModule],
})
export class AppsModule {}
