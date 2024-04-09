<template>
  <t-form ref="formRef" :rules="rules" label-align="right" label-width="120px" layout="inline">
    <!-- 第 1️⃣ 行数据 -->
    <t-form-item label="项目名称" label-align="right" name="itemName">
      <t-input v-model="dtlData.itemName" />
    </t-form-item>
    <t-form-item label="项目类别" label-align="right" name="itemCategory">
      <t-select v-model="dtlData.itemCategory" clearable>
        <t-option v-for="item in categoryOption" :key="item.id" :label="item.label" :value="item.value" />
      </t-select>
    </t-form-item>
    <t-form-item label="项目行号" label-align="right" name="itemSeq">
      <t-input v-model="dtlData.itemSeq" />
    </t-form-item>
    <t-form-item label="抽样标准类型" label-align="right" name="samplingStandardType">
      <t-radio-group v-model="dtlData.samplingStandardType" default-value="1">
        <t-radio value="1">国标</t-radio>
        <t-radio value="2">企标</t-radio>
      </t-radio-group>
    </t-form-item>
    <t-form-item label="抽样标准" label-align="right" name="samplingStandardCode">
      <t-select
        v-model="dtlData.samplingStandardCode"
        clearable
        filterable
        input-props
        @clear="fetchSampingStdCodes"
        @input-change="querySelectChange($event)"
      >
        <t-option
          v-for="item in codesOption"
          :key="item.id"
          :label="item.label"
          :value="item.value"
          :lazy-load="true"
        />
      </t-select>
    </t-form-item>
    <t-form-item label="项目特性" label-align="right" name="characteristics">
      <t-select v-model="dtlData.characteristics" clearable>
        <t-option v-for="item in characteristicsOptions" :key="item.id" :label="item.label" :value="item.value" />
      </t-select>
    </t-form-item>
    <t-form-item label="不合格分类" label-align="right" name="unqualifyCategory">
      <t-select v-model="dtlData.unqualifyCategory" clearable>
        <t-option v-for="item in unCategoryOption" :key="item.id" :label="item.label" :value="item.value" />
      </t-select>
    </t-form-item>
    <t-form-item label="检验类型" label-align="right" name="inspectTypeList">
      <t-select v-model="dtlData.inspectTypeList" clearable multiple>
        <t-option v-for="(item, index) in stdTypeOption" :key="index" :label="item.label" :value="item.value" />
      </t-select>
    </t-form-item>
    <t-form-item label="检验属性" label-align="right" name="inspectProperty">
      <t-select v-model="dtlData.inspectProperty" clearable>
        <t-option v-for="item in propertyOption" :key="item.id" :label="item.label" :value="item.value" />
      </t-select>
    </t-form-item>
    <t-form-item label="检验工具" label-align="right" name="inspectTool">
      <t-input v-model="dtlData.inspectTool" />
    </t-form-item>
    <t-form-item
      label="检验水平"
      label-align="right"
      name="inspectLevel"
      :required-mark="dtlData.samplingStandardType === '1'"
    >
      <t-select v-model="dtlData.inspectLevel" clearable :disabled="dtlData.samplingStandardType !== '1'">
        <t-option v-for="item in levelOption" :key="item.id" :label="item.label" :value="item.value" />
      </t-select>
    </t-form-item>
    <t-form-item label="检验依据" label-align="right" name="inspectBasis">
      <t-input v-model="dtlData.inspectBasis" />
    </t-form-item>
    <t-form-item label="工序" label-align="right" name="processId">
      <bcmp-select-business v-model="dtlData.processId" type="process" :show-title="false"></bcmp-select-business>
    </t-form-item>
    <t-form-item label="技术要求" label-align="right" name="technicalRequest">
      <t-input v-model="dtlData.technicalRequest" />
    </t-form-item>
    <t-form-item label="检验频率" label-align="right" name="inspectFrequency">
      <t-input v-model="dtlData.inspectFrequency" />
    </t-form-item>
    <t-form-item label="最小值" label-align="right" name="minValue">
      <t-input v-model="dtlData.minValue" />
    </t-form-item>
    <t-form-item label="最大值" label-align="right" name="maxValue">
      <t-input v-model="dtlData.maxValue" />
    </t-form-item>
    <t-form-item label="基准值" name="mitemCode">
      <t-input v-model="dtlData.baseValue" style="width: 70%" />
      <div style="width: 30%">
        <bcmp-select-business
          v-model="dtlData.uom"
          type="uom"
          :show-title="false"
          value-field="uom"
        ></bcmp-select-business>
      </div>
    </t-form-item>
    <t-form-item label="附件：" name="mitemCode">
      <t-link theme="primary" @click="formVisible = true"> 附件上传 </t-link>
    </t-form-item>
  </t-form>
  <t-dialog
    v-model:visible="formVisible"
    :close-on-overlay-click="false"
    header="附件上传"
    width="50%"
    :confirm-btn="fileList.length >= 1 ? '确认' : null"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="fileList"
        upload-path="oqcInspectStd"
        :is-hand-delete="true"
        @upload-success="uploadSuccess"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="tsx">
