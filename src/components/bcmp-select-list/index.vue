<template>
  <t-select-input
    ref="selectRef"
    :value="state.defaultValue"
    placeholder="Please Select"
    :popup-visible="popupVisible"
    :popup-props="{
      overlayClassName: 'cmp-selector',
      overlayInnerStyle: {
        width: props.multiple || props.listSetting.listType == 'tree' ? '580px' : '350px',
        padding: 0,
      },
    }"
    allow-input
    :label="title"
    :size="size"
    :auto-width="autoWidth"
    :multiple="multiple"
    :readonly="readonly"
    :disabled="disabled"
    table-layout="auto"
    v-bind="selectAttr"
    :min-collapsed-num="1"
    :value-key="keywords.value"
    :input-value="selectSearch"
    :filterable="filterable"
    :loading="loading && pageIndex === 1"
    @input-change="onInputChange"
    @clear="onClear"
    @tag-change="onTagChange"
    @popup-visible-change="onPopupVisibleChange"
  >
    <template #panel>
      <div class="container">
        <div v-show="loading && pageIndex === 1" style="padding: 12px; text-align: center; width: 100%">
          <t-loading></t-loading>
        </div>
        <t-row v-show="!loading || pageIndex > 1" class="body">
          <t-col flex="1" :class="['content left', { bottom: !props.multiple }]">
            <p class="header">
              {{ props.name }}列表
              <t-link
                v-show="isSearch"
                class="action-btn"
                hover="color"
                theme="primary"
                size="small"
                @click="onClickSelectAll"
              >
                全选
              </t-link>
            </p>
            <t-list
              v-if="state.tableData && (props.listSetting.listType !== 'tree' || selectSearch !== '')"
              style="flex: 1; overflow-y: auto"
              :async-loading="asyncLoading"
              @load-more="onLoadMore"
              @scroll="onScrollList"
            >
              <t-list-item
                v-for="item in state.tableData"
                :key="item[keywords.value]"
                class="select-item"
                @click="onOptionClick(item)"
              >
                <cmp-list-item-meta
                  :avatar-label="item[listSetting.image]"
                  :name="item[listSetting.nameField] || item[keywords.value]"
                  :sub-name="item[listSetting.subNameField]"
                  :code="item[listSetting.codeField]"
                  :description="item[listSetting.descField] || ''"
                  :show-icon="item[listSetting.showIcon]"
                  :suffix-tag="item[listSetting.categoryField]"
                  :show-success="selectedRowKeys.indexOf(item[keywords.value]) >= 0"
                ></cmp-list-item-meta>
              </t-list-item>
            </t-list>

            <div v-else-if="props.listSetting.listType === 'tree'" class="full-list">
              <t-tree :data="state.tableData" hover expand-on-click-node :load="onLoadTreeNodes" value-mode="all">
                <template #label="{ node }">
                  <div v-if="node.data?.row?.children">
                    {{ node.label }}
                  </div>
                  <div v-else>
                    <cmp-list-item-meta
                      :name="node.data[listSetting.nameField] || node.data[keywords.value]"
                      :code="node.data[listSetting.codeField]"
                      :description="node.data[listSetting.descField] || ''"
                      :show-icon="node.data[listSetting.showIcon]"
                      :suffix-tag="node.data[listSetting.categoryField]"
                      :show-success="selectedRowKeys.indexOf(node.data[keywords.value]) >= 0"
                      @click="onOptionClick(node.data)"
                    ></cmp-list-item-meta>
                    <!-- @click="onClickItem(node.data)" -->
                  </div>
                </template>
              </t-tree>
            </div>
          </t-col>

          <t-col v-if="props.multiple" flex="1" class="content right">
            <p class="header">
              已选{{ props.name }}
              <t-link
                class="action-btn"
                hover="color"
                theme="primary"
                size="small"
                :disabled="isEmpty(state.selectedRowData)"
                @click="onClickCloseAll"
              >
                清空已选
              </t-link>
            </p>
            <t-list style="flex: 1; overflow-y: auto">
              <t-list-item v-for="item in state.selectedRowData" :key="item[keywords.value]" class="select-item">
                <cmp-list-item-meta
                  :avatar-label="item[listSetting.image]"
                  :name="item[listSetting.nameField] || item[keywords.value]"
                  :sub-name="item[listSetting.subNameField]"
                  :code="item[listSetting.codeField]"
                  :description="item[listSetting.descField] || ''"
                  :show-icon="item[listSetting.showIcon]"
                  show-close-button
                  @close="onClickCloseItem(item[keywords.value])"
                ></cmp-list-item-meta>
              </t-list-item>
            </t-list>
          </t-col>
        </t-row>
        <div v-if="props.multiple" class="footer">
          <t-button theme="default" @click="popupVisible = false">取消</t-button>
          <t-button theme="primary" @click="onClickConfirm">确定</t-button>
        </div>
      </div>
      <!-- <div class="t-select__data" style="max-height: 300px">
          <div
            v-for="item in state.tableData"
            :key="item[keywords.value]"
            :class="{
              'custom-option': true,
              'actived-option':
                state.defaultValue && state.defaultValue[listSetting.codeField] == item[listSetting.codeField],
            }"
            @click="() => onOptionClick(item)"
          >
            <div class="item-title">
              <img :src="listSetting.image" />
              <div class="data_code">{{ item[listSetting.codeField] }}</div>
              <div class="data_name">{{ item[listSetting.nameField] }}</div>
            </div>
            <div class="data_desc">{{ item[listSetting.descField] || '-' }}</div>

          </div>
        </div> -->
    </template>
    <template #suffixIcon>
      <chevron-down-icon />
    </template>
  </t-select-input>
