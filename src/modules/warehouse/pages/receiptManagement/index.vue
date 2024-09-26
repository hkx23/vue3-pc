<!-- 单据管理  -->
<template>
  <cmp-container :full="true">
    <!-- query -->
    <t-card :span="12">
      <cmp-query ref="queryComponent" :opts="optsReceipt" :bool-enter="false" @submit="onInput"> </cmp-query>
    </t-card>
    <!-- cmp-table 表格组件  -->
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableReckoningManagementColumns"
        :table-data="tableDataReceipt"
        :total="dataTotal"
        :hover="true"
        :fixed-height="true"
        :loading="loading"
        empty="没有符合条件的数据"
        @refresh="tabRefresh"
      >
        <template #billNo="slotProps">
          <t-space :size="8">
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick(slotProps)">{{
              slotProps.row.billNo
            }}</t-link>
          </t-space>
        </template>

        <template #title>
          {{ '单据管理' }}
        </template>
        <template #button>
          <t-space :size="8">
            <t-popconfirm theme="default" content="确认重传吗" @confirm="onFailUploadConfirm()">
              <t-button theme="primary">失败重传</t-button>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- 单据详情组件 -->
  <receipt-details
    v-model:visible="RPDRoutingVisible"
    :form-title="formTitle"
    :some-data1="someData1"
    :some-data2="someData2"
    :some-data3="someData3"
  />
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { api } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import ReceiptDetails from './receiptDetails.vue';

const router = useRouter();
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const formTitle = ref('');
const dataTotal = ref(0);
const tabValue = ref('');
const RPDRoutingVisible = ref(false); //* 弹窗默认关闭
const selectedReceiptRowKeys = ref([]);
const tableDataReceipt = ref([]); //* 表格数据
const someData1 = ref({}); // 用来存储接口调用结果
const someData2 = ref([]);
const someData3 = ref([]);
const queryComponent = ref();

//* 组件配置  --查询界面选择
const optsReceipt = computed(() => {
  return {
    categoryName: {
      label: '事物类型',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'businessCategory',
        isMultiple: true, // 多选
      },
    },
    mitemCode: {
      label: '物料编码',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        labelField: 'mitemCode',
      },
    },
    billNo: {
      label: '单据号',
      labelWidth: '300',
      isHide: tabValue.value,
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    sourceBillNo: {
      label: '关联单据号',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    supplierName: {
      label: '供应商',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'supplier',
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
    locationId: {
      comp: 'bcmp-select-business',
      placeholder: '请选择源货位',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'location',
        label: '源货位',
        title: '源货位',
      },
    },
    toLocationId: {
      placeholder: '请选择目标货位',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'location',
        label: '目标货位',
        title: '目标货位',
      },
    },
    billStatus: {
      label: '单据状态',
      comp: 't-select',
      bind: {
        options: billStatusOption.value,
      },
    },
    uploadStatus: {
      label: '上传状态',
      comp: 't-select',
      bind: {
        options: uploadStatusOption.value,
      },
    },
  };
});
const billStatusOption = ref([
  { label: '已交接', value: 'RECEIPTED' },
  { label: '已过账', value: 'TRANSFERRED' },
]);
const uploadStatusOption = ref([
  { label: '等待上传', value: 'W' },
  { label: '上传成功', value: 'S' },
  { label: '上传失败', value: 'E' },
]);

const tableReckoningManagementColumns: PrimaryTableCol<TableRowData>[] = [
  // { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
    fixed: 'left',
  },
  { title: '事物类型', colKey: 'categoryName', width: 85 },
  { title: '单据号', width: 150, colKey: 'billNo' },
  { title: '关联单号', width: 120, colKey: 'sourceBillNo' },
  { title: '物料编码', width: 120, colKey: 'mitemCode' },
  { title: '物料描述', width: 85, colKey: 'mitemDesc' },
  // { title: '需求数量', width: 85, colKey: 'reqQty' },
  { title: '交易数量', width: 85, colKey: 'pickQty' },
  { title: '单位', width: 85, colKey: 'uomName' },
  { title: 'ERP行号', width: 85, colKey: 'erpLineNo' },
  { title: '备注', width: 85, colKey: 'memo' },
  { title: '供应商', width: 85, colKey: 'supplierName' },
  { title: '源仓库', width: 85, colKey: 'warehouseName' },
  { title: '源货区', width: 85, colKey: 'districtName' },
  { title: '源货位', width: 85, colKey: 'locationName' },
  { title: '目标仓库', width: 85, colKey: 'toWarehouseName' },
  { title: '目标货区', width: 85, colKey: 'toDistrictName' },
  { title: '目标货位', width: 85, colKey: 'toLocationName' },
  { title: '单据状态', width: 85, colKey: 'billStatusName' },
  { title: '上传状态', width: 85, colKey: 'uploadStatusName' },
  { title: '上传返回信息', width: 200, colKey: 'uploadMessage' },
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

const onEditRowClick = async (value: any) => {
  formTitle.value = '查看单据';
  RPDRoutingVisible.value = true;
  const { billNo } = value.row;

  try {
    // 同时发送三个异步请求
    const [headerResult, dtlResult, labelResult] = await Promise.all([
      api.billManagement.getHeader({ billNo }),
      api.billManagement.getDtl({ billNo }),
      api.billManagement.getLabel({ billNo }),
    ]);

    // 更新响应式数据
    someData1.value = headerResult;
    someData2.value = dtlResult;
    someData3.value = labelResult;
  } catch (error) {
    console.error('获取单据数据失败:', error);
  }
};

//* 初始渲染
onMounted(async () => {
  const transactionBillNo = router.currentRoute.value.query;
  queryComponent.value.setFromValue('billNo', transactionBillNo.billNo);
  optsValue.value.billNo = transactionBillNo.billNo;
  optsValue.value.sourceBillNo = transactionBillNo.sourceBillNo;
  await fetchTable();
});

//* 表格数据
const fetchTable = async () => {
  try {
    setLoading(true);
    selectedReceiptRowKeys.value = [];
    tableDataReceipt.value = [];
    const { categoryName, mitemCode, supplierName, billNo, timeCreate } = optsValue.value;
    // 提取categoryName数组中每个元素的label，合并成一个数组
    const businessCategoryIds =
      categoryName === '' || categoryName === null ? [] : categoryName.split(',').map((item) => item.trim());

    const result = await api.billManagement.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      billNo,
      mitemId: mitemCode,
      businessCategoryIds,
      dateEnd: timeCreate[1],
      dateStart: timeCreate[0],
      supplierId: supplierName,
      ...optsValue.value,
    });
    tableDataReceipt.value = result.list;
    dataTotal.value = result.total;
  } finally {
    setLoading(false);
  }
};

//* 表格刷新
const tabRefresh = async () => {
  await fetchTable();
};
// 查询组件值
const optsValue = ref({}) as any;
//* 查询
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  pageUI.value.page = 1;
  optsValue.value = data;
  fetchTable();
};
const tableRef = ref(); // 表格实例
const onFailUploadConfirm = async () => {
  const selectedRowKeys = tableRef.value?.getSelectedRowKeys();
  const selectedRowList = tableDataReceipt.value.filter((item) => selectedRowKeys.includes(item.id));
  const failedBillNoList = selectedRowList.map((item) => item.billNo);
  await api.billManagement.failUpload({ failedBillNoList });
  fetchTable();
  tableRef.value?.setSelectedRowKeys([]);
  MessagePlugin.success('重传设置成功,请等待后台处理结果');
};
</script>

<style lang="less" scoped></style>
