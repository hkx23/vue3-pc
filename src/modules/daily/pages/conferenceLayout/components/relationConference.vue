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
    <cmp-container :full="true" class="root">
      <cmp-row>
        <t-space :break-line="true" :style="{ height: '480px', 'overflow-y': 'scroll', 'scrollbar-width': 'thin' }">
          <t-radio-group v-model="selectConference" class="group-container">
            <div v-for="item in conferenceIndexData" :key="item.id" class="image-item">
              <t-image :src="item.fileSignedUrl" :style="{ width: '300px', height: '140px' }" :lazy="true" />
              <t-radio :key="item.id" :label="item.indexName" :value="item.id"></t-radio>
            </div>
          </t-radio-group>
        </t-space>
      </cmp-row>
    </cmp-container>
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
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import { api as apiDaily, ConferenceIndexVO } from '@/api/daily';
import commmon from '@/utils/common';

import { useLang } from '../../conferenceLayout/lang';

const { t } = useLang();
const selectConference = ref('');
const itemId = ref('');
const Emit = defineEmits(['parent-refresh-event']);

const confirm = () => {
  if (selectConference.value && selectConference.value.length === 0) {
    MessagePlugin.error(t('conferenceLayout.请先选择指标'));
    return;
  }
  formVisible.value = false;
  const rowData = conferenceIndexData.value.find((x) => x.id === selectConference.value);
  Emit('parent-refresh-event', rowData, itemId.value);
};

const reset = () => {
  console.log('reset');
  selectConference.value = '';
  itemId.value = '';
};
const formVisible = ref(false);
const formHeader = ref('');
// 初始化图片信息
const initGrid = (id: string) => {
  reset();
  itemId.value = id;
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
    conferenceIndexData.value.forEach((item) => {
      if (item.indexIconPath) {
        getSignedUrl(item);
      }
    });
  }
};

// 获取缩率图地址
const getSignedUrl = async (item: any) => {
  item.fileSignedUrl = (await commmon.getSignedUrl(item.indexIconPath)) as string;
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

.group-container {
  display: flex;
  justify-content: space-around;
}
</style>
`
