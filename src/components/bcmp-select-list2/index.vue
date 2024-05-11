<template>
  <t-space direction="vertical" class="t-demo-auto-complete__base" style="width: 100%">
    <t-select-input
      ref="selectRef"
      :value="state.defaultValue"
      placeholder="Please Select"
      :popup-visible="popupVisible"
      :popup-props="{ overlayClassName: 'cmp-selector' }"
      allow-input
      :label="title"
      :multiple="multiple"
      :readonly="readonly"
      table-layout="auto"
      v-bind="selectAttr"
      :min-collapsed-num="1"
      :value-key="keywords.value"
      :input-value="selectSearch"
      :filterable="filterable"
      :loading="loading"
      :auto-width="autoWidth"
      @input-change="onInputChange"
      @clear="onClear"
      @popup-visible-change="onPopupVisibleChange"
    >
      <template #panel>
        <div class="t-select__data" style="max-height: 300px">
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
            <!-- <t-icon :name="listSetting.icon" size="24" class="custom-option__icon"></t-icon>
          <div class="custom-option__main">
            <t-highlight-option
              :content="item[listSetting.codeField]"
              :keyword="state.defaultValue && state.defaultValue[listSetting.codeField]"
            />
            <small class="description">{{ item[listSetting.descField] || '-' }}</small>
          </div> -->
          </div>
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
      };
    },
  },
  // 设置默认选中项--keywords.value值（单选是String, Number类型；多选时是数组）
  defaultSelectVal: {
    type: [String, Number, Array],
    default: '',
  },
  autoWidth: {
    type: Boolean,
    default: false,
  },
});
const onOptionClick = (item) => {
  state.defaultValue = item;
  popupVisible.value = false;
  state.selectedRowData = item;
  emits('selectionChange', state.selectedRowData, selectedRowKeys.value);
};
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

// 是否多选-作用于表格
// type RowKeyType = 'multiple' | 'single';
// const activeRowType: RowKeyType = props.multiple ? 'multiple' : 'single';
// 选中的行-值
const selectedRowKeys = ref([]);

const onPopupVisibleChange = (val: boolean, context: any) => {
  if (val) {
    selectSearch.value = '';
    onInputChange('');
    selectedRowKeys.value = [];
    console.log(val, context);
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
  selectedRowKeys.value = [];
  popupVisible.value = false;
  emits('selectionChange', state.defaultValue, selectedRowKeys.value);
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

// todo: 默认选中（且只能默认选中第一页的数据）
// 触发select隐藏
const closeTable = () => {
  console.log('closeTable');
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
    if (state.tableData.length === 1 && val === state.tableData[0][props.keywords.value]) {
      rehandleSelectChange([state.tableData[0][props.rowKey]], { selectedRowData: state.tableData[0] });
    }
  }
};
const tempCondition = ref({});

const remoteLoad = async (val: any) => {
  loading.value = true;
  const searchCondition = {
    pageNum: 1, // pagination.value.current,
    pageSize: 999, // pagination.value.pageSize,
    selectedField: props.keywords.value,
    selectedValue: defaultValue.value,
    keyword: selectSearch.value,
    category: props.category,
    parentId: props.parentId,
  };

  // 判断两次查询条件是否一样，一样的话，不获取数据
  if (isHandleSelectionChange.value && JSON.stringify(tempCondition.value) === JSON.stringify(searchCondition)) {
    console.log('两次查询条件一样，不获取数据');
    loading.value = false;
    return;
  }
  try {
    const { list } = await http.post<any>(props.remoteUrl, searchCondition);
    list.forEach((element: { [x: string]: any; label: any; value: any }) => {
      element.label = element[props.keywords.label];
      element.value = element[props.keywords.value];
    });
    state.tableData = list;
  } catch (e) {
    console.log(e);
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
  // if (val === '' && !props.multiple) {
  //   state.defaultValue = '';
  //   state.selectedRowData = [];
  //   // const value = [];
  //   // const selectedRowData = [];
  // }
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
    }
  });
});

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
<style lang="less" scoped>
.t-autocomplete-option-list .t-select-option {
  height: 50px;
}

.t-autocomplete-option-list .custom-option .custom-option__icon {
  max-height: 40px;
  margin: 0 8px;
  color: var(--td-gray-color-8);
}

.t-autocomplete-option-list .custom-option__main::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  height: 100%;
  background: linear-gradient(to top, rgb(0 0 0 / 0%), #ececec 50%, rgb(0 0 0 / 0%));
}

.t-autocomplete-option-list .custom-option__main {
  position: relative;
  padding: 2px 2px 2px 16px;
}

.t-autocomplete-option-list .custom-option__main .t-select-option__highlight-item {
  font-weight: 600;
}

.t-autocomplete-option-list .custom-option .description {
  color: var(--td-gray-color-9);
}

.cmp-selector {
  min-width: 400px;
  width: 400px;

  .t-select__data {
    min-width: 300px;
    display: block;
    overflow: auto;
  }
}

.cmp-selector .custom-option {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 6px 6px 0;
  align-items: center;
  // border-bottom: 1px solid #f6f6f6;
}

.cmp-selector .custom-option.actived-option {
  background-color: var(--td-bg-color-container-hover);
  border-radius: 6px;
  color: var(--brand-main);
}

.cmp-selector .custom-option:hover {
  background-color: var(--td-bg-color-container-hover);
  border-radius: 6px;
  color: var(--brand-main);
}

.cmp-selector .custom-option > img {
  max-height: 24px;
  border-radius: 50%;
}

.item-title {
  padding: 0 4px;
  display: flex;
  align-items: center;
  height: 32px;
  align-self: flex-start;
}

.item-title > img {
  max-width: 16px;
  max-height: 16px;
  margin-right: 5px;
}

.data_code {
  font-size: 14px;
  text-decoration: underline;
  color: rgb(70 70 70 / 94%);
  margin-right: 5px;
}

.data_name {
  font-size: 14px;
  font-weight: bold;
}

.data_desc {
  padding: 0 4px;
  font-size: 12px;
  white-space: normal;
  color: var(--td-text-color-secondary);
  align-self: flex-start;
}
</style>
