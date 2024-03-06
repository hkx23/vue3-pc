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
            row-key="_timestamp"
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
              <t-button theme="primary" disabled>重传</t-button>
              <t-button theme="default">导出</t-button>
            </template>

            <template #op="{ row }">
              <t-space>
                <!-- @click="onCheckRowClick(row)" -->
                <t-link variant="text" theme="primary" name="check" @click="onCheckRowClick(row)">查看</t-link>
                <!-- @click="onRetransmissionRowClick(row)" -->
                <t-link variant="text" theme="primary" name="retransmission" disabled>重传</t-link>
              </t-space>
            </template>
          </cmp-table>
        </cmp-card>
      </cmp-card>
    </cmp-container>
  </cmp-container>

  <!-- 弹窗组件 -->
  <transactionDetails
    v-model:visible="eidtTransactionVisible"
    :row-data="rowData"
    :form-title="formTitle"
    @update-data="closeDialog"
  />
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api as apiMain } from '@/api/main';
// import { api } from '@/api/warehouse'; //todo
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
    msgCategory: {
      label: '接口分类',
      labelWidth: '20',
      event: 'select',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: InterfaceOption.value,
        clearable: true,
      },
    },
    msgDomainCategory: {
      label: 'MES领域分类',
      comp: 't-select',
      defaultVal: [],
      bind: {
        options: ClassificationOption.value,
        clearable: true,
      },
    },
    businessCategoryId: {
      label: '事务类型',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'warehouse',
        showTitle: false,
      },
    },
    erpBillNo: {
      label: 'ERP凭据单号',
      comp: 't-input',
      defaultVal: '',
      bind: {
        clearable: true,
      },
    },
    billNo: {
      label: 'MES/业务单据号',
      comp: 't-input',
      defaultVal: '',
      bind: {
        clearable: true,
      },
    },

    IMsgQueueStatus: {
      label: '执行结果',
      comp: 't-select',
      defaultVal: [],
      bind: {
        options: statusOption.value,
        clearable: true,
      },
    },
    datetimeExecute: {
      // todo 拆分2个 datetimeExecuteStart  datetimeExecuteEnd
      label: '事务开始时间',
      comp: 't-date-range-picker',
      defaultVal: [defaultStartDateTime, defaultEndDateTime], // 设置默认的起始和结束日期
      bind: {
        enableTimePicker: true,
        format: 'YYYY-MM-DD HH:mm:ss',
      },
    },
  };
});

// 定义执行结果的选项
const statusOption = ref([
  { label: '待处理', value: 'WAITING' },
  { label: '处理中', value: 'PROCESSING' },
  { label: '处理成功', value: 'SUCCESS' },
  { label: '处理失败', value: 'FAIL' },
  { label: '取消', value: 'ABORT' },
]);
// 表格主位栏 1
const tableReckoningManagementColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '接口分类', colKey: 'msgCategoryName', width: 110 },
  { title: 'MES领域分类', width: 130, colKey: 'msgDomainCategoryName' },
  { title: 'MES业务单号', width: 120, colKey: 'billNo' },
  { title: '事务类型', width: 85, colKey: 'businessCategoryName' },
  { title: 'ERP凭据单号', width: 110, colKey: 'erpBillNo' },
  {
    title: '交易开始时间',
    width: 150,
    colKey: 'datetimeExecuteStart',
  },
  { title: '交易结束时间', width: 150, colKey: 'datetimeExecuteEnd' },
  {
    title: '执行次数',
    width: 85,
    colKey: 'executionTimes',
  },
  {
    title: '执行结果',
    width: 120,
    colKey: 'statusName',
  },
  { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
];

/** 辅助函数
 * 获取当前日期和时间
 * 获取第二天的日期和时间
 */
const getCurrentDateTime = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // 设置时间为当天的0点0分0秒
  return now;
};
const getNextDayDateTime = () => {
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1); // 将日期加1天
  nextDay.setHours(0, 0, 0, 0); // 设置时间为0点0分0秒
  return nextDay;
};

// 默认起始日期和结束日期
const defaultStartDateTime = getCurrentDateTime();
const defaultEndDateTime = getNextDayDateTime();

//* 表格数据
const fetchTable = async () => {
  setLoading(false);
  inventoryManagement.value = [];
  tableDataReckoning.value = [];
  const data = await apiMain.integratedConsole.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  tableDataReckoning.value = data.list.map((item) => ({
    ...item,
    _timestamp: Date.now() + Math.random(), // 使用Date.now()加上随机数来生成唯一时间戳
  }));
  dataTotal.value = data.total;
  setLoading(false);
};

const InterfaceOption = ref([]);
// 获取 数据字典 接口分类
const getInterfaceClassification = async () => {
  try {
    const res = await apiMain.param.getListByGroupCode({
      parmGroupCode: 'MSG_CATEGORY',
    });
    InterfaceOption.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};

const ClassificationOption = ref([]);
// 获取 数据字典 mes领域分类
const getDomainClassification = async () => {
  try {
    const res = await apiMain.param.getListByGroupCode({
      parmGroupCode: 'MSG_DOMAIN_CATEGORY',
    });
    ClassificationOption.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};

const handleRowSelectChange = (value: any[]) => {
  //   //点击当前行取这行的  billId 不是  billon
  if (value.length > 0) {
    // 只取数组中的最后一个元素（即最后一个选中的ID）
    propsdtlId.value = value[value.length - 1];
  }
};

const closeDialog = () => {
  eidtTransactionVisible.value = false;
};
// watch(propsdtlId, (newBillId) => {
//   if (newBillId) {
//     fetchTables(newBillId); // 使用新的 billId 调用 fetchTables
//   }
// });

//* 初始渲染
onMounted(async () => {
  await getInterfaceClassification(); // 接口分类
  await getDomainClassification(); // mes领域分类
  await documentStatusData(); // 单据状态
  await fetchTable();
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
  const {
    msgCategory, // 接口分类
    msgDomainCategory, // mes领域分类
    businessCategoryId, // 事务类型
    imsgQueueStatus, // 执行结果
    erpBillNo, // ERP凭据单号
    datetimeExecute, // 事务开始时间
    billNo, // MES/业务单据号
  } = data;
  if (!data.value) {
    const data = await apiMain.integratedConsole.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      msgCategory,
      msgDomainCategory,
      businessCategoryId,
      imsgQueueStatus,
      erpBillNo,
      billNo,
      dateStart: datetimeExecute[0],
      dateEnd: datetimeExecute[1],
    });
    tableDataReckoning.value = data.list.map((item) => ({
      ...item,
      _timestamp: Date.now() + Math.random(), // 使用Date.now()加上随机数来生成唯一时间戳
    }));
    dataTotal.value = data.total;
  }
  setLoading(false);
};

const rowData = ref({});
// 查看 todo
const onCheckRowClick = (row) => {
  rowData.value = JSON.parse(JSON.stringify(row));
  formTitle.value = '事务交易明细';
  eidtTransactionVisible.value = true;
};

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
