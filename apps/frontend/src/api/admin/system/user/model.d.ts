declare namespace API {
  type UserListPageResultItem = {
    id: number;
    username: string;
    nickName: string;
    email: string;
    phone: string;
    qq: string;
    avater: string;
    remark: string;
    status: number;
    roleNames: string[];
    createdAt: string;
    updatedAt: string;
  };

  /** 获取用户列表结果 */
  type UserListPageResult = UserListPageResultItem[];

  /** 用户信息 */
  type UserInfoResult = {
    id: number;
    username: string;
    nickName: string;
    email: string;
    phone: string;
    qq: string;
    avater: string;
    remark: string;
    status: number;
    roles: number[];
    createdAt: string;
    updatedAt: string;
  };

  /** 创建用户参数 */
  type CreateUserParams = {
    username: string;
    password: string;
    roles: number[];
    nickName: string;
    qq: string;
    email: string;
    remark: string;
    status: number;
  };

  /** 更新管理员用户参数 */
  type UpdateUserParams = {
    id: number;
    username: string;
    password: string;
    roles: number[];
    nickName: string;
    qq: string;
    email: string;
    remark: string;
    status: number;
  };

  /** 更新用户密码 */
  type UpdateUserPassword = {
    id: number;
    password: string;
  };
}
