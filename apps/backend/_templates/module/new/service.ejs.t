---
to: src/modules/apps/<%= name %>/<%= name %>.service.ts
---
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import <%= Name %> from '@/entities/apps/<%= name %>.entity';
import { <%= Name %>CreateDto, <%= Name %>UpdateDto, <%= Name %>PageDto } from './<%= name %>.dto';
import { ApiException } from '@/common/exceptions/api.exception';
import { PageResult } from '@/common/class/res.class';

@Injectable()
export class <%= Name %>Service {
  constructor(
    @InjectRepository(<%= Name %>)
    private <%= name %>Repository: Repository<<%= Name %>>,
  ) {}

  async list(): Promise<<%= Name %>[]> {
    return await this.<%= name %>Repository.find();
  }

  async page(dto: <%= Name %>PageDto): Promise<PageResult<<%= Name %>>> {
    const { page, pageSize } = dto;

    const [items, total] = await this.<%= name %>Repository
      .createQueryBuilder(this.<%= name %>Repository.metadata.tableName)
      .skip(pageSize * (page - 1))
      .take(pageSize)
      .getManyAndCount();

    return { total, items };
  }

  async detail(id: number): Promise<<%= Name %>> {
    const item = await this.<%= name %>Repository.findOneBy({ id });
    if (!item) throw new ApiException(20004);
    
    return item;
  }

  async create(dto: <%= Name %>CreateDto) {
    let <%= name %> = new <%= Name %>();
    <%= name %> = Object.assign(dto);

    await this.<%= name %>Repository.save(<%= name %>);
  }

  async update(dto: <%= Name %>UpdateDto) {
    const item = await this.<%= name %>Repository.findOneBy({ id: dto.id });
    if (!item) throw new ApiException(20004, '<%= name %> not found');

    const <%= name %>: <%= Name %> = Object.assign(item, dto);
    await this.<%= name %>Repository.save(<%= name %>);
  }

  async delete(id: number) {
    const item = await this.<%= name %>Repository.findOneBy({ id });
    if (!item) throw new ApiException(20004);

    await this.<%= name %>Repository.remove(item);
  }
}
