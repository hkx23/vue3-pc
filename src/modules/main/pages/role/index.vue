<template>
  <div class="mainpage">
    <div class="mainpage-content">
      <!-- 查询组件  -->
      <tm-query :opts="opts" label-width="100" @submit="conditionEnter" />
      <!-- 表格组件  -->
    </div>
    <div class="mainpage-content">
      <tm-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableColumns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        select-on-row-click
        :header-affixed-top="true"
        @refresh="conditionEnter"
      >
        <template #op="{ row }">
          <t-space> 编辑 权限 成员 删除{{ row.id }} </t-space>
        </template>
        <template #oprate>
          <t-button shape="square" variant="outline" @click="onAddClick"> 新增 </t-button>
        </template>
      </tm-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { api } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

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
    width: '150px',
    align: 'left',
    fixed: 'right',
  },
];
// 查询组件
const opts = computed(() => {
  return {
    eId: {
      label: t('role.eId'),
      comp: 'tm-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'enterprise',
        showTitle: false,
      },
    },
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
    plant: {
      label: t('role.org'),
      comp: 'tm-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'plant',
        showTitle: false,
      },
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
    filterList.push(addFilter);
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

const onAddClick = () => {
  console.log('新增');
};
</script>

<style scoped>
.mainpage {
  background: white;
  margin: 16px 16px 0;
  border-radius: 8px;
  padding: 8px 24px;
  min-height: calc(100vh - 16px);
}

.mainpage-content:not(:last-child) {
  border-bottom: 1px solid rgb(213 216 219 / 100%);
}
</style>
