declare namespace API {
  type ParamConfigListItemResult = {
    createTime: string;
    updateTime: string;
    id: number;
    name?: string;
    key?: string;
    value?: string;
    remark?: string;
  };

  type ParamConfigListResult = ParamConfigListItemResult[];

  type CreateParamConfigParams = {
    name?: string;
    key?: string;
    value?: string;
    remark?: string;
  };

  type UpdateParamConfigParams = CreateParamConfigParams & {
    id: number;
  };
}
