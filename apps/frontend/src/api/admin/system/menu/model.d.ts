declare namespace API {
  type MenuItem = {
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

  type MenuList = MenuItem[];

  type MenuAdd = {
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

  type MenuUpdate = MenuAdd & {
    id: number;
  };

  type MenuInfo = {
    menu: MenuItem;
    parentMenu: MenuItem;
  };
}
