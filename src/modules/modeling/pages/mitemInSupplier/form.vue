<template>
  <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
    <t-form-item label="供应商编码" required-mark>
      <!-- <t-input v-model="formData.mSupplierCode" /> -->
      <tm-select-business v-model="formData.mSupplierCode" type="supplier" />
    </t-form-item>
    <t-form-item label="供应商名称" required-mark>
      <t-input v-model="formData.mSupplierName" />
    </t-form-item>
    <t-form-item label="物料编码" required-mark>
      <!-- <t-input v-model="formData.mMitemCode" /> -->
      <tm-select-business v-model="formData.mMitemCode" type="mitem" />
    </t-form-item>
    <t-form-item label="物料名称">
      <t-input v-model="formData.mMitemName" />
    </t-form-item>
    <t-form-item label="最小包装数量">
      <t-input-number v-model="formData.qty" />
    </t-form-item>
    <t-form-item label="检验严格度">
      <t-radio-group
        v-model="formData.inspectionStringency"
        style="width: 156px"
        :options="inspectionStringencyOptions"
        clearable
      />
    </t-form-item>
    <t-form-item label="是否免检">
      <t-radio-group v-model="formData.isExemptionInspection" style="width: 156px" :options="isOptions" clearable />
    </t-form-item>
    <t-form-item label="是否强制供方检验">
      <t-radio-group v-model="formData.isForceInspection" style="width: 156px" :options="isOptions" clearable />
    </t-form-item>
    <t-form-item label="免检失效日期"> </t-form-item>
  </t-form>
</template>

<script lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/modeling';
import TmSelectBusiness from '@/components/tm-select-business/index.vue';

export default {
  name: 'MitemInSupplierForm',
  components: { TmSelectBusiness },
  setup() {
    const inspectionStringencyOptions = ref([
      { label: '正常', value: '正常' },
      { label: '加严', value: '加严' },
      { label: '放宽', value: '放宽' },
    ]);
    const uomOptions = ref([
      { label: 'Pcs', value: 'Pcs' },
      { label: 'Kg', value: 'Kg' },
    ]); // 主单位
    const supplyCategoryOptions = ref([
      { label: '拉式', value: '拉式' },
      { label: '推式', value: '推式' },
    ]); // 供应方式
    const isOptions = ref([
      { label: '是', value: 1 },
      { label: '否', value: 0 },
    ]); // 是否启用批次
    const formData = ref({
      id: '',
      mSupplierId: '',
      mSupplierCode: '',
      mSupplierName: '',
      mMitemId: '',
      mMitemCode: '',
      mMitemName: '',
      qty: 0, // 最小包装数
      inspectionStringency: '', // 检验严格度
      isExemptionInspection: 0, // 是否免检
      isExemptionInspectionChecked: false, // 是否免检
      isForceInspection: 0, // 是否强制供方检验
      isForceInspectionChecked: false, // 是否强制供方检验
      dateExemptionExpired: 0, // 免检失效日期
    });

    onMounted(() => {
      console.log('123123');
    });
    const submit = async () => {
      try {
        await api.mitem.edit(formData.value);
        MessagePlugin.success('编辑成功');
      } catch (e) {
        console.log(e);
      } finally {
        console.log('11111');
      }
    };

    return {
      submit,
      formData,
      uomOptions,
      supplyCategoryOptions,
      isOptions,
      inspectionStringencyOptions,
    };
  },
};
</script>
`
