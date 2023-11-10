import { SetMetadata } from '@nestjs/common'

export const API_TOKEN_DECORATOR_KEY = 'decorator:api_token'

/**
 * 需要协议头携带 Authorization 协议头才可以操作
 */
export const ApiToken = () => SetMetadata(API_TOKEN_DECORATOR_KEY, true)
