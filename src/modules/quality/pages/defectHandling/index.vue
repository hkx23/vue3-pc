<!-- 缺陷处理方法 -->
<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card ref="tableCardRef" :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-data="defectHandlingData"
        :table-column="column"
        :total="total"
        :fixed-height="true"
        :loading="loading"
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
        @refresh="onRefresh"
      >
        <template #title>
          {{ '缺陷处理方法列表' }}
        </template>
        <template #button>
          <t-button theme="primary" @click="onHandelAdd">新增</t-button>
          <t-button theme="default" @click="onWholeAdd">删除</t-button>
        </template>
        <template #op="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEdit(row)">{{ t('common.button.edit') }}</t-link>
            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelete(row)">
              <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>

        <template #dealMethodType="{ row }">
          <div>{{ `${row.dealMethodType}-${row.dealMethodTypeName}` }}</div>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <t-dialog v-model:visible="defectVisible" header="新增/编辑" :cancel-btn="null" :confirm-btn="null">
    <t-form ref="formRef" :data="formData" layout="vertical" :rules="rules" @submit="onSubmit">
      <t-form-item :label="t('defectHandling.dealMethodType')" label-width="120px" name="dealMethodType">
        <t-select v-model="formData.dealMethodType" :disabled="isDisabled">
          <t-option
            v-for="item in onDefectDealMethodData.list"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </t-select>
      </t-form-item>
      <t-form-item :label="t('defectHandling.methodCode')" label-width="120px" name="methodCode">
        <t-input v-model="formData.methodCode" placeholder="请输入" :disabled="disabledCode"></t-input>
      </t-form-item>
      <t-form-item :label="t('defectHandling.methodName')" label-width="120px" name="methodName">
        <t-input v-model="formData.methodName" placeholder="请输入"></t-input>
      </t-form-item>
      <div class="control-box"></div>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="onSecondaryDelete">取消</t-button>
      <t-button theme="primary" @click="onSecondarySubmit">确认</t-button>
    </template>
  </t-dialog>
  <t-dialog v-model:visible="deleteVisible" :header="t('common.message.confirmDelete')" :on-confirm="onSave">
    <h3 class="list-save">选中{{ selectedRowKeys.length }}条</h3>
  </t-dialog>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormInstanceFunctions, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import CmpQuery from '@/components/cmp-query/index.vue';
import { useLoading } from '@/hooks/modules/loading';

import CmpTable from '../../../../components/cmp-table/index.vue';
import { usePage } from '../../../../hooks/modules/page';

const { loading, setLoading } = useLoading();
const { pageUI } = usePage();

import { api } from '@/api/main';

import { useLang } from './lang';

