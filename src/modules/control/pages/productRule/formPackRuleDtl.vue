<template>
  <t-form
    ref="formRef"
    class="form-pack-rule-dtl"
    :rules="FORM_RULES"
    :data="formData"
    :show-cancel="true"
    :show-error-message="false"
  >
    <t-form-item :label="t('productRule.parentLevelName')" name="parentLevelId">
      {{ parentName }}
    </t-form-item>
    <t-form-item :label="t('productRule.packType')" name="packType">
      <t-select
        v-model="formData.packType"
        :auto-width="false"
        :placeholder="t('common.placeholder.select', [t('productRule.packType')])"
        :options="selectOptions"
        :disabled="!isAdd"
        clearable
      >
      </t-select>
    </t-form-item>
    <t-form-item :label="t('productRule.packQty')" name="packQty">
      <t-input-number
        v-model="formData.packQty"
        :disabled="isFirstNode"
        :decimal-places="0"
        :placeholder="t('common.placeholder.input', [t('productRule.packQty')])"
        :auto-width="false"
        theme="column"
      ></t-input-number>
    </t-form-item>
    <t-form-item :label="t('productRule.uom')" name="uom">
      <tm-select-business v-model="formData.uom" value-field="uom" type="uom" :show-title="false"></tm-select-business>
    </t-form-item>
  </t-form>
</template>
<script lang="ts">
export default {
  name: 'FormPackRule',
};
</script>
<script setup lang="ts">
import { FormInstanceFunctions, MessagePlugin } from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

import { api as apiControl, ProductPackRuleDtl } from '@/api/control';
import { api as apimain } from '@/api/main';

import { useLang } from './lang';

// 子修改传值
const props = defineProps({
  // 组件展示类型
  row: {
    type: Object,
    default: null,
  },
  isAdd: {
    type: Boolean,
    default: true,
  },
});
const { t } = useLang();
// 下拉初始数据
const selectOptions = ref([]);
const parentName = ref('');
// 是否第一节点
const isFirstNode = ref(false);
const formRef: Ref<FormInstanceFunctions> = ref(null);
const FORM_RULES = {
  packType: [{ required: true, message: t('common.placeholder.input', [t('productRule.packType')]) }],
  packQty: [{ required: true, message: t('common.placeholder.input', [t('productRule.packQty')]) }],
  uom: [{ required: true, message: t('common.placeholder.input', [t('productRule.uom')]) }],
};

interface PackRuleDtlForm extends ProductPackRuleDtl {
  packRuleCode: string;
  packRuleName: string;
}

const initData: PackRuleDtlForm = {
  packRuleCode: '',
  packRuleName: '',
};
const formData: PackRuleDtlForm = reactive({ ...initData });

// onMounted(() => {});

const submit = async () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate().then((result) => {
      if (result !== true) {
        MessagePlugin.warning(Object.values(result)[0][0].message);
        reject();
        return;
      }
      if (props.isAdd) {
        apiControl.productPackRuleDtl.add(formData).then(() => {
          MessagePlugin.success(t('common.message.addSuccess'));
          resolve(formData);
        });
      } else {
        apiControl.productPackRuleDtl.update(formData).then(() => {
          MessagePlugin.success(t('common.message.saveSuccess'));
          resolve(formData);
        });
      }
    });
  });
};

// 初始化包装类型
const initPackType = async () => {
  const res = (await apimain.param.getListByGroupCode({
    parmGroupCode: 'PKG_BARCODE_TYPE',
  })) as any;
  selectOptions.value = res;
};

const reset = () => {
  formRef.value.reset({ type: 'empty' });
  for (const key in formData) {
    delete formData[key];
  }
  parentName.value = '';
};

const setRow = (
  packRuleDtlRow: any,
  PackRuleRow: any,
  isFirst: boolean,
  isAddData: boolean,
  parentNameValue: string,
) => {
  reset();
  parentName.value = parentNameValue;
  isFirstNode.value = isFirst;
  formData.packRuleId = PackRuleRow.id;
  // 第一层节点
  if (isFirst) {
    formData.packQty = 1; // 当为第1层时数量显示1
    if (isAddData) {
      // 新增模式
      formData.packLevel = 1;
      formData.parentPackId = '0'; // 顶级父节点默认为0
    } else {
      // 编辑模式
      formData.id = packRuleDtlRow.id;
      formData.packType = packRuleDtlRow.packType;
      formData.uom = packRuleDtlRow.uomSymbol;
      formData.packQty = 1;
      formData.packLevel = 1;
    }
  } else if (!isFirst) {
    // 非第一层节点
    if (isAddData) {
      // 新增模式
      formData.packLevel = packRuleDtlRow.packLevel + 1;
      formData.parentPackId = packRuleDtlRow.id; // 父节点ID
    } else {
      // 编辑模式
      formData.id = packRuleDtlRow.id;
      formData.packType = packRuleDtlRow.packType;
      formData.uom = packRuleDtlRow.uom;
      formData.packQty = packRuleDtlRow.packQty;
    }
  }
};

onMounted(() => {
  initPackType();
});

defineExpose({
  form: formRef,
  submit,
  reset,
  setRow,
});
</script>
<style lang="less" scoped>
.form-pack-rule-dtl {
  /deep/ .t-input-number {
    width: 100%;
  }
}
</style>
`
