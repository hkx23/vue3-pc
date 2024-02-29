<!-- 物料检验标准 -->
<template>
  <cmp-container v-show="pageShow">
    <materialStandardAdd ref="formRef" @permission-show="onPermission"></materialStandardAdd>
  </cmp-container>
  <cmp-container v-show="!pageShow" :full="true">
    <cmp-card class="not-full-tab" :hover-shadow="false">
      <t-tabs v-model="tabValue" @change="tabChange">
        <!-- ###############    标准 1️⃣ 表格数据   ######## -->
        <t-tab-panel :value="0" label="标准" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true" :full-sub-index="[0, 1]">
              <cmp-card>
                <cmp-container :full="true">
                  <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput">
                    <template #creator="{ param }">
                      <t-select v-model="param.creator" label="创建人" :clearable="true">
                        <t-option key="id" label="label" value="value" />
                      </t-select>
                    </template>
                  </cmp-query>
                  <cmp-table
                    ref="tableRefs"
                    v-model:pagination="pageUI"
                    empty="没有符合条件的数据"
                    row-key="id"
                    :fixed-height="true"
                    :active-row-type="'single'"
                    :hover="true"
                    :table-column="standardColumn"
                    :table-data="materialStandardList"
                    :total="materialStandardTotal"
                    :selected-row-keys="stdRowKeys"
                    @select-change="onSelectedChange"
                    @refresh="onRefresh"
                  >
                    <template #title>
                      {{ '物料检验标准列表' }}
                    </template>
                    <template #inspectStdCodeOp="{ row }">
                      <t-link theme="primary" @click="onEdit(row)">{{ row.inspectStdCode }}</t-link>
                    </template>
                    <template #button>
                      <t-button @click="onAddClick">新增</t-button>
                      <t-button theme="default">导入</t-button>
                      <t-popconfirm content="确认删除吗" @confirm="delStdByIdBatch">
                        <t-button v-if="stdRowKeys.length > 1" theme="default" variant="base">批量删除</t-button>
                      </t-popconfirm>
                    </template>
                    <template #operation="{ row }">
                      <t-link
                        v-if="row.status !== 'EXPIRED'"
                        theme="primary"
                        style="padding-right: 8px"
                        @click="onAssign(row)"
                        >分配</t-link
                      >
                      <t-link
                        v-if="row.status !== 'EXPIRED'"
                        theme="primary"
                        style="padding-right: 8px"
                        @click="onEdit(row)"
                        >编辑</t-link
                      >
                      <t-popconfirm
                        content="继续将删除该标准对应的检验项目、物料关系、附件等，是否继续？"
                        @confirm="delStdById(row)"
                      >
                        <t-link v-if="row.status === 'DRAFT'" theme="primary" style="padding-right: 8px">删除</t-link>
                      </t-popconfirm>
                      <t-popconfirm
                        content="失效后该标准将被禁用，同时解除物料及物料类对该标准的引用，是否继续？"
                        @confirm="onChangStatus(row)"
                      >
                        <t-link v-if="row.status === 'EFFECTIVE'" theme="primary" style="padding-right: 8px"
                          >失效</t-link
                        >
                      </t-popconfirm>
                      <t-link theme="primary" @click="onCopyStd(row)">复制</t-link>
                    </template>
                  </cmp-table>
                </cmp-container>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
        <!-- ###############    标准分配 2️⃣ 表格数据   ######## -->
        <t-tab-panel :value="1" label="标准分配" :destroy-on-hide="false">
          <template #panel>
            <cmp-container :full="true" :full-sub-index="[0, 1]">
              <cmp-card>
                <cmp-container :full="true">
                  <cmp-query
                    ref="queryComponent"
                    :opts="opts"
                    :bool-enter="false"
                    :is-reset-query="false"
                    @submit="onInput"
                  >
                  </cmp-query>
                  <cmp-table
                    ref="tableRefCard"
                    v-model:pagination="pageUINorm"
                    row-key="id"
                    :fixed-height="true"
                    :active-row-type="'single'"
                    :hover="true"
                    :table-column="standardAllotColumn"
                    :table-data="assignTabData.list"
                    :total="totalAssign"
                    :selected-row-keys="assignSelectedRowKeys"
                    @select-change="onSelectedAssignChange"
                  >
                    <template #title>
                      {{ '物料检验标准分配列表' }}
                    </template>
                    <template #button>
                      <t-button @click="onAddAssign">新增</t-button>
                      <t-button theme="default">导入</t-button>
                      <t-popconfirm content="确认删除吗" @confirm="delAssignBatch">
                        <t-button theme="default" variant="base" :disabled="assignDelBtnOp">批量删除</t-button>
                      </t-popconfirm>
                    </template>
                    <template #operations="{ row }">
                      <t-link theme="primary" style="padding-right: 8px" @click="onEditAssign(row)"> 编辑 </t-link>
                      <t-popconfirm theme="default" content="确认删除吗" @confirm="delAssign(row)">
                        <t-link theme="primary" style="padding-right: 8px"> 删除 </t-link>
                      </t-popconfirm>
                      <t-link theme="primary" @click="onCopyAssign(row)"> 复制 </t-link>
                    </template>
                  </cmp-table>
                </cmp-container>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>
  <t-dialog v-model:visible="formVisible" :close-on-overlay-click="false" header="标准分配" @confirm="onAssignConfirm">
    <materialAllotForm ref="assignFormRef"></materialAllotForm>
  </t-dialog>
  <t-dialog
    v-model:visible="visible1"
    theme="info"
    header="提示"
    :body="message"
    confirm-btn="查看待检单"
    @confirm="onInfoConfirm"
  />
  <t-dialog v-model:visible="visible2" header="待检单" :close-on-overlay-click="false" :confirm-btn="null">
    <cmp-table
      v-model:pagination="pageUIBill"
      row-key="id"
      :fixed-height="true"
      :active-row-type="'single'"
      :hover="true"
      :table-column="billNoColumn"
      :table-data="billTabData.list"
      :total="billAssign"
    >
    </cmp-table>
  </t-dialog>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api, IqcInspectStdVO } from '@/api/quality';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import materialAllotForm from './form.vue';
