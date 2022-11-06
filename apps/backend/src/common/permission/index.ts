import { isExternal } from '@/utils/is';

function createRoute(menu, isRoot) {
  if (isExternal(menu.path)) {
    return {
      id: menu.id,
      path: menu.path,
      component: 'IFrame',
      name: menu.name,
      meta: { title: menu.name, icon: menu.icon },
    };
  }

  // 目录
  if (menu.type === 0) {
    return {
      id: menu.id,
      path: menu.path,
      component: menu.component,
      show: true,
      name: menu.name,
      meta: { title: menu.name, icon: menu.icon },
    };
  }

  return {
    id: menu.id,
    path: menu.path,
    name: menu.name,
    component: menu.component,
    meta: {
      title: menu.name,
      icon: menu.icon,
      ...(!menu.show ? { hideMenu: !menu.show } : null),
      ignoreKeepAlive: !menu.keepalive,
    },
  };
}

function filterAsyncRoutes(menus, parentRoute) {
  const res = [];

  menus.forEach((menu) => {
    if (menu.type === 2 || !menu.status) {
      // 如果是权限或禁用直接跳过
      return;
    }
    // 根级别菜单渲染
    let realRoute;
    if (!parentRoute && !menu.parent && menu.type === 1) {
      // 根菜单
      realRoute = createRoute(menu, true);
    } else if (!parentRoute && !menu.parent && menu.type === 0) {
      // 目录
      const childRoutes = filterAsyncRoutes(menus, menu);
      realRoute = createRoute(menu, true);
      if (childRoutes && childRoutes.length > 0) {
        realRoute.redirect = childRoutes[0].path;
        realRoute.children = childRoutes;
      }
    } else if (parentRoute && parentRoute.id === menu.parent && menu.type === 1) {
      // 子菜单
      realRoute = createRoute(menu, false);
    } else if (parentRoute && parentRoute.id === menu.parent && menu.type === 0) {
      // 如果还是目录，继续递归
      const childRoute = filterAsyncRoutes(menus, menu);
      realRoute = createRoute(menu, false);
      if (childRoute && childRoute.length > 0) {
        realRoute.redirect = childRoute[0].path;
        realRoute.children = childRoute;
      }
    }
    // add curent route
    if (realRoute) {
      res.push(realRoute);
    }
  });
  return res;
}

export function generatorRouters(menu) {
  return filterAsyncRoutes(menu, null);
}

// 获取所有菜单以及权限
function filterMenuToTable(menus, parentMenu) {
  const res = [];
  menus.forEach((menu) => {
    // 根级别菜单渲染
    let realMenu;
    if (!parentMenu && !menu.parent && menu.type === 1) {
      // 根菜单，查找该跟菜单下子菜单，因为可能会包含权限
      const childMenu = filterMenuToTable(menus, menu);
      realMenu = { ...menu };
      realMenu.children = childMenu;
    } else if (!parentMenu && !menu.parent && menu.type === 0) {
      // 根目录
      const childMenu = filterMenuToTable(menus, menu);
      realMenu = { ...menu };
      realMenu.children = childMenu;
    } else if (parentMenu && parentMenu.id === menu.parent && menu.type === 1) {
      // 子菜单下继续找是否有子菜单
      const childMenu = filterMenuToTable(menus, menu);
      realMenu = { ...menu };
      realMenu.children = childMenu;
    } else if (parentMenu && parentMenu.id === menu.parent && menu.type === 0) {
      // 如果还是目录，继续递归
      const childMenu = filterMenuToTable(menus, menu);
      realMenu = { ...menu };
      realMenu.children = childMenu;
    } else if (parentMenu && parentMenu.id === menu.parent && menu.type === 2) {
      realMenu = { ...menu };
    }
    // add curent route
    if (realMenu) {
      realMenu.pid = menu.id;
      res.push(realMenu);
    }
  });
  return res;
}

export function generatorMenu(menu) {
  return filterMenuToTable(menu, null);
}

// 仅获取所有菜单不包括权限
function filterMenuToTree(menus, parentMenu) {
  const res = [];
  menus.forEach((menu) => {
    // 根级别菜单渲染
    let realMenu;
    if (!parentMenu && !menu.parent && menu.type === 1) {
      // 根菜单，查找该跟菜单下子菜单，因为可能会包含权限
      const childMenu = filterMenuToTree(menus, menu);
      realMenu = { ...menu };
      realMenu.children = childMenu;
    } else if (!parentMenu && !menu.parent && menu.type === 0) {
      // 根目录
      const childMenu = filterMenuToTree(menus, menu);
      realMenu = { ...menu };
      realMenu.children = childMenu;
    } else if (parentMenu && parentMenu.id === menu.parent && menu.type === 1) {
      // 子菜单下继续找是否有子菜单
      const childMenu = filterMenuToTree(menus, menu);
      realMenu = { ...menu };
      realMenu.children = childMenu;
    } else if (parentMenu && parentMenu.id === menu.parent && menu.type === 0) {
      // 如果还是目录，继续递归
      const childMenu = filterMenuToTree(menus, menu);
      realMenu = { ...menu };
      realMenu.children = childMenu;
    }
    // add curent route
    if (realMenu) {
      realMenu.pid = menu.id;
      res.push(realMenu);
    }
  });
  return res;
}
