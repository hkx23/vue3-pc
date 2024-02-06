<!-- wip报表 -->
<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" :is-reset-query="false" @reset="onReset" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="moId"
        :table-column="columnsWip"
        :table-data="WipRepairVOData"
        :total="total"
        @refresh="onRefresh"
      >
        <template #title>
          {{ 'WIP列表' }}
        </template>
        <template #completedNum="{ row }">
          <div>{{ row.completedNum }}</div>
        </template>
        <template #moCode="{ row }">
          <t-link theme="primary" @click="moCodeClick(row)">{{ row.moCode }}</t-link>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" header="工单明细" width="50%">
    <div class="detailed-box">
      <t-card :bordered="false">
        <div class="form-item-box">
          <t-form-item label="工单号">{{ workOrderData?.list[0]?.moCode }}</t-form-item>
          <t-form-item label="产品编码"> {{ workOrderData?.list[0]?.mitemCode }}</t-form-item>
          <t-form-item label="加工车间"> {{ workOrderData?.list[0]?.workCenterName }}</t-form-item>
        </div>
        <div class="form-item-box">
          <t-form-item label="计划开工时间"> {{ workOrderData?.list[0]?.datetimePlanStart }}</t-form-item>
          <t-form-item label="产品描述"> {{ workOrderData?.list[0]?.mitemDesc }}</t-form-item>
        </div>
      </t-card>
      <!-- table表格 -->
      <footer class="detailed-work-center">
        <cmp-table
          ref="tableRef"
          v-model:pagination="workPageUI"
          row-key="id"
          :show-pagination="false"
          :table-column="columns"
          :table-data="moCodeData.list"
          :total="moCodeData?.list?.length"
          @refresh="onOorkOIrder"
        >
          <template #title>
            {{ '物料列表' }}
          </template>
          <template #moCode="{ row }">
            <t-link theme="primary">{{ row.moCode }}</t-link>
          </template>
        </cmp-table>
      </footer>
    </div>
  </t-dialog>
  <t-dialog v-model:visible="detailVisible" :cancel-btn="null" :confirm-btn="null" header="产品明细" width="50%">
    <div class="detailed-box">
      <t-card :bordered="false">
        <div class="form-item-box">
          <t-form-item label="工单号">{{ processData?.moCode }}</t-form-item>
          <t-form-item label="产品编码"> {{ processData?.mitemCode }}</t-form-item>
          <t-form-item label="加工车间"> {{ processData?.workshopName }}</t-form-item>
        </div>
      </t-card>
      <!-- table表格 -->
      <footer class="detailed-work-center">
        <cmp-table
          ref="tableRef"
          v-model:pagination="productPageUI"
          empty="没有符合条件的数据"
          row-key="deliveryCardId"
          :table-column="columnsDetail"
          :table-data="getDtlData.list"
          :total="getDtlTotal"
          @refresh="onGetProductDetails"
        >
          <template #title>
            {{ '产品明细列表' }}
          </template>
          <template #moCode="{ row }">
            <t-link theme="primary">{{ row.moCode }}</t-link>
          </template>
        </cmp-table>
      </footer>
    </div>
  </t-dialog>
</template>
<script setup lang="tsx">
import dayjs from 'dayjs';
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, reactive, ref } from 'vue';

