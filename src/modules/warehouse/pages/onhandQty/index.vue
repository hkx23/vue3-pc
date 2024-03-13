<!-- 库存现有量 -->
<template>
  <cmp-container v-show="!pageShow" :full="true">
    <cmp-card :span="12">
      <cmp-query ref="queryRef" :opts="opts" @submit="onInput">
        <template #warehouseId="{ param }">
          <t-select
            v-model="param.warehouseId"
            :clearable="true"
            label="仓库"
            @change="onWarehouseChange"
            @popup-visible-change="onGetWarehouseId"
          >
            <t-option v-for="item in warehouseData" :key="item.id" :label="item.warehouseName" :value="item.id" />
          </t-select>
        </template>
        <template #districtId="{ param }">
          <t-select
            v-model="param.districtId"
            :clearable="true"
            label="货区"
            @popup-visible-change="onDistrictChange"
            @change="onDistrictInputChange"
          >
            <t-option v-for="item in districtData" :key="item.id" :label="item.districtName" :value="item.id" />
          </t-select>
        </template>
        <template #locationId="{ param }">
          <t-select v-model="param.locationId" :clearable="true" label="货位" @popup-visible-change="onLocationChange">
            <t-option v-for="item in locationData" :key="item.id" :label="item.locationName" :value="item.id" />
          </t-select>
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
          <t-link theme="primary" @click="onEditRow(row)"> 标签明细 </t-link>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <t-dialog v-model:visible="formVisible" width="850px" :footer="false">
    <t-card :bordered="true">
      <div class="form-item-box">
        <t-form-item label="仓库">{{ lotNo.warehouseName }}</t-form-item>
        <t-form-item label="货区"> {{ lotNo.districtName }}</t-form-item>
        <t-form-item label="货位"> {{ lotNo.locationName }}</t-form-item>
        <t-form-item label="物料"> {{ lotNo.mitemName }}</t-form-item>
      </div>
    </t-card>
    <cmp-table
      ref="tableRef"
      v-model:pagination="pageUITwo"
      row-key="serialNumber"
      empty="没有符合条件的数据"
      :table-column="columnsDetail"
      :fixed-height="true"
      :table-data="mitemShelflifeData"
      :total="mitemShelflifeTotal"
      select-on-row-click
      style="height: 300px"
      @refresh="onShelfLifeDetails"
    >
      <template #title>
        {{ '库存现有量标签明细' }}
      </template>
    </cmp-table>
  </t-dialog>
</template>
<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, reactive, ref } from 'vue';

import { api, District, Location, OnhandQtyDtlVO, OnhandQtyVO, Warehouse } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const queryRef = ref();
const tableRef = ref(); // 表格实例
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUITwo } = usePage(); // 分页工具
const selectedRowKeys = ref([]); // 删除计量单位 id
const pageShow = ref(false);
const formVisible = ref(false);

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
};

// 仓库下拉数据获取
const warehouseData = ref<Warehouse[]>([]);
const onGetWarehouseId = async (visible) => {
  if (visible) {
    const res = await api.onhandQty.getWarehouse();
    warehouseData.value = res;
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
      defaultVal: [],
      bind: {
        type: 'mitem',
        showTitle: false,
        isMultiple: true,
      },
    },
  };
});

// 仓库下拉事件-
const onWarehouseChange = () => {
  queryRef.value.state.form.districtId = '';
  queryRef.value.state.form.locationId = '';
};

// 货区下拉事件
const districtData = ref<District[]>([]);
const onDistrictChange = async (visible: boolean) => {
  if (visible) {
    if (!queryRef.value.state.form.warehouseId) {
      MessagePlugin.warning('请先选择仓库！');
      return;
    }
    const res = await api.onhandQty.getDistrict({ warehouseId: queryRef.value.state.form.warehouseId });
    districtData.value = res;
  }
};
const onDistrictInputChange = () => {
  queryRef.value.state.form.locationId = '';
};
// 货位下拉事件
const locationData = ref<Location[]>([]);
const onLocationChange = async (visible: boolean) => {
  if (visible) {
    if (!queryRef.value.state.form.districtId) {
      MessagePlugin.warning('请先选择货区！');
      return;
    }
    const res = await api.onhandQty.getLocation({ districtId: queryRef.value.state.form.districtId });
    locationData.value = res;
  }
};

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  Object.keys(handQtyParam.value).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      handQtyParam.value[key] = data[key];
    }
  });
  handQtyParam.value.mitemIds = data.mitemIds === '' ? [] : data.mitemIds.split(',').map((item) => item.trim());
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
