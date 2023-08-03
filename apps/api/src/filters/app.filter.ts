import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { ErrorEnum } from '@/constants/error-code.constant';
import { ApiException } from '@/exceptions/api.exception';
import { isDev } from '@/global/env';

@Catch()
export class AppFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppFilter.name);

  constructor() {
    this.registerCatchAllExceptionsHook();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    // 响应结果码判断
    const httpStatus: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const apiErrorCode: number =
      exception instanceof ApiException ? exception.getErrorCode() : httpStatus;

    let errorMessage: string =
      exception instanceof HttpException ? exception.message : `${exception}`;

    // 系统内部错误时，在生产模式下隐藏具体异常消息
    if (!isDev && httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      errorMessage = ErrorEnum.SERVER_ERROR?.split(':')[1];
    }

    // 返回基础响应结果
    const resBody: IBaseResponse = {
      code: apiErrorCode,
      message: errorMessage,
      data: null,
    };

    response.status(httpStatus).send(resBody);
  }

  registerCatchAllExceptionsHook() {
    process.on('unhandledRejection', (reason: any) => {
      console.error('unhandledRejection: ', reason);
    });

    process.on('uncaughtException', (err) => {
      console.error('uncaughtException: ', err);
    });
  }
}
