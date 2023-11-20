<template>
  <div class="create-table">
    <div class="table-box">
      <div v-if="buttonsVisible" class="table-box_header">
        <t-space size="small" :align="'center'">
          <t-button theme="primary" @click="onExport">
            <span> {{ $t('table.export') }}</span>
          </t-button>
          <t-button v-if="exportFunction" theme="default" @click="onExportAll">
            <span> {{ $t('table.exportAll') }}</span>
          </t-button>
          <slot name="button"></slot>
        </t-space>
        <t-space size="small" :align="'center'">
          <slot name="oprate"></slot>
          <t-button shape="circle" theme="primary" ghost :disabled="loading" @click="onRefresh">
            <template #icon>
              <t-icon name="refresh" />
            </template>
          </t-button>
          <t-button shape="circle" theme="primary" ghost @click="data.visible = true">
            <template #icon>
              <t-icon name="adjustment" />
            </template>
          </t-button>
          <t-button v-if="searchColumn.length" shape="circle" theme="primary" ghost @click="onSearchFormSwitch">
            <template #icon>
              <t-icon name="search" />
            </template>
          </t-button>
        </t-space>
      </div>
      <!-- 表格属性备份
      :expanded-row="expandedRow" -->

      <div ref="tableContentRef" class="table-box__table">
        <t-table
          ref="tableRef"
          hover
          :bordered="true"
          :row-key="rowKey"
          :columns="columns"
          :data="tableData"
          :loading="loading"
          :selected-row-keys="selectedRowKeys"
          :expanded-row-keys="expandedRowKeys"
          v-bind="$attrs"
          :max-height="tableHeight + 'px'"
          :style="{ width: tableWidth + 'px' }"
          @select-change="onSelectKeysChange"
          @expand-change="onExpandKeysChange"
        >
          <template v-for="(value, key) in slots" :key="key" #[key]="{ col, colIndex, row, rowIndex }">
            <slot :name="key" :col="col" :col-index="colIndex" :row="row" :row-index="rowIndex"></slot>
          </template>
        </t-table>
      </div>
      <div class="table-box__pagination">
        <t-pagination
          :loading="loading"
          :current="pagination.page"
          :page-size="pagination.rows"
          :total="total"
          :disabled="loading"
          @change="onPaginationChange"
        />
      </div>
    </div>
    <t-drawer v-model:visible="data.visible" size="320px" close-btn :footer="false" :header="$t('table.drawer.title')">
      <t-row :gutter="[0, 15]">
        <template v-for="(value, key) in data.colConfigs" :key="key">
          <t-col :span="12">
            <t-row>
              <t-col :span="10">{{ key }}</t-col>
              <t-col :span="2"><t-switch v-model="data.colConfigs[key]" /></t-col>
            </t-row>
          </t-col>
        </template>
        <t-col :span="12"></t-col>
        <div class="flxsc" style="width: 100%">
          <t-button style="flex: 1" ghost @click="onAllColConfig('hide')">{{ $t('table.drawer.hide') }}</t-button>
          <div style="width: 20px"></div>
          <t-button style="flex: 1" @click="onAllColConfig('show')">{{ $t('table.drawer.show') }}</t-button>
        </div>
      </t-row>
    </t-drawer>
  </div>
</template>

<script lang="tsx" setup name="CreateTable">
// import { useSettingStore } from '@/store';
import _ from 'lodash';
import { DialogPlugin, MessagePlugin, TableRowData } from 'tdesign-vue-next';
import {
  computed,
  getCurrentInstance,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  reactive,
  ref,
} from 'vue';

import { useTable } from './common/hook';

const props = defineProps({
  searchVisible: { type: Boolean, default: true },
  searchColumn: { type: Array, default: () => [] },
  params: {
    type: Object,
  },
  buttonsVisible: { type: Boolean, default: true },
  tableColumn: {
    type: Array<TableRowData>,
    default: () => [],
  },
  tableData: { type: Array, default: () => [] },
  total: { type: Number, default: 0 },
  pagination: {
    type: Object,
    default: () => {
      return { page: 1, rows: 10 };
    },
  },
  loading: { type: Boolean, default: false },
  rowKey: { type: String, default: 'id' },
  // expandedRow: { type: Function },
  exportFunction: { type: Function },
});

const emit = defineEmits(['refresh', 'update:pagination']);

// const settingStore = useSettingStore();

const { selectedRowKeys, expandedRowKeys, onSelectKeysChange, onExpandKeysChange } = useTable();

const formRef = ref();

defineExpose({
  getSelectedRowKeys: () => selectedRowKeys.value,
  setSelectedRowKeys: (keys: any) => {
    selectedRowKeys.value = keys;
  },
  reset: () => formRef.value.reset(),
});

// 插槽相关
const slots = ref({});

// 组件内响应式数据
const data: {
  visible: boolean;
  showSearchForm: boolean;
  openSearchForm: boolean;
  colConfigs: Record<string, boolean>;
} = reactive({ visible: false, showSearchForm: true, openSearchForm: false, colConfigs: {} });

