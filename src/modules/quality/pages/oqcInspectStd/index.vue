<template>
  <cmp-container v-show="!pageShow" :full="true">
    <cmp-card class="full-tab">
      <t-tabs v-model="tagValue" @change="switchTab">
        <t-tab-panel :value="0" label="标准" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true" :gutter="[0, 0]">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <!-- 查询组件  -->
                <cmp-query :opts="opts" label-width="100" @submit="conditionEnter"></cmp-query>
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16">
                <cmp-table
                  key="mainTable"
                  v-model:pagination="pageUI"
                  row-key="id"
                  :table-column="groupColumns"
                  :table-data="stdList.list"
                  :loading="loading"
                  :fixed-height="true"
                  :total="stdTableTotal"
                  :hover="true"
                  :selected-row-keys="stdRowKeys"
                  @select-change="onSelectedChange"
                  @refresh="onRefresh"
                >
                  <template #title> 产品检验标准列表 </template>
                  <template #inspectStdCodeOp="{ row }">
                    <t-link theme="primary" @click="onCheck(row)">{{ row.inspectStdCode }}</t-link>
                  </template>
                  <template #op="{ row }">
                    <t-space :size="8">
                      <t-link theme="primary" :disabled="row.status === 'EXPIRED'" @click="onAssign(row)">{{
                        '分配'
                      }}</t-link>
                      <t-link theme="primary" :disabled="row.status === 'EXPIRED'" @click="onEdit(row)">{{
                        '编辑'
                      }}</t-link>
                      <t-popconfirm v-if="row.status === 'DRAFT'" content="是否确认删除" @confirm="onDelData(row)">
                        <t-link theme="primary" :disabled="row.status !== 'DRAFT'">{{ '删除' }}</t-link>
                      </t-popconfirm>
                      <t-popconfirm
                        v-if="row.status !== 'DRAFT'"
                        :disabled="row.status === 'EXPIRED'"
                        content="失效后该标准将被禁用，同时解除物料及物料类对该标准的引用，是否继续？"
                        @confirm="onChangStatus(row)"
                      >
                        <t-link theme="primary" style="padding-right: 8px" :disabled="row.status === 'EXPIRED'"
                          >失效</t-link
                        >
                      </t-popconfirm>
                      <t-link theme="primary" @click="onCopy(row)">{{ '复制' }}</t-link>
                    </t-space>
                  </template>
                  <template #button>
                    <t-space :size="8">
                      <t-button theme="primary" @click="onAdd">新增</t-button>
                      <import-button
                        theme="primary"
                        type="q_oqc_inspect_std"
                        button-text="导入"
                        @close="onRefresh"
                      ></import-button>
                      <t-popconfirm content="是否确认删除" @confirm="onDelDataBatch">
                        <t-button v-if="delButton" theme="default">删除</t-button>
                      </t-popconfirm>
                    </t-space>
                  </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
        <t-tab-panel :value="1" label="标准分配" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true">
              <cmp-card :ghost="true" class="padding-bottom-line-16">
                <cmp-query
                  :opts="assignOpts"
                  label-width="100"
                  :is-reset-query="false"
                  @submit="subSearchClick"
                  @reset="onReset"
                >
                  ></cmp-query
                >
              </cmp-card>
              <cmp-card :ghost="true" class="padding-top-noline-16">
                <cmp-table
                  v-model:pagination="pageUIMannage"
                  row-key="id"
                  select-on-row-click
                  :selected-row-keys="selectedAssignRowKeys"
                  :loading="loading"
                  :table-column="assignColumns"
                  :table-data="assignDataList.list"
                  :total="assignDataTabTotal"
                  :fixed-height="true"
                  @select-change="onProductRightFetchData"
                  @refresh="onRefreshTwo"
                >
                  <template #title> 标准分配列表 </template>
                  <template #button>
                    <t-space :size="8">
                      <t-button theme="primary" @click="onAddAssign">新增</t-button>
                      <t-button theme="default">导入</t-button>
                      <t-popconfirm content="是否确认删除" @confirm="onDelAssignDataBatch">
                        <t-button theme="default">批量删除</t-button>
                      </t-popconfirm>
                    </t-space>
                  </template>
                  <template #operations="{ row }">
                    <!-- <t-link theme="primary" style="padding-right: 8px" @click="onEditAssign(row)"> 编辑 </t-link> -->
                    <t-popconfirm theme="default" content="确认删除吗" @confirm="delAssign(row)">
                      <t-link theme="primary" style="padding-right: 8px"> 删除 </t-link>
                    </t-popconfirm>
                    <!-- <t-link theme="primary" @click="onCopyAssign(row)"> 复制 </t-link> -->
                  </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>
  <t-loading :loading="pageLoading" text="加载中..." fullscreen />
  <t-dialog v-model:visible="formVisible" :close-on-overlay-click="false" header="标准分配" @confirm="onAssignConfirm">
    <materialAllotForm ref="assignFormRef"></materialAllotForm>
  </t-dialog>
  <cmp-container v-show="pageShow" :full="true">
    <materialStandardAdd ref="formRef" @permission-show="onPermission"></materialStandardAdd>
  </cmp-container>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api as apiQuality } from '@/api/quality';
import ImportButton from '@/components/bcmp-import-multiple-button/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import utils from '@/utils/common';

import materialAllotForm from './form.vue';
import materialStandardAdd from './materialStandardAdd.vue';

const formRef = ref(null); // 新增表单数据清除，获取表单实例
const assignFormRef = ref(null); // 新增表单数据清除，获取表单实例
const formVisible = ref(false); // 新增表单数据清除，获取表单实例
const pageLoading = ref(false);
const { loading } = useLoading();
const { pageUI } = usePage(); // 分页工具
const { pageUI: pageUIMannage } = usePage(); // 分页工具
// $打印上 表格数据
const stdList = reactive({ list: [] });
// $打印上 表格数据
const stdTableTotal = ref(0);
// $管理上 表格数据
const assignDataList = reactive({ list: [] });
const assignDataTabTotal = ref(0);
// 日志界面 表格数据
const stdRowKeys: Ref<any[]> = ref([]); //
const selectedAssignRowKeys: Ref<any[]> = ref([]); // 打印数组
const onReset = () => {
  // const { resetSearch } = queryComponent.value;
  // resetSearch();
  assignDataList.list = [];
  assignDataTabTotal.value = 0;
  selectedAssignRowKeys.value = [];
};

const pageShow = ref(false);
const onPermission = (value) => {
  pageShow.value = value;
  onRefresh();
};
const onChangStatus = async (row) => {
  await apiQuality.oqcInspectStd.changStatus([row.id]);
  MessagePlugin.success('失效成功');
  onRefresh();
};
const onAssignConfirm = async () => {
  const data = await assignFormRef.value.submit();
  if (data) {
    formVisible.value = false;
    if (assignFormRef.value.formData.type === 'add') {
      if (
        !subQueryCondition.value.mitemId &&
        !subQueryCondition.value.mitemCategoryId &&
        !subQueryCondition.value.inspectStdCode
      ) {
        return;
      }
      onRefreshTwo();
    } else {
      onRefresh();
    }
  }
};

// 标准头表查询初始化
const queryCondition = ref({
  inspectStdCode: '',
  status: [],
  userNames: [],
  pageNum: 1,
  pageSize: 20,
});
const subQueryCondition = ref({
  mitemId: '',
  mitemCategoryId: '',
  inspectStdCode: '',
  pageNum: 1,
  pageSize: 20,
});
// 包装规则查询初始化
// tab 表格?
const tagValue = ref(0);
const onProductRightFetchData = (value: any) => {
  selectedAssignRowKeys.value = value;
};

