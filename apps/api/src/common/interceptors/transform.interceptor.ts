import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { ResOp } from '~/common/model/response.model'

import { SKIP_TRANSFORM_DECORATOR_KEY } from '../decorators/skip-transform.decorator'

/**
 * 统一处理返回接口结果，如果不需要则添加 @SkipTransform 装饰器
 */
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const isSkipTransform = this.reflector.get<boolean>(
      SKIP_TRANSFORM_DECORATOR_KEY,
      context.getHandler(),
    )
    if (isSkipTransform)
      return next.handle()

    return next.handle().pipe(
      map((data) => {
        // if (typeof data === 'undefined') {
        //   context.switchToHttp().getResponse().status(HttpStatus.NO_CONTENT);
        //   return data;
        // }

        return new ResOp(HttpStatus.OK, data ?? null)
      }),
    )
  }
}
