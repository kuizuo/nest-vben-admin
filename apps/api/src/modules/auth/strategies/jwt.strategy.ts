import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AuthStrategy } from '../constant'
import { ISecurityConfig, SecurityConfig } from '@/config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategy.JWT) {
  constructor(
    @Inject(SecurityConfig.KEY) private securityConfig: ISecurityConfig,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: securityConfig.jwtSecret,
    })
  }

  async validate(payload: IAuthUser) {
    return payload
  }
}
