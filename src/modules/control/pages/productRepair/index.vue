<template>
  <cmp-container :full="true">
    <bcmp-workstation-info />
    <cmp-card class="not-full-tab">
      <t-tabs :model-value="selectTabValue" @change="tabsChange">
        <t-tab-panel value="tab1" label="产品维修台账" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :gutter="[0, 0]">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <cmp-query :opts="opts" :is-expansion="true" @submit="conditionEnter" @reset="onReset" />
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16 padding-bottom-line-0">
                <cmp-table
                  v-model:pagination="pageTab1"
                  row-key="id"
                  :hover="false"
                  :stript="false"
                  :table-column="repairColumns"
                  active-row-type="single"
                  :table-data="repairData"
                  :total="repairDataTotal"
                  :loading="loading"
                  :resizable="true"
                  :selected-row-keys="selectRepairId"
                  @select-change="onSelectRepairChange"
                  @active-change="onActiveChange"
                  @refresh="fetchTable"
                >
                  <template #title> 维修记录 </template>
                  <template #button>
                    <t-button theme="primary" @click="onBatchRepairing">批量维修</t-button>
                  </template>
                  <template #op="slotProps">
                    <t-space>
                      <t-link theme="primary" @click="onRepairRowClick(slotProps)">{{
                        t('productRepair.Repair')
                      }}</t-link>
                    </t-space>
                  </template>
                </cmp-table>
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16" style="padding-bottom: 16px">
                <cmp-table
                  :show-pagination="false"
                  row-key="id"
                  :table-column="repairDtlColumns"
                  :table-data="repairDtlData"
                  :loading="loading"
                  :resizable="true"
                  @refresh="fetchDtlTable"
                >
                  <template #title> 维修明细 </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
        <!-- ###############    产品维修工作台 表格数据   ######## -->
        <t-tab-panel value="tab2" label="产品维修工作台" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :gutter="[0, 0]">
              <cmp-card :ghost="true" class="padding-bottom-line-0">
                <cmp-table
                  v-model:pagination="pageTab2"
                  row-key="id"
                  :hover="false"
                  :stript="false"
                  :table-column="repairingColumns"
                  active-row-type="single"
                  :table-data="repairingData"
                  :total="repairingDataTotal"
                  :loading="loading"
                  :show-refresh="true"
                  :resizable="true"
                  :selected-row-keys="selectRepairingIds"
                  @select-change="onSelectRepairingChange"
                  @refresh="fetchRepairingTable"
                >
                  <!-- <template #op="slotProps"> -->
                  <template #op="slotProps">
                    <t-space>
                      <t-link theme="primary" @click="onDeleteClick(slotProps)">{{
                        t('productRepair.UnRepair')
                      }}</t-link>
                    </t-space>
                  </template>
                </cmp-table>
              </cmp-card>
              <cmp-card :ghost="true">
                <t-row>
                  <cmp-card :span="4" :ghost="true" style="padding: 8px">
                    <t-tabs :default-value="1">
                      <t-tab-panel :value="1" label="缺陷原因" :destroy-on-hide="false">
                        <template #panel>
                          <t-radio-group
                            v-model="formData.queryData.checkedDefectReason"
                            :options="formData.queryData.defectReasonOptions"
                          />
                        </template>
                      </t-tab-panel>
                    </t-tabs>
                  </cmp-card>
                  <cmp-card :span="4" :ghost="true" style="padding: 8px">
                    <t-tabs :default-value="1">
                      <t-tab-panel :value="1" label="处理方法" :destroy-on-hide="false">
                        <template #panel>
                          <t-checkbox-group
                            v-model="formData.queryData.checkedDefectDealMethod"
                            :options="formData.queryData.defectDealMethodOptions"
                          />
                        </template>
                      </t-tab-panel>
                    </t-tabs>
                  </cmp-card>
                  <cmp-card :span="4" :ghost="true" style="padding: 8px">
                    <t-tabs :default-value="1">
                      <t-tab-panel :value="1" label="责任别" :destroy-on-hide="false">
                        <template #panel>
                          <t-radio-group
                            v-model="formData.queryData.checkedDefectBlame"
                            :options="formData.queryData.defectBlameOptions"
                          />
                        </template>
                      </t-tab-panel>
                    </t-tabs>
                  </cmp-card>
                </t-row>
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-line-0">
                <t-row>
                  <cmp-card :span="4" :ghost="true" style="padding: 8px">
                    <bcmp-select-business
                      v-model="formData.queryData.returnRoutingProcessId"
                      type="processReturn"
                      placeholder="请选择回流工序"
                      :show-title="false"
                      label="回流工序"
                      :custom-conditions="formData.queryData.conditions"
                    />
                  </cmp-card>
                  <cmp-card :span="4" :ghost="true" style="padding: 8px">
                    <t-checkbox v-model="formData.queryData.isScrapped" label="是否报废" />
                  </cmp-card>
                </t-row>
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-line-0">
                <t-row>
                  <cmp-card :span="8" :ghost="true" style="padding: 8px">
                    <cmp-table
                      row-key="id"
                      :hover="false"
                      :stript="false"
                      :table-column="keyPartColumns"
                      active-row-type="single"
                      :table-data="keyPartData"
                      :total="keyPartDataTotal"
                      :loading="loading"
                      :show-refresh="true"
                      :resizable="true"
                      :show-toolbar="false"
                      :show-pagination="false"
                      @refresh="fetchKeyPartTable"
                    >
                      <template #newKeypartBarcode="{ row }">
                        <t-space>
                          <t-input placeholder="请输入关键件信息" :value="row.newKeypartBarcode" />
                        </t-space>
                      </template>
                      <template #op="{ row }">
                        <t-space>
                          <t-link theme="primary" @click="onKeyPartReplace(row)">替换</t-link>
                        </t-space>
                      </template>
                    </cmp-table>
                  </cmp-card>
                  <cmp-card :span="4" :ghost="true" style="padding: 8px">
                    <t-space :size="8" style="float: right">
                      <t-button content="维修完成" @click="onSubmit" />
                      <t-button theme="default" content="重置" @click="onReset" />
                    </t-space>
                  </cmp-card>
                </t-row>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
