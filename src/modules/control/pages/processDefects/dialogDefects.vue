<template>
  <t-dialog
    v-model:visible="visible"
    :header="t('processDefects.defectList')"
    top="56px"
    width="850px"
    :confirm-btn="{
      content: '添加',
      theme: 'primary',
      loading: saveLoading,
    }"
    :confirm-on-enter="true"
    :on-confirm="onConfirmAnother"
  >
    <t-space direction="vertical" style="width: 100%">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="columns"
        :table-data="defectData"
        :loading="loading"
        :total="total"
        max-height="300"
        :selected-row-keys="selectedRowKeys"
        @refresh="fetchdefectData"
        @select-change="rehandleSelectChange"
      >
        <template #title>
          <cmp-query :opts="opts" :show-button="false" @submit="onInput"> </cmp-query>
        </template>
      </cmp-table>
    </t-space>
  </t-dialog>
</template>

<script setup lang="tsx">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ref, watch } from 'vue';

import { api, ProcessInDefectDTO } from '@/api/control';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();
const emit = defineEmits(['update:modelValue', 'submitResult']);
const props = defineProps({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const defectData = ref([]);
const selectedRowKeys = ref([]);
const keyWord = ref('');
const loading = ref(false);
const saveLoading = ref(false);
const total = ref(10);
const { pageUI } = usePage();
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    checkProps: ({ row }) => ({ disabled: row.default }),
  },
  { colKey: 'defectCode', title: '缺陷代码' },
  { colKey: 'defectName', title: '缺陷名称', ellipsis: true },
];

// input框搜索
const opts = computed(() => {
  return {
    keyWord: {
      label: '缺陷',
      placeholder: '请输入缺陷名称或编码',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});
const onInput = (data) => {
  pageUI.value.page = 1;
  keyWord.value = data.keyWord;
  fetchdefectData();
};
// 加载缺陷数据表格
const fetchdefectData = async () => {
  loading.value = true;
  try {
    // 按用户获取用户与组织关系数据
    const res = (await api.processInDefectCode.getNotRelateList({
      processId: props.id,
      keyWord: keyWord.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    })) as any;
    defectData.value = res.list;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
const rehandleSelectChange = (value, { selectedRowData }) => {
  selectedRowKeys.value = value;
  console.log(value, selectedRowData);
};
const onConfirmAnother = (context) => {
  saveLoading.value = true;
  console.log('点击了确认按钮', context);
  if (selectedRowKeys.value.length === 0) {
    MessagePlugin.error(t('processDefects.setUserDefectsEmpty'));
    saveLoading.value = false;
    return;
  }
  const defectDatas: ProcessInDefectDTO = {
    processId: props.id,
    defectIds: selectedRowKeys.value,
  };

  api.processInDefectCode
    .batchAdd(defectDatas)
    .then(() => {
      MessagePlugin.success(t('processDefects.setUserDefectsSuccess'));
      fetchdefectData();
      selectedRowKeys.value = [];
      saveLoading.value = false;
      visible.value = false;
      emit('submitResult', true);
    })
    .catch((err) => {
      MessagePlugin.error(err.message);
      selectedRowKeys.value = [];
      saveLoading.value = false;
    });
};

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit('update:modelValue', val);
  },
});

watch(visible, (value: boolean) => {
  if (value && props.id) {
    // @ts-ignore
    // 打开时候加载数据
    fetchdefectData();
  }
});
</script>

<style lang="less" scoped></style>
