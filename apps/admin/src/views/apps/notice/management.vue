<template>
  <div class="p-1">
    <BasicTable @register="registerTable" @edit-end="handleEditEnd">
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
              tooltip: '删除此公告',
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

    <NoticeModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup name="公告管理">
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { getNoticeList, updateNotice, deleteNotice } from '/@/api/apps/notice';
  import { columns, searchFormSchema } from './notice.data';
  import NoticeModal from './NoticeModal.vue';

  const [registerTable, { reload, getDataSource, updateTableDataRecord }] = useTable({
    title: '公告管理',
    api: getNoticeList,
    useSearchForm: true,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    columns: columns,
    // rowSelection: {
    //   type: 'checkbox',
    // },
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
  function handleEditEnd({ record }: Recordable) {
    updateNotice(record);
  }

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

  function handleDelete(record: Recordable, index: number) {
    deleteNotice(record.id).then(() => {
      let data = getDataSource();
      data.splice(index, 1);
    });
  }

  function handleSuccess({ isUpdate, values }) {
    if (isUpdate) {
      updateTableDataRecord(values.id, values);
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
