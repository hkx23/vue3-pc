<template>
  <t-dialog
    v-model:visible="formVisible"
    header="点检清单项目"
    width="600px"
    placement="top"
    top="56px"
    cancel-btn="取消"
    confirm-btn="提交"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
  >
    <cmp-container :full="true" :ghost="true">
      <cmp-card :span="12" :ghost="true">
        <t-descriptions :column="1" bordered>
          <t-descriptions-item label="点检清单名称" :content="formData.checklistName" />
          <t-descriptions-item label="项目代码">
            <bcmp-select-business
              v-model="formData.checkItemId"
              type="checkItem"
              :show-title="false"
              @selection-change="onCheckItemSelectChange"
            />
          </t-descriptions-item>
          <t-descriptions-item label="项目名称" :content="formData.itemName" />
          <t-descriptions-item label="项目类型" :content="formData.itemTypeName" />
          <t-descriptions-item label="项目描述" :content="formData.itemDesc" />
          <t-descriptions-item label="执行开始时间">
            <t-time-picker v-model="formData.executeBeginTime" format="HH:mm" />
          </t-descriptions-item>
          <t-descriptions-item label="执行结束时间">
            <t-time-picker v-model="formData.executeEndTime" format="HH:mm" />
          </t-descriptions-item>
        </t-descriptions>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>
<script lang="ts" setup>
import _ from 'lodash';
import { FormInstanceFunctions, LoadingPlugin, MessagePlugin } from 'tdesign-vue-next';
import { reactive, Ref, ref } from 'vue';

import { api as apiDaily } from '@/api/daily';
import common from '@/utils/common';

// const { t } = useLang();
// import { useLang } from './lang';

const Emit = defineEmits(['parent-refresh-event', 'form-close-event']);

const formVisible = ref(false);

const formRef: Ref<FormInstanceFunctions> = ref(null);

const isEdit = ref(true); // 是否可编辑

const formData = reactive({
  checkItemId: '',
  checklistId: '',
  checklistCode: '',
  checklistName: '',
  itemId: '',
  itemCode: '',
  itemName: '',
  itemDesc: '',
  itemTypeName: '',
  executeBeginTime: '',
  executeEndTime: '',
});

const onConfirmForm = async () => {
  try {
    if (_.isEmpty(formData.itemCode)) {
      MessagePlugin.error('请选择项目');
      return;
    }
    if (_.isEmpty(formData.executeBeginTime)) {
      MessagePlugin.error('请选择执行开始时间');
      return;
    }
    if (_.isEmpty(formData.executeEndTime)) {
      MessagePlugin.error('请选择执行结束时间');
      return;
    }

    LoadingPlugin(true);

    if (isEdit.value) {
      await apiDaily.checklistItem.update({
        checklistId: formData.checklistId,
        checkItemId: formData.checkItemId,
        executeBeginTime: formData.executeBeginTime,
        executeEndTime: formData.executeEndTime,
      });
    } else {
      await apiDaily.checklistItem.insert({
        checklistId: formData.checklistId,
        checkItemId: formData.checkItemId,
        executeBeginTime: formData.executeBeginTime,
        executeEndTime: formData.executeEndTime,
      });
    }

    Emit('parent-refresh-event');
    formVisible.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    LoadingPlugin(false);
  }
};

const showForm = async (edit, row) => {
  formVisible.value = true;
  isEdit.value = edit;
  common.reset(formData);

  formData.checklistId = row.id;
  formData.checklistCode = row.checklistCode;
  formData.checklistName = row.checklistName;
};

const onCheckItemSelectChange = async (row) => {
  formData.itemId = row.id;
  formData.itemCode = row.itemCode;
  formData.itemName = row.itemName;
  formData.itemDesc = row.itemDesc;
  formData.itemTypeName = row.itemTypeName;
};

defineExpose({
  form: formRef,
  showForm,
});
</script>
<style lang="less" scoped>
:deep .t-dialog__body {
  padding: 0 !important;
}

:deep .t-dialog {
  background: var(--td-bg-color-page) !important;
}

:deep .t-tabs__nav-container {
  margin-top: 5px;
}

:deep .t-tabs__operations {
  top: 0;
  border-bottom: 0;
}

.showHourMinutes {
  :deep .t-date-picker__panel-date {
    display: none !important;
  }
}
</style>
