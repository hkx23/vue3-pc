<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" @reset="conditionReset">
        <template #querySelect="{ param }">
          <t-select
            v-model="param.sampingStdCode"
            label="标准编码"
            clearable
            filterable
            input-props
            @clear="fetchSampingStdCodes"
            @input-change="querySelectChange($event)"
          >
            <t-option
              v-for="item in sampingStdCodesOption"
              :key="item.id"
              :label="item.sampingStdCode"
              :value="item.sampingStdCode"
              :lazy-load="true"
            />
          </t-select>
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        active-row-type="single"
        :table-column="samplingStdColumns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        :fixed-height="true"
        :resizable="true"
        @refresh="fetchTable"
      >
        <template #title> 企业抽样标准列表 </template>
        <template #stateSwitch="{ row }">
          <t-switch
            v-model="row.state"
            :custom-value="[1, 0]"
            :default-value="row.state"
            size="large"
            @change="(value) => onStateRowClick(row, value)"
          ></t-switch>
        </template>
        <template #codeOp="slotProps">
          <t-space :size="8">
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick(slotProps)">{{
              slotProps.row.sampingStdCode
            }}</t-link>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <div>
    <t-dialog v-model:visible="formVisible" width="90%" :footer="false" :close-on-overlay-click="false">
      <sampling-std-form ref="formRef"></sampling-std-form>
    </t-dialog>
    <t-dialog v-model:visible="stateVisible" width="30%" :header="false" @confirm="onStateChange" @close="fetchTable">
      <div v-if="countMessage">
        <span
          >该抽样方案共有
          {{ countMessage }} 个标准检验项目在使用，如果禁用将对这些标准检验项目产生影响。请确认是否继续禁用？</span
        >
      </div>
      <div v-if="!countMessage">
        <span>请确认是否禁用？</span>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/quality';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import SamplingStdForm from './form.vue';

const { pageUI } = usePage();
const { loading } = useLoading();
const sampingStdCode = ref('');
const selectedRowKeys = ref([]);
const tableData = ref([]);
const formVisible = ref(false);
const stateVisible = ref(false);
const formRef = ref(null);
const formTitle = ref('');
const operationScope = ref(-1);
const countMessage = ref();
const sampingStdCodesOption = ref([]);
const curId = ref();

// 下拉初始数据
const scopeOptions = [
  { label: '全部', value: -1 },
  { label: '物料', value: 1 },
  { label: '产品', value: 2 },
];

const samplingStdColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '标准编码', colKey: 'codeOp', width: 85 },
  { title: '应用范围', width: 85, colKey: 'operationScopeName' },
  { title: '检验方法', width: 85, colKey: 'operationMethodName' },
  { title: '说明', width: 100, colKey: 'memo' },
  { title: '状态', width: 86, colKey: 'stateSwitch' },
  { title: '创建人', width: 100, colKey: 'creatorName' },
  { title: '创建时间', width: 100, colKey: 'timeCreate' },
];

// 查询组件
const opts = computed(() => {
  return {
    sampingStdCode: {
      label: '标准编码',
      event: 't-select',
      defaultVal: '',
      slotName: 'querySelect',
    },
    operationScope: {
      label: '应用范围',
      comp: 't-select',
      defaultVal: -1,
      bind: {
        options: scopeOptions,
        lazyLoad: true,
      },
    },
  };
});
const onEditRowClick = (value: any) => {
  formTitle.value = '查看';
  console.log(value.row);
  formRef.value.formData.sampingStdId = value.row.id;
  formRef.value.formData.sampingStdCode = value.row.sampingStdCode;
  const { fetchTable } = formRef.value;
  formVisible.value = true;
  fetchTable();
};

const querySelectChange = async (event) => {
  const res = (await api.samplingStd.getSampingStdCode({ key: event.length >= 2 ? event : '' })) as any;
  sampingStdCodesOption.value = res;
};
// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  sampingStdCode.value = data.sampingStdCode;
  operationScope.value = data.operationScope;
  onRefresh();
};

// 查询按钮
const onRefresh = () => {
  fetchTable();
};
// 重置按钮
const conditionReset = () => {
  sampingStdCode.value = '';
  operationScope.value = -1;
  fetchSampingStdCodes();
};
const dataTotal = ref(0);

const fetchTable = async () => {
  try {
    const data = (await api.samplingStd.getList({
      sampingStdCode: sampingStdCode.value,
      operationScope: operationScope.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    })) as any;
    tableData.value = data.list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  }
};
const fetchSampingStdCodes = async () => {
  try {
    selectedRowKeys.value = [];
    tableData.value = [];
    const data = (await api.samplingStd.getSampingStdCode()) as any;
    sampingStdCodesOption.value = data;
  } catch (e) {
    console.log(e);
  }
};

const onStateChange = async () => {
  await api.samplingStd.stateChange(curId.value);
  await fetchTable();
  stateVisible.value = false;
  MessagePlugin.success('操作成功');
};

const onStateRowClick = async (value, row) => {
  console.log(value);
  if (!row) {
    curId.value = value.id;
    const count = await api.samplingStd.stateChangeBefore(value.id);
    if (Number(count) !== 0) {
      countMessage.value = count;
    } else {
      countMessage.value = null;
    }
    stateVisible.value = true;
  } else {
    await api.samplingStd.stateChange(value.id);
    await fetchTable();
    MessagePlugin.success('操作成功');
  }
};

onMounted(() => {
  fetchTable();
  fetchSampingStdCodes();
});
</script>

<style lang="less" scoped>
.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);

  .t-tree {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
  float: left;
}

.list-tree-operator {
  width: 280px;
  float: left;
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
}

.list-tree-content {
  border-left: 1px solid var(--td-border-level-1-color);
  overflow: auto;
}

.search-input {
  width: 180px;
}

.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  border-radius: var(--td-radius-medium);

  .table-container {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.form-container-row {
  margin-top: 20px;
}
</style>
