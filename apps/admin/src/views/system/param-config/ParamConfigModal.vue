<template>
  <BasicModal v-bind="$attrs" @register="register" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { formSchema } from './param-config.data';
  import { createParamConfig, updateParamConfig } from '/@/api/system/param-config';

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref(0);

  const [registerForm, { setFieldsValue, resetFields, validate }] = useForm({
    labelWidth: 80,
    schemas: formSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 24,
    },
  });

  const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = data?.isUpdate;

    if (isUpdate.value) {
      rowId.value = data.record.id;

      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!isUpdate.value ? '新增参数' : '编辑参数'));

  async function handleSubmit() {
    try {
      const values = await validate();

      setModalProps({ confirmLoading: true });

      const data = {
        ...values,
        id: rowId.value,
      };

      await (!isUpdate.value ? createParamConfig : updateParamConfig)(data);

      closeModal();
      emit('success', { isUpdate: isUpdate.value, values: { ...values, id: rowId } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
