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
        row-key="Serial"
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
      </tm-table>
    </t-card>
    <t-dialog v-model:visible="defectVisible" header="新增/编辑" :cancel-btn="null" :confirm-btn="null" width="40%">
      <t-form ref="formRef" :data="formData" layout="vertical" :rules="rules" @submit="onSubmit">
        <t-form-item label="处理方法类型别名称" label-width="120px" name="processingCategoryName">
          <t-select v-model="formData.processingCategoryName" placeholder="请输入"></t-select>
        </t-form-item>
        <t-form-item label="处理方法编码" label-width="120px" name="processingCode">
          <t-input v-model="formData.processingCode" placeholder="请输入"></t-input>
        </t-form-item>
        <t-form-item label="处理方法名称" label-width="120px" name="processingName">
          <t-input v-model="formData.processingName" placeholder="请输入"></t-input>
        </t-form-item>
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryDelete">取消</t-button>
          <t-button theme="primary" type="submit">确认</t-button>
        </div>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormInstanceFunctions, FormRules, Icon } from 'tdesign-vue-next';
import { computed, onMounted, Ref, ref } from 'vue';

import { useLoading } from '@/hooks/modules/loading';

import TmTable from '../../../../components/tm-table/index.vue';
import { usePage } from '../../../../hooks/modules/page';

const { loading, setLoading } = useLoading();
const { pageUI } = usePage();

// import { api } from '@/api/main';

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

// form表单
const formData = ref({
  processingCategoryName: '', // 处理方法类别名称
  processingCode: '', // 处理方法编码
  processingName: '', // 处理方法名称
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
  { title: '序号', colKey: 'Serial', align: 'center', width: 120 },
  { title: t('defectHandling.processingCategoryName'), colKey: 'processingCategoryName', align: 'center', width: 120 },
  { title: t('defectHandling.processingCode'), colKey: 'processingCode', align: 'center', width: 120 },
  { title: t('defectHandling.processingName'), colKey: 'processingName', align: 'center', width: 120 },
  { title: '操作', colKey: 'op', align: 'left', fixed: 'right', width: 120 },
]);
// table数组
const defectHandlingData = ref([
  {
    Serial: '1',
    processingCategoryName: '调节',
    processingCode: 'B03',
    processingName: '调节面板',
  },
  {
    Serial: '12',
    processingCategoryName: '调节3',
    processingCode: 'B034',
    processingName: '调节面板5',
  },
]);
// 首次进入
const onfetchData = async () => {
  // try {
  //   setLoading(true);
  //   const res = await api.defectHandling.geslist({
  //     pageNum: pageUI.value.page,
  //     pageSize: pageUI.value.rows,
  //     categoryName: formData.value.categoryName,
  //     methodCodeName: formData.value.methodCodeName,
  //   });
  //   defectHandlingData.value = res.list;
  //   total.value = res.total;
  // } catch (e) {
  //   console.log(e);
  // } finally {
  //   setLoading(false);
  // }
  setLoading(true);
  setTimeout(() => {
    defectHandlingData.value = _.cloneDeep(defectHandlingData.value);
    setLoading(false);
  }, 500);
};
// 取消窗口
const onSecondaryDelete = () => {
  defectVisible.value = false;
};
// 批量删除
const onWholeAdd = async () => {
  // try {
  //   await api.defectHandling.removeDefectCodeBatch({
  //     ids: selectedRowKeys.value,
  //   });
  // } catch (e) {
  //   console.log(e);
  // }
};
const AddAnyEdit = ref(1); // 1表示新增  0表示编辑
const onAddAnyEdit = async () => {
  if (AddAnyEdit.value === 1) {
    try {
      // await api.defectHandling.add(formData.value);
    } catch (e) {
      console.log(e);
    }
    console.log('新增');
  } else {
    try {
      // await api.defectHandling.Edit(formData.value};
    } catch (e) {
      console.log(e);
    }
    console.log('编辑');
  }
};
// 新增
const onHandelAdd = () => {
  formRef.value.reset({ type: 'initial' });
  AddAnyEdit.value = 1;
  defectVisible.value = true;
};
// 编辑
const onEdit = (row) => {
  formData.value.processingCategoryName = row.processingCategoryName;
  formData.value.processingCode = row.processingCode;
  formData.value.processingName = row.processingName;
  AddAnyEdit.value = 0;
  formData.value.id = row.id;
  defectVisible.value = true;
};
// 删除
const onDelete = async (row) => {
  // try {
  //   await api.defectHandling.removeDefectCode({
  //     id: row.id,
  //   });
  // } catch (e) {
  //   console.log(e);
  // }
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
  // processingCategoryName: [{ required: true, type: 'error', trigger: 'change' }],
  processingCode: [{ required: true, type: 'error', trigger: 'change' }],
  processingName: [{ required: true, type: 'error', trigger: 'change' }],
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
</style>
