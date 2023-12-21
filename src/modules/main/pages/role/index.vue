<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" label-width="100" @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableColumns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        fixed-height="true"
        @refresh="conditionEnter"
      >
        <template #op="{ row }">
          <t-space :size="8">
            <t-link hover="color" theme="primary" @click="onRowEdit(row)">
              <t-tag theme="primary" variant="light">{{ t('common.button.edit') }}</t-tag>
            </t-link>
            <t-link hover="color" theme="primary" @click="onRowPermission(row)">
              <t-tag theme="primary" variant="light">{{ t('role.authority') }}</t-tag>
            </t-link>
            <t-link hover="color" theme="primary" @click="onRowPerson(row)">
              <t-tag theme="primary" variant="light">{{ t('role.member') }}</t-tag>
            </t-link>
            <!-- 删除 -->
            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onRowDelete(row)">
              <t-link hover="color" theme="primary">
                <t-tag theme="primary" variant="light">{{ t('common.button.delete') }}</t-tag>
              </t-link>
            </t-popconfirm>
          </t-space>
        </template>
        <template #button>
          <t-button theme="primary" @click="onAddClick"> {{ t('common.button.add') }} </t-button>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- 新增/编辑角色弹出窗 -->
  <t-dialog
    v-model:visible="formVisible"
    :header="t(formAdd ? 'common.dialog.header.add' : 'common.dialog.header.edit', [t('role.role')])"
    :on-confirm="onConfirmForm"
  >
    <role-form ref="formRef" />
  </t-dialog>
  <!-- 角色成员弹出窗 -->
  <t-dialog
    v-model:visible="formUserVisible"
    top="25px"
    width="800px"
    :confirm-btn="null"
    :header="t('role.roleMember')"
    :on-confirm="onUserConfirmForm"
  >
    <user-form ref="userFormRef" :role-id="formUserRoleId" :visable="formUserVisible" />
  </t-dialog>
  <!-- 权限分配弹出窗 -->
  <dialog-permission
    :id="selectRoleId"
    v-model="formPermissionVisible"
    :title="t('role.authTitle')"
  ></dialog-permission>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { FormRef } from './constants';
import dialogPermission from './dialogPermission.vue';
import RoleForm from './form.vue';
import { useLang } from './lang';
import userForm from './userForm.vue';

const formVisible = ref(false);
const formUserVisible = ref(false);
const formPermissionVisible = ref(false);
const formAdd = ref(true);
const formRef = ref<FormRef>(null);
const userFormRef = ref<FormRef>(null);

const { t } = useLang();
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
// 表格数据总数
const dataTotal = ref(0);
// 表格数据
const tableData = ref([]);
// 选中行ID,点击权限按钮时赋值
const selectRoleId = ref('');
// 表格列配置
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
    width: '60px',
  },
  { title: `${t('role.roleCode')}`, colKey: 'roleCode' },
  { title: `${t('role.roleName')}`, colKey: 'roleName' },
  { title: `${t('role.roleDesc')}`, colKey: 'roleDesc' },
  { title: `${t('role.org')}`, colKey: 'enPlantName' },

  {
    colKey: 'op',
    title: `${t('common.button.operation')}`,
    width: '230px',
    fixed: 'right',
  },
];
// 查询组件
const opts = computed(() => {
  return {
    oid: {
      label: t('role.org'),
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'plant',
        showTitle: false,
      },
    },
    // eId: {
    //   label: t('role.eId'),
    //   comp: 'bcmp-select-business',
    //   event: 'business',
    //   defaultVal: '',
    //   bind: {
    //     type: 'enterprise',
    //     showTitle: false,
    //   },
    // },
    keyWord: {
      label: t('role.roleCodeName'),
      comp: 't-input',
      defaultVal: '',
    },
  };
});
const keyWord = ref('');
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
    if (key !== 'keyWord' && addFilter.value) {
      filterList.value.push(addFilter);
    }
    if (key === 'keyWord') {
      keyWord.value = data[key];
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
      keyWord: keyWord.value,
    };

    const data = (await api.role.search(searchCondition)) as any;
    const { list } = data;
    // 如果列表项目oid等于0，plantCode与plantName都为全部
    list.forEach((element) => {
      if (element.oid === 0) {
        element.plantCode = t('business.main.all');
        element.plantName = t('business.main.all');
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

const formUserRoleId = ref('');
const onRowPerson = (row: any) => {
  // const { reset } = userFormRef.value;
  // reset(true, row);
  formUserRoleId.value = row.id;
  formUserVisible.value = true;
  // console.log('人员分配', row);
};
const onRowPermission = (row: any) => {
  selectRoleId.value = row.id;
  formPermissionVisible.value = true;
  // console.log('权限分配', row);
};
const onRowDelete = async (row: any) => {
  // console.log('删除', row);
  await api.role.delete({ id: row.id });
  fetchTable();
  MessagePlugin.success(t('common.message.deleteSuccess'));
};
const onRowEdit = (row: any) => {
  const { reset } = formRef.value;
  reset(true, row);
  formAdd.value = false;
  formVisible.value = true;
};
const onAddClick = () => {
  // console.log('新增');
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
const onUserConfirmForm = () => {
  const { submit } = userFormRef.value;
  submit().then(() => {
    formUserVisible.value = false;
    fetchTable();
  });
};
// 渲染函数
onMounted(() => {
  fetchTable();
});
</script>

<style scoped>
.main-page-content:not(:last-child) {
  border-bottom: 1px solid rgb(213 216 219 / 100%);
}
</style>
