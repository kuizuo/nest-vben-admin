import { defHttp } from '/@/utils/http/axios';

enum Api {
  List = '/sys/online/list',
  Kick = '/sys/online/kick',
}

export const getOnlineList = () =>
  defHttp.get<API.TableListResult<API.OnlineUserListResult>>({ url: Api.List });

export const kickUser = (data: { id: number }) =>
  defHttp.post({ url: Api.Kick, data }, { successMsg: '下线成功' });
