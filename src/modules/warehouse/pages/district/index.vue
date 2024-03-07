<!-- 货区 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query :opts="opts" @submit="onInput"></cmp-query>
    </cmp-card>
    <cmp-card>
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableWarehouseColumns"
        :table-data="tableDataWarehouse"
        :fixed-height="true"
        :hover="true"
        select-on-row-click
        :loading="loading"
        :total="dataTotal"
        @refresh="tabRefresh"
      >
        <template #title>
          {{ '货区维护' }}
        </template>
        <template #button>
          <t-button theme="primary" @click="onAdd">新增</t-button>
          <t-button theme="default">导入</t-button>
        </template>

        <template #op="row">
          <t-space>
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick(row)">编辑</t-link>
            <t-popconfirm theme="default" content="确认删除吗" @confirm="() => onStateRowClick(row)">
              <t-link theme="primary"> 删除 </t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <!-- 状态 -->
        <!-- <template #state="{ row }">
          <span v-if="row.state == 1">启用</span>
          <span v-else>禁用</span>
        </template> -->
        <template #state="{ row }">
          <t-switch
            :custom-value="[1, 0]"
            :value="row.state"
            :default-value="row.state"
            size="large"
            @change="(value) => onSwitchChange(row, value)"
          ></t-switch>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- 弹窗 -->
  <t-dialog
    v-model:visible="formVisible"
    :header="formTitle"
    :on-confirm="onConfirmForm"
    width="850px"
    :close-on-overlay-click="false"
  >
    <template #header>
      {{ formTitle }}
    </template>
    <!-- 传递 formData 给子组件 -->
    <district-form ref="formRef" :form-title="formTitle"></district-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue'; //* 查询组件
import CmpTable from '@/components/cmp-table/index.vue'; //* 表格组件
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import DistrictForm from './form.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const selectedWarehouseRowKeys = ref([]);
const tableDataWarehouse = ref([]); //* 表格数据
const formVisible = ref(false); //* 弹窗默认关闭
const formTitle = ref('');
const dataTotal = ref(0);
const tabValue = ref(0);
const controlShow = ref(false);
const formRef = ref(null); //* formRef defult nulls

//* 初始渲染
onMounted(async () => {
  await fetchTable();
});

//* 组件配置  business --查询界面选择
const opts = computed(() => {
  return {
    warehouseId: {
      label: '仓库编码',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'warehouse',
        showTitle: false,
        labelField: 'warehouseCode',
      },
    },
    districtKeyword: {
      label: '货区编码/名称',
      labelWidth: '140',
      isHide: tabValue.value,
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
  };
});

//* 表格标题
const tableWarehouseColumns: PrimaryTableCol<TableRowData>[] = [
  // { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '货区编码', colKey: 'districtCode', width: 85 },
  { title: '货区名称', width: 85, colKey: 'districtName' },
  { title: '货区描述', width: 85, colKey: 'districtDesc' },
  {
    title: '仓库编码',
    width: 85,
    colKey: 'warehouseCode',
  },
  { title: '仓库名称', width: 100, colKey: 'warehouseName' },
  {
    title: '状态',
    width: 85,
    colKey: 'state',
  },
  { title: '修改人', width: 120, colKey: 'modifier' },
  { title: '修改时间', width: 170, colKey: 'timeModified' },
  { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
];
//* 表格数据
const fetchTable = async () => {
  setLoading(true);
  selectedWarehouseRowKeys.value = [];
  tableDataWarehouse.value = [];
  const data = await api.district.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    warehouseId: formData.queryData.warehouseId,
    districtKeyword: formData.queryData.districtKeyword,
  });
  tableDataWarehouse.value = data.list;
  dataTotal.value = data.total;
  setLoading(false);
};
//* 表格刷新
const tabRefresh = async () => {
  await fetchTable();
};

const formData = reactive({
  queryData: {
    warehouseId: '',
    districtKeyword: '',
  },
});

//* 查询
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  if (!data.value) {
    const { warehouseId, districtKeyword } = data;
    formData.queryData.warehouseId = warehouseId;
    formData.queryData.districtKeyword = districtKeyword;
  }
  await fetchTable();
};
//* 编辑
const onEditRowClick = async (value: any) => {
  formTitle.value = '编辑';
  controlShow.value = true;
  await api.district.getItemById(value.row.id);
  const editedData = {
    ...value.row,
    state: value.row.state ? 1 : 0, //* 1 表示开启，0 表示关闭
  };
  formRef.value.formData = JSON.parse(JSON.stringify(editedData));
  formVisible.value = true;
};

//* 删除
const onStateRowClick = async (row: { row: any }) => {
  await api.district.removeDistrict({ id: row.row.id });
  if (tableDataWarehouse.value.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await fetchTable(); // *获取 货区 数据
  MessagePlugin.success('删除成功');
};

const onConfirmForm = async () => {
  formRef.value.submit().then((data) => {
    // 判断数据是否符合
    if (data) {
      formVisible.value = false;
      fetchTable();
    }
  });
};
const onAdd = () => {
  formTitle.value = '新增';
  controlShow.value = true;
  formRef.value.init();
  formVisible.value = true;
  controlShow.value = true;
};

/* 操作状态 */
const onSwitchChange = async (row: any, value: any) => {
  const isValue = value ? 1 : 0;
  const { id, warehouseId } = row;
  await api.district.modifyDistrict({ id, state: isValue, warehouseId });
  await fetchTable();
  MessagePlugin.success('操作成功');
};
</script>

<style lang="less" scoped></style>
