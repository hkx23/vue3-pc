<!-- 缺陷处理方法 -->
<template>
  <div>
    <t-card class="list-card-defectHandling">
      <!-- <t-row justify="end">
        <t-col style="margin: 0 20px">
          <t-input
            v-model="formData.categoryName"
            placeholder="请输入处理方法类别名称"
            label="处理方法类别名称:"
          ></t-input>
        </t-col>
        <t-col>
          <t-input
            v-model="formData.methodCodeName"
            placeholder="请输入方法编码/名称"
            label="处理方法编码/名称:"
          ></t-input>
        </t-col>
      </t-row> -->
      <tm-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-data="defectHandlingData"
        :table-column="column"
        :total="total"
        :loading="loading"
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
        @refresh="onfetchData"
      >
        <template #op="{ row }">
          <!-- 编辑 -->
          <icon name="edit-1" style="cursor: pointer" @click="onEdit(row)"></icon>
          <!-- 删除 -->
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelete(row)">
            <icon name="delete" style="margin: 0 15px; cursor: pointer"></icon>
          </t-popconfirm>
        </template>
        <template #oprate>
          <!-- 新增 -->
          <t-button theme="default" @click="onHandelAdd"> <icon name="add"></icon></t-button>
          <!-- 删除 -->
          <t-button><icon name="delete" @click="onWholeAdd"></icon></t-button>
        </template>
        <template #button> <tm-query :opts="opts" @submit="onInput"> </tm-query></template>
        <template #dealMethodType="{ row }">
          <div>{{ `${row.dealMethodType}${row.dealMethodTypeName}` }}</div>
        </template>
      </tm-table>
    </t-card>
    <t-dialog v-model:visible="defectVisible" header="新增/编辑" :cancel-btn="null" :confirm-btn="null" width="40%">
      <t-form ref="formRef" :data="formData" layout="vertical" :rules="rules" @submit="onSubmit">
        <t-form-item :label="t('defectHandling.dealMethodType')" label-width="120px" name="dealMethodType">
          <!-- <t-select v-model="formData.dealMethodType" placeholder="请输入"></t-select> -->
          <t-input v-model="formData.dealMethodType" placeholder="请输入" :disabled="disabledType"></t-input>
        </t-form-item>
        <t-form-item :label="t('defectHandling.methodCode')" label-width="120px" name="methodCode">
          <t-input v-model="formData.methodCode" placeholder="请输入" :disabled="disabledCode"></t-input>
        </t-form-item>
        <t-form-item :label="t('defectHandling.methodName')" label-width="120px" name="methodName">
          <t-input v-model="formData.methodName" placeholder="请输入"></t-input>
        </t-form-item>
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryDelete">取消</t-button>
          <t-button theme="primary" type="submit">确认</t-button>
        </div>
      </t-form>
    </t-dialog>
    <t-dialog v-model:visible="deleteVisible" :header="t('common.message.confirmDelete')" :on-confirm="onSave">
      <h3 class="list-save">选中{{ selectedRowKeys.length }}条</h3>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormInstanceFunctions, FormRules, Icon, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, Ref, ref } from 'vue';

import TmQuery from '@/components/tm-query/index.vue';
import { useLoading } from '@/hooks/modules/loading';

import TmTable from '../../../../components/tm-table/index.vue';
import { usePage } from '../../../../hooks/modules/page';

const { loading, setLoading } = useLoading();
const { pageUI } = usePage();

import { api } from '@/api/main';

import { useLang } from './lang';

const opts = computed(() => {
  return {
    categoryName: {
      label: '处理方法类别名称:',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    methodCodeName: {
      label: '处理方法编码/名称:',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});

const disabledCode = ref(false); // 处理编码默认为启用
const disabledType = ref(false); // 处理类别默认为启用
// 搜索触发方法
const onInput = (data) => {
  formData.value.categoryName = data.categoryName;
  formData.value.methodCodeName = data.methodCodeName;
  onfetchData();
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
});
// 装入数组
const column = ref([
  { type: 'multiple', align: 'center', colKey: 'checkbox' },
  { title: '序号', colKey: 'id', align: 'center', width: 120 },
  { title: t('defectHandling.dealMethodType'), colKey: 'dealMethodType', align: 'center', width: 120 },
  { title: t('defectHandling.methodCode'), colKey: 'methodCode', align: 'center', width: 120 },
  { title: t('defectHandling.methodName'), colKey: 'methodName', align: 'center', width: 120 },
  { title: '操作', colKey: 'op', align: 'left', fixed: 'right', width: 120 },
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

// 批量删除提示窗口
const onSave = async () => {
  try {
    await api.defectDealMethod.removeDefectDealMethodBatch({
      ids: selectedRowKeys.value,
    });
    MessagePlugin.success('删除成功');
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
  formData.value.id = '';
  formRef.value.reset({ type: 'initial' });
  AddAnyEdit.value = 1;
  defectVisible.value = true;
};
// 编辑
const onEdit = (row) => {
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
  methodCode: [{ required: true, type: 'error', trigger: 'change' }],
  methodName: [{ required: true, type: 'error', trigger: 'change' }],
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
