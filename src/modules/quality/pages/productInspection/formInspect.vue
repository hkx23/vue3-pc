<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="formHeader"
    :diabled="formData.viewType === ViewType.VIEW"
    width="98%"
    placement="top"
    top="56px"
    :cancel-btn="null"
    :confirm-btn="null"
    :close-on-overlay-click="false"
  >
    <cmp-container :full="true" :ghost="true">
      <cmp-row class="list-row">
        <cmp-card :span="8" :ghost="false" :bordered="true">
          <t-form
            ref="formRefDetail"
            :disabled="formData.viewType == ViewType.VIEW"
            :data="formData"
            :show-cancel="true"
            :show-error-message="false"
            :rules="FORM_RULES"
            label-width="100px"
          >
            <t-row :gutter="[0, 12]">
              <t-col :span="6">
                <t-form-item :label="t('productInspection.inspectCategoryName')" name="inspectCategory">
                  <t-select v-model="formData.inspectCategory" :disabled="scanInfoList && scanInfoList.length > 0">
                    <t-option
                      v-for="item in inspectCategoryOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    /> </t-select></t-form-item
              ></t-col>
              <t-col :span="6">
                <t-form-item :label="t('productInspection.businessCategoryName')" name="businessCategory">
                  <t-select v-model="formData.businessCategory" :disabled="scanInfoList && scanInfoList.length > 0">
                    <t-option
                      v-for="item in businessCategoryOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    /> </t-select
                ></t-form-item>
              </t-col>
              <t-col v-show="formData.inspectCategory == 'RECHECK'" :span="6">
                <t-form-item :label="t('productInspection.relateBillNo')" name="relateBillNo">
                  <bcmp-select-business
                    v-model="formData.relateBillNo"
                    type="OqcBillInfo"
                    :show-title="false"
                  ></bcmp-select-business>
                </t-form-item>
              </t-col>
              <t-col v-show="formData.inspectCategory && formData.businessCategory" :span="6">
                <t-form-item :label="t('productInspection.moScheId')" name="moScheId">
                  <bcmp-select-business
                    v-model="formData.moScheId"
                    :disabled="scanInfoList && scanInfoList.length > 0"
                    type="moSchedule"
                    :show-title="false"
                    @selection-change="moScheduleSelectChange"
                  ></bcmp-select-business
                ></t-form-item>
              </t-col>
              <t-col
                v-show="
                  (formData.businessCategory == 'BARCODE' && formData.moScheId) || formData.viewType == ViewType.JY
                "
                :span="6"
              >
                <t-form-item :label="t('productInspection.scanBarcode')" name="scanBarcode">
                  <cmp-scan-input
                    ref="scanBarcodeInstance"
                    v-model="formData.scanBarcode"
                    label=""
                    @enter="serialNumberEnter"
                  ></cmp-scan-input
                ></t-form-item>
              </t-col>
            </t-row>
          </t-form>
        </cmp-card>
        <div class="customer-table" :span="4">
          <cmp-table
            ref="refInfoTable"
            row-key="scanBarcode"
            active-row-type="single"
            :columns="scanInfoColumns"
            :fixed-height="true"
            :show-toolbar="false"
            :table-data="scanInfoList"
            :show-pagination="false"
            :show-setting="false"
            :hover="false"
            :stript="false"
            @row-click="tableBarcodeSelectedChange"
          >
            <template #op="rowInfo">
              <t-space>
                <t-link v-if="formData.viewType == ViewType.BJ" theme="primary" @click="onRemove(rowInfo.row)"
                  >移除</t-link
                >
                <t-link
                  v-if="formData.viewType == ViewType.JY && rowInfo.row.isScan == 'Y'"
                  theme="primary"
                  @click="onDelete(rowInfo.row)"
                  >删除
                </t-link>
              </t-space>
            </template>
          </cmp-table>
        </div>
      </cmp-row>
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-descriptions title="产品信息" :column="3" size="large">
          <t-descriptions-item label="检验单号">{{ formData.billNo }}</t-descriptions-item>
          <t-descriptions-item label="单据状态">{{ formData.statusName }}</t-descriptions-item>
          <t-descriptions-item label="检验标准">{{ formData.inspectStdName }}</t-descriptions-item>
          <t-descriptions-item v-if="formData.businessCategory == 'MO'" label="批量">{{
            formData.checkMoTotalQty
          }}</t-descriptions-item>
          <t-descriptions-item v-if="formData.businessCategory == 'BARCODE'" label="批量">{{
            formData.checkBarcodeTotalQty
          }}</t-descriptions-item>
          <t-descriptions-item label="产品编码">{{ formData.mitemCode }}</t-descriptions-item>
          <t-descriptions-item label="产品名称">
            <div class="div_break_word">
              {{ formData.mitemName }}
            </div>
          </t-descriptions-item>
        </t-descriptions>
      </cmp-card>
      <cmp-card :span="12" :ghost="false" :bordered="true" title="检验判定信息">
        <t-form
          ref="formRefSubDetail"
          :disabled="formData.viewType == ViewType.VIEW"
          :data="formData"
          :show-cancel="true"
          :show-error-message="false"
          :rules="FORM_RULES"
          label-width="100px"
        >
          <t-row :gutter="[0, 12]">
            <t-col :span="4">
              <t-form-item :label="t('productInspection.samplingStandardType')" name="samplingStandardType">
                <t-radio-group
                  v-model="formData.samplingStandardType"
                  :disabled="formData.viewType != ViewType.BJ"
                  @change="onRadioChange"
                >
                  <t-radio value="NATIONAL">国标</t-radio>
                  <t-radio value="ENTERPRISE">企标</t-radio>
                </t-radio-group>
              </t-form-item></t-col
            >
            <t-col :span="4">
              <t-form-item :label="t('productInspection.samplingStandardId')" name="samplingStandardId">
                <t-input
                  v-if="formData.samplingStandardType == 'NATIONAL'"
                  v-model="sampingStdCode"
                  :disabled="true"
                  placeholder=""
                ></t-input>
                <bcmp-select-business
                  v-if="formData.samplingStandardType == 'ENTERPRISE'"
                  v-model="formData.samplingStandardCode"
                  :disabled="formData.viewType != ViewType.BJ"
                  type="SamplingStd"
                  :show-title="false"
                  @selection-change="onEnterpriseCalculateSampQty"
                ></bcmp-select-business>
              </t-form-item>
            </t-col>
            <t-col v-show="formData.samplingStandardType == 'NATIONAL'" :span="4">
              <t-form-item :label="t('productInspection.inspectStringency')" name="inspectStringency">
                <t-select
                  v-model="formData.inspectStringency"
                  :disabled="formData.viewType != ViewType.BJ"
                  @change="onNationalCalculateSampQty"
                >
                  <t-option
                    v-for="item in inspectionStringencyOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </t-select>
              </t-form-item>
            </t-col>
            <t-col v-show="formData.samplingStandardType == 'NATIONAL'" :span="4">
              <t-form-item :label="t('productInspection.inspectLevel')" name="inspectLevel">
                <t-select
                  v-model="formData.inspectLevel"
                  :disabled="formData.viewType != ViewType.BJ"
                  @change="onNationalCalculateSampQty"
                >
                  <t-option
                    v-for="item in inspectLevelOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  /> </t-select
              ></t-form-item>
            </t-col>
            <t-col :span="4">
              <t-form-item :label="t('productInspection.inspectQtyDemo')" name="inspectQty">
                <t-input v-model="formData.inspectQty" :disabled="true" placeholder=""></t-input>
              </t-form-item>
            </t-col>
            <t-col v-show="formData.viewType != ViewType.BJ" :span="4">
              <t-form-item :label="t('productInspection.inspectResult')" name="inspectResult">
                <t-select v-model="formData.inspectResult">
                  <t-option
                    v-for="item in OKNGOption"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  /> </t-select
              ></t-form-item>
            </t-col>
          </t-row>
        </t-form>
      </cmp-card>

      <t-tabs :model-value="selectTabValue" @change="tabsChange">
        <!-- <template #action>
          <div class="tabs_right_ops">
            <t-checkbox label="只显示不合格" style="width: 170px" />
            <t-input placeholder="请输入搜索关键字" />
          </div>
        </template> -->
        <t-tab-panel value="tab1" label="全部" :destroy-on-hide="false">
          <cmp-table
            row-key="id"
            :hover="false"
            :stript="false"
            :resizable="true"
            :fixed-height="false"
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
              <t-space v-if="formData.viewType != ViewType.BJ">
                <t-link theme="primary" @click="onShowFiles(rowData)">查看</t-link>
              </t-space>
            </template>
            <template #op="rowData">
              <t-space v-if="formData.viewType == ViewType.JY">
                <t-link theme="primary" @click="showUplaodImg(rowData.row)">上传照片</t-link>
              </t-space>
            </template>
            <template #inspectResult="{ row }">
              <t-radio-group
                v-model="row.inspectResult"
                :disabled="!isEditTable"
                @change="setBarcodeStatus(formData.currentBarcode)"
              >
                <t-radio value="OK">合格</t-radio>
                <t-radio value="NG">不合格</t-radio>
              </t-radio-group>
            </template>
            <template #measureOp="{ row }">
              <t-link v-if="row.characteristics === 'QUANTITATIVE'" theme="primary" @click="onShowMeasureDialog(row)">
                <div v-if="isEditTable">填写</div>
                <div v-else>查看</div>
              </t-link>
            </template>
            <template #ngReason="{ row }">
              <t-input v-if="isEditTable" v-model="row.ngReason" />
              <div v-else>{{ row.ngReason }}</div>
            </template>
          </cmp-table>
        </t-tab-panel>
        <t-tab-panel value="tab2" label="计数" :destroy-on-hide="false">
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
              <t-space v-if="formData.viewType != ViewType.BJ">
                <t-link theme="primary" @click="onShowFiles(rowData)">查看</t-link>
              </t-space>
            </template>
            <template #op="rowData">
              <t-space v-if="formData.viewType == ViewType.JY">
                <t-link theme="primary" @click="showUplaodImg(rowData.row)">上传照片</t-link>
              </t-space>
            </template>
            <template #inspectResult="{ row }">
              <t-radio-group
                v-model="row.inspectResult"
                :disabled="!isEditTable"
                @change="setBarcodeStatus(formData.currentBarcode)"
              >
                <t-radio value="OK">合格</t-radio>
                <t-radio value="NG">不合格</t-radio>
              </t-radio-group>
            </template>
            <template #measureOp="{ row }">
              <t-link v-if="row.characteristics === 'QUANTITATIVE'" theme="primary" @click="onShowMeasureDialog(row)">
                <div v-if="isEditTable">填写</div>
                <div v-else>查看</div>
              </t-link>
            </template>
            <template #ngReason="{ row }">
              <t-input v-if="isEditTable" v-model="row.ngReason" />
              <div v-else>{{ row.ngReason }}</div>
            </template>
          </cmp-table>
        </t-tab-panel>
        <t-tab-panel value="tab3" label="计量" :destroy-on-hide="false">
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
              <t-space v-if="formData.viewType != ViewType.BJ">
                <t-link theme="primary" @click="onShowFiles(rowData)">查看</t-link>
              </t-space>
            </template>
            <template #op="rowData">
              <t-space v-if="formData.viewType == ViewType.JY">
                <t-link theme="primary" @click="showUplaodImg(rowData.row)">上传照片</t-link>
              </t-space>
            </template>
            <template #inspectResult="{ row }">
              <t-radio-group
                v-model="row.inspectResult"
                :disabled="!isEditTable"
                @change="setBarcodeStatus(formData.currentBarcode)"
              >
                <t-radio value="OK">合格</t-radio>
                <t-radio value="NG">不合格</t-radio>
              </t-radio-group>
            </template>
            <template #measureOp="{ row }">
              <t-link v-if="row.characteristics === 'QUANTITATIVE'" theme="primary" @click="onShowMeasureDialog(row)">
                <div v-if="isEditTable">填写</div>
                <div v-else>查看</div>
              </t-link>
            </template>
            <template #ngReason="{ row }">
              <t-input v-if="isEditTable" v-model="row.ngReason" />
              <div v-else>{{ row.ngReason }}</div>
            </template>
          </cmp-table>
        </t-tab-panel>
      </t-tabs>
    </cmp-container>

    <template #footer>
      <t-button v-if="formData.viewType != ViewType.VIEW" theme="default" @click="onConfirmForm(true)">{{
        t('common.button.tempSave')
      }}</t-button>
      <t-button v-if="formData.viewType != ViewType.VIEW" theme="primary" @click="onConfirmForm(false)">{{
        t('common.button.submit')
      }}</t-button>
      <t-button v-if="formData.viewType === ViewType.VIEW" theme="primary" @click="onHandleView">{{
        t('productInspection.buttonViewNgForm')
      }}</t-button>
      <t-button theme="default" @click="formVisible = false">{{ t('common.button.cancel') }}</t-button>
    </template>
  </t-dialog>

  <!--弹窗-->
  <formMeasure ref="formMeasureRef" @parent-confirm-event="parentConfirm" />
  <formNg ref="formNgRef" @form-close-event="onFormCloseDialog" />

  <cmp-files-upload
    ref="formFilesRef"
    upload-path="OqcInspect"
    @upload-success="uploadSuccess"
    @delete-success="deleteSuccess"
    @batch-delete-success="batchDeleteSuccess"
  />
