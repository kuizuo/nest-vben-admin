import { WsException } from '@nestjs/websockets';
import { ErrorEnum } from '../constants/error';

export class SocketException extends WsException {
  private errorCode: number;

  constructor(err: ErrorEnum) {
    super(`${err}`);
    // CODE_500 str parse to 500 number
    this.errorCode = Number(
      Object.entries(ErrorEnum)
        .find(([_, val]) => val === err)[0]
        .replace('CODE_', ''),
    );
  }

  getErrorCode(): number {
    return this.errorCode;
  }
}
