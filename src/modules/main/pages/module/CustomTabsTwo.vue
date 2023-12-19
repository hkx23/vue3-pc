<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref, watch } from 'vue';

interface TabItem {
  label: string;
  value: string;
}

const props = defineProps({
  tabs: {
    type: Array as () => TabItem[],
    required: true,
  },
  modelValue: {
    type: Array as () => string[],
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue', 'selectionChanged']);

const selectedValues = ref<string[]>(props.modelValue);

// 创建一个计算属性来生成所需的数组
const computedSelectedStates = computed(() => {
  return props.tabs.map((tab) => (selectedValues.value.includes(tab.value) ? 1 : 0));
});

// 监听数据变化
watch(
  () => props.modelValue,
  (newValue) => {
    selectedValues.value = newValue;
  },
);

const toggleSelection = (value: string, event?: MouseEvent) => {
  event.preventDefault();
  // 如果点击的是“全部”标签
  if (value === '0') {
    // 如果当前已选中的标签数量大于1或者没有选中“全部”，则切换到只选中“全部”
    if (selectedValues.value.length > 1 || !selectedValues.value.includes('0')) {
      selectedValues.value = ['0'];
    }
    // 否则不进行任何操作（即“全部”标签已选中且没有其他选中的标签时不允许取消）
  } else {
    // 如果“全部”标签已选中，则先取消选择“全部”标签
    const allIndex = selectedValues.value.indexOf('0');
    if (allIndex !== -1) {
      selectedValues.value.splice(allIndex, 1);
    }

    // 切换当前标签的选中状态
    const index = selectedValues.value.indexOf(value);
    if (index === -1) {
      // 添加新选择
      selectedValues.value.push(value);
    } else if (selectedValues.value.length > 1) {
      // 当前有多个选择时，可以取消当前选择
      selectedValues.value.splice(index, 1);
    }
    // 如果只有一个选择，且是当前点击的标签，则不进行操作
  }
  // 发送更新事件和选中状态数组
  emit('update:modelValue', selectedValues.value);
  emit('selectionChanged', computedSelectedStates.value);
};
</script>

<template>
  <div class="custom-multi-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      :class="{ 'is-selected': selectedValues.includes(tab.value) }"
      @click="toggleSelection(tab.value, $event)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<style scoped>
.custom-multi-tabs button {
  background-color: rgb(240 240 240); /* 未选中时的背景色（粉红色） */
  color: black; /* 未选中时的文字色 */
  border: none; /* 边框颜色 */
  padding: 5px 10px; /* 内边距 */
  margin-right: 10px; /* 间距 */
  cursor: pointer; /* 鼠标样式 */
  transition: background-color 0.3s; /* 过渡效果 */
}

.custom-multi-tabs button.is-selected {
  background-color: var(--td-brand-color); /* 选中时的背景色（浅蓝色） */
  color: white; /* 选中时的文字色 */
}
</style>
