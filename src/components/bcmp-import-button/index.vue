<template>
  <t-button :theme="importTheme" variant="base" @click="formUserVisible = true">{{ importText }}</t-button>

  <t-dialog v-model:visible="formUserVisible" top="25px" width="800px" :confirm-btn="null" header="导入数据">
    <cmp-container>
      <t-steps :current="current" readonly>
        <t-step-item title="选择EXCEL" content="选择EXCEL" />
        <t-step-item title="预览数据" content="预览数据" />
        <t-step-item title="导入数据" content="导入数据" />
      </t-steps>
      <div>
        <ul class="import-tip">
          <li>
            <span>支持 5MB 以内的xls、xlsx格式文件</span>
          </li>
          <li><span>文件中数据不能超过50000行、500列</span></li>
          <li><span>导入前请下载模板文件，收集数据后导入</span></li>
        </ul>
      </div>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="tsx" name="BcmpSelectBusiness">
import { PropType, ref } from 'vue';

// / 00-组件属性定义
const props = defineProps({
  // 导入按钮文字
  importText: {
    type: String,
    default: '导入',
  },
  // 导入按钮图标
  importIcon: {
    type: [String],
    default: '',
  },
  // 导入按钮样式
  importTheme: {
    type: String as PropType<'default' | 'success' | 'primary' | 'warning' | 'danger'>,
    default: 'default',
  },
});
console.log(props);
const current = ref(0);
const formUserVisible = ref(false);
</script>
<style scoped lang="less">
.import-tip {
  background: #f5f6f8;
  border-radius: 3px;
  color: #141e31;
  font-size: 14px;
  line-height: 22px;
  padding: 20px 20px 20px 40px;

  li {
    list-style-type: disc;
  }
}
</style>
