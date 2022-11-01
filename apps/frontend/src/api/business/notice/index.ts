import { defHttp } from '/@/utils/http/axios';
import qs from 'qs';

enum Api {
  List = '/notice/list',
  FindAll = '/notice/findAll',
  Add = '/notice/add',
  Update = '/notice/update',
  Delete = '/notice/delete',
}

export const getNoticeList = (params?: API.PageParams) =>
  defHttp.get<API.TableListResult<API.NoticeListPageResult>>({
    url: Api.List,
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

export const findAllNotice = (params?: API.PageParams) =>
  defHttp.get<API.TableListResult<API.NoticeListPageResult>>({
    url: Api.FindAll,
    params,
  });

export const createNotice = (params: API.CreateNoticeParams) =>
  defHttp.post({ url: Api.Add, params }, { successMsg: '创建成功' });

export const updateNotice = (params: API.UpdateNoticeParams) =>
  defHttp.post({ url: Api.Update, params }, { successMsg: '更新成功' });

export const deleteNotice = (params: { ids: number[] }) =>
  defHttp.post({ url: Api.Delete, params }, { successMsg: '删除成功' });
