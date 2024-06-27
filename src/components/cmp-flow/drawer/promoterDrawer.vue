<template>
  <t-drawer
    v-model:visible="visible"
    header="发起人"
    size="550px"
    class="set_promoter"
    :close-btn="true"
    :footer="false"
    @close="savePromoter"
  >
    <t-space direction="vertical" style="width: 100%">
      <t-alert theme="info" message="选择能发起该审批的角色，不选则默认开放给所有人"></t-alert>
      <bcmp-select-business
        v-model="defaultPromoter"
        is-multiple
        type="role"
        title="添加/修改发起角色"
        @selection-change="surePromoter"
      ></bcmp-select-business>
    </t-space>
  </t-drawer>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useStore } from '../store';

const defaultPromoter = ref('');
const flowPermission = ref([]);

const store = useStore();
const { setPromoter, setFlowPermission } = store;
const promoterDrawer = computed(() => store.promoterDrawer);
const flowPermission1 = computed(() => store.flowPermission1);
const visible = computed({
  get() {
    return promoterDrawer.value;
  },
  set() {
    closeDrawer();
  },
});
watch(flowPermission1, (val) => {
  if (val.value) defaultPromoter.value = val.value.map((t) => t.value).join(',');
});

const surePromoter = (data) => {
  flowPermission.value = data;
};
const savePromoter = () => {
  setFlowPermission({
    value: flowPermission.value,
    flag: true,
    id: flowPermission1.value.id,
  });
  closeDrawer();
};
const closeDrawer = () => {
  setPromoter(false);
};
</script>
<style lang="less" scoped></style>
