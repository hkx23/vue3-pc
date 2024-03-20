<template>
  <cmp-container :full="true">
    <cmp-card class="not-full-tab">
      <t-tabs :model-value="selectTabValue" @change="tabsChange">
        <t-tab-panel value="tab1" :label="t('mitemIncomingInspection.待检验')" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <cmp-query :opts="optsTab1" :is-expansion="true" @submit="conditionEnter" @reset="onReset" />
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16 padding-bottom-line-0">
                <cmp-table
                  v-model:pagination="pageTab1"
                  row-key="id"
                  :hover="false"
                  :stript="false"
                  :table-column="waitInspectColumns"
                  active-row-type="single"
                  :table-data="waitInspectData"
                  :total="waitInspectDataTotal"
                  :loading="loading"
                  :resizable="true"
                  :selected-row-keys="selectWaitId"
                  @select-change="onSelectWaitInspectChange"
                  @refresh="fetchTable"
                >
                  <template #title>{{ t('mitemIncomingInspection.工作台') }}</template>
                  <template #button>
                    <t-button theme="primary" @click="mergeInspection(true)">{{
                      t('mitemIncomingInspection.合并检验')
                    }}</t-button>
                    <t-button theme="default" @click="directInspectOk">{{
                      t('mitemIncomingInspection.一键合格')
                    }}</t-button>
                    <t-button theme="default" @click="directInspectNg">{{
                      t('mitemIncomingInspection.一键判退')
                    }}</t-button>
                  </template>
                  <template #op="rowData">
                    <t-space>
                      <t-link
                        v-if="rowData.row.inspectResult === 'UNINSPECT' || _.isEmpty(rowData.row.iqcBillNo)"
                        theme="primary"
                        @click="onShowDialog(true, rowData)"
                        >{{ t('mitemIncomingInspection.检验') }}</t-link
                      >
                    </t-space>
                  </template>

                  <template #iqcBillNo="rowData">
                    <t-space>
                      <t-link theme="primary" @click="onShowDialog(false, rowData)">{{ rowData.row.iqcBillNo }}</t-link>
                    </t-space>
                  </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
        <t-tab-panel value="tab2" :label="t('mitemIncomingInspection.检验完成')" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <cmp-query :opts="optsTab2" :is-expansion="true" @submit="conditionInspecEnter" @reset="onReset" />
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16 padding-bottom-line-0">
                <cmp-table
                  v-model:pagination="pageTab2"
                  row-key="id"
                  :hover="false"
                  :stript="false"
                  :table-column="inspectColumns"
                  :show-toolbar="false"
                  active-row-type="single"
                  :table-data="inspectData"
                  :total="inspectDataTotal"
                  :loading="loading"
                  :resizable="true"
                  :selected-row-keys="selectInspecId"
                  @select-change="onSelectInspecChange"
                  @refresh="fetchTableInspec"
                >
                  <template #title> </template>

                  <template #iqcBillNo="rowData">
                    <t-space>
                      <t-link theme="primary" @click="onShowDialog(false, rowData)">{{ rowData.row.iqcBillNo }}</t-link>
                    </t-space>
                  </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>

  <!--弹窗-->
  <formInspect ref="formRef" @parent-refresh-event="fetchTable"></formInspect>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiQuality } from '@/api/quality';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();

import formInspect from './formInspect.vue';

const formRef = ref(null);

const { loading } = useLoading();
const { pageUI: pageTab1 } = usePage();
const { pageUI: pageTab2 } = usePage();
const initialDate = ref(1);
const selectTabValue = ref('tab1');

const selectWaitId = ref([]);
const selectInspecId = ref([]);

const formData = reactive({
  queryData: {
    beginDatetimeReceipted: '',
    endDatetimeReceipted: '',
    conditions: [{ field: 'perfix', operator: 'EQ', value: 'PA' }],
    mitemCategoryId: '',
    mitemId: '',
    iqcBillNo: '',
    billNo: '',
    inspectGroupId: '',
  },
});

const formInspecData = reactive({
  queryData: {
    beginDatetimeInspectTion: '',
    endDatetimeInspectTion: '',
    personResponsibilityId: '',
    inspectGroupId: '',
    inspectResult: '',
    inspectStatus: '',
    handleMethod: '',
    iqcBillNo: '',
    billNo: '',
    mitemId: '',
    mitemCategoryId: '',
    supplierId: '',
    inspectStdCode: '',
  },
});