</template>

<script setup lang="tsx" name="BcmpSelectSelect">
import _, { debounce, isEmpty } from 'lodash';
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import { ListProps, SizeEnum, TreeProps } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, PropType, reactive, ref, useAttrs, watch } from 'vue';

import CmpListItemMeta from '../cmp-business/CmpListItemMeta.vue';
import { BusinessItem } from '../cmp-business/constants';
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
  // 尺寸
  size: {
    type: String as PropType<SizeEnum>,
    default: 'medium',
  },
  // 父级ID
  parentId: {
    type: [String],
    default: '',
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
  // rowKey，一般为ID，如果没有ID字段，需要设置成唯一的Key值
  rowKey: {
    type: String,
    default: 'id',
  },
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
  disabled: {
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
  name: {
    type: String,
    default: '物料分类',
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
  listSetting: {
    type: Object,
    default: () => {
      return {
        icon: 'building-1',
        nameField: '',
        codeField: '',
        descField: '',
        listType: 'list',
      };
    },
  },
  // 设置默认选中项--keywords.value值（单选是String, Number类型；多选时是数组）
  defaultSelectVal: {
    type: [String, Number, Array],
    default: '',
  },
  // 自定义查询条件
  customConditions: {
    type: Array as unknown as any[],
    default: () => {
      return [];
    },
  },
  autoWidth: {
    type: Boolean,
    default: false,
  },
  autoSelect: {
    type: Boolean,
    default: false,
  },
  // 动态查询接口用到的参数
  dynamicTableName: {
    type: String,
    default: '',
  },
  dynamicBusinessDomain: {
    type: String,
    default: '',
  },
  dynamicKeywordFields: {
    type: Array,
    default: () => {
      return [];
    },
  },
  dynamicDefaultSortFiled: {
    type: String,
    default: '',
  },
});
const onOptionClick = (item, openReverse: boolean = true) => {
  if (props.multiple) {
    if (!Array.isArray(state.selectedRowData)) {
      state.selectedRowData = [];
    }
    if (state.selectedRowData.findIndex((t) => t[props.rowKey] === item[props.rowKey]) >= 0) {
      if (openReverse) {
        onClickCloseItem(item[props.rowKey]);
      }
      return;
    }
    state.selectedRowData.push(item);
    // selectedRowKeys.value = state.selectedRowData.map((item: { [x: string]: any }) => item[props.rowKey]);
  } else {
    state.defaultValue = item;
    state.selectedRowData = item;
    // selectedRowKeys.value = item[props.rowKey];
    onClickConfirm();
  }
};

const onClickConfirm = () => {
  // emits('selectionChange', state.selectedRowData, selectedRowKeys.value);
  popupVisible.value = false;

  emits('selectionChange', state.selectedRowData, selectedRowKeys.value);
};
// 选择下拉属性集成
const selectAttr = computed(() => {
  return {
    clearable: true,
    ...useAttrs(),
  };
});

const filterList = ref([]);

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

const pageIndex = ref(1);

// const popupVisible = ref(false);

// 获取选择控件的ref
const selectRef = ref<any>(null);
const isDefaultSelectVal = ref(true); // 是否已经重新选择了
const state: any = reactive({
  defaultSelectValue: props.defaultSelectVal, // 默认选中
  tableData: [], // table数据
  selectedRowData: [], // 选中行数据
  defaultValue: props.value, // 选中值
  ids: [], // 多选id集合
  tabularMap: {}, // 存储下拉tale的所有name
});

const isSearch = computed<Boolean>(() => {
  return selectSearch.value !== '' && state.tableData.length > 0;
});
const onClickSelectAll = () => {
  if (Array.isArray(state.selectedRowData) && state.tableData.length > 0) {
    state.tableData.forEach((item) => {
      onOptionClick(item, false);
    });
  }
};
// 选中的行-值
// const selectedRowKeys = ref([]);
const selectedRowKeys = computed<string[]>(() => {
  if (props.multiple) {
    return state.selectedRowData.map((item: { [x: string]: any }) => item[props.rowKey]);
  }
  return [state.defaultValue];
});
const onPopupVisibleChange = (val: boolean, _context: any) => {
  if (val) {
    selectSearch.value = '';
    onInputChange('');
    // console.log(val, context);
    if (props.multiple) {
      if (Array.isArray(state.defaultValue) && state.defaultValue.length > 0) {
        // 去查接口获取已选择的数据
        loadSelectedData();
        // state.selectedRowData = state.defaultValue;
      } else {
        state.selectedRowData = [];
      }
    }
  } else if (!props.multiple && state.defaultValue) {
    emits('selectionChange', state.defaultValue, selectedRowKeys.value);
  }
  popupVisible.value = val;
};
const onClear = () => {
  if (props.multiple) {
    state.defaultValue = [];
    state.selectedRowData = [];
  } else {
    state.defaultValue = '';
  }

  selectSearch.value = '';
  // selectedRowKeys.value = [];
  popupVisible.value = false;
  emits('selectionChange', state.defaultValue, selectedRowKeys.value);
};
// 初始化远程数据
onMounted(() => {
  if (props.isRemote && !props.value) {
    setTimeout(() => {
      if (!(props.listSetting && props.listSetting.listType === 'tree')) {
        remoteLoad(props.value);
      }
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

// todo: 默认选中（且只能默认选中第一页的数据）
// 触发select隐藏
const closeTable = () => {
  // console.log('closeTable');
  popupVisible.value = false;
  selectSearch.value = '';
};
// 选中事件
const rehandleSelectChange = (value: any[], { selectedRowData }: any) => {
  // activeRowKeys.value = value;
  if (props.multiple) {
    // checkSelect(value, selectedRowData);
  } else {
    onOptionClick(selectedRowData);
  }
};
// 搜索完全匹配，直接选中
const radioCSelectRedirct = (val: string) => {
  if (!props.multiple) {
    if (state.tableData && state.tableData.length === 1) {
      if (firstLoad.value && props.autoSelect) {
        rehandleSelectChange([state.tableData[0][props.rowKey]], { selectedRowData: state.tableData[0] });
      } else if (val === state.tableData[0][props.keywords.value]) {
        rehandleSelectChange([state.tableData[0][props.rowKey]], { selectedRowData: state.tableData[0] });
      }
    }
  }
};
const tempCondition: any = ref({});

const onClickCloseItem = (keyValue: string) => {
  if (Array.isArray(state.selectedRowData)) {
    state.selectedRowData = state.selectedRowData.filter((t) => t[props.keywords.value] !== keyValue);
  }
};

const onClickCloseAll = () => {
  state.selectedRowData = [];
};

const loadSelectedData = async () => {
  let selectValue = '';
  if (Array.isArray(state.defaultValue) && state.defaultValue.length > 0) {
    // 先判断state.defaultValue的数组结构有没有value属性
    if (state.defaultValue[0].value) {
      selectValue = state.defaultValue.map((item: { [x: string]: any }) => item.value).join(',');
    } else {
      selectValue = state.defaultValue.join(',');
    }
  } else if (typeof state.defaultValue === 'string') {
    selectValue = state.defaultValue;
  }
  if (selectValue === '') return;
  loading.value = true;
  const searchCondition = {
    pageNum: 1, // pagination.value.current,
    pageSize: 99999, // pagination.value.pageSize,
    selectedField: props.keywords.value,
    selectedValue: selectValue,
    keyword: '',
    category: props.category,
    parentId: props.parentId,
    dynamicTableName: props.dynamicTableName,
    dynamicBusinessDomain: props.dynamicBusinessDomain,
    dynamicKeywordFields: props.dynamicKeywordFields,
    dynamicDefaultSortFiled: props.dynamicDefaultSortFiled,
  };

  try {
    const { list } = await http.post<any>(props.remoteUrl, searchCondition);

    list.forEach((element: { [x: string]: any; label: any; value: any }) => {
      element.label = element[props.keywords.label];
      element.value = element[props.keywords.value];
    });
    state.selectedRowData = list;
    state.defaultValue = _.cloneDeep(list);
  } catch (_e) {
    // console.log(e);
  } finally {
    loading.value = false;
  }
};
const firstLoad = ref(true);

const remoteLoad = async (val: any) => {
  loading.value = true;
  const finalFilterList = _.cloneDeep(filterList.value);
  if (props.customConditions && props.customConditions.length > 0) {
    props.customConditions.forEach((element) => {
      finalFilterList.push(element);
    });
  }

  if (tempCondition.value.keyword !== selectSearch.value) {
    pageIndex.value = 1;
  }
  const searchCondition = {
    pageNum: pageIndex?.value || 1, // pagination.value.current,
    pageSize: 20, // pagination.value.pageSize,
    selectedField: props.keywords.value,
    selectedValue: defaultValue.value,
    keyword: selectSearch.value,
    category: props.category,
    parentId: props.parentId,
    filters: finalFilterList,
    dynamicTableName: props.dynamicTableName,
    dynamicBusinessDomain: props.dynamicBusinessDomain,
    dynamicKeywordFields: props.dynamicKeywordFields,
    dynamicDefaultSortFiled: props.dynamicDefaultSortFiled,
  };

  // 判断两次查询条件是否一样，一样的话，不获取数据
  if (isHandleSelectionChange.value && JSON.stringify(tempCondition.value) === JSON.stringify(searchCondition)) {
    // console.log('两次查询条件一样，不获取数据');
    loading.value = false;
    return;
  }
  try {
    const { list } = await http.post<any>(props.remoteUrl, searchCondition);
    if (!list) {
      asyncLoading.value = '';
    }
    list.forEach((element: { [x: string]: any; label: any; value: any }) => {
      element.label = element[props.keywords.label];
      element.value = element[props.keywords.value];
    });
    if (searchCondition.pageNum === 1) {
      state.tableData = list;
    } else {
      const combinedList = state.tableData.concat(list);
      const uniqueList = combinedList.filter((item, index, arr) => arr.findIndex((t) => t.id === item.id) === index);
      state.tableData = uniqueList;
    }
    asyncLoading.value = list.length < searchCondition.pageSize ? '' : 'load-more';
  } catch (_e) {
    // console.log(_e);
  } finally {
    // 单选-如果完全匹配，直接选中
    radioCSelectRedirct(val);
    loading.value = false;
    defaultValue.value = '';
    isHandleSelectionChange.value = false;
    tempCondition.value = searchCondition;
  }
};

const remoteLoadTree = async () => {
  loading.value = true;

  try {
    const result = await http.get<any>(props.listSetting.defaultTreeUrl);
    if (!result) {
      asyncLoading.value = '';
    }
    state.tableData = formatTreeNode(result);
    asyncLoading.value = '';
  } catch (_e) {
    // console.log(_e);
  } finally {
    // 单选-如果完全匹配，直接选中
    // radioCSelectRedirct(val);
    loading.value = false;
    defaultValue.value = '';
    isHandleSelectionChange.value = false;
    // tempCondition.value = searchCondition;
  }
};

// 可以根据触发来源，自由定制标签变化时的筛选器行为
const onTagChange = (currentTags: any, context: { trigger: any; index: any; item: any }) => {
  if (!(state.defaultValue && state.defaultValue.length > 0)) {
    state.defaultValue = [];
    state.selectedRowData = [];
  }

  // state.defaultValue = [];
  // console.log(currentTags, context);
  const { trigger, index } = context;
  // console.log(trigger, index, item);
  if (trigger === 'clear') {
    state.defaultValue = [];
    state.selectedRowData = [];
  }
  if (['tag-remove', 'backspace'].includes(trigger)) {
    state.defaultValue = state.defaultValue.filter((element: any, i: any) => i !== index);
    state.selectedRowData = state.selectedRowData.filter((element: any, i: any) => i !== index);
    // selectedRowKeys.value = state.selectedRowData.map((item: { [x: string]: any }) => item[props.rowKey]);
  }
  // if (trigger === 'enter') {
  //   const current = { label: item, value: item };
  //   value.value.push(current);
  //   options.value = options.value.concat(current);
  // }

  isHandleSelectionChange.value = true;

  emits('selectionChange', state.selectedRowData, selectedRowKeys.value);
};

const fetchData = debounce((val) => {
  if (!props.filterable) return;
  if (props.isRemote) {
    // console.log('fetchData-远程加载');
    if (props.listSetting && props.listSetting.listType === 'tree' && val === '') {
      remoteLoadTree();
    } else {
      remoteLoad(val);
    }
  } else {
    const tableData = JSON.parse(JSON.stringify(props.table?.data));
    // console.log('表格数据', tableData);
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

// const isFirstLoad = ref(true);

// 搜索过滤
const onInputChange = (val: string) => {
  console.log('onInputChange');
  selectSearch.value = val;
  loading.value = true;
  fetchData(val);

  // if (!(props.listSetting.listType === 'tree' && (isFirstLoad.value === false || val === ''))) {
  //   isFirstLoad.value = false;
  //   selectSearch.value = val;
  //   loading.value = true;
  //   if (val !== '') {
  //     isFirstLoad.value = true;
  //   }
  //   fetchData(val);
  // }
};

const asyncLoading = ref<ListProps['asyncLoading']>('load-more');
const onLoadMore: ListProps['onLoadMore'] = () => {
  if (asyncLoading.value === '') return;
  asyncLoading.value = 'loading';
  pageIndex.value++;
  fetchData(selectSearch.value);
};
const onScrollList: ListProps['onScroll'] = debounce((e) => {
  if (e.scrollBottom <= 1) {
    onLoadMore(null);
  }
}, 200);

const onLoadTreeNodes: TreeProps['load'] = (node) => {
  // return null;
  return fetchTreeNodeData(node.data.row?.id as string, node.data.row?.children as any[]);
};
const formatTreeNode = (list: any[]): BusinessItem[] => {
  if (isEmpty(list)) return [];
  return list.map((t) => {
    return {
      label: t[props.listSetting.treeLabelField],
      value: t[props.listSetting.treeValueField],
      id: t[props.listSetting.treeIdField],
      row: t,
      children: true,
    } as BusinessItem;
  });
};

const fetchTreeNodeData = async (key: string | number, children: any[]) => {
  // console.log(children);
  const searchCondition = {
    pageNum: 1, // pagination.value.current,
    pageSize: 9999, // pagination.value.pageSize,
    selectedField: '',
    selectedValue: '',
    keyword: '',
    category: '',
    parentId: key,
    filters: [],
    dynamicTableName: props.dynamicTableName,
    dynamicBusinessDomain: props.dynamicBusinessDomain,
    dynamicKeywordFields: props.dynamicKeywordFields,
    dynamicDefaultSortFiled: props.dynamicDefaultSortFiled,
  };
  const { list } = await http.post<any>(props.listSetting.loadNodeUrl, searchCondition);
  const treeNodes = formatTreeNode(children);
  return [...list, ...treeNodes];
};

// 设置默认值
onMounted(() => {
  state.tableData = props.value;
  nextTick(() => {
    // 多选
    if (props.multiple) {
      let valueAsArray: unknown[];
      if (Array.isArray(props.value)) {
        valueAsArray = props.value;
      } else if (typeof props.value === 'string' && props.value.length > 0) {
        valueAsArray = props.value.split(',');
      } else {
        valueAsArray = [];
      }
      state.defaultValue = valueAsArray;
      state.defaultValue = (state.defaultValue || []).map((item: any) => {
        return item;
      });
      if (state.defaultValue.length > 0) {
        loadSelectedData();
      }
    } else {
      // state.selectSearch = props.value;
      // console.log('remoteLoad-按默认值查询');
      if (typeof props.value === 'string') {
        defaultValue.value = props.value.toString();
      } else {
        selectSearch.value = '';
      }
      // if (!(props.listSetting && props.listSetting.listType === 'tree')) {
      remoteLoad(props.value);
      // }
    }
  });
});

watch(
  () => props.value,
  (_val) => {
    // console.log('watch:props.value', `${props.title} ss ${val}`);
    nextTick(() => {
      // 多选
      if (props.multiple) {
        let valueAsArray: unknown[];
        if (Array.isArray(props.value)) {
          valueAsArray = props.value;
        } else if (typeof props.value === 'string' && props.value !== '') {
          valueAsArray = props.value.split(',');
        } else {
          valueAsArray = [];
        }
        state.defaultValue = valueAsArray;
        state.defaultValue = (state.defaultValue || []).map((item: any) => {
          return item;
        });
        loadSelectedData();
      } else if (!isHandleSelectionChange.value) {
        if (props.value) {
          // console.log('remoteLoad-按默认值查询');
          defaultValue.value = props.value.toString();

          remoteLoad(props.value);
        } else {
          state.defaultValue = '';
          // selectedRowKeys.value = [];
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
  (_val) => {
    // console.log('watch:props.parentId', `${props.parentId} ss ${val}`);
    isHandleSelectionChange.value = false;
    remoteLoad('');
  },
  { deep: true },
);

watch(
  () => props.multiple,
  (newVal) => {
    if (state.selectedRowData.value) {
      if (newVal && !Array.isArray(state.selectedRowData.value)) {
        state.selectedRowData.value = [];
      } else if (!newVal && Array.isArray(state.selectedRowData.value)) {
        state.selectedRowData.value = undefined;
      }
    }
  },
);

// 暴露方法出去
defineExpose({ closeTable, onClear });
</script>
<style scoped lang="less">
.cmp-selector .t-popup__content {
  width: 580px;
  padding: 0;
}

.container {
  > .body {
    flex-flow: row nowrap;
    padding: 0 16px;

    > .content {
      max-height: 300px;
      display: flex;
      flex-direction: column;

      &.right {
        margin: 10px 0;
        padding-left: 10px !important;
        border-left: 1px solid var(--td-border-level-1-color);
      }

      &.left {
        margin-top: 10px;
        margin-right: 10px;
      }

      &.bottom {
        margin-bottom: 10px;
      }

      > .header {
        margin-top: 0;
        font-size: 12px;
        color: #36434d;
        line-height: 20px;
        padding: 5px 0;

        .action-btn {
          float: right;
        }
      }

      > .full-list {
        flex: 1;
        overflow-y: auto;
      }
    }
  }

  > .footer {
    text-align: right;
    padding: 10px 15px;
    border-top: 1px solid var(--td-border-level-1-color);
  }
}

.select-item {
  padding: 0;

  &:hover {
    background-color: var(--td-bg-color-container-hover);
    border-radius: var(--td-radius-default);
  }
}
</style>
