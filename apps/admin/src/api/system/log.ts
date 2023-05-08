import { BasicPaginationResult } from '../model/baseModel';
import { defHttp } from '/@/utils/http/axios';
import qs from 'qs';

// 登录日志
export interface LoginLog {
  id: number;
  ip: string;
  os: string;
  browser: string;
  time: string;
  username: string;
}

// 操作日志
export interface OperationLog {
  createTime: string;
  updateTime: string;
  id: number;
  ip: string;
  userId: number;
  params: string;
  action: string;
  method: string;
  status: number;
  consumeTime: number;
}

// 任务日志
export interface TaskLog {
  id: number;
  taskId: number;
  name: string;
  createdAt: string;
  consumeTime: number;
  detail: string;
  status: number;
}

enum Api {
  LoginLogList = '/system/log/login/list',
  TaskLogList = '/system/log/task/list',
}

export const getLoginLogList = (params) =>
  defHttp.get<BasicPaginationResult<LoginLog>>({
    url: Api.LoginLogList,
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

export const getTaskLogList = (params) =>
  defHttp.get<BasicPaginationResult<TaskLog>>({
    url: Api.TaskLogList,
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });
