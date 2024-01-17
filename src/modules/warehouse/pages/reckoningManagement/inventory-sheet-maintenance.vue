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

          状态为 已创建或者 盘点中     不允许 差异调整 关闭单据

          状态为 已完成                不允许保存 和 盘点完成

          状态为 已关闭或者 已作废     只允许刷新  导出 打印
         -->
        <div class="buttonSty">
          <t-button :disabled="enableOnlyRefreshExportPrint" @click="renovate">刷新</t-button>
          <t-button :disabled="enableOnlyRefreshExportPrint">导出</t-button>
          <t-button :disabled="enableOnlyRefreshExportPrint">打印</t-button>
          <t-button :disabled="disableSaveAndCompletion" @click="saveData">保存</t-button>
          <t-button :disabled="disableSaveAndCompletion" @click="finish(props.propsdtlId)">盘点完成</t-button>
          <t-button :disabled="disableAdjustmentAndClosure">调整差异</t-button>
          <!-- <t-button :disabled="disableAdjustmentAndClosure">关闭单据</t-button> -->
          <t-button @click="closedocument">关闭单据</t-button>
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
          empty="没有符合条件的数据"
          :show-toolbar="false"
          :total="dataTotal"
          @select-change="handleRowSelectChange"
        >
          <!-- 实盘数的插槽 -->
          <template #firmOfferNumberSlot="{ row }">
            <div class="operation-buttons">
              <t-button variant="outline" theme="default" size="small" @click="increment(row)">+</t-button>
              <t-input
                v-model.number="row.checkQty"
                placeholder="输入实盘数"
                @change="(value) => inputTimeQtyChange(value, row)"
              ></t-input>
              <t-button variant="outline" theme="default" size="small" @click="decrement(row)">-</t-button>
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
            <t-input v-model="row.diffReason" placeholder="输入差异原因" :disabled="disableAdjustmentAndClosure">
            </t-input>
          </template>

          <!-- 差异调整原因的插槽 -->
          <template #diffAdjustReasonSlot="{ row }">
            <t-input v-model="row.differenceReason" placeholder="输入差异调整原因" :disabled="disableSaveAndCompletion">
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
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
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
  { title: '物料描述', width: 85, colKey: 'mitemName' },
  { title: '单位', width: 85, colKey: 'uomName' },
  {
    title: '仓库',
    width: 85,
    colKey: 'warehouseName',
  },
  { title: '货区', width: 100, colKey: 'districtName' },
  { title: '货位', width: 100, colKey: 'locationName' },
  { title: '最小包装', width: 100, colKey: 'warehouseName2' },
  { title: '账面数', width: 100, colKey: 'onhandQty' },
  { title: '实盘数', width: 240, colKey: 'checkQty', cell: 'firmOfferNumberSlot' },
  { title: '差异数', width: 100, colKey: 'differenceQty', cell: 'differenceNumberSlot' },
  { title: '差异原因', width: 100, colKey: 'diffReason', cell: 'differenceReasonSlot' },
  { title: '差异调整原因', width: 100, colKey: 'diffAdjustReason', cell: 'diffAdjustReasonSlot' },
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
  return props.stockCheckBillStatusName === '已关闭' || props.stockCheckBillStatusName === '已作废';
});

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

// 本次生成数量change事件
// const numInput = ref(null);
const inputTimeQtyChange = (value: any, row: any) => {
  console.log('🚀 ~ inputTimeQtyChange ~ value:', value);
  console.log('🚀 ~ inputTimeQtyChange ~ row:', row);
  // 修改表格的数据 前端收集 数组多个对象 每个对象里 有 billId  onhandQty diffReason diffAdjustReason
  // generateData.value.createNum = value; // 本次生成数量
  // numInput.value = row.planQty - row.generateQty;
};

// 刷新
const renovate = () => {
  // 调用两个表格数据接口  todo
  getMaterialDetails(props.propsdtlId);
};

// 保存
// const saveData = () => {
//   const originalData = [];
//   const modifiedData = tableDataInventory1.value.filter((row) => {
//     // 假设原始数据存储在 originalData 中，这里比较原始数据和当前数据
//     // 返回条件根据实际情况调整
//     return originalData.find((originalRow) => originalRow.id === row.id && originalRow.checkQty !== row.checkQty);
//   });
//   console.log('🚀 ~ modifiedData ~ modifiedData:', modifiedData);

//   // 步骤1 获取 修改的数据 可能是修改多条数据 动态的获取 table 插槽 绑定的数据
//   // 调用保存接口，传递 dataToSave
//   // 当获取数据时，将数组的每个对象转换为响应式
// };

// 保存
const saveData = () => {
  const modifiedData = tableDataInventory1.value
    .filter((row) => {
      // 检查每行数据是否有变化，例如检查 onhandQty 或其他字段
      // 这里的条件根据你的具体需求调整
      return row.checkQty !== row.originalcheckQty || row.diffReason !== row.originalDiffReason;
    })
    .map((row) => {
      return {
        billId: row.billId,
        checkQty: row.checkQty,
        diffReason: row.diffReason,
        diffAdjustReason: row.diffAdjustReason,
      };
    });

  console.log('Modified Data:', modifiedData);
  // 此处可以调用 API 发送 modifiedData 到后端
};

// 盘点完成
const finish = async (billId) => {
  // 调用盘点完成接口 传递需要的参数
  const result = await api.stockCheckBill.stockCheckFinish({
    billId,
  });
  console.log('🚀 ~ finish ~ result:', result);
  // 提示保存成功
  // 关闭弹窗?
};

// 关闭单据
const closedocument = () => {
  // api.stockCheckBill
};

//* 初始渲染
onMounted(async () => {
  await getMaterialDetails(props.propsdtlId);
});

const handleRowSelectChange = (value: any[]) => {
  console.log('🚀 ~ handleRowSelectChange ~ value:', value);
  if (value.length > 0) {
    sonId.value = value[value.length - 1];
  }
};

watch(sonId, (newBillId) => {
  console.log('🚀 ~ watch ~ newBillId:', newBillId);
  if (newBillId) {
    getBarcodesData(newBillId);
  }
});

// 加
const increment = (row) => {
  if (!row.checkQty) row.checkQty = 0;
  row.checkQty++;
};
// 减
const decrement = (row) => {
  if (!row.checkQty) row.checkQty = 0;
  if (row.checkQty > 0) row.checkQty--;
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
  console.log('🚀 ~ getMaterialDetails ~ result:', data);
  tableDataInventory1.value = data.list;
  dataTotal.value = data.total;
  setLoading(false);
};

// 获取标签明细
const getBarcodesData = async (dtlId) => {
  console.log('🚀 ~ getBarcodesData ~ dtlId:', dtlId);
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
      console.log('🚀 ~ dtlId:', dtlId);
      // 当 propsdtlId 变化时，重新获取数据
      getBarcodesData(dtlId);
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
