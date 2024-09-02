<template>
  <bcmp-select-table
    v-if="finalComponentType === 'table' && targetIsVisible"
    :value="modelValue"
    :columns="finalColumns"
    :row-key="finalRowKey"
    :size="size"
    :select-txt="selectTxt"
    :remote-url="finalUrl"
    :category="finalCategory"
    :multiple="isMultiple"
    :parent-id="finalParentId"
    :readonly="readonly"
    :disabled="disabled"
    :title="finalTitle"
    :placeholder="finalPlaceholder"
    :custom-conditions="finalCustomConditions"
    :keywords="finalKeywords"
    :table-width="finaltableWidth"
    :dynamic-table-name="finalDynamicTabelName"
    :dynamic-business-domain="finalDynamicBusinessDomain"
    :dynamic-keyword-fields="finalDynamicKeywordFields"
    :dynamic-default-sort-filed="finalDynamicDefaultSortFiled"
    :query-setting="finalQuerySetting"
    :bottom-query-setting="finalBottomQuerySetting"
    :auto-select="autoSelect"
    v-bind="selectAttr"
    @selection-change="onSelectionChange"
  >
  </bcmp-select-table>

  <bcmp-select-list2
    v-if="finalComponentType === 'list2' && targetIsVisible"
    :value="modelValue"
    :size="size"
    :columns="finalColumns"
    :row-key="finalRowKey"
    :select-txt="selectTxt"
    :remote-url="finalUrl"
    :category="finalCategory"
    :multiple="finalMultiple"
    :parent-id="finalParentId"
    :custom-conditions="finalCustomConditions"
    :readonly="readonly"
    :disabled="disabled"
    :title="finalTitle"
    :placeholder="finalPlaceholder"
    :keywords="finalKeywords"
    :table-width="finaltableWidth"
    :list-setting="finalListSetting"
    :auto-width="autoWidth"
    :dynamic-table-name="finalDynamicTabelName"
    :dynamic-business-domain="finalDynamicBusinessDomain"
    :dynamic-keyword-fields="finalDynamicKeywordFields"
    :dynamic-default-sort-filed="finalDynamicDefaultSortFiled"
    :auto-select="autoSelect"
    v-bind="selectAttr"
    @selection-change="onSelectionChange"
  >
  </bcmp-select-list2>
  <bcmp-select-list
    v-if="finalComponentType === 'list' && targetIsVisible"
    :value="modelValue"
    :size="size"
    :columns="finalColumns"
    :row-key="finalRowKey"
    :select-txt="selectTxt"
    :remote-url="finalUrl"
    :category="finalCategory"
    :multiple="finalMultiple"
    :parent-id="finalParentId"
    :custom-conditions="finalCustomConditions"
    :disabled="disabled"
    :readonly="readonly"
    :title="finalTitle"
    :name="finalName"
    :placeholder="finalPlaceholder"
    :keywords="finalKeywords"
    :table-width="finaltableWidth"
    :list-setting="finalListSetting"
    :auto-width="autoWidth"
    :dynamic-table-name="finalDynamicTabelName"
    :dynamic-business-domain="finalDynamicBusinessDomain"
    :dynamic-keyword-fields="finalDynamicKeywordFields"
    :dynamic-default-sort-filed="finalDynamicDefaultSortFiled"
    :auto-select="autoSelect"
    v-bind="selectAttr"
    @selection-change="onSelectionChange"
  >
  </bcmp-select-list>
</template>

<script setup lang="tsx" name="BcmpSelectBusiness">
import { SizeEnum } from 'tdesign-vue-next';
import { computed, defineAsyncComponent, onMounted, PropType, ref, useAttrs, watch } from 'vue';

const BcmpSelectTable = defineAsyncComponent(() => import('../bcmp-select-table/index.vue'));
// import TSelectTable from '../select-table/index.vue';

