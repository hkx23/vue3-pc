<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('mitemIncomingInspection.物料入厂检验')"
    width="98%"
    placement="top"
    top="56px"
    :cancel-btn="
      isEdit
        ? {
            content: t('mitemIncomingInspection.取消'),
          }
        : null
    "
    :confirm-btn="
      isEdit
        ? {
            content: t('mitemIncomingInspection.提交'),
            theme: 'primary',
          }
        : null
    "
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
            formData.mitemCategoryCode
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
            formData.inspectQty
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
        </t-descriptions>
      </cmp-card>
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-tabs :model-value="selectTabValue" @change="tabsChange">
          <template #action>
            <div class="tabs_right_ops">
              <t-checkbox :label="t('mitemIncomingInspection.只显示不合格')" style="width: 170px" />
              <t-input :placeholder="t('mitemIncomingInspection.请输入搜索关键字')" />
            </div>
          </template>
          <t-tab-panel value="tab1" :label="t('mitemIncomingInspection.全部')" :destroy-on-hide="false">
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
                  <t-link theme="primary" @click="onShowFiles(rowData)">{{ t('mitemIncomingInspection.查看') }}</t-link>
                </t-space>
              </template>
              <template #op="rowData">
                <t-space>
                  <t-link theme="primary" @click="showUplaodImg(rowData)">{{
                    t('mitemIncomingInspection.上传照片')
                  }}</t-link>
                </t-space>
              </template>
              <template #inspectResultSwitch="{ row }">
                <t-switch v-model="row.inspectResultSwitch" size="large" :disabled="!isEdit" />
              </template>
              <template #measureOp="{ row }">
                <t-link v-if="row.sampleQty > 0" theme="primary" @click="onShowMeasureDialog(row)">
                  <div v-if="isEdit">{{ t('mitemIncomingInspection.填写') }}</div>
                  <div v-else>{{ t('mitemIncomingInspection.查看') }}</div>
                </t-link>
              </template>
              <template #ngQty="{ row }">
                <t-input v-if="isEdit" v-model="row.ngQty" />
                <div v-else>{{ row.ngQty }}</div>
              </template>
              <template #ngReason="{ row }">
                <t-input v-if="isEdit" v-model="row.ngReason" />
                <div v-else>{{ row.ngReason }}</div>
              </template>
            </cmp-table>
          </t-tab-panel>
          <t-tab-panel value="tab2" :label="t('mitemIncomingInspection.计数')" :destroy-on-hide="false">
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
                  <t-link theme="primary" @click="onShowFiles(rowData)">{{ t('mitemIncomingInspection.查看') }}</t-link>
                </t-space>
              </template>
              <template #op="rowData">
                <t-space>
                  <t-link theme="primary" @click="showUplaodImg(rowData)">{{
                    t('mitemIncomingInspection.上传照片')
                  }}</t-link>
                </t-space>
              </template>
              <template #inspectResultSwitch="{ row }">
                <t-switch v-model="row.inspectResultSwitch" size="large" :disabled="!isEdit" />
              </template>
              <template #measureOp="{ row }">
                <t-link v-if="row.sampleQty > 0" theme="primary" @click="onShowMeasureDialog(row)">
                  <div v-if="isEdit">{{ t('mitemIncomingInspection.填写') }}</div>
                  <div v-else>{{ t('mitemIncomingInspection.查看') }}</div>
                </t-link>
              </template>
              <template #ngQty="{ row }">
                <t-input v-if="isEdit" v-model="row.ngQty" />
                <div v-else>{{ row.ngQty }}</div>
              </template>
              <template #ngReason="{ row }">
                <t-input v-if="isEdit" v-model="row.ngReason" />
                <div v-else>{{ row.ngReason }}</div>
              </template>
            </cmp-table>
          </t-tab-panel>
          <t-tab-panel value="tab3" :label="t('mitemIncomingInspection.计量')" :destroy-on-hide="false">
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
                  <t-link theme="primary" @click="onShowFiles(rowData)">{{ t('mitemIncomingInspection.查看') }}</t-link>
                </t-space>
              </template>
              <template #op="rowData">
                <t-space>
                  <t-link theme="primary" @click="showUplaodImg(rowData)">{{
                    t('mitemIncomingInspection.上传照片')
                  }}</t-link>
                </t-space>
              </template>
              <template #inspectResultSwitch="{ row }">
                <t-switch v-model="row.inspectResultSwitch" size="large" :disabled="!isEdit" />
              </template>
              <template #measureOp="{ row }">
                <t-link v-if="row.sampleQty > 0" theme="primary" @click="onShowMeasureDialog(row)">
                  <div v-if="isEdit">{{ t('mitemIncomingInspection.填写') }}</div>
                  <div v-else>{{ t('mitemIncomingInspection.查看') }}</div>
                </t-link>
              </template>
              <template #ngQty="{ row }">
                <t-input v-if="isEdit" v-model="row.ngQty" />
                <div v-else>{{ row.ngQty }}</div>
              </template>
              <template #ngReason="{ row }">
                <t-input v-if="isEdit" v-model="row.ngReason" />
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
    upload-path="IqcInspect"
    @upload-success="uploadSuccess"
    @delete-success="deleteSuccess"
    @batch-delete-success="batchDeleteSuccess"
  />
