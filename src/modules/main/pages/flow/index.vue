<template>
  <cmp-flow
    v-if="isShowFlow"
    :template-data="templateData"
    :group-list="groupList"
    @back="onClickBack"
    @save="onClickSave"
  />
  <cmp-container v-show="!isShowFlow">
    <div class="flow-header">
      <div style="width: 250px">
        <t-input v-model="keyword" placeholder="搜索流程"></t-input>
      </div>
      <div class="toolbar">
        <t-button theme="primary" @click="onClickNewForm">新建表单</t-button>
      </div>
    </div>
    <cmp-card v-for="group in data" :key="group.name" :title="group.name">
      <t-list :split="true">
        <t-list-item v-for="item in group.items" :key="item.id" class="process-item">
          <t-space>
            <div class="process-icon"><git-merge-icon /></div>
            <div
              :class="{
                name: true,
                disabled: !item.state,
              }"
            >
              {{ item.processName }}
            </div>
            <div class="desc">{{ item.processDesc }}</div>
          </t-space>
          <template #action>
            <t-space>
              <t-link theme="primary" @click="onClickEditForm(item)">编辑</t-link>
              <t-link theme="primary" @click="onClickStopForm(item)">{{ item.state ? '停用' : '启用' }}</t-link>
              <t-link theme="primary" @click="onClickMoveForm(item)">移动</t-link>
            </t-space>
          </template>
        </t-list-item>
      </t-list>
      <t-dialog v-model:visible="isShowMoveDialog" header="移动流程分组" :on-confirm="onConfirmMove">
        <t-select v-model="targetGroup">
          <t-option v-for="item in groupList" :key="item" :value="item" :label="item"></t-option>
        </t-select>
      </t-dialog>
    </cmp-card>
  </cmp-container>
</template>
<script lang="ts">
export default {
  name: 'Flow',
};
</script>
<script setup lang="ts">
import { debounce } from 'lodash';
import { GitMergeIcon } from 'tdesign-icons-vue-next';
import { onMounted, ref, watch } from 'vue';

import { api, ProcessTmpl } from '@/api/main';
import cmpFlow from '@/components/cmp-flow/index.vue';

onMounted(() => {
  fetchData();
});

const keyword = ref('');
watch(
  keyword,
  debounce(() => {
    fetchData();
  }, 500),
);

const templateData = ref<ProcessTmpl>();
const data = ref<{ name: string; items: ProcessTmpl[] }[]>([]);
const fetchData = async () => {
  // api
  const templates = await api.flow.templates({ keyword: keyword.value });

  const groupData = {};
  templates.forEach((item) => {
    if (item.processGroup) {
      if (!groupData[item.processGroup]) {
        groupData[item.processGroup] = { name: item.processGroup, items: [] };
      }
      groupData[item.processGroup].items.push(item);
    } else {
      groupData['其他'] = groupData['其他'] || { name: '其他', items: [] };
      groupData['其他'].items.push(item);
    }
  });
  data.value = Object.values(groupData);
  groupList.value = Object.keys(groupData);
};

const isShowMoveDialog = ref(false);
const isShowFlow = ref(false);
const isEdit = ref(false);
const groupList = ref<string[]>([]);
const targetGroup = ref('');
const currentProcess = ref<ProcessTmpl>();
const onClickSave = async (templateBody) => {
  templateData.value.processTmplBody = JSON.stringify(templateBody);

  if (isEdit.value) {
    await api.flow.updateProcessTmpl(templateData.value);
  } else {
    await api.flow.addProcessTmpl(templateData.value);
  }
  isShowFlow.value = false;
  fetchData();
};
const onClickBack = () => {
  isShowFlow.value = false;
};
const onClickNewForm = () => {
  isEdit.value = false;
  isShowFlow.value = true;
  templateData.value = {
    processName: '未命名流程',
    processGroup: '其他',
    processDesc: '',
    processTmplBody: '',
  };
};
const onClickEditForm = (data: ProcessTmpl) => {
  currentProcess.value = data;
  isEdit.value = true;
  isShowFlow.value = true;
  templateData.value = data;
};
const onClickStopForm = async (data: ProcessTmpl) => {
  await api.flow.updateProcessTmplStatus({ id: data.id, status: data.state ? 0 : 1 });
  fetchData();
};
const onClickMoveForm = (data: ProcessTmpl) => {
  currentProcess.value = data;
  targetGroup.value = data.processGroup || '其他';
  isShowMoveDialog.value = true;
};

const onConfirmMove = async () => {
  await api.flow.updateProcessTmplGroup({ id: currentProcess.value.id, group: targetGroup.value });
  isShowMoveDialog.value = false;
  fetchData();
};
</script>

<style lang="less" scoped>
.flow-header {
  position: relative;
  margin: 8px;

  .toolbar {
    position: absolute;
    top: 0;
    right: 16px;
  }
}

.process-item {
  &:hover {
    background-color: var(--td-bg-color-container-hover);
    cursor: default;

    .name {
      font-weight: 700;
    }
  }

  .process-icon {
    width: 24px;
    height: 24px;
    display: inline-block;
    border-radius: 6px;
    background-color: #1976d2;
    color: #fff;
    font-size: 16px;
    text-align: center;
  }

  .name {
    margin-right: 16px;
  }

  .desc {
    color: #999;
    font-size: 12px;
  }

  .disabled {
    color: #999;
  }
}
</style>
