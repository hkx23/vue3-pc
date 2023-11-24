<template>
  <div></div>
</template>
<script lang="ts">
export default {
  name: 'CustomErrorMessage',
};
</script>
<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, onUnmounted } from 'vue';

import { CustomError } from '../../types/web-core';

onMounted(() => {
  if (window.top !== window) return;
  fw.ipc.on('custom_error', (args: any) => {
    const error = args as CustomError;
    MessagePlugin.error(error.message);
  });
});

onUnmounted(() => {
  fw.ipc.remove('custom_error');
});
</script>
<style lang="less" scoped></style>
