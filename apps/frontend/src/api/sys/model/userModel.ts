/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: RoleInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 昵称
  nickName: string;
  // 邮箱
  email: string;
  // 头像
  avatar: string;
  // 介绍
  remark?: string;
}

export interface UpdateUserInfoParams {
  userId: string | number;
  nickName: string;
  qq: string;
  email: string;
  avatar: string;
  remark?: string;
}

export interface RegisterParams {
  username: string;
  password: string;
  email: string;
  qq?: string;
  code: string;
}
