import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

enum Api {
  GetMenuList = '/account/menu',
}

export const getMenuList = () => defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