// import { DialogPlugin } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref, watch } from 'vue';

import { api as apiControl, WipRepairDtlVO, WipRepairIds, WipRepairVO } from '@/api/control';
import { api as apiMain } from '@/api/main';
import BcmpWorkstationInfo from '@/components/bcmp-workstation-info/index.vue';
// import { api as apiMain } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import { useUserStore } from '@/store';

import { useLang } from './lang';

const { t } = useLang(); // 使用多语言
const userStore = useUserStore();
const { loading } = useLoading();
const { pageUI: pageTab1 } = usePage();
const { pageUI: pageTab2 } = usePage();
const repairDataTotal = ref(0);
const repairingDataTotal = ref(0);
const keyPartDataTotal = ref(0);
const initialDate = ref(1);
const selectTabValue = ref('tab1');
const selectRepairId = ref([]); // 待维修的主表数据
const selectRepairingIds = ref([]); // 维修中选中的明细数据
// const selectWipRepairingId = ref([]); // 维修中选中的主表
const selectWipRepairIds = ref<WipRepairIds[]>([]); // 维修中选中的主表
const selectRepairRowId = ref(null);
const formData = reactive({
  queryData: {
    beginDate: dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD'),
    moScheId: '',
    mitemId: '',
    mitemCode: '',
    mitemName: '',
    barcode: '',
    isRepair: [],
    routingRevisionId: '',
    // processId: userStore.currUserOrgInfo.processId,
    // processCode: userStore.currUserOrgInfo.processCode,
    // processName: userStore.currUserOrgInfo.processName,
    // workCenterId: userStore.currUserOrgInfo.workCenterId,
    // workCenterCode: userStore.currUserOrgInfo.workCenterCode,
    // workCenterName: userStore.currUserOrgInfo.workCenterName,
    isRepairOptions: [
      { value: 'UNREPAIR', label: '待维修' },
      { value: 'REPAIRING', label: '维修中' },
      { value: 'REPAIRED', label: '已维修' },
    ],
    checkedDefectDealMethod: [],
    defectDealMethodOptions: [],
    checkedDefectReason: '',
    defectReasonOptions: [],
    checkedDefectBlame: '',
    defectBlameOptions: [],
    returnRoutingProcessId: '',
    isScrapped: false,
    wipRepairIds: [],
    conditions: [],
  },
});