</template>
<script lang="ts">
export default {
  name: 'FormInspect',
};
</script>

<script setup lang="ts">
import _, { isEmpty } from 'lodash';
import {
  FormInstanceFunctions,
  LoadingPlugin,
  MessagePlugin,
  NotifyPlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiQuality, BarcodeVO, OqcInspectBillFullVO, OqcInspectStdFullVO } from '@/api/quality';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import CmpFilesUpload from '@/components/cmp-files-upload/index.vue';
import { useLoading } from '@/hooks/modules/loading';

import formMeasure from './formMeasure.vue';
import formNg from './formNg.vue';
import { useLang } from './lang';

const { t } = useLang();
const Emit = defineEmits(['parent-refresh-event', 'form-close-event']);
const OKNGOption = ref([
  { value: 'OK', label: '合格' },
  { value: 'NG', label: '不合格' },
]);
// 国标标准编码
const sampingStdCode = ref('');
const getSampingStdCode = async () => {
  apiMain.profileValue
    .getValueByProfileCode({
      code: 'GB_STD',
      orgId: fw.getOrgId(),
    })
    .then((val) => {
      sampingStdCode.value = val;
    });
};

// 是否启用审批流程
const enableProcessApproval = ref('');
const getEnableProcessApproval = async () => {
  apiMain.profileValue
    .getValueByProfileCode({
      code: 'Enable_process_approval',
      orgId: fw.getOrgId(),
    })
    .then((val) => {
      enableProcessApproval.value = val;
    });
};

