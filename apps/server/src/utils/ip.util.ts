/**
 * @module utils/ip
 * @description IP utility functions
 */
import type { IncomingMessage } from 'node:http'

import axios from 'axios'
import type { FastifyRequest } from 'fastify'

export function getIp(request: FastifyRequest | IncomingMessage) {
  const req = request as any

  let ip: string
    = request.headers['x-forwarded-for']
    || request.headers['X-Forwarded-For']
    || request.headers['X-Real-IP']
    || request.headers['x-real-ip']
    || req?.ip
    || req?.raw?.connection?.remoteAddress
    || req?.raw?.socket?.remoteAddress
    || undefined
  if (ip && ip.split(',').length > 0)
    ip = ip.split(',')[0]

  return ip
}

export async function getIpAddress(ip: string) {
  const { data } = await axios.get(
    `https://api.kuizuo.cn/api/ip-location?ip=${ip}&type=json`,
  )
  return data.addr
}
