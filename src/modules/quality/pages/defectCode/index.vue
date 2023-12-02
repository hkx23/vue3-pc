<!-- 缺陷代码库 -->
<template>
  <div>
    <t-card>
      <t-card :bordered="false">
        <!-- 新增 -->
        <t-button @click="onAdd"><icon name="add"></icon></t-button>
        <!-- 删除 -->
        <t-button variant="outline" @click="onDeletes"><icon name="delete"></icon></t-button>
      </t-card>
      <!-- table表格 -->
      <t-enhanced-table
        row-key="id"
        :data="data"
        :columns="column"
        :tree="treeConfig"
        lazy-load
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
      >
        <!-- <t-button>导入</t-button> -->
        <template #operate="{ row }">
          <icon name="edit-1" style="cursor: pointer" @click="onSeparateEdit(row)"></icon>
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelete(row)">
            <icon name="delete" style="margin: 0 10px; cursor: pointer"></icon>
          </t-popconfirm>
        </template>
      </t-enhanced-table>
      <!-- <t-pagination
        v-model="pagination.current"
        v-model:pageSize="pagination.pageSize"
        :total="pagination.total"
        show-jumper
        style="margin: 20px 0"
        @change="onChange"
        @page-size-change="onPageSizeChange"
        @current-change="onCurrentChange"
      /> -->
    </t-card>
    <t-dialog
      v-model:visible="formVisible"
      header="新增(编辑)异常处理配置"
      :cancel-btn="null"
      :confirm-btn="null"
      width="40%"
    >
      <t-form ref="formRef" :data="formItem" :rules="rules" @submit="onBtn">
        <t-form-item :label="t('defectCode.parentLevel')" name="parentLevel">
          <t-input v-model="formItem.parentLevel" placeholder="请输入" :disabled="disabledParentLevel"></t-input>
        </t-form-item>
        <t-form-item :label="t('defectCode.defectCode')" name="defectCode">
          <t-input v-model="formItem.defectCode" placeholder="请输入" :disabled="disabledShow"></t-input>
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
    <t-dialog v-model:visible="deleteVisible" :header="t('common.message.confirmDelete')" :on-confirm="onSave1">
      <h3 class="list-save">选中{{ selectedRowKeys.length }}条</h3>
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

import { api } from '@/api/main';

import { useLang } from './lang';

const disabledParentLevel = ref(false); // 上一层是否禁用
const disabledShow = ref(false); // 缺陷代码
const deleteVisible = ref(false);
// 装数控的
const treeConfig = reactive({
  childrenKey: 'child',
  treeNodeColumnIndex: 0,
});
// 分页
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 10,
});
const isAddAndEdit = ref(1); // 判断是编辑还是新增默认为新增
// const onPageSizeChange = (size) => {
//   pagination.value.current = 1;
//   console.log('page-size:', size);
//   onFetchData();
// };
// const onCurrentChange = () => {
//   onFetchData();
// };
// const onChange = () => {
//   onFetchData();
// };

// 多选框
const selectedRowKeys = ref([]); // 选择的要删除数据
// 多选的值事件触发
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
  defectCode: '', // 缺陷代码
  defectName: '', // 缺陷名称
  ParentId: 0, // 父类
  id: '',
});
const column: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'checkbox', type: 'multiple' },
  { colKey: 'defectCode', title: t('defectCode.defectCode'), align: 'center', width: '200px' },
  { colKey: 'defectName', title: t('defectCode.defectName'), align: 'center' },
  { colKey: 'operate', title: t('defectCode.operate'), align: 'center', fixed: 'right' },
];
const data = ref([]);
// 进入首页请求
const onFetchData = async () => {
  try {
    const res = await api.defectCode.getList({
      pageNum: 1,
      pageSize: 999999,
    });
    data.value = res.list;
    pagination.value.total = res.total;
  } catch (e) {
    console.log(e);
  }
};
// 控制新增或者编辑的
const onIsAddAndEdit = async () => {
  if (isAddAndEdit.value === 1) {
    console.log('新增');
    try {
      await api.defectCode.addDefectCode({
        defectCode: formItem.defectCode,
        defectName: formItem.defectName,
        parentDefectId: formItem.ParentId.toString(),
      });
      formVisible.value = false;
      onFetchData();
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await api.defectCode.modifyDefectCode({
        defectCode: formItem.defectCode,
        defectName: formItem.defectName,
        parentDefectId: formItem.ParentId.toString(),
        id: formItem.id,
      });
      formVisible.value = false;
      MessagePlugin.success('编辑成功');
      onFetchData();
    } catch (e) {
      console.log(e);
    }
    console.log('编辑');
  }
};
// 添加
const onAdd = async () => {
  formItem.ParentId = 0;
  isAddAndEdit.value = 1;
  if (selectedRowKeys.value.length > 1) {
    MessagePlugin.error('只能新增一个');
    return;
  }
  console.log(formItem.ParentId);
  const id = selectedRowKeys.value.join();
  const list = await api.defectCode.getParent({ id });
  list.list.forEach((item) => {
    formItem.parentLevel = item.defectName;
    formItem.ParentId = +item.id;
  });
  if (formItem.ParentId === 0) {
    formItem.parentLevel = '全部';
  }
  disabledParentLevel.value = true;
  formVisible.value = true;
  // onIsAddAndEdit();
};
// 点击保存
const onBtn = (context) => {
  if (context.validateResult === true) {
    onIsAddAndEdit();
    formRef.value.reset({ type: 'initial' });
  }
};
// 批量删除
const onDeletes = async () => {
  if (selectedRowKeys.value.length === 0) {
    MessagePlugin.error('未选择');
    return;
  }
  deleteVisible.value = true;
};
const onSave1 = async () => {
  try {
    await api.defectCode.removeDefectCodeBatch({
      ids: selectedRowKeys.value,
    });
    deleteVisible.value = false;
    onFetchData();
  } catch (e) {
    console.log(e);
  }
};
// 窗口取消
const onSecondaryReset = () => {
  formRef.value.reset({ type: 'initial' });
  formVisible.value = false;
};
const listDataShow = ref(1); // 控制编辑父级为全部的时候
// 编辑
const onSeparateEdit = async (row) => {
  isAddAndEdit.value = 0;
  try {
    const list = await api.defectCode.getParent({ id: row.parentDefectId });
    // console.log(list);
    if (list.list.length < 1) {
      formItem.parentLevel = '全部';
      formItem.ParentId = 0;
    } else {
      listDataShow.value = 2;
      list.list.forEach((item) => {
        formItem.parentLevel = item.defectName;
      });
      formItem.ParentId = row.parentDefectId; //
    }
    formItem.id = row.id;
    formItem.defectName = row.defectName;
    formItem.defectCode = row.defectCode;
    disabledParentLevel.value = true;
    disabledShow.value = true;
    formVisible.value = true;
  } catch (e) {
    console.log(e);
  }
};

// 单删除
const onDelete = async (row) => {
  await api.defectCode.removeDefectCode({
    id: row.id,
  });
  onFetchData();
};
// form校验
const rules: FormRules<Data> = {
  defectCode: [
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

.list-save {
  text-align: center;
  margin: 10px 0;
}
</style>
