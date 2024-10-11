<template>
  <t-form
    ref="formRef"
    :data="formData"
    :show-cancel="true"
    label-width="120px"
    :show-error-message="true"
    @submit="submit"
  >
    <t-row :gutter="[12, 16]">
      <t-col :span="6">
        <t-form-item :label="t('business.main.mitemCode')" required-mark name="mitemCode">
          <t-input v-model="formData.mitemCode" disabled /> </t-form-item
      ></t-col>
      <t-col :span="6">
        <t-form-item :label="t('business.main.mitemName')" required-mark name="mitemName">
          <t-input v-model="formData.mitemName" /> </t-form-item
      ></t-col>
      <t-col :span="6">
        <t-form-item :label="t('business.main.mitemDesc')"> <t-input v-model="formData.mitemDesc" /> </t-form-item
      ></t-col>
      <t-col :span="6">
        <t-form-item :label="t('business.main.mitemCategoryCode')">
          <bcmp-select-business v-model="formData.mitemCategoryId" type="mitemCategory" :show-title="false" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="t('business.main.uom')">
          <t-select v-model="formData.uom" :options="uomOptions" clearable /> </t-form-item
      ></t-col>
      <t-col :span="6">
        <t-form-item :label="t('business.main.supplyCategory')">
          <t-select v-model="formData.supplyCategory" :options="supplyCategoryOptions" clearable /> </t-form-item
      ></t-col>
      <t-col :span="6">
        <t-form-item :label="t('business.main.isBatchNo')">
          <t-select v-model="formData.isBatchNo" :disabled="true" :options="isBatchNoOptions" clearable /> </t-form-item
      ></t-col>
      <t-col :span="6">
        <t-form-item :label="t('business.main.defaultWarehouse')">
          <bcmp-select-business v-model="formData.warehouseId" type="warehouse" :show-title="false" /> </t-form-item
      ></t-col>
      <t-col :span="6">
        <t-form-item :label="t('business.main.warehouseName')">
          <t-input v-model="formData.warehouseName" disabled placeholder="" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="t('business.main.shelfLifeDays')">
          <t-input-number v-model="formData.shelfLifeDays" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="t('business.main.specificationsQty')">
          <t-input-number v-model="formData.specificationsQty" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item :label="t('mitem.min_packaging_qty')">
          <t-input-number v-model="formData.minPackagingQty" />
        </t-form-item>
      </t-col>
      <t-col :span="6">
        <t-form-item>
          <t-space :size="16">
            <t-checkbox v-model="formData.isRawChecked" :label="t('business.main.raw')" />
            <t-checkbox v-model="formData.isInProcessChecked" :label="t('business.main.product')" />
            <t-checkbox v-model="formData.isProductChecked" :label="t('business.main.inProduct')" />
          </t-space> </t-form-item
      ></t-col>
    </t-row>
  </t-form>
</template>

<script lang="ts">
import _ from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';
import BcmpSelectBusiness from '@/components/bcmp-select-business/index.vue';

import { useLang } from './lang';

export default {
  name: 'MitemForm',
  components: { BcmpSelectBusiness },
  setup() {
    const { t } = useLang();
    const mitemTypeOptions = ref([
      { label: t('business.main.raw'), value: 'isRaw' },
      { label: t('business.main.inProduct'), value: 'isInProcess' },
      { label: t('business.main.product'), value: 'isProduct' },
    ]);
    const uomOptions = ref([]); // 主单位
    const supplyCategoryOptions = ref([
      { label: t('business.main.pull'), value: t('business.main.pull') },
      { label: t('business.main.push'), value: t('business.main.push') },
    ]); // 供应方式
    const isBatchNoOptions = ref([
      { label: t('business.main.yes'), value: 1 },
      { label: t('business.main.no'), value: 0 },
    ]); // 是否启用批次
    const formData = ref({
      id: '',
      state: -1,
      mitemCode: '',
      mitemName: '',
      mitemDesc: '',
      mitemCategoryId: '',
      mitemCategoryCode: '',
      mitemCategoryName: '',
      uom: '',
      supplyCategory: '',
      isProduct: 0, // 是否成品
      isProductChecked: false,
      isInProcess: 0, // 是否半成品
      isInProcessChecked: false,
      isRaw: 0, // 是否原材料
      isRawChecked: false,
      warehouseId: '', // 完工默认仓库
      warehouseCode: '',
      warehouseName: '',
      shelfLifeDays: 0, // 保质期天数
      isBatchNo: 0, // 是否启用批次
      specificationsQty: 0,
      minPackagingQty: 0,
      properties: [],
    }) as any;
    const properties = ref([]);
    const formRef = ref(null);

    onMounted(() => {
      console.log('打开dialog');
      getUom();
    });
    const submit = async () => {
      if (_.isEmpty(formData.value.mitemName)) {
        MessagePlugin.warning(t('common.placeholder.input', [t('mitem.mitemName')]));
        return;
      }

      formData.value.isRaw = formData.value.isRawChecked ? 1 : 0;
      formData.value.isProduct = formData.value.isProductChecked ? 1 : 0;
      formData.value.isInProcess = formData.value.isInProcessChecked ? 1 : 0;
      formData.value.properties = properties.value;
      await api.mitem.edit(formData.value);
      MessagePlugin.success(t('common.message.success'));
    };

    const onWarehouseChange = (value: any) => {
      if (!_.isEmpty(value)) {
        formData.value.warehouseId = value.id;
        formData.value.warehouseCode = value.warehouseCode;
        formData.value.warehouseName = value.warehouseName;
      }
    };

    const getUom = async () => {
      try {
        // await api.mitemUom.getlist(formData.value);
        uomOptions.value = [];
        const dataUom = await api.mitemUom.getlist({ pageNum: 1, pageSize: 9999, uomName: '' });
        dataUom.list.forEach((n) => uomOptions.value.push({ label: n.uomName, value: n.uom }));
      } catch (e) {
        console.log(e);
      }
    };
    return {
      t,
      submit,
      getUom,
      onWarehouseChange,
      formData,
      properties,
      uomOptions,
      supplyCategoryOptions,
      isBatchNoOptions,
      mitemTypeOptions,
      formRef,
    };
  },
};
</script>
`
