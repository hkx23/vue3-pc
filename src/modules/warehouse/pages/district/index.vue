<!-- 货区 -->
<template>
  <div class="main-page">
    <div class="main-page-content">
      <cmp-query :opts="opts" @submit="onInput"></cmp-query>
    </div>
    <div class="main-page-content">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableWarehouseColumns"
        :table-data="tableDataWarehouse"
        :loading="loading"
        :total="dataTotal"
        @refresh="tabRefresh"
      >
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
    </div>
  </div>
  <!-- 弹窗 -->
  <div>
    <t-dialog
      v-model:visible="formVisible"
      :header="formTitle"
      :on-confirm="onConfirmForm"
      width="50%"
      :close-on-overlay-click="false"
    >
      <template #header>
        {{ formTitle }}
      </template>
      <t-space direction="vertical" style="width: 98%">
        <!-- 传递 formData 给子组件 -->
        <district-form ref="formRef" :form-title="formTitle"></district-form>
      </t-space>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

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
    warehouse: {
      label: '仓库编码',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'warehouse',
        showTitle: false,
      },
    },
    districtCode: {
      label: '货区编码/名称:',
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
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '货区编码', colKey: 'districtCode', width: 85 },
  { title: '货区名称', width: 85, colKey: 'districtName' },
  { title: '货区描述', width: 85, colKey: 'districtDesc' },
  {
    title: '仓库编码',
    width: 85,
    colKey: 'warehouseCode',
  },
  { title: '仓库名称', width: 100, colKey: 'warehouseName' },
  { title: '状态', width: 85, colKey: 'state' },
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
  });
  tableDataWarehouse.value = data.list;
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
    const { warehouse, districtCode } = data;
    pageUI.value.page = 1;
    const reslut = await api.district.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      warehouseId: warehouse,
      districtKeyword: districtCode,
    });
    tableDataWarehouse.value = reslut.list;
    dataTotal.value = reslut.total;
  }
};

const onEditRowClick = async (value: any) => {
  formTitle.value = '编辑';
  controlShow.value = true;
  const reslut = await api.district.getItemById(value.row.id);
  console.log('🚀 ~ file: index.vue:185 ~ onEditRowClick ~ reslut:', reslut);
  const editedData = {
    ...value.row,
    state: !!value.row.state, //* 布尔转数组类型
  };
  formRef.value.formData = JSON.parse(JSON.stringify(editedData));
  formVisible.value = true;
};

//* 货区 删除
const onStateRowClick = async (row: { row: any }) => {
  await api.district.removeDistrict({ id: row.row.id });
  if (tableDataWarehouse.value.length <= 1 && pageUI.value.page > 1) {
    pageUI.value.page--; // todo
  }
  await fetchTable(); // *获取 货区 数据
  MessagePlugin.success('删除成功');
};

const onConfirmForm = async () => {
  formRef.value.submit().then(() => {
    formVisible.value = false;
    fetchTable();
  });
};
const onAdd = () => {
  formTitle.value = '新增';
  controlShow.value = true;
  formRef.value.init();
  formVisible.value = true;
  controlShow.value = true;
};
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
