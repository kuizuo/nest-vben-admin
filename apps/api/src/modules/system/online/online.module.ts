import { Module, forwardRef } from '@nestjs/common'

import { UserModule } from '../../user/user.module'
import { RoleModule } from '../role/role.module'
import { SystemModule } from '../system.module'

import { OnlineController } from './online.controller'
import { OnlineService } from './online.service'
import { SocketModule } from '@/modules/socket/socket.module'
import { AuthModule } from '@/modules/auth/auth.module'

const providers = [OnlineService]

@Module({
  imports: [
    forwardRef(() => SystemModule),
    forwardRef(() => SocketModule),
    AuthModule,
    UserModule,
    RoleModule,
  ],
  controllers: [OnlineController],
  providers: [...providers],
  exports: [...providers],
})
export class OnlineModule {}
