<template>
  <t-form :data="formData" :show-cancel="true" :show-error-message="false" label-width="150px" @submit="submit">
    <t-row>
      <t-col class="t-space-item">
        <t-form-item label="物料编码" required-mark>
          <div style="width: 157px">
            <tm-select-business
              v-model="formData.mitemId"
              type="mitem"
              label-field="mitemCode"
              :show-title="false"
              :disabled="formData.operateTpye === 'add' ? false : true"
              @selection-change="onMitemChange"
            />
          </div>
        </t-form-item>
      </t-col>
      <t-col>
        <t-form-item label="供应商编码" required-mark>
          <div style="width: 157px">
            <tm-select-business
              v-model="formData.supplierId"
              type="supplier"
              label-field="supplierCode"
              :show-title="false"
              :disabled="formData.operateTpye === 'add' ? false : true"
              @selection-change="onSupplierChange"
            />
          </div>
        </t-form-item>
      </t-col>
    </t-row>
    <t-row>
      <t-col class="t-space-item">
        <t-form-item label="物料名称">
          <t-input v-model="formData.mitemName" readonly />
        </t-form-item>
      </t-col>
      <t-col>
        <t-form-item label="供应商名称">
          <t-input v-model="formData.supplierName" readonly />
        </t-form-item>
      </t-col>
    </t-row>

    <t-row>
      <t-col class="t-space-item">
        <t-form-item label="最小包装数量" required-mark>
          <t-input-number v-model="formData.qty" style="width: 156px" />
        </t-form-item>
      </t-col>
      <t-col>
        <t-form-item label="检验严格度" required-mark>
          <t-radio-group v-model="formData.inspectionStringency" :options="inspectionStringencyOptions" clearable />
        </t-form-item>
      </t-col>
    </t-row>

    <t-row>
      <t-col class="t-space-item">
        <t-form-item label="是否免检" required-mark>
          <t-radio-group
            v-model="formData.isExemptionInspection"
            style="width: 156px"
            :options="isOptions"
            clearable
            :on-change="onIsExemptionInspectionChange"
          />
        </t-form-item>
      </t-col>
      <t-col>
        <t-form-item label="是否强制供方检验" required-mark>
          <t-radio-group v-model="formData.isForceInspection" style="width: 156px" :options="isOptions" clearable />
        </t-form-item>
      </t-col>
    </t-row>
    <t-form-item label="免检失效日期">
      <t-date-picker
        v-model="formData.dateExemptionExpired"
        :disabled="formData.isExemptionInspection === 1 ? false : true"
      />
    </t-form-item>
  </t-form>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/main';
import TmSelectBusiness from '@/components/tm-select-business/index.vue';

export default {
  name: 'MitemInSupplierForm',
  components: { TmSelectBusiness },
  setup() {
    const inspectionStringencyOptions = ref([
      { label: '正常', value: '正常', defaultChecked: true },
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
      operateTpye: 'add',
      id: '',
      mitemId: '',
      mitemCode: '',
      mitemName: '',
      supplierId: '',
      supplierCode: '',
      supplierName: '',
      qty: 0, // 最小包装数
      inspectionStringency: '', // 检验严格度
      isExemptionInspection: 0, // 是否免检
      isExemptionInspectionChecked: false, // 是否免检
      isForceInspection: 0, // 是否强制供方检验
      isForceInspectionChecked: false, // 是否强制供方检验
      dateExemptionExpiredStr: '', // 免检失效日期
      dateExemptionExpired: '',
    });

    onMounted(() => {
      console.log('123123');
    });
    const submit = async () => {
      try {
        if (isEmpty(formData.value.supplierCode)) {
          MessagePlugin.error('请选择供应商');
          return false;
        }
        if (isEmpty(formData.value.mitemCode)) {
          MessagePlugin.error('请选择物料');
          return false;
        }
        if (formData.value.isExemptionInspection === 1 && isEmpty(formData.value.dateExemptionExpired)) {
          MessagePlugin.error('请选择免检失效日期');
          return false;
        }

        if (formData.value.operateTpye === 'add') {
          await api.mitemInSupplier.add(formData.value);
          MessagePlugin.success('新增成功');
        } else if (formData.value.operateTpye === 'edit') {
          await api.mitemInSupplier.edit(formData.value);
          MessagePlugin.success('编辑成功');
        }
      } catch (e) {
        console.log(e);
        return false;
      }
      return true;
    };
    const init = () => {
      formData.value.operateTpye = 'add';
      formData.value.id = '';
      formData.value.mitemId = '';
      formData.value.mitemCode = '';
      formData.value.mitemName = '';
      formData.value.supplierId = '';
      formData.value.supplierCode = '';
      formData.value.supplierName = '';
      formData.value.qty = 0; // 最小包装数
      formData.value.inspectionStringency = '正常'; // 检验严格度
      formData.value.isExemptionInspection = 1; // 是否免检
      formData.value.isExemptionInspectionChecked = false; // 是否免检
      formData.value.isForceInspection = 1; // 是否强制供方检验
      formData.value.isForceInspectionChecked = false; // 是否强制供方检验
      formData.value.dateExemptionExpiredStr = ''; // 免检失效日期
      formData.value.dateExemptionExpired = '';
    };
    const onSupplierChange = (value: any) => {
      formData.value.supplierId = value.id;
      formData.value.supplierCode = value.supplierCode;
      formData.value.supplierName = value.supplierName;
    };
    const onMitemChange = (value: any) => {
      formData.value.mitemId = value.id;
      formData.value.mitemCode = value.mitemCode;
      formData.value.mitemName = value.mitemName;
    };
    const onIsExemptionInspectionChange = (value) => {
      if (value !== 1) {
        formData.value.dateExemptionExpired = '';
      }
    };

    return {
      init,
      submit,
      formData,
      uomOptions,
      supplyCategoryOptions,
      isOptions,
      inspectionStringencyOptions,
      onSupplierChange,
      onMitemChange,
      onIsExemptionInspectionChange,
    };
  },
};
</script>

<style scoped>
.t-space-item {
  margin-bottom: 10px;
}
</style>