const opts = computed(() => {
  return {
    categoryName: {
      label: '处理方法类别',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    methodCodeName: {
      label: '处理方法',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});

const isDisabled = ref(true);

// 表格刷新
const onRefresh = async () => {
  await onfetchData();
  selectedRowKeys.value = [];
};

// ######下拉框 列表数据
const onDefectDealMethodData = reactive({ list: [] });
const onGetDefectDealMethodType = async () => {
  const res = await api.param.getListByGroupCode({ parmGroupCode: 'Q_DEFECT_DEAL_METHOD_TYPE' });
  onDefectDealMethodData.list = res;
};

// ###### 下拉框 change 事件

const disabledCode = ref(false); // 处理编码默认为启用
const disabledType = ref(false); // 处理类别默认为启用
// 搜索触发方法
const onInput = (data) => {
  formData.value.categoryName = data.categoryName;
  formData.value.methodCodeName = data.methodCodeName;
  onfetchData();
  selectedRowKeys.value = [];
};
const formRef: Ref<FormInstanceFunctions> = ref(null);
const defectVisible = ref(false); // 新增编辑窗口
const { t } = useLang();
const total = ref(10);
const selectedRowKeys = ref([]); // 选择的要删除数据
const rehandleSelectChange = (value: any) => {
  selectedRowKeys.value = value;
  console.log(selectedRowKeys.value);
};

const deleteVisible = ref(false);
// form表单
const formData = ref({
  dealMethodType: '', // 处理方法类别名称
  methodCode: '', // 处理方法编码
  methodName: '', // 处理方法名称
  categoryName: '', // 处理方法类别名称
  methodCodeName: '', // 处理方法编码名称
  id: '', // 列表对应id
});
onMounted(() => {
  onfetchData();
  onGetDefectDealMethodType(); // 下拉框列表
});
// 装入数组
const column = ref([
  { type: 'multiple', colKey: 'checkbox' },
  { title: '序号', colKey: 'serial-number', width: 120 },
  { title: t('defectHandling.dealMethodType'), colKey: 'dealMethodType', width: 120 },
  { title: t('defectHandling.methodCode'), colKey: 'methodCode', width: 120 },
  { title: t('defectHandling.methodName'), colKey: 'methodName', width: 120 },
  { title: '操作', colKey: 'op', fixed: 'right', width: 120 },
]);
// table数组
const defectHandlingData = ref([]);
// 首次进入
const onfetchData = async () => {
  try {
    setLoading(true);
    const res = await api.defectDealMethod.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      dealMethodType: formData.value.categoryName,
      defectDealMethod: formData.value.methodCodeName,
    });
    defectHandlingData.value = res.list;
    total.value = res.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// 取消窗口
const onSecondaryDelete = () => {
  defectVisible.value = false;
};

const onSecondarySubmit = () => {
  formRef.value.submit();
};
// 批量删除提示窗口
const onSave = async () => {
  try {
    await api.defectDealMethod.removeDefectDealMethodBatch({
      ids: selectedRowKeys.value,
    });
    MessagePlugin.success('删除成功');
    if (defectHandlingData.value.length <= 1 && pageUI.value.page > 1) {
      pageUI.value.page--;
    }
    onfetchData();
    deleteVisible.value = false;
  } catch (e) {
    console.log(e);
  }
};
// 批量删除
const onWholeAdd = async () => {
  if (selectedRowKeys.value.length === 0) {
    MessagePlugin.error('未选择');
    return;
  }
  deleteVisible.value = true;
};
const AddAnyEdit = ref(1); // 1表示新增  0表示编辑
const onAddAnyEdit = async () => {
  if (AddAnyEdit.value === 1) {
    try {
      await api.defectDealMethod.addDefectDealMethod(formData.value);
      MessagePlugin.success('新增成功');
      defectVisible.value = false;
      onfetchData();
    } catch (e) {
      console.log(e);
    }
    // console.log('新增');
  } else {
    try {
      await api.defectDealMethod.modifyDefectDealMethod(formData.value);
      MessagePlugin.success('编辑成功');
      defectVisible.value = false;
      onfetchData();
    } catch (e) {
      console.log(e);
    }
    // console.log('编辑');
  }
};
// 新增
const onHandelAdd = () => {
  disabledCode.value = false;
  isDisabled.value = false;
  formData.value.id = '';
  formRef.value.reset({ type: 'initial' });
  AddAnyEdit.value = 1;
  defectVisible.value = true;
};
// 编辑
const onEdit = (row) => {
  console.log('🚀 ~ file: index.vue:256 ~ onEdit ~ row:', row);
  isDisabled.value = true;
  disabledCode.value = true;
  disabledType.value = true;
  formData.value.dealMethodType = row.dealMethodType;
  formData.value.methodCode = row.methodCode;
  formData.value.methodName = row.methodName;
  AddAnyEdit.value = 0;
  formData.value.id = row.id;
  defectVisible.value = true;
};
// 删除
const onDelete = async (row) => {
  try {
    await api.defectDealMethod.removeDefectDealMethod({
      id: row.id,
    });
    if (defectHandlingData.value.length <= 1 && pageUI.value.page > 1) {
      pageUI.value.page--;
    }
    MessagePlugin.success('删除成功');
    onfetchData();
  } catch (e) {
    console.log(e);
  }
  console.log(row);
};
// 提交校验
const onSubmit = (context: any) => {
  console.log(formData.value);
  console.log(context);
  if (context.validateResult === true) {
    onAddAnyEdit();
  }
};
// 校验条件
const rules: FormRules<Data> = {
  dealMethodType: [{ required: true, type: 'error', trigger: 'change' }],
  methodCode: [{ required: true, type: 'error', trigger: 'blur' }],
  methodName: [{ required: true, type: 'error', trigger: 'blur' }],
};
</script>

<style lang="less" scoped>
.list-card-defectHandling {
  padding: var(--td-comp-paddingLR-xl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

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
