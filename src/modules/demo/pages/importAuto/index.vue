<template>
  <cmp-container :full="true">
    <bcmp-import-auto-button
      theme="primary"
      button-text="导入岗位"
      type="m_post"
      @close="fetchTable"
    ></bcmp-import-auto-button>
    <bcmp-import-auto-button
      theme="primary"
      button-text="导入物料分类"
      type="m_mitem_category"
      @close="fetchTable"
    ></bcmp-import-auto-button>
  </cmp-container>
</template>
<script setup lang="tsx">
const fetchTable = () => {
  console.log('导入成功');
};
</script>