/** 获取 数据字典 检验水平
 *  检验水平
 */
const inspectLevelOption = ref([]);
const getInspectLevel = async () => {
  try {
    const res = await apiMain.param.getListByGroupCode({
      parmGroupCode: 'Q_INSPECTION_LEVEL',
    });
    inspectLevelOption.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};
/** 获取 数据字典 严格度
 *  严格度
 */
const inspectionStringencyOption = ref([]);
const getinspectionStringency = async () => {
  try {
    const res = await apiMain.param.getListByGroupCode({
      parmGroupCode: 'Q_INSPECTION_STRINGENCY',
    });
    inspectionStringencyOption.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};
const formVisible = ref(false);
const formHeader = computed(() => {
  let headerName = '';
  if (formData.viewType === ViewType.BJ) {
    headerName = '报检';
  }
  if (formData.viewType === ViewType.JY) {
    headerName = '检验';
  }
  if (formData.viewType === ViewType.VIEW) {
    headerName = '查看';
  }
  return headerName;
});
const formRef: Ref<FormInstanceFunctions> = ref(null);
const formMeasureRef = ref(null);
const formNgRef = ref(null);

const selectTabValue = ref('tab1');
const selectOqcInspectItemId = ref(null);
enum ViewType {
  BJ = 'BJ', // 报检模式
  JY = 'JY', // 检验模式
  VIEW = 'VIEW', // 查看模式
}
const isEditTable = ref(true); // 是否可编辑

interface FormInspectInfo extends OqcInspectBillFullVO {
  viewType: ViewType;
  scanBarcode: string;
  currentBarcode: BarcodeVO;
  enableProcessApproval: string;
}

const formData: FormInspectInfo = reactive({
  viewType: ViewType.VIEW,
  scanBarcode: '',
  currentBarcode: {},
  enableProcessApproval: '',
});
// 检验类型
const inspectCategoryOption = ref([
  { value: '', label: '全部' },
  { value: 'RANDOM', label: '抽检' },
  { value: 'RECHECK', label: '复检' },
  { value: 'INCREASE', label: '加抽' },
  { value: 'REWORK', label: '返工' },
  { value: 'OVERRECHECK', label: '超期复检' },
]);
// 业务类型
const businessCategoryOption = ref([
  { value: '', label: '全部' },
  { value: 'MO', label: '按工单' },
  { value: 'BARCODE', label: '按条码' },
]);
const { loading } = useLoading();
const FORM_RULES = {
  inspectCategory: [
    { required: true, message: t('common.placeholder.input', [t('productInspection.inspectCategoryName')]) },
  ],
  businessCategory: [
    { required: true, message: t('common.placeholder.input', [t('productInspection.businessCategoryName')]) },
  ],
  moScheId: [{ required: true, message: t('common.placeholder.input', [t('productInspection.moScheId')]) }],
};
const scanInfoList = ref<BarcodeVO[]>([]);

const tableBarcodeSelectedChange = ({ row }) => {
  if (formData.viewType === ViewType.BJ) {
    return;
  }
  // 加载条码检验项
  barcodeSelectedChange(row);
};

// 加载条码检验项
const barcodeSelectedChange = (row) => {
  // 设置当前选中的条码
  setSelectBarcode(row);
  // 若已加载过检验项，则无需再加载
  if (row.inspectItems && row.inspectItems.length === 0) {
    loadBarcodeTable(row);
  } else {
    setBarcodeTable(row.inspectItems);
  }
};
// 扫描信息
const scanInfoColumns: PrimaryTableCol<TableRowData>[] = [
  {
    title: '产品条码',
    width: 80,
    colKey: 'scanBarcode',
    attrs: (content) => {
      if (content.row.isScan === 'Y') {
        return {
          style: {
            color: 'white',
            backgroundColor: 'var(--td-brand-color)',
          },
        };
      }
      return '';
    },
  },
  { title: '判定结果', width: 50, colKey: 'inspectResult' },
  { title: '操作', width: 50, colKey: 'op' },
];
const defaultTableData = ref<OqcInspectStdFullVO[]>([]); // 用于检验扫码时，存储条码和检验项一起保存
const tableSelectedRowKeys = ref([]);
const tableData = ref<OqcInspectStdFullVO[]>([]);
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '项目类别', width: 160, colKey: 'itemCategoryName' },
  { title: '检验内容', width: 160, colKey: 'itemName' },
  { title: '技术要求', width: 160, colKey: 'technicalRequest' },
  { title: '项目特性', width: 100, colKey: 'characteristicsName' },
  { title: '检验工具', width: 100, colKey: 'inspectTool' },
  { title: '检验结果', width: 200, colKey: 'inspectResult' },
  { title: '测量值', width: 100, colKey: 'measureOp' },
  { title: '不良描述', width: 200, colKey: 'ngReason' },
  { title: '抽样方案', width: 100, colKey: 'samplingStandardType' },
  { title: '检验依据', width: 160, colKey: 'inspectBasis' },
  { title: '附件', align: 'left', fixed: 'right', width: 160, colKey: 'files' },
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];

