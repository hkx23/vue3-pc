<!-- 单据管理  -->
<template>
  <cmp-container :full="true">
    <!-- query -->
    <t-card :ghost="true">
      <cmp-query ref="queryComponent" :opts="optsReceipt" :bool-enter="false" @submit="onInput"> </cmp-query>
    </t-card>
    <!-- cmp-table 表格组件  -->
    <cmp-card>
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableReckoningManagementColumns"
        :table-data="tableDataReceipt"
        :fixed-height="false"
        :total="dataTotal"
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

        <!-- 定义序号列的插槽 -->
        <template #indexSlot="{ rowIndex }">
          {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
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
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/warehouse';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import ReceiptDetails from './receiptDetails.vue';
// import { Icon } from 'tdesign-icons-vue';
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
// const formRef = ref(null);
const formTitle = ref('');
const dataTotal = ref(0);
const tabValue = ref('');
const RPDRoutingVisible = ref(false); //* 弹窗默认关闭
const selectedReceiptRowKeys = ref([]);
const tableDataReceipt = ref([]); //* 表格数据
// const formRef1 = ref(null);

const someData1 = ref({}); // 用来存储接口调用结果
const someData2 = ref([]); // 用来存储接口调用结果
const someData3 = ref([]); // 用来存储接口调用结果

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
        showTitle: false,
        isMultiple: true, // 多选
      },
    },
    mitemCode: {
      label: '物料编码',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        // mitem
        type: 'mitem',
        showTitle: false,
      },
    },
    supplierName: {
      label: '供应商',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'supplier',
        showTitle: false,
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
    timeCreate: {
      label: '创建时间',
      comp: 't-date-range-picker',
      defaultVal: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
      bind: {
        enableTimePicker: false,
        format: 'YYYY-MM-DD',
      },
    },
  };
});

const tableReckoningManagementColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 85, cell: 'indexSlot' },
  { title: '事物类型', colKey: 'categoryName', width: 85 },
  { title: '单据号', width: 85, colKey: 'billNo' },
  { title: '关联单号', width: 85, colKey: 'sourceBillNo' },
  { title: '物料编码', width: 85, colKey: 'mitemCode' },
  { title: '物料描述', width: 85, colKey: 'mitemDesc' },
  { title: '需求数量', width: 85, colKey: 'reqQty' },
  { title: '交易数量', width: 85, colKey: 'pickQty' },
  { title: '单位', width: 85, colKey: 'uomName' },
  { title: 'ERP行号', width: 85, colKey: 'erpLineNo' },
  { title: '上传状态', width: 85, colKey: 'uploadStatusName' },
  { title: '备注', width: 85, colKey: 'memo' },
  { title: '供应商', width: 85, colKey: 'supplierName' },
  { title: '源仓库', width: 85, colKey: 'warehouseName' },
  { title: '源货区', width: 85, colKey: 'districtName' },
  { title: '源货位', width: 85, colKey: 'locationName' },
  { title: '目标仓库', width: 85, colKey: 'toWarehouseName' },
  { title: '目标货区', width: 85, colKey: 'toDistrictName' },
  { title: '目标货位', width: 85, colKey: 'toLocationName' },
  { title: '单据状态', width: 85, colKey: 'billStatusName' },
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
  formTitle.value = '查看单据管理';
  RPDRoutingVisible.value = true;
  const { billNo } = value.row;
  const result1 = await api.billManagement.getHeader({ billNo });
  someData1.value = result1;

  const result2 = await api.billManagement.getDtl({ billNo });
  someData2.value = result2;
  const result3 = await api.billManagement.getLabel({ billNo });
  console.log('🚀 ~ onEditRowClick ~ result3:', result3);
  someData2.value = result3;
};

//* 初始渲染
onMounted(async () => {
  await fetchTable();
});

//* 表格数据
const fetchTable = async () => {
  setLoading(true);
  selectedReceiptRowKeys.value = [];
  tableDataReceipt.value = [];
  const data = await api.billManagement.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  tableDataReceipt.value = data.list;
  dataTotal.value = data.total;
  setLoading(false);
};

//* 表格刷新
const tabRefresh = async () => {
  await fetchTable();
};

//* 查询
const onInput = async (data: any) => {
  const { categoryName, mitemCode, supplierName, billNo, timeCreate } = data;
  // 提取categoryName数组中每个元素的label，合并成一个数组
  const businessCategoryIds = Array.isArray(categoryName) ? categoryName.map((item) => item.value) : [];
  if (!data.value) {
    const result = await api.billManagement.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      billNo,
      mitemId: mitemCode,
      businessCategoryIds,
      dateEnd: timeCreate[1],
      dateStart: timeCreate[0],
      supplierId: supplierName,
    });
    tableDataReceipt.value = result.list;
    dataTotal.value = result.total;
  }
};
</script>

<style lang="less" scoped></style>
