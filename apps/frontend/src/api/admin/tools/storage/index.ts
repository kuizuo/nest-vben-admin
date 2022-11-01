import { defHttp } from '/@/utils/http/axios';
import qs from 'qs';

enum Api {
  List = '/tools/storage/list',
  Delete = '/tools/storage/delete',
}

export const getStorageList = (params?: API.PageParams) =>
  defHttp.get<API.TableListResult<API.StorageListPageResult>>({
    url: Api.List,
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

export const deleteStorage = (params: { ids: number[] }) =>
  defHttp.post({ url: Api.Delete, params }, { successMsg: '删除成功' });
