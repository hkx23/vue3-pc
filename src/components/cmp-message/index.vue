<template>
  <div class="message">
    <t-space direction="vertical" size="small" class="info">
      <t-alert v-for="(msg, index) in msgList.slice().reverse()" :key="index" :theme="msg.theme">
        <div>{{ msg.content }}</div>
        <div class="time">{{ msg.time }}</div>
      </t-alert>
    </t-space>
    <t-space align="center" size="small" separator="|">
      <t-button variant="text" @click="copy">
        <template #icon><file-copy-icon /></template>
        {{ t('common.button.copy') }}
      </t-button>
      <t-button variant="text" theme="danger" @click="clear">
        <template #icon><clear-icon /></template>
        {{ t('common.button.clear') }}
      </t-button>
    </t-space>
  </div>
</template>
<script setup lang="ts">
import { ClearIcon, FileCopyIcon } from 'tdesign-icons-vue-next';
import { computed } from 'vue';

import { useLang } from './lang';

// 使用多语言
const { t } = useLang();
const props = defineProps<{
  modelValue: {
    theme: 'success' | 'info' | 'error' | 'warning';
    content: string;
    time: string;
  }[];
}>();
const emit = defineEmits(['update:modelValue']);
const msgList = computed({
  get() {
    return props.modelValue;
  },
  set(val: any) {
    emit('update:modelValue', val);
  },
});
const copy = () => {
  let msg = '';
  msgList.value.forEach((val) => {
    msg += `${val.content}-${val.time}\n`;
  });
  navigator.clipboard.writeText(msg);
};
const clear = () => {
  msgList.value = [];
};
</script>

<style lang="less" scoped>
.message {
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  .info {
    width: 100%;
    height: 600px;
    overflow: auto;
    :deep(.t-alert__description) {
      width: 100%;
    }
    .time {
      text-align: right;
    }
  }
}
</style>
