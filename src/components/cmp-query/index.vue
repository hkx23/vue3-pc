<template>
  <t-loading size="small" :loading="loading" show-overlay style="width: 100%">
    <t-row ref="QueryRef" @keydown.enter="enterCheckHandle">
      <t-col ref="formContentRef" flex="1 1">
        <t-form
          colon
          class="search-form"
          :style="{ height: openSearchForm ? '' : '32px', padding: '0px 0px' }"
          v-bind="$attrs"
          :label-width="0"
          :form="state.form"
          size="default"
          @submit.prevent
        >
          <div ref="formRowRef" style="width: 100%">
            <t-row v-for="(optRow, rowI) in cOpts" :key="rowI" class="item-row" :gutter="[8, 8]">
              <!--  :span="opt.span" -->
              <t-col v-for="(opt, i) in optRow" v-show="!opt.isHide" :key="i" :flex="opt.flex"
                ><t-form-item v-bind="$attrs" :class="[opt.className, { render_label: opt.labelRender }]">
                  <!-- 自定义label -->
                  <template v-if="opt.labelRender" #label>
                    <render-comp :form="state.form" :render="opt.labelRender" />
                  </template>
                  <!-- 自定义输入框插槽 -->
                  <template v-if="opt.slotName">
                    <slot :name="opt.slotName" :param="state.form"></slot>
                  </template>
                  <!-- 日期控件 -->
                  <component
                    :is="opt.comp"
                    v-if="!opt.slotName && opt.comp.includes('date')"
                    v-bind="
                      typeof opt.bind == 'function'
                        ? opt.bind(state.form)
                        : { clearable: true, filterable: true, allowInput: true, ...$attrs, ...opt.bind }
                    "
                    v-model="state.form[opt.dataIndex]"
                    :size="size"
                    :label="opt.label"
                    :placeholder="opt.placeholder || getPlaceholder(opt)"
                    @change="handleEvent(opt.event, state.form[opt.dataIndex])"
                    v-on="cEvent(opt)"
                  >
                    <template #prefixIcon>
                      <span style="width: 100%; padding: 8px 0 8px 8px; text-wrap: nowrap"> {{ opt.label }}</span>
                    </template>
                  </component>
                  <!-- 树选择控件 -->
                  <component
                    :is="opt.comp"
                    v-if="!opt.slotName && opt.comp.includes('tree-select')"
                    v-bind="
                      typeof opt.bind == 'function'
                        ? opt.bind(state.form)
                        : { clearable: true, filterable: true, ...$attrs, ...opt.bind }
                    "
                    v-model="state.form[opt.dataIndex]"
                    :size="size"
                    :label="opt.label"
                    :placeholder="opt.placeholder || getPlaceholder(opt)"
                    @change="handleEvent(opt.event, state.form[opt.dataIndex])"
                    v-on="cEvent(opt)"
                  />
                  <!-- radiobutton组  -->
                  <t-radio-group
                    v-if="!opt.slotName && opt.comp.includes('t-radio-button-group')"
                    v-model="state.form[opt.dataIndex]"
                    variant="default-filled"
                    :size="size"
                    @change="handleEvent(opt.event, state.form[opt.dataIndex])"
                    v-on="cEvent(opt)"
                  >
                    <t-radio-button
                      v-for="optionItem in opt.options"
                      :key="optionItem.value"
                      :value="optionItem.value"
                      >{{ optionItem.label }}</t-radio-button
                    >
                  </t-radio-group>
                  <!-- t-checkbox  -->
                  <t-checkbox
                    v-if="!opt.slotName && opt.comp.includes('t-checkbox') && !opt.comp.includes('t-checkbox-group')"
                    v-model="state.form[opt.dataIndex]"
                    :size="size"
                    @change="handleEvent(opt.event, state.form[opt.dataIndex])"
                    v-on="cEvent(opt)"
                  >
                    {{ opt.label }}
                  </t-checkbox>
                  <!-- 非日期控件与树选择控件 -->
                  <component
                    :is="opt.comp"
                    v-if="
                      !opt.slotName &&
                      !opt.comp.includes('date') &&
                      !opt.comp.includes('tree-select') &&
                      !opt.comp.includes('t-radio-button-group') &&
                      !(opt.comp.includes('t-checkbox') && !opt.comp.includes('t-checkbox-group'))
                    "
                    v-bind="
                      typeof opt.bind == 'function'
                        ? opt.bind(state.form)
                        : { clearable: true, filterable: true, ...$attrs, ...opt.bind }
                    "
                    v-model="state.form[opt.dataIndex]"
                    :size="size"
                    :label="opt.label"
                    :placeholder="opt.placeholder || getPlaceholder(opt)"
                    @change="handleEvent(opt.event, state.form[opt.dataIndex])"
                    v-on="cEvent(opt)"
                  >
                    <component
                      :is="compChildName(opt)"
                      v-for="(value, key, index) in selectListType(opt)"
                      :key="index"
                      :size="size"
                      :disabled="value.disabled"
                      :label="compChildLabel(opt, value)"
                      :value="compChildValue(opt, value, key)"
                      >{{ compChildShowLabel(opt, value) }}</component
                    >
                  </component>
                </t-form-item></t-col
              ></t-row
            >
          </div>
        </t-form>
      </t-col>
    </t-row>
    <div
      v-if="showButton"
      :style="{ width: buttonItemWidth + 'px' }"
      :class="{
        search_form__button: true,
        botton__showlastrow: !(
          totalComLength &&
          (totalComLength == rowItemCount || totalComLength % rowItemCount == 0) &&
          openSearchForm
        ),
        botton__shownextrow:
          totalComLength && (totalComLength == rowItemCount || totalComLength % rowItemCount == 0) && openSearchForm,
      }"
    >
      <t-space direction="horizontal" class="search-space" size="large" style="display: block; float: right">
        <t-space size="small" :align="'end'">
          <t-button :size="size" class="btn_check" :loading="loading" @click="checkHandle">{{
            t('common.button.search')
          }}</t-button>
          <t-button v-if="reset" :size="size" class="btn_reset" theme="default" @click="resetHandle">{{
            t('common.button.reset')
          }}</t-button>
          <slot name="querybar"></slot>
          <t-button v-if="showExpand" :size="size" theme="primary" variant="text" @click="onExpandSwitch">
            {{ openSearchForm ? t('common.button.collapse') : t('common.button.expand') }}
            <template #icon> <t-icon :name="openSearchForm ? 'chevron-up' : 'chevron-down'" /></template
          ></t-button>
        </t-space>
      </t-space>
    </div>
  </t-loading>
