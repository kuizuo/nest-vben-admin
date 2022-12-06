declare namespace API {
  type ParamConfigItem = {
    createTime: string;
    updateTime: string;
    id: number;
    name?: string;
    key?: string;
    value?: string;
    remark?: string;
  };

  type ParamConfigList = ParamConfigItem[];

  type CreateParamConfig = {
    name?: string;
    key?: string;
    value?: string;
    remark?: string;
  };

  type UpdateParamConfigParams = CreateParamConfig & {
    id: number;
  };
}
