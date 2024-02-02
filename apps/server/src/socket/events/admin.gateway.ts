import { JwtService } from '@nestjs/jwt'
import {
  GatewayMetadata,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'

import { Server } from 'socket.io'

import { AuthService } from '@server/modules/auth/auth.service'
import { CacheService } from '@server/shared/redis/cache.service'

import { createAuthGateway } from '../shared/auth.gateway'

const AuthGateway = createAuthGateway({ namespace: 'admin' })

@WebSocketGateway<GatewayMetadata>({ namespace: 'admin' })
export class AdminEventsGateway
  extends AuthGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    protected readonly jwtService: JwtService,
    protected readonly authService: AuthService,
    private readonly cacheService: CacheService,
  ) {
    super(jwtService, authService, cacheService)
  }

  @WebSocketServer()
  protected _server: Server

  get server() {
    return this._server
  }
}
