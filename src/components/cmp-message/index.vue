<template>
  <cmp-container :full="true" :full-sub-index="[1]" :gutter="[8, 8]">
    <div style="border-bottom: 1px solid var(--td-component-border); padding: 0 0 4px; font-weight: bold">
      {{ showTitle }}
    </div>
    <cmp-card :ghost="true">
      <t-space direction="vertical" size="small" class="info">
        <t-alert v-for="(msg, index) in msgList.slice().reverse()" :key="index" :theme="msg.theme">
          <div>{{ msg.content }}</div>
          <div class="time">{{ msg.time }}</div>
        </t-alert>
      </t-space>
    </cmp-card>
    <cmp-card :ghost="true" style="align-items: flex-end; border-top: 1px solid rgb(235 235 235)">
      <t-space align="end" :size="0" style="align-self: flex-end">
        <t-button variant="text" @click="copy">
          <template #icon><file-copy-icon /></template>
          {{ t('common.button.copy') }}
        </t-button>
        <t-button variant="text" theme="danger" @click="clear">
          <template #icon><clear-icon /></template>
          {{ t('common.button.clear') }}
        </t-button>
        <template #separator>
          <t-divider layout="vertical" />
        </template>
      </t-space>
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="ts">
import { ClearIcon, FileCopyIcon } from 'tdesign-icons-vue-next';
import { computed, ref } from 'vue';

import { useLang } from './lang';

// 使用多语言
const { t } = useLang();
const props = defineProps<{
  modelValue: {
    theme: 'success' | 'info' | 'error' | 'warning';
    content: string;
    time: string;
  }[];
  // 标题
  title: String;
}>();
const showTitle = ref(props.title ?? '消息'); // 使用默认值
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
.info {
  width: 100%;
  height: 100%;
  overflow: auto;

  :deep(.t-alert__description) {
    width: 100%;
  }

  :deep(.t-alert) {
    padding: 12px;
  }

  .time {
    color: #878aab;
    font-size: 12px;
    line-height: 18px;
    margin-top: 2px;
    // text-align: right;
  }
}
</style>
