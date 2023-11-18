<template>
  <t-select-table
    v-if="componentType === 'table' && targetIsVisible"
    :value="modelValue"
    :columns="finalColumns"
    :row-key="finalRowKey"
    :select-txt="selectTxt"
    :remote-url="finalUrl"
    :category="finalCategory"
    :multiple="isMultiple"
    :readonly="readonly"
    :title="finalTitle"
    :placeholder="finalPlaceholder"
    :keywords="finalKeywords"
    :table-width="finaltableWidth"
    v-bind="selectAttr"
    @selection-change="onSelectionChange"
  >
  </t-select-table>
</template>

<script setup lang="tsx" name="TSelectBusiness">
import { computed, defineAsyncComponent, onMounted, ref, useAttrs } from 'vue';

const TSelectTable = defineAsyncComponent(() => import('../select-table/index.vue'));
// import TSelectTable from '../select-table/index.vue';

// / 00-组件属性定义
const props = defineProps({
  // 组件展示类型
  componentType: {
    type: [String],
    default: 'table',
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
    default: 'mitem',
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
        label: 'mitemName',
        value: 'mitemCode',
      };
    },
  },
});
// 抛出事件
const emits = defineEmits(['SelectionChange', 'update:modelValue']);
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
const finalKeywords = ref(props.keywords);
const finalCategory = ref(props.category);
const finalParentId = ref(props.parentId);
const finaltableWidth = ref(props.tableWidth);

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
    val.forEach((item: any) => {
      multipleValues.push({
        label: item[finalKeywords.value.label],
        value: item[finalKeywords.value.value],
      });
    });

    emits('update:modelValue', multipleValues);
  }
  // 选择值
  emits('SelectionChange', val, valuKeys);
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
        if (res.rowKey) {
          finalRowKey.value = res.rowKey;
        }
        if (res.placeholder) {
          finalPlaceholder.value = res.placeholder;
        }

        if (res.title) {
          finalTitle.value = res.title;
        }

        if (res.keywords) {
          finalKeywords.value = res.keywords;
        }
        if (res.parentId) {
          finalParentId.value = res.parentId;
        }
        if (res.category) {
          finalCategory.value = res.category;
        }
        if (res.tableWidth) {
          finaltableWidth.value = res.tableWidth;
        }
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
</script>
