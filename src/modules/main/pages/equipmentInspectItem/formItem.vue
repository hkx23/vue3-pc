<template>
  <t-dialog
    v-model:visible="formVisible"
    header="点检项目资产"
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
          <t-descriptions-item label="点检项目编码" :content="formData.inspectItemCode" />
          <t-descriptions-item label="点检项目名称" :content="formData.inspectItemName" />
          <t-descriptions-item label="关联资产类型">
            <bcmp-select-business v-model="formData.assetTypeId" type="assetType" :show-title="false" />
          </t-descriptions-item>
          <t-descriptions-item label="关联资产品牌">
            <bcmp-select-business
              v-model="formData.assetBrandId"
              type="assetBrand"
              :parent-id="formData.assetTypeId"
              :show-title="false"
            />
          </t-descriptions-item>
          <t-descriptions-item label="关联资产型号">
            <bcmp-select-business
              v-model="formData.assetModelId"
              type="assetModel"
              :parent-id="formData.assetBrandId"
              :show-title="false"
            />
          </t-descriptions-item>
        </t-descriptions>
      </cmp-card>
    </cmp-container>
  </t-dialog>
</template>
<script lang="ts" setup>
import _ from 'lodash';
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { reactive, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import BcmpSelectBusiness from '@/components/bcmp-select-business/index.vue';
import utils from '@/utils/common';

const Emit = defineEmits(['parent-refresh-event', 'form-close-event']);

const formVisible = ref(false);

const formRef: Ref<FormInstanceFunctions> = ref(null);

const isEdit = ref(true); // 是否可编辑

const formData = reactive({
  id: '',
  inspectItemId: '',
  inspectItemCode: '',
  inspectItemName: '',
  assetTypeId: '',
  assetBrandId: '',
  assetModelId: '',
});

const onConfirmForm = async () => {
  try {
    if (_.isEmpty(formData.inspectItemId)) {
      MessagePlugin.error('请选择点检项目');
      return;
    }
    if (_.isEmpty(formData.assetTypeId)) {
      MessagePlugin.error('请选择资产类型');
      return;
    }
    if (_.isEmpty(formData.assetBrandId)) {
      MessagePlugin.error('请选择资产品牌');
      return;
    }
    if (_.isEmpty(formData.assetModelId)) {
      MessagePlugin.error('请选择资产型号');
      return;
    }

    utils.loadingPluginFullScreen(true);

    if (isEdit.value) {
      await apiMain.inspectItemInEquipment.update({
        id: formData.id,
        inspectItemId: formData.inspectItemId,
        assetTypeId: formData.assetTypeId,
        assetBrandId: formData.assetBrandId,
        assetModelId: formData.assetModelId,
      });
    } else {
      await apiMain.inspectItemInEquipment.insert({
        inspectItemId: formData.inspectItemId,
        assetTypeId: formData.assetTypeId,
        assetBrandId: formData.assetBrandId,
        assetModelId: formData.assetModelId,
      });
    }

    Emit('parent-refresh-event');
    formVisible.value = false;
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
  }
};

const showForm = async (edit, row) => {
  formVisible.value = true;
  isEdit.value = edit;
  utils.reset(formData);

  formData.inspectItemId = row.id;
  formData.inspectItemCode = row.inspectItemCode;
  formData.inspectItemName = row.inspectItemName;
};

// const onCheckItemSelectChange = async (row) => {
//   formData.itemId = row.id;
//   formData.itemCode = row.itemCode;
//   formData.itemName = row.itemName;
//   formData.itemDesc = row.itemDesc;
//   formData.itemTypeName = row.itemTypeName;
// };

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
