<template>
  <cmp-container :full="true">
    <!-- !单据基本信息部分 -->
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
    <!-- !条码部分 -->
    <cmp-card v-if="barcodeData.length > 0">
      <t-row align="middle" type="flex">
        <t-col v-for="(item, index) in barcodeData" :key="index" :lg="{ span: 3 }" :offset="0">
          <t-card class="box-card">
            <div
              slot1="header"
              class="barcodeDiv"
              :style="{ backgroundColor: index === selectedCol ? 'lightblue' : 'white' }"
              @click="searchItems(index)"
            >
              <t-row>
                <t-col :flex="1">
                  <h2>{{ index + 1 }}</h2>
                </t-col>
                <t-col :flex="5">
                  {{ item.scanBarcode }}
                </t-col>
                <t-col :flex="1">
                  <t-tag
                    shape="round"
                    theme="primary"
                    :class="{
                      OK: item.inspectResultName === '合格',
                      NG: item.inspectResultName === '不合格',
                      UNDERWAY: item.inspectResultName === '暂无结果',
                    }"
                    >{{ item.inspectResultName }}</t-tag
                  >
                </t-col>
              </t-row>
            </div>
          </t-card>
        </t-col>
      </t-row>
      <!-- <div v-for="(item, index) in barcodeData" v-if="index < 5" :key="index" class="barcodeDiv">
        {{ item.scanBarcode }}
      </div> -->
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
import { Icon, MessagePlugin } from 'tdesign-vue-next';
import { computed, Ref, ref, watch } from 'vue';

import { api, PqcInspectFirstVO } from '@/api/quality';
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
const barcodeData = ref<PqcInspectFirstVO[]>([]); // 条码栏数据
const id = ref(''); // 用于watch监听，控制加载
const selectedCol = ref();

// 接收父组件的参数
const props = defineProps({
  rowData: Object,
});
// 计算头部数据
const headerDate = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  id.value = props.rowData.bill.id;
  return props.rowData ? props.rowData.bill : {};
});
// 根据检查结果获取对应的戳
const stampUrl = computed(() => {
  const result = props.rowData.bill.inspectResult;
  switch (result) {
    case 'OK':
      return '../../../../../../public/images/pqcInspectFirst/stamp/OK.png';
    case 'NG':
      return '../../../../../../public/images/pqcInspectFirst/stamp/NG.png';
    default:
      return '../../../../../../public/images/pqcInspectFirst/stamp/UNDERWAY.png';
  }
});
// 监听 id 的变化
watch(id, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    const res = await api.pqcInspectFirst.getBarcodes(props.rowData.bill.id);
    console.log('这是标签的数据：', res);
    barcodeData.value = res;
  }
});
// 父方法
const Emit = defineEmits(['permissionShow']);
// 关闭窗口回到主页面
const onClose = () => {
  Emit('permissionShow', false); // 回到父
};
// 如果点击事件拿到的index和他自己所持有的一样，则变bgc,当前方法做参数传递
const searchItems = async (index) => {
  selectedCol.value = index;
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

.barcodeDiv {
  border-width: 2px;
  border-style: solid;
  border-color: rgb(49 172 243);
  border-radius: 5px;
  padding: 10px;
}

//条码栏背景card去边框
.box-card {
  border: none;
}
//检验结果tag根据结果的不同适用不同的主题样式
.OK {
  background-color: green;
}

.NG {
  background-color: red;
}

.UNDERWAY {
  background-color: blueviolet;
}
</style>
