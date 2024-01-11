<template>
  <t-space direction="vertical" class="t-demo-auto-complete__base" style="width: 100%">
    <t-select-input
      ref="selectRef"
      :value="state.defaultValue"
      placeholder="Please Select"
      :popup-visible="popupVisible"
      :popup-props="{ overlayInnerStyle: { padding: '5px', width: 'auto' } }"
      allow-input
      :label="title"
      :multiple="multiple"
      :readonly="readonly"
      table-layout="auto"
      v-bind="selectAttr"
      :value-key="keywords.value"
      :input-value="selectSearch"
      :filterable="filterable"
      :loading="loading"
      @clear="onClear"
      @tag-change="onTagChange"
      @input-change="onInputChange"
      @keyup="onSelectKeyup"
      @popup-visible-change="onPopupVisibleChange"
    >
      <!-- <template v-if="!multiple" #valueDisplay>
        <span v-if="state.defaultValue" class="displaySpan">
          <icon name="component-dropdown" />
          {{ state.defaultValue[keywords.label] }}
        </span>
      </template> -->
      <template #panel>
        <div class="t-table-select__table" :style="{ width: `${tableWidth}px` }">
          <t-table
            ref="selectTable"
            multiple-sort
            hover
            resizable
            max-height="300"
            :disable-data-page="true"
            cell-empty-content="-"
            bordered
            :pagination="pagination"
            :data="state.tableData"
            lazy-load
            :row-selection-allow-uncheck="false"
            :active-row-type="activeRowType"
            highlight-current-row
            :default-active-row-keys="activeRowKeys"
            :default-selected-row-keys="selectedRowKeys"
            select-on-row-click
            :row-key="rowKey"
            v-bind="$attrs"
            :columns="tableColumns"
            @select-change="rehandleSelectChange"
            @sort-change="sortChange"
            @filter-change="onFilterChange"
          >
            <!-- <template #[slotName]>
              <p>这里是动态插槽---{{ slotName }}</p>
            </template> -->
          </t-table>
        </div>
      </template>
      <template #suffixIcon>
        <chevron-down-icon />
      </template>
    </t-select-input>
  </t-space>
</template>

<script setup lang="tsx" name="BcmpSelectTable">
import { debounce } from 'lodash';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import { computed, nextTick, onMounted, reactive, ref, useAttrs, watch } from 'vue';
// 抛出事件
const emits = defineEmits(['selectionChange']);
// / 00-组件属性定义
const props = defineProps({
  // 选择值
  value: {
    type: [String, Number, Array],
  },
  // 分类参数
  category: {
    type: [String],
    default: '',
  },
  // 父级ID
  parentId: {
    type: [String],
    default: '',
  },
  // table所需数据
  table: {
    type: Object,
    default: () => {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        data: [],
      };
    },
  },
  // 远程URL
  remoteUrl: {
    type: String,
    default: '/api/modeling/mitem/list',
  },
  // 单选是否开启键盘事件
  isKeyup: {
    type: Boolean,
    default: true,
  },
  // 表头数据
  columns: {
    type: Array as unknown as any[],
    default: () => [],
  },
  // rowKey，一般为ID，如果没有ID字段，需要设置成唯一的Key值
  rowKey: {
    type: String,
    default: 'id',
  },
  // 单选或多选文案
  selectTxt: {
    type: String,
    default: '选择',
  },
  // 是否显示分页
  isShowPagination: {
    type: Boolean,
    default: true,
  },
  // 是否显示搜索条件
  isShowQuery: {
    type: Boolean,
    default: false,
  },
  // 是否使用接口
  isRemote: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  // 是否过滤-一般情况默认过滤
  filterable: {
    type: Boolean,
    default: true,
  },
  // 多选
  multiple: {
    type: Boolean,
    default: true,
  },
  // 标题
  title: {
    type: String,
    default: '请选择',
  },
  // table宽度
  tableWidth: {
    type: Number,
    default: 800,
  },
  // 下拉数据指向的label/value
  keywords: {
    type: Object,
    default: () => {
      return {
        label: 'mitemName',
        value: 'mitemCode',
      };
    },
  },
  // 设置默认选中项--keywords.value值（单选是String, Number类型；多选时是数组）
  defaultSelectVal: {
    type: [String, Number, Array],
    default: '',
  },
});

type Filters = { [key: string]: any };
// 选择下拉属性集成
const selectAttr = computed(() => {
  return {
    clearable: true,
    ...useAttrs(),
  };
});
// 是否在加载数据
const loading = ref(false);

// 是否选择变化
const isHandleSelectionChange = ref(false);

// 是否显示弹出层
const popupVisible = ref(false);

// 查询关键字
const selectSearch = ref('');

// 选中默认值
const defaultValue = ref('');

// const popupVisible = ref(false);

const filterList = ref([]);

