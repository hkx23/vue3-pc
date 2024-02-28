<template>
  <t-form
    ref="formRef"
    :rules="rules"
    :data="dtlData"
    label-align="right"
    label-width="120px"
    :show-error-message="false"
  >
    <t-row :gutter="[32, 16]">
      <!-- 第 1️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="项目类别" label-align="right" name="itemCategory">
          <t-select v-model="dtlData.itemCategory" clearable style="width: 280px">
            <t-option v-for="item in categoryOption" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="检验类型" label-align="right" name="inspectType">
          <t-select v-model="dtlData.inspectType" clearable style="width: 280px">
            <t-option v-for="item in stdTypeOption" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="检验内容" label-align="right" name="itemName">
          <t-input v-model="dtlData.itemName" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="项目行号" label-align="right" name="itemSeq">
          <t-input v-model="dtlData.itemSeq" style="width: 280px" />
        </t-form-item>
      </t-col>
      <!-- 第 2️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="检验依据" label-align="right" name="inspectBasis">
          <t-input v-model="dtlData.inspectBasis" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="技术要求" label-align="right" name="technicalRequest">
          <t-input v-model="dtlData.technicalRequest" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="是否CTQ" name="isCtq">
          <t-select v-model="dtlData.isCtq" :clearable="true">
            <t-option key="0" label="是" value="1" />
            <t-option key="1" label="否" value="0" />
          </t-select>
        </t-form-item>
      </t-col>
      <!-- 第 3️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="项目特性" name="characteristics">
          <t-select v-model="dtlData.characteristics" clearable style="width: 280px">
            <t-option v-for="item in characteristicsOptions" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="检验工具" name="inspectTool">
          <t-input v-model="dtlData.inspectTool" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="基准值" name="baseValue">
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
      </t-col>
      <!-- 第 4️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="最小值" name="minValue">
          <t-input v-model="dtlData.minValue" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="最大值" name="maxValue">
          <t-input v-model="dtlData.maxValue" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="不合格分类" name="unqualifyCategory">
          <t-select v-model="dtlData.unqualifyCategory" clearable style="width: 280px">
            <t-option v-for="item in unCategoryOption" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </t-form-item>
      </t-col>
      <!-- 第 5️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="抽样方案类型" name="samplingStandardType">
          <t-radio-group v-model="dtlData.samplingStandardType" default-value="1">
            <t-radio value="GB">国标</t-radio>
            <t-radio value="QB">企标</t-radio>
          </t-radio-group>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="抽样方案" name="samplingStandardCode">
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
      </t-col>
      <t-col :span="4">
        <t-form-item
          label="检验水平"
          label-align="right"
          name="inspectLevel"
          :required-mark="dtlData.samplingStandardType === '1'"
        >
          <t-select
            v-model="dtlData.inspectLevel"
            clearable
            style="width: 280px"
            :disabled="dtlData.samplingStandardType !== '1'"
          >
            <t-option v-for="item in levelOption" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </t-form-item>
      </t-col>
      <!-- 第 5️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="附件：" name="mitemCode">
          <t-link theme="primary" @click="formVisible = true"> 附件上传 </t-link>
        </t-form-item>
      </t-col>
    </t-row>
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
        :is-hand-delete="true"
        upload-path="inspectStd"
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

const fileList = ref([]);
const formVisible = ref(false);
const dtlData = ref({
  type: 'add',
  iqcInspectStdId: '',
  itemSeq: '',
  itemCategory: '',
  id: '',
  itemName: '',
  characteristics: '',
  baseValue: '',
  maxValue: '',
  minValue: '',
  technicalRequest: '',
  uom: '',
  uomName: '',
  samplingStandardType: '1',
  samplingStandardCode: '',
  inspectLevel: '',
  inspectLevelName: '',
  inspectTool: '',
  isCtq: '',
  unqualifyCategory: '',
  inspectBasis: '',
  inspectType: '',
});

