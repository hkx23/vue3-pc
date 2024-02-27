<template>
  <cmp-container :full="true">
    <cmp-card class="not-full-tab">
      <t-tabs :model-value="selectTabValue" @change="tabsChange">
        <t-tab-panel value="tab1" label="待检验" :destroy-on-hide="false">
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
                  @select-change="onSelectRepairChange"
                  @refresh="fetchTable"
                >
                  <template #title> 工作台 </template>
                  <template #button>
                    <t-button theme="primary" @click="mergeInspection(true)">合并检验</t-button>
                  </template>
                  <template #op="rowData">
                    <t-space>
                      <t-link
                        v-if="rowData.row.inspectResult === 'UNINSPECT' || _.isEmpty(rowData.row.iqcBillNo)"
                        theme="primary"
                        @click="onShowDialog(true, rowData)"
                        >检验</t-link
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
        <t-tab-panel value="tab2" label="检验完成" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <cmp-query :opts="optsTab2" :is-expansion="true" @submit="conditionEnter" @reset="onReset" />
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16 padding-bottom-line-0"> </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>

  <!--弹窗-->
  <formInspect ref="formRef" @parent-refresh-event="fetchTable"></formInspect>
</template>

<script setup lang="ts">
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

import formInspect from './formInspect.vue';

const formRef = ref(null);

const { loading } = useLoading();
const { pageUI: pageTab1 } = usePage();
const initialDate = ref(1);
const selectTabValue = ref('tab1');
const selectWaitId = ref([]);
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

const inspectGroupOption = ref([{ label: '全部', value: '' }]);
// 待检验
const optsTab1 = computed(() => {
  return {
    inspectGroupId: {
      label: '检验组',
      comp: 't-select',
      defaultVal: '',
      bind: {
        class: 'check-box-conditon',
        options: inspectGroupOption.value,
        lazyLoad: true,
      },
      row: 1,
    },
    billNo: {
      label: '接收单号', // 来料接收单号
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'billInfo',
        showTitle: false,
        customConditions: formData.queryData.conditions,
      },
      row: 1,
    },
    dateRange: {
      label: '接收日期', // 来料接收单接收时间
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [],
      bind: {
        format: 'YYYY-MM-DD',
      },
      row: 1,
    },
    mitemCategoryId: {
      label: '物料类别',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
      row: 2,
    },
    mitemId: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
      row: 2,
    },
    iqcBillNo: {
      label: '检验单号',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
      row: 2,
    },
  };
});

// 检验完成
const optsTab2 = computed(() => {
  return {
    personId: {
      label: '检验员',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'person',
        showTitle: false,
      },
      row: 1,
    },
    inspectGroupId: {
      label: '检验组',
      comp: 't-select',
      defaultVal: '',
      bind: {
        class: 'check-box-conditon',
        options: inspectGroupOption.value,
        lazyLoad: true,
      },
      row: 1,
    },
    dateRange: {
      label: '接收日期',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [],
      bind: {
        format: 'YYYY-MM-DD',
      },
      row: 1,
    },
    dateRangeInspectTion: {
      label: '检验日期',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [],
      bind: {
        format: 'YYYY-MM-DD',
      },
      row: 2,
    },
    inspectResult: {
      label: '检验结果',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: inspectResultOption.value,
      },
      row: 2,
    },
    inspectStatus: {
      label: '处理状态',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: inspectStatusOption.value,
      },
      row: 2,
    },
    handleMethod: {
      label: '处理方式',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: iqcHandleMethodOption.value,
      },
      row: 3,
    },
    iqcBillNo: {
      label: '检验单号',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
      row: 3,
    },
    billNo: {
      label: '接收单号', // 来料接收单号
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'billInfo',
        showTitle: false,
        customConditions: formData.queryData.conditions,
      },
      row: 3,
    },
    supplierId: {
      label: '供应商',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'supplier',
        showTitle: false,
      },
      row: 3,
    },
    mitemCategoryId: {
      label: '物料类别',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
      row: 4,
    },
    mitemId: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
      row: 4,
    },
    iqcInspectStdId: {
      label: '检验标准',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
      row: 4,
    },
  };
});

const inspectResultOption = ref([
  { value: '', label: '全部' },
  { value: 'OK', label: '合格' },
  { value: 'NG', label: '不合格' },
]);
const inspectStatusOption = ref([
  { value: '', label: '全部' },
  { value: 'UNINSPECT', label: '待检验' },
  { value: 'INSPECTING', label: '检验中' },
  { value: 'APPROVALING', label: '审批中' },
  { value: 'COMPLETED', label: '已完成' },
]);
const iqcHandleMethodOption = ref([]);