const tableColumns = ref([
  {
    title: props.selectTxt,
    align: 'center',
    colKey: 'row-select',
    type: props.multiple ? 'multiple' : 'single',
    checkProps: { allowUncheck: true },
    width: 50,
  },
] as unknown as any[]);

// 获取选择控件的ref
const selectRef = ref<any>(null);
const isDefaultSelectVal = ref(true); // 是否已经重新选择了
const state: any = reactive({
  defaultSelectValue: props.defaultSelectVal, // 默认选中
  tableData: props.table.data, // table数据
  selectedRowData: [], // 选中行数据
  defaultValue: props.value, // 选中值
  ids: [], // 多选id集合
  tabularMap: {}, // 存储下拉tale的所有name
});

const total = props.table.data.length;

const onFilterChange = (filters: Filters, ctx: any) => {
  console.log('filter-change', filters, ctx);
  pagination.value.current = 1;
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
  remoteLoad(selectSearch.value);
};
const onPageChange = (PageInfo: any) => {
  pagination.value.current = PageInfo.current;
  pagination.value.pageSize = PageInfo.pageSize;
  console.log(PageInfo);
  console.log('remoteLoad-分页切换');
  remoteLoad(selectSearch.value);
};
// total强制转化成int
const pagination = props.isShowPagination
  ? ref({
      current: 1,
      pageSize: 10,
      showPageNumber: false,
      showJumper: true,
      showPreviousAndNextBtn: false,
      total: Number(total),
      onChange: onPageChange,
    })
  : null;
// 是否多选-作用于表格
type RowKeyType = 'multiple' | 'single';
const activeRowType: RowKeyType = props.multiple ? 'multiple' : 'single';
// 选中的行-值
const selectedRowKeys = ref([]);
// 键盘控制选中的行-值
const activeRowKeys = ref([]);
// 选中事件
const rehandleSelectChange = (value: any[], { selectedRowData }: any) => {
  activeRowKeys.value = value;
  if (props.multiple) {
    checkSelect(value, selectedRowData);
  } else {
    radioSelect(value, selectedRowData);
  }
};
// 可以根据触发来源，自由定制标签变化时的筛选器行为
const onTagChange = (currentTags: any, context: { trigger: any; index: any; item: any }) => {
  if (state.defaultValue === '') {
    state.defaultValue = [];
    state.selectedRowData = [];
  }

  // state.defaultValue = [];
  // console.log(currentTags, context);
  const { trigger, index, item } = context;
  console.log(trigger, index, item);
  if (trigger === 'clear') {
    state.defaultValue = [];
    state.selectedRowData = [];
  }
  if (['tag-remove', 'backspace'].includes(trigger)) {
    state.defaultValue = state.defaultValue.filter((element: any, i: any) => i !== index);
    state.selectedRowData = state.selectedRowData.filter((element: any, i: any) => i !== index);
    selectedRowKeys.value = state.selectedRowData.map((item: { [x: string]: any }) => item[props.rowKey]);
    activeRowKeys.value = selectedRowKeys.value;
  }
  // if (trigger === 'enter') {
  //   const current = { label: item, value: item };
  //   value.value.push(current);
  //   options.value = options.value.concat(current);
  // }

  isHandleSelectionChange.value = true;

  emits('selectionChange', state.selectedRowData, selectedRowKeys.value);
};
const checkSelect = (value: any[], selectedRowData: any) => {
  selectedRowKeys.value = value;
  // console.log(selectedRowData);
  if (selectedRowData && selectedRowData.length > 0) {
    state.defaultValue = selectedRowData;
    state.selectedRowData = selectedRowData;

    // 释放-关闭窗口
    // closeTable();
  } else {
    state.defaultValue = '';
    state.selectedRowData = [];
  }
  console.log('checkSelect');
  if (value.length === 0) {
    isHandleSelectionChange.value = false;
  } else {
    isHandleSelectionChange.value = true;
  }

  emits('selectionChange', state.selectedRowData, selectedRowKeys.value);
};

