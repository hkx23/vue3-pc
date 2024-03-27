<!-- 盘点管理  -->
<template>
  <cmp-container :full="true">
    <!-- cmp-query 查询组件 -->
    <cmp-card :span="12">
      <cmp-container :full="true">
        <!-- <cmp-card :span="12"> -->
        <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput" @reset="onReset">
        </cmp-query>

        <!-- cmp-table 表格组件  select-on-row-click  TODO  -->
        <cmp-table
          v-model:pagination="firstPageUI"
          v-model:selected-row-keys="selectedRowKeys"
          row-key="billId"
          :loading="loading"
          :table-column="tableReckoningManagementColumns"
          :table-data="tableDataReckoning"
          :fixed-height="true"
          :hover="true"
          :total="dataTotal"
          max-height="200px"
          type="single"
          empty="没有符合条件的数据"
          select-on-row-click
          @select-change="handleRowSelectChange"
          @row-mouseup="handleRowClick"
          @refresh="tabRefresh"
        >
          <template #title>
            {{ '盘点管理' }}
          </template>
          <template #button>
            <t-space :size="8">
              <t-button theme="primary" @click="onAdd">新增</t-button>
              <!-- <t-button theme="default" @click="scrappedBill(propsdtlId)">作废</t-button> -->
              <t-popconfirm theme="default" content="确认作废吗？" @confirm="scrappedBill(propsdtlId)">
                <t-button theme="default"> 作废 </t-button>
              </t-popconfirm>
              <t-button theme="default"> 打印 </t-button>
              <!-- <t-button theme="default">导出</t-button> -->
            </t-space>
          </template>

          <template #billNo="slotProps">
            <t-space :size="8">
              <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick(slotProps.row)">{{
                slotProps.row.billNo
              }}</t-link>
            </t-space>
          </template>
        </cmp-table>
      </cmp-container>
    </cmp-card>

    <!-- 物料明细 -->
    <cmp-card :span="12">
      <!-- type="single" -->
      <cmp-table
        v-model:pagination="detailsPageUI"
        row-key="mitemCode"
        :loading="loading"
        :table-column="tableMaterialDetailsColumns"
        :table-data="tableMaterialDetails"
        select-on-row-click
        :show-pagination="false"
        empty="没有符合条件的数据"
        :show-toolbar="false"
        :total="dataTotals"
      >
        <!-- <template #indexSlot="{ rowIndex }">
              {{ (firstPageUI.page - 1) * firstPageUI.rows + rowIndex + 1 }}
            </template> -->
      </cmp-table>
    </cmp-card>
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
import dayjs from 'dayjs';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, ref, watch } from 'vue';

import { api as apiMain } from '@/api/main';
import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import InventorySheetMaintenance from './inventory-sheet-maintenance.vue';
import newInventoryManagemment from './new-inventory-managemment.vue';

const { pageUI: firstPageUI } = usePage();
const { pageUI: detailsPageUI } = usePage();
const { loading, setLoading } = useLoading();
const inventoryManagement = ref([]);
const tableDataReckoning = ref([]); //* 表格数据1
const tableMaterialDetails = ref([]); //* 表格数据2
const eidtRoutingVisible = ref(false); //* 弹窗默认关闭
const ISMRoutingVisible = ref(false); //* 弹窗默认关闭
const selectedRowKeys = ref([]); // 勾选

const formTitle = ref('');
const dataTotal = ref(0);
const dataTotals = ref(0);
const documentStatusOptions = ref([]);
// 传递给详情组件的数据 给接口入参
const propsdtlId = ref('');
const propsbillNo = ref('');
const propswarehouseId = ref(''); // 差异调整入参
const stockCheckBillStatusName = ref('');
const stockCheckBillTypeName = ref('');

