<template>
  <cmp-container :full="true">
    <!-- !提交暂存模块 -->
    <cmp-card :span="12">
      <t-row justify="space-between" align="center">
        <t-col
          ><span class="span_title">{{ getTitle(formData.operateTpye) }}</span></t-col
        >
        <t-col>
          <t-button :disabled="!submitButControl" @click="onSubimit">提交</t-button>
          <t-button theme="default" @click="onStaging">暂存</t-button>
        </t-col>
      </t-row>
    </cmp-card>
    <!-- !基础信息模块 -->
    <cmp-card :span="12" title="基础信息" class="cards_title">
      <t-form ref="formRef" :rules="rules" :data="formData" :show-error-message="false">
        <t-row :gutter="[32, 16]">
          <!-- 第 1️⃣ 行数据 -->
          <t-col :span="4">
            <t-form-item label="标准编码" name="inspectStdCode">
              <t-input
                v-model="formData.inspectStdCode"
                style="width: 200px"
                :readonly="formData.operateTpye === 'edit'"
                @blur="onConfirmCode"
              ></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="标准名称" name="inspectStdName">
              <t-input v-model="formData.inspectStdName" style="width: 200px"></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="版本号" name="revision">
              <t-input v-model="formData.revision" style="width: 200px"></t-input>
            </t-form-item>
          </t-col>
          <!-- 第 2️⃣ 行数据 -->
          <t-col :span="4">
            <t-form-item label="集团检验标准" name="groupInspectStdId">
              <t-input v-model="formData.groupInspectStdId" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="生效时间" name="timeEffective" class="width: 100%">
              <t-date-picker v-model="formData.timeEffective" clearable style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="失效时间" name="timeInvalid">
              <t-date-picker v-model="formData.timeInvalid" clearable style="width: 200px" />
            </t-form-item>
          </t-col>
          <!-- 第 3️⃣ 行数据 -->
          <t-col :span="4">
            <t-form-item label="附件：" name="attachment">
              <t-link :disabled="!butControl" theme="primary" @click="formVisible = true"> 附件上传 </t-link>
            </t-form-item>
          </t-col>
        </t-row>
      </t-form>
    </cmp-card>
    <!-- !检验项目表格模块 -->
    <cmp-card :span="12" class="cards_title">
      <cmp-table
        ref="tableRefCard"
        v-model:pagination="pageUI"
        row-key="index"
        :active-row-type="'single'"
        :hover="true"
        :table-column="columns"
        :table-data="dtlTabData"
        :total="dataTotal"
        :selected-row-keys="dtlRowKeys"
        @select-change="onDtlSelectedChange"
      >
        <template #title>
          {{ '检验项目' }}
        </template>
        <template #qualifiedRangeOp="{ row }">
          <span v-if="row.maxValue !== null && row.minValue !== null">{{ `${row.minValue} ~ ${row.maxValue}` }}</span>
        </template>
        <template #isCtqName="{ row }">
          <span>{{ row.isCtq ? '是' : '否' }}</span>
        </template>
        <template #button>
          <t-input v-if="submitButControl" placeholder="请输入搜索关键字">
            <template #suffixIcon>
              <search-icon :style="{ cursor: 'pointer' }" />
            </template>
          </t-input>
          <t-button :disabled="!butControl" @click="onAdd"> 新增 </t-button>
          <t-button :disabled="!butControl" theme="default"> 导入 </t-button>
          <t-button :disabled="!delBtutControl" theme="default"> 批量删除 </t-button>
        </template>
        <template #operation="{ row }">
          <t-link theme="primary" style="padding-right: 8px" @click="onEdit(row)">编辑</t-link>
          <t-popconfirm content="继续将删除该标准该检验项目，是否继续？" @confirm="delDtlById(row)">
            <t-link theme="primary" style="padding-right: 8px">删除</t-link>
          </t-popconfirm>
          <t-link theme="primary" @click="onCopy(row)">复制</t-link>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- !上传组件 弹框 -->
  <t-dialog
    v-model:visible="formVisible"
    :close-on-overlay-click="false"
    header="附件上传"
    :confirm-btn="fileList.length >= 1 ? '确认' : null"
    width="50%"
    @confirm="onConfirmFile"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="fileList"
        upload-path="inspectStd"
        :is-hand-delete="true"
        @upload-success="uploadSuccess"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <!-- !检验项目新增 弹框 -->
  <t-dialog
    v-model:visible="touchstoneFormVisible"
    :close-on-overlay-click="false"
    :header="formTitle"
    confirm-btn="保存"
    width="85%"
    @confirm="onConfirmDtl"
  >
    <touchstoneForm ref="dtlFormRef"></touchstoneForm>
  </t-dialog>