const waitInspectDataTotal = ref(0);
const waitInspectData = ref([]);
const waitInspectColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 50,
  },
  { title: '检验单号', width: 160, colKey: 'iqcBillNo' },
  { title: '接收单号', width: 160, colKey: 'billNo' },
  { title: '物料类别', width: 160, colKey: 'mitemCategoryName' },
  { title: '物料编码', width: 160, colKey: 'mitemCode' },
  { title: '物料描述', width: 160, colKey: 'mitemDesc' },
  { title: '供应商', width: 160, colKey: 'supplierName' },
  { title: '严格度', width: 160, colKey: 'inspectionStringencyName' },
  { title: '接收批量', width: 160, colKey: 'pickQty' },
  { title: '单位', width: 160, colKey: 'uomName' },
  { title: '接收人', width: 160, colKey: 'userReceiptedDisplayName' },
  { title: '接收时间', width: 200, colKey: 'datetimeReceipted' },
  { title: '停留时长', width: 160, colKey: 'waitTime' },
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];

const getIqcHandleMethod = async () => {
  iqcHandleMethodOption.value = [];
  const data = await apiMain.param.getListByGroupCode({
    parmGroupCode: 'Q_IQC_HANDLE_METHOD',
  });

  iqcHandleMethodOption.value.push({ value: '', label: '全部' });
  data.forEach((item) => {
    iqcHandleMethodOption.value.push({ value: item.value, label: item.label });
  });
};
const conditionEnter = (query: any) => {
  const [dateRangeStart, dateRangeEnd] = query.dateRange;

  // 计算日期范围的天数差异
  const daysDifference = dayjs(dateRangeEnd).diff(dayjs(dateRangeStart), 'day');
  // 如果选择的天数超过31天，则调整日期范围
  if (daysDifference > 31) {
    // 将结束日期调整为开始日期的后31天
    MessagePlugin.warning('日期跨度不得超过31天');
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
const onReset = () => {
  formData.queryData.beginDatetimeReceipted = dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD');
  formData.queryData.endDatetimeReceipted = dayjs().format('YYYY-MM-DD');

  fetchTable();
};
const getInspectGroupByUser = async () => {
  try {
    const list = await apiQuality.inspectGroup.getInspectGroupByUser();
    list.forEach((item) => {
      inspectGroupOption.value.push({ label: item.inspectGroupName, value: item.id });
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
const tabsChange = async (tabValue) => {
  selectTabValue.value = tabValue;
};
const pageInit = async () => {
  getInspectGroupByUser();
  getIqcHandleMethod();
};
const onSelectRepairChange = (value: any) => {
  selectWaitId.value = value;
};
const onShowDialog = async (isEdit, rowData) => {
  const { showForm, loadTable } = formRef.value;
  await showForm(isEdit, rowData.row);
  await loadTable();
};
const mergeInspection = async (isEdit) => {
  if (selectWaitId.value.length <= 0) {
    MessagePlugin.error('请选择待检单.');
    return;
  }

  const selectKeys = waitInspectData.value.filter((n) => selectWaitId.value.indexOf(n.id) !== -1);

  for (let index = 0; index < selectKeys.length; index++) {
    const element = selectKeys[index];
    if (!_.isEmpty(element.iqcBillNo)) {
      MessagePlugin.error('单据不允许重复检验.');
      return;
    }
  }

  // 相同供应商
  const distinctSupplierCode = selectKeys
    .map((n) => n.supplierCode)
    .filter((value, index, self) => self.indexOf(value) === index) as Array<String>;
  if (!_.isEmpty(distinctSupplierCode) && distinctSupplierCode.length > 1) {
    MessagePlugin.error('只能选择相同供应商的接收单');
    return;
  }

  // 相同物料
  const distinctMitemCode = selectKeys
    .map((n) => n.mitemCode)
    .filter((value, index, self) => self.indexOf(value) === index) as Array<String>;
  if (!_.isEmpty(distinctMitemCode) && distinctMitemCode.length > 1) {
    MessagePlugin.error('只能选择相同物料的接收单');
    return;
  }

  // 相同接收时间
  const distinctDatetimeReceipted = selectKeys
    .map((n) => dayjs(n.datetimeReceipted).format('YYYY-MM-DD'))
    .filter((value, index, self) => self.indexOf(value) === index) as Array<String>;
  if (!_.isEmpty(distinctDatetimeReceipted) && distinctDatetimeReceipted.length > 1) {
    MessagePlugin.error('只能选择相同日期的接收单');
    return;
  }

  const { showMergeForm, loadTable } = formRef.value;
  await showMergeForm(isEdit, selectKeys);
  await loadTable();
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
