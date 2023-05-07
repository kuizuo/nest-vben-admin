import { BasicPageParams, BasicPaginationResult } from '../model/baseModel';
import { defHttp } from '/@/utils/http/axios';

export interface Role {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  value: string;
  remark: string;
}

export type RoleListResult = BasicPaginationResult<Role>;

/** 新增角色 */
export interface RoleParam {
  name: string;
  value: string;
  remark: string;
  menus: string[];
}

/** 角色详情 */
export interface RoleInfoResult {
  createTime: string;
  updateTime: string;
  id: number;
  name: string;
  value: string;
  remark: string;
  menus: number[];
}

enum Api {
  Base = '/system/roles',
}

export const getRoleList = (params?: BasicPageParams) =>
  defHttp.get<RoleListResult>({ url: Api.Base, params });

export const getRoleInfo = (params: { id: number }) =>
  defHttp.get<RoleInfoResult>({ url: Api.Base, params });

export const createRole = (params: RoleParam) => defHttp.post({ url: Api.Base, params });

export const updateRole = (id: number, params: RoleParam) =>
  defHttp.post({ url: `${Api.Base}/${id}`, params });

export const deleteRole = (id: number) => defHttp.post({ url: `${Api.Base}/${id}` });
