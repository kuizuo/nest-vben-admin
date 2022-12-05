import { defHttp } from '/@/utils/http/axios';

enum Api {
  List = '/sys/dept/list',
  Info = '/sys/dept/info',
  Add = '/sys/dept/add',
  Update = '/sys/dept/update',
  Delete = '/sys/dept/delete',
}

export const getAllDeptList = (params?: API.PageParams) =>
  defHttp.get<API.DeptListResult>({ url: Api.List, params });

export const getDeptList = (params?) => defHttp.get<API.DeptListResult>({ url: Api.List, params });

export const getDeptInfo = (params: { id: number }) =>
  defHttp.get<API.DeptInfoResult>({ url: Api.Info, params });

export const addDept = (params: API.DeptAddParams) =>
  defHttp.post({ url: Api.Add, params }, { successMsg: '创建成功' });

export const updateDept = (params: API.DeptUpdateParams) =>
  defHttp.post({ url: Api.Update, params }, { successMsg: '更新成功' });

export const deleteDept = (params: { id: number }) =>
  defHttp.post({ url: Api.Delete, params }, { successMsg: '删除成功' });
