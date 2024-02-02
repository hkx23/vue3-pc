<!-- 事务明细查询  -->
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
            <template #billNo="slotProps">
              <t-space :size="8">
                <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick()">{{
                  slotProps.row.billNo
                }}</t-link>
              </t-space>
            </template>
            <template #title>
              {{ '事务明细列表' }}
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

  <!-- 弹窗组件 -->
  <!-- <transactionDetails
    v-model:visible="eidtTransactionVisible"
    :row-data="rowData"
    :form-title="formTitle"
    @update-data="closeDialog"
  /> -->
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api as apiMain } from '@/api/main';
// import { api } from '@/api/warehouse'; //todo
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import { openPage } from '@/router';

// import transactionDetails from './transaction-details.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const inventoryManagement = ref([]);
const tableDataReckoning = ref([]); //* 表格数据1
// const eidtTransactionVisible = ref(false); //* 弹窗默认关闭
const dataTotal = ref(0);
const documentStatusOptions = ref([]);
const propsdtlId = ref('');

//* 组件配置--查询界面
const opts = computed(() => {
  return {
    businessCategoryId: {
      label: '事务类型',
      labelWidth: '20',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'businessCategory',
        showTitle: false,
      },
      eventHandle: {
        blur: dateChange,
      },
    },
    timeCreate: {
      label: '创建时间',
      comp: 't-date-range-picker',
      // 设置默认值为前一周的日期和当天的日期
      defaultVal: [dayjs().subtract(7, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD',
      },
    },
    // billNo: {
    //   label: 'MES业务单号',
    //   comp: 't-input',
    //   defaultVal: '',
    //   bind: {
    //     enableTimePicker: false,
    //   },
    // },
    erpBillNo: {
      label: 'ERP单据号',
      comp: 't-input',
      defaultVal: '',
      bind: {
        enableTimePicker: false,
      },
    },
    moScheId: {
      label: '排产单号',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'moSchedule',
        showTitle: false,
      },
    },
    mitemId: {
      label: '物料编码',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    // creatorName: {
    //   label: '操作人',
    //   comp: 't-input',
    //   event: 'input',
    //   defaultVal: '',
    //   bind: {
    //     showTitle: false,
    //   },
    // },
    // erpbillNoxx: {
    //   label: '交接人', // todo
    //   comp: 't-input',
    //   defaultVal: '',
    //   bind: {
    //     clearable: true,
    //   },
    // },

    // deliveryNo: {
    //   label: '送货单',
    //   comp: 't-input',
    //   defaultVal: '',
    //   bind: {
    //     clearable: true,
    //   },
    // },

    // purchaseNo: {
    //   label: '采购单',
    //   comp: 't-input',
    //   defaultVal: '',
    //   bind: {
    //     clearable: true,
    //   },
    // },

    // scanBarcode: {
    //   label: '标签',
    //   comp: 't-input',
    //   defaultVal: '',
    //   bind: {
    //     clearable: true,
    //   },
    // },

    // warehouseName: {
    //   label: '源仓库',
    //   comp: 'bcmp-select-business',
    //   event: 'business',
    //   defaultVal: [],
    //   bind: {
    //     type: 'warehouse',
    //     showTitle: false,
    //   },
    // },

    // toWarehouseName: {
    //   label: '目标仓库',
    //   comp: 'bcmp-select-business',
    //   event: 'business',
    //   defaultVal: [],
    //   bind: {
    //     type: 'warehouse',
    //     showTitle: false,
    //   },
    // },
  };
});

