import { defHttp } from '/@/utils/http/axios';
import qs from 'qs';

enum Api {
  List = '/tools/storage/list',
  Delete = '/tools/storage/delete',
}

export const getStorageListByPage = (params?: API.PageParams) =>
  defHttp.get<API.TableListResult<API.StorageList>>({
    url: Api.List,
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

export const deleteStorage = (params: { ids: number[] }) =>
  defHttp.post({ url: Api.Delete, params }, { successMsg: '删除成功' });