import materialStandardAdd from './materialStandardAdd.vue';

const assignFormRef = ref(null); // 新增表单数据清除，获取表单实例
const pageShow = ref(false);
const onPermission = (value) => {
  pageShow.value = value;
};
const formVisible = ref(false);
const visible1 = ref(false);
const visible2 = ref(false);
const message = ref('');
const assignDelBtnOp = ref(true);
const batchDelOp = ref(false);
const formRef = ref(null);
const assignSelectedRowKeys: Ref<any[]> = ref([]); // 补打 打印数组
const { pageUI } = usePage(); // 物料标准 分页工具
const { pageUI: pageUINorm } = usePage(); // 物料标准分配 分页工具
const { pageUI: pageUIBill } = usePage(); // 物料标准分配 分页工具
const tabValue = ref(0);
const tableRefs = ref(); // 物料检验标准 表格 实例
const tableRefCard = ref(); // 物料标准分配 表格 实例
const stdRowKeys: Ref<any[]> = ref([]); //
// 产品标签管理 表格数据
const assignTabData = reactive({ list: [] });
const billTabData = reactive({ list: [] });
const totalAssign = ref(0);
const billAssign = ref(0);
const onInfoConfirm = () => {
  visible2.value = true;
};
const onSelectedChange = (value: any) => {
  stdRowKeys.value = value;
  if (stdRowKeys.value.length > 1) {
    batchDelOp.value = true;
  }
};
const onAssign = async (row) => {
  assignFormRef.value.init();
  assignFormRef.value.formData.type = 'assign';
  assignFormRef.value.formData.iqcInspectStdId = row.id;
  assignFormRef.value.formData.inspectStdName = row.inspectStdName;
  formVisible.value = true;
};
const onSelectedAssignChange = (value: any) => {
  assignSelectedRowKeys.value = value;
  if (assignSelectedRowKeys.value.length > 1) {
    assignDelBtnOp.value = false;
  } else {
    assignDelBtnOp.value = true;
  }
};
// 标准表格列表数据
const standardColumn: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'inspectStdCodeOp',
    title: '标准编码',
    width: '100',
  },
  {
    colKey: 'inspectStdName',
    title: '标准名称',
    width: '100',
  },
  {
    colKey: 'revision',
    title: '版本号',
    width: '100',
  },
  {
    colKey: 'isGroupInspectStd',
    title: '是否集团标准',
    width: '100',
  },
  {
    colKey: 'statusName',
    title: '状态',
    width: '80',
  },
  {
    colKey: 'timeEffective',
    title: '生效日期',
    width: '150',
  },
  {
    colKey: 'timeInvalid',
    title: '失效日期',
    width: '150',
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
    colKey: 'operation',
    width: '200',
    title: '操作',
    fixed: 'right',
  },
];
// 标准分配表格列表数据
const standardAllotColumn: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46,
  },
  {
    colKey: 'inspectStdCode',
    title: '标准编码',
    width: '100',
  },
  {
    colKey: 'inspectStdName',
    title: '标准名称',
    width: '100',
  },
  {
    colKey: 'revision',
    title: '版本号',
    width: '100',
  },
  {
    colKey: 'categoryCode',
    title: '物料类别编码',
    width: '100',
  },
  {
    colKey: 'categoryName',
    title: '物料类别名称',
    width: '100',
  },
  {
    colKey: 'mitemCode',
    title: '物料编码',
    width: '100',
  },
  {
    colKey: 'mitemName',
    title: '物料名称',
    width: '100',
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
    colKey: 'operations',
    title: '操作',
    fixed: 'right',
    width: '130',
  },
];
// 待检单列表数据
const billNoColumn: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'inspectStdCode',
    title: '待检单号',
    width: '100',
  },
  {
    colKey: 'inspectStdName',
    title: '送货单号',
    width: '100',
  },
  {
    colKey: 'revision',
    title: '接收时间',
    width: '100',
  },
  {
    colKey: 'categoryCode',
    title: '物料',
    width: '100',
  },
  {
    colKey: 'categoryName',
    title: '供应商',
    width: '100',
  },
];
const curRowId = ref('');
const onChangStatus = async (row) => {
  const res = (await api.iqcInspectStd.countInspect(row.id)) as any;

  if (res > 0) {
    message.value = `“目前共有${res}张待检单使用了该标准，请检验完成后再删除检验标准。`;
    curRowId.value = row.id;
    visible1.value = true;
  } else {
    await api.iqcInspectStd.loseEffectiveness(row.id);
    MessagePlugin.success('操作成功');
    onRefresh();
  }
};
onMounted(async () => {
  materialStandardParam.value.status = ['EFFECTIVE'];
  await onGetMaterialStandardData();
});

