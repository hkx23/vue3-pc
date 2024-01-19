<!-- 容器  -->
<template>
  <cmp-container :full="true">
    <cmp-container>
      <div class="cards-container">
        <!-- card 1 -->
        <cmp-card class="card">
          <t-card>
            <cmp-query ref="queryComponent" :opts="optsContainer1" :bool-enter="false"> </cmp-query>
          </t-card>
          <!-- cmp-table 表格组件  -->
          <cmp-table
            v-model:pagination="pageUI"
            row-key="billNo"
            :table-column="tableContainerColumns1"
            :total="dataTotal"
            empty="没有符合条件的数据"
          >
            <template #button>
              <t-button theme="primary" @click="onAddContainer">新增</t-button>
            </template>
            <template #billNo="slotProps">
              <t-space :size="8">
                <t-link variant="text" theme="primary" name="edit">{{ slotProps.row.billNo }}</t-link>
              </t-space>
            </template>

            <!-- 定义序号列的插槽 -->
            <template #indexSlot="{ rowIndex }">
              {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
            </template>
            <!-- 编辑 -->
            <template #op1="{ row }">
              <t-space>
                <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick1(row)">编辑</t-link>
              </t-space>
            </template>
          </cmp-table>
        </cmp-card>
        <!--  card 2 -->
        <cmp-card class="card">
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
            <template #op2="{ row }">
              <t-space>
                <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick2(row)">编辑</t-link>
                <!-- <t-popconfirm theme="default" content="确认删除吗" @confirm="() => onStateRowClick(row)">
                  <t-link theme="primary"> 删除 </t-link>
                </t-popconfirm> -->
              </t-space>
            </template>
          </cmp-table>
        </cmp-card>
      </div>
    </cmp-container>
  </cmp-container>
  <!-- 弹窗 -->
  <t-dialog v-model:visible="containerVisible" :footer="true" :close-on-overlay-click="false" header="新增容器类型">
    <t-form>
      <t-form-item label="容器类型编码">
        <t-input></t-input>
      </t-form-item>
      <t-form-item label="容器类型名称">
        <t-input></t-input>
      </t-form-item>
      <t-form-item label="容器类型描述">
        <t-input></t-input>
      </t-form-item>
      <t-form-item label="启用">
        <t-switch />
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();
const dataTotal = ref(0);
const containerVisible = ref(false); //* 弹窗默认关闭

//* 组件配置  --查询界面选择
const optsContainer1 = computed(() => {
  return {
    containerTypeCoding: {
      label: '容器类型编码',
      labelWidth: '100',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    containerType: {
      label: '容器状态',
      labelWidth: '100',
      event: 'select',
      comp: 't-select',
      defaultVal: '',
    },
    containerB: {
      label: '容器条码',
      labelWidth: '100',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    containerCode: {
      label: '物料编码',
      labelWidth: '100',
      event: 'select',
      comp: 't-select',
      defaultVal: '',
    },
  };
});

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

// card 1
const tableContainerColumns1: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 65, cell: 'indexSlot' },
  { title: '容器类型编码', colKey: 'categoryName', width: 120 },
  { title: '容器类型名称', width: 120, colKey: 'billNo' },
  { title: '容器类型描述', width: 120, colKey: 'sourceBillNo' },
  { title: '状态', width: 85, colKey: 'billStatusName' },
  { title: '操作', align: 'left', fixed: 'right', width: 100, colKey: 'op1' },
];

// card 2
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
// 新增容器
const onAddContainer = async () => {
  containerVisible.value = true;
};
// 容器编辑
const onEditRowClick1 = async () => {
  containerVisible.value = true;
};
// 编辑
const onEditRowClick2 = async () => {
  containerVisible.value = true;
};
</script>

<style lang="less" scoped>
.cards-container {
  display: flex;
  justify-content: space-between; /* 在卡片之间添加空间 */
}

.card {
  flex: 1; /* 让卡片平均分配空间 */
  margin: 0 10px; /* 可选：添加一些间隔 */
}
</style>
