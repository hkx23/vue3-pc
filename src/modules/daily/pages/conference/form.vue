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
          <t-form-item :label="t('conference.会议编码')" name="conferenceCode">
            <t-input v-model="formData.conferenceCode" :disabled="formData.opType === ViewType.edit" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conference.会议名称')" name="conferenceName">
            <t-input v-model="formData.conferenceName" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conference.会议模板')" name="conferenceTemplateId">
            <bcmp-select-business
              v-model="formData.conferenceTemplateId"
              :show-title="false"
              :placeholder="t('common.placeholder.select')"
              type="conferenceTemplate"
              :clearable="true"
              @selection-change="conferenceTemplateChange"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conference.时间维度')" name="templateDimensionList">
            <t-checkbox-group
              v-model="formData.templateDimensionList"
              :options="formData.dimensionOption"
            ></t-checkbox-group>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conference.会议生效')" name="isState">
            <t-switch v-model="formData.isState" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conference.会议组织')" name="orgs">
            <bcmp-select-business
              v-model="formData.orgs"
              :is-multiple="true"
              :show-title="false"
              :placeholder="t('common.placeholder.select')"
              type="conferenceTemplate"
              :clearable="true"
              @selection-change="conferenceOrgsChange"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
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
  name: 'Conference',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { computed, ComputedRef, reactive, Ref, ref } from 'vue';

import { api as apiDaily, ConferenceOrg, ConferenceVO } from '@/api/daily';
import { api as apiMain } from '@/api/main';

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
interface FormInspectInfo extends ConferenceVO {
  conferenceTemplateId: string;
  opType: string;
  isState: boolean;
  conferenceLayoutId: string;
  dimensionOption: any;
  templateDimensionList: string[];
  orgs: string;
  conferenceOrgs: ConferenceOrg[];
}

const formData: FormInspectInfo = reactive({
  conferenceTemplateId: '',
  opType: '',
  isState: true,
  conferenceLayoutId: '',
  dimensionOption: [],
  templateDimensionList: [],
  orgs: '',
  conferenceOrgs: [],
});

const FORM_RULES: ComputedRef<FormRules> = computed(() => {
  return {
    conferenceCode: [{ required: true, message: t('common.placeholder.input', [t('conference.会议编码')]) }],
    conferenceName: [{ required: true, message: t('common.placeholder.input', [t('conference.会议名称')]) }],
    conferenceTemplateId: [
      {
        required: true,
        message: t('common.placeholder.input', [t('conference.会议模板')]),
      },
    ],
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
      formData.state = formData.isState === true ? 1 : 0;
      // 字符串数组转字符串
      formData.templateDimension = formData.templateDimensionList.join(',');
      if (formData.opType === 'add') {
        await apiDaily.conference.add({ conferenceVO: formData, conferenceOrgs: formData.conferenceOrgs }).then(() => {
          MessagePlugin.success(t('common.message.addSuccess'));
          resolve(formData);
        });
      } else {
        await apiDaily.conference.edit({ conferenceVO: formData, conferenceOrgs: formData.conferenceOrgs }).then(() => {
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
  formRef.value.reset({ type: 'empty' });
  optionType.value = '';
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
  // 获取会议的参与组织信息
  getConferenceOrgs();
};

// 初始化查看信息
const initFormView = (row: FormInspectInfo) => {
  reset();
  optionType.value = LayoutViewType.editConferenceIndex.toString();
  formHeader.value = t('common.button.view');
  Object.assign(formData, row);
  formData.opType = ViewType.view;
  formData.isState = formData.state === 1;
  formData.templateDimensionList = row.templateDimensionList;
  formVisible.value = true;
  // 获取会议的参与组织信息
  getConferenceOrgs();
};

// 获取会议的参与组织信息
const getConferenceOrgs = async () => {
  const datas = (await apiDaily.conference.listOrg({
    conferenceId: formData.id,
  })) as any;
  if (datas) {
    // 对象数组集合获取字段按逗号隔开字符串
    const orgsList = datas.map((item: any) => item.orgId);
    const workcenterList = datas.map((item: any) => item.workcenterId);
    const mergeList = [...orgsList, ...workcenterList];
    if (mergeList) {
      // 字符串数组去重
      const distictList = mergeList.filter(
        (item: any, index: number) => mergeList.indexOf(item) === index && item !== '0',
      );
      formData.orgs = distictList.join(',');
    }
  }
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
// 选中模板事件
const conferenceTemplateChange = (val: any) => {
  formData.templateDimensionList = val.templateDimensionList;
};
// 选中组织事件
const conferenceOrgsChange = (vals: any) => {
  console.log(vals);
  if (vals) {
    // todo: 按类型判断是工作中心还是组织架构, 若为工作中心,则组织架构字段为0
    vals.forEach((element) => {
      formData.conferenceOrgs.push({
        orgId: element.id,
        workcenterId: element.id,
      });
    });
  }
};

defineExpose({
  form: formRef,
  initFormAdd,
  initFormEdit,
  initFormView,
});
</script>
<style lang="less" scoped></style>
`
