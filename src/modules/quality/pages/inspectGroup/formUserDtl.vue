<template>
  <cmp-container :full="true">
    <cmp-row>
      <t-col :flex="6">
        <div>
          <t-card :title="toSelectTitle" header-bordered :style="{ width: '100%' }">
            <template #actions> {{ waitSelectCount + '/' + waitCount }} </template>
            <t-space direction="vertical" :size="8">
              <t-input v-model="formData.keyword" placeholder="请输入用户名/姓名" clearable @change="fetchUserList">
                <template #suffixIcon>
                  <search-icon :style="{ cursor: 'pointer' }" />
                </template>
              </t-input>
              <t-table
                row-key="id"
                :loading="loading"
                :data="waitData"
                :height="tableHeight"
                select-on-row-click
                :columns="tableSelectColumns"
                :selected-row-keys="selectedRowKeys"
                :hover="true"
                lazy-load
                @select-change="rehandleSelectChange"
              >
                <template #op="{ row }">
                  <t-link hover="color" theme="primary" @click="onAddUser(row)">
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
              @click="onDelBatch"
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
            <t-input v-model="formData.keywordAdd" placeholder="请输入用户名/姓名" clearable @change="fetchUserTable">
              <template #suffixIcon>
                <search-icon :style="{ cursor: 'pointer' }" />
              </template>
            </t-input>
            <t-table
              :height="tableHeight"
              row-key="id"
              :loading="selectedLoading"
              :data="selectedData"
              select-on-row-click
              :selected-row-keys="userRowKeys"
              :columns="tableColumns"
              :hover="true"
              lazy-load
              @select-change="rehandleSelectSChange"
            >
              <template #op="{ row }">
                <t-link hover="color" theme="primary" @click="onDeleteRowClick(row)">
                  <t-icon name="minus"></t-icon>
                </t-link> </template
            ></t-table>
          </t-space>
        </t-card>
      </t-col>
    </cmp-row>
  </cmp-container>
</template>
<script lang="ts">
export default {
  name: 'FormPackRule',
};
</script>
<script setup lang="ts">
import { SearchIcon } from 'tdesign-icons-vue-next';
import { FormInstanceFunctions, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { Ref, ref } from 'vue';

import { api as apiQuality } from '@/api/quality';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { loading } = useLoading();
const { loading: selectedLoading } = useLoading();
const toSelectTitle = '待选列表';
const selectedTitle = '已选列表';

const { setLoading: setLoadingUser } = useLoading();
const { t } = useLang();
const { pageUI } = usePage();
const waitData = ref([]);
const waitCount = ref(0);
const waitSelectCount = ref(0);

const selectedData = ref([]);
const selectedCount = ref(0);
const selectedSelectCount = ref(0);
const listItems = ref([]);
const userRowKeys: Ref<any[]> = ref([]); //
const selectedRowKeys: Ref<any[]> = ref([]); //
const rehandleSelectSChange = (value, ctx) => {
  userRowKeys.value = value;
  selectedSelectCount.value = value.length;
};
const rehandleSelectChange = (value, ctx) => {
  selectedRowKeys.value = value;
  waitSelectCount.value = value.length;
};
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 50, fixed: 'left' },
  { title: `${t('inspectGroup.userName')}`, colKey: 'personCode', ellipsis: true },
  { title: `${t('inspectGroup.name')}`, colKey: 'personName', ellipsis: true },
  { title: `${t('common.button.operation')}`, align: 'left', fixed: 'right', width: 60, colKey: 'op' },
];
const tableSelectColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 50, fixed: 'left' },
  { title: `${t('inspectGroup.userName')}`, colKey: 'userName', ellipsis: true },
  { title: `${t('inspectGroup.name')}`, colKey: 'displayName', ellipsis: true },
  { title: `${t('common.button.operation')}`, align: 'left', fixed: 'right', width: 60, colKey: 'op' },
];
const tableHeight = ref('280px');
const moduleData = ref([]);
const tabTotal = ref(0);
const formRef: Ref<FormInstanceFunctions> = ref(null);

const formData = ref({
  inspectGroupId: '',
  keyword: '',
  keywordAdd: '',
  pageNum: 1,
  pageSize: 20,
});

// 加载组内人员明细表格
const fetchUserTable = async () => {
  if (!formData.value.inspectGroupId) {
    clearUserTable();
    return;
  }
  try {
    setLoadingUser(true);
    const data = (await apiQuality.inspectGroupInUser.getList({
      pageNum: pageUI.value.page,
      pageSize: 9999999,
      keyword: formData.value.keywordAdd,
      inspectGroupId: formData.value.inspectGroupId,
    })) as any;
    selectedData.value = data.list;
    selectedCount.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingUser(false);
  }
};
// 加载人员明细表格
const fetchUserList = async () => {
  if (!formData.value.inspectGroupId) {
    return;
  }
  try {
    setLoadingUser(true);
    const data = (await apiQuality.inspectGroupInUser.getPersonList({
      pageNum: formData.value.pageNum,
      pageSize: 9999999,
      keyword: formData.value.keyword,
      inspectGroupId: formData.value.inspectGroupId,
    })) as any;
    waitData.value = data.list;
    waitCount.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingUser(false);
  }
};

// 清除人员明细表格
const clearUserTable = async () => {
  moduleData.value = [];
};

const onDeleteRowClick = async (row) => {
  await apiQuality.inspectGroupInUser.delByIds([row.id]);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  selectedRowKeys.value = [];
  userRowKeys.value = [];
  fetchUserTable();
  fetchUserList();
};
const onDelBatch = async () => {
  await apiQuality.inspectGroupInUser.delByIds(userRowKeys.value);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  selectedRowKeys.value = [];
  userRowKeys.value = [];
  fetchUserTable();
  fetchUserList();
};
const onAddUser = async (item) => {
  await apiQuality.inspectGroupInUser.add({ userIds: [item.id], inspectGroupId: formData.value.inspectGroupId });
  MessagePlugin.success(t('common.message.addSuccess'));
  selectedRowKeys.value = [];
  userRowKeys.value = [];
  fetchUserTable();
  fetchUserList();
};
const onBatchAdd = async () => {
  await apiQuality.inspectGroupInUser.add({
    userIds: selectedRowKeys.value,
    inspectGroupId: formData.value.inspectGroupId,
  });
  MessagePlugin.success(t('common.message.addSuccess'));
  selectedRowKeys.value = [];
  userRowKeys.value = [];
  fetchUserTable();
  fetchUserList();
};

const reset = () => {
  listItems.value = [];
  tabTotal.value = 0;
  formData.value = {
    inspectGroupId: '',
    keywordAdd: '',
    keyword: '',
    pageNum: 1,
    pageSize: 20,
  };
};

const setRow = (row: any) => {
  console.log(formData.value);
  formData.value.inspectGroupId = row.id;
};

defineExpose({
  form: formRef,
  reset,
  setRow,
  fetchUserList,
  fetchUserTable,
});
</script>
<style lang="less" scoped>
.form-pack-rule-dtl {
  :deep .t-input-number {
    width: 100%;
  }
}

.custom-list-item {
  border-bottom: 1px solid #ddd;
}

.scorllTree {
  overflow-y: auto;
}

.selected-card {
  background-color: rgb(169 169 169 / 10%); /* 使用浅灰色，透明度为 0.3 */
}
</style>
`