// const data = reactive({
//   visible: false, // 展示列配置抽屉
//   showSearchForm: true, // 是否显示搜索表单
//   openSearchForm: false, // 是否展开搜索表单
//   colConfigs: {}, // 列配置
// });

// 列配置相关
props.tableColumn.forEach((item) => {
  if (item.colKey !== 'row-select' && item.colKey !== 'op') {
    data.colConfigs[item.title] = true;
  }
});
// 表格内展示的列
const columns = computed(() => {
  return props.tableColumn.filter((item) => {
    return data.colConfigs[item.title] || item.colKey === 'row-select' || item.colKey === 'op';
  });
});
// 表格要导出的列
// const exportColumns = computed(() => {
//   return props.tableColumn.filter((item) => {
//     return item.colKey !== 'row-select' && item.colKey !== 'op';
//   });
// });
// 全选切换列展示状态
const onAllColConfig = (type: string) => {
  Object.keys(data.colConfigs).forEach((key) => {
    data.colConfigs[key] = type === 'show';
  });
};

// 页码相关
const onPaginationChange = (e: { pageSize: any; current: number }) => {
  tableRef.value.scrollToElement({ index: 0 });
  selectedRowKeys.value = [];
  expandedRowKeys.value = [];
  if (props.pagination.rows !== e.pageSize) {
    e.current = 1;
  }
  emit('update:pagination', { page: e.current, rows: e.pageSize });
  emit('refresh');
};

// 展开按钮点击事件
// const onExpandSwitch = () => {
//   data.openSearchForm = !data.openSearchForm;
//   nextTick(() => {
//     computedTableContentSize();
//   });
// };

// 显示搜索区域按钮点击事件
const onSearchFormSwitch = () => {
  data.showSearchForm = !data.showSearchForm;
  nextTick(() => {
    computedTableContentSize();
  });
};

// 查询重置
// const onQuery = () => {
//   selectedRowKeys.value = [];
//   expandedRowKeys.value = [];
//   emit('update:pagination', { page: 1, rows: props.pagination.rows });
//   emit('refresh');
// };

// 刷新表格
const onRefresh = () => {
  selectedRowKeys.value = [];
  expandedRowKeys.value = [];
  emit('refresh');
};

// 导出表格数据
const onExport = () => {
  if (!selectedRowKeys.value.length) return MessagePlugin.warning('请选择需要导出的数据');
  // utils.exportExcel({
  //   selectedRowKeys: selectedRowKeys.value,
  //   columns: exportColumns.value,
  //   tableData: props.tableData,
  //   rowKey: props.rowKey,
  // });
  selectedRowKeys.value = [];
  return null;
};

// 导出全部数据
const onExportAll = async () => {
  const dialogTask = DialogPlugin.confirm({
    header: '提示',
    body: '确定要导出全部数据吗？',
    placement: 'center',
    onConfirm: async () => {
      dialogTask.destroy();
      const loadTask = MessagePlugin.loading({ content: '数据导出中...', duration: 0 });
      try {
        // const result = await props.exportFunction();
        // utils.exportExcel({
        //   columns: exportColumns.value,
        //   tableData: result,
        //   rowKey: props.rowKey,
        // });
      } catch (error) {
        console.log('error', error);
        MessagePlugin.error('导出失败');
      } finally {
        MessagePlugin.close(loadTask);
      }
    },
  });
};

// ------------------------------------------------适配区------------------------------------------------

// const formContentRef = ref();
const tableContentRef = ref();
const tableRef = ref();
// const showExpand = ref(true); // 是否展示展开按钮
const tableWidth = ref(0); // 表格宽度
const tableHeight = ref(0); // 表格高度
const comVisible = ref(true);

const debounceFunction = _.debounce(() => {
  // computedExpandBtnVisible();
  computedTableContentSize();
}, 100);

// const computedExpandBtnVisible = () => {
//   if (formContentRef.value) {
//     showExpand.value = parseInt(formContentRef.value.clientWidth / 360, 10) < props.searchColumn.length;
//   }
// };

const computedTableContentSize = () => {
  // 组件处于不可见状态时将不进行计算
  if (!comVisible.value) return;
  tableWidth.value = 0;
  tableHeight.value = 0;
  nextTick(() => {
    tableWidth.value = tableContentRef.value.clientWidth;
    tableHeight.value = tableContentRef.value.clientHeight;
  });
};

// watch(
//   () => [settingStore.showTabs, settingStore.showBreadcrumbs, settingStore.collapsed],
//   () => {
//     setTimeout(() => {
//       debounceFunction();
//     }, 200);
//   },
// );

onMounted(() => {
  debounceFunction();
  const instance = getCurrentInstance();
  slots.value = instance?.slots;
});

onActivated(() => {
  comVisible.value = true;
  debounceFunction();
});

onDeactivated(() => {
  comVisible.value = false;
});

window.addEventListener('resize', debounceFunction, false);

onBeforeUnmount(() => {
  window.removeEventListener('resize', debounceFunction);
});
</script>

<style lang="less" scoped>
@import './common/index.less';
</style>
