<template>
  <t-tabs v-model="activeTab">
    <!-- 默认插槽 和 具名插槽（panel）都是用来渲染面板内容 -->
    <t-tab-panel value="tab1" label="容器" :destroy-on-hide="false">
      <t-card>
        <cmp-query ref="queryComponent" :opts="optsContainer2" :bool-enter="false"> </cmp-query>
      </t-card>
      <!-- cmp-table 表格组件  -->
      <cmp-table
        v-model:pagination="pageUI"
        row-key="billNo"
        :table-column="tableContainerColumns2"
        :total="dataTotal"
        empty="没有符合条件的数据"
      >
        <template #button>
          <t-button theme="primary">新增</t-button>
          <t-button theme="primary">生成</t-button>
          <t-button theme="primary">打印</t-button>
          <t-button theme="primary">删除</t-button>
        </template>

        <!-- 定义序号列的插槽 -->
        <template #indexSlot="{ rowIndex }">
          {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
        </template>
        <!-- 编辑 -->
        <template #op2>
          <t-space>
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick2()">编辑</t-link>
            <!-- <t-popconfirm theme="default" content="确认删除吗" @confirm="() => onStateRowClick(row)">
                  <t-link theme="primary"> 删除 </t-link>
                </t-popconfirm> -->
          </t-space>
        </template>
      </cmp-table>
    </t-tab-panel>
    <t-tab-panel value="tab2" label="物料关联" :destroy-on-hide="false">
      <p style="padding: 25px">物料关联的内容...</p>
    </t-tab-panel>
  </t-tabs>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { usePage } from '@/hooks/modules/page';

const dataTotal = ref(0);
const { pageUI } = usePage();

const optsContainer2 = computed(() => {
  return {
    containerState: {
      label: '容器状态',
      labelWidth: '20',
      event: 'select',
      comp: 't-select',
      defaultVal: '',
    },
    containerBarCode: {
      label: '容器条码',
      labelWidth: '20',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    printTemplate: {
      label: '打印模板',
      labelWidth: '20',
      event: 'select',
      comp: 't-select',
      defaultVal: '',
    },
  };
});

const tableContainerColumns2: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 65, cell: 'indexSlot' },
  { title: '物料类别', colKey: 'categoryName', width: 120 },
  { title: '物料类别名称', width: 120, colKey: 'billNo' },
  { title: '物料编码', width: 120, colKey: 'sourceBillNo' },
  { title: '物料名称', width: 85, colKey: 'billStatusName' },
  { title: '物料描述', width: 85, colKey: 'billStatusName' },
  { title: '标题数量', width: 85, colKey: 'billStatusName' },
  { title: '操作', align: 'left', fixed: 'right', width: 100, colKey: 'op2' },
];

// 编辑
const onEditRowClick2 = async () => {
  // containerVisible.value = true;
};

const activeTab = ref('tab1');
</script>
