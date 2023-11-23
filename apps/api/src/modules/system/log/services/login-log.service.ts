import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Between, LessThan, Like, Repository } from 'typeorm'

import UAParser from 'ua-parser-js'

import { LoginLogQueryDto } from '../dto/log.dto'
import { LoginLogEntity } from '../entities/login-log.entity'
import { LoginLogInfo } from '../models/log.model'
import { IpService } from '@/shared/ip/ip.service'
import { paginateRaw } from '@/helper/paginate'

async function parseLoginLog(e: any, parser: UAParser): Promise<LoginLogInfo> {
  const uaResult = parser.setUA(e.login_log_ua).getResult()

  return {
    id: e.login_log_id,
    ip: e.login_log_ip,
    address: e.login_log_address,
    os: `${`${uaResult.os.name ?? ''} `}${uaResult.os.version}`,
    browser: `${`${uaResult.browser.name ?? ''} `}${uaResult.browser.version}`,
    time: e.login_log_created_at,
    username: e.user_username,
  }
}

@Injectable()
export class LoginLogService {
  constructor(
    @InjectRepository(LoginLogEntity)
    private loginLogRepository: Repository<LoginLogEntity>,

    private ipService: IpService,
  ) {}

  async create(uid: number, ip: string, ua: string): Promise<void> {
    try {
      const address = await this.ipService.getAddress(ip)

      await this.loginLogRepository.save({
        ip,
        ua,
        address,
        user: { id: uid },
      })
    }
    catch (e) {
      console.error(e)
    }
  }

  async list({
    page,
    pageSize,
    username,
    ip,
    address,
    time,
  }: LoginLogQueryDto) {
    const queryBuilder = await this.loginLogRepository
      .createQueryBuilder('login_log')
      .innerJoinAndSelect('login_log.user', 'user')
      .where({
        ...(ip && { ip: Like(`%${ip}%`) }),
        ...(address && { address: Like(`%${address}%`) }),
        ...(time && { createdAt: Between(time[0], time[1]) }),
        ...(username && {
          user: {
            username: Like(`%${username}%`),
          },
        }),
      })
      .orderBy('login_log.created_at', 'DESC')

    const { items, ...rest } = await paginateRaw<LoginLogEntity>(queryBuilder, {
      page,
      pageSize,
    })

    const parser = new UAParser()
    const loginLogInfos = await Promise.all(
      items.map(item => parseLoginLog(item, parser)),
    )

    return {
      items: loginLogInfos,
      ...rest,
    }
  }

  async clearLog(): Promise<void> {
    await this.loginLogRepository.clear()
  }

  async clearLogBeforeTime(time: Date): Promise<void> {
    await this.loginLogRepository.delete({ createdAt: LessThan(time) })
  }
}
