import { defHttp } from '/@/utils/http/axios';

enum Api {
  List = '/sys/menu/list',
  Info = '/sys/menu/info',
  Add = '/sys/menu/add',
  Update = '/sys/menu/update',
  Delete = '/sys/menu/delete',
}

export const getMenuList = () => defHttp.get<API.MenuList>({ url: Api.List });

export const getMenuInfo = (params: { id: number }) =>
  defHttp.get<API.MenuInfo>({ url: Api.Info, params });

export const addMenu = (params: API.MenuAdd) =>
  defHttp.post({ url: Api.Add, params }, { successMsg: '创建成功' });

export const updateMenu = (params: API.MenuUpdate) =>
  defHttp.post({ url: Api.Update, params }, { successMsg: '更新成功' });

export const deleteMenu = (params: { id: number }) =>
  defHttp.post({ url: Api.Delete, params }, { successMsg: '删除成功' });