// 物料标准主界面请求 参数
const materialStandardParam = ref({
  pageNum: 1,
  pageSize: 10,
  keyword: '', // 标准编码,名称
  status: [], // 状态
  userNames: [], // 创建人
  mitemId: '',
  mitemCategoryId: '',
});

// 获取物料标准 主界面数据
const materialStandardList = ref<IqcInspectStdVO[]>([]);
const materialStandardTotal = ref<number>(0);
const onGetMaterialStandardData = async () => {
  materialStandardParam.value.pageNum = pageUI.value.page;
  materialStandardParam.value.pageSize = pageUI.value.rows;
  const res = await api.iqcInspectStd.getList(materialStandardParam.value);
  materialStandardList.value = res.list;
  materialStandardTotal.value = res.total;
  stdRowKeys.value = [];
};
const onGetMaterialAssignData = async () => {
  materialStandardParam.value.pageNum = pageUINorm.value.page;
  materialStandardParam.value.pageSize = pageUINorm.value.rows;
  const res = await api.iqcInspectStdMitem.getList(materialStandardParam.value);
  assignTabData.list = res.list;
  totalAssign.value = res.total;
  assignSelectedRowKeys.value = [];
};

// #################   新增按钮点击事件  ##########################
const onAddClick = async () => {
  formRef.value.init();
  pageShow.value = true;
};

