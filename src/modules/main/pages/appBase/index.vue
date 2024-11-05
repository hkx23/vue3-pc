<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="columns"
        :table-data="appData.data"
        :loading="loading"
        :total="appData.total"
        :resizable="true"
        :fixed-height="true"
        @refresh="getList"
      >
        <template #title> {{ t('appBase.appList') }} </template>
        <template #button>
          <t-button @click="showForm">{{ t('common.button.add') }}</t-button>
        </template>
        <template #op="{ row }">
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="deleteApp(row)">
            <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
          </t-popconfirm>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <t-dialog
    v-model:visible="formVisible"
    :header="t('common.dialog.header.add')"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
  >
    <t-form ref="formRef" :data="formData" :rules="formRules">
      <t-form-item :label="t('appBase.package')" name="packageName">
        <t-input v-model="formData.packageName" disabled></t-input>
      </t-form-item>
      <t-form-item :label="t('appBase.appName')" name="appName">
        <t-input v-model="formData.appName" disabled></t-input>
      </t-form-item>
      <t-form-item :label="t('appBase.appVersionCode')" name="appBulid">
        <t-input v-model="formData.appBuild" disabled></t-input>
      </t-form-item>
      <t-form-item :label="t('appBase.appVersionName')" name="appVersion">
        <t-input v-model="formData.appVersion" disabled></t-input>
      </t-form-item>
      <t-form-item :label="t('appBase.appType')" name="appType">
        <t-radio-group v-model="formData.appType">
          <t-radio value="PDA">PDA</t-radio>
          <t-radio value="TV">TV</t-radio>
          <t-radio value="WATCH">WATCH</t-radio>
        </t-radio-group>
      </t-form-item>
      <t-form-item :label="t('appBase.memo')" name="memo">
        <t-textarea v-model="formData.memo"></t-textarea>
      </t-form-item>
      <t-form-item :label="t('appBase.appFile')" name="appPath">
        <t-upload
          ref="uploadRef"
          v-model="formData.appFiles"
          accept="application/vnd.android.package-archive"
          :before-upload="beforeUpload"
          :request-method="requestMethod"
        />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
<script setup lang="ts">
import JSZip from 'jszip';
import _ from 'lodash';
import {
  Data,
  FormRules,
  MessagePlugin,
  PrimaryTableCol,
  RequestMethodResponse,
  TableRowData,
  UploadFile,
} from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import AppInfo from './appInfo';
import { useLang } from './lang';

const { t } = useLang();
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();

const opts = computed(() => {
  return {
    appName: {
      label: t('appBase.appName'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [t('appBase.appName')]),
    },
    appType: {
      label: t('appBase.appType'),
      comp: 't-select',
      defaultVal: '',
      placeholder: t('common.placeholder.select', [t('appBase.appType')]),
      bind: {
        options: [{ value: 'PDA' }, { value: 'TV' }, { value: 'WATCH' }],
      },
    },
  };
});
const queryData = ref({
  appName: null,
  appType: null,
});
const formVisible = ref(false);
const formRef = ref(null);
const formData = reactive({
  packageName: null,
  appName: null,
  appType: 'PDA',
  appVersion: null,
  appBuild: 0,
  appFiles: [],
  appPath: null,
  memo: null,
});
const formRules: FormRules<Data> = {
  packageName: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  appName: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  appType: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  appVersion: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  appBuild: [{ min: 1, message: t('common.validation.number'), type: 'error' }],
  appPath: [{ required: true, message: t('appBase.plsUploadFile'), type: 'error' }],
};
const columns: PrimaryTableCol<TableRowData>[] = [
  { title: t('appBase.appName'), width: 160, colKey: 'appName' },
  { title: t('appBase.package'), width: 160, colKey: 'packageName' },
  { title: t('appBase.appType'), width: 160, colKey: 'appType' },
  { title: t('appBase.appVersionCode'), width: 160, colKey: 'appBuild' },
  { title: t('appBase.appVersionName'), width: 160, colKey: 'appVersion' },
  { title: t('business.main.creator'), colKey: 'creatorName', width: 100 },
  { title: t('business.main.timeCreate'), colKey: 'timeCreate', width: 170 },
  { title: t('common.button.operation'), colKey: 'op', align: 'center', fixed: 'right' },
];
const appData = reactive({
  total: 0,
  data: [],
});

// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  queryData.value = data;
  getList();
};

const showForm = () => {
  formVisible.value = true;
};
const onConfirmForm = () => {
  formRef.value.validate().then((result: any) => {
    if (result === true) {
      addApp();
    }
  });
};
const getList = () => {
  setLoading(true);
  api.appBase
    .getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      appName: queryData.value.appName,
      appType: queryData.value.appType,
    })
    .then((data) => {
      setLoading(false);
      appData.data = data.list;
      appData.total = data.total;
    })
    .catch(() => {
      setLoading(false);
    });
};
const uploadRef = ref();
// 上传前处理
const beforeUpload = async (file: UploadFile) => {
  try {
    const zip = new JSZip();
    const content = await zip.loadAsync(file.raw);
    const manifest = await content.files['AndroidManifest.xml'].async('arraybuffer');
    const resource = await content.files['resources.arsc'].async('arraybuffer');
    const appInfo = new AppInfo(manifest, resource);
    formData.packageName = appInfo.getPackage();
    formData.appName = appInfo.getLabel();
    formData.appBuild = appInfo.getVersionCode();
    formData.appVersion = appInfo.getVersionName();
    return true;
  } catch {
    return false;
  }
};
// 上传文件处理
type RequestMethod = (files: UploadFile | UploadFile[]) => Promise<RequestMethodResponse>;
const requestMethod: RequestMethod = async (file: UploadFile) => {
  try {
    const path = `/AppBase/${formData.appName}(${formData.packageName})-${formData.appVersion}.apk`;
    // 底座文件比较大，获取签名直接上传到文件服务，不经过应用服务
    const uploadUrl = await api.file.getUploadSignedUrl({ path });
    await upLoadFile(file, uploadUrl);
    formData.appPath = path;
    return { status: 'success', response: {} };
  } catch (error) {
    console.error(error);
    MessagePlugin.error(error.message);
    return { status: 'fail', response: {} };
  }
};
// 文件上传，底座太大了，fetch不支持获取上传进度，改成xhr，
const upLoadFile = (file: UploadFile, url: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = (event.loaded / event.total) * 100;
        uploadRef.value.uploadFilePercent({
          file,
          percent: percent.toFixed(2),
        });
      }
    };
    xhr.onload = () => {
      resolve(xhr.responseText);
    };
    xhr.onerror = (err) => {
      reject(err);
    };
    xhr.open('PUT', url, true);
    xhr.send(file.raw);
  });
};
const addApp = async () => {
  if (formData.appPath)
    try {
      setLoading(true);
      await api.appBase.add({
        appName: formData.appName,
        appVersion: formData.appVersion,
        appType: formData.appType,
        appBuild: formData.appBuild,
        packageName: formData.packageName,
        appPath: formData.appPath,
        memo: formData.memo,
      });
      MessagePlugin.success(t('appBase.saveSuccess'));
      formVisible.value = false;
      getList();
    } finally {
      setLoading(false);
    }
};
const deleteApp = async (row: any) => {
  await api.appBase.delete(row.id);
  getList();
};
onMounted(() => {
  getList();
});
</script>

<style lang="less" scoped></style>
