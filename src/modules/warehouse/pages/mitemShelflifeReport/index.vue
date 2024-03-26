<!-- 用户仓库权限 -->
<template>
  <cmp-container v-show="!pageShow" :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" @submit="onInput">
        <template #showState="{ param }">
          <t-checkbox v-model="param.showState">仅显示过期</t-checkbox>
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="onlyId"
        empty="没有符合条件的数据"
        :table-column="columns"
        :fixed-height="true"
        :table-data="transferData.list"
        :total="transferTotal"
        @refresh="onFetchData"
      >
        <template #title>
          {{ '物料保质期列表' }}
        </template>
        <template #labelDetails="{ row }">
          <t-link theme="primary" @click="onEditRow(row)"> 标签明细 </t-link>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <t-dialog v-model:visible="formVisible" width="90%" top="56px" :footer="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        {{ '物料保质期标签明细' }}
      </t-space>
    </template>
    <cmp-container :full="true" style="height: calc(90vh - 56px - 57px)">
      <t-card :bordered="true">
        <div class="form-item-box">
          <t-form-item label="仓库">{{ detailRow?.warehouseName }}</t-form-item>
          <t-form-item label="货区"> {{ detailRow?.districtName }}</t-form-item>
          <t-form-item label="货位"> {{ detailRow?.locationName }}</t-form-item>
          <t-form-item label="物料"> {{ detailRow?.mitemName }}</t-form-item>
        </div>
      </t-card>
      <cmp-card :ghost="true">
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUITwo"
          row-key="labelNo"
          empty="没有符合条件的数据"
          :table-column="columnsDetail"
          :fixed-height="true"
          :table-data="mitemShelflifeData"
          :total="mitemShelflifeTotal"
          :show-toolbar="false"
          select-on-row-click
          @refresh="onShelfLifeDetails"
        >
        </cmp-table>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>
<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api, MitemShelflifeReportVO } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const tableRef = ref(); // 表格实例
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUITwo } = usePage(); // 分页工具
const selectedRowKeys = ref([]); // 删除计量单位 id
const pageShow = ref(false);
const formVisible = ref(false);

// 表格数据总条数
const transferTotal = ref(0);
// 表格数据
const transferData = reactive({ list: [] });
// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'warehouseName',
    title: '仓库',
    width: '110',
  },
  {
    colKey: 'districtName',
    title: '货区',
    width: '150',
  },
  {
    colKey: 'locationName',
    title: '货位',
    width: '120',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    width: '120',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
    width: '150',
  },
  {
    colKey: 'categoryCode',
    title: '物料类别编码',
    width: '150',
  },
  {
    colKey: 'categoryName',
    title: '物料类别名称',
    width: '150',
  },
  {
    colKey: 'supplierName',
    title: '供应商名称',
    width: '150',
  },
  {
    colKey: 'lotNo',
    title: '批次号',
    width: '150',
  },
  {
    colKey: 'datetimeStockin',
    title: '接收日期',
    width: '150',
  },
  {
    colKey: 'stockNum',
    title: '库存量',
    width: '150',
  },
  {
    colKey: 'shelfLifeDays',
    title: '保质期(天)',
    width: '150',
  },
  {
    colKey: 'expiredDays',
    title: '过期天数',
    width: '150',
  },
  {
    colKey: 'uomName',
    title: '单位',
    width: '150',
  },
  {
    colKey: 'labelDetails',
    title: '标签明细',
    width: '150',
    fixed: 'right',
  },
];
const columnsDetail: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'labelNo',
    title: '条码',
    width: '110',
  },
  {
    colKey: 'lotNo',
    title: '批次',
    width: '150',
  },
  {
    colKey: 'qty',
    title: '数量',
    width: '120',
  },
  {
    colKey: 'supplierCode',
    title: '供应商编码',
    width: '120',
  },
  {
    colKey: 'supplierName',
    title: '供应商名称',
    width: '120',
  },
];
// 初始渲染
onMounted(async () => {
  await onGetExpirationData(); // 获取 表格 数据
});
const pageNum = computed(() => pageUITwo.value.page);
const pageSize = computed(() => pageUITwo.value.rows);
const mitemShelflifeData = ref([]);
const mitemShelflifeTotal = ref(0);
const detailRow = ref<any>({});
const onhandId = ref('');
const supplierId = ref('');
const lotNo = ref('');
const datetimeStockin = ref();
const onEditRow = async (row: any) => {
  detailRow.value = row;
  formVisible.value = true;
  onhandId.value = row.onhandId;
  supplierId.value = row.supplierId;
  lotNo.value = row.lotNo;
  datetimeStockin.value = row.datetimeStockin;
  await onShelfLifeDetails();
};