import { isEmpty } from 'lodash';
import { FormRules, MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import { api } from '@/api/main';
import { api as apiQuality } from '@/api/quality';
import { AddFileType } from '@/components/bcmp-upload-content/constants';

// 父方法
const fileList = ref([]);
const formVisible = ref(false);

const dtlData = ref({
  oqcInspectStdId: '',
  itemSeq: '',
  itemCategory: '',
  id: '',
  itemName: '',
  characteristics: '',
  baseValue: '',
  maxValue: '',
  minValue: '',
  inspectFrequency: '',
  technicalRequest: '',
  uom: '',
  uomName: '',
  samplingStandardType: '1',
  samplingStandardCode: '',
  inspectLevel: '',
  inspectLevelName: '',
  inspectTool: '',
  unqualifyCategory: '',
  inspectBasis: '',
  inspectTypeList: [],
  inspectProperty: '',
  processId: '',
});
const init = () => {
  dtlData.value = {
    oqcInspectStdId: '',
    itemSeq: '',
    id: '',
    itemCategory: '',
    inspectFrequency: '',
    itemName: '',
    characteristics: '',
    baseValue: '',
    maxValue: '',
    minValue: '',
    technicalRequest: '',
    uom: null,
    uomName: '',
    samplingStandardType: '1',
    samplingStandardCode: '',
    inspectLevel: '',
    inspectLevelName: '',
    inspectTool: '',
    unqualifyCategory: '',
    inspectBasis: '',
    inspectTypeList: [],
    inspectProperty: '',
    processId: null,
  };
};
const onConfirmFile = () => {
  formVisible.value = false;
};
const codesOption = ref([]);

const fetchSampingStdCodes = async () => {
  try {
    if (dtlData.value.samplingStandardType === '2') {
      const data = (await apiQuality.samplingStd.getSampingStdCode()) as any;
      codesOption.value = data.map((item: { sampingStdCode: any; id: any }) => ({
        label: item.sampingStdCode,
        value: item.sampingStdCode,
      }));
    } else {
      const data = (await apiQuality.oqcInspectStdDtl.getProfileGbDropList()) as any;
      codesOption.value = data.map((item: { profileValue: any; id: any }) => ({
        label: item.profileValue,
        value: item.profileValue,
      }));
    }
  } catch (e) {
    console.log(e);
  }
};
const querySelectChange = async (event) => {
  if (dtlData.value.samplingStandardType === '2') {
    const res = (await apiQuality.samplingStd.getSampingStdCode({ key: event.length >= 2 ? event : '' })) as any;
    codesOption.value = res.map((item: { sampingStdCode: any; id: any }) => ({
      label: item.sampingStdCode,
      value: item.sampingStdCode,
    }));
  } else {
    const res = (await apiQuality.oqcInspectStdDtl.getProfileGbDropList({
      key: event.length >= 2 ? event : '',
    })) as any;
    codesOption.value = res.map((item: { profileValue: any; id: any }) => ({
      label: item.profileValue,
      value: item.profileValue,
    }));
  }
};

// 下拉初始数据
const characteristicsOptions = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_CHARACTERISTICS' }).then((data) => {
  characteristicsOptions.value = data;
});
// 下拉初始数据
const stdTypeOption = [
  { label: '首检', value: 1 },
  { label: '巡检', value: 2 },
  { label: '抽检', value: 4 },
  { label: '复检', value: 8 },
];

// #表单定义规则
const rules: FormRules = {
  itemSeq: [{ required: true, message: '不能为空', trigger: 'change' }],
  itemCategory: [{ required: true, message: '不能为空', trigger: 'change' }],
  itemName: [{ required: true, message: '不能为空', trigger: 'change' }],
  characteristics: [{ required: true, message: '不能为空', trigger: 'change' }],
  samplingStandardType: [{ required: true, message: '不能为空', trigger: 'change' }],
  samplingStandardCode: [{ required: true, message: '不能为空', trigger: 'change' }],
  inspectTool: [{ required: true, message: '不能为空', trigger: 'change' }],
  unqualifyCategory: [{ required: true, message: '不能为空', trigger: 'change' }],
  inspectBasis: [{ required: true, message: '不能为空', trigger: 'change' }],
  inspectTypeList: [{ required: true, message: '不能为空', trigger: 'change' }],
  inspectProperty: [{ required: true, message: '不能为空', trigger: 'change' }],
};
const uploadSuccess = (file: AddFileType) => {
  MessagePlugin.info(`上传一个文件成功`);
  fileList.value.push(file);
  console.log('🚀 ~ file: materialStandardAdd.vue:149 ~ uploadSuccess ~ files.value:', fileList.value);

  console.log('🚀 ~ file: materialStandardAdd.vue:150 ~ uploadSuccess ~ file:', file);
};

