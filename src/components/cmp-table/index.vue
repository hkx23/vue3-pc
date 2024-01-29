<template>
  <div ref="tableBoxRef" class="cmp-table">
    <div class="table-box">
      <div v-if="showToolbar" class="table-box_header">
        <div class="table-title">
          {{ title }}
          <slot name="title"></slot>
        </div>
        <t-space size="small" :align="'center'">
          <slot name="operate"></slot>
          <t-space size="small" :align="'center'">
            <slot name="button"></slot>
          </t-space>
          <t-popup v-if="showSetting" trigger="click" placement="bottom-right" :z-index="300">
            <t-button shape="square" variant="text"> <t-icon name="more" /></t-button>
            <template #content>
              <t-space direction="vertical" size="small" :align="'center'">
                <t-button v-if="props.showExport" variant="text" @click="onExport"> 导出 </t-button>
                <t-button v-if="props.showRefresh" variant="text" :disabled="loading" @click="onRefresh">
                  刷新
                </t-button>
                <t-popup trigger="click" placement="left-top" @visible-change="columnPopChange">
                  <t-button variant="text">列配置</t-button>
                  <!-- <div slot="content">触发元素是指触发浮层内容显示的元素</div> -->
                  <template #content>
                    <div style="padding: 8px; width: 200px">
                      <!-- 查询框 -->
                      <!-- <div class="table-box__search">
                    <t-input placeholder="请输入" v-model="searchValue" />
                  </div> -->
                      <!-- checkbox列表 -->
                      <div class="table-box__checkbox">
                        <t-space ref="settingRef" direction="vertical" :size="8" style="width: 100%">
                          <t-row v-for="(item, index) in colConfigs" :key="index" :gutter="[0, 8]">
                            <t-col flex="30px" class="handle cursor-move"> <move-icon /></t-col>
                            <t-col flex="auto">{{ item.title }}</t-col>
                            <t-col flex="30px"><t-switch v-model="item.isShow" /></t-col>
                          </t-row>
                        </t-space>
                      </div>
                      <div class="flxsc" style="width: 100%">
                        <t-button style="flex: 1" ghost @click="onAllColConfig('hide')">全部隐藏</t-button>
                        <div style="width: 20px"></div>
                        <t-button style="flex: 1" @click="onAllColConfig('show')">全部显示</t-button>
                      </div>
                    </div>
                  </template>
                </t-popup>
                <t-button variant="text" @click="saveTableSetting"> 保存表格设置 </t-button>
                <t-button variant="text" @click="resetTableSetting"> 重置表格设置 </t-button>
              </t-space>
            </template>
          </t-popup>
        </t-space>
      </div>
      <!-- 表格属性备份
      :expanded-row="expandedRow" -->
      <!-- :max-height="tableHeight + 'px'" -->

      <!-- :style="{ width: tableWidth + 'px' }" -->
      <div ref="tableContentRef" class="table-box__table">
        <t-table
          ref="tableRef"
          v-model:selected-row-keys="selectedRowKeys"
          :vertical-align="'middle'"
          :hover="hover"
          multiple-sort
          resizable
          lazy-load
          :stripe="stripe"
          :active-row-type="activeRowType"
          :row-key="rowKey"
          :columns="columns"
          :data="finalTableData"
          :loading="loading"
          :max-height="maxHeightValue"
          v-bind="$attrs"
          :on-column-resize-change="onColumnResizeChange"
          @select-change="onSelectKeysChange"
          @filter-change="onFilterChange"
          @sort-change="sortChange"
        >
          <template v-for="(value, slotKey) in slots" :key="slotKey" #[slotKey]="{ col, colIndex, row, rowIndex }">
            <slot :name="slotKey" :col="col" :col-index="colIndex" :row="row" :row-index="rowIndex"></slot>
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
          :page-size-options="[20, 50, 100, 200, 500]"
          :show-jumper="false"
          @change="onPaginationChange"
        />
      </div>
    </div>
  </div>

  <t-dialog v-model:visible="downloadDialogVisible" header="自定义导出" width="600px" :footer="false">
    <t-table
      v-model:selectedRowKeys="downloadTableSelectedRowKeys"
      size="small"
      row-key="attrName"
      :columns="downloadTableColumn"
      :data="downloadTableData"
      drag-sort="row-handler"
      @drag-sort="onDownloadTableDragSort"
    >
    </t-table>
    <t-form style="margin-top: 16px" layout="inline">
      <t-form-item required-mark label="文件名称" name="filename">
        <t-space>
          <t-input-adornment append=".xlsx">
            <t-input v-model="downloadFilename" style="width: 220px"></t-input>
          </t-input-adornment>
        </t-space>
      </t-form-item>
      <t-form-item>
        <t-space>
          <t-button theme="primary" @click="onConfirmDownload">导出</t-button>
        </t-space>
      </t-form-item>
    </t-form>
    <t-card v-if="historyDownloadList.length > 0" title="导出历史" style="margin-top: 16px">
      <template #actions>
        <t-space>
          <t-link theme="primary" @click="fetchHistoryDownloadList">刷新</t-link>
          <t-link theme="primary" @click="onClickRemoveHistoryFile()">清空</t-link>
        </t-space>
      </template>
      <t-space break-line>
        <t-tag
          v-for="item in historyDownloadList"
          :key="item.id"
          variant="outline"
          closable
          @close="onClickRemoveHistoryFile([item.id])"
        >
          <template #icon>
            <t-icon
              v-if="item.status === 'DOWNLOADED'"
              title="下载成功"
              name="check-circle-filled"
              style="color: var(--td-success-color)"
            />
            <t-icon
              v-else-if="item.status === 'UNDOWNLOAD'"
              title="待下载"
              name="time-filled"
              style="color: var(--td-text-color-placeholder)"
            />
            <t-loading
              v-else-if="item.status === 'DOWNLOADING'"
              size="small"
              title="下载中"
              style="margin-right: 5px"
            ></t-loading>
          </template>
          <div
            :style="{ cursor: item.status === 'DOWNLOADED' ? 'pointer' : 'default' }"
            @click="onClickDownloadHistoryFile(item)"
          >
            {{ item.excelPath.split('/')[3] }}
          </div>
        </t-tag>
      </t-space>
    </t-card>
  </t-dialog>