// 刷新按钮
const onRefresh = async () => {
  await fetchMainTable();
};
// 刷新按钮
const onRefreshTwo = async () => {
  await fetchSubTable();
};
// // 刷新按钮
// const onChangeStatus = async () => {
//   await apiQuality.oqcInspectStd.changStatus(stdRowKeys.value);
//   MessagePlugin.success('操作成功');
//   stdRowKeys.value = [];
//   enableButton.value = false;
//   closeButton.value = false;
//   delButton.value = false;
//   onRefresh();
// };

const onAdd = async () => {
  await formRef.value.init();
  pageShow.value = true;
};
const enableButton = ref(false);
const closeButton = ref(false);
const delButton = ref(false);
const onSelectedChange = (value: any) => {
  stdRowKeys.value = value;
  const selectedItems = stdList.list.filter((item: any) => stdRowKeys.value.includes(item.id));
  if (selectedItems.length > 0) {
    const firstStatusName = selectedItems[0].statusName;
    const allSameStatusName = selectedItems.every((item: any) => item.statusName === firstStatusName);
    if (allSameStatusName) {
      if (firstStatusName === '已生效') {
        enableButton.value = false;
        closeButton.value = true;
      } else if (firstStatusName === '已失效') {
        enableButton.value = true;
        closeButton.value = false;
      } else if (firstStatusName === '起草中') {
        enableButton.value = false;
        closeButton.value = false;
        delButton.value = true;
      }
    } else {
      enableButton.value = false;
      closeButton.value = false;
      delButton.value = false;
    }
  } else {
    enableButton.value = false;
    closeButton.value = false;
    delButton.value = false;
  }
};
const onCheck = async (row) => {
  formRef.value.dtlRowKeys = [];
  formRef.value.formData = row;
  if (row.fileList) {
    row.fileList.forEach((file) => {
      file.timeUpload = file.timeCreate;
      file.signedUrl = file.filePath;
    });
  }
  formRef.value.fileList = row.fileList;
  formRef.value.formData.id = row.id;
  formRef.value.formData.operateTpye = 'check';
  formRef.value.formData.revision = row.revisionName;
  await formRef.value.getAllDtlById();
  pageShow.value = true;
};
const onEdit = async (row) => {
  console.log(formRef);
  formRef.value.dtlRowKeys = [];
  formRef.value.formData = row;
  if (row.fileList) {
    row.fileList.forEach((file) => {
      file.timeUpload = file.timeCreate;
      file.signedUrl = file.filePath;
    });
  }
  formRef.value.fileList = row.fileList;
  formRef.value.formData.id = row.id;
  formRef.value.formData.operateTpye = 'edit';
  formRef.value.formData.revision = row.revisionName;
  await formRef.value.getAllDtlById();
  pageShow.value = true;
};
const onCopy = async (row) => {
  formRef.value.dtlRowKeys = [];
  formRef.value.ids = [];
  formRef.value.formData = row;
  formRef.value.formData.id = row.id;
  formRef.value.formData.inspectStdCode = '';
  formRef.value.formData.inspectStdName = '';
  formRef.value.formData.operateTpye = 'copy';
  formRef.value.formData.revision = '1.0';
  await formRef.value.getAllDtlById();
  pageShow.value = true;
};
const onDelData = async (row) => {
  await apiQuality.oqcInspectStd.delById([row.id]);
  MessagePlugin.success('删除成功');
  onRefresh();
};
const onAssign = async (row) => {
  assignFormRef.value.init();
  assignFormRef.value.formData.type = 'edit';
  assignFormRef.value.formData.id = row.id;
  assignFormRef.value.formData.inspectStdName = row.inspectStdName;
  assignFormRef.value.formData.inspectStdCode = row.inspectStdCode;
  formVisible.value = true;
};
const onAddAssign = async () => {
  assignFormRef.value.formData.type = 'add';
  assignFormRef.value.formData.inspectStdCode = '';
  assignFormRef.value.formData.id = '';
  assignFormRef.value.formData.mitemId = '';
  assignFormRef.value.formData.mitemCategoryIds = null;
  formVisible.value = true;
};
const onDelDataBatch = async () => {
  await apiQuality.oqcInspectStd.delById(stdRowKeys.value);
  MessagePlugin.success('删除成功');
  onRefreshTwo();
};
const onDelAssignDataBatch = async () => {
  await apiQuality.oqcInspectStdMitem.delByIds(selectedAssignRowKeys.value);
  MessagePlugin.success('删除成功');
  onRefreshTwo();
};
const delAssign = async (row) => {
  await apiQuality.oqcInspectStdMitem.delByIds([row.id]);
  MessagePlugin.success('删除成功');
  onRefreshTwo();
};

const groupColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    align: 'left',
    width: '30',
  },
  {
    colKey: 'inspectStdCodeOp',
    title: '标准编码',
    align: 'left',
    width: '90',
  },
  {
    colKey: 'inspectStdName',
    title: '标准名称',
    align: 'left',
    width: '100',
  },
  {
    colKey: 'revisionName',
    title: '版本号',
    align: 'left',
    width: '90',
  },
  {
    colKey: 'isGroupName',
    title: '是否集团标准',
    align: 'left',
    width: '150',
  },
  {
    colKey: 'statusName',
    title: '状态',
    align: 'left',
    width: '70',
  },
  {
    colKey: 'timeEffective',
    title: '生效时间',
    align: 'left',
    width: '180',
  },
  {
    colKey: 'timeInvalid',
    title: '失效时间',
    align: 'left',
    width: '180',
  },
  {
    colKey: 'creatorName',
    title: '创建人',
    align: 'left',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '创建时间',
    align: 'left',
    width: '180',
  },
  {
    colKey: 'modifierName',
    title: '最后修订人',
    width: '100',
  },
  {
    colKey: 'timeModified',
    title: '最后修订时间',
    width: '150',
  },
  {
    colKey: 'op',
    title: '操作',
    fixed: 'right',
    align: 'left',
    width: '170',
  },
];
const assignColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    align: 'left',
    width: '30',
  },
  {
    colKey: 'inspectStdCode',
    title: '标准编码',
    align: 'left',
    width: '90',
  },
  {
    colKey: 'inspectStdName',
    title: '标准名称',
    align: 'left',
    width: '100',
  },
  {
    colKey: 'revisionName',
    title: '版本号',
    align: 'left',
    width: '90',
  },
  {
    colKey: 'categoryCode',
    title: '产品类别编码',
    align: 'left',
    width: '90',
  },
  {
    colKey: 'categoryName',
    title: '产品类别名称',
    align: 'left',
    width: '110',
  },
  {
    colKey: 'mitemCode',
    title: '产品编码',
    align: 'left',
    width: '90',
  },
  {
    colKey: 'mitemName',
    title: '产品名称',
    align: 'left',
    width: '110',
  },
  {
    colKey: 'creatorName',
    title: '创建人',
    width: '100',
  },
  {
    colKey: 'timeCreate',
    title: '创建时间',
    width: '150',
  },
  {
    colKey: 'modifierName',
    title: '最后修订人',
    width: '100',
  },
  {
    colKey: 'timeModified',
    title: '最后修订时间',
    width: '150',
  },
  {
    colKey: 'operations',
    title: '操作',
    fixed: 'right',
    align: 'left',
    width: '60',
  },
];

