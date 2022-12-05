declare namespace API {
  type DeptListResultItem = {
    createAt: string;
    updatedAt: string;
    id: number;
    parentId: number;
    name: string;
    orderNo: number;
  };

  /** 获取部门列表参数 */
  type DeptListResult = DeptListResultItem[];

  /** 新增部门参数 */
  type DeptAddParams = {
    parentId: number;
    name: string;
    orderNo: number;
  };

  /** 更新某项部门参数 */
  type DeptUpdateParams = DeptAddParams & {
    id: number;
  };

  /** 获取部门详情结果 */
  type DeptInfoResult = {
    createAt: string;
    updatedAt: string;
    id: number;
    parentId: number;
    name: string;
    orderNo: number;
  };
}
