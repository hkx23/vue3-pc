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

          状态为 已创建或者 盘点中             不允许 差异调整 关闭单据

          状态为 已完成                        不允许保存 和 盘点完成

          状态为 已关闭或者 已作废 == 已取消    只允许刷新  导出 打印
         -->
        <div class="buttonSty">
          <t-button @click="getMaterialDetails(props.propsdtlId)">刷新</t-button>
          <t-button>导出</t-button>
          <t-button>打印</t-button>
          <t-button :disabled="disableSaveAndCompletion || enableOnlyRefreshExportPrint" @click="saveData"
            >保存</t-button
          >
          <t-button
            :disabled="disableSaveAndCompletion || enableOnlyRefreshExportPrint"
            @click="finish(props.propsdtlId)"
            >盘点完成</t-button
          >
          <t-button :disabled="disableAdjustmentAndClosure || enableOnlyRefreshExportPrint" @click="getAdjustment"
            >差异调整</t-button
          >
          <t-button
            :disabled="disableAdjustmentAndClosure || enableOnlyRefreshExportPrint"
            @click="closedocument(props.propsdtlId)"
            >关闭单据</t-button
          >
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
              <p>{{ props.stockCheckBillTypeName }}</p>
            </t-form-item>
            <t-form-item label="状态：" name="description">
              <p>{{ props.stockCheckBillStatusName }}</p>
            </t-form-item>
          </t-row>
        </t-form>
      </cmp-card>
      <!-- table 物料明细 -->
      <cmp-card>
        <template #title> 物料明细 </template>
        <t-table
          row-key="pdDtlId"
          :loading="loading"
          :columns="tableWarehouseColumns1"
          :data="tableDataInventory1"
          :show-pagination="false"
          :hover="true"
          :fixed-height="true"
          empty="没有符合条件的数据"
          :show-toolbar="false"
          :total="dataTotal"
          @select-change="handleRowSelectChange"
        >
          <!-- 实盘数的插槽 -->
          <template #firmOfferNumberSlot="{ row }">
            <div class="operation-buttons">
              <!-- todo input-number -->
              <!-- <t-button
                :disabled="enableOnlyRefreshExportPrint"
                variant="outline"
                theme="default"
                size="small"
                @click="increment(row)"
                >+</t-button
              > -->
              <!-- <t-input-number v-model="formData1.createNum" :min="1" :max="100"></t-input-number> -->

              <t-input-number
                v-model.number="row.checkQty"
                :disabled="enableOnlyRefreshExportPrint"
                placeholder="输入实盘数"
                :min="0"
              ></t-input-number>
              <!--               
              <t-button
                :disabled="enableOnlyRefreshExportPrint"
                variant="outline"
                theme="default"
                size="small"
                @click="decrement(row)"
                >-</t-button
              > -->
            </div>
          </template>
          <!-- 差异数的插槽 -->
          <template #differenceNumberSlot="{ row }">
            <span :style="{ color: getDifference(row.checkQty, row.onhandQty) < 0 ? 'red' : 'black' }">
              {{ getDifference(row.checkQty, row.onhandQty) }}
            </span>
          </template>

          <!-- 差异原因的插槽 -->
          <template #differenceReasonSlot="{ row }">
            <!-- 差异原因 已创建，盘点中 才能输入 -->
            <t-input v-model="row.diffReason" placeholder="输入差异原因" :disabled="!disableAdjustmentAndClosure">
            </t-input>
          </template>

          <!-- 差异调整原因的插槽 -->
          <template #diffAdjustReasonSlot="{ row }">
            <!-- 差异调整原因 已完成 才能输入-->
            <t-input
              v-model="row.differenceReason"
              placeholder="输入差异调整原因"
              :disabled="!disableSaveAndCompletion"
            >
            </t-input>
          </template>
        </t-table>
      </cmp-card>
      <!-- table 标签明细 -->
      <cmp-card>
        <template #title> 标签明细 </template>
        <cmp-table
          row-key="id"
          :table-column="tableWarehouseColumns2"
          :table-data="tableDataInventory2"
          :show-pagination="false"
          :hover="true"
          :fixed-height="true"
          empty="没有符合条件的数据"
          :show-toolbar="false"
          :total="dataTotals"
        >
        </cmp-table>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

import { api } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { loading, setLoading } = useLoading();

//* 表格标题--物料明细
const tableWarehouseColumns1: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 65 },
  { title: '物料编码', colKey: 'mitemCode', width: 85 },
  { title: '物料描述', width: 150, colKey: 'mitemName' },
  { title: '单位', width: 85, colKey: 'uomName' },
  {
    title: '仓库',
    width: 85,
    colKey: 'warehouseName',
  },
  { title: '货区', width: 100, colKey: 'districtName' },
  { title: '货位', width: 100, colKey: 'locationName' },
  // { title: '最小包装', width: 100, colKey: 'warehouseName2' },
  { title: '账面数', width: 100, colKey: 'onhandQty' },
  { title: '实盘数', width: 150, colKey: 'checkQty', cell: 'firmOfferNumberSlot' },
  { title: '差异数', width: 100, colKey: 'differenceQty', cell: 'differenceNumberSlot' },
  { title: '差异原因', width: 150, colKey: 'diffReason', cell: 'differenceReasonSlot' },
  { title: '差异调整原因', width: 150, colKey: 'diffAdjustReason', cell: 'diffAdjustReasonSlot' },
];

