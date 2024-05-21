<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('mitemRecheck.物料复检')"
    :width="isAdd ? '70%' : '98%'"
    placement="top"
    top="56px"
    :cancel-btn="
      isInput
        ? {
            content: t('mitemRecheck.取消'),
          }
        : null
    "
    :confirm-btn="
      isInput
        ? {
            content: t('mitemRecheck.提交'),
            theme: 'primary',
          }
        : null
    "
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
  >
    <cmp-container :full="true" :ghost="true">
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-descriptions :title="t('mitemRecheck.复检单号：') + formInspectData.recheckBillNo" :column="4" size="large">
          <t-descriptions-item :label="t('mitemRecheck.复检类型')">
            <t-select
              v-if="isAdd"
              v-model="formInspectData.recheckType"
              :options="recheckTypeOption"
              @change="recheckTypeChange"
            />
            <div v-else>{{ formInspectData.recheckTypeName }}</div>
          </t-descriptions-item>
          <t-descriptions-item :label="t('mitemRecheck.来源检验单')">
            <bcmp-select-business
              v-if="formInspectData.recheckType === 'EXCEPTION' && isAdd"
              ref="recheckTypeRef"
              v-model="formInspectData.iqcBillNo"
              :select-txt="formInspectData.iqcBillNo"
              type="iqcBillInfo"
              :show-title="false"
              @selection-change="onIqcBillNoSelectionChange"
            />
            <div v-else>{{ formInspectData.iqcBillNo }}</div>
          </t-descriptions-item>
          <t-descriptions-item :label="t('mitemRecheck.物料编码')">
            <bcmp-select-business
              v-if="formInspectData.recheckType !== 'EXCEPTION' && isAdd"
              v-model="formInspectData.mitemId"
              :select-txt="formInspectData.mitemCode"
              type="mitem"
              :show-title="false"
              label-field="mitemCode"
              @selection-change="onMitemSelectionChange"
            />
            <div v-else>{{ formInspectData.mitemCode }}</div>
          </t-descriptions-item>
          <t-descriptions-item :label="t('mitemRecheck.物料名')">
            <div class="div_break_word">
              {{ formInspectData.mitemName }}
            </div>
          </t-descriptions-item>
          <t-descriptions-item :label="t('mitemRecheck.供应商编码')">
            <bcmp-select-business
              v-if="formInspectData.recheckType !== 'EXCEPTION' && isAdd"
              v-model="formInspectData.supplierCode"
              :select-txt="formInspectData.supplierCode"
              type="mitemInSupplier"
              :show-title="false"
              :parent-id="formInspectData.mitemId"
              label-field="supplierCode"
              @selection-change="onSupplierSelectionChange"
            />
            <div v-else>{{ formInspectData.supplierCode }}</div>
          </t-descriptions-item>
          <t-descriptions-item :label="t('mitemRecheck.供应商名称')">
            {{ formInspectData.supplierName }}
          </t-descriptions-item>
          <t-descriptions-item :label="t('mitemRecheck.批量')">
            <t-input-number v-if="isAdd" v-model="formInspectData.inspectQty" @change="inspectQtyChange" />
            <div v-else>{{ formInspectData.inspectQty }}</div>
          </t-descriptions-item>
          <t-descriptions-item>
            <!-- <template #label>
              <t-link v-if="isAdd" theme="primary" @click="linkLoadTableStd">{{
                t('mitemRecheck.加载检验项目')
              }}</t-link>
            </template> -->
          </t-descriptions-item>
          <t-descriptions-item :label="t('mitemRecheck.复检原因')">
            <t-textarea v-model="formInspectData.recheckReason" clearable :disabled="!isInput" />
          </t-descriptions-item>
        </t-descriptions>
      </cmp-card>
      <cmp-card v-if="!isAdd" :span="12" :ghost="false" :bordered="true">
        <t-tabs :model-value="selectTabValue" @change="tabsChange">
          <t-tab-panel value="tab1" :label="t('mitemRecheck.全部')" :destroy-on-hide="false">
            <cmp-table
              row-key="id"
              :hover="false"
              :stript="false"
              :resizable="true"
              :show-toolbar="false"
              :show-pagination="false"
              :table-column="tableColumns"
              active-row-type="single"
              :table-data="tableData"
              :loading="loading"
              @select-change="tableSelectedChange"
              @refresh="loadTable"
            >
              <template #title> </template>

              <template #button> </template>

              <template #files="rowData">
                <t-space>
                  <t-link theme="primary" @click="onShowFiles(rowData)">{{ t('mitemRecheck.查看') }}</t-link>
                </t-space>
              </template>

              <template #op="rowData">
                <t-space>
                  <t-link theme="primary" @click="showUplaodImg(rowData)">{{ t('mitemRecheck.上传照片') }}</t-link>
                </t-space>
              </template>

              <template #inspectResult="{ row }">
                <t-radio-group v-model="row.inspectResult" :disabled="!isInput">
                  <t-radio value="OK">合格</t-radio>
                  <t-radio value="NG">不合格</t-radio>
                </t-radio-group>
              </template>

              <template #measureOp="{ row }">
                <t-link v-if="row.sampleQty > 0" theme="primary" @click="onShowMeasureDialog(row)">
                  <div v-if="isInput">{{ t('mitemRecheck.填写') }}</div>
                  <div v-else>{{ t('mitemRecheck.查看') }}</div>
                </t-link>
              </template>

              <template #ngQty="{ row }">
                <t-input v-if="isInput" v-model="row.ngQty" />
                <div v-else>{{ row.ngQty }}</div>
              </template>

              <template #ngReason="{ row }">
                <t-input v-if="isInput" v-model="row.ngReason" />
                <div v-else>{{ row.ngReason }}</div>
              </template>
            </cmp-table>
          </t-tab-panel>
          <t-tab-panel value="tab2" :label="t('mitemRecheck.计数')" :destroy-on-hide="false">
            <cmp-table
              row-key="id"
              :hover="false"
              :stript="false"
              :resizable="true"
              :show-toolbar="false"
              :show-pagination="false"
              :table-column="tableColumns"
              active-row-type="single"
              :table-data="tableDataCount"
              :loading="loading"
            >
              <template #title> </template>

              <template #button> </template>

              <template #files="rowData">
                <t-space>
                  <t-link theme="primary" @click="onShowFiles(rowData)">{{ t('mitemRecheck.查看') }}</t-link>
                </t-space>
              </template>

              <template #op="rowData">
                <t-space>
                  <t-link theme="primary" @click="showUplaodImg(rowData)">{{ t('mitemRecheck.上传照片') }}</t-link>
                </t-space>
              </template>

              <template #inspectResult="{ row }">
                <t-radio-group v-model="row.inspectResult" :disabled="!isInput">
                  <t-radio value="OK">合格</t-radio>
                  <t-radio value="NG">不合格</t-radio>
                </t-radio-group>
              </template>

              <template #measureOp="{ row }">
                <t-link v-if="row.sampleQty > 0" theme="primary" @click="onShowMeasureDialog(row)">
                  <div v-if="isAdd">{{ t('mitemRecheck.填写') }}</div>
                  <div v-else>{{ t('mitemRecheck.查看') }}</div>
                </t-link>
              </template>

              <template #ngQty="{ row }">
                <t-input v-if="isAdd" v-model="row.ngQty" />
                <div v-else>{{ row.ngQty }}</div>
              </template>

              <template #ngReason="{ row }">
                <t-input v-if="isAdd" v-model="row.ngReason" />
                <div v-else>{{ row.ngReason }}</div>
              </template>
            </cmp-table>
          </t-tab-panel>
          <t-tab-panel value="tab3" :label="t('mitemRecheck.计量')" :destroy-on-hide="false">
            <cmp-table
              row-key="id"
              :hover="false"
              :stript="false"
              :resizable="true"
              :show-toolbar="false"
              :show-pagination="false"
              :table-column="tableColumns"
              active-row-type="single"
              :table-data="tableDataCquantitative"
              :loading="loading"
            >
              <template #title> </template>

              <template #button> </template>

              <template #files="rowData">
                <t-space>
                  <t-link theme="primary" @click="onShowFiles(rowData)">{{ t('mitemRecheck.查看') }}</t-link>
                </t-space>
              </template>

              <template #op="rowData">
                <t-space>
                  <t-link theme="primary" @click="showUplaodImg(rowData)">{{ t('mitemRecheck.上传照片') }}</t-link>
                </t-space>
              </template>

              <template #inspectResult="{ row }">
                <t-radio-group v-model="row.inspectResult" :disabled="!isInput">
                  <t-radio value="OK">合格</t-radio>
                  <t-radio value="NG">不合格</t-radio>
                </t-radio-group>
              </template>

              <template #measureOp="{ row }">
                <t-link v-if="row.sampleQty > 0" theme="primary" @click="onShowMeasureDialog(row)">
                  <div v-if="isAdd">{{ t('mitemRecheck.填写') }}</div>
                  <div v-else>{{ t('mitemRecheck.查看') }}</div>
                </t-link>
              </template>

              <template #ngQty="{ row }">
                <t-input v-if="isAdd" v-model="row.ngQty" />
                <div v-else>{{ row.ngQty }}</div>
              </template>

              <template #ngReason="{ row }">
                <t-input v-if="isAdd" v-model="row.ngReason" />
                <div v-else>{{ row.ngReason }}</div>
              </template>
            </cmp-table>
          </t-tab-panel>
        </t-tabs>
      </cmp-card>
    </cmp-container>
  </t-dialog>

  <!--弹窗-->
  <formMeasure ref="formMeasureRef" @parent-confirm-event="parentConfirm" />
  <formNg ref="formNgRef" @form-close-event="onFormCloseDialog" />

  <cmp-files-upload
    ref="formFilesRef"
    :upload-path="uploadPathType"
    @upload-success="uploadSuccess"
    @delete-success="deleteSuccess"
    @batch-delete-success="batchDeleteSuccess"
  />
