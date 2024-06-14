<template>
  <t-dialog v-model:visible="visible" header="工单切换" width="80%" prevent-scroll-through>
    <t-descriptions :column="2" colon>
      <t-descriptions-item label="机台编码">BU1-ZW-1001</t-descriptions-item>
      <t-descriptions-item label="机台描述">亚威数控折弯机01</t-descriptions-item>
    </t-descriptions>
    <cmp-table
      row-key="taskNumber"
      size="small"
      :table-column="column"
      :table-data="planList"
      :loading="loading"
      :show-pagination="false"
    >
      <template #title>
        <div>计划列表</div>
      </template>
      <template #op="{ row }">
        <t-button shape="circle" variant="text" theme="success" @click="addSelected(row)">
          <template #icon>
            <add-circle-icon />
          </template>
        </t-button>
      </template>
      <template #progress="{ row }">
        <div>报工:{{ row.reportCount }}/{{ row.reportTotal }}</div>
        <div>投料:{{ row.pickCount }}/{{ row.pickTotal }}</div>
      </template>
    </cmp-table>
    <cmp-table
      row-key="taskNumber"
      size="small"
      :table-column="column"
      :table-data="selectedList"
      :loading="loading"
      :show-pagination="false"
    >
      <template #title>
        <div>已选列表</div>
      </template>
      <template #op="{ row }">
        <t-button shape="circle" variant="text" theme="danger" @click="removeSelected(row)">
          <template #icon>
            <close-circle-icon />
          </template>
        </t-button>
      </template>
      <template #progress="{ row }">
        <div>报工:{{ row.reportCount }}/{{ row.reportTotal }}</div>
        <div>投料:{{ row.pickCount }}/{{ row.pickTotal }}</div>
      </template>
    </cmp-table>
    <template #footer>
      <t-button theme="primary" @click="visible = false">设备上机</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import { find, remove } from 'lodash';
import { AddCircleIcon, CloseCircleIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { useLang } from './lang';

// 使用多语言
const { t } = useLang();
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(['update:modelValue']);

const visible = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit('update:modelValue', val);
  },
});
const loading = ref(false);
const column = [
  { colKey: 'op', title: t('console.op'), width: 60, align: 'center' },
  { colKey: 'serial-number', title: t('business.main.serialNumber'), width: 60, align: 'center' },
  { colKey: 'taskNumber', title: t('console.taskNumber'), width: 100, align: 'center' },
  { colKey: 'planStartTime', title: t('console.planStartTime'), width: 100, align: 'center' },
  { colKey: 'productCode', title: t('business.control.productCode'), width: 100, align: 'center' },
  { colKey: 'productDesc', title: t('business.control.productDesc'), width: 100, align: 'center' },
  { colKey: 'productModel', title: t('console.productModel'), width: 100, align: 'center' },
  { colKey: 'progress', title: t('console.progress'), width: 100, align: 'center' },
  { colKey: 'uom', title: t('console.uom'), width: 100, align: 'center' },
];
const planList = ref([]);
const selectedList = ref([]);
const getPlanList = () => {
  // 获取当天计划，静态数据
  planList.value.push({
    taskNumber: 'MO-GC031（任务01）',
    planStartTime: '2024-05-20 08:00:00',
    productCode: '123232345',
    productDesc: '左右后轮置',
    productModel: '江系',
    reportCount: 250,
    reportTotal: 250,
    pickCount: 250,
    pickTotal: 250,
    uom: 'PCS ',
  });
  planList.value.push({
    taskNumber: 'MO-GC031（任务02）',
    planStartTime: '2024-05-20 12:00:00',
    productCode: '123232345',
    productDesc: '江淮车架R-01',
    productModel: '江系',
    reportCount: 0,
    reportTotal: 250,
    pickCount: 0,
    pickTotal: 250,
    uom: 'PCS ',
  });
};
const addSelected = (row: any) => {
  if (find(selectedList.value, ['taskNumber', row.taskNumber])) {
    MessagePlugin.error('该任务已选择');
    return;
  }
  selectedList.value.push(row);
};
const removeSelected = (row: any) => {
  remove(selectedList.value, ['taskNumber', row.taskNumber]);
};

onMounted(() => {
  getPlanList();
});
</script>