// 查询组件
const opts = computed(() => {
  return {
    dateRange: {
      label: '返工日期',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')], // 初始化日期控件
      bind: {
        format: 'YYYY-MM-DD',
      },
      row: 1,
    },
    moScheId: {
      label: '排产工单',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
      row: 1,
    },
    barcode: {
      label: '条码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
      row: 2,
    },
    isRepair: {
      label: '',
      comp: 't-checkbox-group',
      defaultVal: ['UNREPAIR'],
      bind: {
        options: formData.queryData.isRepairOptions,
        lazyLoad: true,
      },
      row: 2,
    },
  };
});
const repairData = ref<WipRepairVO[]>([]);
const repairColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    // type: 'single',
    type: 'multiple',
    // checkProps: { allowUncheck: true }, // 允许单选(Radio)取消行选中
    width: 50,
  },
  { title: t('business.main.serialNumber'), colKey: 'serial-number', width: 74 },
  { title: t('business.control.scanBarcode'), width: 160, colKey: 'scanBarcode' },
  { title: t('business.control.moScheCode'), width: 160, colKey: 'moScheCode' },
  { title: t('business.control.productCode'), width: 160, colKey: 'mitemCode' },
  { title: t('business.control.productName'), width: 160, colKey: 'mitemName' },
  { title: t('business.control.fromRoutingProcessName'), width: 160, colKey: 'fromRoutingProcessName' },
  { title: t('business.control.fromWorkstationName'), width: 160, colKey: 'fromWorkstationName' },
  { title: t('business.control.scanTime'), width: 160, colKey: 'timeCreate' },
  { title: t('business.control.retentionTime'), width: 160, colKey: 'retentionTime' },
  {
    title: t('business.control.ngTimes'),
    width: 160,
    colKey: 'ngTimes',
    attrs: (content) => {
      if (content.row.outTimeShowColor === 'Red') {
        return {
          style: {
            color: 'white',
            backgroundColor: 'red',
          },
        };
      }
      return '';
    },
  },
  {
    title: t('business.control.repairTimes'),
    width: 160,
    colKey: 'repairTimes',
    attrs: (content) => {
      if (content.row.outTimeShowColor === 'Red') {
        return {
          style: {
            color: 'white',
            backgroundColor: 'red',
          },
        };
      }
      return '';
    },
  },
  { title: t('business.control.repairStatus'), width: 160, colKey: 'repairStatusName' },
  { title: t('common.button.operation'), align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];
const repairDtlData = ref<WipRepairDtlVO[]>([]);
const repairDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { title: t('business.control.scanBarcode'), width: 160, colKey: 'scanBarcode' },
  { title: t('business.control.defectName'), width: 160, colKey: 'defectName' },
  { title: t('business.control.defectReason'), width: 160, colKey: 'defectReason' },
  { title: t('business.control.userNameRepair'), width: 160, colKey: 'displayNameRepair' },
  { title: t('business.control.datetimeRepaired'), width: 160, colKey: 'datetimeRepaired' },
  { title: t('business.control.repairTimes'), width: 160, colKey: 'repairTimes' },
  { title: t('business.control.defectDealMethodName'), width: 160, colKey: 'defectDealMethodName' },
  { title: t('business.control.defectBlame'), width: 160, colKey: 'defectBlame' },
  { title: t('business.control.repairResult'), width: 160, colKey: 'repairStatusName' },
];

const repairingData = ref<WipRepairVO[]>([]);
const repairingColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    // type: 'single',
    type: 'multiple',
    // checkProps: { allowUncheck: true }, // 允许单选(Radio)取消行选中
    width: 50,
  },
  { title: t('business.main.serialNumber'), colKey: 'serial-number', width: 74 },
  { title: t('business.control.scanBarcode'), width: 160, colKey: 'scanBarcode' },
  { title: t('business.control.moScheCode'), width: 160, colKey: 'moScheCode' },
  { title: t('business.control.productCode'), width: 160, colKey: 'mitemCode' },
  { title: t('business.control.productName'), width: 160, colKey: 'mitemName' },
  { title: t('business.control.fromRoutingProcessName'), width: 160, colKey: 'fromRoutingProcessName' },
  { title: t('business.control.fromWorkstationName'), width: 160, colKey: 'fromWorkstationName' },
  { title: t('business.control.defectName'), width: 160, colKey: 'defectName' },
  { title: t('business.control.scanTime'), width: 200, colKey: 'timeCreate' },
  { title: t('business.control.retentionTime'), width: 160, colKey: 'retentionTime' },
  { title: t('business.control.ngTimes'), width: 160, colKey: 'ngTimes' },
  { title: t('business.control.repairTimes'), width: 160, colKey: 'repairTimes' },
  { title: t('business.control.repairStatus'), width: 160, colKey: 'repairStatusName' },
  { title: t('common.button.operation'), align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];

