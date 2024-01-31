<!-- 集成控制台  -->
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
              {{ '集成控制台列表' }}
            </template>
            <template #button>
              <!--  @click="retransmissionAll" -->
              <t-button theme="primary">重传</t-button>
              <t-button theme="default">导出</t-button>
            </template>

            <template #op>
              <t-space>
                <!-- @click="onCheckRowClick(row)" -->
                <t-link variant="text" theme="primary" name="check">查看</t-link>
                <!-- @click="onRetransmissionRowClick(row)" -->
                <t-link variant="text" theme="primary" name="retransmission">重传</t-link>
              </t-space>
            </template>

            <!-- 定义序号列的插槽 -->
            <template #indexSlot="{ rowIndex }">
              {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
            </template>
          </cmp-table>
        </cmp-card>
      </cmp-card>
    </cmp-container>
  </cmp-container>

  <!-- 弹窗组件 -->>
  <transactionDetails v-model:visible="eidtTransactionVisible" :form-title="formTitle" />
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import transactionDetails from './transaction-details.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const inventoryManagement = ref([]);
const tableDataReckoning = ref([]); //* 表格数据1
const eidtTransactionVisible = ref(false); //* 弹窗默认关闭
const formTitle = ref('');
const dataTotal = ref(0);
const documentStatusOptions = ref([]);
// const selectedBillId = ref([]); // 选中的序号
// 传递给详情组件的数据 给接口入参
const propsdtlId = ref('');

//* 组件配置--查询界面
const opts = computed(() => {
  return {
    billNo: {
      label: '接口分类',
      comp: 't-input',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    timeCreate: {
      label: '接口领域分类',
      comp: 't-date-range-picker',
      defaultVal: [],
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD',
      },
    },
    warehouseId: {
      label: '事务类型',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'warehouse',
        showTitle: false,
      },
    },
    status: {
      label: 'MES/业务单据号',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: documentStatusOptions.value,
        clearable: true,
      },
    },
    status2: {
      label: '第三方单据号',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: documentStatusOptions.value,
        clearable: true,
      },
    },
    status3: {
      label: '执行结果',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: documentStatusOptions.value,
        clearable: true,
      },
    },
    status4: {
      label: '事务开始时间',
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
  { title: '接口分类', colKey: 'billNo', width: 120 },
  { title: 'MES领域分类', width: 85, colKey: 'warehouseName' },
  { title: 'MES业务单号', width: 85, colKey: 'stockCheckBillTypeName' },
  { title: '事务类型', width: 85, colKey: 'stockCheckBillStatusName' },
  { title: 'ERP凭据单号', width: 85, colKey: 'creator' },
  {
    title: '交易开始时间',
    width: 85,
    colKey: 'timeCreate',
  },
  { title: '交易结束时间', width: 100, colKey: 'modifier' },
  {
    title: '执行次数',
    width: 85,
    colKey: 'timeModified',
  },
  {
    title: '执行结果',
    width: 85,
    colKey: 'timeModified',
  },
  { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
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

// watch(propsdtlId, (newBillId) => {
//   if (newBillId) {
//     fetchTables(newBillId); // 使用新的 billId 调用 fetchTables
//   }
// });

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

// 查看 todo
// const onCheckRowClick = () => {
//   formTitle.value = '事务交易明细';
//   eidtTransactionVisible.value = true;
// };

// 作废
// const scrappedBill = async (billId) => {
//   // 检查是否选择了一行
//   if (propsdtlId.value) {
//     // 执行作废操作
//     await api.stockCheckBill.scrappedBill({
//       billId,
//     });
//     await fetchTable();
//     MessagePlugin.success('作废成功!');
//   } else {
//     // 如果没有选择任何行，显示错误消息
//     MessagePlugin.error('请选择一行进行作废操作');
//   }
// };
</script>

<style lang="less" scoped></style>
