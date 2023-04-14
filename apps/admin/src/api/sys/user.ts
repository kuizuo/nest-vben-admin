import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  LoginResultModel,
  GetUserInfoModel,
  UpdateUserInfoParams,
  RegisterParams,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/login',
  Register = '/register',
  SendCode = '/sendCode',
  Logout = '/account/logout',
  GetUserInfo = '/account/info',
  UpdateUserInfo = '/account/update',
  GetPermCode = '/account/perm',
  Password = '/account/password',
}

export const loginApi = (params: LoginParams, mode: ErrorMessageMode = 'modal') =>
  defHttp.post<LoginResultModel>({ url: Api.Login, params }, { errorMessageMode: mode });

export const registerApi = (params: RegisterParams, mode: ErrorMessageMode = 'modal') =>
  defHttp.post({ url: Api.Register, params }, { successMsg: '注册成功', errorMessageMode: mode });

export const sendCodeApi = (params: { email: string }) =>
  defHttp.post({ url: Api.SendCode, params: params }, { successMsg: '发送成功' });

export const doLogout = () => defHttp.get({ url: Api.Logout });

export const getUserInfoApi = () =>
  defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });

export const updateUserInfoApi = (params: UpdateUserInfoParams) =>
  defHttp.post(
    { url: Api.UpdateUserInfo, params },
    { errorMessageMode: 'none', successMsg: '更新成功' },
  );

export const getPermCode = () => defHttp.get<string[]>({ url: Api.GetPermCode });

export const changePasswordApi = (params: { oldPassword: string; newPassword: string }) =>
  defHttp.post({ url: Api.Password, params });