const refreshTable = ref(null);
const queryComponent = ref();

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
      event: 'daterangetime',
      defaultVal: [dayjs(), dayjs()],
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
const tableReckoningManagementColumns = ref([
  { colKey: 'row-select', width: 40, type: 'single', fixed: 'left' },
  { colKey: 'billNo', title: '盘点单号', width: 100 },
  { colKey: 'warehouseName', title: '仓库', width: 85 },
  { colKey: 'stockCheckBillTypeName', title: '盘点类型', width: 65 },
  { colKey: 'stockCheckBillStatusName', title: '状态', width: 65 },
  { colKey: 'creator', title: '创建人', width: 65 },
  { colKey: 'timeCreate', title: '创建时间', width: 100 },
  { colKey: 'modifier', title: '最后更新人', width: 65 },
  { colKey: 'timeModified', title: '最后更新时间', width: 100 },
]);
// 表格主位栏 2 物料明细
const tableMaterialDetailsColumns = ref([
  // { colKey: 'row-select', width: 40, type: 'single', fixed: 'left' }, //todo
  { colKey: 'mitemCode', title: '物料编码', width: 100 },
  { colKey: 'mitemDesc', title: '物料描述', width: 100 },
  { colKey: 'uomName', title: '单位', width: 85 },
  { colKey: 'warehouseName', title: '仓库', width: 85 },
  { colKey: 'districtName', title: '货区', width: 100 },
  { colKey: 'locationName', title: '货位', width: 100 },
  { colKey: 'onhandQty', title: '账面数', width: 100 },
  { colKey: 'checkQty', title: '实盘数', width: 100 },
  { colKey: 'differenceQty', title: '差异数', width: 100 },
]);

//* 表格数据 1
const fetchTable = async () => {
  setLoading(false);
  inventoryManagement.value = [];
  tableDataReckoning.value = [];
  queryComponent.value.search();
  setLoading(false);
};

const handleRowSelectChange = async (billId) => {
  propsdtlId.value = billId; // 选中后将数据传给作废接口作为参数
  if (billId.length > 0) {
    setLoading(true);
    fetchTables(billId); // 改变选框时从新请求数据
    setLoading(false);
  }
};
/** 辅助函数
 *  newState 状态用来判断是否可以作废
 */
const newState = ref('');
const handleRowClick = async (row) => {
  const { stockCheckBillStatusName } = row.row;
  newState.value = stockCheckBillStatusName;
};

watch(propsdtlId, (newBillId) => {
  if (newBillId) {
    fetchTables(newBillId); // 使用新的 billId 调用 fetchTables
  }
});

//* 表格数据 2
const fetchTables = async (billId) => {
  setLoading(true);
  detailsPageUI.value.page = 1; // 子表默认为第一页数据
  const data = await api.stockCheckBill.getDtlList({
    pageNum: detailsPageUI.value.page,
    pageSize: detailsPageUI.value.rows,
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

// 定义一个响应式变量来保存查询条件
const lastQueryParams = ref({});
//* 查询
const onInput = async (data: any) => {
  firstPageUI.value.page = 1;
  setLoading(true);
  const { billNo, status, warehouseId, timeCreate = [] } = data;

  // 保存当前的查询条件
  lastQueryParams.value = { billNo, status, warehouseId, timeCreate };
  const [startDate, endDate] = timeCreate;

  firstPageUI.value.page = 1; // 条件过滤时必须赋值为1
  if (!data.value) {
    const data = await api.stockCheckBill.getPdList({
      pageNum: firstPageUI.value.page,
      pageSize: firstPageUI.value.rows,
      dateStart: startDate,
      dateEnd: endDate,
      warehouseId,
      billNo,
      status,
    });
    tableDataReckoning.value = [...data.list];
    dataTotal.value = data.total;
  }
  setLoading(false);
};

//* 重置
const onReset = () => {
  selectedRowKeys.value = []; // 重置清空选中的数据
  tableMaterialDetails.value = []; // 清空数据
  MessagePlugin.success('重置成功');
};

// 处理关闭弹窗的逻辑
const closeDialog = async () => {
  eidtRoutingVisible.value = false;
  await onInput(lastQueryParams.value);
};

const onAdd = () => {
  formTitle.value = '新增盘点管理';
  eidtRoutingVisible.value = true;
};

// 作废 TODO
const scrappedBill = async (billId) => {
  console.log('🚀 ~ scrappedBill ~ newState.value:', newState.value);
  if (newState.value === '已创建' || newState.value === '盘点中') {
    if (propsdtlId.value) {
      // 执行作废操作
      await api.stockCheckBill.scrappedBill({
        billId,
      });
      // await fetchTable();
      await onInput(lastQueryParams.value);
      MessagePlugin.success('作废成功!');
    } else {
      //  检查是否选择了一行 如果没有选择任何行，显示错误消息
      MessagePlugin.error('请选择一行进行作废操作!');
    }
  } else {
    MessagePlugin.error('状态为已创建,盘点中的单据才能进行作废操作!');
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