const tableDataCount = ref([]);
const tableDataCquantitative = ref([]);

const tableSelectedChange = (value: any[], { selectedRowData }: any) => {
  tableSelectedRowKeys.value = value;
};
const onConfirmForm = async (isTempSave: boolean) => {
  if (formData.viewType === ViewType.BJ) {
    submitBJQqcInspect(isTempSave);
  } else if (formData.viewType === ViewType.JY) {
    if (isTempSave) {
      submitJYQqcInspect(isTempSave);
    } else if (isTempSave === false) {
      if (checkFieldsRequired(isTempSave)) {
        if (formData.inspectResult === 'OK') {
          submitJYQqcInspect(isTempSave);
        } else if (formData.inspectResult === 'NG') {
          const checkSuccess = await checkJyPreSubmit(isTempSave);
          if (checkSuccess) {
            const { showForm } = formNgRef.value;
            showForm(false, formData, tableData.value, scanInfoList.value);
          }
        }
      }
    }
  }
};

const onHandleView = async () => {
  const { showFormView } = formNgRef.value;
  showFormView(false, formData, tableData.value, scanInfoList.value);
};

// 检验执行-前端校验必填信息
const checkFieldsRequired = async (isTempSave: boolean) => {
  if (!isTempSave) {
    if (!formData.inspectResult) {
      MessagePlugin.error('判定结果不能为空');
      return false;
    }
  }
  return true;
};

