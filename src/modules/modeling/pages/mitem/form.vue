<template>
  <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
    <t-form-item label="物料编码" required-mark>
      <t-input v-model="formData.mitemCode" disabled />
    </t-form-item>
    <t-form-item label="物料名称" required-mark>
      <t-input v-model="formData.mitemName" />
    </t-form-item>
    <t-form-item label="物料描述">
      <t-input v-model="formData.mitemDesc" />
    </t-form-item>
    <t-form-item label="物料分类">
      <div style="width: 156px">
        <!-- <t-input v-model="formData.mmitemCategoryCode" readonly /> -->
        <tm-select-business
          v-model="formData.mmitemCategoryCode"
          type="mitemCategory"
          @selection-change="onMitemCategorySelectionChange"
        />
      </div>
    </t-form-item>
    <t-form-item label="主计量单位">
      <t-select
        v-model="formData.uom"
        disabled
        style="width: 156px"
        :options="uomOptions"
        placeholder="请选择单位"
        clearable
      />
    </t-form-item>
    <t-form-item label="供应方式">
      <t-select
        v-model="formData.supplyCategory"
        disabled
        style="width: 156px"
        :options="supplyCategoryOptions"
        placeholder="请选择供应方式"
        clearable
      />
    </t-form-item>
    <t-form-item label="启用批次">
      <t-select
        v-model="formData.isBatchNo"
        style="width: 156px"
        :options="isBatchNoOptions"
        placeholder="是否启用批次"
        clearable
      />
    </t-form-item>
    <t-form-item label="默认仓库">
      <t-input v-model="formData.wWarehouseCode" readonly placeholder="" />
    </t-form-item>
    <t-form-item label="仓库名称">
      <t-input v-model="formData.wWarehouseName" readonly placeholder="" />
    </t-form-item>
    <t-form-item label="保质期">
      <t-input-number v-model="formData.shelfLifeDays" />
    </t-form-item>
    <t-form-item>
      <t-row style="width: 200px">
        <t-col flex="auto"> <t-checkbox v-model="formData.isRawChecked" label="原材料" /> </t-col>
        <t-col flex="auto"> <t-checkbox v-model="formData.isProductChecked" label="成品" /> </t-col>
        <t-col flex="auto"> <t-checkbox v-model="formData.isInProcessChecked" label="半成品" /> </t-col>
      </t-row>
    </t-form-item>
  </t-form>
</template>

<script lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/modeling';
import TmSelectBusiness from '@/components/tm-select-business/index.vue';

export default {
  name: 'MitemForm',
  components: { TmSelectBusiness },
  setup() {
    const uomOptions = ref([
      { label: 'Pcs', value: 'Pcs' },
      { label: 'Kg', value: 'Kg' },
    ]); // 主单位
    const supplyCategoryOptions = ref([
      { label: '拉式', value: '拉式' },
      { label: '推式', value: '推式' },
    ]); // 供应方式
    const isBatchNoOptions = ref([
      { label: '是', value: 1 },
      { label: '否', value: 0 },
    ]); // 是否启用批次
    const formData = ref({
      id: '',
      mitemCode: '',
      mitemName: '',
      mitemDesc: '',
      mmitemCategoryId: '',
      mmitemCategoryCode: '',
      mmitemCategoryName: '',
      uom: '',
      supplyCategory: '',
      isProduct: 0, // 是否成品
      isProductChecked: false,
      isInProcess: 0, // 是否半成品
      isInProcessChecked: false,
      isRaw: 0, // 是否原材料
      isRawChecked: false,
      wWarehouseId: '', // 完工默认仓库
      wWarehouseCode: '',
      wWarehouseName: '',
      shelfLifeDays: null, // 保质期天数
      isBatchNo: 0, // 是否启用批次
    });

    onMounted(() => {
      console.log('123123');
    });
    const submit = async () => {
      try {
        formData.value.isRaw = formData.value.isRawChecked ? 1 : 0;
        formData.value.isProduct = formData.value.isProductChecked ? 1 : 0;
        formData.value.isInProcess = formData.value.isInProcessChecked ? 1 : 0;

        await api.mitem.edit(formData.value);
        MessagePlugin.success('编辑成功');
      } catch (e) {
        console.log(e);
      } finally {
        console.log('11111');
      }
    };

    const onMitemCategorySelectionChange = (val: any) => {
      formData.value.mmitemCategoryId = val.id;
      formData.value.mmitemCategoryCode = val.categoryCode;
      formData.value.mmitemCategoryName = val.categoryName;
    };
    return {
      submit,
      formData,
      uomOptions,
      supplyCategoryOptions,
      isBatchNoOptions,
      onMitemCategorySelectionChange,
    };
  },
};
</script>
`