import { api } from '@/api/control';
import CmpQuery from '@/components/cmp-query/index.vue';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();
const { pageUI: workPageUI } = usePage();
const { pageUI: productPageUI } = usePage();
const formVisible = ref(false);
const detailVisible = ref(false);
// 表格实例
const tableRef = ref(null);
const columnsData = ref([]);
// 主页面数据
const columnsWip = computed(() => {
  return [
    {
      colKey: 'serial-number',
      title: '序号',
      width: '60',
    },
    {
      colKey: 'moCode',
      title: '工单号',
      width: '110',
    },
    {
      colKey: 'mitemCode',
      title: '产品编码',
      width: '110',
    },
    {
      colKey: 'moClass',
      title: '工单类型',
      width: '130',
    },
    {
      colKey: 'workshopName',
      title: '车间',
      width: '100',
    },
    {
      colKey: 'planQty',
      title: '计划数量',
      width: '100',
    },
    {
      colKey: 'SUMWip',
      title: 'WIP合计',
      width: '100',
    },
    ...columnsData.value,
    {
      colKey: 'completedNum',
      title: '完工数量',
      width: '100',
      fixed: 'right',
    },
  ];
});
// 工单数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    width: '90',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    width: '110',
  },
  {
    colKey: 'mitemDesc',
    title: '物料描述',
    width: '110',
  },
  {
    colKey: 'moRequestQty',
    title: '工单需求数量',
    width: '130',
  },
  {
    colKey: 'uom',
    title: '单位',
    width: '100',
  },
];
// 产品明细
const columnsDetail: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    width: '90',
  },
  {
    colKey: 'serialNumber',
    title: '产品条码',
    width: '110',
  },
  {
    colKey: 'workcenterName',
    title: '当前工作中心',
    width: '110',
  },
  {
    colKey: 'workstationName',
    title: '当前工站',
    width: '130',
  },
  {
    colKey: 'status',
    title: '产品状态',
    width: '100',
  },
  {
    colKey: 'timeProcessing',
    title: '加工时间',
    width: '150',
  },
  {
    colKey: 'timeStay',
    title: '停留时间(M)',
    width: '130',
  },
];
// 初始渲染
// onMounted(async () => {
//   await onGetProductMaintenanceReport(); // 获取 表格 数据
// });

// 表格数据 字段
const WipRepairVOData = ref([]);
const total = ref<number>(0);
const WipReportData = ref({
  pageNum: 1,
  pageSize: 10,
  mitemId: '', // 产品编码
  workshopId: '', // 车间
  moId: '', // 工单
  // processingDateStart: dayjs().subtract(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'), // 开始时间
  // processingDateEnd: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'), // 结束时间
  processingDateStart: '', // 开始时间
  processingDateEnd: '', // 结束时间
});

// 工单点击
const workOrderData = reactive({ list: [] });
const moCodeData = reactive({ list: [] });
const workMoCode = ref('');
// 获取工单上部分明细
const onOorkOIrder = async () => {
  const res = (await api.reversetraceability.getMoBaseInfo({
    pageNum: 1,
    pageSize: 10,
    moCode: workMoCode.value, // 工单号
  })) as any;
  workOrderData.list = res.list;
};
// 备注： 工单明细表格没有做分页
const moCodeClick = async (row: any) => {
  formVisible.value = true;
  workMoCode.value = row.moCode;
  await onOorkOIrder();
  const result = (await api.moBom.getMoBomListByMoCode({
    moId: row.moId,
  })) as any;
  moCodeData.list = result.list;
};

// 产品明细点击
const processData = ref({
  moCode: '',
  mitemCode: '',
  workshopName: '',
});
function findCurProcessId(row, colKey) {
  processData.value.moCode = row.moCode;
  processData.value.mitemCode = row.mitemCode;
  processData.value.workshopName = row.workshopName;
  const process = row.processList.find((p) => p.processAlias === colKey);
  return process ? process.curProcessId : null;
}
const getDtlData = reactive({ list: [] });
const getDtlTotal = ref(0);
const productParam = ref({
  pageNum: 1,
  pageSize: 20,
  moId: '',
  curProcessId: '',
});
const onGetProductDetails = async () => {
  productParam.value.pageNum = productPageUI.value.page;
  productParam.value.pageSize = productPageUI.value.rows;
  const res = await api.wip.getDtlList(productParam.value);
  getDtlData.list = res.list;
  getDtlTotal.value = res.total;
};
const onDetailClick = async (row, col) => {
  productParam.value.moId = row.moId;
  productParam.value.curProcessId = findCurProcessId(row, col.colKey);
  await onGetProductDetails();
  detailVisible.value = true;
};

