<!-- 盘点管理  -->
<template>
  <cmp-container :full="true">
    <cmp-container>
      <cmp-card>
        <!-- cmp-query 查询组件 -->
        <cmp-container>
          <cmp-card>
            <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput"> </cmp-query>
          </cmp-card>
        </cmp-container>

        <!-- cmp-table 表格组件   :row-select="{ type: 'single' }"    :selected-row-keys="selectedBillId" -->
        <cmp-card>
          <cmp-table
            v-model:pagination="pageUI"
            :loading="loading"
            row-key="billId"
            :table-column="tableReckoningManagementColumns"
            :table-data="tableDataReckoning"
            :fixed-height="false"
            :total="dataTotal"
            empty="没有符合条件的数据"
            @select-change="handleRowSelectChange"
            @refresh="tabRefresh"
          >
            <template #title>
              {{ '盘点管理列表' }}
            </template>
            <template #button>
              <t-button theme="primary" @click="onAdd">新增</t-button>
              <t-button theme="default" @click="scrappedBill(propsdtlId)">作废</t-button>
              <t-button theme="default">打印</t-button>
              <t-button theme="default">导出</t-button>
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
            <template #indexSlot="{ rowIndex }">
              {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
            </template>
          </cmp-table>
        </cmp-card>
      </cmp-card>
    </cmp-container>
  </cmp-container>

  <!-- 新增弹窗组件 -->
  <newInventoryManagemment v-model:visible="eidtRoutingVisible" :form-title="formTitle" @update-data="closeDialog" />
  <!-- 盘点单维护组件 -->
  <inventory-sheet-maintenance
    ref="refreshTable"
    v-model:visible="ISMRoutingVisible"
    :form-title="formTitle"
    :propsdtl-id="propsdtlId"
    :propsbill-no="propsbillNo"
    :propswarehouse-id="propswarehouseId"
    :stock-check-bill-status-name="stockCheckBillStatusName"
    :stock-check-bill-type-name="stockCheckBillTypeName"
    @update-status="handleUpdateStatus"
  />
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, ref, watch } from 'vue';

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
// const selectedBillId = ref([]); // 选中的序号
// 传递给详情组件的数据 给接口入参
const propsdtlId = ref('');
const propsbillNo = ref('');
const propswarehouseId = ref(''); // 差异调整入参
const stockCheckBillStatusName = ref('');
const stockCheckBillTypeName = ref('');

const refreshTable = ref(null);

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
  { title: '序号', colKey: 'index', width: 40, cell: 'indexSlot' },
  { title: '物料编码', colKey: 'mitemCode', width: 85 },
  { title: '物料描述', width: 85, colKey: 'districtName' },
  { title: '单位', width: 85, colKey: 'uomName' },
  {
    title: '仓库',
    width: 85,
    colKey: 'warehouseName',
  },
  { title: '货区', width: 100, colKey: 'districtName' },
  { title: '货位', width: 100, colKey: 'locationName' },
  { title: '账面数', width: 100, colKey: 'onhandQty' },
  { title: '实盘数', width: 100, colKey: 'checkQty' },
  { title: '差异数', width: 100, colKey: 'differenceQty' },
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
  //   //点击当前行取这行的  billId 不是  billon
  if (value.length > 0) {
    // 只取数组中的最后一个元素（即最后一个选中的ID）
    propsdtlId.value = value[value.length - 1];
  }
};

watch(propsdtlId, (newBillId) => {
  if (newBillId) {
    fetchTables(newBillId); // 使用新的 billId 调用 fetchTables
  }
});

//* 表格数据 2
const fetchTables = async (billId) => {
  setLoading(false);
  pageUI.value.page = 1;
  const data = await api.stockCheckBill.getDtlList({
    // pageNum: 1,
    // pageSize: 10,
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    billId, // 使用传递的 billId
  });
  tableMaterialDetails.value = data.list;
  dataTotals.value = data.total;
  setLoading(false);
};
const handleUpdateStatus = async (e) => {
  // 刷新表格数据
  stockCheckBillStatusName.value = e;
  await fetchTable();
};

//* 初始渲染
onMounted(async () => {
  await fetchTable();
  await documentStatusData(); // 单据状态
  // await fetchTables(propsdtlId.value); //详情表格
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
  setLoading(true);
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
  setLoading(false);
};

const closeDialog = async () => {
  // 处理关闭弹窗的逻辑
  eidtRoutingVisible.value = false;
  await fetchTable();
};

const onAdd = () => {
  formTitle.value = '新增盘点管理';
  eidtRoutingVisible.value = true;
  // 再次新增清空数据
};
// 作废
const scrappedBill = async (billId) => {
  // 检查是否选择了一行
  if (propsdtlId.value) {
    // 执行作废操作
    await api.stockCheckBill.scrappedBill({
      billId,
    });
    await fetchTable();
    MessagePlugin.success('作废成功!');
  } else {
    // 如果没有选择任何行，显示错误消息
    MessagePlugin.error('请选择一行进行作废操作');
  }
};

const onEditRowClick = async (item) => {
  formTitle.value = '盘点单维护';
  ISMRoutingVisible.value = true;
  propsdtlId.value = item.billId;
  propsbillNo.value = item.billNo;
  propswarehouseId.value = item.warehouseId;

  // 等待弹窗完全显示后再调用子组件方法
  await nextTick();
  if (refreshTable.value && refreshTable.value.getMaterialDetails) {
    refreshTable.value.getMaterialDetails(propsdtlId.value);
  }

  stockCheckBillStatusName.value = item.stockCheckBillStatusName;
  stockCheckBillTypeName.value = item.stockCheckBillTypeName;
};
</script>

<style lang="less" scoped></style>
