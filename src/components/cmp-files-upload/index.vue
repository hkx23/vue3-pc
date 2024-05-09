<template>
  <t-dialog
    v-model:visible="formVisible"
    header="文件上传"
    width="80%"
    placement="top"
    :cancel-btn="null"
    :confirm-btn="null"
    :close-on-overlay-click="false"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        ref="formFilesUploadRef"
        :upload-path="uploadPath"
        :upload-type-limit="uploadTypeLimit"
        :upload-count-limit="uploadCountLimit"
        :readonly="isReadonly"
        @upload-success="uploadSuccess"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
</template>
<script lang="tsx">
export default {
  name: 'CmpFilesUpload',
};
</script>
<script setup lang="tsx">
import _ from 'lodash';
import { FormInstanceFunctions } from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

import { AddFileType } from '../bcmp-upload-content/constants';
// import BcmpUploadContent from './bcmp-upload-content/index.vue';

const isReadonly = ref(true); // 是否可编辑
const formVisible = ref(false);
const formData = reactive({});
const formRef: Ref<FormInstanceFunctions> = ref(null);
const formFilesUploadRef = ref(null);
const emits = defineEmits(['uploadSuccess', 'uploadfail', 'deleteSuccess', 'batchDeleteSuccess']);
const props = defineProps({
  // 上传文件夹路径
  uploadPath: {
    type: String,
    default: 'Common',
  },
  uploadTypeLimit: {
    type: String,
    default: '',
  },
  uploadCountLimit: {
    type: Number,
    default: 999,
  },
});

const uploadSuccess = (file: AddFileType) => {
  // MessagePlugin.info(
  //   `上传一个文件成功,如果是需要实时更新业务数据，可使用对应FILE的路径，文件名，文件大小等信息自行写逻辑上传到后端`,
  // );
  emits('uploadSuccess', file);
  console.log('uploadSuccess', file);
};
const uploadfail = (file: AddFileType) => {
  // MessagePlugin.info(`上传一个文件失败,这个暂时没想到场景`);
  emits('uploadfail', file);
  console.log('uploadfail', file);
};
const deleteSuccess = (file: AddFileType) => {
  // MessagePlugin.info(
  //   `删除一个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  // );
  emits('deleteSuccess', file);
  console.log('deleteSuccess', file);
};
const batchDeleteSuccess = (files: AddFileType[]) => {
  // MessagePlugin.info(
  //   `删除多个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  // );
  emits('batchDeleteSuccess', files);
  console.log('batchDeleteSuccess', files);
};
const getFileList = () => {
  const { getFileList } = formFilesUploadRef.value;
  return getFileList();
};
const setFileList = (files) => {
  const { setFileList } = formFilesUploadRef.value;
  setFileList(files);
};

const reset = () => {
  // 清除所有对象的值
  Object.keys(formData).forEach((key) => {
    if (_.isArray(formData[key])) {
      formData[key] = [];
    } else if (_.isNumber(formData[key])) {
      formData[key] = 0;
    } else if (_.isBoolean(formData[key])) {
      formData[key] = true;
    } else {
      formData[key] = '';
    }
  });
};
const showForm = async (edit, files) => {
  isReadonly.value = edit;
  formVisible.value = true;
  setFileList(files);
};
onMounted(() => {
  if (props.uploadPath.length > 0) {
    console.log(props.uploadPath);
  }
});
defineExpose({
  form: formRef,
  reset,
  showForm,
  getFileList,
  setFileList,
});
</script>
