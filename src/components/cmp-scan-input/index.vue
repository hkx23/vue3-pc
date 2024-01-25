<template>
  <t-input v-bind="$attrs" ref="input" :autofocus="true" :clearable="true" @click="selectAll">
    <template #suffixIcon>
      <qrcode-icon />
    </template>
  </t-input>
</template>

<script setup lang="tsx" name="BcmpWorkstationInfo">
import { QrcodeIcon } from 'tdesign-icons-vue-next';
import { ref } from 'vue';

const input = ref(null);

const selectAll = () => {
  console.error('click');
  // 注意：这里需要确保输入框元素已经渲染完成并获取到DOM节点
  if (input.value && input.value.$el) {
    const nativeInput = input.value.$el.querySelector('input');
    if (nativeInput) {
      nativeInput.select();
    }
  }
};

const customerFocus = () => {
  if (input.value && input.value.$el) {
    const nativeInput = input.value.$el.querySelector('input');
    if (nativeInput) {
      nativeInput.focus();
    }
  }
};

defineExpose({
  customerFocus,
  selectAll,
});
</script>

<style lang="less" scoped>
:deep(.t-input) {
  background: #ff8c004d;
}

:deep(.t-input__inner) {
  font-size: 18px;
}
</style>
