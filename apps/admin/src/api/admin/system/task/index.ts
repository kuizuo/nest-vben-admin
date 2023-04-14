import { defHttp } from '/@/utils/http/axios';

enum Api {
  List = '/sys/task/page',
  Info = '/sys/task/info',
  Add = '/sys/task/add',
  Update = '/sys/task/update',
  Delete = '/sys/task/delete',
  Once = '/sys/task/once',
  Start = '/sys/task/start',
  Stop = '/sys/task/stop',
}

type CommonParams = {
  id: number;
};

export const getTaskList = (params?: API.PageParams) =>
  defHttp.get<API.TableListResult<API.SysTaskItem[]>>({ url: Api.List, params });

export const getTaskInfo = (params: CommonParams) =>
  defHttp.get<API.SysTaskInfo>({ url: Api.Info, params });

export const taskAdd = (params?: API.SysTaskAdd) =>
  defHttp.post({ url: Api.Add, params }, { successMsg: '添加成功' });

export const taskUpdate = (params?: API.SysTaskUpdate) =>
  defHttp.post({ url: Api.Update, params }, { successMsg: '修改成功' });

export const taskDelete = (params: CommonParams) => defHttp.post({ url: Api.Delete, params });

export const taskOnce = (params: CommonParams) => defHttp.post({ url: Api.Once, params });

export const taskStart = (params: CommonParams) => defHttp.post({ url: Api.Start, params });

export const taskStop = (params: CommonParams) => defHttp.post({ url: Api.Stop, params });
