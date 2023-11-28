<template>
  <div>
    <t-card class="list-card-defectHandling">
      <tm-table
        v-model:pagination="pageUI"
        :table-data="defectHandlingData"
        :table-column="column"
        :total="total"
        @refresh="onfetchData"
      >
        <template #op>
          <icon name="edit-1"></icon>
          <icon name="delete"></icon>
        </template>
      </tm-table>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { onMounted, ref } from 'vue';

import TmTable from '../../../../components/tm-table/index.vue';
import { usePage } from '../../../../hooks/modules/page';

const { pageUI } = usePage();
const total = ref(10);
onMounted(() => {
  onfetchData();
});
const column = ref([
  { type: 'multiple', align: 'center' },
  { title: '序号', colKey: 'Serial', align: 'center', width: 120 },
  { title: '处理方法类别名称', colKey: 'processingCategoryName', align: 'center', width: 120 },
  { title: '处理方法编码', colKey: 'processingCode', align: 'center', width: 120 },
  { title: '处理方法名称', colKey: 'processingName', align: 'center', width: 120 },
  { title: '操作', colKey: 'op', align: 'left', fixed: 'right', width: 120 },
]);
const defectHandlingData = ref([
  {
    Serial: '1',
    processingCategoryName: '调节',
    processingCode: 'B03',
    processingName: '调节面板',
  },
]);
const onfetchData = () => {
  defectHandlingData.value = _.cloneDeep(defectHandlingData.value);
};
</script>

<style lang="less" scoped>
.list-card-defectHandling {
  padding: var(--td-comp-paddingLR-xl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}
</style>