</template>
<script lang="ts" setup>
import _ from 'lodash';
import { FormInstanceFunctions, LoadingPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { reactive, Ref, ref } from 'vue';

import { api as apiQuality } from '@/api/quality';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import CmpFilesUpload from '@/components/cmp-files-upload/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';

import formMeasure from './formMeasure.vue';
import formNg from './formNg.vue';
import { useLang } from './lang';

const { t } = useLang();
const Emit = defineEmits(['parent-refresh-event', 'form-close-event']);

const formVisible = ref(false);

const formRef: Ref<FormInstanceFunctions> = ref(null);
const formMeasureRef = ref(null);
const formNgRef = ref(null);

const selectTabValue = ref('tab1');
const selectIqcInspectDtlId = ref(null);

const isEdit = ref(true); // 是否可编辑
const isLoad = ref(false); // 是否加载单据数据

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
  inspectQty: 0,
  supplierId: '',
  supplierCode: '',
  supplierName: '',
  inspectionStringency: '',
  inspectionStringencyName: '',
  inspectStdName: '',
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
  { title: t('mitemIncomingInspection.项目类别'), width: 100, colKey: 'itemCategory' },
  { title: t('mitemIncomingInspection.检验内容'), width: 160, colKey: 'itemName' },
  { title: t('mitemIncomingInspection.技术要求'), width: 160, colKey: 'technicalRequest' },
  { title: t('mitemIncomingInspection.项目特性'), width: 100, colKey: 'characteristicsName' },
  { title: t('mitemIncomingInspection.检验工具'), width: 100, colKey: 'inspectTool' },
  { title: t('mitemIncomingInspection.样本数'), width: 100, colKey: 'sampleQty' },
  { title: 'AC/RE', width: 100, colKey: 'acRe' },
  { title: t('mitemIncomingInspection.检验结果'), width: 100, colKey: 'inspectResultSwitch' },
  { title: t('mitemIncomingInspection.测量值'), width: 100, colKey: 'measureOp' },
  { title: t('mitemIncomingInspection.不良数'), width: 120, colKey: 'ngQty' },
  { title: t('mitemIncomingInspection.不良描述'), width: 200, colKey: 'ngReason' },
  { title: t('mitemIncomingInspection.抽样方案'), width: 100, colKey: 'samplingStandardType' },
  { title: t('mitemIncomingInspection.检验水平'), width: 160, colKey: 'inspectLevelName' },
  { title: t('mitemIncomingInspection.不合格分类'), width: 100, colKey: 'unqualifyCategoryName' },
  { title: t('mitemIncomingInspection.是否CTQ'), width: 100, colKey: 'isCtqName' },
  { title: t('mitemIncomingInspection.检验依据'), width: 160, colKey: 'inspectBasis' },
  {
    title: t('mitemIncomingInspection.附件'),
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'files',
  },
  {
    title: t('mitemIncomingInspection.操作'),
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'op',
  },
];

const tableDataCount = ref([]);
const tableDataCquantitative = ref([]);

