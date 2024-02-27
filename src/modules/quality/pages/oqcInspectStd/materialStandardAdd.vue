<template>
  <cmp-container :full="true">
    <!-- !提交暂存模块 -->
    <cmp-card :span="12">
      <t-row justify="space-between" align="center">
        <t-col
          ><span class="span_title">{{ getTitle(formData.operateTpye) }}</span></t-col
        >
        <t-col>
          <t-button @click="submit">提交</t-button>
          <t-button theme="default" @click="onStaging">暂存</t-button>
          <t-button theme="default" @click="onClose">关闭</t-button>
        </t-col>
      </t-row>
    </cmp-card>
    <!-- !基础信息模块 -->
    <cmp-card :span="12" title="基础信息" class="cards_title">
      <t-form ref="formRef" :rules="rules" :data="formData" :show-error-message="false">
        <t-row :gutter="[32, 16]">
          <t-col :span="4">
            <t-form-item label="标准编码" label-align="right" name="inspectStdCode">
              <t-input v-model="formData.inspectStdCode" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="标准名称" label-align="right" name="inspectStdName">
              <t-input v-model="formData.inspectStdName" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="版本号" label-align="right" name="revision">
              <t-input v-model="formData.revision" style="width: 200px" />
            </t-form-item>
          </t-col>
          <!-- 第 2️⃣ 行数据 -->
          <t-col :span="4">
            <t-form-item label="状态" label-align="right" name="status">
              <t-select v-model="formData.status" clearable style="width: 200px" :disabled="true">
                <t-option v-for="item in statusOption" :key="item.id" :label="item.label" :value="item.value" />
              </t-select>
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="集团检验标准" label-align="right" name="groupInspectStdId">
              <t-input v-model="formData.groupInspectStdId" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="生效时间" label-align="right" name="timeEffective">
              <t-date-picker v-model="formData.timeEffective" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="失效时间" label-align="right" name="timeInvalid">
              <t-date-picker v-model="formData.timeInvalid" style="width: 200px" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="检验类型" label-align="right" name="inspectTypeList">
              <t-select v-model="formData.inspectTypeList" multiple clearable style="width: 200px">
                <t-option v-for="(item, index) in stdTypeOption" :key="index" :label="item.label" :value="item.value" />
              </t-select>
            </t-form-item>
          </t-col>
          <!-- 第 3️⃣ 行数据 -->
          <t-col :span="4">
            <t-form-item label="附件：" name="mitemCode">
              <t-link theme="primary" @click="formVisible = true"> 附件上传 </t-link>
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
        :table-column="tableStdDtlColumns"
        :table-data="tableData"
        :total="dataTotal"
        :selected-row-keys="dtlRowKeys"
        @select-change="onDtlSelectedChange"
        @refresh="onRefresh"
      >
        <template #title>
          {{ '检验项目' }}
        </template>
        <template #op="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEdit(row)">{{ '编辑' }}</t-link>
          </t-space>
        </template>
        <template #button>
          <!-- <t-input placeholder="请输入搜索关键字">
            <template #suffixIcon>
              <search-icon :style="{ cursor: 'pointer' }" />
            </template>
          </t-input> -->
          <t-button @click="onAdd"> 新增 </t-button>
          <t-popconfirm content="是否确认删除" @confirm="onDelDtlData">
            <t-button theme="default" :disabled="dtlRowKeys.length < 1">删除</t-button>
          </t-popconfirm>
        </template>
        <template #inspectTypeListOp="{ row }">
          <t-row>
            <div v-for="(type, index) in row.inspectTypeList" :key="index" class="tag-item">
              <t-tag theme="primary">{{ getLabelByValue(type) }}</t-tag>
            </div>
          </t-row>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- !上传组件 弹框 -->
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
import { FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { Ref, ref } from 'vue';

import { api } from '@/api/main';
import { api as apiQuality } from '@/api/quality';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import touchstoneForm from './touchstoneForm.vue';

const { pageUI } = usePage(); // 分页工具
const formRef = ref(null);
const formVisible = ref(false);
const touchstoneFormVisible = ref(false);
const dataTotal = ref(0);
const dtlRowKeys: Ref<any[]> = ref([]);
const formTitle = ref('');
const ids = ref([]);
const perId = ref('');
const dtlFormRef = ref(null); // 新增表单数据清除，获取表单实例
const onAdd = () => {
  console.log(dtlFormRef.value.dtlData);
  formTitle.value = '检验项目新增';
  opType.value = 'add';
  dtlFormRef.value.init();
  touchstoneFormVisible.value = true;
  dtlFormRef.value.dtlData.samplingStandardType = '1';
};
const onEdit = async (row) => {
  formTitle.value = '检验项目编辑';
  await dtlFormRef.value.init();
  opType.value = 'edit';
  dtlFormRef.value.dtlData.id = row.id;
  await dtlFormRef.value.getDtlById();
  dtlFormRef.value.dtlData.samplingStandardType = '1';
  touchstoneFormVisible.value = true;
};
const getLabelByValue = (value) => {
  const option = stdTypeOption.find((item) => item.value === value);
  return option ? option.label : '';
};

const onRefresh = () => {
  getDtlByStdId();
};
const getDtlByStdId = async () => {
  const res = await apiQuality.oqcInspectStdDtl.getAllDtlByStdId({
    stdId: formData.value.id,
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
  });
  tableData.value = res.list.map((item, index) => ({ ...item, index }));
  dataTotal.value = res.total;
};
const getTitle = (type) => {
  switch (type) {
    case 'add':
      return '新增产品检验标准';
    case 'edit':
      return '编辑产品检验标准';
    case 'copy':
      return '复制产品检验标准';
    default:
      return '';
  }
};
const onDtlSelectedChange = (value: any) => {
  dtlRowKeys.value = value;
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
const init = () => {
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
  tableData.value = [];
  dataTotal.value = 0;
};
const statusOption = ref([]);
api.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_STD_STATUS' }).then((data) => {
  // 过滤满足特定条件的元素
  const filteredData = data.filter((item) => {
    const { value } = item;
    // 只保留 label 为 '起草中'、'已生效'、'已失效' 的元素
    return value === 'DRAFT' || value === 'EFFECTIVE' || value === 'EXPIRED';
  });

  // 将过滤后的结果赋值给 statusOption.value
  statusOption.value = filteredData;
});
// 下拉初始数据
const stdTypeOption = [
  { label: '首检', value: 1 },
  { label: '巡检', value: 2 },
  { label: '抽检', value: 4 },
  { label: '复检', value: 8 },
];

