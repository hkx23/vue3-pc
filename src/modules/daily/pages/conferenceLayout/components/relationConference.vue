<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="formHeader"
    placement="top"
    top="56px"
    width="65%"
    :cancel-btn="null"
    :confirm-btn="null"
    :close-on-overlay-click="false"
  >
    <t-space :key="loadingCount" direction="vertical">
      <t-space :break-line="true" :style="{ height: '480px', 'overflow-y': 'scroll' }">
        <t-radio-group v-model="selectConference">
          <div v-for="item in conferenceIndexData" :key="item" class="image-item">
            <t-image :src="item.indexIconPath" :style="{ width: '300px', height: '140px' }" :lazy="true" />
            <t-radio :key="item.id" :label="item.indexName" :value="item.id" />
          </div>
        </t-radio-group>
      </t-space>
    </t-space>
    <template #footer>
      <t-button theme="primary" @click="confirm">{{ t('common.button.confirm') }}</t-button>
      <t-button theme="default" @click="formVisible = false">{{ t('common.button.cancel') }}</t-button>
    </template>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'RelationConference',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { ref } from 'vue';

import { api as apiDaily, ConferenceIndexVO } from '@/api/daily';

import { useLang } from '../../conferenceLayout/lang';

const { t } = useLang();
const loadingCount = ref(0);
const selectConference = ref([]);
const Emit = defineEmits(['parent-refresh-event']);

const confirm = () => {
  formVisible.value = false;
  Emit('parent-refresh-event', true);
};

const reset = () => {
  console.log('reset');
};
const formVisible = ref(false);
const formHeader = ref('');
// 初始化图片信息
const initGrid = () => {
  reset();
  formHeader.value = t('conferenceLayout.关联指标信息');
  formVisible.value = true;
  // 获取指标列表信息
  getConferenceList();
};
// table数据
const conferenceIndexData = ref<ConferenceIndexVO[]>([]);
const getConferenceList = async () => {
  const res = await apiDaily.conferenceIndex.list({
    pageNum: 1,
    pageSize: 9999,
  });
  if (res) {
    conferenceIndexData.value = res.list;
  }
};

defineExpose({
  initGrid,
});
</script>
<style lang="less" scoped>
.image-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  margin: 12px;
  border: 1px solid rgb(63 93 237 / 20%);
  overflow-wrap: break-word;
  box-shadow: 0 3px 6px rgb(0 0 0 / 10%);
  border-radius: 8px;
  scrollbar-width: thin;
}

:deep(.t-radio) {
  margin-top: 12px !important;
}
</style>
`