const tableSelectedChange = (value: any[]) => {
  tableSelectedRowKeys.value = value;
};
const onConfirmForm = async () => {
  try {
    for (let index = 0; index < tableData.value.length; index++) {
      const item = tableData.value[index];
      if (item.inspectResultSwitch) {
        item.inspectResult = 'OK';
      } else {
        item.inspectResult = 'NG';
        const ngQty = Number(item.ngQty);
        if (_.isNaN(ngQty)) {
          MessagePlugin.error(t('mitemIncomingInspection.检验结果不合格时,请填写不良数'));
          return;
        }

        if (item.characteristics === 'COUNT') {
          if (ngQty <= 0) {
            MessagePlugin.error(t('mitemIncomingInspection.检验结果不合格时,请填写不良数'));
            return;
          }
        }

        if (item.characteristics === 'QUANTITATIVE') {
          if (ngQty <= 0) {
            MessagePlugin.error(t('mitemIncomingInspection.检验结果不合格时,请填写不良数'));
            return;
          }
          if (ngQty > item.sampleQty) {
            MessagePlugin.error(t('mitemIncomingInspection.不良数不能大于样本数'));
            return;
          }
        }
      }
    }

    const ngList = tableData.value.filter((n) => !n.inspectResultSwitch);
    if (ngList.length > 0) {
      const { showForm } = formNgRef.value;
      showForm(false, formData, tableData);
    } else {
      LoadingPlugin(true);

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
        pickQty: formData.inspectQty,
        supplierId: formData.supplierId,
        supplierCode: formData.supplierCode,
        supplierName: formData.supplierName,
        inspectionStringency: formData.inspectionStringency,
        iqcInspectStdList: tableData.value,
        // iqcInspectNg: null,
      });

      Emit('parent-refresh-event');
      formVisible.value = false;
    }
  } catch (e) {
    console.log(e);
  } finally {
    LoadingPlugin(false);
  }
};
const tabsChange = async (tabValue) => {
  selectTabValue.value = tabValue;
};
const getBillNo = async () => {
  try {
    const iqcBillNo = await apiQuality.billSeq.getBillNo({ prefix: 'IQC' });
    formData.iqcBillNo = iqcBillNo;
  } catch (e) {
    console.log(e);
  }
};

// 加载新的检验标准
const loadTable = async () => {
  try {
    const list = await apiQuality.iqcInspectStdDtl.getStdDtlListByMitem({
      iqcBillNo: formData.iqcBillNo,
      mitemCategoryId: formData.mitemCategoryId,
      mitemId: formData.mitemId,
      pickQty: `${formData.inspectQty}`,
      inspectionStringency: formData.inspectionStringency,
    });
    tableData.value = list;
    tableDataCount.value = list.filter((item) => item.characteristics === 'COUNT');
    tableDataCquantitative.value = list.filter((item) => item.characteristics === 'QUANTITATIVE');

    if (list.length > 0) {
      formData.inspectStdName = list[0].inspectStdName;
    } else {
      formData.inspectStdName = '';
    }
  } catch (e) {
    console.log(e);
  }
};

