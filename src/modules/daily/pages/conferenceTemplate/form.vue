<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="formHeader"
    placement="top"
    top="56px"
    width="100%"
    :cancel-btn="null"
    :confirm-btn="null"
    :close-on-overlay-click="false"
  >
    <t-form
      v-show="formData.opType !== ViewType.preView"
      ref="formRef"
      :disabled="formData.opType === ViewType.view"
      :rules="FORM_RULES"
      :data="formData"
      :show-cancel="true"
      :show-error-message="true"
    >
      <t-row :gutter="[32, 16]">
        <t-col :span="6">
          <t-form-item :label="t('conferenceTemplate.模板编码')" name="templateCode">
            <t-input v-model="formData.templateCode" :disabled="formData.opType === ViewType.edit" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceTemplate.模板名称')" name="templateName">
            <t-input v-model="formData.templateName" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceTemplate.模板描述')" name="templateDesc">
            <t-input v-model="formData.templateDesc" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceTemplate.会议布局')" name="conferenceLayoutId">
            <bcmp-select-business
              v-model="formData.conferenceLayoutId"
              :show-title="false"
              :placeholder="t('common.placeholder.select')"
              type="conferenceLayout"
              :clearable="true"
              @selection-change="conferenceLayoutChange"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceTemplate.时间维度')" name="templateDesc">
            <t-checkbox-group
              v-model="formData.templateDimensionList"
              :options="formData.dimensionOption"
            ></t-checkbox-group>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceTemplate.模板生效')" name="isState">
            <t-switch v-model="formData.isState" />
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
    <conference-layout-com
      ref="templateComRef"
      :option-type="optionType"
      :readonly="formData.opType === ViewType.view || formData.opType === ViewType.preView"
    ></conference-layout-com>
    <template #footer>
      <t-button
        v-if="formData.opType === ViewType.add || formData.opType === ViewType.edit"
        theme="primary"
        @click="confirm"
        >{{ t('common.button.save') }}</t-button
      >
      <t-button theme="default" @click="formVisible = false">{{ t('common.button.cancel') }}</t-button>
    </template>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'ConferenceTemplate',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { computed, ComputedRef, reactive, Ref, ref } from 'vue';

import { api, ConferenceTemplateVO } from '@/api/daily';
import { api as apiMain } from '@/api/main';
import { componentItem } from '@/modules/daily/pages/conferenceLayout/components/components';
import ConferenceLayoutCom from '@/modules/daily/pages/conferenceLayout/components/indexCom.vue';

import { useLang } from './lang';

const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null);
enum LayoutViewType {
  addLayout = 'addLayout', // addLayout: 新增(占位符布局信息)
  editConferenceIndex = 'editConferenceIndex', // editConferenceIndex:编辑(配置关联指标)
  viewKanban = 'viewKanban', // viewKanban:查看模式(看板模式)
}

enum ViewType {
  add = 'add',
  edit = 'edit',
  view = 'view',
  preView = 'preView',
}
interface FormInspectInfo extends ConferenceTemplateVO {
  opType: string;
  isState: boolean;
  conferenceLayoutId: string;
  templateIndexContent: string;
  dimensionOption: any;
  templateDimensionList: string[];
}
const templateComRef = ref(null);
const templateData = ref<componentItem[]>([]); // 模板组件数据
const formData: FormInspectInfo = reactive({
  opType: '',
  isState: true,
  conferenceLayoutId: '',
  templateIndexContent: '',
  dimensionOption: [],
  templateDimensionList: [],
});

const FORM_RULES: ComputedRef<FormRules> = computed(() => {
  return {
    templateCode: [{ required: true, message: t('common.placeholder.input', [t('conferenceTemplate.模板编码')]) }],
    templateName: [{ required: true, message: t('common.placeholder.input', [t('conferenceTemplate.模板名称')]) }],
  };
});
const Emit = defineEmits(['parent-refresh-event']);

