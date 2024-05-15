<template>
  <cmp-container :full="true" :full-sub-index="[0, 1]">
    <cmp-card>
      <cmp-container :full="true">
        <cmp-query :opts="opts" @submit="onInput" />
        <cmp-table
          ref="tableRef"
          v-model:pagination="pageUI"
          row-key="id"
          :table-column="mainColumns"
          :table-data="checklistData.list"
          :fixed-height="true"
          :total="checklistTotal"
          :selected-row-keys="selectedRowKeys"
          @refresh="fetchTable"
          @row-click="onSelectChange"
        >
          <template #title>
            {{ '点检单据列表' }}
          </template>
        </cmp-table>
      </cmp-container>
    </cmp-card>
    <cmp-card>
      <!-- ################# 子表格数据 ###################### -->
      <cmp-table
        v-model:pagination="itemPage"
        :hover="false"
        :stripe="false"
        row-key="id"
        :table-column="itemColumns"
        :table-data="itemInCheckList.list"
        :fixed-height="true"
        :total="itemTotal"
        active-row-type="single"
        @select-change="onItemSelectChange"
        @refresh="onFetchItemData"
      >
        <template #title>
          {{ '项目列表' }}
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <formItem ref="formItemRef" @parent-refresh-event="getCheckBillDtlList" />
</template>
<script setup lang="ts">
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api as apiDaily } from '@/api/daily';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import formItem from './formItem.vue';

const { pageUI } = usePage(); // 分页工具
const { pageUI: itemPage } = usePage();
const selectedRowKeys = ref([]); // 要删除的id

const formData = ref({
  billNo: '',
  orgCode: '',
  orgName: '',
  personCode: '',
  personName: '',
  checklistCode: '',
  checklistName: '',
  checklistCategory: '',
  shiftCode: '',
  executeFrequenceCode: '',
  status: '',
  dateTimeCreate: [],
});
// 表格数据总条数
const checklistTotal = ref(0);
// 表格数据
const checklistData = reactive({ list: [] });

// 表格列表数据
const mainColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'billNo',
    title: '点检单据',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'timeCreate',
    title: '创建时间',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'orgCode',
    title: '组织编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'orgName',
    title: '组织名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'wcCode',
    title: '产线编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'wcName',
    title: '产线名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'checklistCode',
    title: '点检清单编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'checklistName',
    title: '点检清单名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'checklistDesc',
    title: '点检清单描述',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'checklistCategoryName',
    title: '清单类型',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'shiftCodeName',
    title: '出勤模式',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'executeFrequenceName',
    title: '频率',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'personName',
    title: '执行人',
    align: 'center',
    width: '100',
  },
  {
    colKey: 'statusName',
    title: '状态',
    align: 'center',
    width: '100',
  },
];

onMounted(async () => {
  await fetchTable(); // 获取 表格 数据
});

// #query 查询参数
const opts = computed(() => {
  return {
    billNo: {
      label: '单据编号',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    orgCode: {
      label: '所属组织',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'org',
        showTitle: false,
        valueField: 'orgCode',
      },
    },
    dateTimeCreate: {
      label: '创建时间',
      comp: 't-date-range-picker',
      defaultVal: '',
      placeholder: '请选择',
    },
    personCode: {
      label: '执行人',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'person',
        showTitle: false,
        valueField: 'personCode',
      },
    },
    status: {
      label: '单据状态',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'param',
        showTitle: false,
        category: 'DAILY_CHECK_STATUS',
        valueField: 'paramCode',
      },
    },
    checklistCode: {
      label: '清单名称',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    checklistCategory: {
      label: '清单类型',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'param',
        showTitle: false,
        category: 'D_CHECKLIST_CATEGORY',
        valueField: 'paramCode',
      },
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;

  formData.value.billNo = data.billNo;
  formData.value.orgCode = data.orgCode;
  formData.value.personCode = data.personCode;
  formData.value.checklistCode = data.checklistCode;
  formData.value.status = data.status;
  formData.value.checklistCategory = data.checklistCategory;
  formData.value.dateTimeCreate = data.dateTimeCreate;

  fetchTable();
};

const fetchTable = async () => {
  const status = [];
  if (!_.isEmpty(formData.value.status)) {
    status.push(formData.value.status);
  }

  let begin = '';
  let end = '';
  if (!_.isEmpty(formData.value.dateTimeCreate)) {
    begin = `${formData.value.dateTimeCreate[0]} 00:00:00`;
    end = `${formData.value.dateTimeCreate[1]} 23:59:59`;
  }

  const res = await apiDaily.checkBillHead.getFullCheckBillList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    billNo: formData.value.billNo,
    orgCode: formData.value.orgCode,
    personCode: formData.value.personCode,
    checklistCode: formData.value.checklistCode,
    checklistCategory: formData.value.checklistCategory,
    statusList: status,
    dateTimeCreateBegin: begin,
    dateTimeCreateEnd: end,
  });

  checklistData.list = res.list;
  checklistTotal.value = res.total;
  selectedRowKeys.value = [];
  // delItemRowKeys.value = [];
  MessagePlugin.success('查询成功');
};

const rowClick = ref(null); // 点击行ID
const onSelectChange = async ({ row }) => {
  rowClick.value = row;
  await getCheckBillDtlList();
};

// # 项目
const formItemRef = ref(null);
const itemInCheckList = ref({ list: [] });
const itemTotal = ref(0);
const onFetchItemData = async () => {
  await getCheckBillDtlList();
};
const getCheckBillDtlList = async () => {
  const res = await apiDaily.checkBillDtl.getCheckBillDtlList({
    pageNum: 1,
    pageSize: 99999,
    billNo: rowClick.value.billNo,
  });
  itemInCheckList.value.list = res.dtlList;
  itemTotal.value = res.dtlList.length;
};
const itemColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'executeBeginTime',
    title: '执行开始时间',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'executeEndTime',
    title: '执行结束时间',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'itemCode',
    title: '项目编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'itemName',
    title: '项目名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'itemTypeName',
    title: '项目类型',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'datetimeDiscover',
    title: '实际点检时间',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'checkResult',
    title: '点检结果',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'problemDesc',
    title: '问题描述',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'correctMeasure',
    title: '改善对策',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'personResponsibilityName',
    title: '责任人',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'adBillNo',
    title: '安灯单据',
    align: 'center',
    width: '130',
  },
  {
    colKey: 'fileList',
    title: '附件',
    align: 'center',
    width: '130',
  },
];
const onItemSelectChange = async (value: any[]) => {
  // delItemRowKeys.value = value;
  console.log(value);
};
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.module-edit {
  margin: 0 10px;
}

.control-box {
  text-align: right;
  margin-top: 20px;
}

.row-class {
  margin-bottom: 10px;
}

.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
