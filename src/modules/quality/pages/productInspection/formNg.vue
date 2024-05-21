<template>
  <t-dialog
    v-model:visible="formVisible"
    header="处理意见"
    width="85%"
    placement="top"
    top="56px"
    :cancel-btn="null"
    :confirm-btn="null"
    :close-on-overlay-click="false"
  >
    <cmp-container :full="true" :ghost="true">
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-descriptions :column="3" size="large">
          <t-descriptions-item v-if="formData.viewType !== ViewType.VIEW" label="缺陷类型">
            <bcmp-select-business
              v-model="formData.defectCodes"
              :disabled="!isCanEdit"
              type="defectCode"
              :show-title="false"
              :is-multiple="true"
            >
            </bcmp-select-business>
          </t-descriptions-item>
          <t-descriptions-item v-else label="缺陷类型">
            <t-input v-model="formData.defectNames" :disabled="true" />
          </t-descriptions-item>
          <t-descriptions-item label="处理意见"
            ><t-select v-model="formData.handleMethod" :disabled="!isCanEdit" :options="iqcHandleMethodOption"
          /></t-descriptions-item>
          <t-descriptions-item label="责任部门">
            <bcmp-select-business
              v-model="formData.deptResponsibilityId"
              :disabled="!isCanEdit"
              type="admin_org"
              :show-title="false"
            ></bcmp-select-business>
          </t-descriptions-item>
          <t-descriptions-item label="跟进人">
            <bcmp-select-business
              v-model="formData.personResponsibilityId"
              :disabled="!isCanEdit"
              type="person"
              :show-title="false"
            ></bcmp-select-business
          ></t-descriptions-item>
          <t-descriptions-item label="描述" :span="3">
            <t-textarea v-model="formData.memo" :disabled="!isCanEdit" placeholder="请输入内容"
          /></t-descriptions-item>
          <!-- <t-descriptions-item>
            <t-checkbox v-model="formData.isPdca" label="启用PDCA" />
          </t-descriptions-item> -->
        </t-descriptions>
      </cmp-card>
    </cmp-container>

    <template #footer>
      <t-button v-if="formData.viewType != ViewType.VIEW" theme="primary" @click="onConfirmForm">{{
        t('common.button.submit')
      }}</t-button>
      <t-button theme="default" @click="formVisible = false">{{ t('common.button.cancel') }}</t-button>
    </template>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'FormNg',
};
</script>

<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiQuality, BarcodeVO, OqcInspectBillFullVO, OqcInspectStdFullVO } from '@/api/quality';
import utils from '@/utils/common';

import { useLang } from './lang';

const { t } = useLang();
const Emit = defineEmits(['parent-refresh-event', 'form-close-event']);
const isCanEdit = ref(true);
const formVisible = ref(false);
const formNgRef: Ref<FormInstanceFunctions> = ref(null);
enum ViewType {
  BJ = 'BJ', // 报检模式
  JY = 'JY', // 检验模式
  VIEW = 'VIEW', // 查看模式
}
interface FormInspectInfo extends OqcInspectBillFullVO {
  viewType: ViewType;
  scanBarcode: string;
  defectCodes: string;
  defectNames: string;
  enableProcessApproval: string;
}

const formData: FormInspectInfo = reactive({
  viewType: ViewType.VIEW,
  scanBarcode: '',
  defectCodes: '',
  defectNames: '',
  enableProcessApproval: '',
});
const tableData = ref<OqcInspectStdFullVO[]>([]);
const scanInfoList = ref<BarcodeVO[]>([]);

const onConfirmForm = async () => {
  try {
    if (formData.defectCodes && formData.defectCodes.length > 0) {
      const defectCodeList = formData.defectCodes.split(',');
      formData.defectCodeList = defectCodeList.map((item) => {
        return {
          value: item,
          label: item,
        };
      });
    } else {
      MessagePlugin.error('缺陷类型不能为空');
      return;
    }

    utils.loadingPluginFullScreen(true);

    await apiQuality.oqcInspect.submitJyQqcInspect({
      oqcInspectId: formData.id,
      billNo: formData.billNo,
      viewType: formData.viewType,
      businessCategory: formData.businessCategory,
      oqcInspectBillInfo: formData,
      isTempSave: false,
      defaultInspectItems: tableData.value,
      barcodeList: scanInfoList.value,
      enableProcessApproval: formData.enableProcessApproval,
    });

    Emit('form-close-event');
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
    } else {
      delete formData[key];
    }
  });
};
const showForm = async (edit, row, tableDataTemp, scanInfoListTemp) => {
  formVisible.value = true;
  reset();
  Object.assign(formData, row);
  tableData.value = tableDataTemp;
  scanInfoList.value = scanInfoListTemp;
  if (formData.viewType === ViewType.VIEW) {
    isCanEdit.value = false;
  }
};

const showFormView = async (edit, row, tableDataTemp, scanInfoListTemp) => {
  formVisible.value = true;
  reset();
  Object.assign(formData, row);
  tableData.value = tableDataTemp;
  scanInfoList.value = scanInfoListTemp;
  // 获取缺陷信息
  getDefectList();
};

// 获取缺陷信息
const getDefectList = async () => {
  try {
    const defectNames = await apiQuality.oqcInspect.getDefectNames({
      oqcInspectId: formData.id.toString(),
    });
    if (defectNames) {
      formData.defectNames = defectNames;
    }
  } catch (e) {
    console.error(e);
  }
};

const closeForm = async () => {
  formVisible.value = false;
};
const iqcHandleMethodOption = ref([]);
const getIqcHandleMethod = async () => {
  iqcHandleMethodOption.value = [];
  const data = await apiMain.param.getParamListByGroupCode({
    parmGroupCode: 'Q_IQC_HANDLE_METHOD',
  });

  data.forEach((item) => {
    iqcHandleMethodOption.value.push({ value: item.paramCode, label: item.paramName });
  });
};

const iqcDefectCategoryOption = ref([]);
const getIqcDefectCategory = async () => {
  iqcDefectCategoryOption.value = [];
  const data = await apiMain.param.getParamListByGroupCode({
    parmGroupCode: 'Q_IQC_UNQUALIFY_CATEGORY',
  });

  data.forEach((item) => {
    iqcDefectCategoryOption.value.push({ value: item.paramCode, label: item.paramName });
  });
};

const iqcResponsibilityOption = ref([]);
const getIqcResponsibilityOption = async () => {
  iqcResponsibilityOption.value = [];
  const data = await apiMain.param.getParamListByGroupCode({
    parmGroupCode: 'Q_IQC_RESPONSIBILITY',
  });

  data.forEach((item) => {
    iqcResponsibilityOption.value.push({ value: item.paramCode, label: item.paramName });
  });
};

const iqcCorrectOpinion = ref([]);
const getIqcCorrectOpinionOption = async () => {
  iqcCorrectOpinion.value = [];
  const data = await apiMain.param.getParamListByGroupCode({
    parmGroupCode: 'Q_IQC_CORRECT_OPINION',
  });

  data.forEach((item) => {
    iqcCorrectOpinion.value.push({ value: item.paramCode, label: item.paramName });
  });
};

const pageInit = async () => {
  getIqcHandleMethod();
  getIqcDefectCategory();
  getIqcResponsibilityOption();
  getIqcCorrectOpinionOption();
};
onMounted(() => {
  pageInit().then(() => {});
});
defineExpose({
  form: formNgRef,
  reset,
  showForm,
  showFormView,
  closeForm,
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
