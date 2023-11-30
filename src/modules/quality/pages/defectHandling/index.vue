<template>
  <div>
    <t-card class="list-card-defectHandling">
      <t-row justify="end">
        <t-col style="margin: 0 20px">
          <t-input placeholder="请输入处理方法类别名称" label="处理方法类别名称:"></t-input>
        </t-col>
        <t-col>
          <t-input placeholder="请输入方法编码/名称" label="处理方法编码/名称:"></t-input>
        </t-col>
      </t-row>
      <tm-table
        v-model:pagination="pageUI"
        :table-data="defectHandlingData"
        :table-column="column"
        :total="total"
        :loading="loading"
        @refresh="onfetchData"
      >
        <template #op="{ row }">
          <!-- 编辑 -->
          <icon name="edit-1" style="cursor: pointer" @click="onEdit"></icon>
          <!-- 删除 -->
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelete(row)">
            <icon name="delete" style="margin: 0 15px; cursor: pointer"></icon>
          </t-popconfirm>
        </template>
        <template #button>
          <!-- 新增 -->
          <t-button theme="default" @click="onHandelAdd"> <icon name="add"></icon></t-button>
          <!-- 删除 -->
          <t-button><icon name="delete"></icon></t-button>
        </template>
      </tm-table>
    </t-card>
    <t-dialog v-model:visible="defectVisible" header="新增/编辑" :cancel-btn="null" :confirm-btn="null" width="40%">
      <t-form ref="formRef" layout="vertical" scroll-to-first-error="smooth" :rules="rules" @submit="onSubmit">
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
import { Data, FormRules, Icon } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { useLoading } from '@/hooks/modules/loading';

import TmTable from '../../../../components/tm-table/index.vue';
import { usePage } from '../../../../hooks/modules/page';

const { loading, setLoading } = useLoading();
const { pageUI } = usePage();

import { useLang } from './lang';

const formRef = ref(null);
const defectVisible = ref(false); // 新增编辑窗口
const { t } = useLang();
const total = ref(10);
const formData = ref({
  processingCategoryName: '', // 处理方法类别名称
  processingCode: '', // 处理方法编码
  processingName: '', // 处理方法名称
});
onMounted(() => {
  onfetchData();
});
// 装入数组
const column = ref([
  { type: 'multiple', align: 'center' },
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
]);
// 首次进入
const onfetchData = () => {
  setLoading(true);
  setTimeout(() => {
    defectHandlingData.value = _.cloneDeep(defectHandlingData.value);
    setLoading(false);
  }, 500);
};
// 删除
const onSecondaryDelete = () => {
  defectVisible.value = false;
};
// 新增
const onHandelAdd = () => {
  defectVisible.value = true;
};

// 编辑
const onEdit = () => {
  defectVisible.value = true;
};
// 删除
const onDelete = (row) => {
  console.log(row);
};
// 提交校验
const onSubmit = (context: any) => {
  console.log(context);
};
// 校验条件
const rules: FormRules<Data> = {
  processingCategoryName: [{ required: true, type: 'error', trigger: 'change' }],
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
