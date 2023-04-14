import { defHttp } from '/@/utils/http/axios';

enum Api {
  List = '/sys/role/list',
  Page = '/sys/role/page',
  Info = '/sys/role/info',
  Add = '/sys/role/add',
  Update = '/sys/role/update',
  UpdateStatus = '/sys/role/updateStatus',
  Delete = '/sys/role/delete',
}

export const getAllRoleList = (params?: API.PageParams) =>
  defHttp.get<API.RoleListResult>({ url: Api.List, params });

export const getRoleListByPage = (params?: API.PageParams) =>
  defHttp.get<API.TableListResult<API.RoleListResult>>({ url: Api.Page, params });

export const getRoleInfo = (params: { id: number }) =>
  defHttp.get<API.RoleInfoResult>({ url: Api.Info, params });

export const createRole = (params: API.CreateRole) =>
  defHttp.post({ url: Api.Add, params }, { successMsg: '创建成功' });

export const updateRole = (params: API.UpdateRole) =>
  defHttp.post({ url: Api.Update, params }, { successMsg: '更新成功' });

export const deleteRole = (params: { ids: number[] }) =>
  defHttp.post({ url: Api.Delete, params }, { successMsg: '删除成功' });
