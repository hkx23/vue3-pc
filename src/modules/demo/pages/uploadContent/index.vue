<template>
  <cmp-container :full="true">
    <bcmp-upload-content
      @upload-success="uploadSuccess"
      @uploadfail="uploadfail"
      @delete-success="deleteSuccess"
      @batch-delete-success="batchDeleteSuccess"
    ></bcmp-upload-content>
  </cmp-container>
</template>
<script setup lang="tsx">
import { MessagePlugin } from 'tdesign-vue-next';

import { AddFileType } from '@/components/bcmp-upload-content/constants';
import BcmpUploadContent from '@/components/bcmp-upload-content/index.vue';
// const emits = defineEmits(['fileChange', 'uploadSuccess', 'uploadfail', 'deleteSuccess', 'batchDeleteSuccess']);
const uploadSuccess = (file: AddFileType) => {
  MessagePlugin.info(
    `上传一个文件成功,如果是需要实时更新业务数据，可使用对应FILE的路径，文件名，文件大小等信息自行写逻辑上传到后端`,
  );
  console.log('uploadSuccess', file);
};

const uploadfail = (file: AddFileType) => {
  MessagePlugin.info(`上传一个文件失败,这个暂时没想到场景`);
  console.log('uploadSuccess', file);
};

const deleteSuccess = (file: AddFileType) => {
  MessagePlugin.info(
    `删除一个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  );
  console.log('deleteSuccess', file);
};

const batchDeleteSuccess = (files: AddFileType[]) => {
  MessagePlugin.info(
    `删除多个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  );
  console.log('batchDeleteSuccess', files);
};
</script>
