<template>
  <t-form
    ref="formRef"
    :loading="loading"
    :rules="currentFormRules"
    :data="currentFormData"
    :label-width="labelWidth"
    scroll-to-first-error="smooth"
    label-align="right"
  >
    <t-row :gutter="12">
      <t-col v-for="(formItem, index) in currentFormSetting" :key="index" :span="formSpan" style="padding: 8px 0">
        <t-form-item :label="formItem.label" :name="formItem.field">
          <t-input
            v-if="formItem.component === 't-input'"
            v-model="currentFormData[formItem.field]"
            :disabled="formItem.isDisabled"
            @change="handleChange"
          />

          <t-input-number
            v-if="formItem.component === 't-input-number'"
            v-model="currentFormData[formItem.field]"
            :disabled="formItem.isDisabled"
            theme="column"
            @change="handleChange"
          />
          <t-switch
            v-if="formItem.component === 't-switch'"
            v-model="currentFormData[formItem.field]"
            :disabled="formItem.isDisabled"
            @change="handleChange"
          />
          <bcmp-select-business
            v-if="formItem.component === 'bcmp-select-business'"
            v-model="currentFormData[formItem.field]"
            :type="formItem.componentParam"
            :disabled="formItem.isDisabled"
            :show-title="false"
            @change="handleChange"
          ></bcmp-select-business>
          <bcmp-select-param
            v-if="formItem.component === 'bcmp-select-param'"
            v-model="currentFormData[formItem.field]"
            :disabled="formItem.isDisabled"
            :param-group="formItem.componentParam"
            @change="handleChange"
          ></bcmp-select-param>
          <t-select
            v-if="formItem.component === 't-select'"
            v-model="currentFormData[formItem.field]"
            :disabled="formItem.isDisabled"
            :options="formItem.options"
            :multiple="formItem.isMutiple"
            @change="handleChange"
          >
          </t-select>
          <t-date-picker
            v-if="formItem.component === 't-date-picker'"
            v-model="currentFormData[formItem.field]"
            allow-input
            clearable
            format="YYYY-MM-DD"
            :disabled="formItem.isDisabled"
            @change="handleChange"
          ></t-date-picker>
          <t-date-picker
            v-if="formItem.component === 't-datetime-picker'"
            v-model="currentFormData[formItem.field]"
            enable-time-picker
            allow-input
            clearable
            format="YYYY-MM-DD HH:mm:ss"
            :disabled="formItem.isDisabled"
            @change="handleChange"
          ></t-date-picker>

          <t-checkbox-group
            v-if="formItem.component === 't-checkbox-group'"
            v-model="currentFormData[formItem.field]"
            :disabled="formItem.isDisabled"
            :options="formItem.options"
            @change="handleChange"
          >
          </t-checkbox-group>
          <t-radio-group
            v-if="formItem.component === 't-radio-group'"
            v-model="currentFormData[formItem.field]"
            :disabled="formItem.isDisabled"
            :options="formItem.options"
            @change="handleChange"
          >
          </t-radio-group>
          <t-textarea
            v-if="formItem.component === 't-textarea'"
            v-model="currentFormData[formItem.field]"
            :disabled="formItem.isDisabled"
            :options="formItem.options"
            @change="handleChange"
          >
          </t-textarea>
        </t-form-item>
      </t-col>
    </t-row>
  </t-form>
</template>

<script setup lang="tsx" name="BcmpDynamicForm">
import { cloneDeep } from 'lodash';
import { Data, FormRules } from 'tdesign-vue-next';
import { computed, defineProps, onMounted, ref, watch } from 'vue';

import { useLoading } from '@/hooks/modules/loading';
import common from '@/utils/common';

const { loading } = useLoading();
// import TSelectTable from '../select-table/index.vue';

// / 00-组件属性定义
const props = defineProps({
  // 组件展示类型
  formSetting: {
    type: [Object],
    default: null,
  },
  formData: {
    type: [Object],
    default: null,
  },
  actionType: {
    type: [String],
    default: 'add',
  },
  lowerCamel: {
    type: [Boolean],
    default: false,
  },
  labelWidth: {
    type: [String],
    default: '120px',
  },
});
// 初始加载参数
const currentFormAction = ref('edit');
const currentFullFormSetting = ref({});
const currentFormSetting = ref([] as any);
const currentFormData = ref({});
const currentFormRules = ref<FormRules<Data>>({});

