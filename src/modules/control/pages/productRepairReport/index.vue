<!-- 箱包关系报表 -->
<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="deliveryCardId"
        :table-column="columns"
        :table-data="WipRepairVOData"
        :total="total"
        @refresh="onRefresh"
      >
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import _ from 'lodash';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api, WipRepairVO } from '@/api/control';
import CmpQuery from '@/components/cmp-query/index.vue';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();
// 表格实例
const tableRef = ref(null);

const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
    width: '60',
  },
  {
    colKey: 'scanBarcode',
    title: '产品条码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'moScheCode',
    title: '排产单号',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'moCode',
    title: '工单号',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemCode',
    title: '产品编码',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'mitemDesc',
    title: '产品描述',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'fromRoutingProcessName',
    title: '来源工序',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'defectName',
    title: '缺陷现象',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'defectReason',
    title: '缺陷原因',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'defectBlame',
    title: '责任人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'methodName',
    title: '处理方式',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'returnRoutingProcessName',
    title: '回流工序',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'repairTimes',
    title: '维修次数',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'userNameRepair',
    title: '维修人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datetimeRepairing',
    title: '维修开始时间',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'datetimeRepaired',
    title: '维修结束时间',
    align: 'center',
    width: '100',
    fixed: 'right',
  },
];

// 初始渲染
onMounted(async () => {
  await onGetProductMaintenanceReport(); // 获取 表格 数据
});

// 表格数据 字段
const WipRepairVOData = ref<WipRepairVO[]>([]);
const total = ref<number>(0);
const ProductMaintenanceReportData = ref({
  pageNum: 1,
  pageSize: 10,
  scanBarcode: '', // 产品条码
  mitemId: '', // 产品编码
  moScheId: '', // 排产单号
  repairUser: '', // 维修人
  repairDateStart: '', // 维修开始时间
  repairDateEnd: '', // 维修结束时间
});
const onGetProductMaintenanceReport = async () => {
  ProductMaintenanceReportData.value.pageNum = pageUI.value.page;
  ProductMaintenanceReportData.value.pageSize = pageUI.value.rows;
  const res = await api.wipRepair.getReportData(ProductMaintenanceReportData.value);
  WipRepairVOData.value = res.list;
  total.value = res.total;
};
const onRefresh = async () => {
  await onGetProductMaintenanceReport();
};

// #query 查询参数
const opts = computed(() => {
  return {
    productBarCode: {
      label: '产品条码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    productCode: {
      label: '产品编码',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    workOrder: {
      label: '排产单号',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    maintenancePerson: {
      label: '维修人',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    servicingTime: {
      label: '维修时间',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [startOfSevenDaysAgo.format('YYYY-MM-DD HH:mm:ss'), endOfToday.format('YYYY-MM-DD HH:mm:ss')], // 初始化日期控件
      bind: {
        enableTimePicker: true,
        // format: 'YYYY-MM-DD',
      },
    },
  };
});

// 获取七天前的 00:00:00
const startOfSevenDaysAgo = dayjs().subtract(7, 'days').startOf('day');
// 获取当前日期的 23:59:59
const endOfToday = dayjs().endOf('day');

const onInput = async (context: any) => {
  pageUI.value.page = 1;
  const [repairDateStart, repairDateEnd] = context.servicingTime;
  ProductMaintenanceReportData.value.scanBarcode = context.productBarCode;
  ProductMaintenanceReportData.value.mitemId = context.productCode;
  ProductMaintenanceReportData.value.moScheId = context.workOrder;
  ProductMaintenanceReportData.value.repairUser = context.maintenancePerson;
  ProductMaintenanceReportData.value.repairDateStart = repairDateStart;
  ProductMaintenanceReportData.value.repairDateEnd = repairDateEnd;
  await onGetProductMaintenanceReport();
};
</script>

<style lang="less" scoped></style>
