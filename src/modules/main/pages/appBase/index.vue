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
      <t-form-item :label="t('appBase.appFile')">
        <t-upload
          v-model="formData.appFiles"
          accept="application/vnd.android.package-archive"
          :auto-upload="false"
          @select-change="selectFile"
        />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>
<script setup lang="ts">
import JSZip from 'jszip';
import _ from 'lodash';
import { Data, FormRules, LoadingPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
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
  memo: null,
});
const formRules: FormRules<Data> = {
  packageName: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  appName: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  appType: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  appVersion: [{ required: true, message: t('common.validation.required'), type: 'error' }],
  appBuild: [{ min: 1, message: t('common.validation.number'), type: 'error' }],
  appFiles: [{ required: true, message: t('common.validation.required'), type: 'error' }],
};
const columns: PrimaryTableCol<TableRowData>[] = [
  { title: t('appBase.appName'), width: 160, colKey: 'appName' },
  { title: t('appBase.package'), width: 160, colKey: 'packageName' },
  { title: t('appBase.appType'), width: 160, colKey: 'appType' },
  { title: t('appBase.appVersionCode'), width: 160, colKey: 'appBuild' },
  { title: t('appBase.appVersionName'), width: 160, colKey: 'appVersion' },
  { title: t('business.main.creator'), colKey: 'creatorName', width: 100 },
  { title: t('business.main.timeCreate'), colKey: 'timeCreate', width: 170 },
];
const appData = reactive({
  total: 0,
  data: [],
});

// 点击查询按钮
const conditionEnter = (data: any) => {
  queryData.value = data;
  getList();
};

const showForm = () => {
  formVisible.value = true;
};
const selectFile = (files: File[]) => {
  const loadingFile = LoadingPlugin({
    attach: () => formRef.value,
    text: t('appBase.parsing'),
  });
  const zip = new JSZip();
  zip
    .loadAsync(files[0])
    .then((content) => {
      return Promise.all([
        content.files['AndroidManifest.xml'].async('arraybuffer'),
        content.files['resources.arsc'].async('arraybuffer'),
      ]);
    })
    .then((rlt) => {
      const appInfo = new AppInfo(rlt[0], rlt[1]);
      formData.packageName = appInfo.getPackage();
      formData.appName = appInfo.getLabel();
      formData.appBuild = appInfo.getVersionCode();
      formData.appVersion = appInfo.getVersionName();
      loadingFile.hide();
    })
    .catch(() => {
      loadingFile.hide();
    });
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
const addApp = () => {
  const loading = LoadingPlugin({
    attach: () => formRef.value,
    text: t('appBase.saving'),
  });
  api.appBase
    .add(
      {
        appName: formData.appName,
        appVersion: formData.appVersion,
        appType: formData.appType,
        appBuild: formData.appBuild,
        packageName: formData.packageName,
        memo: formData.memo,
      },
      {
        file: formData.appFiles[0].raw,
      },
    )
    .then(() => {
      MessagePlugin.success(t('appBase.saveSuccess'));
      formVisible.value = false;
      loading.hide();
    })
    .catch((err) => {
      loading.hide();
      MessagePlugin.error(err);
    });
};
onMounted(() => {
  getList();
});
</script>

<style lang="less" scoped></style>
