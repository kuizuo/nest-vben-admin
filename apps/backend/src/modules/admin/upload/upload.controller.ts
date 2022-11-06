import { BadRequestException, Controller, Post, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { MultipartFile } from '@fastify/multipart';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  fileRename,
  getExtname,
  getFilePath,
  getFileType,
  getName,
  getSize,
  saveFile,
} from '@/utils/file.util';
import { StorageService } from '../tools/storage/storage.service';
import { AdminUser } from '@/common/decorators/admin-user.decorator';
import { IAdminUser } from '../admin.interface';
import { FileUploadDto } from './upload.dto';

@ApiTags('上传模块')
@Controller('upload')
export class UploadController {
  constructor(private storageService: StorageService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  async upload(@Req() req: FastifyRequest, @AdminUser() user: IAdminUser) {
    const file: MultipartFile = await req.file();
    const fileName = file.filename;
    const size = getSize(file.file.bytesRead);
    const extName = getExtname(fileName);
    const type = getFileType(extName);

    const name = fileRename(fileName);
    const path = getFilePath(name);

    try {
      await saveFile(file, name);
      await this.storageService.save({
        name: getName(fileName),
        fileName,
        extName,
        path,
        type,
        size,
        userId: user?.uid,
      });

      return {
        filename: path,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('上传失败');
    }
  }
}