const uploadfail = (file: AddFileType) => {
  MessagePlugin.info(`上传文件失败`);
  console.log('uploadSuccess', file);
};

const deleteSuccess = (file: AddFileType) => {
  MessagePlugin.info(`删除文件成功`);
  console.log('deleteSuccess', file);
  fileList.value = fileList.value.filter((item) => item.signedUrl !== file.signedUrl);
};

const batchDeleteSuccess = (files: AddFileType[]) => {
  MessagePlugin.info(`删除文件成功`);
  console.log('batchDeleteSuccess', files);
  files.forEach((item) => {
    fileList.value = fileList.value.filter((file) => file.signedUrl !== item.signedUrl);
  });
};

const categoryOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_ITEM_CATEGORY' }).then((data) => {
  categoryOption.value = data;
});
const levelOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_LEVEL' }).then((data) => {
  levelOption.value = data;
});
const unCategoryOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_IQC_UNQUALIFY_CATEGORY' }).then((data) => {
  unCategoryOption.value = data;
});
const propertyOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_PROPERTY' }).then((data) => {
  propertyOption.value = data;
});
const rowData = ref();
const onConfirmDtl = async () => {
  // 首先创建一个数组来存储需要检查非空的属性
  const requiredFields = [
    'itemCategory',
    'itemName',
    'itemSeq',
    'characteristics',
    'samplingStandardType',
    'samplingStandardCode',
    'inspectTool',
    'unqualifyCategory',
    'inspectBasis',
    'inspectTypeList',
    'inspectProperty',
  ];

  // 遍历 requiredFields 数组，检查每个属性是否为空
  const emptyFields = [];
  requiredFields.forEach((field) => {
    if (!dtlData.value[field]) {
      emptyFields.push(field);
      console.log(emptyFields);
    }
  });
  console.log(dtlData.value);
  // 如果存在空值属性，则输出提示信息并阻止添加操作
  if (emptyFields.length > 0) {
    MessagePlugin.warning('请补充表单信息');
    return false;
  }
  if (dtlData.value.samplingStandardType === '1') {
    if (isEmpty(dtlData.value.inspectLevel)) {
      MessagePlugin.error('请补充表单信息');
      return false;
    }
  }
  if (!Number(dtlData.value.itemSeq)) {
    MessagePlugin.error('项目行号须为整数');
    return false;
  }
  if (dtlData.value.baseValue && (!Number(dtlData.value.baseValue) || Number(dtlData.value.baseValue) < 0)) {
    MessagePlugin.error('基准值须为正数');
    return false;
  }
  if (dtlData.value.minValue && (!Number(dtlData.value.minValue) || Number(dtlData.value.minValue) < 0)) {
    MessagePlugin.error('最小值须为正数');
    return false;
  }
  if (dtlData.value.maxValue && (!Number(dtlData.value.maxValue) || Number(dtlData.value.maxValue) < 0)) {
    MessagePlugin.error('最大值须为正数');
    return false;
  }
  if (dtlData.value.uom) {
    const res = await apiQuality.oqcInspectStdDtl.getUom({ uom: dtlData.value.uom });
    dtlData.value.uomName = res.uomName;
  }
  if (dtlData.value.inspectLevel) {
    dtlData.value.inspectLevelName = levelOption.value.find((item) => item.value === dtlData.value.inspectLevel)?.label;
  }
  let concatenatedFileNames = '';
  if (fileList.value.length > 0) {
    const fileNames = fileList.value.map((item) => item.fileName); // 提取每个文件对象的 fileName 属性到一个新数组
    concatenatedFileNames = fileNames.join(','); // 使用 join 方法将文件名数组拼接成以逗号分隔的字符串
  }
  rowData.value = {
    ...dtlData.value,
    fileList,
    samplingStandardTypeName: dtlData.value.samplingStandardType === '1' ? '国标' : '企标',
    itemCategoryName: categoryOption.value.find((item) => item.value === dtlData.value.itemCategory)?.label,
    unqualifyCategoryName: unCategoryOption.value.find((item) => item.value === dtlData.value.unqualifyCategory)?.label,
    characteristicsName: characteristicsOptions.value.find((item) => item.value === dtlData.value.characteristics)
      ?.label,
    attachement: concatenatedFileNames,
  };
  console.log(rowData);
  return true;
};

defineExpose({
  onConfirmDtl,
  dtlData,
  rowData,
  init,
  fileList,
});
</script>

<style lang="less" scoped>
:deep(.t-form__controls-content) {
  width: 200px !important;

  .t-date-picker,
  .t-input-number,
  .t-color-picker__trigger {
    width: 200px;
  }
}
</style>
