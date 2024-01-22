<!-- 库龄查询  -->
<template>
  <cmp-container :full="true">
    <cmp-container>
      <!-- query -->
      <t-card :ghost="true">
        <cmp-query ref="queryComponent" :opts="optsKuling" :bool-enter="false" @submit="onInput"> </cmp-query>
      </t-card>
      <!-- cmp-table 表格组件  -->
      <cmp-card>
        <cmp-table
          v-model:pagination="pageUI"
          row-key="billNo"
          :table-column="tableReckoningManagementColumns"
          :table-data="tableDataReceipt"
          :total="dataTotal"
          :loading="loading"
          empty="没有符合条件的数据"
          @refresh="tabRefresh"
        >
          <template #labelNo="slotProps">
            <t-space :size="8">
              <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick(slotProps)">明细 </t-link>
            </t-space>
          </template>

          <!-- 定义序号列的插槽 -->
          <template #indexSlot="{ rowIndex }">
            {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
          </template>
        </cmp-table>
      </cmp-card>
      <!-- 库龄详情组件 -->
      <kuling-details v-model:visible="RPDRoutingVisible" :form-title="formTitle" :sun-data="sunData" />
    </cmp-container>
  </cmp-container>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import kulingDetails from './kulingDetails.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const formTitle = ref('');
const dataTotal = ref(0);
const RPDRoutingVisible = ref(false); //* 弹窗默认关闭
const selectedReceiptRowKeys = ref([]);
const tableDataReceipt = ref([]); //* 表格数据
const sunData = ref([]); // 用来存储接口调用结果

//* 组件配置  --查询界面选择
const optsKuling = computed(() => {
  return {
    mitemId: {
      label: '物料编码',
      labelWidth: '200',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    warehouseId: {
      label: '仓库',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'warehouse',
        showTitle: false,
      },
    },
    districtId: {
      label: '货区',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'district',
        showTitle: false,
      },
    },
    locationId: {
      label: '货位',
      labelWidth: '200',
      event: 'business',
      comp: 'bcmp-select-business',
      defaultVal: '',
      bind: {
        type: 'location',
        showTitle: false,
      },
    },
    stockInDate: {
      label: '入库日期',
      comp: 't-date-range-picker',
      defaultVal: [], // 初始化日期控件
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD',
      },
    },
  };
});

const tableReckoningManagementColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 65, cell: 'indexSlot' },
  { title: '物料编码', colKey: 'mitemCode', width: 150 },
  { title: '物料描述', width: 150, colKey: 'mitemDesc' },
  { title: '仓库编码', width: 120, colKey: 'warehouseCode' },
  { title: '仓库名称', width: 120, colKey: 'mitemCode' },
  { title: '货区编码', width: 120, colKey: 'districtCode' },
  { title: '货区名称', width: 150, colKey: 'districtName' },
  { title: '货位编码', width: 150, colKey: 'locationCode' },
  { title: '货位名称', width: 85, colKey: 'locationName' },
  { title: '单位', width: 85, colKey: 'uomName' },
  { title: '库存总量', width: 85, colKey: 'stockNum' },
  { title: '3年以上', width: 85, colKey: 'threeYears' },
  { title: '2-3年', width: 85, colKey: 'twoToThreeYears' },
  { title: '1-2年', width: 85, colKey: 'oneToTwoYears' },
  { title: '6-12个月', width: 85, colKey: 'sixToTwelveMonths' },
  { title: '3-6个月', width: 85, colKey: 'threeToSixMonths' },
  { title: '1-3个月', width: 85, colKey: 'onwToThreeMonths' },
  { title: '30天内', width: 85, colKey: 'thirtyDays' },
  { title: '条码明细', align: 'left', fixed: 'right', width: 85, colKey: 'labelNo' },
];

// 明细
const onEditRowClick = async (value: any) => {
  formTitle.value = '库龄详情-条码明细';
  RPDRoutingVisible.value = true;
  const { onhandId } = value.row;
  const result = await api.storageAgeQuery.getDtl({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    onhandId,
  });
  sunData.value = result.list;
};

//* 初始渲染
onMounted(async () => {
  await fetchTable();
});

//* 表格数据
const fetchTable = async () => {
  setLoading(false);
  selectedReceiptRowKeys.value = [];
  tableDataReceipt.value = [];
  const data = await api.storageAgeQuery.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  tableDataReceipt.value = data.list;
  dataTotal.value = data.total;
  setLoading(false);
};

//* 表格刷新
const tabRefresh = async () => {
  await fetchTable();
};

//* 查询
const onInput = async (data: any) => {
  setLoading(true);
  const { mitemId, warehouseId, districtId, locationId } = data;
  const [stockInDateStart, stockInDateEnd] = data.stockInDate;
  if (!data.value) {
    const result = await api.storageAgeQuery.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      mitemId,
      warehouseId,
      districtId,
      locationId,
      stockInDateStart,
      stockInDateEnd,
    });
    tableDataReceipt.value = result.list;
    dataTotal.value = result.total;
  }
  setLoading(false);
};
</script>

<style lang="less" scoped></style>
