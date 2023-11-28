<template>
  <t-form ref="form" :data="formModel" :rules="rules" @validate="onValidate">
    <t-tabs v-model="activeCategory" type="card">
      <t-tab-panel
        v-for="(category, index) in categoryList"
        :key="index"
        :value="category"
        :label="category"
        :destroy-on-hide="false"
      >
        <div style="padding: 8px 24px">
          <t-form-item
            v-for="(formItem, itemIndex) in itemGroupList[category]"
            :key="itemIndex"
            :label="formItem.displayName"
            :name="formItem.propertyCode"
            :label-width="130"
          >
            <t-input-number v-if="formItem.ControlType == 'NumberInput'" v-model="formModel[formItem.propertyCode]" />
            <t-input v-if="formItem.ControlType == 'Input'" v-model="formModel[formItem.propertyCode]"></t-input>
            <t-date-picker
              v-if="formItem.ControlType == 'DatetPicker'"
              v-model="formModel[formItem.propertyCode]"
              enable-time-picker
              allow-input
              clearable
              format="YYYY-MM-DD hh:mm:ss"
            />
            <t-select
              v-if="formItem.ControlType == 'Select'"
              v-model="formModel[formItem.propertyCode]"
              filterable
              :options="formItem.dataSourceOptions"
              clearable
              :multiple="formItem.isDataMultiple == 1"
            >
            </t-select>
            <tm-select-business
              v-if="formItem.ControlType == 'Business'"
              v-model="formModel[formItem.propertyCode]"
              :type="formItem.dataSourcePath"
              :show-title="false"
              :multiple="formItem.isDataMultiple == 1"
            ></tm-select-business>
          </t-form-item>
        </div>
      </t-tab-panel>
    </t-tabs>
  </t-form>
</template>

<script setup lang="tsx" name="TmExtend">
import _ from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';

const props = defineProps({
  objectCode: {
    type: String,
    default: 'org',
  },
  propertyCode: {
    type: String,
  },
  // 对象ID
  objectId: {
    type: String,
  },
});
const itemGroupList = ref({});
const categoryList = ref([]);
const formModel = ref({});
const activeCategory = ref(1);
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
    itemGroupList.value = _.groupBy(res, 'categoryCode');
    // 获取分类列表并设置第一项为选中tab
    categoryList.value = Object.keys(itemGroupList.value);
    if (categoryList.value.length > 0) {
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

        if (item.isRequire === 1) {
          rules.value[item.propertyCode] = [{ required: true, message: `${item.displayName}必填`, trigger: 'change' }];
        }
        // 给表单设置默认值
        if (item.propertyValue === undefined || item.propertyValue === null) {
          item.propertyValue = '';
        }
        formModel.value[item.propertyCode] = item.propertyValue;
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
</script>

<style lang="less" scoped>
@import './common/index.less';
</style>
