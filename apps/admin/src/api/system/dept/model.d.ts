declare namespace API {
  type DeptItem = {
    createAt: string;
    updatedAt: string;
    id: number;
    parentId: number;
    name: string;
    orderNo: number;
  };

  type DeptList = DeptItem[];

  type CreateDept = {
    parentId: number;
    name: string;
    orderNo: number;
  };

  type UpdateDept = CreateDept & {
    id: number;
  };

  type DeptInfo = {
    createAt: string;
    updatedAt: string;
    id: number;
    parentId: number;
    name: string;
    orderNo: number;
  };
}
