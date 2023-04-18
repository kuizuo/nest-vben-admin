import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { MD5 } from '/@/utils/crypto';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from '@/config';

@Injectable()
export class AppGeneralService {
  constructor(private configService: ConfigService) {}

  /**
   * @description 根据用户ID判断是否为超级管理员
   */
  isRootUser(uid: number): boolean {
    return uid === this.configService.get<IAppConfig>('app').rootRoleId;
  }

  /**
   * @description 生成管理员密码，密码格式为用户密码+盐值后取MD5
   */
  generateUserPassword(pwd?: string): string {
    if (isEmpty(pwd)) {
      pwd = this.configService.get<IAppConfig>('app').userDefaultPwd;
    }

    return MD5(
      `${pwd}${this.configService.get<IAppConfig>('app').userPwdSalt}`,
    );
  }
}
