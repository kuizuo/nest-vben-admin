import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'

@Injectable()
export class IpService {
  constructor(private readonly http: HttpService) {}

  async getAddress(ip: string) {
    const { data } = await this.http.axiosRef.get(
      `https://api.kuizuo.cn/api/ip-location?ip=${ip}&type=json`,
    )
    return data.addr
  }
}
