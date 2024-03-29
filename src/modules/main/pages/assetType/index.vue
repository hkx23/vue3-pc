<!-- 资产类型 -->
<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card ref="tableCardRef" :span="12">
      <t-space style="text-align: end; width: 100%; margin-bottom: 8px">
        <t-space size="small" :align="'end'">
          <t-button @click="onAdd">新增根节点</t-button>
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDeletes">
            <t-button theme="default">批量删除</t-button>
          </t-popconfirm>
        </t-space>
      </t-space>
      <t-enhanced-table
        row-key="id"
        :active-row-type="'single'"
        :hover="true"
        :data="data"
        :columns="column"
        :tree="treeConfig"
        :max-height="boxHeight"
        lazy-load
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
      >
        <!-- <t-button>导入</t-button> -->
        <template #op="{ row }">
          <t-space :size="8">
            <t-link v-if="row.levelSeq !== 2" theme="primary" @click="onAddSon(row)">新增</t-link>
            <t-link theme="primary" @click="onSeparateEdit(row)">编辑</t-link>
            <!-- <icon name="edit-1" style="cursor: pointer" @click="onSeparateEdit(row)"></icon> -->
            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelete(row)">
              <t-link theme="primary">删除</t-link>
              <!-- <icon name="delete" style="margin: 0 10px; cursor: pointer"></icon> -->
            </t-popconfirm>
          </t-space>
        </template>
      </t-enhanced-table>
    </cmp-card>
  </cmp-container>

  <t-dialog v-model:visible="formVisible" :header="defectTitle" :cancel-btn="null" :confirm-btn="null">
    <t-form ref="formRef" :data="formItem" :rules="rules" @submit="onBtn">
      <t-form-item v-if="!showHideFlag" :label="t('assetType.parentLevel')" name="parentLevel">
        <t-input v-model="formItem.parentLevel" placeholder="请输入" :disabled="true"></t-input>
      </t-form-item>
      <t-form-item :label="t('assetType.typeCode')" name="typeCode">
        <t-input v-model="formItem.typeCode" placeholder="请输入" :disabled="disabledShow"></t-input>
      </t-form-item>
      <t-form-item :label="t('assetType.typeName')" name="typeName">
        <t-input v-model="formItem.typeName" placeholder="请输入"></t-input>
      </t-form-item>
      <t-form-item :label="t('assetType.typeDesc')" name="typeDesc">
        <t-input v-model="formItem.typeDesc" placeholder="请输入"></t-input>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">保存</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, reactive, Ref, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/main';

import { useLang } from './lang';

// #query 查询参数
const opts = computed(() => {
  return {
    soltDemo: {
      label: '资产编码/名称',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});

const disabledShow = ref(false); // 控件禁用启用开关
const defectTitle = ref('');
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

const onInput = async (param: any) => {
  const res = await api.assetType.getList({
    pageNum: 1,
    pageSize: 999999,
    keyword: param.soltDemo,
  });
  data.value = res.list;
  pagination.value.total = res.total;
  MessagePlugin.success('查询成功');
};

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
const formItem = ref({
  parentLevel: '', // 上一级
  typeCode: '', // 资产类型编码
  typeName: '', // 资产类型名称
  typeDesc: '', // 资产类型描述
  ParentId: 0, // 父类
  id: '',
});
const column: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'checkbox', type: 'multiple' },
  { colKey: 'typeCode', title: t('assetType.typeCode'), align: 'center', width: '200px' },
  { colKey: 'typeName', title: t('assetType.typeName'), align: 'center' },
  { colKey: 'typeDesc', title: t('assetType.typeDesc'), align: 'center' },
  { colKey: 'op', title: t('assetType.operate'), align: 'center', fixed: 'right' },
];
const data = ref([]);
// 进入首页请求
const onFetchData = async () => {
  try {
    const res = await api.assetType.getList({
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
    try {
      await api.assetType.add({
        typeCode: formItem.value.typeCode,
        typeName: formItem.value.typeName,
        typeDesc: formItem.value.typeDesc,
        parentTypeId: `${formItem.value.ParentId}`,
      });
      formVisible.value = false;
      onFetchData();
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      await api.assetType.modify({
        typeCode: formItem.value.typeCode,
        typeName: formItem.value.typeName,
        typeDesc: formItem.value.typeDesc,
        parentTypeId: formItem.value.ParentId.toString(),
        id: formItem.value.id,
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
// 添加 按钮点击事件
const showHideFlag = ref(false);
const onAdd = async () => {
  formRef.value.reset({ type: 'initial' });
  defectTitle.value = '资产类型新增';
  formItem.value.ParentId = 0;
  formVisible.value = true; // dialog开关
  showHideFlag.value = true; // 父级控件开关
  disabledShow.value = false; // 控件开关
};

// 子级新增
const onAddSon = async (row: any) => {
  formRef.value.reset({ type: 'initial' });
  console.log('🚀 ~ onAddSon ~ row:', row);
  defectTitle.value = '资产类型新增';
  formItem.value.ParentId = row.id;
  formItem.value.parentLevel = row.typeName;
  formVisible.value = true; // dialog开关
  showHideFlag.value = false; // 父级控件开关
  disabledShow.value = false; // 控件开关
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
  }
  await onSave1();
};
// 批量删除确定
const onSave1 = async () => {
  try {
    await api.assetType.removeBatch(selectedRowKeys.value);
    await onFetchData();
    selectedRowKeys.value = [];
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
  defectTitle.value = '资产类型编辑';
  isAddAndEdit.value = 0;
  try {
    const list = await api.assetType.getParent(row.parentTypeId);
    if (list.list.length < 1) {
      formItem.value.parentLevel = '全部';
      formItem.value.ParentId = 0;
    } else {
      listDataShow.value = 2;
      list.list.forEach((item) => {
        formItem.value.parentLevel = item.typeName;
      });
      formItem.value.ParentId = row.parentTypeId; //
    }
    formItem.value.id = row.id;
    formItem.value.typeCode = row.typeCode;
    formItem.value.typeName = row.typeName;
    formItem.value.typeDesc = row.typeDesc;
    disabledShow.value = true;
    formVisible.value = true;
  } catch (e) {
    console.log(e);
  }
};

// 单删除
const onDelete = async (row) => {
  await api.assetType.remove(row.id);
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

const tableCardRef = ref(null);
const boxHeight = ref(0);
const boxWidth = ref(0);
useResizeObserver(tableCardRef, (entries) => {
  const entry = entries[0];
  debounceFunction(entry);
});
const debounceFunction = _.debounce((entry) => {
  computedTableContentSize(entry);
}, 100);

const computedTableContentSize = (entry) => {
  // 组件处于不可见状态时将不进行计算
  const { width: _w, height: _h } = entry.contentRect;
  boxWidth.value = 0;
  boxHeight.value = 0;
  nextTick(() => {
    boxHeight.value = _h - 80;
  });
};
const onSecondarySubmit = () => {
  formRef.value.submit();
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