// 定义执行结果的选项
// const statusOption = ref([
//   { label: '待处理', value: 'WAITING' },
//   { label: '处理中', value: 'PROCESSING' },
//   { label: '处理成功', value: 'SUCCESS' },
//   { label: '处理失败', value: 'FAIL' },
//   { label: '取消', value: 'ABORT' },
// ]);
// 表格主位栏 1
const tableReckoningManagementColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 60, cell: 'indexSlot' },
  { title: '事务类型', colKey: 'categoryName', width: 110 },
  { title: 'MES业务单号', width: 130, colKey: 'billNo' },
  { title: '排产单号', width: 120, colKey: 'moScheId' },
  { title: '排产计划数', width: 85, colKey: 'planQty' },
  { title: '标签', width: 110, colKey: 'scanBarcode' },
  {
    title: '标签数量',
    width: 150,
    colKey: 'barcodeQty',
  },
  { title: '物料编码', width: 150, colKey: 'mitemCode' },
  {
    title: '物料描述',
    width: 85,
    colKey: 'mitemDesc',
  },
  {
    title: '单位',
    width: 120,
    colKey: 'uomName',
  },

  { title: '源仓库', width: 120, colKey: 'warehouseName' },
  { title: '源货区', width: 85, colKey: 'districtName' },
  { title: '源货位', width: 110, colKey: 'locationName' },
  {
    title: '目标仓库',
    width: 150,
    colKey: 'toWarehouseName',
  },
  { title: '目标货区', width: 150, colKey: 'toDistrictName' },
  {
    title: '目标货位',
    width: 85,
    colKey: 'toLocationName',
  },
  {
    title: '供应商编码',
    width: 120,
    colKey: 'supplierCode',
  },
  { title: '供应商名称', width: 120, colKey: 'supplierName' },
  { title: '操作人', width: 85, colKey: 'creatorName' },
  { title: '创建时间', width: 110, colKey: 'timeCreate' },
  {
    title: '交易时间',
    width: 150,
    colKey: 'datetimeTrans',
  },
  { title: '交易数量', width: 150, colKey: 'transQty' },
  {
    title: '上传状态',
    width: 85,
    colKey: 'statusName',
  },
  {
    title: '送货单号',
    width: 120,
    colKey: 'deliveryNo',
  },
  { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
];

/** 辅助函数
 * 获取当前日期和时间
 * 获取第二天的日期和时间
 */
// const getCurrentDateTime = () => {
//   const now = new Date();
//   now.setHours(0, 0, 0, 0); // 设置时间为当天的0点0分0秒
//   return now;
// };
// const getNextDayDateTime = () => {
//   const nextDay = new Date();
//   nextDay.setDate(nextDay.getDate() + 1); // 将日期加1天
//   nextDay.setHours(0, 0, 0, 0); // 设置时间为0点0分0秒
//   return nextDay;
// };

// 默认起始日期和结束日期
// const defaultStartDateTime = getCurrentDateTime();
// const defaultEndDateTime = getNextDayDateTime();

//* 表格数据
const fetchTable = async () => {
  setLoading(false);
  inventoryManagement.value = [];
  tableDataReckoning.value = [];
  const data = await apiMain.transactionDetail.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  console.log('🚀 ~ fetchTable ~ data:todo', data);
  tableDataReckoning.value = [...data.list];
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

const dateChange = (data: any) => {
  // 获取当前选择的日期范围
  const selectedDateRange = data.value;
  // 将日期字符串转换为dayjs对象
  const startDate = dayjs(selectedDateRange[0]);
  const endDate = dayjs(selectedDateRange[1]);

  // 计算日期范围的天数差异
  const daysDifference = endDate.diff(startDate, 'day');
  // 如果选择的天数超过31天，则调整日期范围
  if (daysDifference > 31) {
    // 将结束日期调整为开始日期的后31天
    MessagePlugin.warning('日期跨度不得超过31天');
  }
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
  console.log('🚀 ~ onInput ~ data:todo2222222222', data);
  setLoading(true);
  const {
    businessCategoryId, // 事务类型
    timeCreate, // 时间
    // billNo, //MES业务单号 /
    // erpBillNo, //ERP单据号 /
    moScheId, // 排产单号
    // mitemCode,//物料编码 /
    // creatorName //操作人 /
    // erpbillNoxx  //交接人  todo
    // deliveryNo, //送货单
    // purchaseNo, // 采购单
    // scanBarcode, //标签  /
    // warehouseName, // 源仓库 /
    // toWarehouseName,   // 目标仓库 /
    mitemId,
  } = data;
  if (!data.value) {
    const data = await apiMain.transactionDetail.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      businessCategoryId,
      mitemId,
      // billNo,
      moScheId,
      dateStart: timeCreate[0],
      dateEnd: timeCreate[1],
      // erpBillNo,
      // creatorName,
      // erpbillNoxx
      // deliveryNo,
      // purchaseNo,
      // scanBarcode,
      // warehouseName,
      // toWarehouseName,
    });
    tableDataReckoning.value = [...data.list];
    dataTotal.value = data.total;
  }
  setLoading(false);
};

// 跳转到单据管理
const onEditRowClick = () => {
  const toDoUrl = '/warehouse#/receiptManagement';
  openPage(toDoUrl);
};
</script>

<style lang="less" scoped></style>
