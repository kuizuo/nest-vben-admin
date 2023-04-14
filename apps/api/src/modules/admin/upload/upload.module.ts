import { Module } from '@nestjs/common';
import { ToolsModule } from '../tools/tools.module';
import { UploadController } from './upload.controller';

@Module({
  imports: [ToolsModule],
  controllers: [UploadController],
  providers: [],
})
export class UploadModule {}
