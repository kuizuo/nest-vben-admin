import { BasicPageParams, BasicPaginationResult } from '../model/baseModel';
import { defHttp } from '/@/utils/http/axios';

export interface UserListItem {
  id: number;
  username: string;
  realName: string;
}

export type UserListResult = BasicPaginationResult<UserListItem>;

export interface UserInfo {
  id: number;
}

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  // roles: number[]
}

export type UpdateUserParams = Partial<CreateUserParams>;

export interface UpdateUserPassword {
  id: number;
  password: string;
}

enum Api {
  Base = '/system/users',
}

export const getUserList = (params?: BasicPageParams<UserListItem>) =>
  defHttp.get<UserListResult>({ url: Api.Base, params });

export const getUserInfo = (id: number) => defHttp.get<UserInfo>({ url: `${Api.Base}/${id}` });

export const createUser = (params: CreateUserParams) => defHttp.post({ url: Api.Base, params });

export const updateUser = (params: UpdateUserParams) => defHttp.put({ url: Api.Base, params });

export const deleteUser = (params: { ids: number[] }) => defHttp.delete({ url: Api.Base, params });

export const updateUserPassword = (params: UpdateUserPassword) =>
  defHttp.post({ url: Api.Base, params });
