import { HttpException, HttpStatus } from '@nestjs/common';

import { ErrorEnum } from '../constants/error-code.constant';

/**
 * 业务错误时可抛出该异常
 */
export class ApiException extends HttpException {
  private errorCode: number;

  constructor(error: ErrorEnum | string) {
    if (!error.includes(':')) {
      super(
        HttpException.createBody({
          code: 0,
          message: error,
        }),
        HttpStatus.OK,
      );
      this.errorCode = 0;
      return;
    }

    const [code, message] = error.split(':');
    super(
      HttpException.createBody({
        code,
        message,
      }),
      HttpStatus.OK,
    );

    this.errorCode = Number(code);
  }

  getErrorCode(): number {
    return this.errorCode;
  }
}
