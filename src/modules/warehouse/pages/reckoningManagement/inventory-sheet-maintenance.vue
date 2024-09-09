<!-- 盘点单维护 -->
<template>
  <t-dialog width="90%" top="56px" :footer="false" :close-on-overlay-click="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <cmp-container :full="true" style="height: calc(90vh - 56px - 57px)">
      <scroll-view ref="scrollView" class="scroll-view">
        <cmp-card>
          <!-- 按钮操作逻辑

          状态为 已创建或者 盘点中             不允许 差异调整 关闭单据

          状态为 已完成                        不允许保存 和 盘点完成

          状态为 已关闭或者 已作废 == 已取消    只允许刷新  导出 打印
         -->
          <div class="buttonSty">
            <t-button @click="getMaterialDetails(props.propsdtlId)">刷新</t-button>
            <!-- <t-button>导出</t-button>
            <t-button>打印</t-button> -->
            <t-button :disabled="disableSaveAndCompletion || enableOnlyRefreshExportPrint" @click="saveData"
              >保存</t-button
            >
            <t-button
              :disabled="disableSaveAndCompletion || enableOnlyRefreshExportPrint"
              @click="finish(props.propsdtlId)"
              >盘点完成</t-button
            >
            <t-button
              :loading="adjstmentLoading"
              :disabled="disableAdjustmentAndClosure || enableOnlyRefreshExportPrint"
              @click="getAdjustment"
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
          <!-- <template #title> 盘点单{{ props.propsdtlId }}相关详细信息 </template> -->
          <template #title> 盘点单{{ props.propsbillNo }}相关详细信息 </template>
          <t-form>
            <t-row>
              <t-form-item label="盘点单号：" name="description">
                <!-- <p>{{ props.propsdtlId }}</p> -->
                <p>{{ props.propsbillNo }}</p>
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
            select-on-row-click
            :show-pagination="false"
            :hover="true"
            max-height="250px"
            empty="没有符合条件的数据"
            :show-toolbar="false"
            :total="dataTotal"
            @select-change="handleRowSelectChange"
          >
            <template #indexSlot="{ rowIndex }">
              {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
            </template>
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
                {{ row.checkQty }}
                <!-- <t-input-number
                  v-model.number="row.checkQty"
                  :disabled="enableOnlyRefreshExportPrint || row.isBatchNoName == '是'"
                  placeholder="输入实盘数"
                  :min="0"
                ></t-input-number> -->
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
          <template #title> {{ selectedRowBatch ? '批次明细' : '标签明细' }} </template>
          <cmp-table
            v-show="!selectedRowBatch"
            :loading="loadingDtl"
            row-key="scanBarcode"
            :table-column="tableWarehouseColumns2"
            :table-data="tableDataInventory2"
            :show-pagination="false"
            :hover="true"
            max-height="400px"
            empty="没有符合条件的数据"
            :show-toolbar="false"
            :total="dataTotals"
          >
          </cmp-table>
          <cmp-table
            v-show="selectedRowBatch"
            :loading="loadingDtl"
            row-key="batchLot"
            :table-column="tableWarehouseColumns3"
            :table-data="tableDataInventory2"
            :show-pagination="false"
            :hover="true"
            max-height="500px"
            empty="没有符合条件的数据"
            :show-toolbar="false"
            :total="dataTotals"
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
                <!-- {{ row.checkQty }} -->
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
          </cmp-table>
        </cmp-card>
      </scroll-view>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
import { DialogPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

import { api, StockCheckBillDtl } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { loading, setLoading } = useLoading();
const { loading: loadingDtl, setLoading: setLoadingDtl } = useLoading();
//* 表格标题--物料明细
const tableWarehouseColumns1: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'single', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 65, cell: 'indexSlot' },
  { title: '物料编码', colKey: 'mitemCode', width: 110 },
  { title: '物料描述', width: 110, colKey: 'mitemDesc' },
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
  { title: '实时库存数', width: 100, colKey: 'nowOnhandQty' },
  { title: '实盘数', width: 150, colKey: 'checkQty', cell: 'firmOfferNumberSlot' },
  { title: '差异数', width: 100, colKey: 'differenceQty', cell: 'differenceNumberSlot' },
  { title: '差异原因', width: 150, colKey: 'diffReason', cell: 'differenceReasonSlot' },
  { title: '差异调整原因', width: 150, colKey: 'diffAdjustReason', cell: 'diffAdjustReasonSlot' },
  { title: '条码管控', width: 100, colKey: 'isBatchNoName' },
];

//* 表格标题--标签明细
const tableWarehouseColumns2: PrimaryTableCol<TableRowData>[] = [
  // { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  // { title: '序号', colKey: 'index', width: 65 },
  { title: '标签条码', colKey: 'scanBarcode', width: 140 },
  { title: '物料编码', width: 85, colKey: 'mitemCode' },
  { title: '物料描述', width: 85, colKey: 'mitemDesc' },
  { title: '发出仓库', width: 85, colKey: 'warehouseName' },
  { title: '货区', width: 100, colKey: 'districtName' },
  { title: '发出货位', width: 100, colKey: 'locationName' },
  { title: '实盘数', width: 100, colKey: 'checkQty' },
  { title: '单位', width: 100, colKey: 'uomName' },
  // { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
];

