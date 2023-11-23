<template>
  <div class="tm-table">
    <div class="table-box">
      <div v-if="buttonsVisible" class="table-box_header">
        <t-space size="small" :align="'center'">
          <t-button v-if="props.enableExport" theme="primary" @click="onExport">
            <span>导出</span>
          </t-button>
          <t-button v-if="props.enableExport && exportFunction" theme="default" @click="onExportAll">
            <span>导出全部</span>
          </t-button>
          <slot name="button"></slot>
        </t-space>
        <t-space size="small" :align="'center'">
          <slot name="oprate"></slot>

          <t-button shape="square" variant="outline" :disabled="loading" @click="onRefresh">
            <template #icon>
              <t-icon name="refresh" />
            </template>
          </t-button>
          <t-button shape="square" variant="outline" @click="data.visible = true">
            <template #icon>
              <t-icon name="adjustment" />
            </template>
          </t-button>
        </t-space>
      </div>
      <!-- 表格属性备份
      :expanded-row="expandedRow" -->
      <!-- :max-height="tableHeight + 'px'" -->
      <div ref="tableContentRef" class="table-box__table">
        <t-table
          ref="tableRef"
          hover
          multiple-sort
          resizable
          lazy-load
          :bordered="true"
          :row-key="rowKey"
          :columns="columns"
          :data="finalTableData"
          :loading="loading"
          :selected-row-keys="selectedRowKeys"
          v-bind="$attrs"
          :style="{ width: tableWidth + 'px' }"
          @select-change="onSelectKeysChange"
          @filter-change="onFilterChange"
          @sort-change="sortChange"
        >
          <template v-for="(value, key) in slots" :key="key" #[key]="{ col, colIndex, row, rowIndex }">
            <slot :name="key" :col="col" :col-index="colIndex" :row="row" :row-index="rowIndex"></slot>
          </template>
        </t-table>
      </div>
      <div v-if="showPagination" class="table-box__pagination">
        <t-pagination
          :loading="loading"
          :current="pagination.page"
          :page-size="pagination.rows"
          :total="total"
          :disabled="loading"
          show-jumper
          @change="onPaginationChange"
        />
      </div>
    </div>
    <t-drawer v-model:visible="data.visible" size="320px" close-btn :footer="false" header="列配置">
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
          <t-button style="flex: 1" ghost @click="onAllColConfig('hide')">全部隐藏</t-button>
          <div style="width: 20px"></div>
          <t-button style="flex: 1" @click="onAllColConfig('show')">全部显示</t-button>
        </div>
      </t-row>
    </t-drawer>
  </div>
</template>

<script lang="tsx" setup name="CreateTable">
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
  watch,
} from 'vue';

// import { useSettingStore } from '@/store';
import excelUtils from '@/utils/excel';

type TableData = any[];
type Filters = { [key: string]: any };
interface SortListElement {
  sortBy: string;
  descending?: boolean;
}

interface FilterListElement {
  field: string;
  operator: keyof typeof Operators;
  value: string;
}

enum Operators {
  LIKE = 'LIKE',
  EQ = 'EQ',
  GT = 'GT',
  LT = 'LT',
  LTE = 'LTE',
  GTE = 'GTE',
}

const props = defineProps({
  searchVisible: { type: Boolean, default: true },
  params: {
    type: Object,
  },
  buttonsVisible: { type: Boolean, default: true },
  enableExport: { type: Boolean, default: false },
  remoteFilter: { type: Boolean, default: false },
  remoteSorter: { type: Boolean, default: false },
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
  showPagination: {
    type: Boolean,
    default: true,
  },
  loading: { type: Boolean, default: false },
  rowKey: { type: String, default: 'id' },
  // expandedRow: { type: Function },
  exportFunction: { type: Function },
});

const emit = defineEmits(['refresh', 'update:pagination', 'select-change']);

// const settingStore = useSettingStore();
const selectedRowKeys = ref<number[]>([]);
function onSelectKeysChange(val: number[]): void {
  selectedRowKeys.value = val;
  emit('select-change', val);
}

const formRef = ref();
// 远程条件
const filterList = ref<FilterListElement[]>([]);
const sortList = ref<SortListElement[]>([]);
defineExpose({
  getSelectedRowKeys: () => selectedRowKeys.value,
  setSelectedRowKeys: (keys: any) => {
    selectedRowKeys.value = keys;
  },
  reset: () => formRef.value.reset(),
});

// 插槽相关
const slots = ref({});