// 检验执行-提交前的校验
const checkJyPreSubmit = async (isTempSave: boolean) => {
  let success = false;
  try {
    LoadingPlugin(true);
    success = await apiQuality.oqcInspect.checkJyPreSubmit({
      oqcInspectId: formData.id,
      billNo: formData.billNo,
      viewType: formData.viewType,
      businessCategory: formData.businessCategory,
      oqcInspectBillInfo: formData,
      isTempSave,
      defaultInspectItems: tableData.value,
      barcodeList: scanInfoList.value,
    });
  } catch (e) {
    success = false;
    console.log(e);
  } finally {
    LoadingPlugin(false);
  }
  return success;
};

// 报检-新增产品检验单据-暂存与提交
const submitBJQqcInspect = async (isTempSave: boolean) => {
  try {
    LoadingPlugin(true);
    await apiQuality.oqcInspect.submitBjQqcInspect({
      oqcInspectId: formData.id,
      billNo: formData.billNo,
      viewType: formData.viewType,
      businessCategory: formData.businessCategory,
      oqcInspectBillInfo: formData,
      isTempSave,
      defaultInspectItems: tableData.value,
      barcodeList: scanInfoList.value,
    });
    Emit('parent-refresh-event');
    formVisible.value = false;
    if (isTempSave) {
      MessagePlugin.success('暂存成功');
    } else {
      MessagePlugin.success('提交成功');
    }
  } catch (e) {
    console.log(e);
  } finally {
    LoadingPlugin(false);
  }
};