</template>

<script lang="tsx" setup name="CmpTable">
import MD5 from 'crypto-js/md5';
import dayjs from 'dayjs';
import _ from 'lodash';
import { MoveIcon } from 'tdesign-icons-vue-next';
import { DateRangePickerPanel, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import {
  computed,
  getCurrentInstance,
  nextTick,
  onActivated,
  onDeactivated,
  onMounted,
  ref,
  useSlots,
  watch,
} from 'vue';
import { useDraggable } from 'vue-draggable-plus';
import { useResizeObserver } from 'vue-hooks-plus';

import { api, DlTask, TableSetting } from '@/api/main';
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

interface columnSetting {
  field: string;
  title: string;
  isShow: boolean;
  width: number;
  index: number;
}

enum Operators {
  LIKE = 'LIKE',
  EQ = 'EQ',
  GT = 'GT',
  LT = 'LT',
  LTE = 'LTE',
  GTE = 'GTE',
}
const boxHeight = ref(0);
const boxWidth = ref(0);

const props = defineProps({
  key: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  searchVisible: { type: Boolean, default: true },
  params: {
    type: Object,
  },
  showToolbar: { type: Boolean, default: true },
  showSetting: { type: Boolean, default: true },
  showRefresh: { type: Boolean, default: false },
  showExport: { type: Boolean, default: true },
  remoteFilter: { type: Boolean, default: true },
  remoteSorter: { type: Boolean, default: true },
  tableColumn: {
    type: Array<TableRowData>,
    default: () => [],
  },
  tableData: { type: Array, default: () => [] },
  total: { type: Number, default: 0 },
  pagination: {
    type: Object,
    default: () => {
      return { page: 1, rows: 20 };
    },
  },
  filters: {
    type: Object,
    default: () => {
      return { filters: [] };
    },
  },
  sorters: {
    type: Object,
    default: () => {
      return { sorters: [] };
    },
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  activeRowType: {
    type: String as () => 'multiple' | 'single',
    default: '',
  },
  hover: {
    type: Boolean,
    default: true,
  },
  stripe: {
    type: Boolean,
    default: false,
  },
  loading: { type: Boolean, default: false },
  rowKey: { type: String, default: 'id' },
  maxHeight: { type: String, default: '' },
  fixedHeight: { type: Boolean, default: false },
  // expandedRow: { type: Function },
  exportFunction: { type: Function },
});
const tableKeyCode = ref('');

const emit = defineEmits([
  'refresh',
  'update:pagination',
  'update:tableData',
  'update:sorters',
  'select-change',
  'update:filters',
]);

// const settingStore = useSettingStore();
const selectedRowKeys = ref<number[]>([]);
function onSelectKeysChange(val: number[]): void {
  selectedRowKeys.value = val;
  // eslint-disable-next-line prefer-rest-params
  emit('select-change', ...arguments);
}

const formRef = ref();
// 远程条件
const filterList = ref([]);
filterList.value = props.filters.filters;
const sortList = ref([]);
sortList.value = props.sorters.sorters;
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

// 表格列配置
const colConfigs = ref<columnSetting[]>([]);

// 表格内展示的列
const columns = computed(() => {
  let indexCount = 0;
  console.log(colConfigs.value);
  const propdCloumnsData = _.cloneDeep(props.tableColumn);
  propdCloumnsData.forEach((item) => {
    if (item.colKey !== 'row-select' && item.colKey !== 'op' && item.colKey !== 'serial-number') {
      // data.colConfigs （Array） 查询是否包含该列，使用title匹配，如果不包含，则新增]

      if (item.filter && item.filter.type === 'input') {
        // 输入框过滤配置
        item.filter = {
          type: 'input',
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
      if (item.filter && item.filter.type === 'single' && item.filter.list && item.filter.list.length > 0) {
        // 输入框过滤配置
        item.filter.confirmEvents = ['onChange'];
      }
      if (item.filter && item.filter.type === 'multiple' && item.filter.list && item.filter.list.length > 0) {
        // 输入框过滤配置
        item.filter.confirmEvents = ['onChange'];
        item.filter.showConfirmAndReset = true;
      }
      if (item.filter && item.filter.type === 'datetime') {
        // 输入框过滤配置
        item.filter = {
          component: DateRangePickerPanel,
          props: {
            firstDayOfWeek: 7,
          },
          style: { fontSize: '14px' },
          classNames: 'custom-class-name',
          attrs: { 'data-type': 'date-range-picker' },
          // 是否显示重置取消按钮，一般情况不需要显示
          showConfirmAndReset: true,
          // 日期范围是一个组件，重置时需赋值为 []
          resetValue: [],
        };
      }

      const existIndex = colConfigs.value.findIndex((itemC) => {
        return itemC.title === item.title;
      });
      if (existIndex < 0) {
        const columnObject: columnSetting = {
          field: item.colKey,
          title: item.title,
          isShow: true,
          width: item.width,
          index: indexCount,
        };
        indexCount++;
        colConfigs.value.push(columnObject);
        item.index = indexCount;
      } else {
        colConfigs.value[existIndex].index = existIndex;
        item.index = existIndex;
        item.width = colConfigs.value[existIndex].width;
        indexCount = existIndex + 1;
      }
    }
  });

  let tableColumn = propdCloumnsData
    .filter((item) => {
      return (
        colConfigs.value.find((itemC) => {
          return itemC.title === item.title;
        })?.isShow ||
        item.colKey === 'row-select' ||
        item.colKey === 'op' ||
        item.colKey === 'serial-number'
      );
    })
    .map((item) => {
      return {
        ellipsis: true,
        index: item.index,
        ...item,
      };
    })
    .sort((a, b) => {
      return a.index - b.index;
    });
  tableColumn = tableColumn.map((item) => {
    return {
      align: 'left',
      ...item,
    };
  });
  return tableColumn;
});
// 表格要导出的列
const exportColumns = computed(() => {
  return props.tableColumn.filter((item) => {
    return item.colKey !== 'row-select' && item.colKey !== 'op' && item.colKey !== 'serial-number';
  });
});
// 全选切换列展示状态
const onAllColConfig = (type: string) => {
  colConfigs.value.forEach((item) => {
    item.isShow = type === 'show';
    // data.colConfigs[key] = type === 'show';
  });
};
const settingRef = ref();

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
    console.log(filterList);
    emit('update:filters', { filters: filterList });
    emit('refresh');
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
    console.log(sortList);
    emit('update:sorters', { sorters: sortList });
    emit('refresh');
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
    const sortDeration = _.map(sortList.value, (item: SortListElement) => {
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

const downloadDialogVisible = ref(false);
const downloadTableColumn: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'drag', // 列拖拽排序必要参数
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: (_h) => (
      <span>
        <MoveIcon />
      </span>
    ),
    width: 46,
  },
  {
    colKey: 'row-select',
    type: 'multiple',
  },
  { colKey: 'columnName', title: '表格列名' },
  { colKey: 'attrName', title: '属性名' },
];
const downloadTableData = ref([]);
const historyDownloadList = ref<DlTask[]>([]);
const tableSettingList = ref<TableSetting[]>([]);
const downloadTableSelectedRowKeys = ref([]);
const downloadFilename = ref('');
if (props.title) {
  const now = `_${dayjs(new Date()).format('YYYYMMDDHHmm')}`;
  downloadFilename.value = props.title + now;
} else {
  const selfSlots = useSlots();
  const titleContent = selfSlots.title ? selfSlots.title() : null;
  if (titleContent && titleContent.length > 0) {
    const now = `_${dayjs(new Date()).format('YYYYMMDDHHmm')}`;
    downloadFilename.value = (titleContent[0].children?.toString().trim() || '') + now;
  }
}

let jsonConfig: any = null;
const captureRefresh = () => {
  const defaultSelectedRowKeys = [];
  downloadTableData.value = props.tableColumn
    .filter((t) => {
      return t.colKey !== 'row-select' && t.colKey !== 'op' && t.colKey !== 'serial-number';
    })
    .map((t) => {
      if (colConfigs.value.filter((c) => c.title === t.title)) {
        defaultSelectedRowKeys.push(t.colKey);
      }
      return {
        attrName: t.colKey,
        columnName: t.title,
      };
    });
  downloadTableSelectedRowKeys.value = defaultSelectedRowKeys;

  http.openOnceCapture(async (item) => {
    jsonConfig = {
      ...item,
      page: (() => {
        const params = item.data as string;
        const pageValue = props.pagination.page;
        const rowsValue = props.pagination.rows;

        const pageIndexPattern = new RegExp(`"(\\w+)"\\s*:\\s*${pageValue}(,|})`);
        const pageSizePattern = new RegExp(`"(\\w+)"\\s*:\\s*${rowsValue}(,|})`);

        const pageIndexNameMatch = params.match(pageIndexPattern);
        const pageSizeNameMatch = params.match(pageSizePattern);

        const pageIndexName = pageIndexNameMatch ? pageIndexNameMatch[1] : '';
        const pageSizeName = pageSizeNameMatch ? pageSizeNameMatch[1] : '';

        return {
          pageIndexName,
          pageSizeName,
        };
      })(),
    };
    fetchHistoryDownloadList();
  });
};

const fetchHistoryDownloadList = async () => {
  historyDownloadList.value = await api.dlTask.getCurrentUserFile({
    tableKey: new URL(jsonConfig.api).pathname,
    behaviorPath: getRouterPath(),
  });
};

const onClickRemoveHistoryFile = async (ids?: string[]) => {
  await api.dlTask.batchDelete(ids || historyDownloadList.value.map((t) => t.id));
  MessagePlugin.success('删除成功');
  fetchHistoryDownloadList();
};

const onClickDownloadHistoryFile = (task: DlTask) => {
  if (task.status === 'DOWNLOADED') {
    window.open(task.jsonConfig);
  }
};

const onDownloadTableDragSort = (params) => {
  downloadTableData.value = params.newData;
};

const onConfirmDownload = async () => {
  if (!downloadFilename.value) {
    MessagePlugin.warning('请维护文件名');
    return;
  }
  jsonConfig = {
    ...jsonConfig,
    fileName: downloadFilename.value,
    columns: downloadTableData.value
      .filter((t) => {
        return downloadTableSelectedRowKeys.value.includes(t.attrName);
      })
      .map((t) => {
        return {
          colKey: t.attrName,
          title: t.columnName,
        };
      }),
  };
  // 判断是否有API，如果没有，走前端导出
  if (jsonConfig.api) {
    const task = {
      behaviorPath: getRouterPath(),
      tableKeyCode: new URL(jsonConfig.api).pathname,
      jsonConfig: JSON.stringify(jsonConfig),
    } as DlTask;

    const loadTask = MessagePlugin.loading({ content: '数据导出中...', duration: 0 });
    try {
      if (props.total > 50000) {
        await api.dlTask.add(task);

        fetchHistoryDownloadList();
      } else {
        downloadDialogVisible.value = false;
        const filePath = await api.dlTask.downloadFile(task);
        window.open(filePath);
      }
    } catch (error) {
      console.error('数据导出失败', error);
    } finally {
      MessagePlugin.close(loadTask);
    }
  } else {
    excelUtils.exportExcel({
      title: downloadFilename.value,
      columns: exportColumns.value,
      tableData: props.tableData,
    });
  }
};

// 导出表格数据
const onExport = async () => {
  if (!props.tableData.length) return MessagePlugin.warning('当前无数据可导出');

  if (props.showPagination) {
    downloadDialogVisible.value = true;
    captureRefresh();
    emit('refresh');
    return null;
  }

  // if (!selectedRowKeys.value.length) return MessagePlugin.warning(t(`CmpTable.pleaseSelectExportData`));
  //
  if (props.exportFunction) {
    props.exportFunction();
  } else {
    excelUtils.exportExcel({
      title: downloadFilename.value,
      columns: exportColumns.value,
      tableData: props.tableData,
    });
  }

  return null;
};

// // 导出全部数据
// const onExportAll = async () => {
//   const dialogTask = DialogPlugin.confirm({
//     header: '提示',
//     body: '确定要导出全部数据吗？',
//     placement: 'center',
//     onConfirm: async () => {
//       dialogTask.destroy();
//       const loadTask = MessagePlugin.loading({ content: '数据导出中...', duration: 0 });
//       try {
//         const result = await props.exportFunction();
//         excelUtils.exportExcel({
//           title: downloadFilename.value,
//           columns: exportColumns.value,
//           tableData: result,
//         });
//       } catch (error) {
//         console.log('error', error);
//         MessagePlugin.error('导出失败');
//       } finally {
//         MessagePlugin.close(loadTask);
//       }
//     },
//   });
// };
watch(
  () => props.tableData,
  (val) => {
    console.log('watch:props.tableData', val);
    nextTick(() => {
      finalTableData.value = props.tableData;
      emit('update:tableData', val);
    });
  },
  { deep: true },
);
// watch(
//   () => finalTableData.value,
//   (val) => {
//     console.log('watch:finalTableData.value ', val);
//     emit('update:tableData', val);
//   },
//   { deep: true },
// );
watch(
  () => props.tableColumn,
  (val) => {
    console.log('watch:props.tableColumn', val);
    nextTick(() => {
      finalTableData.value = _.cloneDeep(props.tableData);
    });
  },
  { deep: true },
);

// 保存表格设置
const saveTableSetting = async () => {
  console.log('saveTableSetting');
  const loadTask = MessagePlugin.loading({ content: '表格自定义保存中...', duration: 0 });
  try {
    const settingModel: TableSetting = {
      tableKeyCode: tableKeyCode.value,
      behaviorPath: getRouterPath(),
      jsonConfig: JSON.stringify(colConfigs.value),
      viewLable: 'DEFAULT',
      isDefault: 1,
    };
    await api.tableSetting.saveSingle(settingModel);
  } catch (error) {
    console.error('表格自定义保存失败', error);
  } finally {
    MessagePlugin.close(loadTask);
  }
};

// 重置表格设置
const resetTableSetting = () => {
  console.log('resetTableSetting');
  colConfigs.value = [];
};

// 加载表格设置
const loadTableSetting = () => {
  console.log('loadTableSetting');
  fetchTableSettingList();
};

const fetchTableSettingList = async () => {
  // console.log(JSON.parse(localStorage.getItem('tabsRouter')).currentRouterPath);
  const path = getRouterPath();
  console.log(path);
  tableSettingList.value = await api.tableSetting.getCurrentUserTable({
    tableKey: tableKeyCode.value,
    behaviorPath: path,
  });
  console.log(tableSettingList.value);
  if (tableSettingList.value && tableSettingList.value.length > 0) {
    const savedSetting = JSON.parse(tableSettingList.value[0].jsonConfig);
    colConfigs.value = savedSetting;
  }
};
const getRouterPath = () => {
  // localStorage.getItem('tabsRouter') 是有窗口包住的情况下会保存
  // 但是还存在页面没有在tab里面使用的
  // 判断思路：抓取当前浏览器的URL
  const url = window.location.pathname + window.location.hash;
  const routerPath = JSON.parse(localStorage.getItem('tabsRouter')).currentRouterPath;
  console.log(url);
  if (url.includes('/#/')) {
    return routerPath;
  }
  return url;
};
const onColumnResizeChange = ({ columnsWidth }) => {
  // 注意：宽度可能存在小数点，根据实际需求处理保存数值
  colConfigs.value.forEach((t) => {
    t.width = columnsWidth[t.field];
  });
};
// ------------------------------------------------适配区------------------------------------------------

// const formContentRef = ref();
const tableContentRef = ref();
const tableRef = ref();
// const showExpand = ref(true); // 是否展示展开按钮
// const tableWidth = ref(100); // 表格宽度
const comVisible = ref(true);
const tableBoxRef = ref(null);
useResizeObserver(tableBoxRef, (entries) => {
  const entry = entries[0];
  debounceFunction(entry);
});
const debounceFunction = _.debounce((entry) => {
  computedTableContentSize(entry);
}, 100);

const computedTableContentSize = (entry) => {
  // 组件处于不可见状态时将不进行计算
  if (!comVisible.value) return;

  const { width: _w, height: _h } = entry.contentRect;
  boxWidth.value = 0;
  boxHeight.value = 0;
  nextTick(() => {
    // 获取不包括padding的高度
    const element = tableBoxRef.value.parentElement;
    const styles = window.getComputedStyle(element);
    const paddingTop = parseInt(styles.paddingTop, 10);
    const paddingBottom = parseInt(styles.paddingBottom, 10);

    const contentHeight = element.clientHeight - paddingTop - paddingBottom;
    boxHeight.value = contentHeight - (props.showToolbar ? 40 : 0) - (props.showPagination ? 50 : 0);
    boxWidth.value = tableBoxRef.value.parentElement.clientWidth;
  });
};

// 表格计算高度
const maxHeightValue = computed(() => {
  // 如果直接设置了max-height，直接返回
  if (props.maxHeight) {
    return props.maxHeight;
  }
  // 如果配置了自适应高度，is-fixed-height,则使用监控的高度
  if (props.fixedHeight) {
    console.log('fixedHeight', boxHeight.value);
    return `${boxHeight.value}px`;
  }
  return '';
});

// watch(
//   () => [settingStore.showTabs, settingStore.showBreadcrumbs, settingStore.collapsed],
//   () => {
//     setTimeout(() => {
//       debounceFunction();
//     }, 200);
//   },
// );
const columnPopChange = (val) => {
  if (val) {
    nextTick(() => {
      useDraggable(settingRef, colConfigs, { animation: 100, handle: '.handle' });
    });
  }
};
onMounted(() => {
  const instance = getCurrentInstance();
  slots.value = instance?.slots;
  tableKeyCode.value = props.key + props.title;
  if (!tableKeyCode.value) {
    // 定义MD5对象
    const columnStr = JSON.stringify(props.tableColumn);
    const md5Result = MD5(columnStr).toString();
    tableKeyCode.value = md5Result;
  }
  loadTableSetting();
});

onActivated(() => {
  comVisible.value = true;
});

onDeactivated(() => {
  comVisible.value = false;
});
</script>

<style lang="less" scoped>
@import './common/index.less';

.table-title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 16px;
}

.cursor-move {
  cursor: move;
}

.flxsc {
  margin-top: 12px;
}

.table-box__checkbox {
  max-height: 400px;
  overflow: auto;
}
</style>