</template>
<script lang="ts" setup>
import _ from 'lodash';
import { FormInstanceFunctions, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { reactive, Ref, ref, watch } from 'vue';

import { api as apiQuality } from '@/api/quality';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import CmpFilesUpload from '@/components/cmp-files-upload/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import utils from '@/utils/common';

import formMeasure from './formMeasure.vue';
import formNg from './formNg.vue';
import { useLang } from './lang';

const { t } = useLang();
const Emit = defineEmits(['parent-refresh-event', 'form-close-event']);

const formVisible = ref(false);

const formRef: Ref<FormInstanceFunctions> = ref(null);
const formMeasureRef = ref(null);
const formNgRef = ref(null);
const recheckTypeRef = ref(null);

const selectTabValue = ref('tab1');
const selectIqcInspectRecheckDtlId = ref(null);

const isAdd = ref(true); // 是否新增
const isInput = ref(false); // 是否能录入信息
const uploadPathType = ref('IqcInspectRecheck');
const formInspectData = reactive({
  iqcBillNo: '',
  recheckBillNo: '',
  billNoStr: '',
  billNoList: [],
  mitemId: '',
  mitemCode: '',
  mitemName: '',
  mitemDesc: '',
  mitemCategoryId: '',
  mitemCategoryCode: '',
  mitemCategoryName: '',
  inspectQty: 0,
  supplierId: '',
  supplierCode: '',
  supplierName: '',
  inspectionStringency: '',
  inspectionStringencyName: '',
  inspectStdName: '',
  recheckType: '',
  recheckTypeName: '',
  recheckReason: '',
});

const { loading } = useLoading();

const tableSelectedRowKeys = ref([]);
const tableData = ref([]);
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  // {
  //   colKey: 'row-select',
  //   type: 'multiple',
  //   width: 50,
  // },
  { title: t('mitemRecheck.项目类别'), width: 100, colKey: 'itemCategoryName' },
  { title: t('mitemRecheck.检验内容'), width: 160, colKey: 'itemName' },
  { title: t('mitemRecheck.技术要求'), width: 160, colKey: 'technicalRequest' },
  { title: t('mitemRecheck.项目特性'), width: 100, colKey: 'characteristicsName' },
  { title: t('mitemRecheck.检验工具'), width: 100, colKey: 'inspectTool' },
  { title: t('mitemRecheck.样本数'), width: 100, colKey: 'sampleQty' },
  { title: 'AC/RE', width: 100, colKey: 'acRe' },
  { title: t('mitemRecheck.检验结果'), width: 200, colKey: 'inspectResult' },
  { title: t('mitemRecheck.测量值'), width: 100, colKey: 'measureOp' },
  { title: t('mitemRecheck.不良数'), width: 120, colKey: 'ngQty' },
  { title: t('mitemRecheck.不良描述'), width: 200, colKey: 'ngReason' },
  { title: t('mitemRecheck.抽样方案'), width: 100, colKey: 'samplingStandardType' },
  { title: t('mitemRecheck.检验水平'), width: 160, colKey: 'inspectLevelName' },
  { title: t('mitemRecheck.不合格分类'), width: 100, colKey: 'unqualifyCategoryName' },
  { title: t('mitemRecheck.是否CTQ'), width: 100, colKey: 'isCtqName' },
  { title: t('mitemRecheck.检验依据'), width: 160, colKey: 'inspectBasis' },
  {
    title: t('mitemRecheck.附件'),
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'files',
  },
  {
    title: t('mitemRecheck.操作'),
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'op',
  },
];

