<template>
  <t-form :rules="FORM_RULES" :form-data="formData" :show-cancel="true">
    <t-form-item label="上一层级" name="parentLevelId">
      {{ formData.parentLevelId ? formData.parentLevelName : 'ROOT' }}
    </t-form-item>
    <t-form-item label="组织层级名称" name="levelCode">
      <t-select v-model="formData.levelCode" clearable>
        <t-option v-for="(item, index) in orgLevelOptions" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-select>
    </t-form-item>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'OrgLevelForm',
};
</script>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

import { getOrgLevelDic } from '../../api/orgLevel';

const FORM_RULES = { levelCode: [{ required: true, message: '组织层级名称必选' }] };

const formData = reactive({
  parentLevelId: '',
  parentLevelName: '',
  levelCode: '',
});
const orgLevelOptions = ref([] as { value: string; label: string }[]);

onMounted(() => {
  fetchOrgLevelDic();
});

const fetchOrgLevelDic = async () => {
  const list = await getOrgLevelDic();
  orgLevelOptions.value = list;
};
</script>
<style lang="less" scoped></style>
`