const inspectGroupOption = ref([{ label: t('mitemIncomingInspection.全部'), value: '' }]);
// 待检验
const optsTab1 = computed(() => {
  return {
    inspectGroupId: {
      label: t('mitemIncomingInspection.检验组'),
      comp: 't-select',
      defaultVal: '',
      bind: {
        class: 'check-box-conditon',
        options: inspectGroupOption.value,
        lazyLoad: true,
      },
    },
    billNo: {
      label: t('mitemIncomingInspection.接收单号'), // 来料接收单号
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'billInfo',
        showTitle: false,
        customConditions: formData.queryData.conditions,
      },
    },
    dateRange: {
      label: t('mitemIncomingInspection.接收日期'), // 来料接收单接收时间
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [],
      bind: {
        format: 'YYYY-MM-DD',
      },
    },
    mitemCategoryId: {
      label: t('mitemIncomingInspection.物料类别'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    mitemId: {
      label: t('mitemIncomingInspection.物料'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    iqcBillNo: {
      label: t('mitemIncomingInspection.检验单号'),
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});

// 检验完成
const optsTab2 = computed(() => {
  return {
    personResponsibilityId: {
      label: t('mitemIncomingInspection.检验员'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'person',
        showTitle: false,
      },
    },
    inspectGroupId: {
      label: t('mitemIncomingInspection.检验组'),
      comp: 't-select',
      defaultVal: '',
      bind: {
        class: 'check-box-conditon',
        options: inspectGroupOption.value,
        lazyLoad: true,
      },
    },
    dateRange: {
      label: t('mitemIncomingInspection.接收日期'),
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [],
      bind: {
        format: 'YYYY-MM-DD',
        disabled: true,
      },
    },
    dateRangeInspectTion: {
      label: t('mitemIncomingInspection.检验日期'),
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [],
      bind: {
        format: 'YYYY-MM-DD',
      },
    },
    inspectResult: {
      label: t('mitemIncomingInspection.检验结果'),
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: inspectResultOption.value,
      },
    },
    inspectStatus: {
      label: t('mitemIncomingInspection.处理状态'),
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: inspectStatusOption.value,
      },
    },
    handleMethod: {
      label: t('mitemIncomingInspection.处理方式'),
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: iqcHandleMethodOption.value,
      },
    },
    iqcBillNo: {
      label: t('mitemIncomingInspection.检验单号'), // 来料接收单号
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'IqcBillInfo',
        showTitle: false,
      },
    },
    billNo: {
      label: t('mitemIncomingInspection.接收单号'), // 来料接收单号
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'billInfo',
        showTitle: false,
        customConditions: formData.queryData.conditions,
      },
    },
    supplierId: {
      label: t('mitemIncomingInspection.供应商'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'supplier',
        showTitle: false,
      },
    },
    mitemCategoryId: {
      label: t('mitemIncomingInspection.物料类别'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    mitemId: {
      label: t('mitemIncomingInspection.物料'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    iqcInspectStdCode: {
      label: t('mitemIncomingInspection.检验标准'),
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});

const inspectResultOption = ref([
  { value: '', label: t('mitemIncomingInspection.全部') },
  { value: 'OK', label: t('mitemIncomingInspection.合格') },
  { value: 'NG', label: t('mitemIncomingInspection.不合格') },
]);
const inspectStatusOption = ref([]);
const iqcHandleMethodOption = ref([]);

const waitInspectDataTotal = ref(0);
const waitInspectData = ref([]);
const waitInspectColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 50,
  },
  { title: t('mitemIncomingInspection.检验单号'), width: 160, colKey: 'iqcBillNo' },
  { title: t('mitemIncomingInspection.接收单号'), width: 160, colKey: 'billNo' },
  { title: t('mitemIncomingInspection.物料类别'), width: 160, colKey: 'mitemCategoryName' },
  { title: t('mitemIncomingInspection.物料编码'), width: 160, colKey: 'mitemCode' },
  { title: t('mitemIncomingInspection.物料描述'), width: 160, colKey: 'mitemDesc' },
  { title: t('mitemIncomingInspection.供应商'), width: 160, colKey: 'supplierName' },
  { title: t('mitemIncomingInspection.严格度'), width: 160, colKey: 'inspectionStringencyName' },
  { title: t('mitemIncomingInspection.接收批量'), width: 160, colKey: 'pickQty' },
  { title: t('mitemIncomingInspection.单位'), width: 160, colKey: 'uomName' },
  { title: t('mitemIncomingInspection.接收人'), width: 160, colKey: 'userReceiptedDisplayName' },
  { title: t('mitemIncomingInspection.接收时间'), width: 200, colKey: 'datetimeReceipted' },
  { title: t('mitemIncomingInspection.停留时长'), width: 160, colKey: 'waitTime' },
  {
    title: t('mitemIncomingInspection.操作'),
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'op',
  },
];

const inspectDataTotal = ref(0);
const inspectData = ref([]);
const inspectColumns: PrimaryTableCol<TableRowData>[] = [
  { title: t('mitemIncomingInspection.检验单号'), width: 160, colKey: 'iqcBillNo' },
  { title: t('mitemIncomingInspection.接收单号'), width: 160, colKey: 'billNo' },
  {
    title: t('mitemIncomingInspection.抽样方式'),
    width: 100,
    colKey: 'IsExemptionInspectionName',
  },
  { title: t('mitemIncomingInspection.检验结果'), width: 160, colKey: 'inspectResultName' },
  { title: t('mitemIncomingInspection.处理方式'), width: 160, colKey: 'handleMethodName' },
  { title: t('mitemIncomingInspection.处理状态'), width: 160, colKey: 'statusName' },
  { title: t('mitemIncomingInspection.物料类别'), width: 160, colKey: 'mitemCategoryName' },
  { title: t('mitemIncomingInspection.物料编码'), width: 160, colKey: 'mitemCode' },
  { title: t('mitemIncomingInspection.物料描述'), width: 160, colKey: 'mitemDesc' },
  { title: t('mitemIncomingInspection.供应商'), width: 160, colKey: 'supplierName' },
  { title: t('mitemIncomingInspection.严格度'), width: 100, colKey: 'inspectStringencyName' },
  { title: t('mitemIncomingInspection.检验数量'), width: 100, colKey: 'inspectQty' },
  { title: t('mitemIncomingInspection.单位'), width: 100, colKey: 'uomName' },
  { title: t('mitemIncomingInspection.检验员'), width: 160, colKey: 'displayName' },
  { title: t('mitemIncomingInspection.检验时间'), width: 200, colKey: 'timeCreate' },
  { title: t('mitemIncomingInspection.检验标准'), width: 160, colKey: 'inspectStdName' },
  { title: t('mitemIncomingInspection.停留时长'), width: 160, colKey: 'waitTime' },
  {
    title: t('mitemIncomingInspection.操作'),
    align: 'left',
    fixed: 'right',
    width: 160,
    colKey: 'op',
  },
];

const getIqcInspectionStatus = async () => {
  inspectStatusOption.value = [];
  const data = await apiMain.param.getListByGroupCode({
    parmGroupCode: 'Q_INSPECTION_STATUS',
  });

  inspectStatusOption.value.push({ value: '', label: t('mitemIncomingInspection.全部') });
  data.forEach((item) => {
    inspectStatusOption.value.push({ value: item.value, label: item.label });
  });
};
const getIqcHandleMethod = async () => {
  iqcHandleMethodOption.value = [];
  const data = await apiMain.param.getListByGroupCode({
    parmGroupCode: 'Q_IQC_HANDLE_METHOD',
  });

  iqcHandleMethodOption.value.push({ value: '', label: t('mitemIncomingInspection.全部') });
  data.forEach((item) => {
    iqcHandleMethodOption.value.push({ value: item.value, label: item.label });
  });
};
const conditionEnter = (query: any) => {
  pageTab1.value.page = 1;
  const [dateRangeStart, dateRangeEnd] = query.dateRange;

  // 计算日期范围的天数差异
  const daysDifference = dayjs(dateRangeEnd).diff(dayjs(dateRangeStart), 'day');
  // 如果选择的天数超过31天，则调整日期范围
  if (daysDifference > 31) {
    // 将结束日期调整为开始日期的后31天
    MessagePlugin.warning(t('mitemIncomingInspection.日期跨度不得超过31天'));
    return;
  }

  formData.queryData.beginDatetimeReceipted = dateRangeStart;
  formData.queryData.endDatetimeReceipted = dateRangeEnd;
  formData.queryData.mitemCategoryId = query.mitemCategoryId;
  formData.queryData.inspectGroupId = query.inspectGroupId;
  formData.queryData.mitemId = query.mitemId;
  formData.queryData.billNo = query.billNo;
  formData.queryData.iqcBillNo = query.iqcBillNo;

  fetchTable();
};
const conditionInspecEnter = (query: any) => {
  pageTab2.value.page = 1;
  const [dateRangeStart, dateRangeEnd] = query.dateRangeInspectTion;

  // 计算日期范围的天数差异
  const daysDifference = dayjs(dateRangeEnd).diff(dayjs(dateRangeStart), 'day');
  // 如果选择的天数超过31天，则调整日期范围
  if (daysDifference > 31) {
    // 将结束日期调整为开始日期的后31天
    MessagePlugin.warning(t('mitemIncomingInspection.日期跨度不得超过31天'));
    return;
  }

  formInspecData.queryData.beginDatetimeInspectTion = dateRangeStart;
  formInspecData.queryData.endDatetimeInspectTion = dateRangeEnd;
  formInspecData.queryData.personResponsibilityId = query.personResponsibilityId;
  formInspecData.queryData.inspectGroupId = query.inspectGroupId;
  formInspecData.queryData.inspectResult = query.inspectResult;
  formInspecData.queryData.inspectStatus = query.inspectStatus;
  formInspecData.queryData.handleMethod = query.handleMethod;
  formInspecData.queryData.iqcBillNo = query.iqcBillNo;
  formInspecData.queryData.billNo = query.billNo;
  formInspecData.queryData.mitemId = query.mitemId;
  formInspecData.queryData.mitemCategoryId = query.mitemCategoryId;
  formInspecData.queryData.supplierId = query.supplierId;
  formInspecData.queryData.inspectStdCode = query.iqcInspectStdCode;

  fetchTableInspec();
};
const onReset = () => {
  formData.queryData.beginDatetimeReceipted = dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD');
  formData.queryData.endDatetimeReceipted = dayjs().format('YYYY-MM-DD');

  fetchTable();
};
const getInspectGroupByUser = async () => {
  try {
    const list = await apiQuality.inspectGroup.getInspectGroupByUser();
    list.forEach((item) => {
      inspectGroupOption.value.push({
        label: item.inspectGroupName,
        value: item.id,
      });
    });
  } catch (e) {
    console.log(e);
  }
};
const fetchTable = async () => {
  try {
    const list = await apiQuality.iqcInspect.getMitemReceiveBillVo({
      pageNum: pageTab1.value.page,
      pageSize: pageTab1.value.rows,
      prefix: 'PA',
      beginDatetimeReceipted: formData.queryData.beginDatetimeReceipted,
      endDatetimeReceipted: formData.queryData.endDatetimeReceipted,
      mitemCategoryId: formData.queryData.mitemCategoryId,
      inspectGroupId: formData.queryData.inspectGroupId,
      mitemId: formData.queryData.mitemId,
      iqcBillNo: formData.queryData.iqcBillNo,
      billNo: formData.queryData.billNo,
    });
    waitInspectData.value = list.list;
    waitInspectDataTotal.value = list.total;
  } catch (e) {
    console.log(e);
  }
};
const fetchTableInspec = async () => {
  try {
    const list = await apiQuality.iqcInspectBill.getIqcInspectDtlFullBillList({
      pageNum: pageTab2.value.page,
      pageSize: pageTab2.value.rows,
      beginDatetimeInspectTion: formInspecData.queryData.beginDatetimeInspectTion,
      endDatetimeInspectTion: formInspecData.queryData.endDatetimeInspectTion,
      personResponsibilityId: formInspecData.queryData.personResponsibilityId,
      inspectGroupId: formInspecData.queryData.inspectGroupId,
      inspectResult: formInspecData.queryData.inspectResult,
      inspectStatus: formInspecData.queryData.inspectStatus,
      handleMethod: formInspecData.queryData.handleMethod,
      iqcBillNo: formInspecData.queryData.iqcBillNo,
      billNo: formInspecData.queryData.billNo,
      mitemId: formInspecData.queryData.mitemId,
      mitemCategoryId: formInspecData.queryData.mitemCategoryId,
      supplierId: formInspecData.queryData.supplierId,
      inspectStdCode: formInspecData.queryData.inspectStdCode,
    });
    inspectData.value = list.list;
    inspectDataTotal.value = list.total;
  } catch (e) {
    console.log(e);
  }
};
const tabsChange = async (tabValue) => {
  selectTabValue.value = tabValue;
};
const pageInit = async () => {
  getInspectGroupByUser();
  getIqcHandleMethod();
  getIqcInspectionStatus();
};
const onSelectWaitInspectChange = (value: any) => {
  selectWaitId.value = value;
};
const onSelectInspecChange = (value: any) => {
  selectInspecId.value = value;
};
const onShowDialog = async (isEdit, rowData) => {
  const { showForm } = formRef.value;
  await showForm(isEdit, rowData.row);
};

// 合并检验
const mergeInspection = async (isEdit) => {
  checkSelected().then(async (isRun) => {
    if (isRun) {
      const selectKeys = waitInspectData.value.filter((n) => selectWaitId.value.indexOf(n.id) !== -1);
      const { showMergeForm } = formRef.value;
      await showMergeForm(isEdit, selectKeys);
    }
  });
};
// 一键合格
const directInspectOk = async () => {
  checkSelected().then(async (isRun) => {
    if (isRun) {
      const selectKeys = waitInspectData.value.filter((n) => selectWaitId.value.indexOf(n.id) !== -1);
      const sumPickQty = selectKeys.reduce((previousValue, currentValue) => previousValue + currentValue.pickQty, 0);

      const bills = [];
      selectKeys.forEach((item) => {
        bills.push({ billNo: item.billNo, billNoDtlId: item.id });
      });

      await apiQuality.iqcInspect.createdIqcInspectAndStockIn({
        inspectionStringency: selectKeys[0].inspectionStringency,
        mitemId: selectKeys[0].mitemId,
        mitemCode: selectKeys[0].mitemCode,
        mitemCategoryId: selectKeys[0].mitemCategoryId,
        supplierId: selectKeys[0].supplierId,
        pickQty: sumPickQty,
        billNoList: bills,
        directInspectOk: true,
      });

      await fetchTable();
      MessagePlugin.success(t('mitemIncomingInspection.一键合格成功'));
    }
  });
};
// 一键判退
const directInspectNg = async () => {
  checkSelected().then(async (isRun) => {
    if (isRun) {
      const selectKeys = waitInspectData.value.filter((n) => selectWaitId.value.indexOf(n.id) !== -1);
      const sumPickQty = selectKeys.reduce((previousValue, currentValue) => previousValue + currentValue.pickQty, 0);

      const bills = [];
      selectKeys.forEach((item) => {
        bills.push({ billNo: item.billNo, billNoDtlId: item.id });
      });

      await apiQuality.iqcInspect.createdIqcInspectAndStockIn({
        inspectionStringency: selectKeys[0].inspectionStringency,
        mitemId: selectKeys[0].mitemId,
        mitemCode: selectKeys[0].mitemCode,
        mitemCategoryId: selectKeys[0].mitemCategoryId,
        supplierId: selectKeys[0].supplierId,
        pickQty: sumPickQty,
        billNoList: bills,
        directInspectNg: true,
      });

      await fetchTable();
      MessagePlugin.success(t('mitemIncomingInspection.一键判退成功'));
    }
  });
};

const checkSelected = async () => {
  if (selectWaitId.value.length <= 0) {
    MessagePlugin.error(t('mitemIncomingInspection.请选择待检单'));
    return false;
  }

  const selectKeys = waitInspectData.value.filter((n) => selectWaitId.value.indexOf(n.id) !== -1);

  for (let index = 0; index < selectKeys.length; index++) {
    const element = selectKeys[index];
    if (!_.isEmpty(element.iqcBillNo)) {
      MessagePlugin.error(t('mitemIncomingInspection.单据不允许重复检验'));
      return false;
    }
  }

  // 相同供应商
  const distinctSupplierCode = selectKeys
    .map((n) => n.supplierCode)
    .filter((value, index, self) => self.indexOf(value) === index) as Array<String>;
  if (!_.isEmpty(distinctSupplierCode) && distinctSupplierCode.length > 1) {
    MessagePlugin.error(t('mitemIncomingInspection.只能选择相同供应商的接收单'));
    return false;
  }

  // 相同物料
  const distinctMitemCode = selectKeys
    .map((n) => n.mitemCode)
    .filter((value, index, self) => self.indexOf(value) === index) as Array<String>;
  if (!_.isEmpty(distinctMitemCode) && distinctMitemCode.length > 1) {
    MessagePlugin.error(t('mitemIncomingInspection.只能选择相同物料的接收单'));
    return false;
  }

  // 相同接收时间
  const distinctDatetimeReceipted = selectKeys
    .map((n) => dayjs(n.datetimeReceipted).format('YYYY-MM-DD'))
    .filter((value, index, self) => self.indexOf(value) === index) as Array<String>;
  if (!_.isEmpty(distinctDatetimeReceipted) && distinctDatetimeReceipted.length > 1) {
    MessagePlugin.error(t('mitemIncomingInspection.只能选择相同日期的接收单'));
    return false;
  }

  return true;
};

onMounted(() => {
  pageInit().then(() => {
    fetchTable();
  });
});
</script>
<style lang="less" scoped>
:deep .t-table__row--active {
  background-color: var(--td-brand-color-light) !important;
}
</style>