const confirm = () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then(async (result) => {
      if (result !== true) {
        reject();
        return;
      }
      const { getLayoutComData } = templateComRef.value;
      templateData.value = getLayoutComData();
      if (templateData.value && templateData.value.length === 0) {
        MessagePlugin.error(t('conferenceTemplate.请先配置模板面板信息'));
        return;
      }
      formData.templateIndexContent = JSON.stringify(templateData.value);
      formData.state = formData.isState === true ? 1 : 0;
      // 字符串数组转字符串
      formData.templateDimension = formData.templateDimensionList.join(',');
      if (formData.opType === 'add') {
        await api.conferenceTemplate.add({ conferenceTemplateVO: formData }).then(() => {
          MessagePlugin.success(t('common.message.addSuccess'));
          resolve(formData);
        });
      } else {
        await api.conferenceTemplate.edit({ conferenceTemplateVO: formData }).then(() => {
          MessagePlugin.success(t('common.message.editSuccess'));
          resolve(formData);
        });
      }
      formVisible.value = false;
      Emit('parent-refresh-event', true);
    });
  });
};

const reset = () => {
  console.log('reset');
  if (formRef.value) {
    formRef.value.reset();
  }
  optionType.value = '';
  templateData.value = [];
  // 清除所有对象的值
  Object.keys(formData).forEach((key) => {
    if (_.isArray(formData[key])) {
      formData[key] = [];
    } else if (_.isNumber(formData[key])) {
      formData[key] = 0;
    } else if (_.isBoolean(formData[key])) {
      formData[key] = true;
    } else {
      formData[key] = '';
    }
  });
  initDimensionOption();
};
const formVisible = ref(false);
const optionType = ref('editConferenceIndex');
// 初始化新增信息
const initFormAdd = () => {
  reset();
  optionType.value = LayoutViewType.editConferenceIndex.toString();
  formHeader.value = t('common.button.add');
  formData.opType = ViewType.add;
  formVisible.value = true;
  // 初始化模板组件
  templateComRef.value.reset();
  formData.isState = true;
};
const formHeader = ref('');
// 初始化编辑信息
const initFormEdit = (row: FormInspectInfo) => {
  reset();
  optionType.value = LayoutViewType.editConferenceIndex.toString();
  formHeader.value = t('common.button.edit');
  Object.assign(formData, row);
  formData.opType = ViewType.edit;
  formData.isState = formData.state === 1;
  formData.templateDimensionList = row.templateDimensionList;
  formVisible.value = true;
  // 初始化模板组件
  if (row.templateIndexContent) {
    templateData.value = JSON.parse(row.templateIndexContent);
  }
  const { setLayoutComData } = templateComRef.value;
  setLayoutComData(templateData.value);
};

// 初始化查看信息
const initFormView = (row: FormInspectInfo) => {
  reset();
  optionType.value = LayoutViewType.editConferenceIndex.toString();
  formHeader.value = t('common.button.view');
  Object.assign(formData, row);
  formData.opType = ViewType.view;
  formData.isState = formData.state === 1;
  formVisible.value = true;
  // 初始化模板组件 templateIndexContent
  if (row.templateIndexContent) {
    templateData.value = JSON.parse(row.templateIndexContent);
  }
  const { setLayoutComData } = templateComRef.value;
  setLayoutComData(templateData.value);
};

// 初始化预览信息
const initFormPreView = (row: FormInspectInfo) => {
  reset();
  optionType.value = LayoutViewType.viewKanban.toString();
  formHeader.value = t('common.button.preView');
  Object.assign(formData, row);
  formData.opType = ViewType.preView;
  formData.isState = formData.state === 1;
  formVisible.value = true;
  // 初始化模板组件 templateIndexContent
  if (row.templateIndexContent) {
    templateData.value = JSON.parse(row.templateIndexContent);
  }
  const { setLayoutComData } = templateComRef.value;
  setLayoutComData(templateData.value);
};

// 初始化系统字典
const initDimensionOption = async () => {
  const res = (await apiMain.param.getListByGroupCode({
    parmGroupCode: 'CONFERNCE_INDEX_DIMENSION',
  })) as any;
  formData.dimensionOption = res;
  if (res) {
    formData.dimensionOption.unshift({ label: '全选', checkAll: true });
  }
};

const conferenceLayoutChange = (rowData) => {
  // 初始化布局组件
  let layoutData = [];
  if (rowData.layoutBody) {
    layoutData = JSON.parse(rowData.layoutBody);
    const { setLayoutComData } = templateComRef.value;
    setLayoutComData(layoutData);
  }
};

defineExpose({
  form: formRef,
  initFormAdd,
  initFormEdit,
  initFormView,
  initFormPreView,
});
</script>
<style lang="less" scoped></style>
`
