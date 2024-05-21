<template>
  <t-row>
    <t-col :flex="6">
      <div>
        <t-card :title="toSelectTitle" header-bordered :style="{ width: '100%' }">
          <template #actions> {{ waitSelectCount + '/' + waitCount }} </template>
          <t-space direction="vertical" :size="8">
            <t-input v-model="searchWait" :placeholder="t('role.plsEnterUserKey')" clearable>
              <template #suffixIcon>
                <search-icon :style="{ cursor: 'pointer' }" />
              </template>
            </t-input>
            <t-table
              row-key="id"
              :loading="loading"
              :data="finalWaitData"
              :height="tableHeight"
              select-on-row-click
              :columns="waitColumns"
              :selected-row-keys="selectedRowKeys"
              :hover="true"
              lazy-load
              @select-change="rehandleSelectChange"
            >
              <template #operation="{ row }">
                <t-link hover="color" theme="primary" @click="rehandleClickAdd(row)">
                  <t-icon name="plus"></t-icon>
                </t-link> </template
            ></t-table>
          </t-space>
        </t-card>
      </div>
    </t-col>
    <t-col :flex="1">
      <div style="background-color: rgb(255 255 255); padding: 150px 8px 8px; justify-items: center">
        <t-space direction="vertical" :size="8">
          <t-button v-if="waitSelectCount > 0" theme="default" variant="outline" size="small" @click="onBatchAdd">
            <template #icon><t-icon name="swap-right"></t-icon></template>
            添加
          </t-button>
          <t-button
            v-show="selectedSelectCount > 0"
            theme="default"
            variant="outline"
            size="small"
            @click="onBatchDelete"
          >
            <template #icon><t-icon name="swap-left"></t-icon></template>
            删减
          </t-button>
        </t-space>
      </div>
    </t-col>
    <t-col :flex="6">
      <t-card :title="selectedTitle" header-bordered :style="{ width: '100%' }">
        <template #actions>{{ selectedSelectCount + '/' + selectedCount }} </template>
        <t-space direction="vertical" :size="8">
          <t-input v-model="searchSelect" placeholder="请输入用户名/姓名" clearable>
            <template #suffixIcon>
              <search-icon :style="{ cursor: 'pointer' }" />
            </template>
          </t-input>
          <t-table
            :height="tableHeight"
            row-key="id"
            :loading="selectedLoading"
            :data="finalSelectedData"
            select-on-row-click
            :selected-row-keys="selectedRowKeysS"
            :columns="selectedColumns"
            :hover="true"
            lazy-load
            @select-change="rehandleSelectSChange"
          >
            <template #operation="{ row }">
              <t-link hover="color" theme="primary" @click="rehandleClickDelete(row)">
                <t-icon name="minus"></t-icon>
              </t-link> </template
          ></t-table>
        </t-space>
      </t-card>
    </t-col>
  </t-row>
</template>
<script lang="ts">
export default {
  name: 'UserForm',
};
</script>
<script setup lang="ts">
import { SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin, PrimaryTableCol } from 'tdesign-vue-next';
import { ref, watch } from 'vue';

import { api, RoleUserDTO } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import utils from '@/utils/common';

import { useLang } from './lang';

const { t } = useLang();
const props = defineProps({
  roleId: { type: String, default: '' },
  visable: { type: Boolean, default: false },
});
const toSelectTitle = '待选列表';
const selectedTitle = '已选列表';
const waitColumns: PrimaryTableCol[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 50,
  },
  { colKey: 'userName', title: '用户名', ellipsis: true },
  { colKey: 'displayName', title: '姓名', ellipsis: true },
  { colKey: 'operation', title: '添加', width: '60', ellipsis: true },
];
const tableHeight = ref('280px');
const waitData = ref([]);
const waitCount = ref(0);
const waitSelectCount = ref(0);
const selectedRowKeys = ref([]);
const selectedRowKeysS = ref([]);
const selectedColumns: PrimaryTableCol[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 50,
  },
  { colKey: 'userName', title: '用户名', ellipsis: true },
  { colKey: 'displayName', title: '姓名', ellipsis: true },
  { colKey: 'operation', title: '删减', width: '60', ellipsis: true },
];
const selectedData = ref([]);
const selectedCount = ref(0);
const selectedSelectCount = ref(0);