const radioSelect = (value: any[], selectedRowData: any) => {
  selectedRowKeys.value = value;
  // console.log(selectedRowData);
  if (selectedRowData && selectedRowData.length > 0) {
    const [defaultValue] = selectedRowData;
    state.defaultValue = defaultValue;

    // 释放-关闭窗口
    closeTable();
  } else {
    state.defaultValue = '';
  }
  if (value.length === 0) {
    isHandleSelectionChange.value = false;
  } else {
    isHandleSelectionChange.value = true;
  }
  emits('selectionChange', state.defaultValue, selectedRowKeys.value);
};
const onPopupVisibleChange = (val: boolean, context: any) => {
  selectSearch.value = '';
  onInputChange('');
  popupVisible.value = val;
  console.log(val, context);
};
const onClear = () => {
  if (props.multiple) {
    state.defaultValue = [];
    state.selectedRowData = [];
  } else {
    state.defaultValue = '';
  }

  selectSearch.value = '';
  selectedRowKeys.value = [];
  activeRowKeys.value = [];
  popupVisible.value = false;
};
// 初始化远程数据
onMounted(() => {
  if (props.isRemote && !props.value) {
    setTimeout(() => {
      remoteLoad('');
    }, 500);
  }
});
// 设置默认值
onMounted(() => {
  // 设置默认选中项（单选）
  if (!props.multiple) {
    if (props.keywords.label && props.keywords.value && state.defaultSelectValue && isDefaultSelectVal.value) {
      const obj: Record<string, any> = {};
      obj[props.keywords.label] = state.defaultSelectValue;
      obj[props.keywords.value] = state.defaultSelectValue;
      state.defaultValue = obj;
    }
  } else {
    state.defaultValue = [];
    state.selectedRowData = [];
  }
});

// 单选键盘事件
const onSelectKeyup = (e: any) => {
  console.log('keyup');
  popupVisible.value = true;
  if (!props.multiple) {
    if (!props.isKeyup) return;
    if (state.tableData.length === 0) return;
    let currentIndex = -1; // 当前高亮行的索引
    for (let i = 0; i < state.tableData.length; i++) {
      if (state.tableData[i][props.rowKey] === activeRowKeys.value[0]) {
        currentIndex = i;
        break;
      }
    }
    // console.log(e.keyCode);
    switch (e.keyCode) {
      case 40: // 下键
        // 高亮行设置方法 activeRowKeys.value = state.tableData[表格下表][props.rowKey];
        // 获取当前高亮行，如果没有当前高亮行，则选中第一个为当前高亮
        // 如果有当前高亮行，则获取到当前高亮行处于state.tableData里面的第几个，取下一个
        // 如果有已经是最后一个了，则结束
        // :todo 上下键判断是否可翻页，如果按下键，有下一页就跳转到下一页的第一项
        if (currentIndex === -1) {
          if (state.tableData.length > 0) {
            const [defaultValue] = state.tableData;
            activeRowKeys.value = [defaultValue[props.rowKey]];
          }
        } else if (currentIndex < state.tableData.length - 1) {
          activeRowKeys.value = [state.tableData[currentIndex + 1][props.rowKey]];
        }
        break;
      case 38: // 上键
        // :todo 上下键判断是否可翻页，如果按上键，有上一页就跳转到上一页的最后一项
        if (currentIndex === -1) {
          if (state.tableData.length > 0) {
            const [defaultValue] = state.tableData;
            activeRowKeys.value = [defaultValue[props.rowKey]];
          }
        } else if (currentIndex > 0) {
          activeRowKeys.value = [state.tableData[currentIndex - 1][props.rowKey]];
        }
        break;
      // case 9: // Tab键
      //   if (popupVisible.value) {
      //     closeTable();
      //   }
      //   break;
      case 13: // 回车
        if (!props.multiple) {
          radioSelect(activeRowKeys.value, [state.tableData[currentIndex]]);
        }

        break;
      default:
        break;
    }
  }
};
// todo: 默认选中（且只能默认选中第一页的数据）
// 触发select隐藏
const closeTable = () => {
  console.log('closeTable');
  popupVisible.value = false;
  selectSearch.value = '';
};

const tempCondition = ref({});

const remoteLoad = async (val: any) => {
  loading.value = true;
  const searchCondition = {
    pageNum: pagination.value.current,
    pageSize: pagination.value.pageSize,
    selectedField: props.keywords.value,
    selectedValue: defaultValue.value,
    keyword: selectSearch.value,
    category: props.category,
    parentId: props.parentId,
    sorts: sortList.value,
    filters: filterList.value,
  };

  // 判断两次查询条件是否一样，一样的话，不获取数据
  if (isHandleSelectionChange.value && JSON.stringify(tempCondition.value) === JSON.stringify(searchCondition)) {
    console.log('两次查询条件一样，不获取数据');
    loading.value = false;
    return;
  }
  try {
    const { list, total } = await http.post<any>(props.remoteUrl, searchCondition);
    list.forEach((element: { [x: string]: any; label: any; value: any }) => {
      element.label = element[props.keywords.label];
      element.value = element[props.keywords.value];
    });
    state.tableData = list;
    pagination.value.total = Number(total);
  } catch (e) {
    console.log(e);
    state.tableData = [];
  } finally {
    // 单选-如果完全匹配，直接选中
    radioCSelectRedirct(val);
    loading.value = false;
    defaultValue.value = '';
    isHandleSelectionChange.value = false;
    tempCondition.value = searchCondition;
  }
};

