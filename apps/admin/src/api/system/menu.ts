import { BasicPaginationResult } from '../model/baseModel';
import { defHttp } from '/@/utils/http/axios';

export interface MenuListItem {
  createTime: string;
  updatedAt: string;
  id: number;
  parent: number;
  name: string;
  path: string;
  permisson: string;
  type: number;
  icon: string;
  orderNo: number;
  component: string;
  keepalive: number;
  external: number;
  show: number;
}

export type MenuListResult = BasicPaginationResult<MenuListItem>;

export interface MenuParams {
  type: number;
  parent: number;
  name: string;
  orderNo: number;
  path: string;
  component: string;
  icon: string;
  permission: string;
  show: number;
  external: number;
  keepalive: number;
}

enum Api {
  Base = '/system/menus',
}

export const getMenuList = () => defHttp.get<MenuListResult>({ url: Api.Base });

export const getMenuInfo = (params: { id: number }) => defHttp.get({ url: Api.Base, params });

export const createMenu = (params: MenuParams) => defHttp.post({ url: Api.Base, params });

export const updateMenu = (id: number, params: Partial<MenuParams>) =>
  defHttp.put({ url: `${Api.Base}/${id}`, params });

export const deleteMenu = (id: number) => defHttp.delete({ url: `${Api.Base}/${id}` });