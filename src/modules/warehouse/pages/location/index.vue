<!-- 货位 -->
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
        :table-data="tableDataLocation"
        select-on-row-click
        :fixed-height="true"
        :hover="true"
        :loading="loading"
        :total="dataTotal"
        @refresh="tabRefresh"
      >
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
        <template #title>
          {{ '货位维护' }}
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
    <location-form ref="formRef" :form-title="formTitle"></location-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api, LocationSearch } from '@/api/warehouse';
import CmpQuery from '@/components/cmp-query/index.vue'; //* 查询组件
import CmpTable from '@/components/cmp-table/index.vue'; //* 表格组件
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import LocationForm from './form.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const selectedWarehouseRowKeys = ref([]);
const tableDataLocation = ref([]); //* 表格数据
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
      },
    },
    districtKeyword: {
      label: '货区编码',
      labelWidth: '140',
      isHide: tabValue.value,
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    locationKeyword: {
      label: '货位编码',
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
  { title: '货位编码', colKey: 'locationCode', width: 85 },
  { title: '货位名称', width: 85, colKey: 'locationName' },
  { title: '货位描述', width: 85, colKey: 'locationDesc' },
  { title: '货区编码', width: 85, colKey: 'districtCode' }, //* ?
  { title: '货区名称', width: 85, colKey: 'districtName' }, //* ?
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
  tableDataLocation.value = [];
  const data = await api.location.getList({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  tableDataLocation.value = data.list;
  dataTotal.value = data.total;
  setLoading(false);
};
//* 表格刷新
const tabRefresh = async () => {
  await fetchTable();
};

//* 查询
const onInput = async (data: any) => {
  if (!data.value) {
    const { warehouseId, districtKeyword, locationKeyword } = data;
    pageUI.value.page = 1;
    const result = await api.location.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      warehouseId,
      districtKeyword,
      locationKeyword,
    } as LocationSearch);
    tableDataLocation.value = result.list;
    dataTotal.value = result.total;
  }
};

const onEditRowClick = async (value: any) => {
  formTitle.value = '编辑';
  controlShow.value = true;
  await api.location.getItemById(value.row.id);
  const editedData = {
    ...value.row,
    state: value.row.state ? 1 : 0,
  };
  formRef.value.formData = JSON.parse(JSON.stringify(editedData)); // todo
  // formRef.value.formData = clone2(editedData);
  formVisible.value = true;
};

//* 删除
const onStateRowClick = async (row: { row: any }) => {
  await api.location.removeLocation({ id: row.row.id });
  if (tableDataLocation.value.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--;
  }
  await fetchTable(); // *获取 货区 数据
  MessagePlugin.success('删除成功');
};

const onConfirmForm = async () => {
  formRef.value.submit().then((data) => {
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
  const { id, warehouseId, districtId } = row;
  await api.location.modifyLocation({
    id,
    districtId,
    warehouseId,
    state: isValue,
  });
  await fetchTable();
  MessagePlugin.success('操作成功');
};
</script>

<style lang="less" scoped></style>
