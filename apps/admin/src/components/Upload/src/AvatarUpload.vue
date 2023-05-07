<template>
  <div>
    <Upload
      v-model:file-list="fileList"
      name="file"
      list-type="picture-card"
      class="avatar-uploader"
      :action="uploadUrl"
      :before-upload="beforeUpload"
      :headers="requestHeaders"
      @preview="handlePreview"
      @change="handleChange"
    >
      <img v-if="previewImage" :src="previewImage" alt="logo" />
      <div v-if="fileList.length < 1">
        <loading-outlined v-if="loading" />
        <plus-outlined v-else />
        <div class="ant-upload-text">上传</div>
      </div>
    </Upload>
    <Modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </Modal>

    <Modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </Modal>
  </div>
</template>
<script lang="ts" setup>
  import { Upload, Modal } from 'ant-design-vue';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

  import { useMessage } from '/@/hooks/web/useMessage';
  import { uploadUrl } from '/@/api/sys/upload';
  import { getToken } from '/@/utils/auth';
  import { ref, watch } from 'vue';

  interface FileItem {
    uid?: string;
    name?: string;
    status?: string;
    response?: string;
    percent?: number;
    url?: string;
    preview?: string;
    originFileObj?: any;
  }

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const props = defineProps({
    avatar: {
      type: String,
    },
  });

  const fileList = ref<FileItem[]>([]);

  const emit = defineEmits(['change']);

  const { createMessage } = useMessage();

  const requestHeaders = {
    authorization: 'Bearer ' + getToken(),
  };

  const loading = ref<boolean>(false);
  const previewVisible = ref<boolean>(false);
  const previewImage = ref<string | undefined>('');

  const handleCancel = () => {
    previewImage.value = '';
    previewVisible.value = false;
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj)) as string;
    }
    previewImage.value = file.url || file.preview;
    previewVisible.value = true;
  };

  const handleChange = ({ fileList: newFileList }) => {
    let temp = newFileList[0];
    if (temp?.response) {
      temp.url = temp.response;
    }

    emit('change', temp);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      createMessage.error('请选择正确的图片格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      createMessage.error('图片大小请小于1M');
    }
    return isJpgOrPng && isLt2M;
  };

  watch(
    () => props.avatar,
    (val) => {
      fileList.value = val ? [{ url: val }] : [];
    },
  );
</script>
