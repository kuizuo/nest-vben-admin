<template>
  <div>
    <BasicTable @register="registerTable">
      <template #action="{ record, index }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:edit-outlined',
              tooltip: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              tooltip: '删除此数据',
              popConfirm: {
                title: '确认删除吗?',
                okText: '确认',
                cancelText: '取消',
                confirm: handleDelete.bind(null, record, index),
              },
            },
          ]"
        />
      </template>
      <template #toolbar>
        <a-button type="primary" color="success" @click="handelAdd"> 添加 </a-button>
      </template>
    </BasicTable>

    <ParamConfigModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup name="参数配置">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getParamConfigList, deleteParamConfig } from '/@/api/admin/system/param-config';
  import { columns } from './param-config.data';
  import ParamConfigModal from './ParamConfigModal.vue';

  const [registerTable, { reload, getDataSource, updateTableDataRecord }] = useTable({
    title: '参数配置',
    api: getParamConfigList,
    useSearchForm: true,
    formConfig: {
      labelWidth: 80,
      autoSubmitOnEnter: true,
    },
    columns: columns,
    bordered: true,
    striped: false,
    showTableSetting: true,
    showIndexColumn: false,
    rowKey: 'id',
    actionColumn: {
      width: 110,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });
  const [registerModal, { openModal }] = useModal();

  function handelAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable, index: number) {
    await deleteParamConfig({ ids: [record.id] });
    let data = getDataSource();
    data.splice(index, 1);
  }

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      reload();
      // updateTableDataRecord(values.id, values);
    } else {
      reload();
    }
  }
</script>

<style scoped>
  ::v-deep(.ant-input-number) {
    min-width: 65px;
  }
</style>