// 检验执行-暂存与提交
const submitJYQqcInspect = async (isTempSave: boolean) => {
  try {
    LoadingPlugin(true);
    await apiQuality.oqcInspect.submitJyQqcInspect({
      oqcInspectId: formData.id,
      billNo: formData.billNo,
      viewType: formData.viewType,
      businessCategory: formData.businessCategory,
      oqcInspectBillInfo: formData,
      isTempSave,
      defaultInspectItems: tableData.value,
      barcodeList: scanInfoList.value,
    });
    Emit('parent-refresh-event');
    formVisible.value = false;
    if (isTempSave) {
      MessagePlugin.success('暂存成功');
    } else {
      MessagePlugin.success('提交成功');
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
    const billNo = await apiQuality.billSeq.getBillNo({ prefix: 'OQC' });
    formData.billNo = billNo;
  } catch (e) {
    console.log(e);
  }
};

const onShowFiles = async (rowData) => {
  selectOqcInspectItemId.value = rowData.row.oqcInspectItemId;
  try {
    if (!_.isEmpty(selectOqcInspectItemId.value)) {
      const list = await apiQuality.oqcInspect.getOqcInspectItemFileList(selectOqcInspectItemId.value);
      rowData.row.fileList = list;

      const { showForm } = formFilesRef.value;
      await showForm(true, rowData.row.fileList);
    }
  } catch (e) {
    console.log(e);
  }
};

// const showForm = (edit, row) => {
//   isEditTable.value = edit;
//   formVisible.value = true;
//   reset();
// };
const onShowMeasureDialog = async (row) => {
  const { showForm } = formMeasureRef.value;
  await showForm(isEditTable.value, row.measureList, row.id);
};
const onFormCloseDialog = async () => {
  formVisible.value = false;
  // 刷新主界面
  Emit('parent-refresh-event');
};
const parentConfirm = async (measureList, isAllOK, dtlId) => {
  if (!_.isEmpty(measureList)) {
    const rowData = tableData.value.find((n) => n.id === dtlId);
    rowData.measureList = measureList;
    rowData.inspectResult = isAllOK ? 'OK' : 'NG';
  }
};

const checkAllOKComputed = computed(() => {
  let sumNg = 0;
  let noCheckSum = 0; // 未判定的总数量
  let result = '';
  if (scanInfoList.value) {
    sumNg = scanInfoList.value.filter((item) => {
      return item.inspectResult === 'NG' && item.isScan === 'Y';
    }).length;

    noCheckSum = scanInfoList.value.filter((item) => {
      return !item.inspectResult && item.isScan === 'Y';
    }).length;
  }
  // 存在未判定的条码,则整体单据自动判断合格
  if (noCheckSum > 0) {
    result = '';
  } else if (sumNg === 0) {
    result = 'OK';
  } else {
    result = 'NG';
  }
  return result;
});

// 设置当前选中的条码
const setSelectBarcode = (curBarcodeInfo: BarcodeVO) => {
  formData.currentBarcode = {};
  formData.currentBarcode = curBarcodeInfo;
};

// 设置条码是否合格
const setBarcodeStatus = (curBarcodeInfo: BarcodeVO) => {
  let result = 'OK';
  let resultName = '合格';
  if (curBarcodeInfo && curBarcodeInfo.inspectItems) {
    curBarcodeInfo.inspectItems.forEach((item) => {
      if (item.inspectResult === 'NG') {
        result = 'NG';
        resultName = '不合格';
      }
    });

    let noCheckSum = 0; // 未判定的检验项数量
    noCheckSum = curBarcodeInfo.inspectItems.filter((item) => {
      return !item.inspectResult;
    }).length;
    if (noCheckSum > 0) {
      result = '';
      resultName = '未判定';
    }
    curBarcodeInfo.inspectResult = result;

    // 设置整体单据的合格状态
    setBillStatus();
  }
};

// 设置整体单据的合格状态
const setBillStatus = () => {
  // 自动设置单据的合格信息,但允许手动修改
  formData.inspectResult = checkAllOKComputed.value;
};

// begin 文件上传

const formFilesRef = ref(null);
const showUplaodImg = async (row: OqcInspectStdFullVO) => {
  selectOqcInspectItemId.value = row.oqcInspectItemId;

  try {
    if (!_.isEmpty(selectOqcInspectItemId.value)) {
      const list = await apiQuality.oqcInspect.getOqcInspectItemFileList(selectOqcInspectItemId.value);
      row.fileList = list;
      const { showForm } = formFilesRef.value;
      await showForm(false, row.fileList);
    }
  } catch (e) {
    console.log(e);
  }
};
const uploadSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectOqcInspectItemId.value)) {
      const list = await apiQuality.oqcInspect.addFile({
        oqcInspectId: formData.id,
        oqcInspectItemId: selectOqcInspectItemId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success('文件上传成功');
    }
  } catch (e) {
    console.log(e);
  }
};
const deleteSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectOqcInspectItemId.value)) {
      const list = await apiQuality.oqcInspect.deleteFile({
        oqcInspectId: formData.id,
        oqcInspectItemId: selectOqcInspectItemId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success('文件删除成功');
    }
  } catch (e) {
    console.log(e);
  }
};
const batchDeleteSuccess = async (files: AddFileType[]) => {
  try {
    if (!_.isEmpty(selectOqcInspectItemId.value)) {
      const deleteList = [];

      files.forEach((n) =>
        deleteList.push({
          oqcInspectId: formData.id,
          oqcInspectItemId: selectOqcInspectItemId.value,
          fileName: n.fileName,
        }),
      );
      const list = await apiQuality.oqcInspect.deleteBatchFiles(deleteList);
      MessagePlugin.success('文件删除成功');
    }
  } catch (e) {
    console.log(e);
  }
};
// end 文件上传

const serialNumberEnter = async (value) => {
  if (formData.viewType === ViewType.BJ) {
    scanProductBarcode(value);
  } else {
    scanYJProductBarcode(value);
  }
};

// 报验扫码
const scanProductBarcode = async (value) => {
  if (!isEmpty(value)) {
    // 前端校验一次，条码是否扫重复，后端再校验一次
    if (!checkBarcodeRepeat(value)) {
      return;
    }
    LoadingPlugin(true);
    try {
      const list = (await apiQuality.oqcInspect.scanProductBarcode({
        oqcInspectId: formData.id,
        billNo: formData.billNo,
        viewType: formData.viewType,
        businessCategory: formData.businessCategory,
        moScheId: formData.moScheId,
        scanBarcode: formData.scanBarcode,
        oqcInspectBillInfo: formData,
      })) as BarcodeVO[];
      if (list) {
        scanInfoList.value.push(...list);
      }
      formData.scanBarcode = '';
      // 设置按条码报批数量
      setCheckmBarcodeTotalQty();
    } catch (error) {
      console.error(error.message);
    } finally {
      LoadingPlugin(false);
    }
  }
};

// 检验扫码
const scanYJProductBarcode = async (value) => {
  if (!isEmpty(value)) {
    LoadingPlugin(true);
    try {
      const list = (await apiQuality.oqcInspect.scanYjProductBarcode({
        oqcInspectId: formData.id,
        billNo: formData.billNo,
        viewType: formData.viewType,
        businessCategory: formData.businessCategory,
        moScheId: formData.moScheId,
        scanBarcode: formData.scanBarcode,
        oqcInspectBillInfo: formData,
        defaultInspectItems: defaultTableData.value,
      })) as BarcodeVO[];
      if (list) {
        scanInfoList.value.push(...list);
      }
      formData.scanBarcode = '';
      // 设置按条码报批数量
      setCheckmBarcodeTotalQty();
      getBarcodeTableList();
    } catch (error) {
      console.error(error.message);
    } finally {
      LoadingPlugin(false);
    }
  }
};

// 移除条码
const onRemove = (row: any) => {
  scanInfoList.value.splice(row.rowIndex, 1);
  // 设置按条码报批数量
  setCheckmBarcodeTotalQty();
};

