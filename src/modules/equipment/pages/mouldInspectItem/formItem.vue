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
            <t-radio-group v-model="formData.relateType" :options="options" @change="onChange"></t-radio-group>
          </t-descriptions-item>
          <t-descriptions-item v-if="formData.relateType === 'mouldType'" label="关联模具类型">
            <bcmp-select-param
              v-model="formData.mouldType"
              placeholder="请选择关联模具类型"
              param-group="E_MOULD_TYPE"
            ></bcmp-select-param>
          </t-descriptions-item>
          <t-descriptions-item v-if="formData.relateType === 'mould'" label="关联模具">
            <bcmp-select-business
              v-model="formData.mouldId"
              type="mould"
              placeholder="请选择关联模具"
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

import { api as apiEquimpent } from '@/api/equipment';
// import { api as apiMain } from '@/api/main';
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
  relateType: '',
  mouldType: '',
  mouldId: '',
});

const options = ref([
  {
    value: 'mouldType',
    label: '关联模具类型',
  },
  // {
  //   value: 'mould',
  //   label: '关联模具',
  // },
]);

const onConfirmForm = async () => {
  try {
    if (_.isEmpty(formData.inspectItemId)) {
      MessagePlugin.error('请选择点检项目');
      return;
    }
    if (_.isEmpty(formData.mouldType) && formData.relateType === 'mouldType') {
      MessagePlugin.error('请选择关联模具类型');
      return;
    }
    if (_.isEmpty(formData.mouldId) && formData.relateType === 'mould') {
      MessagePlugin.error('请选择关联模具');
      return;
    }
    // if (_.isEmpty(formData.assetBrandId)) {
    //   MessagePlugin.error('请选择资产品牌');
    //   return;
    // }
    // if (_.isEmpty(formData.assetModelId)) {
    //   MessagePlugin.error('请选择资产型号');
    //   return;
    // }

    if (isEdit.value) {
      await apiEquimpent.inspectItemInEquipment.update({
        id: formData.id,
        inspectItemId: formData.inspectItemId,
        relateType: 'mould',
        mouldId: formData.mouldId || undefined,
        mouldType: formData.mouldType || undefined,
      });
    } else {
      await apiEquimpent.inspectItemInEquipment.insert({
        inspectItemId: formData.inspectItemId,
        relateType: 'mould',
        mouldId: formData.mouldId || undefined,
        mouldType: formData.mouldType || undefined,
      });
    }

    Emit('parent-refresh-event');
    formVisible.value = false;
  } catch (e) {
    console.log(e);
  }
};

const onChange = (val: string) => {
  if (val === 'mouldType') {
    formData.mouldId = '';
  } else {
    formData.mouldType = '';
  }
};
const showForm = async (edit, row) => {
  formVisible.value = true;
  isEdit.value = edit;
  utils.reset(formData);

  formData.inspectItemId = row.id;
  formData.inspectItemCode = row.inspectItemCode;
  formData.inspectItemName = row.inspectItemName;
  formData.relateType = 'mouldType';
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