const submit = async () => {
  try {
    if (isEmpty(formData.value.inspectStdCode)) {
      MessagePlugin.error('请输入标准编码');
      return false;
    }
    if (isEmpty(formData.value.inspectStdName)) {
      MessagePlugin.error('请输入标准名称');
      return false;
    }
    if (isEmpty(formData.value.timeEffective)) {
      MessagePlugin.error('请选择生效时间');
      return false;
    }
    if (isEmpty(formData.value.timeInvalid)) {
      MessagePlugin.error('请选择失效时间');
      return false;
    }
    if (isEmpty(formData.value.inspectTypeList)) {
      MessagePlugin.error('请选择检验类型');
      return false;
    }

    const timeEffective = new Date(formData.value.timeEffective);
    const timeInvalid = new Date(formData.value.timeInvalid);

    if (timeEffective >= timeInvalid) {
      MessagePlugin.error('失效时间必须大于生效时间');
      return false;
    }
    if (tableData.value.length < 1) {
      MessagePlugin.error('请新增标准明细');
      return false;
    }

    formData.value.status = formData.value.saveTpye === 'add' ? 'EFFECTIVE' : 'DRAFT';
    if (formData.value.operateTpye === 'add') {
      await apiQuality.oqcInspectStd.addOqcInspectStd({
        ...formData.value,
        list: tableData.value,
        fileList: fileList.value,
      });
      MessagePlugin.success('新增成功');
      Emit('permissionShow', false); // 回到父
    } else if (formData.value.operateTpye === 'edit') {
      await apiQuality.oqcInspectStd.changeStd({
        ...formData.value,
        perId: perId.value,
        fileList: fileList.value,
      });
      MessagePlugin.success('编辑成功');
      Emit('permissionShow', false); // 回到父
    } else if (formData.value.operateTpye === 'copy') {
      await apiQuality.oqcInspectStd.changeStd({
        ...formData.value,
        fileList: fileList.value,
        perId: formData.value.id,
      });
      MessagePlugin.success('复制成功');
      Emit('permissionShow', false); // 回到父
    }
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
};
const opType = ref('add');
const onConfirmDtl = async () => {
  const data = await dtlFormRef.value.onConfirmDtl();
  if (data) {
    if (opType.value === 'add') {
      tableData.value.push(dtlFormRef.value.rowData);
    } else if (opType.value === 'edit') {
      await apiQuality.oqcInspectStdDtl.updateDtlById(dtlFormRef.value.rowData);
      onRefresh();
    }
    touchstoneFormVisible.value = false;
  }
};
const onConfirmFile = () => {
  formVisible.value = false;
};
const onDelDtlData = async () => {
  const idsDel = [];
  const noId = [];
  await dtlRowKeys.value.forEach((number) => {
    const item = tableData.value[number];
    if (item.id) {
      ids.value.push(item.id);
      idsDel.push(item);
    } else {
      noId.push(item);
    }
  });
  // 筛选出 tableData.value 中不在 noId 数组中的元素
  if (noId.length > 0) {
    tableData.value = tableData.value.filter((item) => !noId.includes(item));
  }
  if (ids.value.length > 0) {
    // await apiQuality.oqcInspectStdDtl.delByIds(ids);
    tableData.value = tableData.value.filter((item) => !idsDel.includes(item));
  }
  MessagePlugin.success('删除成功');
  dataTotal.value -= dtlRowKeys.value.length;
  dtlRowKeys.value = [];
};

// 父方法
const Emit = defineEmits(['permissionShow']);
// 关闭窗口回到主页面
const onStaging = async () => {
  formData.value.saveTpye = 'onStaging';
  const data = await submit();
  if (data) {
    Emit('permissionShow', false); // 回到父
  }
};
const onClose = async () => {
  if (formData.value.operateTpye !== 'add') {
    await apiQuality.oqcInspectStd.delById([formData.value.id]);
  }
  Emit('permissionShow', false); // 回到父
};

// // 上传文件
const fileList = ref([]);

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

const tableData = ref([]);

const tableStdDtlColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  {
    colKey: 'itemName',
    title: '项目名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'itemCategoryName',
    title: '项目类别',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'characteristicsName',
    title: '项目特性',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectTypeListOp',
    title: '检验类型',
    align: 'center',
    width: '250',
  },
  {
    colKey: 'inspectTool',
    title: '检验工具',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'technicalRequest',
    title: '技术要求',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectBasis',
    title: '检验依据',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'samplingStandardCode',
    title: '抽样标准',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'unqualifyCategoryName',
    title: '不合格分类',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectFrequency',
    title: '检验频率',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectLevelName',
    title: '检验水平',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'uomName',
    title: '单位',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'attachement',
    title: '附件',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'op',
    title: '操作',
    fixed: 'right',
    align: 'left',
    width: '60',
  },
];
// #表单定义规则
const rules: FormRules = {
  inspectStdCode: [{ required: true, message: '不能为空', trigger: 'change' }],
  itemSeq: [{ required: true, message: '不能为空', trigger: 'change' }],
  inspectStdName: [{ required: true, message: '不能为空', trigger: 'change' }],
  timeEffective: [{ required: true, message: '不能为空', trigger: 'change' }],
  timeInvalid: [{ required: true, message: '不能为空', trigger: 'change' }],
  status: [{ required: true, message: '不能为空', trigger: 'change' }],
  revision: [{ required: true, message: '不能为空', trigger: 'change' }],
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

defineExpose({
  form: formRef,
  dtlRowKeys,
  formData,
  getDtlByStdId,
  init,
  perId,
  fileList,
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

.tag-item {
  margin-right: 8px; /* 控制标签之间的间距 */
  align-items: center; /* 垂直居中 */
}

.span_title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 16px;
}
</style>
