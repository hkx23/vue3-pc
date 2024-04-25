<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="formHeader"
    placement="top"
    top="56px"
    width="60%"
    :cancel-btn="null"
    :confirm-btn="null"
    :close-on-overlay-click="false"
  >
    <t-form
      ref="formRef"
      :disabled="formData.opType === 'view'"
      :rules="FORM_RULES"
      :data="formData"
      :show-cancel="true"
      :show-error-message="true"
    >
      <t-row :gutter="[32, 16]">
        <t-col :span="6">
          <t-form-item :label="t('conferenceIndex.指标编码')" name="indexCode">
            <t-input v-model="formData.indexCode" :disabled="formData.opType === 'edit'" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceIndex.指标名称')" name="indexName">
            <t-input v-model="formData.indexName" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceIndex.指标类型')" name="indexType">
            <bcmp-select-business
              v-model="formData.indexType"
              label=""
              :show-title="false"
              :name="t('conferenceIndex.指标类型')"
              :placeholder="t('common.placeholder.select')"
              type="state"
              category="CONFERNCE_INDEX_TYPE"
              :clearable="true"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceIndex.指标维度')" name="indexDimension">
            <bcmp-select-business
              v-model="formData.indexDimension"
              label=""
              :show-title="false"
              :name="t('conferenceIndex.指标维度')"
              :placeholder="t('common.placeholder.select')"
              type="state"
              category="CONFERNCE_INDEX_DIMENSION"
              :clearable="true"
            ></bcmp-select-business>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceIndex.指标路径')" name="indexUrl">
            <t-input v-model="formData.indexUrl" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceIndex.缩率图')" name="indexIconPath">
            <t-link :disabled="false" theme="primary" @click="showUplaodImg">{{
              t('conferenceIndex.上传文件')
            }}</t-link>
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceIndex.指标生效')" name="isState">
            <t-switch v-model="formData.isState" />
          </t-form-item>
        </t-col>
        <t-col :span="6">
          <t-form-item :label="t('conferenceIndex.指标说明')" name="indexDesc">
            <t-textarea
              v-model="formData.indexDesc"
              width="100%"
              name="indexDesc"
              :autosize="{ minRows: 3, maxRows: 5 }"
            />
          </t-form-item>
        </t-col>
      </t-row>
    </t-form>
    <template #footer>
      <t-button v-if="formData.opType !== 'view'" theme="primary" @click="confirm">{{
        t('common.button.save')
      }}</t-button>
      <t-button theme="default" @click="formVisible = false">{{ t('common.button.cancel') }}</t-button>
    </template>

    <cmp-files-upload
      ref="formFilesRef"
      upload-path="conferenceIndex"
      :upload-count-limit="1"
      @upload-success="uploadSuccess"
      @delete-success="deleteSuccess"
      @batch-delete-success="batchDeleteSuccess"
    />
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'ConferenceIndex',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { computed, ComputedRef, reactive, Ref, ref } from 'vue';

import { api, ConferenceIndexVO } from '@/api/daily';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import CmpFilesUpload from '@/components/cmp-files-upload/index.vue';

import { useLang } from './lang';

const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null);

interface FormInspectInfo extends ConferenceIndexVO {
  opType: string;
  isState: boolean;
  indexIconPath: string;
}

const formData: FormInspectInfo = reactive({
  opType: '',
  isState: true,
  indexIconPath: '',
});

const FORM_RULES: ComputedRef<FormRules> = computed(() => {
  return {
    indexCode: [{ required: true, message: t('common.placeholder.input', [t('conferenceIndex.指标编码')]) }],
    indexName: [{ required: true, message: t('common.placeholder.input', [t('conferenceIndex.指标生效')]) }],
    indexDimension: [{ required: true, message: t('common.placeholder.input', [t('conferenceIndex.指标维度')]) }],
    indexUrl: [{ required: true, message: t('common.placeholder.input', [t('conferenceIndex.指标路径')]) }],
    indexType: [{ required: true, message: t('common.placeholder.input', [t('conferenceIndex.指标类型')]) }],
  };
});
const Emit = defineEmits(['parent-refresh-event']);
// onMounted(() => {});

const confirm = () => {
  // formRef.value.submit();
  return new Promise((resolve, reject) => {
    formRef.value.validate().then(async (result) => {
      if (result !== true) {
        reject();
        return;
      }
      formData.state = formData.isState === true ? 1 : 0;
      if (formData.opType === 'add') {
        await api.conferenceIndex.add({ conferenceIndexVO: formData }).then(() => {
          MessagePlugin.success(t('common.message.addSuccess'));
          resolve(formData);
        });
      } else {
        await api.conferenceIndex.edit({ conferenceIndexVO: formData }).then(() => {
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
};
const formVisible = ref(false);
// 初始化新增信息
const initFormAdd = () => {
  reset();
  formHeader.value = t('common.button.add');
  formData.opType = 'add';
  formVisible.value = true;
};
const formHeader = ref('');
// 初始化编辑信息
const initFormEdit = (row: FormInspectInfo) => {
  reset();
  formHeader.value = t('common.button.edit');
  Object.assign(formData, row);
  formData.opType = 'edit';
  formData.isState = formData.state === 1;
  formVisible.value = true;
};

// 初始化查看信息
const initFormView = (row: FormInspectInfo) => {
  reset();
  formHeader.value = t('common.button.view');
  Object.assign(formData, row);
  formData.opType = 'view';
  formData.isState = formData.state === 1;
  formVisible.value = true;
};

// begin 文件上传

const formFilesRef = ref(null);
const showUplaodImg = async () => {
  try {
    const filelist: AddFileType[] = [];
    if (formData.indexIconPath) {
      const file = {} as AddFileType;
      file.fileName = formData.indexIconName;
      file.percent = 100;
      file.timeUpload = formData.timeModified;
      file.signedUrl = formData.indexIconPath;
      filelist.push(file);
    }
    const { showForm } = formFilesRef.value;
    const isReadonly = formData.opType === 'view';
    await showForm(isReadonly, filelist);
  } catch (e) {
    console.log(e);
  }
};
const uploadSuccess = async (file: AddFileType) => {
  try {
    formData.indexIconPath = file.signedUrl;
    formData.indexIconName = file.fileName;
    MessagePlugin.success('文件已上传,请最后点击保存');
  } catch (e) {
    console.log(e);
  }
};
const deleteSuccess = async (file: AddFileType) => {
  try {
    formData.indexIconPath = ''; // 缩略图地址
    formData.indexIconName = ''; // 缩略图名称
    MessagePlugin.success('文件已删除,请最后点击保存');
  } catch (e) {
    console.log(e);
  }
};
const batchDeleteSuccess = async (files: AddFileType[]) => {
  try {
    formData.indexIconPath = ''; // 缩略图地址
    formData.indexIconName = ''; // 缩略图名称
    MessagePlugin.success('文件已删除,请最后点击保存');
  } catch (e) {
    console.log(e);
  }
};
// end 文件上传

defineExpose({
  form: formRef,
  initFormAdd,
  initFormEdit,
  initFormView,
});
</script>
<style lang="less" scoped></style>
`