const tableDataCount = ref([]);
const tableDataCquantitative = ref([]);

watch(
  () => formInspectData.recheckType,
  (newValue) => {
    if (newValue === 'EXCEPTION') {
      formInspectData.recheckTypeName = t('mitemRecheck.异常复检');
    } else if (newValue === 'OVERDUE') {
      formInspectData.recheckTypeName = t('mitemRecheck.超期复检');
    } else if (newValue === 'RECHECK') {
      formInspectData.recheckTypeName = t('mitemRecheck.常规复检');
    }
  },
);
const recheckTypeOption = ref([]);
const getRecheckTypeOption = async () => {
  recheckTypeOption.value = [];
  recheckTypeOption.value.push({ value: 'EXCEPTION', label: t('mitemRecheck.异常复检') });
  recheckTypeOption.value.push({ value: 'OVERDUE', label: t('mitemRecheck.超期复检') });
  recheckTypeOption.value.push({ value: 'RECHECK', label: t('mitemRecheck.常规复检') });
};

const tableSelectedChange = (value: any[]) => {
  tableSelectedRowKeys.value = value;
};
const onConfirmForm = async () => {
  try {
    if (_.isEmpty(formInspectData.recheckType)) {
      MessagePlugin.error(t('mitemRecheck.复检类型不能为空'));
      return;
    }

    if (!isAdd.value) {
      for (let index = 0; index < tableData.value.length; index++) {
        const item = tableData.value[index];
        if (item.inspectResult === 'NG') {
          if (item.characteristics === 'COUNT' && _.isEmpty(item.ngQty)) {
            MessagePlugin.error(t('mitemRecheck.检验结果不合格时,请填写不良数'));
            return;
          }

          if (item.characteristics === 'QUANTITATIVE') {
            if (_.isEmpty(item.ngQty) || item.ngQty === '') {
              MessagePlugin.error(t('mitemRecheck.检验结果不合格时,请填写不良数'));
              return;
            }
            if (item.ngQty > item.sampleQty) {
              MessagePlugin.error(t('mitemRecheck.不良数不能大于样本数'));
              return;
            }
            if (item.ngQty <= 0) {
              MessagePlugin.error(t('mitemRecheck.请输入正确不良数'));
              return;
            }
          }
        }
      }
    }
    const ngList = tableData.value.filter((n) => n.inspectResult === 'NG');
    if (!isAdd.value && ngList.length > 0) {
      const { showForm } = formNgRef.value;
      showForm(false, formInspectData, tableData);
    } else {
      utils.loadingPluginFullScreen(true);

      await apiQuality.iqcInspectRecheck.submitIqcInspectRecheck({
        iqcBillNo: formInspectData.iqcBillNo,
        recheckBillNo: formInspectData.recheckBillNo,
        iqcBillNoList: [],
        mitemId: formInspectData.mitemId,
        mitemCode: formInspectData.mitemCode,
        mitemName: formInspectData.mitemName,
        mitemDesc: formInspectData.mitemDesc,
        mitemCategoryId: formInspectData.mitemCategoryId,
        mitemCategoryCode: formInspectData.mitemCategoryCode,
        mitemCategoryName: formInspectData.mitemCategoryName,
        inspectQty: Number(formInspectData.inspectQty),
        supplierId: formInspectData.supplierId,
        supplierCode: formInspectData.supplierCode,
        supplierName: formInspectData.supplierName,
        inspectionStringency: formInspectData.inspectionStringency,
        recheckType: formInspectData.recheckType,
        recheckReason: formInspectData.recheckReason,
        iqcInspectStdList: tableData.value,
        isAdd: isAdd.value,
        // iqcInspectNg: null,
      });

      Emit('parent-refresh-event');
      formVisible.value = false;
    }
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
  }
};
const tabsChange = async (tabValue) => {
  selectTabValue.value = tabValue;
};
const getBillNo = async () => {
  try {
    const recheckBillNo = await apiQuality.billSeq.getBillNo({
      prefix: 'IQCFJ',
    });
    formInspectData.recheckBillNo = recheckBillNo;
  } catch (e) {
    console.log(e);
  }
};

