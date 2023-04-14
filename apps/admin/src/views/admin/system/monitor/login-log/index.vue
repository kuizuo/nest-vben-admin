<template>
  <BasicTable @register="registerTable" />
</template>
<script lang="ts" setup name="登录日志">
  import { BasicTable, useTable } from '/@/components/Table';
  import { getLoginLogList } from '/@/api/admin/system/log';
  import { columns, searchFormSchema } from './login-log.data';

  const [registerTable, {}] = useTable({
    title: '登录记录',
    api: getLoginLogList,
    useSearchForm: true,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    columns: columns,
    bordered: true,
    striped: false,
    showTableSetting: true,
    showIndexColumn: false,
    rowKey: 'id',
  });
</script>
