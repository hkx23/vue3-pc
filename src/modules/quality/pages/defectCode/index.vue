<template>
  <div>
    <t-card>
      <t-card :bordered="false">
        <!-- 新增 -->
        <t-button @click="onAdd"><icon name="add"></icon></t-button>
        <!-- 编辑 -->
        <t-button variant="outline" @click="onEdit"><icon name="edit-1"></icon></t-button>
        <!-- 删除 -->
        <t-button variant="outline"><icon name="delete"></icon></t-button>
      </t-card>
      <!-- table表格 -->
      <t-enhanced-table
        row-key="id"
        :data="data"
        :columns="column"
        :tree="treeConfig"
        :total="total"
        lazy-load
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
      >
        <!-- <t-button>导入</t-button> -->
      </t-enhanced-table>
      <t-pagination
        v-model="pagination.current"
        v-model:pageSize="pagination.pageSize"
        :total="101"
        show-jumper
        style="margin: 20px 0"
        @change="onChange"
        @page-size-change="onPageSizeChange"
        @current-change="onCurrentChange"
      />
    </t-card>
    <t-dialog
      v-model:visible="formVisible"
      header="新增(编辑)异常处理配置"
      :cancel-btn="null"
      :confirm-btn="null"
      width="40%"
    >
      <t-form ref="formRef" :data="formItem" :rules="rules">
        <t-form-item :label="t('defectCode.parentLevel')" name="parentLevel">
          <t-input v-model="formItem.parentLevel" placeholder="请输入"></t-input>
        </t-form-item>
        <t-form-item :label="t('defectCode.defectiveCode')" name="defectiveCode">
          <t-input v-model="formItem.defectiveCode" placeholder="请输入"></t-input>
        </t-form-item>
        <t-form-item :label="t('defectCode.defectName')" name="defectName">
          <t-input v-model="formItem.defectName" placeholder="请输入"></t-input>
        </t-form-item>
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
          <t-button theme="primary" type="submit">保存</t-button>
        </div>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import {
  Data,
  FormInstanceFunctions,
  FormRules,
  Icon,
  MessagePlugin,
  PrimaryTableCol,
  TableRowData,
} from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

// import { api } from '@/api/quality';
import { useLang } from './lang';

// 装数控的
const treeConfig = reactive({
  childrenKey: 'children',
  treeNodeColumnIndex: 0,
});
// 分页
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 10,
});
const isAddAndEdit = ref(1);
const onPageSizeChange = (size) => {
  console.log('page-size:', size);
  MessagePlugin.success(`pageSize变化为${size}`);
};
const onCurrentChange = (index, pageInfo) => {
  MessagePlugin.success(`转到第${index}页`);
  console.log(pageInfo);
};
const onChange = (pageInfo) => {
  console.log(pageInfo);
};

const selectedRowKeys = ref([]); // 选择的要删除数据
const rehandleSelectChange = (value: any) => {
  selectedRowKeys.value = value;
  console.log(selectedRowKeys.value);
};
const formVisible = ref(false); // 窗口控制
onMounted(() => {
  onFetchData();
});
const { t } = useLang();
const formRef: Ref<FormInstanceFunctions> = ref(null);
// 表单
const formItem = reactive({
  parentLevel: '', // 上级节点
  defectiveCode: '', // 缺陷代码
  defectName: '', // 缺陷名称
});
const total = 10;
const column: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'select',
    type: 'multiple',
  },
  {
    colKey: 'defectiveCode',
    title: t('defectCode.defectiveCode'),
    align: 'center',
    width: '200px',
  },
  {
    colKey: 'defectName',
    title: t('defectCode.defectName'),
    align: 'center',
  },
];
const data = ref([
  {
    defectiveCode: '测试',
    defectName: '品质隐藏',
  },
  {
    defectiveCode: '测试2',
    defectName: '品质隐藏3',
  },
]);
// 进入首页请求
const onFetchData = async () => {
  // try {
  //   const res = await api.defectCode.gelist({
  //     pageName: pagination.value.current,
  //     pageSize: pagination.value.pageSize,
  //   });
  //   data.value = res.list;
  //   pagination.value.total = res.total;
  // } catch (e) {
  //   console.log(e);
  // }
};

// 控制新增或者编辑的
const onIsAddAndEdit = () => {
  if (isAddAndEdit.value === 1) {
    console.log('新增');
  } else {
    console.log('编辑');
  }
};
// 添加
const onAdd = () => {
  formVisible.value = true;
  onIsAddAndEdit();
};
// 编辑
const onEdit = () => {
  isAddAndEdit.value = 0;
  formVisible.value = true;
  onIsAddAndEdit();
};
// 窗口取消
const onSecondaryReset = () => {
  formVisible.value = false;
};
// form校验
const rules: FormRules<Data> = {
  defectiveCode: [
    {
      required: true,
      type: 'error',
      trigger: 'change',
    },
  ],
  defectName: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
};
</script>

<style lang="less" scoped>
.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
}
</style>