</template>

<script setup lang="tsx" name="CmpQuery">
import _ from 'lodash';
import { SizeEnum } from 'tdesign-vue-next';
import {
  computed,
  getCurrentInstance,
  nextTick,
  onBeforeUnmount,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { useLang } from './lang';
import RenderComp from './renderComp.vue';

const { t } = useLang();

const props = defineProps({
  opts: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  showButton: {
    type: Boolean,
    default: true,
  },
  labelWidth: {
    type: String,
    default: '0',
  },
  // 查询按钮配置
  btnCheckBind: {
    type: [Object],
  },
  // 重置按钮配置
  btnResetBind: {
    type: [Object],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  reset: {
    type: Boolean,
    default: true,
  },
  boolEnter: {
    type: Boolean,
    default: true,
  },
  // 是否显示收起和展开
  isShowOpen: {
    type: Boolean,
    default: true,
  },
  // 是否默认展开
  isExpansion: {
    type: Boolean,
    default: false,
  },
  // 是否重置触发查询
  isResetQuery: {
    type: Boolean,
    default: true,
  },
  // 尺寸
  size: {
    type: String as PropType<SizeEnum>,
    default: 'medium',
  },
});
const rowItemCount = ref(1);
// 初始化表单数据
const state = reactive({
  form: Object.keys(props.opts).reduce((acc: any, field: any) => {
    const defaultValue = props.opts[field].defaultVal;

    // 如果 defaultVal 存在并且不是 null，则将其添加到表单对象中
    if (defaultValue !== undefined && defaultValue !== null) {
      acc[field] = defaultValue;
    } else {
      acc[field] = null;
    }
    return acc;
  }, {}),
});
const openSearchForm = ref(false);
const showExpand = ref(true); // 是否展示展开按钮
const formContentRef = ref<any>(null);
const QueryRef = ref<any>(null);
const formRowRef = ref<any>(null);

const slots = ref({});
// 默认展开
if (props.isExpansion) {
  openSearchForm.value = true;
} else {
  openSearchForm.value = false;
}
// 查询按钮配置
// const queryAttrs = computed(() => {
//   return { type: 'primary', size: 'default', ...props.btnCheckBind };
// });
// 重置按钮配置
// const resetAttrs = computed(() => {
//   return { size: 'default', ...props.btnResetBind };
// });
const cOpts = computed(() => {
  // 先按row字段分组
  const result = Object.keys(props.opts).reduce((acc: any, field: any) => {
    const opt = {
      ...props.opts[field],
    };
    // 收起、展开操作
    // if (props.isShowOpen) {
    //   openSearchForm.value = true;
    // }
    if (opt.flex === undefined && opt.comp && opt.comp.includes('range')) {
      opt.comLength = 2;
      opt.flex = `${2 * searchItemtWidth.value}px`;
    } else if (opt.flex === undefined) {
      opt.comLength = 1;
      opt.flex = `${searchItemtWidth.value}px`;
    } else {
      const itemFlexNumber = parseInt(opt.flex.replace('px', ''), 10);
      opt.comLength = Math.floor(itemFlexNumber / searchItemtWidth.value);
    }

    if (opt.span === undefined && opt.comp && opt.comp.includes('range')) {
      opt.span = '6';
    } else if (opt.span === undefined) {
      opt.span = '3';
    }

    if (opt.row === undefined) {
      opt.row = 999;
    }
    opt.dataIndex = field;
    acc[field] = opt;
    return acc;
  }, {});
  const optRows = _.groupBy(result, 'row');
  return optRows;
});
// 引用第三方事件
const cEvent = computed(() => {
  return (opt: any) => {
    const event = { ...opt.eventHandle };
    const changeEvent = {};
    Object.keys(event).forEach((v) => {
      changeEvent[v] = (e) => {
        if (!event[v]) return;

        if (e) event[v](e, state.form);
        else {
          event[v](state.form);
        }
      };
    });
    return { ...changeEvent };
  };
});
// 初始化表单数据
const initForm = (opts: any, keepVal = false) => {
  return Object.keys(opts).reduce((acc, field) => {
    if (keepVal && state.form) {
      acc[field] = state.form[field];
    } else if (opts[field].defaultVal) {
      acc[field] = opts[field].defaultVal;
    } else {
      acc[field] = null;
    }
    return acc;
  }, {});
};
const emits = defineEmits(['handleEvent', 'submit', 'reset', 'change']);
// 重置
const resetHandle = () => {
  state.form = initForm(props.opts);
  emits('reset', _.cloneDeep(state.form));
  if (props.isResetQuery) {
    checkHandle('reset');
  }
};
// 查询条件change事件
const handleEvent = (type, val) => {
  emits('handleEvent', type, val, state.form);
  emits('change', state.form);
};
// 查询
const checkHandle = (flagText: any = false) => {
  emits('submit', _.cloneDeep(state.form), flagText);
};

// 查询
const enterCheckHandle = (flagText: any = false) => {
  if (props.boolEnter) {
    emits('submit', _.cloneDeep(state.form), flagText);
  }
};
// 子组件名称
const compChildName: any = computed(() => {
  return (opt: any) => {
    switch (opt.type) {
      case 'checkbox':
        return 't-checkbox';
      case 'radio':
        return 't-radio';
      case 'select-arr':
      case 'select-obj':
        return 't-option';
      default:
        return 't-input';
    }
  };
});
// 下拉数据
const selectListType = computed(() => {
  return (opt: any) => {
    if (opt.listTypeInfo) {
      return opt.listTypeInfo[opt.list];
    }
    return [];
  };
});
// 子子组件label
const compChildLabel = computed(() => {
  return (opt: any, value) => {
    switch (opt.type) {
      case 'radio':
      case 'checkbox':
        return value.value;
      case 't-select-multiple':
      case 'select-arr':
        return value[opt.arrLabel || 'dictLabel'];
      case 'select-obj':
        return value;
      default:
        return value;
    }
  };
});
// 子子组件value
const compChildValue = computed(() => {
  return (opt: any, value, key) => {
    switch (opt.type) {
      case 'radio':
      case 'checkbox':
        return value.value;
      case 't-select-multiple':
      case 'select-arr':
        return value[opt.arrKey || 'dictValue'];
      case 'select-obj':
        return key;
      default:
        return value;
    }
  };
});
// 子子组件文字展示
const compChildShowLabel = computed(() => {
  return (opt: any, value) => {
    switch (opt.type) {
      case 'radio':
      case 'checkbox':
        return value.label;
      case 't-select-multiple':
      case 'select-arr':
        return value[opt.arrLabel || 'dictLabel'];
      case 'select-obj':
        return value;
      default:
        return value;
    }
  };
});
// placeholder的显示
const getPlaceholder = (row: any) => {
  let placeholder;
  if (row.comp && typeof row.comp === 'string') {
    if (row.comp.includes('input')) {
      placeholder = t('common.placeholder.input', [row.label]);
    } else if (row.comp.includes('select') || row.comp.includes('date')) {
      placeholder = t('common.placeholder.select', [row.label]);
    } else {
      placeholder = row.label;
    }
  }
  return placeholder;
};
onMounted(() => {
  // if (props.boolEnter) {
  //   document.onkeyup = (e) => {
  //     const pagination = document.querySelectorAll('.t-pagination');
  //     let isPaginationInputFocus = false;
  //     if (pagination) {
  //       pagination.forEach((ele) => {
  //         const paginationInputList = ele.getElementsByTagName('input');
  //         const paginationInput = paginationInputList[paginationInputList.length - 1];
  //         // 判断是否有分页器筛选输入框获取焦点
  //         if (paginationInput === document.activeElement) {
  //           isPaginationInputFocus = true;
  //         }
  //       });
  //     }
  //     if (isPaginationInputFocus) {
  //       return;
  //     }
  //     if (e.code === 'Enter') {
  //       checkHandle();
  //     }
  //   };
  // }
});
watch(
  () => props.opts,
  (opts, oldValue) => {
    console.log('query change', opts, oldValue);
    state.form = initForm(opts, true);
    computedTableContentSize();
  },
  { deep: true },
);

// 展开按钮点击事件
const onExpandSwitch = () => {
  openSearchForm.value = !openSearchForm.value;
  // nextTick(() => {
  //   computedTableContentSize();
  // });
};

useResizeObserver(QueryRef, (entries) => {
  const entry = entries[0];
  console.debug(entry);
  debounceFunction();
});
const debounceFunction = _.debounce(() => {
  computedTableContentSize();
}, 100);

const searchItemtWidth = ref(200);

const buttonItemWidth = ref(200);
const totalComLength = ref(0);

const computedExpandBtnVisible = () => {
  nextTick(() => {
    if (totalComLength.value >= rowItemCount.value) {
      showExpand.value = true;
    } else {
      showExpand.value = false;
    }
  });
};

const computedTableContentSize = () => {
  nextTick(() => {
    if (QueryRef.value) {
      let queryBoxCount = 24;
      let targetWidth;
      const { clientWidth } = QueryRef.value.$el;
      // eslint-disable-next-line no-constant-condition
      while (true) {
        targetWidth = Math.floor(clientWidth / queryBoxCount);

        if (targetWidth >= 240 && targetWidth <= 440) {
          rowItemCount.value = queryBoxCount;
          break; // 如果宽度在范围内，则结束循环
        } else {
          queryBoxCount--; // 否则减少一个查询框并继续计算
        }

        // 防止负数或零的情况，如果已经减无可减，则跳出循环（假设至少需要一个查询框）
        if (queryBoxCount <= 0) {
          targetWidth = clientWidth; // 或者给一个默认值
          queryBoxCount = 1;
          break;
        }
      }
      searchItemtWidth.value = targetWidth;

      // 已经算出了一行应该有多少个默认长度的控件了，可以循环检查第一行最后一个控件应该是哪一个
      buttonItemWidth.value = targetWidth;
      let totalComLengthSum = 0;
      let leftSpace = _.cloneDeep(rowItemCount.value);
      let isFirstRowLastProcessing = true;
      for (let i = 0; i < cOpts.value[999].length; i++) {
        const item = cOpts.value[999][i];
        if (item.comLength) {
          totalComLengthSum += item.comLength;
        } else {
          const itemFlexNumber = parseInt(item.flex.replace('px', ''), 10);
          item.comLength = Math.floor(itemFlexNumber / targetWidth);
          totalComLengthSum += item.comLength;
        }

        if (totalComLengthSum === rowItemCount.value && isFirstRowLastProcessing) {
          buttonItemWidth.value = item.comLength * searchItemtWidth.value + 8;
          isFirstRowLastProcessing = false;
        }
        const compareResultCount = totalComLengthSum - rowItemCount.value;
        if (compareResultCount > 0 && isFirstRowLastProcessing) {
          if (cOpts.value[999][i - 1].comLength > 1 && leftSpace > 0) {
            buttonItemWidth.value = (cOpts.value[999][i - 1].comLength + leftSpace) * searchItemtWidth.value + 8;
            isFirstRowLastProcessing = false;
          } else {
            buttonItemWidth.value = cOpts.value[999][i - 1].comLength * searchItemtWidth.value + 8;
            isFirstRowLastProcessing = false;
          }
        }
        leftSpace -= item.comLength;
      }
      totalComLength.value = totalComLengthSum;

      computedExpandBtnVisible();
    }
  });
};
const search = () => {
  checkHandle();
};
const resetSearch = () => {
  resetHandle();
};
onMounted(() => {
  debounceFunction();
  // window.addEventListener('resize', debounceFunction, false);

  const instance = getCurrentInstance();
  slots.value = instance?.slots;
});
onBeforeUnmount(() => {
  // window.removeEventListener('resize', debounceFunction);
});

const setFromValue = (fromKey, fromValue) => {
  state.form[fromKey] = fromValue;
};
const getFromValue = (fromKey) => {
  return state.form[fromKey];
};
const getFromData = () => {
  return state.form;
};
// 暴露方法出去
defineExpose({ state, props, setFromValue, getFromValue, getFromData, search, resetSearch });
</script>

<style lang="less" scoped>
@import './common/index.less';
</style>
