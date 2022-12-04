---
to: src/modules/apps/<%= name %>/<%= name %>.service.ts
---
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { <%= Name %> } from '@/entities/apps/<%= name %>.entity';
import { <%= Name %>CreateDto, <%= Name %>UpdateDto, <%= Name %>PageDto } from './<%= name %>.dto';
import { ApiException } from '@/common/exceptions/api.exception';
import { PageResult } from '@/common/class/res.class';
import { ErrorEnum } from '@/common/constants/error';

@Injectable()
export class <%= Name %>Service {
  constructor(
    @InjectRepository(<%= Name %>)
    private <%= name %>Repo: Repository<<%= Name %>>,
  ) {}

  async list(): Promise<<%= Name %>[]> {
    return await this.<%= name %>Repo.find();
  }

  async page(dto: <%= Name %>PageDto): Promise<PageResult<<%= Name %>>> {
    const { page, pageSize } = dto;

    const [items, total] = await this.<%= name %>Repo
      .createQueryBuilder(this.<%= name %>Repo.metadata.tableName)
      .skip(pageSize * (page - 1))
      .take(pageSize)
      .getManyAndCount();

    return { total, items };
  }

  async detail(id: number): Promise<<%= Name %>> {
    const item = await this.<%= name %>Repo.findOneBy({ id });

    return item;
  }

  async create(dto: <%= Name %>CreateDto) {
    let <%= name %> = new <%= Name %>();
    <%= name %> = Object.assign(dto);

    await this.<%= name %>Repo.save(<%= name %>);
  }

  async update(dto: <%= Name %>UpdateDto) {
    const item = await this.detail(id);

    const <%= name %>: <%= Name %> = Object.assign(item, dto);
    await this.<%= name %>Repo.save(<%= name %>);
  }

  async delete(id: number) {
    const item = await this.detail(id);

    await this.<%= name %>Repo.remove(item);
  }
}
