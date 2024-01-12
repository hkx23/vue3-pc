<!-- 新增盘点管理 -->
<template>
  <t-dialog mode="full-screen" :footer="false">
    <template #header>
      <t-space align="center" style="width: 100%">
        <span>{{ props.formTitle }}</span>
      </t-space>
    </template>
    <cmp-container :full="true">
      <cmp-container>
        <cmp-card>
          <cmp-query ref="queryComponent" :opts="opts" :bool-enter="false" @submit="onInput"> </cmp-query>
          <div class="buttonSty">
            <t-button>批量导入</t-button>
            <t-button>确定</t-button>
          </div>
        </cmp-card>
        <!-- table 新增盘点管理 -->
        <cmp-card>
          <cmp-table row-key="id" :table-column="tablenewIMColumns" :show-pagination="false" empty="没有符合条件的数据">
          </cmp-table>
        </cmp-card>
      </cmp-container>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed } from 'vue';

//* 表格标题
const tablenewIMColumns: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 85 },
  { title: '仓库', colKey: 'districtCode', width: 85 },
  { title: '货区', width: 85, colKey: 'districtName' },
  { title: '货位', width: 85, colKey: 'districtDesc' },
  {
    title: '物料编码',
    width: 85,
    colKey: 'warehouseCode',
  },
  { title: '物料描述', width: 100, colKey: 'warehouseName' },
  { title: '操作', align: 'left', fixed: 'right', width: 150, colKey: 'op' },
];
//* 组件配置--查询界面选择
const opts = computed(() => {
  return {
    countingType: {
      label: '盘点类型',
      comp: 't-select',
      event: 'business',
      defaultVal: '',
      required: true, // 设置为必填
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },

    warehouse: {
      label: '仓库',
      comp: 'bcmp-select-business',
      event: 'business',
      defaultVal: '',
      required: true,
      bind: {
        type: 'supplier',
        showTitle: false,
      },
    },
    materialcode: {
      // todo
      label: '物料代码',
      comp: 't-select',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    huoq: {
      // todo
      label: '货区',
      comp: 't-select',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
    huowei: {
      // todo
      label: '货位',
      comp: 't-select',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'mitem',
        showTitle: false,
      },
    },
  };
});
// 接收父组件的参数
const props = defineProps({
  formTitle: {
    type: String,
  },
});

const onInput = async () => {
  // const isValid = await validateQuery();
  // if (isValid) {
  //   // 如果校验通过，继续处理数据
  // } else {
  //   console.log('校验失败');
  // }
};
// const validateQuery = () => {};
</script>

<style scoped>
.buttonSty {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