const onShelfLifeDetails = async () => {
  const res = await api.mitemShelflifeReport.getDtl({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    onhandId: onhandId.value,
    supplierId: supplierId.value,
    lotNo: lotNo.value,
    datetimeStockin: datetimeStockin.value,
  });
  mitemShelflifeData.value = res.list;
  mitemShelflifeTotal.value = res.total;
};

// 刷新按钮
const onFetchData = () => {
  onGetExpirationData();
  selectedRowKeys.value = [];
};

// 保质期报表 字段\
// 获取七天前的 00:00:00
const startOfSevenDaysAgo = dayjs().subtract(7, 'days').startOf('day');
// 获取当前日期的 23:59:59
const endOfToday = dayjs().endOf('day');
const expirationDateParam = ref({
  pageNum: 1,
  pageSize: 10,
  warehouseId: '', // 仓库 ID
  mitemCategoryId: '', // 物料类型 ID
  mitemId: '', // 物料 ID
  lotNo: '', // 批次
  isExpired: true, // 过期显示
  receiveDateStart: startOfSevenDaysAgo.format('YYYY-MM-DD HH:mm:ss'), // 开始日期
  receiveDateEnd: endOfToday.format('YYYY-MM-DD HH:mm:ss'), // 结束日期
});

interface MitemShelflifeReportVOWithId extends MitemShelflifeReportVO {
  onlyId: string;
}
// 获取 表格 数据
const onGetExpirationData = async () => {
  // tableRef.value.setSelectedRowKeys([]);
  selectedRowKeys.value = [];
  expirationDateParam.value.pageNum = pageUI.value.page;
  expirationDateParam.value.pageSize = pageUI.value.rows;
  const res = await api.mitemShelflifeReport.getList(expirationDateParam.value);
  (res.list as MitemShelflifeReportVOWithId[]).forEach((item) => {
    item.onlyId = Date.now() + Math.random().toString(16).substring(2); // 生成唯一标识符
  });
  transferData.list = res.list;
  transferTotal.value = res.total;
};

// #query 查询参数
const opts = computed(() => {
  return {
    datePproduced: {
      label: '接收日期',
      labelWidth: '100px',
      comp: 't-date-range-picker',
      event: 'daterangetime',
      defaultVal: [startOfSevenDaysAgo.format('YYYY-MM-DD HH:mm:ss'), endOfToday.format('YYYY-MM-DD HH:mm:ss')], // 初始化日期控件
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
    warehouse: {
      label: '仓库',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        // valueField: 'scheCode',
        type: 'warehouse',
        showTitle: false,
      },
    },
    mitemCategory: {
      label: '物料类型',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    mitem: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    batch: {
      label: '批次',
      comp: 't-input',
      event: 't-input',
      defaultVal: '',
    },
    showState: {
      label: '',
      labelWidth: '10',
      event: 'radio',
      defaultVal: 'true',
      slotName: 'showState',
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  const [receiveDateStart, receiveDateEnd] = data.datePproduced;
  expirationDateParam.value.mitemCategoryId = data.mitemCategory; // 物料类型 ID
  expirationDateParam.value.mitemId = data.mitem; // 物料 ID
  expirationDateParam.value.lotNo = data.batch ? data.batch : ''; // 批次
  expirationDateParam.value.isExpired = data.showState; // 过期显示
  expirationDateParam.value.warehouseId = data.warehouse; // 仓库
  expirationDateParam.value.receiveDateStart = receiveDateStart; // 开始日期
  expirationDateParam.value.receiveDateEnd = receiveDateEnd; // 结束日期
  await onGetExpirationData();
};
</script>

<style lang="less" scoped>
.form-item-box {
  margin: 0;
  display: flex;

  .t-form__item {
    display: flex;
    margin: 0;
    flex: 1;
  }
}
</style>
