<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('mitemIncomingInspection.处理意见')"
    width="80%"
    placement="top"
    top="56px"
    :confirm-btn="{
      content: t('mitemIncomingInspection.提交'),
      theme: 'primary',
    }"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
  >
    <cmp-container :full="true" :ghost="true">
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-descriptions :title="t('mitemIncomingInspection.检验单号') + formData.iqcBillNo" :column="4" size="large">
          <t-descriptions-item :label="t('mitemIncomingInspection.供应商')">{{
            formData.supplierName
          }}</t-descriptions-item>
          <t-descriptions-item :label="t('mitemIncomingInspection.物料编码')">{{
            formData.mitemCode
          }}</t-descriptions-item>
          <t-descriptions-item :label="t('mitemIncomingInspection.物料名')">
            <div class="div_break_word">
              {{ formData.mitemName }}
            </div>
          </t-descriptions-item>
          <t-descriptions-item :label="t('mitemIncomingInspection.检验严格度')">{{
            formData.inspectionStringencyName
          }}</t-descriptions-item>
          <t-descriptions-item :label="t('mitemIncomingInspection.报批数量')">{{
            formData.pickQty
          }}</t-descriptions-item>
          <t-descriptions-item :label="t('mitemIncomingInspection.检验标准')">{{
            formData.inspectStdName
          }}</t-descriptions-item>
          <t-descriptions-item :label="t('mitemIncomingInspection.接收单号')">{{
            formData.billNoStr
          }}</t-descriptions-item>
          <t-descriptions-item :label="t('mitemIncomingInspection.查看附件')">
            <t-link theme="primary">{{ t('mitemIncomingInspection.查看附件') }}</t-link></t-descriptions-item
          >
          <t-descriptions-item :label="t('mitemIncomingInspection.合格数量')">
            <div>{{ formData.okQty }}</div>
          </t-descriptions-item>
          <t-descriptions-item :label="t('mitemIncomingInspection.不合格数量')">
            <div>{{ formData.ngQty }}</div>
          </t-descriptions-item>
        </t-descriptions>
      </cmp-card>
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-descriptions :column="3" size="large">
          <!-- <t-descriptions-item :label="t('mitemIncomingInspection.缺陷类型')">
            <bcmp-select-business
              v-model="formNgData.defectCodes"
              type="defectCode"
              :show-title="false"
              :is-multiple="true"
            >
            </bcmp-select-business>
          </t-descriptions-item> -->
          <!-- <t-descriptions-item :label="t('mitemIncomingInspection.缺陷等级')"
            ><t-select v-model="formNgData.iqcDefectCategoryCode" :options="iqcDefectCategoryOption" />
          </t-descriptions-item> -->
          <t-descriptions-item :label="t('mitemIncomingInspection.物料处理意见')"
            ><t-select v-model="formNgData.iqcHandleMethodCode" :options="iqcHandleMethodOption"
          /></t-descriptions-item>
          <!-- <t-descriptions-item :label="t('mitemIncomingInspection.责任判定')"
            ><t-select v-model="formNgData.iqcResponsibilityCode" :options="iqcResponsibilityOption"
          /></t-descriptions-item>
          <t-descriptions-item :label="t('mitemIncomingInspection.供方整改意见')"
            ><t-select v-model="formNgData.iqcCorrectCode" :options="iqcCorrectOpinion"
          /></t-descriptions-item>
          <t-descriptions-item :label="t('mitemIncomingInspection.跟进人')">
            <bcmp-select-business
              v-model="formNgData.personResponsibilityId"
              type="person"
              :show-title="false"
            ></bcmp-select-business
          ></t-descriptions-item> -->
          <t-descriptions-item :label="t('mitemIncomingInspection.描述')" :span="3">
            <t-textarea v-model="formNgData.memo" :placeholder="t('mitemIncomingInspection.请输入内容')"
          /></t-descriptions-item>
          <!-- <t-descriptions-item>
            <t-checkbox v-model="formNgData.isPdca" :label="t('mitemIncomingInspection.启用PDCA')" />
          </t-descriptions-item> -->
        </t-descriptions>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>
<script lang="ts" setup>
import _ from 'lodash';
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiQuality } from '@/api/quality';

import { useLang } from './lang';

const { t } = useLang();
const Emit = defineEmits(['parent-refresh-event', 'form-close-event']);

const formVisible = ref(false);

const formNgRef: Ref<FormInstanceFunctions> = ref(null);

const formData = reactive({
  iqcBillNo: '',
  billNoStr: '',
  billNoList: [{ billNo: '', erpLineNo: '', billNoDtlId: '' }],
  mitemId: '',
  mitemCode: '',
  mitemName: '',
  mitemDesc: '',
  mitemCategoryId: '',
  mitemCategoryCode: '',
  mitemCategoryName: '',
  pickQty: '',
  supplierId: '',
  supplierCode: '',
  supplierName: '',
  inspectionStringency: '',
  inspectionStringencyName: '',
  inspectStdName: '',
  okQty: 0,
  ngQty: 0,
});

const mainTableData = ref([]);
const formNgData = reactive({
  personResponsibilityId: '',
  iqcDefectCategoryCode: '',
  iqcHandleMethodCode: '',
  iqcResponsibilityCode: '',
  iqcCorrectCode: '',
  defectCodes: '',
  defectCodeList: [],
  memo: '',
  isPdca: false,
  isStartImprove: 0,
});

