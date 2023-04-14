declare namespace API {
  /** 任务列表项 */
  export type SysTaskItem = {
    createdAt: string;
    updatedAt: string;
    id: number;
    name: string;
    service: string;
    type: number;
    status: number;
    startTime: string;
    endTime: string;
    limit: number;
    cron: string;
    every: number;
    data: string;
    jobOpts: string;
    remark: string;
  };
  /** 添加任务参数 */
  export type SysTaskAdd = {
    name: string;
    service: string;
    type: number;
    status: number;
    startTime: string;
    endTime: string;
    limit: number;
    cron: string;
    every: number;
    data: string;
    remark: string;
  };

  /** 更新任务参数 */
  export type SysTaskUpdate = SysTaskAdd & {
    id: number;
  };
  /** 获取任务详情返回结果 */
  export type SysTaskInfo = {
    createdAt: string;
    updatedAt: string;
    id: number;
    name: string;
    service: string;
    type: number;
    status: number;
    startTime: string;
    endTime: string;
    limit: number;
    cron: string;
    every: number;
    data: string;
    jobOpts: string;
    remark: string;
  };
}