const onShowFiles = async (rowData) => {
  try {
    const list = await apiQuality.iqcInspectStd.getStdDtlAttachList({ id: rowData.row.iqcInspectStdDtlId });
    const { showForm } = formFilesRef.value;

    await showForm(!isInput.value, list);
  } catch (e) {
    console.log(e);
  }
};
const loadTable = async () => {
  try {
    const res = await apiQuality.iqcInspectRecheck.getIqcRecheckDtlInfoByBillVo({
      recheckBillNo: formInspectData.recheckBillNo,
    });
    tableData.value = res.list;
    tableDataCount.value = res.list.filter((item) => item.characteristics === 'COUNT');
    tableDataCquantitative.value = res.list.filter((item) => item.characteristics === 'QUANTITATIVE');

    if (res.list.length > 0) {
      formInspectData.inspectStdName = res.list[0].inspectStdName;
    } else {
      formInspectData.inspectStdName = '';
    }
  } catch (e) {
    console.log(e);
  }
};
const loadTableStd = async () => {
  try {
    utils.loadingPluginFullScreen(true);
    const list = await apiQuality.iqcInspectStdDtl.getStdDtlListByMitem({
      // iqcBillNo: formInspectData.iqcBillNo,
      mitemCategoryId: formInspectData.mitemCategoryId,
      mitemId: formInspectData.mitemId,
      pickQty: `${formInspectData.inspectQty}`,
      inspectionStringency: formInspectData.inspectionStringency,
    });
    tableData.value = list;
    tableDataCount.value = list.filter((item) => item.characteristics === 'COUNT');
    tableDataCquantitative.value = list.filter((item) => item.characteristics === 'QUANTITATIVE');

    if (list.length > 0) {
      formInspectData.inspectStdName = list[0].inspectStdName;
    } else {
      formInspectData.inspectStdName = '';
    }
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
  }
};
// const linkLoadTableStd = async () => {
//   if (_.isEmpty(formInspectData.recheckType)) {
//     MessagePlugin.error(t('mitemRecheck.请选择复检类型'));
//     return;
//   }
//   if (_.isEmpty(formInspectData.mitemId)) {
//     MessagePlugin.error(t('mitemRecheck.请选择物料'));
//     return;
//   }

