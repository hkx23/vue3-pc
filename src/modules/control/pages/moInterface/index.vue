<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query :opts="opts" @submit="onSearch" />
    </cmp-card>
    <cmp-card>
      <cmp-table
        v-model:pagination="paging"
        row-key="id"
        :table-column="tableColumns"
        :table-data="tableData"
        :total="dataTotal"
        :fixed-height="true"
        :resizable="true"
        @refresh="fetchData"
      >
        <template #button>
          <t-button>引入订单中心</t-button>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>
<script lang="ts">
export default {
  name: 'MoInterface',
};
</script>
<script setup lang="ts">
import dayjs from 'dayjs';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

const opts = computed(() => {
  return {
    orgId: {
      label: '工厂',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'plant',
        showTitle: false,
      },
    },
    moSource: {
      label: '来源',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: [
          { label: '全部', value: '' },
          { label: '营销-外销', value: 'OMS' },
          { label: '营销-内销', value: 'IMS' },
          { label: '售后', value: 'CRM' },
        ],
        lazyLoad: true,
      },
    },
    mo: {
      label: '订单号',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mo',
        showTitle: false,
      },
    },
    moLine: {
      label: '订单行号',
      comp: 't-input',
      defaultVal: '',
    },
    mitemList: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        isMultiple: true,
        showTitle: false,
      },
    },
    moType: {
      label: '订单类型',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: [
          { label: '全部', value: '' },
          { label: '外销', value: 'FS' },
          { label: '内销', value: 'IS' },
          { label: '共享', value: 'SS' },
        ],
        lazyLoad: true,
      },
    },
    moStatus: {
      label: '订单状态',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: [
          { label: '全部', value: '' },
          { label: '正常', value: 'OPEN' },
          { label: '关闭', value: 'CLOSE' },
          { label: '取消', value: 'CANCEL' },
        ],
        lazyLoad: true,
      },
    },
    requirementDate: {
      label: '需求日期',
      comp: 't-date-range-picker',
      event: 'daterange',
      defaultVal: [dayjs(), dayjs()],
      bind: {
        format: 'YYYY-MM-DD',
      },
    },
  };
});

const paging = ref({ page: 1, rows: 20 });
const dataTotal = ref(0);
const tableData = ref([]);
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 64, fixed: 'left' },
  { title: '工厂', colKey: 'orgName' },
  { title: '来源', colKey: 'moSource' },
  { title: '订单号', colKey: 'mo' },
  { title: '订单行号', colKey: 'moLine' },
  { title: '物料编码', colKey: 'mitemCode' },
  { title: '物料名称', colKey: 'mitemName' },
  { title: '订单单位', colKey: 'uom' },
  { title: '订单类型', colKey: 'moType' },
  { title: '订单状态', colKey: 'moStatus' },
  { title: '订单数量', colKey: 'moQty' },
  { title: '需求日期', colKey: 'requirementDate' },
  { title: '需求说明', colKey: 'requirementDesc' },
  { title: '销售业务员', colKey: 'salesName' },
  { title: '客户代码', colKey: 'customerCode' },
  { title: '客户名称', colKey: 'customerName' },
  { title: '内外销', colKey: 'isIntra' },
  { title: '品牌', colKey: 'brand' },
  { title: '取消说明', colKey: 'cancelDesc' },
  { title: '同步时间', colKey: 'updateTime' },
];

onMounted(() => {
  fetchData();
});

const onSearch = () => {
  paging.value.page = 1;
  fetchData();
};

const fetchData = async () => {
  const data = {
    total: 2,
    list: [
      {
        id: 1,
        orgName: '广州工厂',
        moSource: '售后',
        mo: '65438876',
        moLine: '脚踏板',
        mitemCode: '51003452',
        mitemName: 'SA',
        uom: '20',
        moType: '外销',
        moStatus: '正常',
        moQty: 1,
        requirementDate: '2024-06-15',
        requirementDesc: 'Z133001',
        salesName: '',
        customerCode: '',
        customerName: '',
        isIntra: '',
        brand: '',
        cancelDesc: '',
        updateTime: '',
      },
      {
        id: 2,
        orgName: '深圳工厂',
        moSource: '售后',
        mo: '89000092',
        moLine: '手刹配件',
        mitemCode: '53002381',
        mitemName: 'P',
        uom: '1000',
        moType: '外销',
        moStatus: '正常',
        moQty: 200,
        requirementDate: '2024-06-17',
        requirementDesc: 'Z122351',
        salesName: '',
        customerCode: '',
        customerName: '',
        isIntra: '',
        brand: '',
        cancelDesc: '',
        updateTime: '',
      },
    ],
  };
  tableData.value = data.list;
  dataTotal.value = data.total;
};
</script>
<style scoped></style>
