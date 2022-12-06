declare namespace API {
  type UserItem = {
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

  type UserList = UserItem[];

  type UserInfo = {
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

  type CreateUser = {
    username: string;
    password: string;
    roles: number[];
    nickName: string;
    qq: string;
    email: string;
    remark: string;
    status: number;
  };

  type UpdateUser = {
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

  type UpdateUserPassword = {
    id: number;
    password: string;
  };
}
