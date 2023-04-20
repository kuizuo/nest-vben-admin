import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';

import { ErrorEnum } from '@/constants/error';

import { SocketException } from '@/exceptions/socket.exception';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  checkAdminAuthToken(token: string | string[] | undefined): IAuthUser | never {
    if (isEmpty(token)) {
      throw new SocketException(ErrorEnum.CODE_1101);
    }
    try {
      // 挂载对象到当前请求上
      return this.jwtService.verify(Array.isArray(token) ? token[0] : token);
    } catch (e) {
      // 无法通过token校验
      throw new SocketException(ErrorEnum.CODE_1101);
    }
  }
}
