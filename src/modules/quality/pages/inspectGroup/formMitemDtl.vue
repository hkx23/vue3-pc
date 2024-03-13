<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card flex="400px">
        <t-input
          v-model="formData.keyword"
          clearable
          @change="fetchCategoryInputList"
          @enter="fetchCategoryInputList"
          @clear="fetchCategoryInputList"
        >
          <template #suffixIcon>
            <search-icon :style="{ cursor: 'pointer' }" @click="fetchCategoryInputList" />
          </template>
        </t-input>
        <t-list
          :style="{ 'max-height': '430px' }"
          style="margin-top: 20px"
          :async-loading="asyncLoading"
          split
          @load-more="scrollHandler"
        >
          <t-list-item
            v-for="(item, index) in listItems"
            :key="index"
            class="custom-list-item"
            :class="{ 'selected-card': item.isAdd }"
          >
            <span style="margin-top: 8px; margin-bottom: 8px; width: 30%">{{ item.categoryCode }}</span>
            <span style="margin-top: 8px; margin-bottom: 8px; width: 30%">{{ item.categoryName }}</span>

            <template #action>
              <plus-icon theme="primary" @click="onAddMitem(item)" />
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
              :selected-row-keys="mitemRowKeys"
              style="height: 420px"
              @select-change="onSelectedChange"
              @refresh="fetchMitemTable"
            >
              <template #title> {{ t('business.main.mitemCategoryCode') }} </template>
              <template #button>
                <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelBatch">
                  <t-button :disabled="mitemRowKeys.length < 1" theme="default">
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
import { debounce } from 'lodash';
import { PlusIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { FormInstanceFunctions, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, Ref, ref } from 'vue';

import { api as apiQuality } from '@/api/quality';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { setLoading: setLoadingUser } = useLoading();
const { t } = useLang();
const { pageUI } = usePage();
const asyncLoadingRadio = ref('load-more');
const totals = ref<number>(0); // 用户分页总数
const asyncLoading = computed(() => {
  if (asyncLoadingRadio.value === 'loading-custom') {
    return '没有更多数据了~';
  }
  return asyncLoadingRadio.value;
});
// 点击加载更多
const scrollHandler = debounce(async () => {
  asyncLoadingRadio.value = 'loading';
  formData.value.pageNum++;
  await fetchCategoryList();
  asyncLoadingRadio.value = 'load-more';
  if (listItems.value.length >= totals.value) {
    asyncLoadingRadio.value = 'loading-custom';
  }
}, 1000);
const listItems = ref([]);
const mitemRowKeys: Ref<any[]> = ref([]); //
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', type: 'multiple', width: 40, fixed: 'left' },
  { title: `${t('inspectGroup.mitemCategoryCode')}`, width: 100, colKey: 'categoryCode' },
  { title: `${t('inspectGroup.mitemCategoryName')}`, width: 100, colKey: 'categoryName' },
  { title: `${t('common.button.operation')}`, align: 'left', fixed: 'right', width: 80, colKey: 'op' },
];
const moduleData = ref([]);
const tabTotal = ref(0);
const formRef: Ref<FormInstanceFunctions> = ref(null);
const onSelectedChange = (value: any) => {
  mitemRowKeys.value = value;
};
const formData = ref({
  inspectGroupId: '',
  keyword: '',
  pageNum: 1,
  pageSize: 20,
});

// 加载组内物料关联明细表格
const fetchMitemTable = async () => {
  if (!formData.value.inspectGroupId) {
    clearMitemTable();
    return;
  }
  try {
    setLoadingUser(true);
    const data = (await apiQuality.inspectGroupInMitem.getList({
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
// 加载物料关联明细表格
const fetchCategoryList = async () => {
  if (!formData.value.inspectGroupId) {
    return;
  }
  try {
    setLoadingUser(true);
    const data = (await apiQuality.inspectGroupInMitem.getCategoryList({
      pageNum: formData.value.pageNum,
      pageSize: formData.value.pageSize,
      keyword: formData.value.keyword,
      inspectGroupId: formData.value.inspectGroupId,
    })) as any;
    listItems.value = [...listItems.value, ...data.list];
    totals.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingUser(false);
  }
};
// 加载物料关联明细表格
const fetchCategoryInputList = async () => {
  if (!formData.value.inspectGroupId) {
    return;
  }
  try {
    formData.value.pageNum = 1;
    formData.value.pageSize = 20;
    setLoadingUser(true);
    const data = (await apiQuality.inspectGroupInMitem.getCategoryList({
      pageNum: formData.value.pageNum,
      pageSize: formData.value.pageSize,
      keyword: formData.value.keyword,
      inspectGroupId: formData.value.inspectGroupId,
    })) as any;
    listItems.value = data.list;
    totals.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoadingUser(false);
  }
};

// 清除物料关联明细表格
const clearMitemTable = async () => {
  moduleData.value = [];
};

const onDeleteRowClick = async (row) => {
  await apiQuality.inspectGroupInMitem.delByIds([row.id]);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchMitemTable();
  fetchCategoryList();
};
const onDelBatch = async () => {
  await apiQuality.inspectGroupInMitem.delByIds(mitemRowKeys.value);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchMitemTable();
  fetchCategoryList();
};
const onAddMitem = async (item) => {
  if (item.isAdd) {
    return;
  }
  await apiQuality.inspectGroupInMitem.add({ mitemCategoryId: item.id, inspectGroupId: formData.value.inspectGroupId });
  MessagePlugin.success(t('common.message.addSuccess'));
  fetchMitemTable();
  fetchCategoryInputList();
};

const reset = () => {
  listItems.value = [];
  tabTotal.value = 0;
  formData.value = {
    inspectGroupId: '',
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
  fetchCategoryList,
  fetchMitemTable,
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
