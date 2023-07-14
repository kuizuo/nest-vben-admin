import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ErrorEnum } from '@/constants/error';
import { ApiException } from '@/exceptions/api.exception';
import { paginate } from '@/helper/paginate';
import { Pagination } from '@/helper/paginate/pagination';
import { TodoEntity } from '@/modules/apps/todo/todo.entity';

import { TodoDto, TodoPageDto } from './todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async list(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  async page({ page, pageSize }: TodoPageDto): Promise<Pagination<TodoEntity>> {
    return paginate(this.todoRepository, { page, pageSize });
  }

  async detail(id: number): Promise<TodoEntity> {
    const item = await this.todoRepository.findOneBy({ id });
    if (!item) throw new ApiException(ErrorEnum.CODE_2004);

    return item;
  }

  async create(dto: TodoDto) {
    let test = new TodoEntity();
    test = Object.assign(dto);

    await this.todoRepository.save(test);
  }

  async update(id: number, data: Partial<TodoDto>) {
    await this.todoRepository.update(id, data);
  }

  async delete(id: number) {
    const item = await this.detail(id);

    await this.todoRepository.remove(item);
  }
}
