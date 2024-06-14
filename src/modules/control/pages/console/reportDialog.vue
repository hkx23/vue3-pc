<template>
  <t-dialog v-model:visible="visible" header="报工&调整" width="80%" :footer="false" prevent-scroll-through>
    <cmp-table
      row-key="index"
      size="small"
      :table-column="reportColumn"
      :table-data="reportList"
      :loading="reportLoading"
      :show-pagination="false"
    >
      <template #complatedCountThisTime="{ row }">
        <t-input-number v-model="row.complatedCountThisTime" size="small" />
      </template>
    </cmp-table>
    <div class="report-footer">
      <t-button theme="default" @click="visible = false">取消</t-button>
      <t-button theme="primary">确认</t-button>
    </div>
    <t-tabs v-model="reportSelected">
      <t-tab-panel :value="1" label="配送卡打印">
        <t-descriptions :column="3" colon>
          <t-descriptions-item label="排产单号">M0001</t-descriptions-item>
          <t-descriptions-item label="排产数量">3000</t-descriptions-item>
          <t-descriptions-item label="完工数量">1000</t-descriptions-item>
          <t-descriptions-item label="已生成数量">800</t-descriptions-item>
          <t-descriptions-item label="本次打印数量">
            <t-input type="number" />
          </t-descriptions-item>
          <t-descriptions-item label="最小包装规格">
            <t-input type="number" />
          </t-descriptions-item>
          <t-descriptions-item label="打印模板">
            <t-select>
              <t-option label="配送卡打印模板" value="1" />
            </t-select>
          </t-descriptions-item>
          <t-descriptions-item :span="2">
            <div style="text-align: right">
              <t-button>打印</t-button>
            </div>
          </t-descriptions-item>
        </t-descriptions>
      </t-tab-panel>
      <t-tab-panel :value="2" label="周转容器綁定">
        <t-descriptions :column="3" colon>
          <t-descriptions-item label="排产单号">M0001</t-descriptions-item>
          <t-descriptions-item label="排产数量">3000</t-descriptions-item>
          <t-descriptions-item label="完工数量">1000</t-descriptions-item>
          <t-descriptions-item label="已生成数量">800</t-descriptions-item>
          <t-descriptions-item label="本次打印数量">
            <t-input type="number" />
          </t-descriptions-item>
          <t-descriptions-item label="容器规格">
            <t-input type="number" />
          </t-descriptions-item>
          <t-descriptions-item label="容器编码" :span="2">
            <t-input />
          </t-descriptions-item>
          <t-descriptions-item label="容器数量">
            <t-input type="number" />
          </t-descriptions-item>
          <t-descriptions-item>
            <div style="text-align: right">
              <t-button>绑定</t-button>
            </div>
          </t-descriptions-item>
        </t-descriptions>
      </t-tab-panel>
    </t-tabs>
  </t-dialog>
</template>

<script setup lang="ts">
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
const reportSelected = ref(1);
const reportLoading = ref(false);
const reportColumn = [
  { colKey: 'serial-number', title: t('business.main.serialNumber'), width: 60, align: 'center' },
  { colKey: 'moCode', title: t('console.moCode'), width: 100, align: 'center' },
  { colKey: 'moScheNo', title: t('console.moScheNo'), width: 100, align: 'center' },
  { colKey: 'mitemCode', title: t('business.main.mitemCode'), width: 100, align: 'center' },
  { colKey: 'mitemName', title: t('business.main.mitemName'), width: 100, align: 'center' },
  { colKey: 'taskCount', title: t('console.taskCount'), width: 100, align: 'center' },
  { colKey: 'complatedCountThisTime', title: t('console.complatedCountThisTime'), width: 120, align: 'center' },
  { colKey: 'ngCount', title: t('console.ngCount'), width: 100, align: 'center' },
  { colKey: 'complatedCount', title: t('console.complatedCount'), width: 100, align: 'center' },
];
const reportList = ref([]);
const getReportList = () => {
  // 获取当天计划，静态数据
  reportList.value.push({
    moCode: 'BCPJJ-001',
    moScheNo: 'BCPJJ-001-01',
    mitemCode: '5B2CHSR_AP31.11011.3',
    mitemName: '半成品检具',
    taskCount: 3000,
    complatedCountThisTime: 500,
    ngCount: 0,
    complatedCount: 200,
  });
  reportList.value.push({
    moCode: 'BCPJJ-002',
    moScheNo: 'BCPJJ-002-01',
    mitemCode: '5B2CHQR_F011104111',
    mitemName: '半成品检具',
    taskCount: 0,
    complatedCountThisTime: 0,
    ngCount: 0,
    complatedCount: 200,
  });
};

onMounted(() => {
  getReportList();
});
</script>

<style lang="less" scoped>
.report-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
</style>
