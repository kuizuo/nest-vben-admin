export interface IBaseResponse<T = any> {
  msg: string;
  code: number;
  data?: T;
}

export interface IListRespData<T = any> {
  items: T[];
}

export interface IPaginationInfo {
  page: number;
  pageSize: number;
  total: number;
}

export interface IPageRespData<T = any> extends IListRespData<T> {
  total: number;
}
// export interface IPageRespData<T = any> extends IListRespData<T> {
//   pagination: IPaginationInfo;
// }
