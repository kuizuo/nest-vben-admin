import { defHttp } from '/@/utils/http/axios';
import qs from 'qs';

enum Api {
  Page = '/notice/page',
  List = '/notice/list',
  Add = '/notice/add',
  Update = '/notice/update',
  Delete = '/notice/delete',
}

export const getNoticeList = (params?: API.PageParams) =>
  defHttp.get<API.NoticeList>({
    url: Api.List,
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

export const getNoticeListByPage = (params?: API.PageParams) =>
  defHttp.get<API.TableListResult<API.NoticeList>>({
    url: Api.Page,
    params,
  });

export const createNotice = (params: API.CreateNotice) =>
  defHttp.post({ url: Api.Add, params }, { successMsg: '创建成功' });

export const updateNotice = (params: API.UpdateNotice) =>
  defHttp.post({ url: Api.Update, params }, { successMsg: '更新成功' });

export const deleteNotice = (params: { ids: number[] }) =>
  defHttp.post({ url: Api.Delete, params }, { successMsg: '删除成功' });