const fetchData = debounce((val) => {
  if (!props.filterable) return;
  if (props.isRemote) {
    console.log('fetchData-远程加载');
    remoteLoad(val);
  } else {
    const tableData = JSON.parse(JSON.stringify(props.table?.data));
    console.log('表格数据', tableData);
    if (tableData && tableData.length > 0) {
      state.tableData = tableData.filter((item: { [x: string]: string | any[] }) => {
        for (const key in item) {
          if (typeof item[key] === 'string' && item[key].includes(val)) {
            return true;
          }
        }
        return false;
      });
      // 单选-如果完全匹配，直接选中
      radioCSelectRedirct(val);
    }
    loading.value = false;
  }
}, 500);
// 搜索过滤
const onInputChange = (val: string) => {
  console.log('onInputChange');
  selectSearch.value = val;
  loading.value = true;

  fetchData(val);
  if (val === '' && !props.multiple) {
    state.defaultValue = '';
    state.selectedRowData = [];
    const value = [];
    const selectedRowData = [];
    radioSelect(value, selectedRowData);
  }
};
// 搜索完全匹配，直接选中
const radioCSelectRedirct = (val: string) => {
  if (!props.multiple) {
    if (state.tableData && state.tableData.length === 1 && val === state.tableData[0][props.keywords.value]) {
      rehandleSelectChange([state.tableData[0][props.rowKey]], { selectedRowData: [state.tableData[0]] });
    } else {
      rehandleSelectChange([], { selectedRowData: [] });
    }
  }
};
// 设置默认值
onMounted(() => {
  tableColumns.value = [
    {
      title: props.selectTxt,
      align: 'center',
      colKey: 'row-select',
      type: props.multiple ? 'multiple' : 'single',
      checkProps: { allowUncheck: true },
      width: 50,
    },
  ];
  props.columns.forEach((element: any) => {
    let addColumn = {
      title: element.title,
      align: 'center',
      colKey: element.key,
      width: element.width,
      sorter: false,
      filter: null,
    };
    if (element.sorter !== false) {
      addColumn.sorter = true;
    }
    if (element.filter !== false) {
      addColumn.filter = {
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
    // 使用addColumn与element合并,element如果有一样的属性，以element为准
    addColumn = Object.assign(addColumn, element);

    tableColumns.value.push(addColumn);
  });

  state.tableData = props.value;
  nextTick(() => {
    // 多选
    if (props.multiple) {
      let valueAsArray: unknown[];
      if (Array.isArray(props.value)) {
        valueAsArray = props.value;
      } else if (typeof props.value === 'string') {
        valueAsArray = props.value.split(',');
      } else {
        valueAsArray = [];
      }
      state.defaultValue = valueAsArray;
      state.defaultValue = (state.defaultValue || []).map((item: any) => {
        return item;
      });
    } else {
      // state.selectSearch = props.value;
      console.log('remoteLoad-按默认值查询');
      if (typeof props.value === 'string') {
        defaultValue.value = props.value.toString();
      } else {
        selectSearch.value = '';
      }
      remoteLoad(props.value);
      // state.defaultValue = props.value ? { [props.keywords.value]: props.value } : '';
      // if (state.defaultValue) {
      // }
    }
  });
});
const sortList = ref([]);

const sortChange = (val: any) => {
  sortList.value = val;
  console.log(sortList.value);
  console.log('remoteLoad-排序');
  remoteLoad(selectSearch.value);
};

watch(
  () => props.value,
  (val) => {
    console.log('watch:props.value', `${props.title} ss ${val}`);

    nextTick(() => {
      // 多选
      if (props.multiple) {
        let valueAsArray: unknown[];
        if (Array.isArray(props.value)) {
          valueAsArray = props.value;
        } else if (typeof props.value === 'string') {
          valueAsArray = props.value.split(',');
        } else {
          valueAsArray = [];
        }
        state.defaultValue = valueAsArray;
        state.defaultValue = (state.defaultValue || []).map((item: any) => {
          return item;
        });
      } else if (!isHandleSelectionChange.value) {
        if (props.value) {
          console.log('remoteLoad-按默认值查询');
          // selectSearch.value = props.value.toString();
          defaultValue.value = props.value.toString();
          remoteLoad(props.value);
        } else {
          state.defaultValue = '';
          selectedRowKeys.value = [];
          emits('selectionChange', state.defaultValue, selectedRowKeys.value);
        }
      }
      isHandleSelectionChange.value = false;
    });
  },
  { deep: true },
);
watch(
  () => props.parentId,
  (val) => {
    console.log('watch:props.parentId', `${props.parentId} ss ${val}`);
    isHandleSelectionChange.value = false;
    remoteLoad('');
  },
  { deep: true },
);

// 暴露方法出去
defineExpose({ closeTable, onClear });
</script>
<style scoped lang="less">
.t-table-select__table {
  :deep(.t-table) {
    border: 0;
  }
}
</style>
