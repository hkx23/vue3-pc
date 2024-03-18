<template>
  <cmp-container :full="true">
    <!-- !提交暂存模块 -->
    <cmp-card>
      <t-row :full="true">
        <t-col :flex="8">
          <h3>检验单号：{{ headerDate.billNo }}</h3>
        </t-col>
        <t-col :flex="1.5">创建时间：{{ headerDate.timeCreate }}</t-col>
        <t-col :flex="0.5"><icon name="close" size="20px" style="cursor: pointer" @click="onClose"></icon></t-col>
      </t-row>
      <t-row :full="true">
        <hr size="5" width="2000px" color="#808080" />
      </t-row>
      <t-row :gutter="[32, 16]">
        <t-col :span="3">
          <t-descriptions>
            <t-descriptions-item label="工作中心：" name="wcName">{{ headerDate.wcName }}</t-descriptions-item>
          </t-descriptions>
        </t-col>
        <t-col :span="3">
          <t-descriptions>
            <t-descriptions-item label="排产单号：" name="scheCode">{{ headerDate.scheCode }}</t-descriptions-item>
          </t-descriptions>
        </t-col>
        <t-col :span="3">
          <t-descriptions>
            <t-descriptions-item label="物料编码：" name="mitemCode">{{ headerDate.mitemCode }}</t-descriptions-item>
          </t-descriptions>
        </t-col>
        <t-col :span="3">
          <t-descriptions>
            <t-descriptions-item label="物料描述：" name="mitemDesc">{{ headerDate.mitemDesc }}</t-descriptions-item>
          </t-descriptions>
        </t-col>
      </t-row>
      <t-row :gutter="[32, 16]">
        <t-col :span="3">
          <t-descriptions>
            <t-descriptions-item label="排产数量：" name="scheQty">{{ headerDate.scheQty }}</t-descriptions-item>
          </t-descriptions>
        </t-col>
        <t-col :span="3">
          <t-descriptions
            ><t-descriptions-item label="检验标准：" name="inspectStdName">{{
              headerDate.inspectStdName
            }}</t-descriptions-item>
          </t-descriptions>
        </t-col>
        <t-col :span="3">
          <t-descriptions>
            <t-descriptions-item label="班组：" name="reason">{{ headerDate.scheCode }}</t-descriptions-item>
          </t-descriptions>
        </t-col>
        <t-col :span="3">
          <t-descriptions>
            <t-descriptions-item label="检验时机：" name="inspectOpportunityName">{{
              headerDate.inspectOpportunityName
            }}</t-descriptions-item>
          </t-descriptions>
        </t-col>
      </t-row>
      <t-row :gutter="[32, 16]">
        <t-col :span="3">
          <t-descriptions>
            <t-descriptions-item label="检验完成时间：" name="datetimeInspectEnd">{{
              headerDate.datetimeInspectEnd
            }}</t-descriptions-item>
          </t-descriptions>
        </t-col>
        <t-col :span="3">
          <t-descriptions>
            <t-descriptions-item label="检验员：" name="userInspectName">{{
              headerDate.userInspectName
            }}</t-descriptions-item>
          </t-descriptions>
        </t-col>
      </t-row>
      <div>
        <t-image :src="stampUrl" class="stamp" />
      </div>
    </cmp-card>
    <!-- !基础信息模块 -->
    <cmp-card>
      <div></div>
    </cmp-card>
    <!-- !检验项目表格模块 -->
    <cmp-card class="cards_title">
      <cmp-table
        ref="tableRefCard"
        v-model:pagination="pageUI"
        row-key="index"
        :active-row-type="'single'"
        :hover="true"
        :fixed-height="true"
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
          <t-popconfirm content="是否确认删除？" @confirm="delBatch">
            <t-button :disabled="!delBtutControl" theme="default"> 批量删除 </t-button>
          </t-popconfirm>
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
</template>

<script setup lang="ts">
// import { debounce } from 'lodash';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { Icon, MessagePlugin } from 'tdesign-vue-next';
import { computed, Ref, ref } from 'vue';

import { api } from '@/api/quality';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

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

// 接收父组件的参数
const props = defineProps({
  rowData: Object,
});
// 计算头部数据
const headerDate = computed(() => {
  return props.rowData ? props.rowData.bill : {};
});
// 根据检查结果获取对应的戳
const stampUrl = computed(() => {
  const result = props.rowData.bill.inspectResult;
  console.log(result);
  switch (result) {
    case 'OK':
      return '../../../../../../public/images/pqcInspectFirst/stamp/OK.png';
    case 'NG':
      return '../../../../../../public/images/pqcInspectFirst/stamp/NG.png';
    default:
      return '../../../../../../public/images/pqcInspectFirst/stamp/UNDERWAY.png';
  }
});

// 父方法
const Emit = defineEmits(['permissionShow']);
// 关闭窗口回到主页面
const onClose = () => {
  Emit('permissionShow', false); // 回到父
};

// 父方法
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
const onAdd = () => {
  formTitle.value = '新增检验项目';
  dtlFormRef.value.init();
  dtlFormRef.value.dtlData.iqcInspectStdId = formData.value.id;
  opType.value = 'add';
  touchstoneFormVisible.value = true;
};

const onDtlSelectedChange = (value: any) => {
  dtlRowKeys.value = value;
  delBtutControl.value = dtlRowKeys.value?.length > 1;
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
  } else {
    allDtl.value.splice(row.index, 1);
  }
  onRefresh();
};
const delBatch = async () => {
  console.log('111111111111111111');
  if (formData.value.operateTpye === 'add') {
    // 找出所有对应索引的元素并将它们的ID收集到一个数组中
    const idsToDelete = dtlRowKeys.value.map((index) => dtlTabData.value[index].id);

    // 调用 removeBatch 方法删除对应的元素
    await api.iqcInspectStdDtl.removeBatch(idsToDelete);
  } else {
    // 获取要删除的索引，并按从大到小的顺序排序
    const indexesToDelete = dtlRowKeys.value.sort((a, b) => b - a);
    // 逐个删除元素
    indexesToDelete.forEach((index) => {
      allDtl.value.splice(index, 1);
    });
  }
  onRefresh();
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

const onRefresh = async () => {
  if (formData.value.operateTpye === 'add') {
    await getDtlById();
  } else {
    await getAllDtlFormCache();
  }
  dtlRowKeys.value = [];
  submitButControl.value = !!dtlTabData.value;
  console.log(submitButControl.value);
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

.stamp {
  position: absolute;
  background-color: transparent;
  top: 50px; /* 设置图片顶部距离容器顶部的距离 */
  right: 50px; /* 设置图片左侧距离容器左侧的距离 */
}
</style>
