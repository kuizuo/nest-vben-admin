declare namespace API {
  type MenuListResultItem = {
    createTime: string;
    updatedAt: string;
    id: number;
    parent: number;
    name: string;
    path: string;
    permisson: string;
    type: number;
    icon: string;
    orderNo: number;
    component: string;
    keepalive: number;
    external: number;
    show: number;
  };

  /** 获取菜单列表参数 */
  type MenuListResult = MenuListResultItem[];

  /** 新增菜单参数 */
  type MenuAddParams = {
    type: number;
    parent: number;
    name: string;
    orderNo: number;
    path: string;
    component: string;
    icon: string;
    permission: string;
    show: number;
    external: number;
    keepalive: number;
  };

  /** 更新某项菜单参数 */
  type MenuUpdateParams = MenuAddParams & {
    id: number;
  };

  /** 获取菜单详情结果 */
  type MenuInfoResult = {
    menu: {
      createTime: string;
      updateTime: string;
      id: number;
      parent: number;
      name: string;
      path: string;
      permission: string;
      type: number;
      icon: string;
      orderNo: number;
      component: string;
      keepalive: number;
      external: number;
      show: number;
    };
    parentMenu: {
      createTime: string;
      updateTime: string;
      id: number;
      parent: number;
      name: string;
      path: string;
      permission: string;
      type: number;
      icon: string;
      orderNo: number;
      component: string;
      keepalive: number;
      show: number;
    };
  };
}
