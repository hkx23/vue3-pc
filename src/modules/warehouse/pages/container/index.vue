<!-- 容器  -->
<template>
  <cmp-container :full="true">
    <div class="cards-container">
      <!-- card 1 -->
      <cmp-card class="card">
        <cmp-card>
          <cmp-query ref="queryComponent" :opts="optsContainer1" :bool-enter="false" @submit="onInput"> </cmp-query>
        </cmp-card>

        <!-- cmp-table 表格组件   select-on-row-click 一行选中  -->
        <cmp-card>
          <cmp-table
            v-model:pagination="pageUI"
            row-key="id"
            :loading="loading"
            :table-data="tableContainerData1"
            :table-column="tableContainerColumns1"
            :total="dataTotal1"
            select-on-row-click
            :hover="true"
            :fixed-height="true"
            style="height: 460px"
            type="single"
            empty="没有符合条件的数据"
            @select-change="handleRowClick"
            @refresh="fetchTable"
          >
            <template #title>
              {{ '容器类型' }}
            </template>
            <template #button>
              <t-button theme="primary" @click="onAddContainer">新增</t-button>
            </template>
            <template #billNo="slotProps">
              <t-space :size="8">
                <t-link variant="text" theme="primary" name="edit">{{ slotProps.row.billNo }}</t-link>
              </t-space>
            </template>

            <!-- 编辑 -->
            <template #op1="{ row }">
              <t-space>
                <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick1(row)">编辑</t-link>
              </t-space>
            </template>

            <template #stateName="{ row }">
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
      </cmp-card>
      <!--  card 2 -->
      <cmp-card class="card">
        <t-space direction="vertical">
          <!-- tabs组件 -->
          <tabs-container ref="refreshTable" :props-id="propsId" :selected-row-data="selectedRowData" />
        </t-space>
      </cmp-card>
    </div>
  </cmp-container>
  <!-- 弹窗  :footer="false" 不需要底部 -->
  <t-dialog v-model:visible="containerVisible" :close-on-overlay-click="false" :header="formTitle">
    <t-form :data="formData" :rules="rules" label-width="110px" @submit="submit1" @reset="cancel">
      <t-form-item label="容器类型编码" name="containerTypeCode">
        <t-input v-model="formData.containerTypeCode" :disabled="formTitle === '编辑'"></t-input>
      </t-form-item>
      <t-form-item label="容器类型名称" name="containerTypeName">
        <t-input v-model="formData.containerTypeName" :disabled="formTitle === '编辑'"></t-input>
      </t-form-item>
      <t-form-item label="容器类型描述" name="containerTypeDesc">
        <t-input v-model="formData.containerTypeDesc"></t-input>
      </t-form-item>
      <t-form-item label="启用">
        <t-switch v-model="formData.state" :custom-value="[1, 0]" />
      </t-form-item>
    </t-form>

    <template #footer>
      <t-button theme="default" variant="base" @click="cancel">取消</t-button>
      <t-button theme="primary" @click="submit1">提交</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
import { Data, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ref, watch } from 'vue';

import { api } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import TabsContainer from './tabsContainer.vue';

const { pageUI } = usePage();
const formTitle = ref('');
const containerVisible = ref(false); //* 弹窗默认关闭
const tableContainerData1 = ref([]);
const dataTotal1 = ref(0);
const { loading, setLoading } = useLoading();
const formData = ref({
  containerTypeCode: '',
  containerTypeName: '',
  containerTypeDesc: '',
  state: 1,
});
const refreshTable = ref(null);
const selectedRowData = ref({}); // 用于存储选中行的数据
const searchText = ref('');
const propsId = ref(''); // 接口入参

//* 组件配置  --查询界面选择
const optsContainer1 = computed(() => {
  return {
    keyword: {
      label: '容器编码/名称',
      labelWidth: '100',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
  };
});

// card 1  single 设置单项选中
const tableContainerColumns1: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'single', fixed: 'left' },
  { title: '容器类型编码', colKey: 'containerTypeCode', width: 120 },
  { title: '容器类型名称', width: 120, colKey: 'containerTypeName' },
  { title: '容器类型描述', width: 120, colKey: 'containerTypeDesc' },
  { title: '状态', width: 85, colKey: 'stateName' },
  { title: '操作', align: 'left', fixed: 'right', width: 85, colKey: 'op1' },
];

