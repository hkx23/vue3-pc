<!-- 事务明细查询  -->
<template>
  <cmp-container :full="true">
    <!-- cmp-query 查询组件 -->
    <cmp-card :span="12">
      <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput" @reset="onReset"> </cmp-query>
    </cmp-card>
    <!-- cmp-table 表格组件   :row-select="{ type: 'single' }"    :selected-row-keys="selectedBillId" -->
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        :loading="loading"
        row-key="billId"
        :table-column="tableReckoningManagementColumns"
        :table-data="tableDataReckoning"
        :fixed-height="true"
        :hover="true"
        :total="dataTotal"
        empty="没有符合条件的数据"
        @refresh="tabRefresh"
      >
        <template #billNo="slotProps">
          <t-space :size="8">
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick()">{{
              slotProps.row.billNo
            }}</t-link>
          </t-space>
        </template>
        <template #title>
          {{ '事务明细' }}
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import { openPage } from '@/router';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const inventoryManagement = ref([]);
const tableDataReckoning = ref([]); //* 表格数据
const dataTotal = ref(0);

//* 组件配置--查询界面
const opts = computed(() => {
  return {
    businessCategoryId: {
      label: '事务类型',
      labelWidth: '20',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'businessCategory',
        showTitle: false,
      },
    },
    timeCreate: {
      label: '创建时间',
      comp: 't-date-range-picker',
      // 设置默认值为前一周的日期和当天的日期
      defaultVal: [dayjs().subtract(7, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD',
      },
      eventHandle: {
        blur: dateChange,
      },
    },
    mesbillNo: {
      label: 'MES业务单号',
      comp: 't-input',
      defaultVal: '',
      bind: {
        enableTimePicker: false,
      },
    },
    erpbillNo: {
      label: 'ERP单据号',
      comp: 't-input',
      defaultVal: '',
      bind: {
        enableTimePicker: false,
      },
    },
    moScheId: {
      label: '排产单号',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    mitemId: {
      label: '物料编码',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
        labelField: 'mitemCode',
      },
    },
    creator: {
      label: '操作人',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
      bind: {
        showTitle: false,
      },
    },
    transferId: {
      label: '交接人',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'user',
        showTitle: false,
      },
    },

    deliveryNo: {
      label: '送货单',
      comp: 't-input',
      defaultVal: '',
      bind: {
        clearable: true,
      },
    },

    purchaseNo: {
      label: '采购单',
      comp: 't-input',
      defaultVal: '',
      bind: {
        clearable: true,
      },
    },

    scanBarcode: {
      label: '标签',
      comp: 't-input',
      defaultVal: '',
      bind: {
        clearable: true,
      },
    },

    warehouseId: {
      label: '源仓库',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'warehouse',
        showTitle: false,
      },
    },

    toWarehouseId: {
      label: '目标仓库',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'warehouse',
        showTitle: false,
      },
    },
  };
});

// 表格主位栏
const tableReckoningManagementColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '事务类型', colKey: 'categoryName', width: 110 },
  { title: 'MES业务单号', width: 130, colKey: 'billNo' },
  { title: '排产单号', width: 120, colKey: 'moScheId' },
  { title: '排产计划数', width: 100, colKey: 'planQty' },
  { title: '标签', width: 110, colKey: 'scanBarcode' },
  {
    title: '标签数量',
    width: 150,
    colKey: 'barcodeQty',
  },
  { title: '物料编码', width: 150, colKey: 'mitemCode' },
  {
    title: '物料描述',
    width: 85,
    colKey: 'mitemDesc',
  },
  {
    title: '单位',
    width: 120,
    colKey: 'uomName',
  },

  { title: '源仓库', width: 120, colKey: 'warehouseName' },
  { title: '源货区', width: 85, colKey: 'districtName' },
  { title: '源货位', width: 110, colKey: 'locationName' },
  {
    title: '目标仓库',
    width: 150,
    colKey: 'toWarehouseId',
  },
  { title: '目标货区', width: 150, colKey: 'toDistrictName' },
  {
    title: '目标货位',
    width: 85,
    colKey: 'toLocationName',
  },
  {
    title: '供应商编码',
    width: 120,
    colKey: 'supplierCode',
  },
  { title: '供应商名称', width: 120, colKey: 'supplierName' },
  { title: '操作人', width: 85, colKey: 'creatorName' },
  { title: '创建时间', width: 110, colKey: 'timeCreate' },
  {
    title: '交易时间',
    width: 150,
    colKey: 'datetimeTrans',
  },
  { title: '交易数量', width: 150, colKey: 'transQty' },
  {
    title: '上传状态',
    width: 85,
    colKey: 'statusName',
  },
  {
    title: '送货单号',
    width: 120,
    colKey: 'deliveryNo',
  },
];

//* 表格数据
const fetchTable = async () => {
  setLoading(false);
  inventoryManagement.value = [];
  tableDataReckoning.value = [];
  const data = await api.transactionDetail.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  tableDataReckoning.value = [...data.list];
  dataTotal.value = data.total;
  setLoading(false);
};

//* 初始渲染
onMounted(async () => {
  await fetchTable();
});

// 跳转到单据管理
const onEditRowClick = () => {
  const toDoUrl = '/warehouse#/receiptManagement';
  openPage(toDoUrl);
};

//* 表格刷新
const tabRefresh = async () => {
  await fetchTable();
};

const dateChange = (data: any) => {
  // 获取当前选择的日期范围
  const selectedDateRange = data.value;
  // 将日期字符串转换为dayjs对象
  const startDate = dayjs(selectedDateRange[0]);
  const endDate = dayjs(selectedDateRange[1]);

  // 计算日期范围的天数差异
  const daysDifference = endDate.diff(startDate, 'day');
  // 如果选择的天数超过31天，则调整日期范围
  if (daysDifference > 31) {
    // 将结束日期调整为开始日期的后31天
    MessagePlugin.warning('日期跨度不得超过31天');
  }
};

//* 查询
const onInput = async (data: any) => {
  setLoading(true);
  const {
    businessCategoryId, // 事务类型
    timeCreate, // 时间
    mesbillNo, // MES业务单号
    erpbillNo, // ERP单据号
    moScheId, // 排产单号
    mitemId, // 物料编码
    creator, // 操作人
    transferId, // 交接人
    deliveryNo, // 送货单
    purchaseNo, // 采购单
    scanBarcode, // 标签
    warehouseId, // 源仓库
    toWarehouseId, // 目标仓库
  } = data;
  if (!data.value) {
    const data = await api.transactionDetail.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      businessCategoryId,
      mitemId,
      mesbillNo,
      moScheId,
      dateStart: timeCreate[0],
      dateEnd: timeCreate[1],
      erpbillNo,
      creator,
      transferId,
      deliveryNo,
      purchaseNo,
      scanBarcode,
      warehouseId,
      toWarehouseId,
    });
    tableDataReckoning.value = [...data.list];
    dataTotal.value = data.total;
  }
  setLoading(false);
};

//* 重置
const onReset = async () => {
  await fetchTable();
};
</script>

<style lang="less" scoped></style>
