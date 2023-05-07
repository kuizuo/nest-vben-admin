import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    align: 'center',
    customRender: ({ record }) => {
      return h('div', {}, [
        h('span', record.username),
        ...(record.isCurrent ? [h(Tag, { color: 'green' }, () => '当前')] : []),
      ]);
    },
  },
  {
    title: '登录IP',
    dataIndex: 'ip',
    width: 140,
    align: 'center',
  },
  {
    title: '登录地点',
    dataIndex: 'address',
    width: 140,
    align: 'center',
  },
  {
    title: '登录时间',
    dataIndex: 'time',
    align: 'center',
    format: (text) => {
      return formatToDateTime(text);
    },
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    align: 'center',
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    align: 'center',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: `username`,
    label: `用户名`,
    component: 'Input',
    colProps: {
      sm: 12,
      md: 6,
    },
  },
  {
    field: `ip`,
    label: `IP`,
    component: 'Input',
    colProps: {
      sm: 12,
      md: 6,
    },
  },

  {
    field: 'time',
    component: 'RangePicker',
    label: '时间',
    colProps: {
      sm: 12,
      md: 6,
    },
  },
];
