export class ResOp {
  readonly data: any;
  readonly code: number;
  readonly message: string;

  constructor(code: number, data?: any, message = 'success') {
    this.code = code;
    this.data = data;
    this.message = message;
  }

  static success(data?: any) {
    return new ResOp(200, data);
  }

  static error(code: number, message) {
    return new ResOp(code, {}, message);
  }
}

export class PageResult<T> {
  items?: Array<T>;
  total: number;
}
