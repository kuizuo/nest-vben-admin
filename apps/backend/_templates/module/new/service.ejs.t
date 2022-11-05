---
to: src/modules/apps/<%= name %>/<%= name %>.service.ts
---
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import <%= Name %> from '@/entities/apps/<%= name %>.entity';
import { <%= Name %>CreateDto, <%= Name %>UpdateDto, <%= Name %>PageDto } from './<%= name %>.dto';
import { ApiException } from '@/common/exceptions/api.exception';

@Injectable()
export class <%= Name %>Service {
  constructor(
    @InjectRepository(<%= Name %>)
    private <%= name %>Repository: Repository<<%= Name %>>,
  ) {}

  async page(dto: <%= Name %>PageDto) {
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
    if (!item) throw new ApiException(30001, '<%= name %> not found');

    return item;
  }

  async create(dto: <%= Name %>CreateDto): Promise<<%= Name %>> {
    let <%= name %> = new <%= Name %>();
    <%= name %> = Object.assign(dto);

    return await this.<%= name %>Repository.save(<%= name %>);
  }

  async update(dto: <%= Name %>UpdateDto): Promise<<%= Name %>> {
    const exist = await this.<%= name %>Repository.findOneBy({ id: dto.id });

    const <%= name %>: <%= Name %> = Object.assign(exist, dto);
    return await this.<%= name %>Repository.save(<%= name %>);
  }

  async delete(id: number): Promise<<%= Name %>> {
    const exist = await this.<%= name %>Repository.findOne({ where: { id } });
    const result = await this.<%= name %>Repository.remove(exist);

    return result;
  }
}