</template>

<script setup lang="ts">
// import { debounce } from 'lodash';
import { isEmpty } from 'lodash';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { FormRules, MessagePlugin } from 'tdesign-vue-next';
import { Ref, ref } from 'vue';

import { api } from '@/api/quality';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import touchstoneForm from './touchstoneForm.vue';

const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false);
const butControl = ref(false);
const submitButControl = ref(false);
const delBtutControl = ref(false);
const formTitle = ref('');
const touchstoneFormVisible = ref(false);
const dataTotal = ref(0);
const dtlRowKeys: Ref<any[]> = ref([]);
const dtlFormRef = ref(null); // 新增表单数据清除，获取表单实例
const opType = ref('add');
// 父方法
const Emit = defineEmits(['permissionShow']);
const onConfirmFile = () => {
  formVisible.value = false;
};
const formData = ref({
  operateTpye: 'add',
  saveTpye: 'add',
  id: '',
  inspectStdCode: '',
  inspectStdName: '',
  groupInspectStdId: '',
  revision: null,
  timeEffective: '',
  timeInvalid: '',
  status: 'DRAFT',
  statusName: '起草中',
  inspectTypeList: [],
});
const getTitle = (type) => {
  switch (type) {
    case 'add':
      return '新增物料检验标准';
    case 'edit':
      return '编辑物料检验标准';
    case 'copy':
      return '复制物料检验标准';
    default:
      return '';
  }
};
// #表单定义规则
const rules: FormRules = {
  inspectStdCode: [{ required: true, message: '不能为空', trigger: 'change' }],
  inspectStdName: [{ required: true, message: '不能为空', trigger: 'change' }],
  timeEffective: [{ required: true, message: '不能为空', trigger: 'change' }],
  timeInvalid: [{ required: true, message: '不能为空', trigger: 'change' }],
  revision: [{ required: true, message: '不能为空', trigger: 'change' }],
};
const onAdd = () => {
  formTitle.value = '新增检验项目';
  dtlFormRef.value.init();
  dtlFormRef.value.dtlData.iqcInspectStdId = formData.value.id;
  opType.value = 'add';
  touchstoneFormVisible.value = true;
};

