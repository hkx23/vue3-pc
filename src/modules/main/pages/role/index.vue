<template>
  <div class="main-page">
    <div class="main-page-content">
      <!-- 查询组件  -->
      <tm-query :opts="opts" label-width="100" @submit="conditionEnter" />
      <!-- 表格组件  -->
    </div>
    <div class="main-page-content">
      <tm-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableColumns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        :header-affixed-top="true"
        :page-affixed-top="true"
        @refresh="conditionEnter"
      >
        <template #op="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onRowEdit(row)">编辑</t-link>
            <t-link theme="primary" @click="onRowPermission(row)">权限</t-link>
            <t-link theme="primary" @click="onRowPerson(row)">成员</t-link>
            <t-link theme="primary" @click="onRowDelete(row)">删除</t-link>
          </t-space>
        </template>
        <template #button>
          <t-button theme="primary" @click="onAddClick"> 新增 </t-button>
        </template>
      </tm-table>
    </div>
    <!-- 新增/编辑角色弹出窗 -->
    <t-dialog
      v-model:visible="formVisible"
      :header="t(formAdd ? 'common.dialog.header.add' : 'common.dialog.header.edit', [t('role.role')])"
      :on-confirm="onConfirmForm"
    >
      <role-form ref="formRef" />
    </t-dialog>
    <!-- 角色成员弹出窗 -->
    <!-- 权限分配弹出窗 -->
  </div>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { api } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { FormRef } from './constants';
import RoleForm from './form.vue';
import { useLang } from './lang';

const formVisible = ref(false);
const formAdd = ref(true);
const formRef = ref<FormRef>(null);

const { t } = useLang();
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
// 表格数据总数
const dataTotal = ref(0);
// 表格数据
const tableData = ref([]);
// 表格列配置
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
  },
  { title: `${t('role.roleCode')}`, colKey: 'roleCode' },
  { title: `${t('role.roleName')}`, colKey: 'roleName' },
  { title: `${t('role.eId')}`, colKey: 'enName' },
  { title: `${t('role.org')}`, colKey: 'plantName' },
  { title: `${t('role.roleDesc')}`, colKey: 'roleDesc' },
  {
    colKey: 'op',
    title: `${t('common.button.operation')}`,
    width: '200px',
    align: 'left',
    fixed: 'right',
  },
];
// 查询组件
const opts = computed(() => {
  return {
    oid: {
      label: t('role.org'),
      comp: 'tm-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'plant',
        showTitle: false,
      },
    },
    // eId: {
    //   label: t('role.eId'),
    //   comp: 'tm-select-business',
    //   event: 'business',
    //   defaultVal: '',
    //   bind: {
    //     type: 'enterprise',
    //     showTitle: false,
    //   },
    // },
    roleName: {
      label: t('role.roleName'),
      comp: 't-input',
      defaultVal: '',
    },
    roleCode: {
      label: t('role.roleCode'),
      comp: 't-input',
      defaultVal: '',
    },
  };
});
// 查询条件处理数据
const filterList = ref([]) as any;
// 点击查询按钮
const conditionEnter = (data: any) => {
  filterList.value = [];
  for (const key in data) {
    const addFilter = {
      field: key,
      operator: 'EQ',
      value: data[key],
    };
    if (key === 'roleName') addFilter.operator = 'LIKE';
    if (addFilter.value) {
      filterList.value.push(addFilter);
    }
  }

  fetchTable();
};
// 加载角色数据表格
const fetchTable = async () => {
  setLoading(true);
  try {
    // 查询条件
    const searchCondition = {
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      filters: filterList.value,
    };

    const data = (await api.role.search(searchCondition)) as any;
    const { list } = data;
    // 如果列表项目oid等于0，plantCode与plantName都为全部
    list.forEach((element) => {
      if (element.oid === 0) {
        element.plantCode = '全部';
        element.plantName = '全部';
      }
    });
    tableData.value = list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

const onRowPermission = (row: any) => {
  console.log('编辑', row);
};
const onRowDelete = (row: any) => {
  console.log('编辑', row);
};
const onRowPerson = (row: any) => {
  console.log('编辑', row);
};
const onRowEdit = (row: any) => {
  const { reset } = formRef.value;
  reset(true, row);
  formAdd.value = false;
  formVisible.value = true;
};
const onAddClick = () => {
  console.log('新增');
  const { reset } = formRef.value;
  reset(false, null);
  formAdd.value = true;
  formVisible.value = true;
};
const onConfirmForm = () => {
  const { submit } = formRef.value;
  submit().then(() => {
    formVisible.value = false;
    fetchTable();
  });
};
</script>

<style scoped>
.main-page-content:not(:last-child) {
  border-bottom: 1px solid rgb(213 216 219 / 100%);
}
</style>