const onGetProductMaintenanceReport = async () => {
  WipReportData.value.pageNum = pageUI.value.page;
  WipReportData.value.pageSize = pageUI.value.rows;
  const res = await api.wip.getList(WipReportData.value);
  // 提取所有 processAlias 值
  const allProcessAliases = res.list.flatMap((item) =>
    (item.processList as Array<{ processAlias: string }>).map((process) => process.processAlias),
  );
  // 过滤出唯一的 processAlias 值
  const uniqueProcessAliases = Array.from(new Set(allProcessAliases));
  const columns = uniqueProcessAliases.map((processAlias) => ({
    colKey: processAlias, // 例如，将 processAlias 转换为适合作为 key 的格式
    title: processAlias,
    width: '100',
    cell: (h, { row, col }) => {
      return (
        <div>
          {row[col.colKey] === 0 ? (
            <div></div>
          ) : (
            <t-link theme="primary" onClick={() => onDetailClick(row, col)}>
              {row[col.colKey]}
            </t-link>
          )}
        </div>
      );
    },
  }));
  columnsData.value = columns;
  WipRepairVOData.value = res.list;
  console.log(
    '🚀 ~ file: index.vue:357 ~ onGetProductMaintenanceReport ~ WipRepairVOData.value:',
    WipRepairVOData.value,
  );
  total.value = res.total;
};
const onRefresh = async () => {
  await onGetProductMaintenanceReport();
};

// #query 查询参数
const opts = computed(() => {
  return {
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
    workshop: {
      label: '车间',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
    workOrder: {
      label: '工单号',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mo',
        showTitle: false,
      },
    },
    servicingTime: {
      label: '加工时间',
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
const startOfSevenDaysAgo = dayjs().subtract(31, 'days').startOf('day');
// 获取当前日期的 23:59:59
const endOfToday = dayjs().endOf('day');

const onInput = async (context: any) => {
  if (!context.workshop && !context.productCode && !context.workOrder) {
    MessagePlugin.warning('产品编码、车间、工单号至少选择一项！');
    return;
  }
  pageUI.value.page = 1;
  const [processingDateStart, processingDateEnd] = context.servicingTime;
  WipReportData.value.mitemId = context.productCode;
  WipReportData.value.workshopId = context.workshop;
  WipReportData.value.moId = context.workOrder;
  WipReportData.value.processingDateStart = processingDateStart;
  WipReportData.value.processingDateEnd = processingDateEnd;
  await onGetProductMaintenanceReport();
};

const onReset = async () => {
  columnsData.value = [];
  WipRepairVOData.value = [];
  total.value = 0;
};
</script>

<style lang="less" scoped>
.t-card {
  border: 1px solid var(--td-border-level-2-color) !important;
  margin-bottom: 24px;
}

.detailed-box {
  // padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingLR-xl);

  .popup-mo-foot-btn {
    display: block;
    height: 30px;
    margin-top: 20px;
    text-align: right;
  }
}

.type-box {
  display: flex;
  text-align: center;
  align-items: center;

  li {
    cursor: pointer;
    width: 47px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #eee;
  }

  li:first-child {
    border-radius: 5px 0 0 5px;
  }

  li:last-child {
    border-radius: 0 5px 5px 0;
  }

  .li-cur {
    background: #0894fa;
    color: #fff;
  }
}
// 表单盒子边距
.form-item-box {
  margin: 0;
  display: flex;

  .t-form__item {
    display: flex;
    margin: 0;
    flex: 1;
  }
}

// .tag-block-light {
//   /deep/ .t-tag--primary {
//     background-color: #548df3;
//   }
// }

.form-checkbox {
  margin: 10px 100px;
}
</style>
