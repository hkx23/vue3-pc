<template>
  <t-dialog v-model:visible="visible" header="模具上下机" width="60%" prevent-scroll-through>
    <t-descriptions :column="2" colon>
      <t-descriptions-item label="机台编码">BU1-ZW-1001</t-descriptions-item>
      <t-descriptions-item label="机台描述">亚威数控折弯机01</t-descriptions-item>
    </t-descriptions>
    <t-divider />
    <t-row>
      <t-col :span="8">
        <t-descriptions :column="2" colon>
          <t-descriptions-item label="模具编码">
            <t-input placeholder="请输入模具编码" />
          </t-descriptions-item>
          <t-descriptions-item label="模具描述">模具 ABS 765A</t-descriptions-item>
          <t-descriptions-item label="上下模人员">
            <t-input placeholder="请输入上下模人员" />
          </t-descriptions-item>
        </t-descriptions>
      </t-col>
      <t-col :span="4">
        <div v-if="isStart" class="device_status start">
          <data-checked-icon />
          <div class="title">上机中</div>
        </div>
        <div v-else class="device_status stop">
          <data-error-icon />
          <div class="title">已下机</div>
        </div>
      </t-col>
    </t-row>
    <template #footer>
      <t-button theme="danger" @click="stop">设备下机</t-button>
      <t-button theme="primary" @click="start">设备上机</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { DataCheckedIcon, DataErrorIcon } from 'tdesign-icons-vue-next';
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(['update:modelValue']);

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit('update:modelValue', val);
  },
});
const isStart = ref(true);
const start = () => {
  isStart.value = true;
};
const stop = () => {
  isStart.value = false;
};
</script>

<style lang="less" scoped>
.device_status {
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-size: 50px;
  }

  .title {
    padding: 10px;
  }

  &.start {
    color: var(--td-success-color);
  }

  &.stop {
    color: var(--td-error-color);
  }
}
</style>
