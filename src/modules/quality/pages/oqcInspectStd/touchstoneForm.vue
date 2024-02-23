<template>
  <t-form ref="formRef" :rules="rules" label-align="right" label-width="120px">
    <t-row :gutter="[32, 16]">
      <!-- 第 1️⃣ 行数据 -->
      <t-col :span="4">
        <t-form-item label="项目名称" label-align="right" name="itemName">
          <t-input v-model="dtlData.itemName" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="项目类别" label-align="right" name="itemCategory">
          <t-select v-model="dtlData.itemCategory" clearable style="width: 280px">
            <t-option v-for="item in categoryOption" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="项目行号" label-align="right" name="itemSeq">
          <t-input v-model="dtlData.itemSeq" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="抽样标准类型" label-align="right" name="samplingStandardType">
          <t-radio-group v-model="dtlData.samplingStandardType" default-value="1">
            <t-radio value="1">国标</t-radio>
            <t-radio value="2">企标</t-radio>
          </t-radio-group>
        </t-form-item>
      </t-col>
      <t-col :span="4">
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
      </t-col>
      <t-col :span="4">
        <t-form-item label="项目特性" label-align="right" name="characteristics">
          <t-select v-model="dtlData.characteristics" clearable style="width: 280px">
            <t-option
              v-for="(item, index) in characteristicsOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="不合格分类" label-align="right" name="unqualifyCategory">
          <t-select v-model="dtlData.unqualifyCategory" clearable style="width: 280px">
            <t-option v-for="item in unCategoryOption" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="检验类型" label-align="right" name="inspectTypeList">
          <t-select v-model="dtlData.inspectTypeList" clearable multiple style="width: 280px">
            <t-option v-for="(item, index) in stdTypeOption" :key="index" :label="item.label" :value="item.value" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="检验属性" label-align="right" name="inspectProperty">
          <t-select v-model="dtlData.inspectProperty" clearable style="width: 280px">
            <t-option v-for="item in propertyOption" :key="item.id" :label="item.label" :value="item.value" />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="检验工具" label-align="right" name="inspectTool">
          <t-input v-model="dtlData.inspectTool" style="width: 280px" />
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
      <t-col :span="4">
        <t-form-item label="检验依据" label-align="right" name="inspectBasis">
          <t-input v-model="dtlData.inspectBasis" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="工序" label-align="right" name="processId">
          <bcmp-select-business v-model="dtlData.processId" type="process" :show-title="false"></bcmp-select-business>
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="技术要求" label-align="right" name="technicalRequest">
          <t-input v-model="dtlData.technicalRequest" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="最小值" label-align="right" name="minValue">
          <t-input v-model="dtlData.minValue" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
        <t-form-item label="最大值" label-align="right" name="maxValue">
          <t-input v-model="dtlData.maxValue" style="width: 280px" />
        </t-form-item>
      </t-col>
      <t-col :span="4">
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
      </t-col>
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
    :cancel-btn="null"
    :confirm-btn="null"
    width="50%"
  >
    <cmp-container :full="true">
      <bcmp-upload-content :file-list="fileList"></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="tsx">
// import { isEmpty } from 'lodash';
import { FormRules } from 'tdesign-vue-next';
import { ref } from 'vue';

import { api } from '@/api/main';
import { api as apiQuality } from '@/api/quality';

// 父方法
// const Emit = defineEmits(['permissionShow']);
const fileList = ref([]);
const formVisible = ref(false);

const dtlData = ref({
  itemSeq: '',
  itemCategory: '',
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
  unqualifyCategory: '',
  inspectBasis: '',
  inspectTypeList: [],
  inspectProperty: '',
  processId: '',
});
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
const characteristicsOptions = [
  { label: '计数', value: 1 },
  { label: '计量', value: 2 },
];

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

const categoryOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_ITEM_CATEGORY' }).then((data) => {
  categoryOption.value = data;
});
const levelOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_LEVEL' }).then((data) => {
  levelOption.value = data;
});
const unCategoryOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_UNQUALIFY_CATEGORY' }).then((data) => {
  unCategoryOption.value = data;
});
const propertyOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_PROPERTY' }).then((data) => {
  propertyOption.value = data;
});

// const onConfirmDtl = async () => {
//   // 首先创建一个数组来存储需要检查非空的属性
//   const requiredFields = [
//     'itemCategory',
//     'itemName',
//     'itemSeq',
//     'characteristics',
//     'samplingStandardType',
//     'samplingStandardCode',
//     'inspectTool',
//     'unqualifyCategory',
//     'inspectBasis',
//     'inspectTypeList',
//     'inspectProperty',
//   ];

//   // 遍历 requiredFields 数组，检查每个属性是否为空
//   const emptyFields = [];
//   requiredFields.forEach((field) => {
//     if (!dtlData.value[field]) {
//       emptyFields.push(field);
//       console.log(emptyFields);
//     }
//   });
//   console.log(dtlData.value);
//   // 如果存在空值属性，则输出提示信息并阻止添加操作
//   if (emptyFields.length > 0) {
//     MessagePlugin.warning('请补充表单信息');
//     return;
//   }
//   if (dtlData.value.samplingStandardType === '1') {
//     if (isEmpty(dtlData.value.inspectLevel)) {
//       MessagePlugin.error('请补充表单信息');
//       return;
//     }
//   }
//   if (!Number(dtlData.value.itemSeq)) {
//     MessagePlugin.error('项目行号须为整数');
//     return;
//   }
//   // const item = tableData.value.find((item) => item.itemName === dtlData.value.itemName);
//   // if (item) {
//   //   MessagePlugin.warning('不允许添加相同项目名称的检验项目');
//   //   return;
//   // }

//   if (dtlData.value.uom) {
//     const res = await apiQuality.oqcInspectStdDtl.getUom({ uom: dtlData.value.uom });
//     dtlData.value.uomName = res.uomName;
//   }
//   if (dtlData.value.inspectLevel) {
//     dtlData.value.inspectLevelName = levelOption.value.find((item) => item.value === dtlData.value.inspectLevel)?.label;
//   }
//   const rowData = {
//     ...dtlData.value,
//     samplingStandardTypeName: dtlData.value.samplingStandardType === '1' ? '国标' : '企标',
//     itemCategoryName: categoryOption.value.find((item) => item.value === dtlData.value.itemCategory)?.label,
//     unqualifyCategoryName: unCategoryOption.value.find((item) => item.value === dtlData.value.unqualifyCategory)?.label,
//     characteristicsName: characteristicsOptions[Number(dtlData.value.characteristics) - 1].label,
//   };
//   Emit('permissionShow', false, rowData); // 回到父
// };
</script>
