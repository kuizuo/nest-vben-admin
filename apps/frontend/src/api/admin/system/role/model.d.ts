declare namespace API {
  /** 新增角色 */
  type CreateRoleParams = {
    name: string;
    value: string;
    remark: string;
    menus: Key[];
  };
  /** 更新角色 */
  type UpdateRoleParams = CreateRoleParams & {
    id: number;
  };

  /** 角色列表项 */
  type RoleListResultItem = {
    createdAt: string;
    updatedAt: string;
    id: number;
    name: string;
    value: string;
    remark: string;
  };

  /** 角色列表 */
  type RoleListResult = RoleListResultItem[];

  /** 角色详情 */
  type RoleInfoResult = {
    createTime: string;
    updateTime: string;
    id: number;
    name: string;
    value: string;
    remark: string;
    menus: number[];
  };
}
