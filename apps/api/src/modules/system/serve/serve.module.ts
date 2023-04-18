import { Module, forwardRef } from '@nestjs/common';

import { SystemModule } from '../system.module';

import { ServeService } from './serve.service';
import { ServeController } from './serve.controller';

const providers = [ServeService];

@Module({
  imports: [forwardRef(() => SystemModule)],
  controllers: [ServeController],
  providers: [...providers],
  exports: [...providers],
})
export class ServeModule {}
