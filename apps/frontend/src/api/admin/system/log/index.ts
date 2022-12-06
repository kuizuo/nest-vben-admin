import { defHttp } from '/@/utils/http/axios';
import qs from 'qs';

enum Api {
  LoginLogList = '/sys/log/login/page',
  TaskLogList = '/sys/log/task/page',
}

export const getLoginLogList = (params) =>
  defHttp.get<API.TableListResult<API.LoginLogList>>({
    url: Api.LoginLogList,
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });

export const getTaskLogList = (params) =>
  defHttp.get<API.TableListResult<API.TaskLogList>>({
    url: Api.TaskLogList,
    params,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  });
