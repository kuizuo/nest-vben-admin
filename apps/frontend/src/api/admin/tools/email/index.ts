import { defHttp } from '/@/utils/http/axios';

enum Api {
  EmailConfig = '/tools/email/config',
  Send = '/tools/email/send',
}

export const getEmailConfig = () => defHttp.get({ url: Api.EmailConfig });

export const saveEmailConfig = (params) => defHttp.post({ url: Api.EmailConfig, params });

export const sendEmail = (params) =>
  defHttp.post({ url: Api.Send, params }, { successMsg: '发送成功' });