//   if (_.isEmpty(formInspectData.supplierId)) {
//     MessagePlugin.error(t('mitemRecheck.请选择供应商'));
//     return;
//   }
//   if (formInspectData.inspectQty <= 0) {
//     MessagePlugin.error(t('mitemRecheck.请输入有效批量'));
//     return;
//   }
//   await loadTableStd();
//   if (tableData.value.length === 0) {
//     MessagePlugin.error(t('mitemRecheck.未找到检验项目'));
//   }
// };
const reset = async () => {
  if (_.isEmpty(formInspectData.recheckBillNo)) {
    getBillNo();
  }

  getRecheckTypeOption();
  tableData.value = [];
  tableDataCount.value = [];
  tableDataCquantitative.value = [];

  utils.reset(formInspectData);
};
const showFJForm = async (add, input, row) => {
  formVisible.value = true;
  isAdd.value = add;
  isInput.value = input;
  formInspectData.recheckBillNo = row === null ? '' : row.recheckBillNo;

  reset();

  if (row !== null) {
    Object.assign(formInspectData, row);

    formInspectData.billNoList.push({
      billNo: row.recheckBillNo,
      erpLineNo: row.erpLineNo,
      billNoDtlId: row.id,
    });
    formInspectData.billNoStr = formInspectData.billNoList.map((n) => n.billNo).join(',');

    if (_.isEmpty(formInspectData.recheckBillNo)) {
      await loadTableStd();
    } else {
      await loadTable();
    }
  }
};

