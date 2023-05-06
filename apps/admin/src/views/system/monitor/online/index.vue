<template>
  <BasicTable @register="registerTable">
    <template #action="{ record }">
      <TableAction
        :actions="[
          {
            label: '下线',
            color: 'error',
            popConfirm: {
              title: '是否确认下线',
              confirm: handleKick.bind(null, record),
            },
            disabled: record.isCurrent,
          },
        ]"
      />
    </template>
  </BasicTable>
</template>

<script setup lang="ts" name="在线用户">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useSocket } from '/@/hooks/web/useSocket';
  import { getOnlineList, kickUser } from '/@/api/system/online';
  import { columns, searchFormSchema } from './online.data';

  const [registerTable, { reload }] = useTable({
    title: '在线用户',
    api: getOnlineList,
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
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  useSocket({
    connect() {
      reload();
    },
    online() {
      reload();
    },
    offline() {
      reload();
    },
  });

  type TableListItem = OnlineUserListItem;

  const handleKick = async (record: TableListItem) => {
    await kickUser({ id: record.id });
  };
</script>
