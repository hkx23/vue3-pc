<template>
  <t-drawer
    v-model:visible="visible"
    header="抄送人设置"
    size="550px"
    class="set_copyer"
    :close-btn="true"
    :footer="false"
    @close="saveCopyer"
  >
    <t-space direction="vertical" style="width: 100%">
      <bcmp-select-business
        v-model="defaultCopyer"
        is-multiple
        type="person"
        title="添加人员"
        @selection-change="sureCopyer"
      ></bcmp-select-business>
      <t-checkbox v-model="ccSelfSelectFlag">允许发起人自选抄送人</t-checkbox>
    </t-space>
  </t-drawer>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { useStore } from '../store';
import $func from '../utils/index';

const defaultCopyer = ref('');

const copyerConfig = ref({});
const ccSelfSelectFlag = ref(true);
const store = useStore();
const { setCopyerConfig, setCopyer } = store;
const copyerDrawer = computed(() => store.copyerDrawer);
const copyerConfig1 = computed(() => store.copyerConfig1);
const visible = computed({
  get() {
    return copyerDrawer.value;
  },
  set() {
    closeDrawer();
  },
});
watch(copyerConfig1, (val) => {
  copyerConfig.value = val.value;
  ccSelfSelectFlag.value = !!copyerConfig.value.ccSelfSelectFlag;
});

const sureCopyer = (data) => {
  copyerConfig.value.nodeUserList = data.map((t) => ({
    label: t.personName,
    value: t.id,
  }));
};
const saveCopyer = () => {
  copyerConfig.value.ccSelfSelectFlag = ccSelfSelectFlag.value ? 1 : 0;
  copyerConfig.value.error = !$func.copyerStr(copyerConfig.value);
  setCopyerConfig({
    value: copyerConfig.value,
    flag: true,
    id: copyerConfig1.value.id,
  });
  closeDrawer();
};
const closeDrawer = () => {
  setCopyer(false);
};
</script>

<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less">
.set_copyer {
  .copyer_content {
    padding: 20px 20px 0;

    .el-button {
      margin-bottom: 20px;
    }

    .el-checkbox {
      margin-bottom: 20px;
    }
  }
}
</style>