// 新增容器
const onAddContainer = async () => {
  formTitle.value = '新增容器类型';
  containerVisible.value = true;
  // 清空数据
  formData.value = {
    containerTypeCode: '',
    containerTypeName: '',
    containerTypeDesc: '',
    state: 1,
  };
};
// 容器编辑
const onEditRowClick1 = async (row) => {
  formTitle.value = '编辑';
  containerVisible.value = true;
  const partialRow = JSON.parse(
    JSON.stringify(row, ['containerTypeCode', 'containerTypeName', 'containerTypeDesc', 'state', 'id']),
  );
  formData.value = partialRow;
};

//* 查询
const onInput = async (data: any) => {
  const { keyword } = data;
  searchText.value = keyword;
  pageUI.value.page = 1;
  fetchTable();
};

//* 表格数据
const fetchTable = async () => {
  try {
    setLoading(true);
    const result = await api.containerType.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      keyword: searchText.value,
    });
    tableContainerData1.value = result.list;
    dataTotal1.value = result.total;
  } finally {
    setLoading(false);
  }
};

// 校验规则
const rules: FormRules<Data> = {
  containerTypeCode: [
    {
      required: true,
      message: '请输入容器类型编码',
      trigger: 'blur',
    },
  ],
  containerTypeName: [
    {
      required: true,
      message: '请输入容器类型名称',
      trigger: 'blur',
    },
  ],
  containerTypeDesc: [
    {
      required: true,
      message: '请输入容器类型描述',
      trigger: 'blur',
    },
  ],
};

// 当点击表格的某一行时
const handleRowClick = (row, event) => {
  console.log('🚀 ~ handleRowClick ~ row:', row);
  const { containerTypeName, id } = event.currentRowData;
  propsId.value = id; // 父调子入参
  selectedRowData.value = { containerTypeName, id };
};
// 新增提交
const submit1 = async () => {
  // *提交时校验
  const fieldsToValidate = [
    { field: formData.value.containerTypeCode, message: '请输入容器类型编码' },
    { field: formData.value.containerTypeName, message: '请输入容器类型名称' },
    { field: formData.value.containerTypeDesc, message: '请输入容器类型描述' },
  ];
  for (const field of fieldsToValidate) {
    if (isEmpty(field.field)) {
      MessagePlugin.error(field.message);
      return;
    }
  }
  if (formTitle.value === '新增容器类型') {
    await api.containerType.add(formData.value);
    await MessagePlugin.success('新增成功');
  } else {
    await api.containerType.modify(formData.value);
    await MessagePlugin.success('编辑成功');
  }
  containerVisible.value = false;
  onInput({}); // 重新获取数据
  // refreshTable.value.fetchTable(propsId.value);
};

/* 操作状态 */
const onSwitchChange = async (row: any, value: any) => {
  const isValue = value ? 1 : 0;
  const { containerTypeCode, containerTypeDesc, containerTypeName, creator, eid, id, modifier, oid } = row;
  await api.containerType.modify({
    containerTypeCode,
    containerTypeDesc,
    containerTypeName,
    creator,
    eid,
    id,
    modifier,
    oid,
    state: isValue,
  });
  await onInput({});
  await MessagePlugin.success('操作成功!');
};

// 取消
const cancel = () => {
  // 清空数据
  formData.value = {
    containerTypeCode: '',
    containerTypeName: '',
    containerTypeDesc: '',
    state: 1,
  };
  containerVisible.value = false;
  MessagePlugin.success('已取消');
};

/* 如果 propsId变化了  调用子组件的 查询方法 fetchTables(propsId) */
watch(propsId, (propsId) => {
  if (propsId) {
    refreshTable.value.fetchTable(propsId);
    refreshTable.value.fetchTable2(propsId);
  }
});
</script>

<style lang="less" scoped>
.cards-container {
  display: flex;
  justify-content: space-between; /* 在卡片之间添加空间 */
}

.card {
  flex: 1; /* 让卡片平均分配空间 */
  margin: 0 6px; /* 可选：添加一些间隔 */
}
</style>
