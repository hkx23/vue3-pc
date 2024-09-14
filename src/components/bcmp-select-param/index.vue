<template>
  <t-select v-bind="$attrs" v-model="modelValue" :options="paramOptions" clearable @change="onSelectionChange">
  </t-select>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue';

import { api as apiMain } from '../../api/main';

// / 00-组件属性定义
const props = defineProps({
  // 组件展示类型
  paramGroup: { type: [String], default: '' },
  modelValue: { type: [String, Array<any>], default: '' },
});

const modelValue = ref(props.modelValue);

const paramOptions = ref([]);

const loadParamData = () => {
  apiMain.param.getListByGroupCode({ parmGroupCode: props.paramGroup }).then((data) => {
    paramOptions.value = data;
  });
};

const emits = defineEmits(['SelectionChange', 'change', 'update:modelValue']);
const onSelectionChange = (val: any, context: any) => {
  modelValue.value = val;
  console.log(context);
  emits('update:modelValue', val);
  emits('SelectionChange', val);
};

// 初始化远程数据
onMounted(() => {
  if (props.paramGroup) {
    loadParamData();
  }
});

watch(
  () => props.modelValue,
  (_val) => {
    // console.log('watch:props.value', `${props.title} ss ${val}`);
    nextTick(() => {
      // 多选
      modelValue.value = _val;
      emits('update:modelValue', _val);
    });
  },
  { deep: true },
);
</script>
