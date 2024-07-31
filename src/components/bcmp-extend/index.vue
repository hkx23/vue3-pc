<template>
  <t-form ref="extendForm" :data="formModel" :rules="rules" @validate="onValidate">
    <t-tabs v-model="activeCategory" type="card">
      <slot name="customPanel"></slot>
      <t-tab-panel
        v-for="(category, index) in categoryList"
        :key="index"
        :value="category"
        :label="category"
        :destroy-on-hide="false"
      >
        <div style="padding: 8px 24px 48px">
          <t-form-item
            v-for="(formItem, itemIndex) in itemGroupList[category]"
            :key="itemIndex"
            :label="formItem.displayName"
            :name="formItem.id"
            :label-width="130"
          >
            <t-space v-if="formItem.ControlType == 'NumberInput'" class="input-fixed-width-200">
              <t-input-number v-model="formModel[formItem.id]" theme="column" class="input-fixed-width-200" />
            </t-space>
            <t-space v-if="formItem.ControlType == 'Input'" class="input-fixed-width-200">
              <t-input v-model="formModel[formItem.id]"></t-input>
            </t-space>
            <t-space v-if="formItem.ControlType == 'DatetPicker'" class="input-fixed-width-200">
              <t-date-picker
                v-model="formModel[formItem.id]"
                class="input-fixed-width-200"
                enable-time-picker
                allow-input
                clearable
                format="YYYY-MM-DD hh:mm:ss"
              />
            </t-space>
            <t-space v-if="formItem.ControlType == 'Select'" class="input-fixed-width-200">
              <t-select
                v-model="formModel[formItem.id]"
                filterable
                :options="formItem.dataSourceOptions"
                clearable
                :multiple="formItem.isDataMultiple == 1"
              >
              </t-select>
            </t-space>

            <t-space v-if="formItem.ControlType == 'Business'" class="input-fixed-width-200">
              <bcmp-select-business
                v-model="formModel[formItem.id]"
                :type="formItem.dataSourcePath"
                :show-title="false"
                :is-multiple="formItem.isDataMultiple == 1"
              ></bcmp-select-business>
            </t-space>

            <t-space v-if="formItem.isMultiple == 1 && false" class="btn-space">
              <t-button variant="dashed" @click="addItem">
                <t-icon name="add" />
              </t-button>
              <t-button variant="dashed" @click="removeItem(formItem, index)">
                <t-icon name="remove" />
              </t-button>
            </t-space>
          </t-form-item>
        </div>
      </t-tab-panel>
    </t-tabs>
  </t-form>
</template>

<script setup lang="tsx" name="BcmpExtend">
import _ from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';

import { api } from '@/api/main';

const props = defineProps({
  objectCode: {
    type: String,
    default: '',
  },
  propertyCode: {
    type: String,
  },
  // 对象ID
  objectId: {
    type: String,
  },
  defaultValue: {
    type: String,
    default: null,
  },
});
const extendForm = ref(null);
const itemGroupList = ref({});
const categoryList = ref([]);
const formModel = ref({});
const activeCategory = ref();
const rules = ref({});

// 获取控件类型
const getControlType = (valueType, datasource) => {
  if (datasource === 'PARAM') {
    return 'Select';
  }
  if (datasource === 'SERVICE') {
    return 'Business';
  }
  switch (valueType) {
    case 'INT':
      return 'NumberInput';
    case 'DATETIME':
      return 'DatetPicker';
    default:
      return 'Input';
  }
};

// 初始化系统字典工单类型
const initSelectData = async (groupCode) => {
  try {
    const res = (await api.param.getListByGroupCode({
      parmGroupCode: groupCode,
    })) as any;
    return res;
  } catch (e) {
    console.log('cus', e);
    return [];
  }
};
const onValidate = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    console.log('Validate Success');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
  }
};
const addItem = () => {
  // console.log('add');
  // const addNum = lastAddItem.value;
  // INITIAL_DATA[`add${addNum}`] = '';
  // addlist.value.push({ id: addNum, name: `add${addNum}` });
  // lastAddItem.value += 1;
};
const removeItem = (item, index) => {
  console.log(item, index);
  // console.log('remove');
  // delete INITIAL_DATA[`add${item.id}`];
  // addlist.value.splice(index, 1);
};