const onShowMeasureDialog = async (row) => {
  const { showForm } = formMeasureRef.value;
  await showForm(isInput, row.measureList);
};
const onFormCloseDialog = async () => {
  formVisible.value = false;
  Emit('form-close-event');
};
const parentConfirm = async (measureList, isOK) => {
  if (!_.isEmpty(measureList)) {
    const { stdDtlId } = measureList[0];
    const rowData = tableData.value.find((n) => n.iqcInspectStdDtlId === stdDtlId);
    rowData.measureList = measureList;
    rowData.inspectResult = isOK ? 'OK' : 'NG';
  }
};
const clearFormData = async () => {
  formInspectData.iqcBillNo = '';
  formInspectData.mitemId = '';
  formInspectData.mitemCode = '';
  formInspectData.mitemName = '';
  formInspectData.inspectQty = 0;
  formInspectData.supplierId = '';
  formInspectData.supplierCode = '';
  formInspectData.supplierName = '';
  formInspectData.mitemCategoryId = '';
  formInspectData.mitemCategoryCode = '';
  formInspectData.mitemCategoryName = '';
  formInspectData.inspectionStringency = '';
  formInspectData.inspectStdName = '';

  tableData.value = [];
  tableDataCount.value = [];
  tableDataCquantitative.value = [];
};
const onIqcBillNoSelectionChange = async () => {
  // console.log('onIqcBillNoSelectionChange 更新');
  try {
    if (!_.isEmpty(formInspectData.iqcBillNo)) {
      const model = await apiQuality.iqcInspect.getIqcBillInfo({
        iqcBillNo: formInspectData.iqcBillNo,
      });
      if (!_.isEmpty(model)) {
        formInspectData.mitemId = model.mitemId;
        formInspectData.mitemCode = model.mitemCode;
        formInspectData.mitemName = model.mitemName;
        formInspectData.inspectQty = model.inspectQty;
        formInspectData.supplierId = model.supplierId;
        formInspectData.supplierCode = model.supplierCode;
        formInspectData.supplierName = model.supplierName;
        formInspectData.mitemCategoryId = model.mitemCategoryId;
        formInspectData.mitemCategoryCode = model.mitemCategoryCode;
        formInspectData.mitemCategoryName = model.mitemCategoryName;
        formInspectData.inspectionStringency = model.inspectionStringency;

        // await loadTableStd();
      }
    } else {
      clearFormData();
    }
  } catch (e) {
    console.log(e);
  }
};
const onMitemSelectionChange = async (data) => {
  try {
    formInspectData.mitemCode = data.mitemCode;
    formInspectData.mitemName = data.mitemName;
    formInspectData.mitemCategoryId = data.mitemCategoryId;
    formInspectData.mitemCategoryCode = data.mitemCategoryCode;
    formInspectData.mitemCategoryName = data.mitemCategoryName;
    formInspectData.supplierId = '';
    formInspectData.supplierCode = '';
    formInspectData.supplierName = '';
  } catch (e) {
    console.log(e);
  }
};
const onSupplierSelectionChange = async (data) => {
  try {
    formInspectData.supplierId = data.supplierId;
    formInspectData.supplierCode = data.supplierCode;
    formInspectData.supplierName = data.supplierName;
    formInspectData.inspectionStringency = data.inspectionStringency;
  } catch (e) {
    console.log(e);
  }
};

