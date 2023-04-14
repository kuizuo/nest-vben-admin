declare namespace API {
  // 登录日志
  type LoginLogItem = {
    id: number;
    ip: string;
    os: string;
    browser: string;
    time: string;
    username: string;
  };
  type LoginLogList = LoginLogItem[];

  // 操作日志
  type ReqLogItem = {
    createTime: string;
    updateTime: string;
    id: number;
    ip: string;
    userId: number;
    params: string;
    action: string;
    method: string;
    status: number;
    consumeTime: number;
  };
  type ReqLogList = ReqLogItem[];

  // 任务日志
  type TaskLogItem = {
    id: number;
    taskId: number;
    name: string;
    createdAt: string;
    consumeTime: number;
    detail: string;
    status: number;
  };
  type TaskLogList = TaskLogItem[];
}
