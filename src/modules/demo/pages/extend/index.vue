<template>
  <div class="main-page">
    <t-button @click="getExtend"> 校验与获取数据 </t-button>
    <tm-extend ref="demoExtend" object-id="1725462129694920705" object-code="ORG"></tm-extend>"
  </div>
</template>

<script setup lang="tsx">
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

const demoExtend = ref<any>();
const getExtend = () => {
  demoExtend.value.getComponentData().then((data) => {
    MessagePlugin.info(`校验结果:${data.success}   ---   值变化:${JSON.stringify(data.data)}`);
  });
  // debugger;
  // const extensionResult = demoExtend.value.getComponentData();
  // if (extensionResult.success) {
  //   debugger;
  //   MessagePlugin.info(`值变化:${extensionResult.data}`);
  // }
};
</script>