// 删除条码
const onDelete = async (row: any) => {
  const oqcInspectDtlIds = [];
  const oqcInspectDtlBarcodeIds = [];
  oqcInspectDtlIds.push(row.id);
  oqcInspectDtlBarcodeIds.push(row.oqcInspectBarcodeId);
  await apiQuality.oqcInspect.deleteYjProductBarcode({
    oqcInspectDtlIds,
    oqcInspectDtlBarcodeIds,
    businessCategory: formData.businessCategory,
    oqcInspectId: formData.id.toString(),
    defaultInspectItems: tableData.value,
  });
  getBarcodeTableList();
  MessagePlugin.success('删除成功');
};

// 加载条码列表
const getBarcodeTableList = async () => {
  const barcodeList = await apiQuality.oqcInspect.getBarcodeTableList({
    oqcInspectId: formData.id,
    viewType: formData.viewType,
  });
  scanInfoList.value = barcodeList;
  if (barcodeList) {
    // 加载条码检验项
    barcodeSelectedChange(barcodeList[0]);
  }
};

// 设置按条码报批数量
const setCheckmBarcodeTotalQty = () => {
  formData.checkBarcodeTotalQty = scanInfoList.value.length;
};

// 切换工单
const moScheduleSelectChange = (data) => {
  if (data) {
    // 更新工单相关信息
    formData.checkMoTotalQty = data.planQty;
    formData.mitemId = data.mitemId;
    formData.mitemCode = data.mitemCode;
    formData.mitemName = data.mitemName;
    formData.mitemDesc = data.mitemDesc;
    formData.mitemCategoryId = data.categoryId;
    formData.mitemCategoryCode = data.categoryCode;
    formData.mitemCategoryName = data.categoryName;
    loadTable(formData.viewType);
  } else {
    // 清空工单以及工单相关信息
    onClearMoInfo();
  }
};

// 报检 - 加载检验项信息
const loadTable = async (viewType: String) => {
  if (viewType === ViewType.BJ) {
    try {
      const list = await apiQuality.oqcInspect.getStdDtlListByMitem({
        oqcInspectId: formData.id,
        billNo: formData.billNo,
        mitemCategoryId: formData.mitemCategoryId,
        mitemId: formData.mitemId,
        inspectType: formData.inspectCategory,
        viewType: formData.viewType,
      });
      tableData.value = list;
      tableDataCount.value = list.filter((item) => item.characteristics === 'COUNT');
      tableDataCquantitative.value = list.filter((item) => item.characteristics === 'QUANTITATIVE');

      if (list.length > 0) {
        formData.inspectStdName = list[0].inspectStdName;
        formData.oqcInspectStdId = list[0].inspectStdId;
      } else {
        formData.inspectStdName = '';
        formData.oqcInspectStdId = null;
      }
    } catch (e) {
      console.log(e);
    }
  }
};

// 检验 - 加载默认的检验项目
const loadDefaultTable = async () => {
  try {
    const list = await apiQuality.oqcInspect.getStdDtlListByMitem({
      mitemCategoryId: formData.mitemCategoryId,
      mitemId: formData.mitemId,
      inspectType: formData.inspectCategory,
      viewType: ViewType.BJ,
    });
    defaultTableData.value = list;
  } catch (e) {
    console.log(e);
  }
};

// 检验 - 加载条码检验项信息
const loadBarcodeTable = async (rowBarcodeInfo: BarcodeVO) => {
  try {
    LoadingPlugin(true);
    const list = await apiQuality.oqcInspect.getStdDtlListByMitem({
      oqcInspectId: formData.id,
      billNo: formData.billNo,
      mitemCategoryId: formData.mitemCategoryId,
      mitemId: formData.mitemId,
      inspectType: formData.inspectCategory,
      oqcInspectBarcodeId: rowBarcodeInfo.oqcInspectBarcodeId,
      oqcInspectDtlId: rowBarcodeInfo.id,
      viewType: formData.viewType,
    });
    tableData.value = list;
    tableDataCount.value = list.filter((item) => item.characteristics === 'COUNT');
    tableDataCquantitative.value = list.filter((item) => item.characteristics === 'QUANTITATIVE');
    rowBarcodeInfo.inspectItems = list;
  } catch (e) {
    console.log(e);
  } finally {
    LoadingPlugin(false);
  }
};

// 检验 - 加载本地的检验项信息
const setBarcodeTable = async (inspectItems: OqcInspectStdFullVO[]) => {
  tableData.value = inspectItems;
  tableDataCount.value = inspectItems.filter((item) => item.characteristics === 'COUNT');
  tableDataCquantitative.value = inspectItems.filter((item) => item.characteristics === 'QUANTITATIVE');
};

// 清空工单以及工单相关信息
const onClearMoInfo = () => {
  console.log('onClearMoInfo');
  const { inspectCategory } = formData;
  const { businessCategory } = formData;
  reset();
  formData.inspectCategory = inspectCategory;
  formData.businessCategory = businessCategory;
};

const onRadioChange = async (checked: any) => {
  // 清空检验判定信息
  clearCheckResultInfo();
};