const keyPartData = ref([]);
const keyPartColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '序号', colKey: 'serial-number', width: 74 },
  { title: '产品条码', width: 160, colKey: 'runCard' },
  { title: '关键件条码', width: 160, colKey: 'keypartBarcode' },
  { title: '物料编码', width: 160, colKey: 'mitemCode' },
  { title: '物料名称', width: 160, colKey: 'mitemName' },
  { title: '新关键件信息', width: 160, colKey: 'newKeypartBarcode' },
  { title: '操作', align: 'left', fixed: 'right', width: 160, colKey: 'op' },
];

watch(
  () => selectRepairingIds.value,
  (newval) => {
    console.log(newval);
    fetchKeyPartTable();
  },
  { deep: true },
);

// 点击查询按钮
const conditionEnter = (query: any) => {
  formData.queryData.barcode = query.barcode;
  formData.queryData.moScheId = query.moScheId;

  const [dateRangeStart, dateRangeEnd] = query.dateRange;
  formData.queryData.beginDate = dateRangeStart;
  formData.queryData.endDate = dateRangeEnd;
  formData.queryData.isRepair = query.isRepair;

  fetchTable();
};
// 重置按钮
const onReset = () => {
  formData.queryData.barcode = '';
  formData.queryData.moScheId = '';
  formData.queryData.isRepair = [];
  formData.queryData.beginDate = dayjs().subtract(+initialDate.value, 'day').format('YYYY-MM-DD');
  formData.queryData.endDate = dayjs().format('YYYY-MM-DD');
  formData.queryData.routingRevisionId = '';
  formData.queryData.checkedDefectBlame = '';
  formData.queryData.checkedDefectDealMethod = [];
  formData.queryData.checkedDefectReason = '';

  fetchTable();
  fetchRepairingTable();
  getDefectDealMethod();
  getDefectReason();
  getDefectBlame();
};
// 删除按钮
const onDeleteClick = async ({ row }) => {
  await apiControl.wipRepair.updateWipRepairUnRepair({
    wipRepairIds: [row.wipRepairId],
  });

  await fetchRepairingTable();
};

// 维修完成按钮
const onSubmit = async () => {
  if (selectRepairingIds.value.length === 0) {
    MessagePlugin.error('请选择维修产品。');
    return;
  }

  if (_.isEmpty(formData.queryData.returnRoutingProcessId)) {
    MessagePlugin.error('请选择回流工序');
    return;
  }

  const listSelectWipRepairing = repairingData.value.filter((value) => selectRepairingIds.value.indexOf(value.id) > -1);

  listSelectWipRepairing.forEach((item) => {
    const ids = selectWipRepairIds.value.find((n) => n.wipRepairId === item.wipRepairId);
    if (ids === null || ids === undefined) {
      selectWipRepairIds.value.push({ wipRepairId: item.wipRepairId, idsRepairingList: [item.id] });
    } else {
      ids.idsRepairingList.push(item.id);
    }
  }); // 已经选中的维修单主表ID

  await apiControl.wipRepair.updateRepaired({
    loginProcessId: userStore.currUserOrgInfo.processId,
    loginWorkstationId: userStore.currUserOrgInfo.workStationId,
    returnRoutingProcessId: formData.queryData.returnRoutingProcessId,
    mitemId: formData.queryData.mitemId,
    defectReason: formData.queryData.checkedDefectReason,
    defectBlame: formData.queryData.checkedDefectBlame,
    defectDealMethodIdList: formData.queryData.checkedDefectDealMethod,
    isScrapped: formData.queryData.isScrapped,
    wipRepairIdList: selectWipRepairIds.value,
  });

  MessagePlugin.success('维修成功。');

  formData.queryData.returnRoutingProcessId = '';
  formData.queryData.mitemId = '';
  formData.queryData.checkedDefectReason = '';
  formData.queryData.checkedDefectBlame = '';
  formData.queryData.checkedDefectDealMethod = [];
  formData.queryData.isScrapped = false;
  selectRepairingIds.value = [];
  selectWipRepairIds.value = [];

  fetchTable();
  fetchRepairingTable();
};

