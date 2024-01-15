<!-- 盘点单维护 -->
<template>
  <t-dialog width="80%" :footer="false" :close-on-overlay-click="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <cmp-container :full="true">
      <cmp-card>
        <!-- 按钮操作逻辑
          
          盘点状态为 已创建或者 盘点中     不允许 差异调整 关闭单据

          盘点状态为 已完成                不允许保存 和 盘点完成

          盘点状态为 已关闭或者 已作废     只允许刷新  导出 打印
         -->
        <div class="buttonSty">
          <t-button>刷新</t-button>
          <t-button>导出</t-button>
          <t-button>打印</t-button>
          <t-button>保存</t-button>
          <t-button>盘点完成</t-button>
          <t-button>调整差异</t-button>
          <t-button>关闭单据</t-button>
        </div>
      </cmp-card>
      <!-- 盘点单相关详细信息 -->
      <cmp-card>
        <template #title> 盘点单{{ props.propsdtlId }}相关详细信息 </template>
        <t-form>
          <t-row>
            <t-form-item label="盘点单号：" name="description">
              <p>{{ props.propsdtlId }}</p>
            </t-form-item>
            <t-form-item label="盘点类型：" name="description">
              <p>{{ props.stockCheckBillStatusName }}</p>
            </t-form-item>
            <t-form-item label="状态：" name="description">
              <p>{{ props.stockCheckBillTypeName }}</p>
            </t-form-item>
          </t-row>
        </t-form>
      </cmp-card>
      <!-- table 物料明细 -->
      <cmp-card>
        <template #title> 物料明细 </template>
        <cmp-table
          row-key="id"
          :loading="loading"
          :table-column="tableWarehouseColumns"
          :table-data="tableDataInventory1"
          :show-pagination="false"
          empty="没有符合条件的数据"
          :show-toolbar="false"
          :total="dataTotal"
        >
          <!-- 实盘数的插槽 -->
          <template #firmOfferNumberSlot="{ row }">
            <div class="operation-buttons">
              <t-button variant="outline" theme="default" size="small" @click="increment(row)">+</t-button>
              <t-input v-model.number="row.firmOfferNumber" placeholder="输入实盘数"></t-input>
              <t-button variant="outline" theme="default" size="small" @click="decrement(row)">-</t-button>
            </div>
          </template>
          <!-- 差异数的插槽 -->
          <template #differenceNumberSlot="{ row }">
            <t-input v-model="row.differenceNumber" placeholder="输入差异数"></t-input>
          </template>
          <!-- 差异原因的插槽 -->
          <template #differenceReasonSlot="{ row }">
            <t-input v-model="row.differenceReason" placeholder="输入差异原因" disabled></t-input>
          </template>
        </cmp-table>
      </cmp-card>
      <!-- table 标签明细 -->
      <cmp-card>
        <template #title> 标签明细 </template>
        <cmp-table
          row-key="id"
          :table-column="tableWarehouseColumns1"
          :show-pagination="false"
          empty="没有符合条件的数据"
          :show-toolbar="false"
        >
        </cmp-table>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';

import { api } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { loading, setLoading } = useLoading();

//* 表格标题--物料明细
const tableWarehouseColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 65 },
  { title: '物料编码', colKey: 'districtCode', width: 85 },
  { title: '物料描述', width: 85, colKey: 'districtName' },
  { title: '单位', width: 85, colKey: 'districtDesc' },
  {
    title: '仓库',
    width: 85,
    colKey: 'warehouseCode',
  },
  { title: '货区', width: 100, colKey: 'warehouseName' },
  { title: '货位', width: 100, colKey: 'warehouseName1' },
  { title: '最小包装', width: 100, colKey: 'warehouseName2' },
  { title: '账面数', width: 100, colKey: 'warehouseName3' },
  { title: '实盘数', width: 300, colKey: 'firmOfferNumber', cell: 'firmOfferNumberSlot' },
  { title: '差异数', width: 100, colKey: 'differenceNumber', cell: 'differenceNumberSlot' },
  { title: '差异原因', width: 100, colKey: 'differenceReason', cell: 'differenceReasonSlot' },
  { title: '差异调整原因', width: 100, colKey: 'warehouseName7' },
];
//* 表格标题--标签明细
const tableWarehouseColumns1: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 65 },
  { title: '标签条码', colKey: 'districtCode', width: 85 },
  { title: '物料编码', width: 85, colKey: 'districtName' },
  { title: '物料描述', width: 85, colKey: 'districtDesc' },
  {
    title: '发出仓库',
    width: 85,
    colKey: 'warehouseCode',
  },
  { title: '货区', width: 100, colKey: 'warehouseName' },
  { title: '发出货位', width: 100, colKey: 'warehouseName1' },
  { title: '单位', width: 100, colKey: 'warehouseName2' },
  { title: '盘点数量', width: 100, colKey: 'warehouseName3' },
  { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
];

const newInventoryManagement1 = ref([]);
const tableDataInventory1 = ref([]);
const { pageUI } = usePage();
const dataTotal = ref(0);

//* 初始渲染
onMounted(async () => {
  await fetchTable();
  await getBarcodesData(props.propsdtlId);
  await gitMaterialDetails(props.propsdtlId);
});

//* 表格数据
const fetchTable = async () => {
  setLoading(false);
  newInventoryManagement1.value = [];
  tableDataInventory1.value = [];
  // const data = await api.billManagement.getList({
  //   pageNum: pageUI.value.page,
  //   pageSize: pageUI.value.rows,
  // });
  // tableDataInventory1.value = data.list;
  // dataTotal.value = data.total;
  setLoading(false);
};
// 加
const increment = (row) => {
  if (!row.firmOfferNumber) row.firmOfferNumber = 0;
  row.firmOfferNumber++;
};
// 减
const decrement = (row) => {
  if (!row.firmOfferNumber) row.firmOfferNumber = 0;
  if (row.firmOfferNumber > 0) row.firmOfferNumber--;
};
// 接收父组件的参数
const props = defineProps({
  formTitle: {
    type: String,
  },
  propsdtlId: {
    type: String,
  },
  stockCheckBillStatusName: {
    type: String,
  },
  stockCheckBillTypeName: {
    type: String,
  },
});

// 获取物料明细
const gitMaterialDetails = async (billId) => {
  const result = await api.stockCheckBill.getDtlList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    billId,
  });
  console.log('🚀 ~ gitMaterialDetails ~ result:', result);
};

// 获取标签明细
const getBarcodesData = async (dtlId) => {
  const result = await api.stockCheckBill.getBarcodes({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    dtlId,
  });
  console.log('🚀 ~ getBarcodesData ~ result:', result);
};

watch(
  () => props.propsdtlId,
  (newVal) => {
    if (newVal) {
      // 当 propsdtlId 变化时，重新获取数据
      gitMaterialDetails(newVal);
      getBarcodesData(newVal);
    }
  },
);
</script>

<style scoped>
.buttonSty {
  display: flex;
  justify-content: flex-start;
}

.number-input-container {
  display: flex;
  align-items: center;
}

.operation-buttons {
  display: flex;
  justify-content: space-between; /* 两端对齐 */
}

.operation-buttons > t-button {
  margin-top: 10px;
  margin-right: 8px; /* 按钮之间的间隔 */
}

.operation-buttons > t-button:last-child {
  margin-right: 0; /* 最后一个按钮不需要右边距 */
}
</style>
