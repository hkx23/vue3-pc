<template>
  <div></div>
</template>
<script lang="ts">
export default {
  name: 'CustomErrorMessage',
};
</script>
<script setup lang="ts">
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import { CustomError } from '../../types/web-core';

const router = useRouter();

onMounted(() => {
  if (window.top !== window) return;
  fw.ipc.on('custom_error', (args: CustomError) => {
    if (args.code === 401) {
      if (router.currentRoute.value.path !== '/login') {
        router.push({
          path: '/login',
          query: { redirect: encodeURIComponent(router.currentRoute.value.fullPath) },
        });
      }
    }

    if (args.name === 'OperationError') {
      const alertDia = DialogPlugin.alert({
        theme: 'info',
        header: '提示',
        body: args.message,
        onConfirm: () => {
          alertDia.hide();
        },
      });
    } else {
      MessagePlugin.error(args.message);
    }
  });
});

onUnmounted(() => {
  fw.ipc.remove('custom_error');
});
</script>
<style lang="less" scoped></style>
