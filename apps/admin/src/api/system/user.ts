import { defHttp } from '/@/utils/http/axios';

export interface UserItem {
  id: number;
  username: string;
  realName: string;
}

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
  // roles: number[]
}

export type UpdateUserParams = Partial<CreateUserParams>;

enum Api {
  Base = '/system/users',
}

export const getUserList = (params?: API.PageParams) =>
  defHttp.get<API.TableListResult<UserItem[]>>({ url: Api.Base, params });

export const getUserInfo = (id: number) => defHttp.get<UserItem>({ url: `${Api.Base}/${id}` });

export const createUser = (params: CreateUserParams) => defHttp.post({ url: Api.Base, params });

export const updateUser = (params: UpdateUserParams) => defHttp.put({ url: Api.Base, params });

export const deleteUser = (params: { ids: number[] }) => defHttp.delete({ url: Api.Base, params });