const fetchTable = async () => {
  try {
    const rangDays = dayjs(formData.queryData.endDate).diff(dayjs(formData.queryData.beginDate), 'days');
    if (rangDays + 1 > 31) {
      MessagePlugin.error('日期跨度最大不超过31天');
      return;
    }
    selectRepairId.value = [];
    const data = (await apiControl.wipRepair.list({
      keyword: formData.queryData.barcode,
      moScheId: formData.queryData.moScheId,
      beginDate: formData.queryData.beginDate,
      endDate: dayjs(formData.queryData.endDate).add(1, 'day').format('YYYY-MM-DD'),
      repairStatus: formData.queryData.isRepair,
      pageNum: pageTab1.value.page,
      pageSize: pageTab1.value.rows,
      loginWorkstationId: userStore.currUserOrgInfo.workCenterId,
      loginProcessId: userStore.currUserOrgInfo.processId,
      statusList: ['UNREPAIR', 'REPAIRED'],
      sorts: [],
      filters: [],
    })) as any;
    repairData.value = data.list;
    repairDataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  }
};
const fetchDtlTable = async () => {
  try {
    if (_.isNil(selectRepairRowId.value)) {
      const data = await apiControl.wipRepairDtl.getListByWipRepairId({
        wipRepairId: selectRepairRowId.value,
      });
      repairDtlData.value = data;
    }
  } catch (e) {
    console.log(e);
  }
};
const fetchRepairingTable = async () => {
  try {
    selectRepairingIds.value = [];
    const data = await apiControl.wipRepairDtl.getListByRepairing({
      pageNum: pageTab2.value.page,
      pageSize: pageTab2.value.rows,
      loginWorkstationId: userStore.currUserOrgInfo.workCenterId,
      loginProcessId: userStore.currUserOrgInfo.processId,
    });
    repairingData.value = data.list;
    repairingDataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  }
};
const fetchKeyPartTable = async () => {
  try {
    const distinctScanBarcode = repairingData.value
      .filter((n) => selectRepairingIds.value.indexOf(n.id) !== -1)
      .map((n) => n.scanBarcode)
      .filter((value, index, self) => self.indexOf(value) === index);
    if (!_.isEmpty(distinctScanBarcode) && distinctScanBarcode.length > 0) {
      const data = await apiControl.wipKeypart.getWipKeypartByRunCard({
        pageNum: 1,
        pageSize: 99999,
        scanBarcodeList: distinctScanBarcode,
      });
      keyPartData.value = data.list;
    }
  } catch (e) {
    console.log(e);
  }
};
const getDefectDealMethod = async () => {
  formData.queryData.defectDealMethodOptions = [];
  const data = await apiControl.wipRepair.getDefectDealMethodList({
    pageNum: 1,
    pageSize: 99999,
    dealMethodType: 'Q2',
    defectDealMethod: '',
  });

  data.list.forEach((item) => {
    formData.queryData.defectDealMethodOptions.push({ value: item.id, label: item.methodName });
  });
};
const getDefectReason = async () => {
  formData.queryData.defectReasonOptions = [];
  const data = await apiMain.param.getListByGroupCode({
    parmGroupCode: 'Q_DEFECT_REASON',
  });

  data.forEach((item) => {
    formData.queryData.defectReasonOptions.push({ value: item.value, label: item.label });
  });
};
const getDefectBlame = async () => {
  formData.queryData.defectBlameOptions = [];
  const data = await apiMain.param.getListByGroupCode({
    parmGroupCode: 'Q_DEFECT_BLAME',
  });

  data.forEach((item) => {
    formData.queryData.defectBlameOptions.push({ value: item.value, label: item.label });
  });
};
const onSelectRepairChange = (value: any) => {
  selectRepairId.value = value;
};
const onSelectRepairingChange = (value: any, { selectedRowData }) => {
  const distinctMitemCode = selectedRowData
    .map((n) => n.mitemCode)
    .filter((value, index, self) => self.indexOf(value) === index) as Array<String>;
  if (!_.isEmpty(distinctMitemCode) && distinctMitemCode.length > 1) {
    MessagePlugin.error('只能选择相同产品的条码');

    // 保留第一个产品的所有选择
    const ids = selectedRowData.filter((n) => n.mitemCode === selectedRowData[0].mitemCode).map((n) => n.id);
    _.remove(value, (n) => {
      return ids.indexOf(n) === -1;
    });
  }
  selectRepairingIds.value = value;

  if (value.length > 0) {
    const firstRow = selectedRowData.find((n) => n.id === value[0]);
    formData.queryData.routingRevisionId = firstRow.routingRevisionId;
    formData.queryData.mitemId = firstRow.mitemId;
    formData.queryData.mitemCode = firstRow.mitemCode;
    formData.queryData.mitemName = firstRow.mitemName;
    formData.queryData.moScheId = firstRow.moScheId;
    formData.queryData.barcode = firstRow.scanBarcode;
    formData.queryData.conditions.push({ field: 'moScheId', operator: 'EQ', value: firstRow.moScheId });
    formData.queryData.conditions.push({ field: 'serialNumber', operator: 'EQ', value: firstRow.scanBarcode });
  } else {
    formData.queryData.routingRevisionId = '';
    formData.queryData.mitemId = '';
    formData.queryData.mitemCode = '';
    formData.queryData.mitemName = '';
    formData.queryData.moScheId = '';
    formData.queryData.barcode = '';
    formData.queryData.conditions = [];
  }
};
const onRepairRowClick = async ({ row }) => {
  if (row.status === 'REPAIRING') {
    MessagePlugin.error('产品已开始维修，不能重复维修');
    return;
  }
  if (row.status === 'REPAIRED') {
    MessagePlugin.error('产品已维修完成');
    return;
  }

  await apiControl.wipRepair
    .updateWipRepairStatus({
      wipRepairIds: [row.id],
      loginWorkstationId: userStore.currUserOrgInfo.workCenterId,
      loginProcessId: userStore.currUserOrgInfo.processId,
    })
    .then(() => {
      repairDtlData.value = [];
      fetchTable();
      fetchRepairingTable();
      selectTabValue.value = 'tab2';
    });
};
const onBatchRepairing = async () => {
  try {
    if (selectRepairId.value.length === 0) {
      MessagePlugin.error('请选择维修单');
      return;
    }

    const notCanRepair = repairData.value.filter(
      (n) => n.status !== 'UNREPAIR' && selectRepairId.value.some((obj) => obj === n.id),
    ).length;
    if (notCanRepair > 0) {
      MessagePlugin.error('只能选择待维修状态的单据');
      return;
    }

    await apiControl.wipRepair.updateWipRepairStatus({
      wipRepairIds: selectRepairId.value,
      loginWorkstationId: userStore.currUserOrgInfo.workCenterId,
      loginProcessId: userStore.currUserOrgInfo.processId,
    });
    repairDtlData.value = [];
    fetchTable();
    MessagePlugin.error('选择产品已开始维修');
  } catch (e) {
    console.log(e);
  }
};
const onActiveChange = async (highlightRowKeys) => {
  selectRepairRowId.value = `${highlightRowKeys[0]}`;
  await fetchDtlTable();
};
const onKeyPartReplace = async (row: any) => {
  console.log(row);
};
const tabsChange = async (tabValue) => {
  selectTabValue.value = tabValue;
};
const getVerifyProcessCategory = async () => {
  await apiControl.wipRepair.getVerifyProcessCategory({
    loginWorkstationId: userStore.currUserOrgInfo.workCenterId,
    loginProcessId: userStore.currUserOrgInfo.processId,
  });
};

onMounted(() => {
  getVerifyProcessCategory().then(() => {
    fetchTable();
    fetchRepairingTable();
    getDefectDealMethod();
    getDefectReason();
    getDefectBlame();
  });
});
</script>

<style lang="less" scoped>
/deep/ .t-table__row--active {
  background-color: var(--td-brand-color-light) !important;
}
</style>