//* 表格标题--标签明细
const tableWarehouseColumns2: PrimaryTableCol<TableRowData>[] = [
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

//* 计算属性控制按钮
const disableAdjustmentAndClosure = computed(() => {
  return props.stockCheckBillStatusName === '已创建' || props.stockCheckBillStatusName === '盘点中';
});
const disableSaveAndCompletion = computed(() => {
  return props.stockCheckBillStatusName === '已完成';
});
const enableOnlyRefreshExportPrint = computed(() => {
  return props.stockCheckBillStatusName === '已关闭' || props.stockCheckBillStatusName === '已取消';
});

// 差异数 color 控制
const getDifference = (checkQty, onhandQty) => {
  return checkQty - onhandQty;
};

const newInventoryManagement1 = ref([]);
const tableDataInventory1 = ref([]);
const newInventoryManagement2 = ref([]);
const tableDataInventory2 = ref([]);
const { pageUI } = usePage();
const dataTotal = ref(0);
const dataTotals = ref(0);
const sonId = ref(''); // getBarcodes 接口入参

// 保存
const saveData = async () => {
  // 处理参数
  const modifiedData = tableDataInventory1.value
    .filter((row) => {
      return row.checkQty || row.diffReason || row.pdDtlId;
    })
    .map((row) => {
      return {
        checkQty: row.checkQty,
        diffReason: row.diffReason,
        id: row.pdDtlId,
      };
    });

  /// 保存接口
  await api.stockCheckBill.save({ dtls: modifiedData });
  await getMaterialDetails(props.propsdtlId);
  await MessagePlugin.success('保存成功!');
};

// 盘点完成
const finish = async (billId) => {
  // 调用盘点完成接口 传递需要的参数
  await api.stockCheckBill.stockCheckFinish({
    billId,
  });
  await getMaterialDetails(props.propsdtlId);
  emit('updateStatus', '已完成'); // 发射事件，可以携带新状态作为参数
  // 提示盘点完成
  await MessagePlugin.success('盘点完成!');
};

// 差异调整
const getAdjustment = async () => {
  // 处理参数
  const desData = tableDataInventory1.value
    .filter((row) => {
      return row.checkQty || row.differenceReason || row.pdDtlId;
    })
    .map((row) => {
      return {
        checkQty: row.checkQty,
        differenceReason: row.differenceReason,
        id: row.pdDtlId,
      };
    });
  const billId = props.propsdtlId;
  const billNo = props.propsbillNo;
  const warehouseId = props.propswarehouseId;
  await api.stockCheckBill.adjustment({
    billId,
    billNo,
    warehouseId,
    dtls: desData,
  });
};

// 关闭单据
const emit = defineEmits(['updateStatus']);
const closedocument = async (billId) => {
  await api.stockCheckBill.stockCheckClose({
    billId,
  });
  emit('updateStatus', '已关闭'); // 发射事件，可以携带新状态作为参数
  MessagePlugin.success('已关闭单据！');
};

//* 初始渲染
onMounted(async () => {
  await getMaterialDetails(props.propsdtlId);
});

const handleRowSelectChange = (value: any[]) => {
  if (value.length > 0) {
    sonId.value = value[value.length - 1];
  }
};

watch(sonId, (newBillId) => {
  if (newBillId) {
    getBarcodesData(newBillId);
  }
});

// // 加
// const increment = (row) => {
//   if (!row.checkQty) row.checkQty = 0;
//   row.checkQty++;
// };
// // 减
// const decrement = (row) => {
//   if (!row.checkQty) row.checkQty = 0;
//   if (row.checkQty > 0) row.checkQty--;
// };
// 接收父组件的参数
const props = defineProps({
  formTitle: {
    type: String,
  },
  propsdtlId: {
    type: String,
  },
  propsbillNo: {
    type: String,
  },
  propswarehouseId: {
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
const getMaterialDetails = async (billId) => {
  setLoading(true);
  newInventoryManagement1.value = [];
  tableDataInventory1.value = [];
  pageUI.value.page = 1;
  const data = await api.stockCheckBill.getDtlList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    billId,
  });
  tableDataInventory1.value = data.list;
  dataTotal.value = data.total;
  setLoading(false);
};

// 获取标签明细
const getBarcodesData = async (dtlId) => {
  newInventoryManagement2.value = [];
  tableDataInventory2.value = [];
  pageUI.value.page = 1;
  const data = await api.stockCheckBill.getBarcodes({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    dtlId,
  });
  tableDataInventory2.value = data.list;
  dataTotals.value = data.total;
};

watch(
  () => sonId.value,
  (dtlId) => {
    if (dtlId) {
      // 当 propsdtlId 变化时，重新获取数据
      getBarcodesData(dtlId);
    }
  },
);
// 暴露方法
defineExpose({
  getMaterialDetails,
});
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
  align-items: center;
  height: 40px !important;
}

.operation-buttons > t-button {
  margin-top: 10px;
  margin-right: 8px; /* 按钮之间的间隔 */
}

.operation-buttons > t-button:last-child {
  margin-right: 0; /* 最后一个按钮不需要右边距 */
}
</style>