// 表格结果数据集
const finalTableData = ref([]);
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
    if (item.sorter !== false) {
      item.sorter = true;
    }
    if (!item.filter) {
      // 输入框过滤配置
      item.filter = {
        type: 'input',

        // 文本域搜索
        // component: Textarea,

        resetValue: '',
        // 按下 Enter 键时也触发确认搜索
        confirmEvents: ['onEnter'],
        props: {
          placeholder: '输入关键词过滤',
        },
        // 是否显示重置取消按钮，一般情况不需要显示
        showConfirmAndReset: true,
      };
    }
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
const exportColumns = computed(() => {
  return props.tableColumn.filter((item) => {
    return item.colKey !== 'row-select' && item.colKey !== 'op';
  });
});
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
  // expandedRowKeys.value = [];
  if (props.pagination.rows !== e.pageSize) {
    e.current = 1;
  }
  emit('update:pagination', { page: e.current, rows: e.pageSize });
  emit('refresh');
};
const onFilterChange = (filters: Filters, ctx: any) => {
  console.log('filter-change', filters, ctx);
  filterList.value = [];
  for (const key in filters) {
    const value = filters[key];
    if (value.length) {
      filterList.value.push({
        field: key,
        operator: 'LIKE',
        value,
      });
    }
  }
  if (!props.remoteFilter) {
    // 本地筛选
    handleSortAndFilter();
  } else {
    // 服务端筛选
    // remoteLoad(selectSearch.value);
  }
};

const sortChange = (val: any) => {
  sortList.value = val;
  console.log(sortList.value);

  if (!props.remoteSorter) {
    // 本地筛选
    handleSortAndFilter();
  } else {
    // 服务端筛选
    console.log('remoteLoad-排序');
    // remoteLoad(selectSearch.value);
  }
};

const handleSortAndFilter = () => {
  const originalTableData = _.cloneDeep(props.tableData);
  let handleTableData: TableData = _.cloneDeep(originalTableData);
  // 对originalTableData数据进行筛选与排序，将结果集赋值改finalTableData
  // sortList的格式为 [{sortBy: 'name', descending: true}]
  // filterList的格式为 [{field: 'name', Operator: 'LIKE',value:'value'}]
  if (!_.isEmpty(filterList)) {
    handleTableData = originalTableData.filter((row: TableData[number]) => {
      return filterList.value.every((item: FilterListElement) => {
        const Operators = {
          LIKE: (a: string, b: string) => a.toString().includes(b),
          EQ: (a: unknown, b: unknown) => a.toString() === b.toString(),
          GT: (a: unknown, b: unknown) => a > b,
          LT: (a: unknown, b: unknown) => a < b,
          LTE: (a: unknown, b: unknown) => a <= b,
          GTE: (a: unknown, b: unknown) => a >= b,
        };
        const op = Operators[item.operator];
        if (!op) throw new Error('Invalid operator');
        return op(row[item.field], item.value);
      });
    });
  }
  if (!_.isEmpty(sortList)) {
    const sortFields = _.map(sortList.value, 'sortBy');
    const sortDeration = _.map(sortList.value, (item) => {
      return item.descending ? 'desc' : 'asc';
    });
    handleTableData = _.orderBy(handleTableData, sortFields, sortDeration);
  }

  finalTableData.value = _.cloneDeep(handleTableData);
};
// 展开按钮点击事件
// const onExpandSwitch = () => {
//   data.openSearchForm = !data.openSearchForm;
//   nextTick(() => {
//     computedTableContentSize();
//   });
// };

// 显示搜索区域按钮点击事件
// const onSearchFormSwitch = () => {
//   data.showSearchForm = !data.showSearchForm;
//   nextTick(() => {
//     computedTableContentSize();
//   });
// };

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
  // expandedRowKeys.value = [];
  emit('refresh');
};

// 导出表格数据
const onExport = () => {
  if (!selectedRowKeys.value.length) return MessagePlugin.warning('请选择需要导出的数据');
  // if (!selectedRowKeys.value.length) return MessagePlugin.warning(t(`tmTable.pleaseSelectExportData`));
  //
  excelUtils.exportExcel({
    selectedRowKeys: selectedRowKeys.value,
    columns: exportColumns.value,
    tableData: props.tableData,
    rowKey: props.rowKey,
  });
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
        const result = await props.exportFunction();
        excelUtils.exportExcel({
          columns: exportColumns.value,
          tableData: result,
          rowKey: props.rowKey,
        });
      } catch (error) {
        console.log('error', error);
        MessagePlugin.error('导出失败');
      } finally {
        MessagePlugin.close(loadTask);
      }
    },
  });
};
watch(
  () => props.tableData,
  (val) => {
    console.log('watch:props.tableData', val);
    nextTick(() => {
      if (props.tableData.length) {
        finalTableData.value = _.cloneDeep(props.tableData);
      }
    });
  },
  { deep: true },
);

// ------------------------------------------------适配区------------------------------------------------

// const formContentRef = ref();
const tableContentRef = ref();
const tableRef = ref();
// const showExpand = ref(true); // 是否展示展开按钮
const tableWidth = ref(0); // 表格宽度
const tableHeight = ref(0); // 表格高度
const comVisible = ref(true);

const debounceFunction = _.debounce(() => {
  computedTableContentSize();
}, 100);

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
