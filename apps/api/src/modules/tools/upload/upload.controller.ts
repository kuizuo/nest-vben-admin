import { MultipartFile } from '@fastify/multipart';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiSecurityAuth } from '@/common/decorators/swagger.decorator';
import { AuthUser } from '@/modules/auth/decorators/auth-user.decorator';

import { Permission } from '@/modules/auth/decorators/permission.decorator';

import { UploadService } from './upload.service';

@ApiSecurityAuth()
@ApiTags('Tools - 上传模块')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: '上传' })
  @ApiConsumes('multipart/form-data')
  @Permission('upload')
  async upload(
    @Body() dto: { file: MultipartFile },
    @AuthUser() user: IAuthUser,
  ) {
    const { file } = dto;

    try {
      const path = await this.uploadService.saveFile(file, user.uid);

      return {
        filename: path,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('上传失败');
    }
  }
}
