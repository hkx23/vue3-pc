<!-- 库存现有量 -->
<template>
  <cmp-container v-show="!pageShow" :full="true">
    <cmp-card :span="12">
      <cmp-query ref="queryRef" :opts="opts" @submit="onInput">
        <template #warehouseId="{ param }">
          <bcmp-select-business v-model="param.warehouseId" type="warehouseAuth"></bcmp-select-business>
        </template>
        <template #districtId="{ param }">
          <bcmp-select-business
            v-model="param.districtId"
            type="district"
            :parent-id="param.warehouseId"
          ></bcmp-select-business>
        </template>
        <template #locationId="{ param }">
          <bcmp-select-business
            v-model="param.locationId"
            type="locationByDistrict"
            :parent-id="param.districtId"
          ></bcmp-select-business>
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        empty="没有符合条件的数据"
        :table-column="columns"
        :fixed-height="true"
        :table-data="handQtyData.list"
        :total="handQtyTotal"
        @refresh="onFetchData"
      >
        <template #title>
          {{ '库存现有量列表' }}
        </template>
        <template #labelDetails="{ row }">
          <t-link v-if="checkIsShowLabelInfo(row)" theme="primary" @click="onEditRow(row)"> 标签明细 </t-link>
        </template>
        <template v-if="handQtyData.list && handQtyData.list.length > 0" #footerSummary>
          <div class="t-table__row-filter-inner">库存现有量汇总: {{ handSumQtyTotal }}</div>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <t-dialog v-model:visible="formVisible" width="90%" top="56px" :footer="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        {{ '库存现有量标签明细' }}
      </t-space>
    </template>
    <cmp-container :full="true" style="height: calc(90vh - 56px - 57px)">
      <t-card :bordered="true">
        <div class="form-item-box">
          <t-form-item label="仓库">{{ lotNo.warehouseName }}</t-form-item>
          <t-form-item label="货区"> {{ lotNo.districtName }}</t-form-item>
          <t-form-item label="货位"> {{ lotNo.locationName }}</t-form-item>
          <t-form-item label="物料"> {{ lotNo.mitemName }}</t-form-item>
        </div>
      </t-card>
      <cmp-card :ghost="true">
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUITwo"
          row-key="serialNumber"
          empty="没有符合条件的数据"
          :table-column="columnsDetail"
          :fixed-height="true"
          :show-toolbar="false"
          :table-data="mitemShelflifeData"
          :total="mitemShelflifeTotal"
          select-on-row-click
          @refresh="onShelfLifeDetails"
        >
        </cmp-table>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>
<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, reactive, ref } from 'vue';

import { api, OnhandQtyDtlVO, OnhandQtyVO } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

// 是否显示标签信息
const checkIsShowLabelInfo = (row) => {
  let isShowLabelInfo = true;
  // 车间仓库 和 中转仓 不显示
  if (row.warehouseAttribute === 'WORKSHOP' || row.warehouseAttribute === 'TRANSIT_WAREHOUSE') {
    isShowLabelInfo = false;
  }
  return isShowLabelInfo;
};
const queryRef = ref();
const tableRef = ref(); // 表格实例
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUITwo } = usePage(); // 分页工具
const selectedRowKeys = ref([]); // 删除计量单位 id
const pageShow = ref(false);
const formVisible = ref(false);
// 表格数据库存现有量汇总
const handSumQtyTotal = ref(0);
// 表格数据总条数
const handQtyTotal = ref(0);
// 表格数据
const handQtyData = reactive({ list: [] });
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
    colKey: 'erpWarehouseCode',
    title: 'ERP仓库',
    width: '120',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    width: '150',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
    width: '150',
  },
  {
    colKey: 'qty',
    title: '库存现有量',
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
    colKey: 'serialNumber',
    title: '条码',
    width: '110',
  },
  {
    colKey: 'lotNo',
    title: '批次',
    width: '150',
  },
  {
    colKey: 'balanceQty',
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
// // 初始渲染
// onMounted(async () => {
//   // await onGetHandQtyData(); // 获取 表格 数据
//   await onGetWarehouseId(); // 获取仓库下拉数据
// });
const pageNum = computed(() => pageUITwo.value.page);
const pageSize = computed(() => pageUITwo.value.rows);
const mitemShelflifeData = ref<OnhandQtyDtlVO[]>([]);
const mitemShelflifeTotal = ref(0);
const lotNo = ref<OnhandQtyVO>({});
const onEditRow = async (row: any) => {
  formVisible.value = true;
  lotNo.value = row;
  await onShelfLifeDetails();
};

const onShelfLifeDetails = async () => {
  const res = await api.onhandQty.getDtl({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
    id: lotNo.value.id,
  });
  mitemShelflifeData.value = res.list;
  console.log('🚀 ~ file: index.vue:204 ~ onShelfLifeDetails ~ mitemShelflifeData.value:', mitemShelflifeData.value);
  mitemShelflifeTotal.value = res.total;
};

// 刷新按钮
const onFetchData = () => {
  onGetHandQtyData();
  selectedRowKeys.value = [];
};

// 主界面数据
const handQtyParam = ref({
  pageNum: 1,
  pageSize: 10,
  warehouseId: '', // 仓库
  districtId: '', // 货区
  locationId: '', // 货位
  mitemIds: [], // 物料
});

// 获取 表格 数据
const onGetHandQtyData = async () => {
  selectedRowKeys.value = [];
  handQtyParam.value.pageNum = pageUI.value.page;
  handQtyParam.value.pageSize = pageUI.value.rows;
  const res = await api.onhandQty.getList(handQtyParam.value);
  handQtyData.list = res.list;
  handQtyTotal.value = res.total;

  // 查询汇总数量
  onGetHandSumQtyData();
};

const onGetHandSumQtyData = async () => {
  selectedRowKeys.value = [];
  handQtyParam.value.pageNum = pageUI.value.page;
  handQtyParam.value.pageSize = pageUI.value.rows;
  const res = await api.onhandQty.getOnHandSum(handQtyParam.value);
  if (res) {
    handSumQtyTotal.value = res.qty;
  } else {
    handSumQtyTotal.value = 0;
  }
};

// #query 查询参数
const opts = computed(() => {
  return {
    warehouseId: {
      label: '仓库',
      defaultVal: '',
      slotName: 'warehouseId',
    },
    districtId: {
      label: '货区',
      defaultVal: '',
      slotName: 'districtId',
    },
    locationId: {
      label: '货位',
      defaultVal: '',
      slotName: 'locationId',
    },
    mitemIds: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
        isMultiple: true,
      },
    },
  };
});

const onInput = async (data: any) => {
  const { warehouseId, districtId, locationId, mitemIds } = data;
  pageUI.value.page = 1;
  // Object.keys(handQtyParam.value).forEach((key) => {
  //   if (Object.prototype.hasOwnProperty.call(data, key)) {
  //     handQtyParam.value[key] = data[key];
  //   }
  // });
  handQtyParam.value.warehouseId = warehouseId;
  handQtyParam.value.districtId = districtId;
  handQtyParam.value.locationId = locationId;
  handQtyParam.value.mitemIds =
    mitemIds === '' || mitemIds === null ? [] : mitemIds.split(',').map((item) => item.trim());
  await onGetHandQtyData();
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
