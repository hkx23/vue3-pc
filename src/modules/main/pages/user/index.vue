<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" />
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
        :header-affixed-top="true"
        :page-affixed-top="true"
        @refresh="conditionEnter"
      >
        <template #op="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onRowEdit(row)">{{ t('common.button.edit') }}</t-link>
            <t-link theme="primary" @click="onRowPermission(row)">{{ t('user.authority') }}</t-link>
            <t-link theme="primary" @click="onRowStateChange(row)">{{
              row.state == 0 ? t('user.enable') : t('user.disable')
            }}</t-link>
            <t-link theme="primary" @click="onRowOrgSetting(row)">{{ t('user.org') }}</t-link>
            <t-link theme="primary" @click="onRowResetPassword(row)">重置密码</t-link>
            <!-- 启用/禁用 -->
            <!-- <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onRowOnlineChange(row)">
              <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm> -->
          </t-space>
        </template>
        <template #button>
          <t-button theme="primary" @click="onAddClick"> {{ t('common.button.add') }} </t-button>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- 新增/编辑用户弹出窗 -->
  <t-dialog
    v-model:visible="formVisible"
    :header="t(formAdd ? 'common.dialog.header.add' : 'common.dialog.header.edit', [t('user.user')])"
    :on-confirm="onConfirmForm"
  >
    <user-form ref="formRef" />
  </t-dialog>
  <!-- 组织弹出窗 -->
  <dialog-org :id="selectuserId" v-model="formOrgVisible" :title="t('user.org')"></dialog-org>
  <!-- 权限分配弹出窗 -->
  <dialog-permission
    :id="selectuserId"
    v-model="formPermissionVisible"
    :title="t('user.authTitle')"
  ></dialog-permission>
  <!-- 重置密码弹出窗 -->
  <dialog-reset-password
    :id="selectuserId"
    v-model="formResetPwdVisible"
    :title="t('user.resetPassword')"
  ></dialog-reset-password>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { DialogPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { FormRef } from './constants';
import dialogOrg from './dialogOrg.vue';
import dialogPermission from './dialogPermission.vue';
import dialogResetPassword from './dialogResetPassword.vue';
import UserForm from './form.vue';
import { useLang } from './lang';

const formVisible = ref(false);
// const formUserVisible = ref(false);
const formPermissionVisible = ref(false);
const formResetPwdVisible = ref(false);
const formOrgVisible = ref(false);

const formAdd = ref(true);
const formRef = ref<FormRef>(null);
// const userFormRef = ref<FormRef>(null);

const { t } = useLang();
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
// 表格数据总数
const dataTotal = ref(0);
// 表格数据
const tableData = ref([]);
// 选中行ID,点击权限按钮时赋值
const selectuserId = ref('');
// 表格列配置
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  {
    colKey: 'serial-number',
    width: 60,
    title: `${t('business.main.serialNumber')}`,
  },
  { title: `${t('user.account')}`, width: 120, colKey: 'userName' },
  { title: `${t('user.displayName')}`, width: 120, colKey: 'displayName' },
  { title: `${t('user.eId')}`, width: 120, colKey: 'epName' },
  { title: `${t('user.defalutOrg')}`, width: 120, colKey: 'orgName' },
  { title: `${t('user.createTime')}`, width: 120, colKey: 'timeCreate' },
  { title: `${t('user.lastLoginTime')}`, width: 120, colKey: 'timeLastLogin' },
  {
    colKey: 'op',
    title: `${t('common.button.operation')}`,
    width: '260px',
    align: 'left',
    fixed: 'right',
  },
];
// 查询组件
const opts = computed(() => {
  return {
    userName: {
      label: t('user.account'),
      comp: 't-input',
      defaultVal: '',
    },
    displayName: {
      label: t('user.displayName'),
      comp: 't-input',
      defaultVal: '',
    },
    orgId: {
      label: t('user.org'),
      comp: 'bcmp-select-business',
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
      operator: 'LIKE',
      value: data[key],
    };
    if (key === 'userName') addFilter.operator = 'EQ';
    if (addFilter.value) {
      filterList.value.push(addFilter);
    }
  }

  fetchTable();
};
// 加载用户数据表格
const fetchTable = async () => {
  setLoading(true);
  try {
    // 查询条件
    const searchCondition = {
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      filters: filterList.value,
    };

    const data = (await api.user.search(searchCondition)) as any;
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

// const formUseruserId = ref('');
// const onRowPerson = (row: any) => {
//   // const { reset } = userFormRef.value;
//   // reset(true, row);
//   formUseruserId.value = row.id;
//   formUserVisible.value = true;
//   // console.log('人员分配', row);
// };
const onRowPermission = (row: any) => {
  selectuserId.value = row.id;
  formPermissionVisible.value = true;
  // console.log('权限分配', row);
};
const onRowResetPassword = (row: any) => {
  selectuserId.value = row.id;
  formResetPwdVisible.value = true;
  // console.log('重置密码', row);
};

const onRowOrgSetting = (row: any) => {
  selectuserId.value = row.id;
  formOrgVisible.value = true;
  // console.log('重置密码', row);
};

const onRowStateChange = async (row: any) => {
  const confirmDia = DialogPlugin({
    header: row.state === 1 ? '禁用' : '启用',
    body: row.state === 1 ? '是否确认禁用账号' : '是否确认启用用账号',
    confirmBtn: '确认',
    cancelBtn: '取消',
    onConfirm: ({ e }) => {
      console.log('confirm button has been clicked!');
      console.log('e: ', e);
      const postRow = _.cloneDeep(row);
      if (postRow.state === 1) {
        postRow.state = 0;
        // postRow.isOnline = 0;
        api.user
          .setState(postRow)
          .then(() => {
            MessagePlugin.success('禁用成功');
            fetchTable();
            // 请求成功后，销毁弹框
            confirmDia.destroy();
          })
          .catch(() => {
            MessagePlugin.error('禁用失败');
          });
      } else {
        postRow.state = 1;
        // postRow.isOnline = 1;
        api.user
          .setState(postRow)
          .then(() => {
            MessagePlugin.success('启用成功');
            fetchTable();
            // 请求成功后，销毁弹框
            confirmDia.destroy();
          })
          .catch(() => {
            MessagePlugin.error('启用失败');
          });
      }
    },
    onClose: ({ e, trigger }) => {
      console.log('e: ', e);
      console.log('trigger: ', trigger);
      confirmDia.hide();
    },
  });
  // if (row.state === 1) {

  //   row.state = 0;
  //   await api.user.setOnline(row).then(() => {
  //     fetchTable();
  //   });
  //   MessagePlugin.success('禁用成功');
  // } else {
  //   row.state = 1;
  //   await api.user.setOnline(row).then(() => {
  //     fetchTable();
  //   });
  //   MessagePlugin.success('启用用成功');
  // }
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
// const onUserConfirmForm = () => {
//   const { submit } = userFormRef.value;
//   submit().then(() => {
//     formUserVisible.value = false;
//     fetchTable();
//   });
// };
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
