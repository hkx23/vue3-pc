<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card flex="400px">
        <t-input v-model="formData.keyword" clearable @enter="fetchUserList" @clear="fetchUserList">
          <template #suffixIcon>
            <search-icon :style="{ cursor: 'pointer' }" @click="fetchUserList" />
          </template>
        </t-input>
        <t-list style="margin-top: 20px">
          <t-list-item
            v-for="(item, index) in listItems"
            :key="index"
            class="custom-list-item"
            :class="{ 'selected-card': item.isAdd }"
          >
            <span style="margin-top: 8px; margin-bottom: 8px; width: 30%">{{ item.personCode }}</span>
            <span style="margin-top: 8px; margin-bottom: 8px; width: 30%">{{ item.personName }}</span>

            <template #action>
              <plus-icon theme="primary" @click="onAddUser(item)" />
            </template>
          </t-list-item>
        </t-list>
      </cmp-card>
      <cmp-card flex="auto">
        <cmp-container :full="true" style="padding: 0">
          <cmp-card :ghost="true">
            <cmp-table
              ref="tableRef"
              v-model:pagination="pageUI"
              row-key="id"
              :table-column="tableColumns"
              :table-data="moduleData"
              :total="tabTotal"
              :fixed-height="true"
              :selected-row-keys="userRowKeys"
              style="height: 420px"
              @select-change="onSelectedChange"
              @refresh="fetchUserTable"
            >
              <template #title> {{ t('inspectGroup.tableSubLeftTitle') }} </template>
              <template #button>
                <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelBatch">
                  <t-button :disabled="userRowKeys.length < 1" theme="default">
                    {{ t('common.button.batchDelete') }}</t-button
                  >
                </t-popconfirm>
              </template>
              <template #op="{ row }">
                <t-space>
                  <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDeleteRowClick(row)">
                    <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
                  </t-popconfirm>
                </t-space>
              </template>
            </cmp-table>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>
<script lang="ts">
export default {
  name: 'FormPackRule',
};
</script>
<script setup lang="ts">
import { PlusIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { FormInstanceFunctions, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { Ref, ref } from 'vue';

import { api as apiQuality } from '@/api/quality';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { setLoading: setLoadingUser } = useLoading();
const { t } = useLang();
const { pageUI } = usePage();
const listItems = ref([]);
const userRowKeys: Ref<any[]> = ref([]); //
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('inspectGroup.jobNo')}`, width: 150, colKey: 'personCode' },
  { title: `${t('inspectGroup.name')}`, width: 150, colKey: 'personName' },
  { title: `${t('common.button.operation')}`, align: 'left', fixed: 'right', width: 80, colKey: 'op' },
];
const moduleData = ref([]);
const tabTotal = ref(0);
const formRef: Ref<FormInstanceFunctions> = ref(null);
const onSelectedChange = (value: any) => {
  userRowKeys.value = value;
};
const formData = ref({
  inspectGroupId: '',
  keyword: '',
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
      pageSize: pageUI.value.rows,
      inspectGroupId: formData.value.inspectGroupId,
    })) as any;
    moduleData.value = data.list;
    tabTotal.value = data.total;
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
      keyword: formData.value.keyword,
      inspectGroupId: formData.value.inspectGroupId,
    })) as any;
    listItems.value = data;
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
  fetchUserTable();
  fetchUserList();
};
const onDelBatch = async () => {
  await apiQuality.inspectGroupInUser.delByIds(userRowKeys.value);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchUserTable();
  fetchUserList();
};
const onAddUser = async (item) => {
  if (item.isAdd) {
    return;
  }
  await apiQuality.inspectGroupInUser.add({ ...item, inspectGroupId: formData.value.inspectGroupId });
  MessagePlugin.success(t('common.message.addSuccess'));
  fetchUserTable();
  fetchUserList();
};

const reset = () => {
  formData.value = {
    inspectGroupId: '',
    keyword: '',
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

.selected-card {
  background-color: rgb(169 169 169 / 10%); /* 使用浅灰色，透明度为 0.3 */
}
</style>
`
