<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { createUser, updateUser, getUserInfo } from '/@/api/admin/system/user';
  import { formSchema } from './user.data';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');
  const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      updateSchema([
        { field: 'username', componentProps: { disabled: true } },
        { field: 'password', required: false, defaultValue: '' },
      ]);

      rowId.value = data.record.id;
      const userInfo = await getUserInfo({ id: data.record.id });
      setFieldsValue(userInfo);
    } else {
      updateSchema([
        { field: 'username', componentProps: { disabled: false } },
        {
          field: 'password',
          required: true,
          defaultValue: '123456',
          componentProps: { placeholder: '请输入' },
        },
      ]);
    }
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      const data = {
        ...values,
        id: rowId.value,
      };

      await (!unref(isUpdate) ? createUser : updateUser)(data);

      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
