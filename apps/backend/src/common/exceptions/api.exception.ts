import { HttpException } from '@nestjs/common';
import { ErrorCodeMap } from '../contants/error-code.contants';

/**
 * Api业务异常均抛出该异常
 */
export class ApiException extends HttpException {
  /**
   * 业务类型错误代码，非Http code
   */
  constructor(private errorCode: number, private errorMessage?: string) {
    super(errorMessage ?? ErrorCodeMap[errorCode], 200);
  }

  getErrorCode(): number {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