const onAddAssign = async () => {
  assignFormRef.value.formData.type = 'add';
  assignFormRef.value.formData.inspectStdCode = '';
  assignFormRef.value.formData.id = '';
  assignFormRef.value.formData.iqcInspectStdId = '';
  assignFormRef.value.formData.mitemId = '';
  assignFormRef.value.formData.mitemCategoryId = '';
  formVisible.value = true;
};
const onCopyAssign = async (row) => {
  assignFormRef.value.formData.type = 'add';
  assignFormRef.value.formData.mitemId = row.mitemId;
  assignFormRef.value.formData.mitemCategoryId = row.mitemCategoryId;
  formVisible.value = true;
};
const onEditAssign = async (row) => {
  assignFormRef.value.formData.type = 'edit';
  assignFormRef.value.formData.inspectStdName = row.inspectStdName;
  assignFormRef.value.formData.id = row.id;
  assignFormRef.value.formData.mitemCategoryId = row.mitemCategoryId;
  assignFormRef.value.formData.mitemId = row.mitemId;
  formVisible.value = true;
};
const onEdit = async (row) => {
  formRef.value.dtlRowKeys = [];
  formRef.value.formData = row;
  formRef.value.butControl = true;
  formRef.value.submitButControl = true;
  formRef.value.delBtutControl = true;
  if (row.fileList) {
    row.fileList.forEach((file) => {
      file.timeUpload = file.timeCreate;
      file.signedUrl = file.filePath;
    });
  }
  formRef.value.fileList = row.fileList ? row.fileList : [];
  formRef.value.formData.operateTpye = 'edit';
  await formRef.value.getAllDtlById();
  await formRef.value.getAllDtlFormCache();
  pageShow.value = true;
};
const onCopyStd = async (row) => {
  formRef.value.dtlRowKeys = [];
  formRef.value.formData = row;
  formRef.value.formData.inspectStdCode = '';
  formRef.value.formData.inspectStdName = '';
  formRef.value.formData.revision = '1.0';
  formRef.value.butControl = true;
  formRef.value.submitButControl = true;
  formRef.value.delBtutControl = true;
  if (row.fileList) {
    row.fileList.forEach((file) => {
      file.timeUpload = file.timeCreate;
      file.signedUrl = file.filePath;
    });
  }
  formRef.value.fileList = row.fileList ? row.fileList : [];
  formRef.value.formData.operateTpye = 'copy';
  await formRef.value.getAllDtlById();
  await formRef.value.getAllDtlFormCache();
  pageShow.value = true;
};
// // TAb 栏切换事件
const tabChange = async (value: number) => {
  console.log('🚀 ~ file: index.vue:437 ~ tabChange ~ value:', value);
};

const delAssignBatch = async () => {
  await api.iqcInspectStdMitem.removeBatch(assignSelectedRowKeys.value);
  MessagePlugin.success('删除成功');
};
const delAssign = async (row) => {
  await api.iqcInspectStdMitem.removeBatch([row.id]);
  MessagePlugin.success('删除成功');
};

// // #query 查询参数
const opts = computed(() => {
  return {
    keyword: {
      label: '标准编码/名称',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    status: {
      label: '状态',
      isHide: tabValue.value,
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: [{ label: '已生效', value: 'EFFECTIVE' }],
      bind: {
        type: 'state',
        showTitle: false,
        isMultiple: true,
        category: 'Q_INSPECTION_STD_STATUS',
      },
    },
    userNames: {
      label: '创建人',
      isHide: tabValue.value,
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
    mitemCategoryId: {
      label: '物料类别',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      isHide: !tabValue.value,
      bind: {
        type: 'mitemCategory',
        showTitle: false,
      },
    },
    mitemId: {
      label: '物料',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      isHide: !tabValue.value,
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
  };
});
// // #query 查询函数
const onInput = async (data: any) => {
  if (data.status) {
    data.status.forEach((item, index, array) => {
      array[index] = item.value;
    });
  }
  if (data.userNames) {
    data.userNames.forEach((item, index, array) => {
      array[index] = item.value;
    });
  }
  Object.keys(data).forEach((key) => {
    if (key in materialStandardParam.value) {
      materialStandardParam.value[key] = data[key];
    }
  });
  if (!tabValue.value) {
    await onGetMaterialStandardData();
  } else {
    if (
      !materialStandardParam.value.mitemId &&
      !materialStandardParam.value.mitemCategoryId &&
      !materialStandardParam.value.keyword
    ) {
      MessagePlugin.warning('请至少选择一个查询条件');
      return;
    }
    await onGetMaterialAssignData();
  }
  MessagePlugin.success('查询成功');
};
const delStdById = async (row) => {
  await api.iqcInspectStd.removeBatch([row.id]);
  MessagePlugin.success('删除成功');
  onRefresh();
};
const delStdByIdBatch = async () => {
  await api.iqcInspectStd.removeBatch(stdRowKeys.value);
  MessagePlugin.success('删除成功');
  onRefresh();
};
const onAssignConfirm = async () => {
  const data = await assignFormRef.value.submit();
  if (data) {
    formVisible.value = false;
    if (
      materialStandardParam.value.mitemId ||
      materialStandardParam.value.mitemCategoryId ||
      materialStandardParam.value.keyword
    ) {
      onRefreshTwo();
    }
    onRefresh();
  }
};
// 刷新按钮
const onRefreshTwo = async () => {
  await onGetMaterialAssignData();
};
// 刷新按钮
const onRefresh = async () => {
  await onGetMaterialStandardData();
};
</script>

<style lang="less" scoped>
.align-right {
  display: flex;
  justify-content: flex-end;
}
</style>
