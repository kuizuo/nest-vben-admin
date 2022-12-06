<template>
  <div>
    <BasicTable
      @register="registerTable"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #toolbar>
        <BasicUpload :maxNumber="10" emptyHidePreview :api="uploadApi" />
        <Popconfirm
          title="你确定要删除这些数据吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDelete"
        >
          <a-button color="error"> 删除 </a-button>
        </Popconfirm>
      </template>
      <template #name="{ record }">
        <Tooltip>
          <template #title>{{ record.path }}</template>
          <a :href="record.path" target="_blank"> {{ record.name }}</a>
        </Tooltip>
      </template>

      <template #preview="{ record }">
        <Image :src="record.path" />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup name="存储管理">
  import { ref } from 'vue';
  import { Popconfirm, Image, Tooltip } from 'ant-design-vue';
  import { BasicUpload } from '/@/components/Upload';
  import { BasicTable, useTable } from '/@/components/Table';
  import { getStorageListByPage, deleteStorage } from '/@/api/admin/tools/storage';
  import { uploadApi } from '/@/api/sys/upload';
  import { columns, searchFormSchema } from './storage.data';

  const checkedKeys = ref<Array<number>>([]);
  const [registerTable, { deleteTableDataRecord }] = useTable({
    title: '存储列表',
    api: getStorageListByPage,
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

  function onSelectChange(selectedRowKeys: number[]) {
    checkedKeys.value = selectedRowKeys;
  }

  function handleDelete() {
    if (!(checkedKeys.value.length > 0)) return;

    const ids = checkedKeys.value;
    deleteStorage({ ids: ids });
    deleteTableDataRecord(ids);
    checkedKeys.value.length = 0;
  }
</script>
