import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { StorageCreateDto, StoragePageDto } from './storage.dto';
import { deleteFile } from '@/utils/file';
import { StorageInfo } from './storage.modal';
import { ToolStorage } from './storage.entity';
import { UserEntity } from '@/modules/system/user/entities/user.entity';
import { paginateRaw } from '@/helper/paginate';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(ToolStorage)
    private storageRepo: Repository<ToolStorage>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  /**
   * 保存文件上传记录
   */
  async save(file: StorageCreateDto & { userId: number }): Promise<void> {
    await this.storageRepo.save({
      name: file.name,
      fileName: file.fileName,
      extName: file.extName,
      path: file.path,
      type: file.type,
      size: file.size,
      userId: file.userId,
    });
  }

  /**
   * 删除文件
   */
  async delete(fileIds: number[]): Promise<void> {
    const items = await this.storageRepo.findByIds(fileIds);
    await this.storageRepo.delete(fileIds);

    items.forEach((el) => {
      deleteFile(el.path);
    });
  }

  async page(dto: StoragePageDto) {
    const { page, pageSize, name, type, size, extName, time, username } = dto;

    const queryBuilder = this.storageRepo
      .createQueryBuilder('storage')
      .where({
        ...(name ? { name: Like(`%${name}%`) } : null),
        ...(type ? { type: type } : null),
        ...(extName ? { extName: extName } : null),
        ...(size ? { size: Between(size[0], size[1]) } : null),
        ...(time ? { createdAt: Between(time[0], time[1]) } : null),
      })
      .orderBy('storage.created_at', 'DESC');

    if (username) {
      const user = await this.userRepo.findOneBy({ username: username });
      queryBuilder.andWhere('storage.userId = :userId', { userId: user.id });
    }

    const { items, meta } = await paginateRaw(queryBuilder, { page, pageSize });

    return {
      items: items.map((e: any) => ({
        id: e.storage_id,
        name: e.storage_name,
        extName: e.storage_ext_name,
        path: e.storage_path,
        type: e.storage_type,
        size: e.storage_size,
        createdAt: e.storage_created_at,
        username: e.user_username,
      })),
      meta,
    };
  }

  async count(): Promise<number> {
    return await this.storageRepo.count();
  }
}