const loadFormValue = () => {
  const formValue = cloneDeep(props.formData);
  // 循环匹配表单数据,针对特殊的字段类型或组件进行特殊处理
  currentFormSetting.value.forEach(async (column) => {
    column.field = column.field.toUpperCase();
    if (props.lowerCamel) {
      column.field = common.toLowerCamelCase(column.field);
    }

    // 加上默认值逻辑 column.defaultValue
    switch (column.component) {
      case 't-input':
        formValue[column.field] = formValue[column.field] || column.defaultValue || '';
        break;
      case 't-select':
      case 't-radio-group':
      case 't-checkbox-group':
        if (column.isMutiple) {
          const preValue = formValue[column.field] ? formValue[column.field].split(',') : [];
          formValue[column.field] = preValue || column.defaultValue?.split(',');
        } else {
          formValue[column.field] = formValue[column.field]?.toString() ?? column.defaultValue ?? '';
        }
        break;
      case 't-date-picker':
        formValue[column.field] = formValue[column.field] ?? column.defaultValue ?? '';
        break;
      case 't-switch':
        if (formValue[column.field] === undefined) {
          formValue[column.field] = column.defaultValue;
        }
        formValue[column.field] = convertToBoolean(formValue[column.field]);
        break;
      default:
        formValue[column.field] = formValue[column.field] || column.defaultValue || '';
        break;
    }
  });

  // 设置表单数据
  currentFormData.value = formValue;
};
const loadFormSetting = async () => {
  const sourceComponents = ['t-select', 't-radio-group', 't-checkbox-group'];
  let formRulesObject: any = {};
  // 开始处理逻辑
  if (props.actionType === 'edit') {
    currentFormAction.value = 'edit';
  } else {
    currentFormAction.value = 'add';
  }
  // 加载当前按钮动作对应的表单配置
  currentFullFormSetting.value = props.formSetting;
  if (props.formSetting.formColumnSetting === undefined) {
    return;
  }

  currentFormSetting.value = props.formSetting.formColumnSetting.filter((column) => column.isVisible);

  // 循环匹配表单数据,针对特殊的字段类型或组件进行特殊处理
  currentFormSetting.value.forEach(async (column) => {
    if (props.lowerCamel) {
      column.field = common.toLowerCamelCase(column.field);
    }
    let optionsData = [];

    // 获取下拉选项数据
    if (sourceComponents.includes(column.component) && column.componentSource?.sourceType === 'dataTable') {
      const postSetting = column.componentSource.dataTable;
      const { mapBusinessDomain } = postSetting;
      const postUrl = `/api/${mapBusinessDomain.toLowerCase()}/dynamicManage/dynamicQueryDropdownListSql`;

      try {
        const res = await http.post<any>(postUrl, postSetting);
        const { list } = res;
        optionsData = list;
      } catch (error) {
        console.error('Error fetching data:', error);
        // 处理错误情况
      }
    }
    // 加上默认值逻辑 column.defaultValue
    switch (column.component) {
      case 't-select':
      case 't-radio-group':
      case 't-checkbox-group':
        if (column.componentSource) {
          switch (column.componentSource.sourceType) {
            case 'customDict':
              optionsData = column.componentSource.customDict.dicData;
              break;
            default:
              break;
          }
        }
        column.options = optionsData;
        break;
      default:
        break;
    }
  });

  // 生成验证规则
  currentFormRules.value = {};
  formRulesObject = {};
  currentFormSetting.value
    .filter((column) => column.isRequired)
    .forEach((column) => {
      formRulesObject[column.field] = [
        {
          required: true,
          message: `${column.label} 是必填项`, // 假设column.label存在且表示字段的标签名称
          type: 'error',
          trigger: 'blur', // 触发验证的时机，这里设置为失去焦点时
        },
      ];
    });
  currentFormRules.value = formRulesObject;
};

const convertToBoolean = (value) => {
  // 将值转换为小写字符串，以便进行比较
  const lowerCaseValue = value.toString().toLowerCase();

  // 检查值是否为 "1"、"true" 或数字 1
  if (lowerCaseValue === '1' || lowerCaseValue === 'true' || value === 1) {
    return true;
  }

  // 如果不是上述情况，则返回 false
  return false;
};
// 初始化远程数据
onMounted(() => {
  loadFormSetting();
  loadFormValue();
});
watch(
  () => props.formSetting,
  () => {
    loadFormSetting();
  },
  { deep: true },
);
watch(
  () => props.formData,
  () => {
    loadFormValue();
  },
  { deep: true },
);
const emits = defineEmits(['change']);
// 查询条件change事件
const handleChange = () => {
  emits('change', currentFormData.value);
};
const formSpan = computed(() => {
  if (currentFormSetting.value.length < 6) {
    return 12;
  }
  if (currentFormSetting.value.length >= 6 && currentFormSetting.value.length < 16) {
    return 6;
  }
  return 4;
});
const formRef = ref(null);
const handleSubmit = () => {
  // 提交表单
  return formRef.value.validate();
};
const getFormData = () => {
  // 提交表单
  return currentFormData.value;
};
const setFormData = (formData) => {
  // 提交表单
  currentFormData.value = cloneDeep(formData);
};
// 暴露方法出去
defineExpose({ handleSubmit, getFormData, setFormData });
</script>
<style lang="less" scoped>
:deep(.t-form__controls-content) {
  .t-date-picker,
  .t-input-number,
  .t-color-picker__trigger {
    width: 100%;
  }
}
</style>
