<template>
  <cmp-container :full="true" :full-sub-index="[0, 1]">
    <cmp-card :ghost="false">
      <bcmp-page-single
        v-if="settingObject && Object.keys(settingObject).length > 0"
        ref="mainRef"
        :page-setting="settingObject"
        :ghost="true"
        @row-click="onTableRowClick"
      >
      </bcmp-page-single>
    </cmp-card>
    <cmp-card :ghost="false">
      <bcmp-page-single
        v-if="detailSettingObject && Object.keys(detailSettingObject).length > 0"
        ref="detailRef"
        :page-setting="detailSettingObject"
        :ghost="true"
        :relate-condition="relateCondition"
      >
      </bcmp-page-single>
    </cmp-card>
  </cmp-container>
</template>
<script lang="ts">
export default {
  name: 'HeadWithDetail',
};
</script>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { api } from '@/api/main';

const settingObject = ref({});
const detailSettingObject = ref({});
const relateCondition = ref([]);
const detailRef = ref();

const loadSetting = () => {
  // 渲染表格列配置
  const route = useRoute();
  const { domainParamId } = route.query;
  if (!domainParamId) {
    return;
  }

  api.domainParam.getItemById({ id: domainParamId.toString() }).then(async (res: any) => {
    settingObject.value = res;
    // 获取主要信息
    const detailSettingId = '1821092664252383234';
    await api.domainParam.getItemById({ id: detailSettingId }).then(async (res: any) => {
      detailSettingObject.value = res;
    });
  });
};
const onTableRowClick = async (row) => {
  // 点击行,设置管理数据
  const relateConditionCurr = [
    {
      tableName: 'e_maintenance_plan_item',
      field: 'e_maintenance_plan_id',
      operator: 'EQ',
      value: row.ID || row.id,
    },
  ];
  relateCondition.value = relateConditionCurr;
  // 等待 DOM 更新完成
  await nextTick();
  detailRef.value.fetchTable();
};

// 渲染函数
onMounted(() => {
  loadSetting();
});
</script>
<style lang="less" scoped>
:deep(.t-form__controls-content) {
  .t-date-picker,
  .t-input-number,
  .t-color-picker__trigger {
    width: 100%;
  }
}
</style>
