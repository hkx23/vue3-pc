<!-- 盘点管理  -->
<template>
  <cmp-container :full="true">
    <cmp-container>
      <!-- cmp-query 查询组件 -->
      <cmp-container>
        <cmp-card>
          <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput"> </cmp-query>
        </cmp-card>
      </cmp-container>

      <!-- cmp-table 表格组件   :row-select="{ type: 'single' }"  -->
      <cmp-card>
        <cmp-table
          v-model:pagination="pageUI"
          :loading="loading"
          row-key="billNo"
          :table-column="tableReckoningManagementColumns"
          :selected-row-keys="selectedBillId"
          :table-data="tableDataReckoning"
          :fixed-height="false"
          :total="dataTotal"
          empty="没有符合条件的数据"
          @select-change="handleRowSelectChange"
          @refresh="tabRefresh"
        >
          <template #button>
            <t-button theme="primary" @click="onAdd">新增</t-button>
            <t-button theme="default">作废</t-button>
            <t-button theme="primary">打印</t-button>
            <t-button theme="primary">导出</t-button>
          </template>
          <template #billNo="slotProps">
            <t-space :size="8">
              <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick(slotProps.row)">{{
                slotProps.row.billNo
              }}</t-link>
            </t-space>
          </template>

          <!-- 定义序号列的插槽 -->
          <template #indexSlot="{ rowIndex }">
            {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
          </template>
        </cmp-table>
      </cmp-card>

      <!-- 物料明细 -->
      <cmp-card>
        <cmp-table
          row-key="id"
          :loading="loading"
          :table-column="tableMaterialDetailsColumns"
          :table-data="tableMaterialDetails"
          :show-pagination="false"
          empty="没有符合条件的数据"
          :show-toolbar="false"
          :total="dataTotals"
        >
        </cmp-table>
      </cmp-card>
    </cmp-container>
  </cmp-container>

  <!-- 新增弹窗组件 -->
  <newInventoryManagemment v-model:visible="eidtRoutingVisible" :form-title="formTitle" @update-data="closeDialog" />
  <!-- 盘点单维护组件 -->
  <inventory-sheet-maintenance
    v-model:visible="ISMRoutingVisible"
    :form-title="formTitle"
    :propsdtl-id="propsdtlId"
    :stock-check-bill-status-name="stockCheckBillStatusName"
    :stock-check-bill-type-name="stockCheckBillTypeName"
  />
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

import { api as apiMain } from '@/api/main';
import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import InventorySheetMaintenance from './inventory-sheet-maintenance.vue';
import newInventoryManagemment from './new-inventory-managemment.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const inventoryManagement = ref([]);
const tableDataReckoning = ref([]); //* 表格数据1
const tableMaterialDetails = ref([]); //* 表格数据2
const eidtRoutingVisible = ref(false); //* 弹窗默认关闭
const ISMRoutingVisible = ref(false); //* 弹窗默认关闭
const formTitle = ref('');
const dataTotal = ref(0);
const dataTotals = ref(0);
const documentStatusOptions = ref([]);
const selectedBillId = ref([]); // 选中的序号
// 传递给详情组件的数据 给接口入参
const propsdtlId = ref('');
const stockCheckBillStatusName = ref('');
const stockCheckBillTypeName = ref('');

//* 组件配置--查询界面
const opts = computed(() => {
  return {
    billNo: {
      label: '盘点单号',
      comp: 't-input',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    timeCreate: {
      label: '创建时间',
      comp: 't-date-range-picker',
      defaultVal: [],
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD',
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
    status: {
      label: '单据状态',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: documentStatusOptions.value,
        clearable: true,
      },
    },
  };
});

// 表格主位栏 1
const tableReckoningManagementColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 40, cell: 'indexSlot' },
  { title: '盘点单号', colKey: 'billNo', width: 120 },
  { title: '仓库', width: 85, colKey: 'warehouseName' },
  { title: '盘点类型', width: 85, colKey: 'stockCheckBillTypeName' },
  { title: '状态', width: 85, colKey: 'stockCheckBillStatusName' },
  { title: '创建人', width: 85, colKey: 'creator' },
  {
    title: '创建时间',
    width: 85,
    colKey: 'timeCreate',
  },
  { title: '最后更新人', width: 100, colKey: 'modifier' },
  {
    title: '最后更新时间',
    width: 85,
    colKey: 'timeModified',
  },
];