const switchTab = (selectedTabIndex: any) => {
  if (selectedTabIndex === 0) {
    fetchMainTable();
  }
};
// 打印界面点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  queryCondition.value.inspectStdCode = data.inspectStdCode;
  if (!isEmpty(data.status)) {
    queryCondition.value.status = data.status.split(',');
  } else {
    queryCondition.value.status = [];
  }
  if (!isEmpty(data.userNames)) {
    queryCondition.value.userNames = data.userNames.split(',');
  } else {
    queryCondition.value.userNames = [];
  }
  fetchMainTable();
};
// 管理界面点击查询按钮
const subSearchClick = (data: any) => {
  if (!data.mitemId && !data.mitemCategoryId && !data.inspectStdCode) {
    MessagePlugin.warning('请至少选择一个查询条件');
    return;
  }
  pageUIMannage.value.page = 1;
  subQueryCondition.value.mitemId = data.mitemId;
  subQueryCondition.value.mitemCategoryId = data.mitemCategoryId;
  subQueryCondition.value.inspectStdCode = data.inspectStdCode;
  selectedAssignRowKeys.value = [];
  fetchSubTable();
};

// 加载数据表格
const fetchMainTable = async () => {
  utils.loadingPluginFullScreen(true);
  try {
    queryCondition.value.pageNum = pageUI.value.page;
    queryCondition.value.pageSize = pageUI.value.rows;
    const data = (await apiQuality.oqcInspectStd.getOqcInspectList(queryCondition.value)) as any;
    const { list } = data;
    stdList.list = list;
    stdTableTotal.value = data.total;
    if (
      data.total !== 0 &&
      stdTableTotal.value < pageUI.value.page * pageUI.value.rows &&
      data.list &&
      data.list.length === 0
    ) {
      pageUI.value.page = 1;
      pageUI.value.rows = 20;
      onRefresh();
    }
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
  }
};
// 加载数据表格
const fetchSubTable = async () => {
  utils.loadingPluginFullScreen(true);
  try {
    subQueryCondition.value.pageNum = pageUIMannage.value.page;
    subQueryCondition.value.pageSize = pageUIMannage.value.rows;
    const data = (await apiQuality.oqcInspectStdMitem.getOqcInspectStdMitemList(subQueryCondition.value)) as any;
    const { list } = data;
    assignDataList.list = list;
    assignDataTabTotal.value = data.total;
    if (
      data.total !== 0 &&
      assignDataTabTotal.value < pageUI.value.page * pageUI.value.rows &&
      data.list &&
      data.list.length === 0
    ) {
      pageUIMannage.value.page = 1;
      pageUIMannage.value.rows = 20;
      onRefresh();
    }
  } catch (e) {
    console.log(e);
  } finally {
    utils.loadingPluginFullScreen(false);
  }
};

// 查询组件
const opts = computed(() => {
  return {
    inspectStdCode: {
      label: '标准编码/名称',
      comp: 't-input',
      defaultVal: '',
    },
    status: {
      label: '状态',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: 'EFFECTIVE',
      bind: {
        type: 'param',
        showTitle: false,
        isMultiple: true,
        category: 'Q_INSPECTION_STD_STATUS',
      },
    },
    userNames: {
      label: '创建人',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'user',
        valueField: 'userName',
        isMultiple: true,
        showTitle: false,
      },
    },
  };
});

// 查询组件
const assignOpts = computed(() => {
  return {
    inspectStdCode: {
      label: '标准编码/名称',
      comp: 't-input',
      defaultVal: '',
    },
    mitemCategoryId: {
      label: '产品类别',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    mitemId: {
      label: '产品',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
  };
});
const statusOption = ref([]);
apiMain.param.getListByGroupCode({ parmGroupCode: 'Q_INSPECTION_STD_STATUS' }).then((data) => {
  // 过滤满足特定条件的元素
  const filteredData = data.filter((item) => {
    const { value } = item;
    // 只保留 label 为 '起草中'、'已生效'、'已失效' 的元素
    return value === 'DRAFT' || value === 'EFFECTIVE' || value === 'EXPIRED';
  });

  // 将过滤后的结果赋值给 statusOption.value
  statusOption.value = filteredData;
});

// ################ 初始渲染
onMounted(async () => {
  queryCondition.value.status = ['EFFECTIVE'];
  await fetchMainTable(); // 获取 物料编码 表格数据
});
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