// / 00-组件属性定义
const props = defineProps({
  // 组件展示类型
  componentType: {
    type: [String],
    default: '',
  },
  // 分类参数
  category: {
    type: [String],
    default: '',
  },
  // 父ID
  parentId: {
    type: [String],
    default: '',
  },
  // 控件选择值
  modelValue: [String, Array],
  // 业务类型
  type: {
    type: String,
    default: '',
  },
  // 尺寸
  size: {
    type: String as PropType<SizeEnum>,
    default: 'medium',
  },
  // 占位字符
  placeholder: {
    type: String,
    default: '',
  },
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 标题2
  label: {
    type: String,
    default: '',
  },
  // 加载
  loading: {
    type: Boolean,
    default: false,
  },
  // 名称（用于列表展示）
  name: {
    type: String,
    default: '',
  },
  // 是否显示标题
  showTitle: {
    type: Boolean,
    default: true,
  },
  // 远程URL
  remoteUrl: {
    type: String,
    default: '',
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否多选
  isMultiple: {
    type: Boolean,
    default: false,
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // 组件宽度
  inputWidth: {
    type: String,
    default: () => {
      return 'auto';
    },
  },
  // 值字段
  valueField: {
    type: String,
    default: () => {
      return '';
    },
  },
  // 显示字段
  labelField: {
    type: String,
    default: () => {
      return '';
    },
  },
  // 业务组件父值
  parentValue: {
    type: String,
    default: () => {
      return '';
    },
  },
  // 可清
  clearable: {
    type: Boolean,
    default: true,
  },
  // 默认查询值
  defaultQueryValue: {
    type: Object,
    default: null,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  // 单选或多选文案
  selectTxt: {
    type: String,
    default: '选择',
  },
  // 表头数据
  columns: {
    type: Array as unknown as any[],
    default: () => [],
  },
  // 自定义查询条件-数组
  // 数组里面的元素例子
  // {
  //     field: 'key',
  //     operator: 'EQ',
  //     value: 'value',
  //   }
  customConditions: {
    type: Array,
    default: () => {
      return [];
    },
  },
  // table宽度
  tableWidth: {
    type: Number,
    default: 500,
  },
  // 下拉数据指向的label/value
  keywords: {
    type: Object,
    default: () => {
      return {
        label: '',
        value: '',
      };
    },
  },
  // 下拉框指定的图标，名称，描述
  listSetting: {
    type: Object,
    default: () => {
      return {
        icon: 'building-1',
        nameField: 'orgName',
        codeField: 'orgCode',
        descField: 'orgDesc',
      };
    },
  },
  changeFunc: {
    type: Function,
    default: null,
  },
  autoWidth: {
    type: Boolean,
    default: false,
  },
  autoSelect: {
    type: Boolean,
    default: false,
  },
});
// 抛出事件
const emits = defineEmits(['SelectionChange', 'change', 'update:modelValue']);
// 选择下拉属性集成
const selectAttr = computed(() => {
  return {
    clearable: true,
    ...useAttrs(),
  };
});
const targetIsVisible = computed(() => {
  return !!finalUrl.value;
});
const finalUrl = ref(props.remoteUrl);
const finalColumns = ref(props.columns);
const finalRowKey = ref(props.rowKey);
const finalPlaceholder = ref(props.placeholder);
const finalTitle = ref(props.title);
const finalName = ref(props.name);
const finalKeywords = ref(props.keywords);
const finalCategory = ref(props.category);
const finalParentId = ref(props.parentId);
const finaltableWidth = ref(props.tableWidth);
const finalComponentType = ref(props.componentType);
const finalListSetting = ref(props.listSetting);
const finalCustomConditions = ref(null);
const finalMultiple = ref(props.isMultiple || props.multiple);
const finalQuerySetting = ref(null);
const finalBottomQuerySetting = ref(null);
// 动态查询接口用到的参数
const finalDynamicTabelName = ref(null); // 表名
const finalDynamicBusinessDomain = ref(null); // 业务领域
const finalDynamicKeywordFields = ref(null); // 模糊查询的关键字字段
const finalDynamicDefaultSortFiled = ref(null); // 默认排序字段
const onSelectionChange = (val: any, valuKeys: any) => {
  if (!finalMultiple.value) {
    emits('update:modelValue', val[finalKeywords.value.value]);
  } else {
    const multipleValues: { label: any; value: any }[] = [];
    if (val && val.length > 0) {
      val.forEach((item: any) => {
        multipleValues.push({
          label: item[finalKeywords.value.label],
          value: item[finalKeywords.value.value],
        });
      });
    }
    if (finalComponentType.value === 'list' || finalComponentType.value === 'list2') {
      emits('update:modelValue', valuKeys.join(','));
    } else {
      emits('update:modelValue', multipleValues);
    }
  }
  // 选择值
  emits('SelectionChange', val, valuKeys);
  // 选择值
  emits('change', valuKeys);
  if (props.changeFunc) {
    props.changeFunc(val);
  }
};

const loadTypeSetting = () => {
  // 加载业务类型配置
  if (props.type !== '') {
    const jsonAdd = `/business/types/${props.type}.json`;
    fetch(jsonAdd)
      .then((res) => res.json())
      .then((res) => {
        // 成功数据
        const columnsData = res.columns;
        columnsData.forEach((item: { colKey: any; key: any }) => {
          item.colKey = item.key;
        });
        finalColumns.value = columnsData;
        // 如过组件类型为空，则读取res的配置
        if (!props.componentType) {
          if (res.componentType) {
            finalComponentType.value = res.componentType;
          } else {
            finalComponentType.value = 'table';
          }
        } else {
          finalComponentType.value = props.componentType;
        }
        if (res.listSetting) {
          finalListSetting.value = res.listSetting;
        }

        if (res.rowKey) {
          if (!finalRowKey.value) {
            finalRowKey.value = res.rowKey;
          }
        }
        if (res.placeholder) {
          if (!finalPlaceholder.value) {
            finalPlaceholder.value = res.placeholder;
          }
        }

        if (res.title && props.showTitle) {
          if (!finalTitle.value) {
            finalTitle.value = res.title;
          }
        }
        if (res.keywords) {
          finalKeywords.value = res.keywords;
        }
        if (res.parentId) {
          if (!finalParentId.value) {
            finalParentId.value = res.parentId;
          }
        }
        if (res.category) {
          if (!finalCategory.value) {
            finalCategory.value = res.category;
          }
        }
        // console.error(res.tableWidth);
        if (res.tableWidth) {
          if (finaltableWidth.value === 500) {
            finaltableWidth.value = res.tableWidth;
          }
        }
        // 如果值字段不为空
        if (props.valueField) {
          finalKeywords.value.value = props.valueField;
        }
        // 如果label字段不为空
        if (props.labelField) {
          finalKeywords.value.label = props.labelField;
        }

        if (!finalName.value) {
          finalName.value = res.name;
        }
        finalRowKey.value = finalKeywords.value.value;
        finalUrl.value = res.url;

        if (res.querySetting) {
          if (!finalQuerySetting.value) {
            finalQuerySetting.value = res.querySetting;
          }
        }

        if (res.bottomQuerySetting) {
          if (!finalBottomQuerySetting.value) {
            finalBottomQuerySetting.value = res.bottomQuerySetting;
          }
        }

        if (props.customConditions && props.customConditions.length > 0) {
          finalCustomConditions.value = props.customConditions;
        } else if (res && res.customConditions) {
          finalCustomConditions.value = res.customConditions;
        }

        // 动态查询接口用到的参数
        if (res.dynamicTableName) {
          if (!finalDynamicTabelName.value) {
            finalDynamicTabelName.value = res.dynamicTableName;
          }
        }
        if (res.dynamicBusinessDomain) {
          if (!finalDynamicBusinessDomain.value) {
            finalDynamicBusinessDomain.value = res.dynamicBusinessDomain;
          }
        }
        if (res.dynamicKeywordFields) {
          if (!finalDynamicKeywordFields.value) {
            finalDynamicKeywordFields.value = res.dynamicKeywordFields;
          }
        }
        if (res.dynamicDefaultSortFiled) {
          if (!finalDynamicDefaultSortFiled.value) {
            finalDynamicDefaultSortFiled.value = res.dynamicDefaultSortFiled;
          }
        }
      })
      .catch((_err) => {
        // 请求失败数据
        // console.log(err);
      });
  }
};
// 初始化远程数据
onMounted(() => {
  if (props.type) {
    loadTypeSetting();
  }
});
watch(
  () => props.parentId,
  (val) => {
    finalParentId.value = val;
  },
  { deep: true },
);
watch(
  () => props.customConditions,
  (val) => {
    finalCustomConditions.value = val;
  },
  { deep: true },
);
watch(
  () => props.type,
  (_val) => {
    // console.log(_val);
    loadTypeSetting();
  },
  { deep: true },
);
</script>