const tableWarehouseColumns3: PrimaryTableCol<TableRowData>[] = [
  // { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  // { title: '序号', colKey: 'index', width: 65 },
  { title: '物料批次', colKey: 'batchLot', width: 140 },
  { title: '物料编码', width: 85, colKey: 'mitemCode' },
  { title: '物料描述', width: 85, colKey: 'mitemDesc' },
  { title: '发出仓库', width: 85, colKey: 'warehouseName' },
  { title: '货区', width: 100, colKey: 'districtName' },
  { title: '发出货位', width: 100, colKey: 'locationName' },
  { title: '实盘数', width: 100, colKey: 'checkQty', cell: 'firmOfferNumberSlot' },
  { title: '单位', width: 100, colKey: 'uomName' },
  // { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
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
const desData = ref<StockCheckBillDtl[]>([]);

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
        pdDtlId: row.pdDtlId,
        dtls: row.dtls,
      };
    });

  /// 保存接口
  await api.stockCheckBill.save({ dtlsWithBarcode: modifiedData });
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

const confirmOnhandQty = () => {
  const confirmDia = DialogPlugin({
    header: '实时库存现有量与账面数不一致',
    body: '实时库存现有量与账面数不一致,请确认是否继续调整',
    confirmBtn: '确认',
    cancelBtn: '取消',
    onConfirm: async () => {
      doAdjustment();
      confirmDia.hide();
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};
// 差异调整
const getAdjustment = async () => {
  let same = true;

  tableDataInventory1.value.forEach((item) => {
    if (item.onhandQty !== item.checkQty) {
      same = false;
    }
  });
  setLoadingDtl(true);
  if (!same) {
    confirmOnhandQty();
  } else {
    await doAdjustment();
  }
  setLoadingDtl(false);
};

const adjstmentLoading = ref(false);
const doAdjustment = async () => {
  // 处理参数
  desData.value = tableDataInventory1.value;
  console.log('这是billid的值：', props.propsdtlId);
  const billId = props.propsdtlId[0];
  const billNo = props.propsbillNo;
  const warehouseId = props.propswarehouseId;
  adjstmentLoading.value = true;
  try {
    await api.stockCheckBill.adjustment({
      billId,
      billNo,
      warehouseId,
      dtlsWithBarcode: desData.value,
    });
  } finally {
    adjstmentLoading.value = false;
  }
  emit('updateStatus', '已关闭'); // 发射事件，可以携带新状态作为参数
  // 提示调整完成
  await MessagePlugin.success('调整完成!');
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
// const rehandleSelectChange = (value, { selectedRowData }) => {
//   selectedRowKeys.value = value;
//   console.log(value, selectedRowData);
// };
const selectedRowBatch = ref(false);
const handleRowSelectChange = (value, { selectedRowData }) => {
  if (value.length > 0) {
    sonId.value = value[value.length - 1];
    selectedRowData.value = selectedRowData;
    selectedRowBatch.value = selectedRowData[0].isBatchNo === 1;
  }
};

watch(sonId, (newBillId) => {
  if (newBillId) {
    getBarcodesData(newBillId);
  }
});

watch(
  tableDataInventory2,
  () => {
    // 根据明细数据更新主数据的总数量
    tableDataInventory1.value.forEach((mainItem) => {
      const relatedDetails = tableDataInventory2.value.filter((detail) => detail.pdDtlId === mainItem.pdDtlId);
      if (relatedDetails && relatedDetails.length > 0) {
        const total = relatedDetails.reduce((sum, detail) => sum + detail.checkQty, 0);
        mainItem.checkQty = total;
      }
    });
  },
  { deep: true },
);

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
  try {
    setLoading(true);
    tableDataInventory2.value = [];
    newInventoryManagement1.value = [];
    tableDataInventory1.value = [];
    const data = await api.stockCheckBill.getDtlList({
      pageNum: 1,
      pageSize: 9999999,
      billId,
    });
    tableDataInventory1.value = data.list;
    dataTotal.value = data.total;
    sonId.value = '';
  } finally {
    setLoading(false);
  }
};

// 获取标签明细
const getBarcodesData = async (dtlId) => {
  newInventoryManagement2.value = [];
  tableDataInventory2.value = [];
  setLoadingDtl(true);
  const data = await api.stockCheckBill.getBarcodes({
    pageNum: 1,
    pageSize: 9999999,
    dtlId,
  });
  // const data = tableDataInventory1.value.filter((item) => item.pdDtlId === dtlId);
  if (data) {
    tableDataInventory2.value = data.list;
    dataTotals.value = data.total;
  }
  setLoadingDtl(false);
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

.scroll-view {
  height: 100%;
  overflow-y: auto;
}
</style>
