import { BasicPageParams, BasicPaginationResult } from '../model/baseModel';
import { defHttp } from '/@/utils/http/axios';

export interface SysTaskItem {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  service: string;
  type: number;
  status: number;
  startTime: string;
  endTime: string;
  limit: number;
  cron: string;
  every: number;
  data: string;
  jobOpts: string;
  remark: string;
}
/** 添加任务参数 */
export interface SysTaskAdd {
  name: string;
  service: string;
  type: number;
  status: number;
  startTime: string;
  endTime: string;
  limit: number;
  cron: string;
  every: number;
  data: string;
  remark: string;
}

/** 更新任务参数 */
export type SysTaskUpdate = SysTaskAdd & {
  id: number;
};
/** 获取任务详情返回结果 */
export interface SysTaskInfo {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  service: string;
  type: number;
  status: number;
  startTime: string;
  endTime: string;
  limit: number;
  cron: string;
  every: number;
  data: string;
  jobOpts: string;
  remark: string;
}

enum Api {
  List = '/system/task/page',
  Info = '/system/task/info',
  Add = '/system/task/add',
  Update = '/system/task/update',
  Delete = '/system/task/delete',
  Once = '/system/task/once',
  Start = '/system/task/start',
  Stop = '/sys/task/stop',
}

type CommonParams = {
  id: number;
};

export const getTaskList = (params?: BasicPageParams) =>
  defHttp.get<BasicPaginationResult<SysTaskItem[]>>({ url: Api.List, params });

export const getTaskInfo = (params: CommonParams) =>
  defHttp.get<SysTaskInfo>({ url: Api.Info, params });

export const taskAdd = (params?: SysTaskAdd) => defHttp.post({ url: Api.Add, params });

export const taskUpdate = (params?: SysTaskUpdate) => defHttp.post({ url: Api.Update, params });

export const taskDelete = (params: CommonParams) => defHttp.post({ url: Api.Delete, params });

export const taskOnce = (params: CommonParams) => defHttp.post({ url: Api.Once, params });

export const taskStart = (params: CommonParams) => defHttp.post({ url: Api.Start, params });

export const taskStop = (params: CommonParams) => defHttp.post({ url: Api.Stop, params });