const onDtlSelectedChange = (value: any) => {
  dtlRowKeys.value = value;
  if (dtlRowKeys.value.length > 1) {
    delBtutControl.value = true;
  }
};
const onSubimit = async () => {
  if (isEmpty(formData.value.inspectStdCode)) {
    MessagePlugin.error('请输入标准编码');
    return;
  }
  if (isEmpty(formData.value.inspectStdName)) {
    MessagePlugin.error('请输入标准名称');
    return;
  }
  if (isEmpty(formData.value.timeEffective)) {
    MessagePlugin.error('请选择生效时间');
    return;
  }
  if (isEmpty(formData.value.timeInvalid)) {
    MessagePlugin.error('请选择失效时间');
    return;
  }
  if (!Number(formData.value.groupInspectStdId)) {
    MessagePlugin.error('集团检验标准须为数字（暂行）');
    return;
  }
  if (!Number(formData.value.revision) || Number(formData.value.revision) < 0) {
    MessagePlugin.error('版本号须为正数');
    return;
  }

  const today = new Date();
  const timeEffective = new Date(formData.value.timeEffective);
  const timeInvalid = new Date(formData.value.timeInvalid);

  if (timeEffective >= timeInvalid) {
    MessagePlugin.error('失效时间必须大于生效时间');
    return;
  }

  if (timeInvalid <= today) {
    MessagePlugin.error('失效时间必须大于今天');
    return;
  }
  if (formData.value.id && formData.value.operateTpye === 'add') {
    await api.iqcInspectStd.modify({
      ...formData.value,
      files: fileList.value,
      dtls: dtlTabData.value,
      isTemporaryStorage: false,
    });
    MessagePlugin.success('提交成功');
    Emit('permissionShow', false); // 回到父
  } else {
    await api.iqcInspectStd.modify({
      ...formData.value,
      files: fileList.value,
      dtls: allDtl.value,
      isTemporaryStorage: false,
    });
    MessagePlugin.success('提交成功');
    Emit('permissionShow', false); // 回到父
  }
};
const onStaging = async () => {
  if (isEmpty(formData.value.inspectStdCode)) {
    MessagePlugin.error('请输入标准编码');
    return;
  }
  if (isEmpty(formData.value.inspectStdName)) {
    MessagePlugin.error('请输入标准名称');
    return;
  }
  if (isEmpty(formData.value.timeEffective)) {
    MessagePlugin.error('请选择生效时间');
    return;
  }
  if (isEmpty(formData.value.timeInvalid)) {
    MessagePlugin.error('请选择失效时间');
    return;
  }
  if (!Number(formData.value.groupInspectStdId)) {
    MessagePlugin.error('集团检验标准须为数字（暂行）');
    return;
  }
  if (!Number(formData.value.revision) || Number(formData.value.revision) < 0) {
    MessagePlugin.error('版本号须为正数');
    return;
  }

  const today = new Date();
  const timeEffective = new Date(formData.value.timeEffective);
  const timeInvalid = new Date(formData.value.timeInvalid);

  if (timeEffective >= timeInvalid) {
    MessagePlugin.error('失效时间必须大于生效时间');
    return;
  }

  if (timeInvalid <= today) {
    MessagePlugin.error('失效时间必须大于今天');
    return;
  }
  if (!formData.value.id) {
    const res = (await api.iqcInspectStd.temporaryStorage({ ...formData.value })) as any;
    if (res) {
      butControl.value = true;
      formData.value.id = res;
      MessagePlugin.success('暂存成功');
    }
  } else if (formData.value.id && formData.value.operateTpye === 'add') {
    await api.iqcInspectStd.modify({
      ...formData.value,
      files: fileList.value,
      dtls: dtlTabData.value,
      isTemporaryStorage: true,
    });
    MessagePlugin.success('暂存成功');
    Emit('permissionShow', false); // 回到父
  } else if (formData.value.id && formData.value.operateTpye === 'edit') {
    await api.iqcInspectStd.modify({
      ...formData.value,
      files: fileList.value,
      dtls: allDtl.value,
      isTemporaryStorage: true,
    });
    MessagePlugin.success('暂存成功');
    Emit('permissionShow', false); // 回到父
  } else if (formData.value.id && formData.value.operateTpye === 'copy') {
    formData.value.id = '';
    await api.iqcInspectStd.modify({
      ...formData.value,
      files: fileList.value,
      dtls: allDtl.value,
      isTemporaryStorage: true,
    });
    MessagePlugin.success('暂存成功');
    Emit('permissionShow', false); // 回到父
  }
};
const onEdit = (row) => {
  formTitle.value = '检验项目编辑';
  opType.value = 'edit';
  const item = { ...row };
  dtlFormRef.value.dtlData = item;
  dtlFormRef.value.fileList = item.fileList ? item.fileList : [];
  touchstoneFormVisible.value = true;
};
const onCopy = (row) => {
  formTitle.value = '检验项目复制';
  opType.value = 'add';
  const item = { ...row };
  dtlFormRef.value.dtlData = item;
  dtlFormRef.value.fileList = item.fileList ? item.fileList : [];
  dtlFormRef.value.dtlData.itemName = '';
  touchstoneFormVisible.value = true;
};
const delDtlById = async (row) => {
  if (formData.value.operateTpye === 'add') {
    await api.iqcInspectStdDtl.removeBatch([row.id]);
    onRefresh();
  }
};

