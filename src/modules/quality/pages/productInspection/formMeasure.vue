<template>
  <t-dialog
    v-model:visible="formVisible"
    header="计算结果"
    width="60%"
    placement="top"
    top="56px"
    :cancel-btn="
      isEdit
        ? {
            content: '取消',
          }
        : null
    "
    :confirm-btn="
      isEdit
        ? {
            content: '提交',
            theme: 'primary',
          }
        : null
    "
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
  >
    <cmp-container :full="true" :ghost="true">
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-descriptions :column="4" size="large">
          <t-descriptions-item label="样本数">{{ formData.sampleQty }}</t-descriptions-item>
          <t-descriptions-item label="检验工具">{{ formData.inspectTool }}</t-descriptions-item>
          <t-descriptions-item label="基准值">{{ `${formData.baseValue} ${formData.uom}` }}</t-descriptions-item>
          <t-descriptions-item label="合格范围">{{
            `${formData.minValue} - ${formData.maxValue} ${formData.uom}`
          }}</t-descriptions-item>
        </t-descriptions>
      </cmp-card>
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-space break-line style="height: 420px; overflow-y: auto">
          <t-input
            v-for="(item, index) in formData.measureList"
            :key="index"
            v-model="item.measureValue"
            :disabled="!isEdit"
            style="width: 135px"
            :suffix="item.uom"
          ></t-input>
        </t-space>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'FormMeasure',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { reactive, Ref, ref } from 'vue';

import utils from '@/utils/common';

const Emit = defineEmits(['parent-confirm-event', 'form-close-event']);

const isEdit = ref(true); // 是否可编辑
const formVisible = ref(false);
const formMeasureRef: Ref<FormInstanceFunctions> = ref(null);

const formData = reactive({
  billNo: '',
  sampleQty: '',
  inspectTool: '',
  baseValue: '',
  uom: '',
  minValue: '',
  maxValue: '',
  dtlId: '',
  measureList: [],
});

const onConfirmForm = async () => {
  try {
    let isAllOK = true;
    for (let index = 0; index < formData.measureList.length; index++) {
      const item = formData.measureList[index];
      if (!item.measureValue) {
        MessagePlugin.error('测量值不能为空.');
        return;
      }
    }

    for (let index = 0; index < formData.measureList.length; index++) {
      const item = formData.measureList[index];
      if (!item.minValue) {
        MessagePlugin.error('合格范围最小值异常,请检查');
        return;
      }
      if (!item.maxValue) {
        MessagePlugin.error('合格范围最大值异常,请检查');
        return;
      }
      if (item.measureValue < item.minValue || item.measureValue > item.maxValue) {
        // MessagePlugin.error('请输入正确的测量值.');
        isAllOK = false;
        break;
      }
    }

    utils.loadingPluginFullScreen(true);

    Emit('parent-confirm-event', formData.measureList, isAllOK, formData.dtlId);

    formVisible.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
  }
};
const reset = () => {
  // 清除所有对象的值
  Object.keys(formData).forEach((key) => {
    if (_.isArray(formData[key])) {
      formData[key] = [];
    } else if (_.isNumber(formData[key])) {
      formData[key] = 0;
    } else if (_.isBoolean(formData[key])) {
      formData[key] = true;
    } else {
      formData[key] = '';
    }
  });
};

const showForm = async (edit, row, dtlId) => {
  isEdit.value = edit;
  formVisible.value = true;
  reset();
  formData.measureList = _.cloneDeep(row);
  formData.dtlId = dtlId;
  formData.sampleQty = `${row[0].sampleQty}`;
  formData.inspectTool = `${row[0].inspectTool}`;
  formData.baseValue = `${row[0].baseValue}`;
  formData.uom = `${row[0].uom}`;
  formData.sampleQty = `${row[0].sampleQty}`;
  formData.minValue = `${row[0].minValue}`;
  formData.maxValue = `${row[0].maxValue}`;
};
defineExpose({
  form: formMeasureRef,
  reset,
  showForm,
});
</script>
<style lang="less" scoped>
:deep .t-dialog__body {
  padding: 0 !important;
}

:deep .t-dialog {
  background: var(--td-bg-color-page) !important;
}

:deep .t-tabs__nav-container {
  margin-top: 5px;
}

:deep .t-tabs__operations {
  top: 0;
  border-bottom: 0;
}

.div_break_word {
  max-width: 500px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 允许的最大行数 */
  -webkit-box-orient: vertical; /* 设置为垂直排列 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 文本溢出时显示省略号 */
  word-wrap: break-word; /* 强制换行，防止单词过长导致溢出 */
  line-height: 1.5em; /* 行高，按需调整 */
  max-height: 3em; /* 根据行高计算最多显示两行的高度 */
}

.tabs_right_ops {
  display: flex;
  justify-content: space-between; /* 水平间距均匀分配 */

  /* 或者使用下面的方式实现间距 */

  /* justify-content: space-around; */

  /* 或者让子元素紧贴在一起 */
  justify-content: flex-end;
}
</style>
`
