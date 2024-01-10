<template>
  <cmp-container :full="true">
    <bcmp-import-button theme="primary" type="mitemCategory" @close="fetchTable"></bcmp-import-button>
  </cmp-container>
</template>
<script setup lang="tsx">
const fetchTable = () => {
  console.log('导入成功');
};
</script>