const resolveData = (model) => {
  // 对数据集进行加工处理，暂不需
  return model;
};
const getComponentData = async (isNeedValidate) => {
  const result = { success: false, data: [] };
  if (isNeedValidate === true || isNeedValidate === undefined) {
    if (extendForm.value) {
      // 校验数据：只提交和校验，不在表单中显示错误文本信息。下方代码有效，勿删
      await extendForm.value.validate({ showErrorMessage: false }).then((validateResult) => {
        if (validateResult && Object.keys(validateResult).length) {
          const firstError = Object.values(validateResult)[0]?.[0]?.message;
          MessagePlugin.warning(firstError);
          return result;
        }
        result.data = resolveData(formModel.value);
        result.success = true;
        return result;
      });
    }
  } else {
    result.success = true;
    return result;
  }
  return result;
};
// 初始化扩展属性数据
const initFormSetting = async () => {
  try {
    // 获取原始数据
    const res = (await api.objectProperty.getObjectValueList({
      objectCode: props.objectCode,
      propertyCode: props.propertyCode,
      objectId: props.objectId,
    })) as any;
    // 根据属性分类分组
    itemGroupList.value = _.groupBy(res, 'categoryName');
    // 获取分类列表并设置第一项为选中tab
    categoryList.value = Object.keys(itemGroupList.value);
    if (props.defaultValue) {
      activeCategory.value = props.defaultValue;
    } else if (categoryList.value.length > 0) {
      [activeCategory.value] = categoryList.value;
    }
    // 分组后itemGroupList对每一条数据进行处理
    for (const category in itemGroupList.value) {
      for (let i = 0; i < itemGroupList.value[category].length; i++) {
        // 获取原数据
        const item = itemGroupList.value[category][i];
        // 针对item.propertyValueType,dateSource，dateSourcePath等字段，进行数据处理
        item.ControlType = getControlType(item.propertyValueType, item.dataSource);
        if (item.ControlType === 'Select' && item.dataSourcePath) {
          initSelectData(item.dataSourcePath).then((result) => {
            item.dataSourceOptions = result;
          });
        }
        // 给表单添加校验信息

        const itemValidRules = [];
        if (item.isRequire === 1) {
          if (item.ControlType === 'Business' && item.isDataMultiple === 1) {
            itemValidRules.push({ required: true, message: `${item.displayName}必填`, event: 'change' });
          } else {
            itemValidRules.push({ required: true, message: `${item.displayName}必填` });
          }
        }
        if (item.needValidation === 1 && item.validExpression) {
          const pattern = new RegExp(item.validExpression.slice(1, -1)); // 注意这里的slice操作去掉了字符串正则表达式的开头和结尾的斜杠
          itemValidRules.push({
            pattern,
            message: '规则校验不通过',
          });
        }
        rules.value[item.id] = itemValidRules;
        // 给表单设置默认值
        if (item.propertyValue === undefined || item.propertyValue === null) {
          if (item.isDataMultiple === 1) {
            item.propertyValue = [];
          } else {
            item.propertyValue = '';
          }
        }
        formModel.value[item.id] = item.propertyValue;
      }
    }
  } catch (e) {
    console.log(e);
    MessagePlugin.error('加载扩展属性失败');
  }
};
// 挂载
onMounted(() => {
  initFormSetting();
});
watch(
  () => props.objectId,
  () => {
    initFormSetting();
  },
);

defineExpose({ getComponentData, initFormSetting });
</script>

<style lang="less" scoped>
@import './common/index.less';
</style>