// // 上传文件
const fileList = ref([]);

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
const dtlTabData = ref([]);
const getDtlById = async () => {
  const res = (await api.iqcInspectStdDtl.getInspectStdDtlList({
    iqcInspectStdId: formData.value.id,
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  })) as any;
  if (res) {
    dtlTabData.value = res.list;
    dataTotal.value = res.total;
    dtlTabData.value.forEach((item, index) => {
      item.index = index;
    });
  }
};
const allDtl = ref([]);
const getAllDtlById = async () => {
  const res = (await api.iqcInspectStdDtl.getInspectStdDtlList({
    iqcInspectStdId: formData.value.id,
    pageNum: pageUI.value.page,
    pageSize: 9999999,
  })) as any;
  if (res) {
    allDtl.value = res.list;
    addIndex();
  }
};
const getAllDtlFormCache = async () => {
  if (allDtl.value) {
    let startIndex = 0;
    if (pageUI.value.page !== 1) {
      startIndex = (pageUI.value.page - 1) * pageUI.value.rows;
    }

    const firstTwentyElements = allDtl.value.slice(startIndex, startIndex + pageUI.value.rows);
    dtlTabData.value = firstTwentyElements;
  }
};
const columns = [
  {
    colKey: 'row-select',
    type: 'multiple',
  },
  {
    colKey: 'itemCategoryName',
    title: '项目类别',
  },
  {
    colKey: 'itemName',
    title: '检验内容',
  },
  {
    colKey: 'inspectTypeName',
    title: '检验类型',
  },
  {
    colKey: 'technicalRequest',
    title: '技术要求',
  },
  {
    colKey: 'unqualifyCategoryName',
    title: '不合格分类',
  },
  {
    colKey: 'characteristicsName',
    title: '项目特性',
  },
  {
    colKey: 'inspectTool',
    title: '检验工具',
  },
  {
    colKey: 'baseValue',
    title: '基准值',
  },
  {
    colKey: 'uomName',
    title: '单位',
  },
  {
    colKey: 'qualifiedRangeOp',
    title: '合格范围',
  },
  {
    colKey: 'samplingStandardCode',
    title: '抽样方案',
  },
  {
    colKey: 'inspectLevelName',
    title: '检验水平',
  },
  {
    colKey: 'isCtqName',
    title: '是否CTQ',
  },
  {
    colKey: 'inspectBasis',
    title: '检验依据',
  },
  {
    colKey: 'operation',
    title: '操作',
    fixed: 'right',
    width: '130',
  },
];
const init = () => {
  butControl.value = false;
  submitButControl.value = false;
  delBtutControl.value = false;
  fileList.value = [];
  formData.value = {
    operateTpye: 'add',
    saveTpye: 'add',
    id: '',
    inspectStdCode: '',
    inspectStdName: '',
    groupInspectStdId: '',
    revision: '1.0',
    timeEffective: '',
    timeInvalid: '',
    status: 'DRAFT',
    statusName: '起草中',
    inspectTypeList: [],
  };
  dtlTabData.value = [];
  dataTotal.value = 0;
};
const onConfirmDtl = async () => {
  const data = await dtlFormRef.value.onConfirmDtl();
  if (data) {
    // 只允许新增标准直接插入数据库
    if (opType.value === 'add' && formData.value.operateTpye === 'add') {
      await api.iqcInspectStdDtl.addDtl(dtlFormRef.value.rowData);
      onRefresh();
      if (dtlTabData.value.length > 0) {
        submitButControl.value = true;
      }
      // 只允许新增标准直接更新数据库
    } else if (opType.value === 'edit' && formData.value.operateTpye === 'edit') {
      // 校验itemName
      const result = confirmItemName();
      if (!result) {
        return;
      }
      // 替换总数据
      const allIndex = allDtl.value.findIndex((item) => item.index === dtlFormRef.value.rowData.index);
      if (allIndex !== -1) {
        allDtl.value.splice(allIndex, 1, dtlFormRef.value.rowData);
      }
      onRefresh();
    } else if (opType.value === 'add' && formData.value.operateTpye === 'edit') {
      // 校验itemName
      const result = confirmItemName();
      if (!result) {
        return;
      }
      allDtl.value.push({ ...dtlFormRef.value.rowData, index: allDtl.value.length });
      onRefresh();
    }
    touchstoneFormVisible.value = false;
  }
};
const onConfirmCode = async () => {
  if (formData.value.operateTpye === 'add') {
    console.log(formData.value.inspectStdCode);
  }
};
const onRefresh = () => {
  if (formData.value.operateTpye === 'add') {
    getDtlById();
  } else if (formData.value.operateTpye === 'edit') {
    getAllDtlFormCache();
  }
};
const confirmItemName = () => {
  if (opType.value === 'add') {
    // 校验itemName
    const item = allDtl.value.find((item) => item.itemName === dtlFormRef.value.rowData.itemName);
    if (item) {
      MessagePlugin.warning('检验内容重复');
      return false;
    }
  } else {
    // 校验itemName
    const item = allDtl.value.find(
      (item) => item.itemName === dtlFormRef.value.rowData.itemName && item.index !== dtlFormRef.value.rowData.index,
    );
    if (item) {
      MessagePlugin.warning('检验内容重复');
      return false;
    }
  }
  return true;
};

const addIndex = () => {
  allDtl.value.forEach((item, index) => {
    item.index = index;
  });
};

defineExpose({
  formData,
  init,
  fileList,
  getDtlById,
  getAllDtlById,
  getAllDtlFormCache,
  butControl,
  submitButControl,
  delBtutControl,
});
</script>

<style lang="less" scoped>
.cards_title {
  :deep(.t-card__title) {
    font-weight: bold;
    color: var(--td-gray-color-8);
    font-size: 16px;
  }
}

.span_title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 16px;
}
</style>