const onConfirmForm = async () => {
  try {
    if (formNgData.defectCodes.length > 0) {
      const defectCodeList = formNgData.defectCodes.split(',');
      formNgData.defectCodeList = defectCodeList.map((item) => {
        return {
          value: item,
          label: item,
        };
      });
    }
    //  else {
    //   MessagePlugin.error(t('mitemIncomingInspection.缺陷类型不能为空'));
    //   return;
    // }
    // if (_.isEmpty(formNgData.iqcDefectCategoryCode)) {
    //   MessagePlugin.error(t('mitemIncomingInspection.缺陷等级不能为空'));
    //   return;
    // }
    if (_.isEmpty(formNgData.iqcHandleMethodCode)) {
      MessagePlugin.error(t('mitemIncomingInspection.物料处理意见不能为空'));
      return;
    }
    // if (_.isEmpty(formNgData.iqcResponsibilityCode)) {
    //   MessagePlugin.error(t('mitemIncomingInspection.责任判定不能为空'));
    //   return;
    // }
    // if (_.isEmpty(formNgData.iqcCorrectCode)) {
    //   MessagePlugin.error(t('mitemIncomingInspection.供方整改意见不能为空'));
    //   return;
    // }
    // if (_.isEmpty(formNgData.personResponsibilityId)) {
    //   MessagePlugin.error(t('mitemIncomingInspection.跟进人不能为空'));
    //   return;
    // }

    formNgData.isStartImprove = formNgData.isPdca ? 1 : 0;
    await apiQuality.iqcInspect.submitIqcInspect({
      iqcBillNo: formData.iqcBillNo,
      billNoList: formData.billNoList,
      mitemId: formData.mitemId,
      mitemCode: formData.mitemCode,
      mitemName: formData.mitemName,
      mitemDesc: formData.mitemDesc,
      mitemCategoryId: formData.mitemCategoryId,
      mitemCategoryCode: formData.mitemCategoryCode,
      mitemCategoryName: formData.mitemCategoryName,
      pickQty: Number(formData.pickQty),
      okQty: formData.okQty,
      ngQty: formData.ngQty,
      supplierId: formData.supplierId,
      supplierCode: formData.supplierCode,
      supplierName: formData.supplierName,
      inspectionStringency: formData.inspectionStringency,
      iqcInspectStdList: mainTableData.value,
      iqcInspectNg: formNgData,
    });
    MessagePlugin.success(t('common.message.saveSuccess'));
    Emit('form-close-event');
    formVisible.value = false;
  } catch (e) {
    console.log(e);
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
  // 清除所有对象的值
  Object.keys(formNgData).forEach((key) => {
    if (_.isArray(formNgData[key])) {
      formNgData[key] = [];
    } else if (_.isNumber(formNgData[key])) {
      formNgData[key] = 0;
    } else if (_.isBoolean(formNgData[key])) {
      formNgData[key] = true;
    } else {
      formNgData[key] = '';
    }
  });
};
const showForm = async (edit, row, tableData) => {
  formVisible.value = true;
  reset();
  formData.billNoList = row.billNoList;
  formData.billNoStr = row.billNoStr;
  formData.iqcBillNo = row.iqcBillNo;
  formData.mitemId = row.mitemId;
  formData.mitemCode = row.mitemCode;
  formData.mitemName = row.mitemName;
  formData.mitemDesc = row.mitemDesc;
  formData.mitemCategoryId = row.mitemCategoryId;
  formData.mitemCategoryCode = row.mitemCategoryCode;
  formData.mitemCategoryName = row.mitemCategoryName;
  formData.pickQty = row.inspectQty;
  formData.supplierId = row.supplierId;
  formData.supplierCode = row.supplierCode;
  formData.supplierName = row.supplierName;
  formData.inspectionStringency = row.inspectionStringency;
  formData.inspectionStringencyName = row.inspectionStringencyName;
  formData.inspectStdName = row.inspectStdName;
  formData.okQty = row.okQty;
  formData.ngQty = row.ngQty;
  mainTableData.value = tableData.value;
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
    iqcHandleMethodOption.value.push({
      value: item.paramCode,
      label: item.paramName,
    });
  });
};

const iqcDefectCategoryOption = ref([]);
const getIqcDefectCategory = async () => {
  iqcDefectCategoryOption.value = [];
  const data = await apiMain.param.getParamListByGroupCode({
    parmGroupCode: 'Q_IQC_UNQUALIFY_CATEGORY',
  });

  data.forEach((item) => {
    iqcDefectCategoryOption.value.push({
      value: item.paramCode,
      label: item.paramName,
    });
  });
};

const iqcResponsibilityOption = ref([]);
const getIqcResponsibilityOption = async () => {
  iqcResponsibilityOption.value = [];
  const data = await apiMain.param.getParamListByGroupCode({
    parmGroupCode: 'Q_IQC_RESPONSIBILITY',
  });

  data.forEach((item) => {
    iqcResponsibilityOption.value.push({
      value: item.paramCode,
      label: item.paramName,
    });
  });
};

const iqcCorrectOpinion = ref([]);
const getIqcCorrectOpinionOption = async () => {
  iqcCorrectOpinion.value = [];
  const data = await apiMain.param.getParamListByGroupCode({
    parmGroupCode: 'Q_IQC_CORRECT_OPINION',
  });

  data.forEach((item) => {
    iqcCorrectOpinion.value.push({
      value: item.paramCode,
      label: item.paramName,
    });
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