// 表格主位栏 2 物料明细
const tableMaterialDetailsColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 40 },
  { title: '物料编码', colKey: 'mitemCode', width: 85 },
  { title: '物料描述', width: 85, colKey: 'districtName' },
  { title: '单位', width: 85, colKey: 'districtDesc' },
  {
    title: '仓库',
    width: 85,
    colKey: 'warehouseCode',
  },
  { title: '货区', width: 100, colKey: 'warehouseName' },
  { title: '货位', width: 100, colKey: 'warehouseName1' },
  { title: '账面数', width: 100, colKey: 'warehouseName3' },
  { title: '实盘数', width: 100, colKey: 'firmOfferNumber', cell: 'firmOfferNumberSlot' },
  { title: '差异数', width: 100, colKey: 'differenceNumber', cell: 'differenceNumberSlot' },
];

//* 表格数据 1
const fetchTable = async () => {
  setLoading(false);
  inventoryManagement.value = [];
  tableDataReckoning.value = [];
  const data = await api.stockCheckBill.getPdList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  // tableDataReckoning.value = data.list;
  tableDataReckoning.value = [...data.list];
  dataTotal.value = data.total;
  setLoading(false);
};

const handleRowSelectChange = (value: any[]) => {
  console.log('🚀 ~ handleRowSelectChange ~ value:', value); // todo
  // value 是每一列的id 我希望 每次点击都保证赋值 最后一个给 selectedBillId.value
  // 检查value数组是否非空
  if (value.length > 0) {
    // 只取数组中的最后一个元素（即最后一个选中的ID）
    selectedBillId.value = value[value.length - 1];
  }
};

watch(selectedBillId, (newBillId) => {
  if (newBillId) {
    fetchTables(newBillId); // 使用新的 billId 调用 fetchTables
  }
});

//* 表格数据 2
const fetchTables = async (billId) => {
  setLoading(false);
  const data = await api.stockCheckBill.getDtlList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    billId, // 使用传递的 billId
  });
  tableMaterialDetails.value = data.list;
  dataTotals.value = data.total;
  setLoading(false);
};

//* 初始渲染
onMounted(async () => {
  await fetchTable();
  await documentStatusData(); // 单据状态
});

//* 表格刷新
const tabRefresh = async () => {
  await fetchTable();
};

// 初始化系统字典单据状态
const documentStatusData = async () => {
  try {
    const res = await apiMain.param.getListByGroupCode({
      parmGroupCode: 'W_STOCK_CHECK_BILL_STATUS',
    });
    documentStatusOptions.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};

//* 查询
const onInput = async (data: any) => {
  const { billNo, status, warehouseId, timeCreate } = data;
  if (!data.value) {
    const data = await api.stockCheckBill.getPdList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      dateStart: timeCreate[0],
      dateEnd: timeCreate[1],
      warehouseId,
      billNo,
      status,
    });
    tableDataReckoning.value = [...data.list];
    dataTotal.value = data.total;
  }
};

const closeDialog = async () => {
  // 处理关闭弹窗的逻辑
  eidtRoutingVisible.value = false;
  await fetchTable();
};

const onAdd = () => {
  formTitle.value = '新增盘点管理';
  eidtRoutingVisible.value = true;
};

const onEditRowClick = (item) => {
  formTitle.value = '盘点单维护';
  ISMRoutingVisible.value = true;
  propsdtlId.value = item.billId;
  stockCheckBillStatusName.value = item.stockCheckBillStatusName;
  stockCheckBillTypeName.value = item.stockCheckBillTypeName;
};
</script>

<style lang="less" scoped></style>
