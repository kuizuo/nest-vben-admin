import { Injectable } from '@nestjs/common';
import { isEmpty } from 'lodash';
import { AppConfigService } from './app-config.service';
import { MD5 } from '/@/utils/crypto';

@Injectable()
export class AppGeneralService {
  constructor(private configService: AppConfigService) {}

  /**
   * @description 根据用户ID判断是否为超级管理员
   */
  isRootUser(uid: number): boolean {
    return uid === this.configService.appConfig.rootUserId;
  }

  /**
   * @description 生成管理员密码，密码格式为用户密码+盐值后取MD5
   */
  generateUserPassword(pwd?: string): string {
    if (isEmpty(pwd)) {
      pwd = this.configService.appConfig.userDefaultPwd;
    }

    return MD5(`${pwd}${this.configService.appConfig.userPwdSalt}`);
  }
}
