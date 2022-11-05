import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Test from '@/entities/apps/test.entity';
import { TestCreateDto, TestUpdateDto, TestPageDto } from './test.dto';
import { ApiException } from '@/common/exceptions/api.exception';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  async page(dto: TestPageDto) {
    const { page, limit } = dto;

    const [items, total] = await this.testRepository
      .createQueryBuilder(this.testRepository.metadata.tableName)
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    return { total, items };
  }

  async detail(id: number): Promise<Test> {
    const item = await this.testRepository.findOneBy({ id });
    if (!item) throw new ApiException(30001, 'test not found');

    return item;
  }

  async create(dto: TestCreateDto): Promise<Test> {
    let test = new Test();
    test = Object.assign(dto);

    return await this.testRepository.save(test);
  }

  async update(dto: TestUpdateDto): Promise<Test> {
    const exist = await this.testRepository.findOneBy({ id: dto.id });

    const test: Test = Object.assign(exist, dto);
    return await this.testRepository.save(test);
  }

  async delete(id: number): Promise<Test> {
    const exist = await this.testRepository.findOne({ where: { id } });
    const result = await this.testRepository.remove(exist);

    return result;
  }
}