const { loading } = useLoading();
const { loading: selectedLoading, setLoading: setSelectedLoading } = useLoading();
// 加载角色数据表格
const fetchWaitTable = async () => {
  utils.loadingPluginFullScreen(true);
  try {
    // 查询条件
    const roleUserDTO = {
      roleId: props.roleId,
    };

    const data = (await api.user.getUserByRoleIdNotIn(roleUserDTO)) as any;
    const list = data;
    // 如果列表项目oid等于0，plantCode与plantName都为全部
    waitData.value = list;
    waitCount.value = list.length;
    selectedRowKeys.value = [];
    waitSelectCount.value = 0;
    searchWait.value = '';
    finalWaitData.value = list;
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
  }
};
// 加载角色数据表格
const fetchSelectedTable = async () => {
  setSelectedLoading(true);
  try {
    // 查询条件
    const roleUserDTO = {
      roleId: props.roleId,
    };

    const data = (await api.user.getUsersByRoleId(roleUserDTO)) as any;
    const list = data;
    // 如果列表项目oid等于0，plantCode与plantName都为全部
    selectedData.value = list;
    selectedCount.value = list.length;
    selectedRowKeysS.value = [];
    selectedSelectCount.value = 0;
    searchSelect.value = '';
    finalSelectedData.value = list;
  } catch (e) {
    console.log(e);
  } finally {
    setSelectedLoading(false);
  }
};
const rehandleClickAdd = async (row: any) => {
  console.log('角色新增用户', row);
  const addModel: RoleUserDTO = {
    roleId: props.roleId,
    userIds: [row.id],
  };
  await api.userInRole.addUserInRole(addModel);
  fetchSelectedTable();
  fetchWaitTable();
  MessagePlugin.success(t('common.message.addSuccess'));
};
const rehandleClickDelete = async (row: any) => {
  console.log('角色删除用户', row);
  const addModel: RoleUserDTO = {
    roleId: props.roleId,
    userIds: [row.id],
  };
  await api.userInRole.deleteUserInRole(addModel);
  fetchSelectedTable();
  fetchWaitTable();
  MessagePlugin.success(t('common.message.deleteSuccess'));
};
const onBatchAdd = async () => {
  console.log('角色新增用户', selectedRowKeys.value);
  const addModel: RoleUserDTO = {
    roleId: props.roleId,
    userIds: selectedRowKeys.value,
  };
  await api.userInRole.addUserInRole(addModel);
  fetchSelectedTable();
  fetchWaitTable();
  MessagePlugin.success(t('common.message.addSuccess'));
};

const onBatchDelete = async () => {
  console.log('角色删除用户', selectedRowKeysS.value);
  const addModel: RoleUserDTO = {
    roleId: props.roleId,
    userIds: selectedRowKeysS.value,
  };
  await api.userInRole.deleteUserInRole(addModel);
  fetchSelectedTable();
  fetchWaitTable();
  MessagePlugin.success(t('common.message.deleteSuccess'));
};

const rehandleSelectChange = (value, ctx) => {
  selectedRowKeys.value = value;
  waitSelectCount.value = value.length;
};
const rehandleSelectSChange = (value, ctx) => {
  selectedRowKeysS.value = value;
  selectedSelectCount.value = value.length;
};
// 搜索
const searchWait = ref('');
const searchSelect = ref('');
const finalWaitData = ref([]);
const finalSelectedData = ref([]);
watch(
  () => searchWait.value,
  (value, prevValue) => {
    if (value) {
      const reg = new RegExp(value, 'gi');
      finalWaitData.value = waitData.value.filter((item) => {
        return reg.test(item.userName) || reg.test(item.displayName);
      });
    } else {
      finalWaitData.value = waitData.value;
    }
  },
);
watch(
  () => searchSelect.value,
  (value, prevValue) => {
    if (value) {
      const reg = new RegExp(value, 'gi');
      finalSelectedData.value = selectedData.value.filter((item) => {
        return reg.test(item.userName) || reg.test(item.displayName);
      });
    } else {
      finalSelectedData.value = selectedData.value;
    }
  },
);
watch(
  () => props.visable,
  (value, prevValue) => {
    if (value && props.roleId) {
      fetchSelectedTable();
      fetchWaitTable();
    }
  },
);
</script>
<style lang="less" scoped>
:deep(.t-table__empty) {
  border-bottom: #d5d8db 1px solid;
}

:deep(.t-table table) {
  border: #d5d8db solid 1px;
}
</style>
`