// 加载现有单据检验标准
const loadIqcTable = async () => {
  try {
    const data = await apiQuality.iqcInspect.getIqcDtlInfoByBillVo({
      iqcBillNo: formData.iqcBillNo,
    });
    tableData.value = data.list;
    tableDataCount.value = data.list.filter((item) => item.characteristics === 'COUNT');
    tableDataCquantitative.value = data.list.filter((item) => item.characteristics === 'QUANTITATIVE');
    if (data.list.length > 0) {
      formData.inspectStdName = data.list[0].inspectStdName;
      formData.inspectionStringencyName = data.list[0].inspectionStringencyName;
    } else {
      formData.inspectStdName = '';
    }
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
};
const showForm = async (edit, load, row) => {
  isEdit.value = edit;
  isLoad.value = load;
  formVisible.value = true;
  reset();

  if (_.isEmpty(row.iqcBillNo)) {
    getBillNo();
  }

  formData.iqcBillNo = row.iqcBillNo;
  formData.billNoList.push({
    billNo: row.billNo,
    erpLineNo: row.erpLineNo,
    billNoDtlId: row.id,
  });
  formData.billNoStr = formData.billNoList.map((n) => n.billNo).join(',');
  formData.mitemId = row.mitemId;
  formData.mitemCode = row.mitemCode;
  formData.mitemName = row.mitemName;
  formData.mitemDesc = row.mitemDesc;
  formData.mitemCategoryId = row.mitemCategoryId;
  formData.mitemCategoryCode = row.mitemCategoryCode;
  formData.mitemCategoryName = row.mitemCategoryName;
  formData.inspectQty = row.pickQty;
  formData.supplierId = row.supplierId;
  formData.supplierCode = row.supplierCode;
  formData.supplierName = row.supplierName;
  formData.inspectionStringency = row.inspectionStringency;
  formData.inspectionStringencyName = row.inspectionStringencyName;

  if (isEdit.value || isLoad.value) {
    // 加载现有单据的明细
    await loadIqcTable();
  } else {
    // 加载STD标准下的明细
    await loadTable();
  }
};
const showMergeForm = async (edit, reBillNoList) => {
  isEdit.value = edit;
  formVisible.value = true;
  reset();

  let totalPickQty = 0;
  reBillNoList.forEach((n) => {
    formData.billNoList.push({
      billNo: n.billNo,
      erpLineNo: n.erpLineNo,
      billNoDtlId: n.id,
    });
    totalPickQty += n.pickQty;
  });
  const row = reBillNoList[0];
  formData.iqcBillNo = row.iqcBillNo;
  formData.billNoStr = formData.billNoList.map((n) => n.billNo).join(',');
  formData.mitemId = row.mitemId;
  formData.mitemCode = row.mitemCode;
  formData.mitemName = row.mitemName;
  formData.mitemDesc = row.mitemDesc;
  formData.mitemCategoryId = row.mitemCategoryId;
  formData.mitemCategoryCode = row.mitemCategoryCode;
  formData.mitemCategoryName = row.mitemCategoryName;
  formData.inspectQty = totalPickQty;
  formData.supplierId = row.supplierId;
  formData.supplierCode = row.supplierCode;
  formData.supplierName = row.supplierName;
  formData.inspectionStringency = row.inspectionStringency;
  formData.inspectionStringencyName = row.inspectionStringencyName;
  if (isEdit.value) {
    await loadTable();
  }
};
const onShowMeasureDialog = async (row) => {
  const { showForm } = formMeasureRef.value;
  await showForm(isEdit.value, row.measureList);
};
const onFormCloseDialog = async () => {
  formVisible.value = false;
};
const parentConfirm = async (measureList, isAllOK) => {
  if (!_.isEmpty(measureList)) {
    const { stdDtlId } = measureList[0];
    const rowData = tableData.value.find((n) => n.id === stdDtlId);
    rowData.measureList = measureList;
    rowData.inspectResultSwitch = isAllOK;
  }
};

// begin 文件上传

const formFilesRef = ref(null);
const showUplaodImg = async (rowData) => {
  selectIqcInspectDtlId.value = rowData.row.iqcInspectDtlId;

  try {
    if (!_.isEmpty(selectIqcInspectDtlId.value)) {
      const list = await apiQuality.iqcInspectDtlFile.getIqcInspectDtlFileList(selectIqcInspectDtlId.value);
      rowData.row.fileList = list;
    }
    const { showForm } = formFilesRef.value;
    await showForm(false, rowData.row.fileList);
  } catch (e) {
    console.log(e);
  }
};
const uploadSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectIqcInspectDtlId.value)) {
      await apiQuality.iqcInspectDtlFile.addIqcInspectDtlFile({
        iqcInspectDtlId: selectIqcInspectDtlId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success(t('mitemIncomingInspection.文件上传成功'));
    }
  } catch (e) {
    console.log(e);
  }
};
const deleteSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectIqcInspectDtlId.value)) {
      await apiQuality.iqcInspectDtlFile.deleteIqcInspectDtlFile({
        iqcInspectDtlId: selectIqcInspectDtlId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success(t('mitemIncomingInspection.文件删除成功'));
    }
  } catch (e) {
    console.log(e);
  }
};
const batchDeleteSuccess = async (files: AddFileType[]) => {
  try {
    if (!_.isEmpty(selectIqcInspectDtlId.value)) {
      const deleteList = [];

      files.forEach((n) =>
        deleteList.push({
          iqcInspectDtlId: selectIqcInspectDtlId.value,
          fileName: n.fileName,
        }),
      );
      await apiQuality.iqcInspectDtlFile.deleteBatchIqcInspectDtlFile(deleteList);
      MessagePlugin.success(t('mitemIncomingInspection.文件删除成功'));
    }
  } catch (e) {
    console.log(e);
  }
};
const onShowFiles = async (rowData) => {
  selectIqcInspectDtlId.value = rowData.row.iqcInspectDtlId;

  try {
    const { showForm } = formFilesRef.value;
    if (!_.isEmpty(selectIqcInspectDtlId.value)) {
      const list = await apiQuality.iqcInspectDtlFile.getIqcInspectDtlFileList(selectIqcInspectDtlId.value);
      rowData.row.fileList = list;

      await showForm(true, rowData.row.fileList);
    } else {
      await showForm(true, null);
    }
  } catch (e) {
    console.log(e);
  }
};

// end 文件上传

defineExpose({
  form: formRef,
  reset,
  showForm,
  showMergeForm,
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