// #表单定义规则
const rules: FormRules = {
  itemCategory: [{ required: true, message: '不能为空', trigger: 'change' }],
  itemSeq: [{ required: true, message: '不能为空', trigger: 'change' }],
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
const init = () => {
  dtlData.value = {
    type: 'add',
    itemSeq: '',
    iqcInspectStdId: '',
    itemCategory: '',
    id: '',
    itemName: '',
    characteristics: '',
    baseValue: '',
    maxValue: '',
    minValue: '',
    technicalRequest: '',
    uom: '',
    uomName: '',
    samplingStandardType: '1',
    samplingStandardCode: '',
    inspectLevel: '',
    inspectLevelName: '',
    inspectTool: '',
    isCtq: '',
    unqualifyCategory: '',
    inspectBasis: '',
    inspectType: '',
  };
};
const onConfirmFile = () => {
  formVisible.value = false;
};

// 下拉初始数据
const characteristicsOptions = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_CHARACTERISTICS' }).then((data) => {
  characteristicsOptions.value = data;
});
const stdTypeOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_TYPE' }).then((data) => {
  stdTypeOption.value = data;
});
const categoryOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_ITEM_CATEGORY' }).then((data) => {
  categoryOption.value = data;
});
const levelOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_STD_LEVEL' }).then((data) => {
  levelOption.value = data;
});
const unCategoryOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_IQC_UNQUALIFY_CATEGORY' }).then((data) => {
  unCategoryOption.value = data;
});

const rowData = ref();

const onConfirmDtl = async () => {
  // 首先创建一个数组来存储需要检查非空的属性
  const requiredFields = [
    'itemCategory',
    'itemName',
    'characteristics',
    'samplingStandardType',
    'samplingStandardCode',
    'inspectTool',
    'unqualifyCategory',
    'inspectBasis',
    'inspectType',
    'itemSeq',
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
  if (dtlData.value.itemSeq && (!Number(dtlData.value.itemSeq) || Number(dtlData.value.itemSeq) < 0)) {
    MessagePlugin.error('项目行号须为正数');
    return false;
  }
  if (dtlData.value.uom) {
    const res = await apiQuality.oqcInspectStdDtl.getUom({ uom: dtlData.value.uom });
    dtlData.value.uomName = res.uomName;
  }
  if (dtlData.value.inspectLevel) {
    dtlData.value.inspectLevelName = levelOption.value.find((item) => item.value === dtlData.value.inspectLevel)?.label;
  }
  rowData.value = {
    ...dtlData.value,
    fileList,
    samplingStandardTypeName: dtlData.value.samplingStandardType === '1' ? '国标' : '企标',
    itemCategoryName: categoryOption.value.find((item) => item.value === dtlData.value.itemCategory)?.label,
    inspectTypeName: stdTypeOption.value.find((item) => item.value === dtlData.value.inspectType)?.label,
    unqualifyCategoryName: unCategoryOption.value.find((item) => item.value === dtlData.value.unqualifyCategory)?.label,
    characteristicsName: characteristicsOptions.value.find((item) => item.value === dtlData.value.characteristics)
      ?.label,
  };
  return true;
};

const uploadSuccess = (file: AddFileType) => {
  MessagePlugin.info(`上传文件成功`);
  fileList.value.push(file);
  console.log('🚀 ~ file: materialStandardAdd.vue:149 ~ uploadSuccess ~ files.value:', fileList.value);

  console.log('🚀 ~ file: materialStandardAdd.vue:150 ~ uploadSuccess ~ file:', file);
};

const uploadfail = (file: AddFileType) => {
  MessagePlugin.info(`上传文件失败`);
  console.log('uploadSuccess', file);
};

const deleteSuccess = (file: AddFileType) => {
  MessagePlugin.info(`删除一个文件成功`);
  console.log('deleteSuccess', file);
  fileList.value = fileList.value.filter((item) => item.signedUrl !== file.signedUrl);
};

const batchDeleteSuccess = (files: AddFileType[]) => {
  MessagePlugin.info(
    `删除多个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  );
  console.log('batchDeleteSuccess', files);
};

defineExpose({
  onConfirmDtl,
  dtlData,
  fileList,
  init,
  rowData,
});
</script>
