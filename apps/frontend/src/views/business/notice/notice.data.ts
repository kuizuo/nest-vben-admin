import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

import { h } from 'vue';
import { Switch, Tag } from 'ant-design-vue';
import { updateNotice } from '/@/api/business/notice';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: 60,
  },
  {
    title: '时间',
    width: 150,
    sorter: true,
    dataIndex: 'timestamp',
    format: (text: string) => {
      return formatToDateTime(text);
    },
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: 150,
  },
  {
    title: '内容',
    dataIndex: 'content',
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 100,
    customRender: ({ record }) => {
      const color = record.type == 1 ? 'blue' : record.type == 2 ? 'green' : 'red';
      const text = record.type == 1 ? '正常' : record.type == 2 ? '更新' : '警告';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '是否显示',
    key: 'show',
    dataIndex: 'show',
    width: 100,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.show === true,
        checkedChildren: '是',
        unCheckedChildren: '否',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? true : false;
          updateNotice({ id: record.id, show: newStatus })
            .then(() => {
              record.show = newStatus;
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '标题',
    component: 'Input',
    colProps: {
      span: 6,
    },
  },
  {
    field: 'content',
    label: '内容',
    component: 'Input',
    colProps: {
      span: 6,
    },
  },
  {
    field: 'timestamp',
    component: 'RangePicker',
    label: '时间',
    colProps: {
      span: 6,
    },
  },
  {
    field: 'show',
    label: '是否显示',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '显示',
          value: 1,
          key: '1',
        },
        {
          label: '隐藏',
          value: 0,
          key: '2',
        },
      ],
    },
    colProps: {
      span: 6,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '标题',
    colProps: {
      span: 24,
    },
    required: true,
  },
  {
    field: 'content',
    component: 'InputTextArea',
    label: '内容',
    colProps: {
      span: 24,
    },
    required: true,
  },
  {
    field: 'timestamp',
    component: 'DatePicker',
    label: '时间',
    defaultValue: Date.now(),
    componentProps: {
      format: 'YYYY-MM-DD HH:mm:ss',
      showTime: { format: 'HH:mm:ss' },
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'type',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      options: [
        {
          label: '正常',
          value: 1,
          key: '1',
        },
        {
          label: '更新',
          value: 2,
          key: '2',
        },
        {
          label: '警告',
          value: 3,
          key: '3',
        },
      ],
    },
    label: '类型',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'show',
    label: '是否显示',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '显示', value: true },
        { label: '隐藏', value: false },
      ],
    },
    colProps: {
      span: 24,
    },
  },
];