// 计算国标样本数
const onNationalCalculateSampQty = async () => {
  let checkTotalQty = formData.checkMoTotalQty;
  if (formData.businessCategory === 'BARCODE') {
    checkTotalQty = formData.checkBarcodeTotalQty;
  }
  if (checkTotalQty > 0 && sampingStdCode.value && formData.inspectLevel && formData.inspectStringency) {
    const inspectQty = await apiQuality.oqcInspect.getProductSampleQtyByNational({
      inspectQty: checkTotalQty.toString(),
      inspectLevel: formData.inspectLevel,
      inspectionStringency: formData.inspectStringency,
      sampingStdCode: sampingStdCode.value,
    });
    formData.inspectQty = inspectQty;
  } else if (!checkTotalQty) {
    MessagePlugin.error('无报批数量，请检查');
  }
};

// 计算企表样本数
const onEnterpriseCalculateSampQty = async () => {
  let checkTotalQty = formData.checkMoTotalQty;
  if (formData.businessCategory === 'BARCODE') {
    checkTotalQty = formData.checkBarcodeTotalQty;
  }
  if (checkTotalQty > 0 && formData.samplingStandardCode) {
    const inspectQty = await apiQuality.oqcInspect.getProductSampleQtyByEnterprise({
      inspectQty: checkTotalQty.toString(),
      samplingStandardId: formData.samplingStandardCode,
    });
    formData.inspectQty = inspectQty;
  } else if (!checkTotalQty) {
    MessagePlugin.error('无报批数量，请检查');
  }
};

const reset = () => {
  console.log('reset');
  defaultTableData.value = [];
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
  // 清空检验项目信息
  clearInspectStdTable();
  // 清空条码
  clearBarcodeList();
};

// 清空条码
const clearBarcodeList = () => {
  scanInfoList.value = [];
};

// 清空检验判定信息
const clearCheckResultInfo = () => {
  formData.samplingStandardCode = '';
  formData.inspectStringency = '';
  formData.inspectLevel = '';
  formData.inspectQty = 0;
};

// 清空检验项目信息
const clearInspectStdTable = () => {
  tableData.value = [];
};

// 校验条码是否扫重复
const checkBarcodeRepeat = (lbNo) => {
  let isSuccess = true;
  const barcodeInfo = _.find(scanInfoList.value, (item: BarcodeVO) => item.scanBarcode === lbNo);
  if (barcodeInfo) {
    isSuccess = false;
    NotifyPlugin.error({ content: `该条码已扫描,请勿重复扫描`, duration: 2000, closeBtn: true });
  }
  return isSuccess;
};

// 初始化报检界面信息
const initBJDetailFormAdd = () => {
  reset();
  formData.viewType = ViewType.BJ;
  formData.billNo = '';
  formData.samplingStandardType = 'NATIONAL';
  formData.status = 'UNSUBMIT';
  formData.statusName = '待提报';
  getBillNo();
  formVisible.value = true;
  isEditTable.value = false;
};

// 报检界面信息 -编辑
const initBJDetailFormEdit = (billInfo: OqcInspectBillFullVO) => {
  reset();
  Object.assign(formData, billInfo);
  console.log('initBJDetailFormEdit:', formData);
  formData.viewType = ViewType.BJ;
  formVisible.value = true;
  isEditTable.value = false;
  commonInit();
  loadTable(formData.viewType);
  getBarcodeTableList();
  loadDefaultTable();
};

// 初始化检验界面信息
const initJYDetailForm = async (billInfo: OqcInspectBillFullVO) => {
  reset();
  Object.assign(formData, billInfo);
  formData.viewType = ViewType.JY;
  isEditTable.value = true;
  formVisible.value = true;
  commonInit();
  getBarcodeTableList();
  loadDefaultTable();
};

// 初始化详情查看界面信息
const initViewkDetailForm = async (billInfo: OqcInspectBillFullVO) => {
  reset();
  Object.assign(formData, billInfo);
  formData.viewType = ViewType.VIEW;
  isEditTable.value = false;
  formVisible.value = true;
  commonInit();
  getBarcodeTableList();
};

const commonInit = () => {
  if (formData.businessCategory === 'MO') {
    formData.checkMoTotalQty = formData.qty;
  } else {
    formData.checkBarcodeTotalQty = formData.qty;
  }
  formData.enableProcessApproval = enableProcessApproval.value;
};

// 初始化详情信息
const initForm = () => {
  getinspectionStringency();
  getInspectLevel();
  getSampingStdCode();
  getEnableProcessApproval();
};

onMounted(() => {
  initForm();
});

defineExpose({
  form: formRef,
  reset,
  loadTable,
  initBJDetailFormAdd,
  initBJDetailFormEdit,
  initJYDetailForm,
  initViewkDetailForm,
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

.list-row {
  height: 200px !important;
}

.customer-table {
  height: 200px !important;
}

.customer-card {
  margin-bottom: 8px;

  :deep(.t-descriptions__body) {
    width: 100%;
  }

  :deep(.t-card__body) {
    padding: 8px 0;
  }
}

:deep(.t-card__title) {
  color: var(--td-text-color-primary);
  font: var(--td-font-title-medium);
  font-weight: 600;
}
</style>
