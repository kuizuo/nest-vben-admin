import { ApiProperty } from '@nestjs/swagger';
import { IBaseResponse, IPageRespData } from '@/interfaces/response';
import {
  RESPONSE_SUCCESS_CODE,
  RESPONSE_SUCCESS_MSG,
} from './constants/response';

export class BaseResponse<T = any> implements IBaseResponse<T> {
  @ApiProperty({ type: 'object' })
  data?: T;

  @ApiProperty({ type: 'number', default: RESPONSE_SUCCESS_CODE })
  code: number;

  @ApiProperty({ type: 'string', default: RESPONSE_SUCCESS_MSG })
  msg: string;

  constructor(code: number, data: T, msg = 'success') {
    this.code = code;
    this.data = data;
    this.msg = msg;
  }
}

export class PageRespData<T = any> implements IPageRespData<T> {
  @ApiProperty({ type: 'array' })
  items: T[];

  @ApiProperty({ default: 0 })
  total: number;
}
