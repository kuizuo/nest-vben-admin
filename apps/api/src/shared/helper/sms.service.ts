import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'

import { ConfigService } from '@nestjs/config'
import dayjs from 'dayjs'
import Redis from 'ioredis'

// import * as tencentcloud from 'tencentcloud-sdk-nodejs'
// import { Client } from 'tencentcloud-sdk-nodejs/tencentcloud/services/sms/v20210111/sms_client'

import { BusinessException } from '~/common/exceptions/biz.exception'
import { ErrorEnum } from '~/constants/error-code.constant'
import { randomValue } from '~/utils'

// const SmsClient = tencentcloud.sms.v20210111.Client
const SmsClient = class {
  constructor(clientConfig) {}
}

enum TemplateEnum {
  Login = '896643',
//   Register = '896643',
//   ResetPassword = '896643',
}

@Injectable()
export class SmsService {
  private client: any // Client

  constructor(@InjectRedis() private redis: Redis, private configService: ConfigService) {
    const clientConfig = {
      credential: {
        secretId: this.configService.get('sms.secretId'),
        secretKey: this.configService.get('sms.secretKey'),
      },
      region: this.configService.get('sms.region'),
      profile: {
        httpProfile: {
          endpoint: 'sms.tencentcloudapi.com',
        },
      },
    }

    const client = new SmsClient(clientConfig)
    this.client = client
  }

  async sendCode(phone: string, code = randomValue(4, '1234567890')) {
    console.log(`phone=${phone}, code=${code}`)

    try {
      const result = await this.client.SendSms({
        PhoneNumberSet: [phone],
        SmsSdkAppId: this.configService.get('sms.appid'),
        SignName: this.configService.get('sms.sign'),
        TemplateId: TemplateEnum.Login,
        TemplateParamSet: [code, '5'],
      })
      if (result?.SendStatusSet?.[0].Code !== 'Ok') {
        console.log(result)
        throw new BusinessException(ErrorEnum.VERIFICATION_CODE_SEND_FAILED)
      }
    }
    catch (error) {
      console.log(error)
      throw new BusinessException(ErrorEnum.VERIFICATION_CODE_SEND_FAILED)
    }

    return {
      to: phone,
      code,
    }
  }

  async checkCode(to, code) {
    const ret = await this.redis.get(`captcha:${to}`)
    if (ret !== code)
      throw new BusinessException(ErrorEnum.INVALID_VERIFICATION_CODE)
    await this.redis.del(`captcha:${to}`)
  }

  async checkLimit(to, ip) {
    const LIMIT_TIME = 5

    // ip限制
    const ipLimit = await this.redis.get(`ip:${ip}:send:limit`)
    if (ipLimit)
      throw new BusinessException(ErrorEnum.TOO_MANY_REQUESTS)

    // 1分钟最多接收1条
    const limit = await this.redis.get(`captcha:${to}:limit`)
    if (limit)
      throw new BusinessException(ErrorEnum.TOO_MANY_REQUESTS)

    // 1天一个邮箱最多接收5条
    let limitCountOfDay: string | number = await this.redis.get(
      `captcha:${to}:limit-day`,
    )
    limitCountOfDay = limitCountOfDay ? Number(limitCountOfDay) : 0
    if (limitCountOfDay > LIMIT_TIME)
      throw new BusinessException(ErrorEnum.MAXIMUM_FIVE_VERIFICATION_CODES_PER_DAY)

    // 1天一个ip最多发送5条
    let ipLimitCountOfDay: string | number = await this.redis.get(
      `ip:${ip}:send:limit-day`,
    )
    ipLimitCountOfDay = ipLimitCountOfDay ? Number(ipLimitCountOfDay) : 0
    if (ipLimitCountOfDay > LIMIT_TIME)
      throw new BusinessException(ErrorEnum.MAXIMUM_FIVE_VERIFICATION_CODES_PER_DAY)
  }

  async saveRecord(to: string, code: string, ip: string) {
    const getRemainTime = () => {
      const now = dayjs()
      return now.endOf('day').diff(now, 'second')
    }

    await this.redis.set(`captcha:${to}`, code, 'EX', 60 * 5)

    const limitCountOfDay = await this.redis.get(`captcha:${to}:limit-day`)
    const ipLimitCountOfDay = await this.redis.get(`ip:${ip}:send:limit-day`)

    await this.redis.set(`ip:${ip}:send:limit`, 1, 'EX', 60)
    await this.redis.set(`captcha:${to}:limit`, 1, 'EX', 60)
    await this.redis.set(
      `captcha:${to}:send:limit-count-day`,
      limitCountOfDay,
      'EX',
      getRemainTime(),
    )
    await this.redis.set(
      `ip:${ip}:send:limit-count-day`,
      ipLimitCountOfDay,
      'EX',
      getRemainTime(),
    )
  }
}
