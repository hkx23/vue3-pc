<template>
  <t-form
    ref="formRef"
    :rules="FORM_RULES"
    :data="formData"
    :show-cancel="true"
    :show-error-message="false"
    :label-width="135"
  >
    <t-form-item :label="t('printTemplate.templateType')" name="tmplType">
      <t-select v-model="formData.tmplType" clearable>
        <t-option v-for="(item, index) in TEMPLATE_TYPE" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-select>
    </t-form-item>
    <t-form-item :label="t('printTemplate.templateCategory')" name="tmplCategory">
      <t-select v-model="formData.tmplCategory" clearable>
        <t-option v-for="(item, index) in categoryOptions" :key="index" :value="item.value" :label="item.label">
          {{ item.label }}
        </t-option>
      </t-select>
    </t-form-item>
    <t-form-item :label="t('printTemplate.templateCode')" name="tmplCode">
      <t-input v-model="formData.tmplCode" :disabled="isFormEditing" clearable />
    </t-form-item>
    <t-form-item :label="t('printTemplate.templateName')" name="tmplName">
      <t-input v-model="formData.tmplName" clearable />
    </t-form-item>
    <t-form-item :label="t('printTemplate.templateDesc')" name="tmplDesc">
      <t-textarea v-model="formData.tmplDesc" clearable />
    </t-form-item>

    <t-form-item :label="t('printTemplate.templatePath')" name="tmplBodyPath">
      <div v-if="formData.tmplType == 'mrt' || formData.tmplType == 'hi'">
        <t-button theme="default" @click="onClickDesigner">设计模板</t-button>
        <div v-if="formData.tmplBodyPath">
          {{ formData.tmplBodyPath?.split('/').pop() }}
          <t-button shape="square" variant="text" @click="onClickRemoveFile">
            <template #icon><close-icon /></template>
          </t-button>
        </div>
      </div>
      <t-upload
        v-if="formData.tmplType == 'btw'"
        v-model="fileBody"
        accept=".btw"
        :auto-upload="false"
        :show-upload-progress="false"
      ></t-upload>
    </t-form-item>
  </t-form>
  <t-dialog v-model:visible="designerVisible" mode="full-screen" header="设计器" :footer="false">
    <template v-if="formData.tmplType == 'hi'">
      <hiPrint
        v-if="designerVisible"
        style="margin: -16px; background: var(--td-bg-color-page)"
        :template-title="formData.tmplName"
        :template-body="formData.fileContent"
        @save="onSaveDesigner"
      ></hiPrint>
    </template>

    <template v-else>
      <designer
        v-if="designerVisible"
        v-model:visible="designerVisible"
        :file-name="formData.tmplBodyPath"
        :file-content="formData.fileContent"
        @save="onSaveDesigner"
      ></designer>
    </template>
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'TemplateForm',
};
</script>
<script setup lang="ts">
import { CloseIcon } from 'tdesign-icons-vue-next';
import { FormInstanceFunctions, MessagePlugin, UploadFile } from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

import { api, PrintTmplDTO } from '@/api/main';

import { DesignerArgs, TEMPLATE_TYPE, TemplateFormRef } from './constants';
import hiPrint from './designer/hiPrint/index.vue';
import designer from './designer/stimulsoft.vue';
import { useLang } from './lang';

const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  tmplType: [{ required: true, message: t('common.placeholder.input', [t('printTemplate.templateType')]) }],
  tmplCategory: [{ required: true, message: t('common.placeholder.input', [t('printTemplate.templateCategory')]) }],
  tmplCode: [{ required: true, message: t('common.placeholder.input', [t('printTemplate.templateCode')]) }],
  tmplName: [{ required: true, message: t('common.placeholder.input', [t('printTemplate.templateName')]) }],
};

const designerVisible = ref(false);
const fileBody = ref<UploadFile[]>([]);
const formData: PrintTmplDTO = reactive({
  tmplCode: '',
  tmplName: '',
  tmplDesc: '',
  tmplCategory: '',
  tmplType: 'mrt',
  tmplBodyPath: '',
  file: '',
  fileUrl: '',
});

const categoryOptions = ref(null);

onMounted(() => {
  fetchDic();
});

const onClickRemoveFile = () => {
  formData.tmplBodyPath = '';
  formData.fileContent = '';
};
const onSaveDesigner = (args: DesignerArgs) => {
  formData.tmplBodyPath = args.fileName;
  formData.fileContent = args.fileContent;
  designerVisible.value = false;
};

const fetchDic = async () => {
  categoryOptions.value = await api.param.getListByGroupCode({ parmGroupCode: 'PRINT_TMPL_CATEGORY' });
};

const onClickDesigner = async () => {
  if (!formData.fileContent) {
    if (formData.tmplBodyPath) {
      formData.fileContent = await api.printTmpl.getTmplByPath({ path: formData.tmplBodyPath });
    } else {
      formData.fileContent = '';
    }
  }

  designerVisible.value = true;
};

const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then(async (result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }

      if (fileBody.value.length > 0) {
        const [file] = fileBody.value;
        if (formData.tmplType === 'btw') {
          if (file.name.split('.').pop() !== 'btw') {
            MessagePlugin.error(t('printTemplate.fileTypeError'));
            return;
          }
        }
        formData.tmplBodyPath = file.name;
        formData.fileContent = await file.raw.text();
      }

      if (isFormEditing) {
        api.printTmpl.update(formData.id, formData).then(() => {
          MessagePlugin.success(t('common.message.saveSuccess'));
          resolve(formData);
        });
        return;
      }
      api.printTmpl.add(formData).then(() => {
        MessagePlugin.success(t('common.message.addSuccess'));
        resolve(formData);
      });
    });
  });
};

let isFormEditing = false;
const reset = (isEdit: boolean, data?: PrintTmplDTO) => {
  formRef.value.reset({ type: 'initial' });
  isFormEditing = isEdit;
  onClickRemoveFile();
  if (isEdit) {
    Object.assign(formData, data);
  } else {
    Object.assign(formData, {
      id: '',
    });
  }
};

defineExpose({
  form: formRef,
  submit,
  reset,
} as TemplateFormRef);
</script>
<style lang="less" scoped></style>
`
