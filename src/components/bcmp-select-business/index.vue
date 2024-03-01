<template>
  <bcmp-select-table
    v-if="finalComponentType === 'table' && targetIsVisible"
    :value="modelValue"
    :columns="finalColumns"
    :row-key="finalRowKey"
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
    v-bind="selectAttr"
    @selection-change="onSelectionChange"
  >
  </bcmp-select-table>

  <bcmp-select-list2
    v-if="finalComponentType === 'list2' && targetIsVisible"
    :value="modelValue"
    :columns="finalColumns"
    :row-key="finalRowKey"
    :select-txt="selectTxt"
    :remote-url="finalUrl"
    :category="finalCategory"
    :multiple="isMultiple"
    :parent-id="finalParentId"
    :custom-conditions="finalCustomConditions"
    :readonly="readonly"
    :disabled="disabled"
    :title="finalTitle"
    :placeholder="finalPlaceholder"
    :keywords="finalKeywords"
    :table-width="finaltableWidth"
    :list-setting="finalListSetting"
    v-bind="selectAttr"
    @selection-change="onSelectionChange"
  >
  </bcmp-select-list2>
  <bcmp-select-list
    v-if="finalComponentType === 'list' && targetIsVisible"
    :value="modelValue"
    :columns="finalColumns"
    :row-key="finalRowKey"
    :select-txt="selectTxt"
    :remote-url="finalUrl"
    :category="finalCategory"
    :multiple="isMultiple"
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
    v-bind="selectAttr"
    @selection-change="onSelectionChange"
  >
  </bcmp-select-list>
</template>

<script setup lang="tsx" name="BcmpSelectBusiness">
import { computed, defineAsyncComponent, onMounted, ref, useAttrs, watch } from 'vue';

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
const finalCustomConditions = ref(props.customConditions);

const onSelectionChange = (val: any, valuKeys: any) => {
  if (!props.isMultiple) {
    emits('update:modelValue', val[finalKeywords.value.value]);
  } else {
    // 拼装成以下格式的数据
    //     const value = ref([
    //   { label: 'Vue', value: 1 },
    //   { label: 'React', value: 2 },
    //   { label: 'Miniprogram', value: 3 },
    // ]);
    const multipleValues: { label: any; value: any }[] = [];
    if (val && val.length > 0) {
      val.forEach((item: any) => {
        multipleValues.push({
          label: item[finalKeywords.value.label],
          value: item[finalKeywords.value.value],
        });
      });
    }

    emits('update:modelValue', multipleValues);
  }
  // 选择值
  emits('SelectionChange', val, valuKeys);
  // 选择值
  emits('change', valuKeys);
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
        if (res.componentType) {
          if (!finaltableWidth.value) {
            finaltableWidth.value = res.tableWidth;
          }
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
        if (res.tableWidth) {
          if (!finaltableWidth.value) {
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
      })
      .catch((err) => {
        // 请求失败数据
        console.log(err);
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
  (val) => {
    console.log(val);
    loadTypeSetting();
  },
  { deep: true },
);
</script>