const inspectQtyChange = async () => {
  tableData.value = [];
  tableDataCount.value = [];
  tableDataCquantitative.value = [];
};
const recheckTypeChange = async () => {
  clearFormData();
};

// begin 文件上传
const formFilesRef = ref(null);
const showUplaodImg = async (rowData) => {
  selectIqcInspectRecheckDtlId.value = rowData.row.iqcInspectRecheckDtlId;

  try {
    if (!_.isEmpty(selectIqcInspectRecheckDtlId.value)) {
      const list = await apiQuality.iqcInspectRecheckDtlFile.getIqcInspectRecheckDtlFileList({
        iqcInspectDtlId: selectIqcInspectRecheckDtlId.value,
        uploadPath: uploadPathType.value,
      });
      rowData.row.fileList = list;
    }
    const { showForm } = formFilesRef.value;
    await showForm(!isInput.value, rowData.row.fileList);
  } catch (e) {
    console.log(e);
  }
};
const uploadSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectIqcInspectRecheckDtlId.value)) {
      await apiQuality.iqcInspectRecheckDtlFile.addIqcInspectRecheckDtlFile({
        iqcInspectRecheckDtlId: selectIqcInspectRecheckDtlId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success(t('mitemRecheck.文件上传成功'));
    }
  } catch (e) {
    console.log(e);
  }
};
const deleteSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectIqcInspectRecheckDtlId.value)) {
      await apiQuality.iqcInspectRecheckDtlFile.deleteIqcInspectRecheckDtlFile({
        iqcInspectRecheckDtlId: selectIqcInspectRecheckDtlId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success(t('mitemRecheck.文件删除成功'));
    }
  } catch (e) {
    console.log(e);
  }
};
const batchDeleteSuccess = async (files: AddFileType[]) => {
  try {
    if (!_.isEmpty(selectIqcInspectRecheckDtlId.value)) {
      const deleteList = [];

      files.forEach((n) =>
        deleteList.push({
          iqcInspectRecheckDtlId: selectIqcInspectRecheckDtlId.value,
          fileName: n.fileName,
        }),
      );
      await apiQuality.iqcInspectRecheckDtlFile.deleteBatchIqcInspectRecheckDtlFile(deleteList);
      MessagePlugin.success(t('mitemRecheck.文件删除成功'));
    }
  } catch (e) {
    console.log(e);
  }
};
// end 文件上传

defineExpose({
  form: formRef,
  reset,
  showFJForm,
  loadTable,
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
  -webkit-line-clamp: 2;

  /* 允许的最大行数 */
  -webkit-box-orient: vertical;

  /* 设置为垂直排列 */
  overflow: hidden;

  /* 超出部分隐藏 */
  text-overflow: ellipsis;

  /* 文本溢出时显示省略号 */
  word-wrap: break-word;

  /* 强制换行，防止单词过长导致溢出 */
  line-height: 1.5em;

  /* 行高，按需调整 */
  max-height: 3em;

  /* 根据行高计算最多显示两行的高度 */
}

.tabs_right_ops {
  display: flex;
  justify-content: space-between;

  /* 水平间距均匀分配 */

  /* 或者使用下面的方式实现间距 */

  /* justify-content: space-around; */

  /* 或者让子元素紧贴在一起 */
  justify-content: flex-end;
}
</style>
