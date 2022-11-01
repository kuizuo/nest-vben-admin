import { defHttp } from '/@/utils/http/axios';
import qs from 'qs';

enum Api {
  Page = '/sys/param-config/page',
  Info = '/sys/param-config/info',
  Add = '/sys/param-config/add',
  Update = '/sys/param-config/update',
  Delete = '/sys/param-config/delete',
}

export const getParamConfigList = (params) =>
  defHttp.get<API.TableListResult<API.ParamConfigListResult>>({
    url: Api.Page,
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

export const infoParamConfig = (params: { id: number }) =>
  defHttp.post({ url: Api.Info, params }, { successMsg: '获取成功' });

export const createParamConfig = (params: API.CreateParamConfigParams) =>
  defHttp.post({ url: Api.Add, params }, { successMsg: '创建成功' });

export const updateParamConfig = (params: API.UpdateParamConfigParams) =>
  defHttp.post({ url: Api.Update, params }, { successMsg: '更新成功' });

export const deleteParamConfig = (params: { ids: number[] }) =>
  defHttp.post({ url: Api.Delete, params }, { successMsg: '删除成功' });
