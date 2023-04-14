import { defHttp } from '/@/utils/http/axios';

enum Api {
  List = '/sys/user/list',
  Page = '/sys/user/page',
  Info = '/sys/user/info',
  Add = '/sys/user/add',
  Update = '/sys/user/update',
  UpdateStatus = '/sys/user/updateStatus',
  Delete = '/sys/user/delete',
  IsAccountExist = '/account/exist',
  UpdatePassword = '/sys/user/password',
}

export const getUserList = (params?: API.PageParams) =>
  defHttp.get<API.UserList>({ url: Api.List, params });

export const getUserListByPage = (params?: API.PageParams) =>
  defHttp.get<API.TableListResult<API.UserList>>({ url: Api.Page, params });

export const getUserInfo = (params: { id: number }) =>
  defHttp.get<API.UserInfo>({ url: Api.Info, params });

export const createUser = (params: API.CreateUser) =>
  defHttp.post({ url: Api.Add, params }, { successMsg: '创建成功' });

export const updateUser = (params: API.UpdateUser) =>
  defHttp.post({ url: Api.Update, params }, { successMsg: '更新成功' });

export const deleteUser = (params: { ids: number[] }) =>
  defHttp.post({ url: Api.Delete, params }, { successMsg: '删除成功' });

export const updateUserPassword = (params: API.UpdateUserPassword) =>
  defHttp.post({ url: Api.UpdatePassword, params }, { successMsg: '修改成功' });

export const isAccountExist = (username: string) =>
  defHttp.get({ url: Api.IsAccountExist, params: { username } }, { errorMessageMode: 'none' });
