<template>
  <t-form ref="formRef" :rules="rules">
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
          <t-select v-model="dtlData.characteristics" :clearable="true">
            <t-option key="apple" label="计数" value="apple" />
            <t-option key="apple" label="非计数" value="apple" />
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
            <t-radio value="1">国标</t-radio>
            <t-radio value="2">企标</t-radio>
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
});

// #表单定义规则
const rules: FormRules = {
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

  return true;
};

const uploadSuccess = (file: AddFileType) => {
  MessagePlugin.info(
    `上传一个文件成功,如果是需要实时更新业务数据，可使用对应FILE的路径，文件名，文件大小等信息自行写逻辑上传到后端`,
  );
  fileList.value.push(file);
  console.log('🚀 ~ file: materialStandardAdd.vue:149 ~ uploadSuccess ~ files.value:', fileList.value);

  console.log('🚀 ~ file: materialStandardAdd.vue:150 ~ uploadSuccess ~ file:', file);
};

const uploadfail = (file: AddFileType) => {
  MessagePlugin.info(`上传一个文件失败,这个暂时没想到场景`);
  console.log('uploadSuccess', file);
};

const deleteSuccess = (file: AddFileType) => {
  MessagePlugin.info(
    `删除一个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  );
  console.log('deleteSuccess', file);
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
  init,
});
</script>
