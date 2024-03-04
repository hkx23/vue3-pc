<template>
  <t-form ref="assignFormRef" :rules="rules" :show-error-message="false">
    <t-row :gutter="[32, 16]">
      <!-- 第 1️⃣ 行数据 -->
      <t-col :span="12">
        <t-form-item label="标准编码" name="inspectStdCode">
          <t-select
            v-model="formData.inspectStdCode"
            clearable
            filterable
            input-props
            :disabled="formData.type !== 'add'"
            @change="onChange"
            @clear="fetchSampingStdCodes"
            @input-change="querySelectChange($event)"
          >
            <t-option
              v-for="item in namesOption"
              :key="item.id"
              :label="item.label"
              :value="item.value"
              :lazy-load="true"
            />
          </t-select>
        </t-form-item>
      </t-col>
      <t-col :span="12">
        <t-form-item label="物料类别" name="mitemCategory">
          <bcmp-select-business
            v-model="formData.mitemCategoryIds"
            type="mitemCategory"
            is-multiple
            :clearable="true"
            :show-title="false"
          ></bcmp-select-business>
        </t-form-item>
      </t-col>
      <t-col :span="12">
        <t-form-item label="物料" name="mitemId">
          <bcmp-select-business
            v-model="formData.mitemId"
            type="mitem"
            :show-title="false"
            :clearable="true"
          ></bcmp-select-business>
        </t-form-item>
      </t-col>
    </t-row>
  </t-form>
</template>

<script lang="ts">
import { isEmpty } from 'lodash';
import { FormRules, MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import { api } from '@/api/quality';

export default {
  name: 'MitemForm',
  setup() {
    const formData = ref({
      type: '',
      id: '',
      inspectStdCode: '',
      inspectStdName: '',
      mitemCategoryIds: '',
      mitemId: '',
    });
    // #表单定义规则
    const rules: FormRules = {
      mitemCategory: [{ required: true, message: '不能为空', trigger: 'change' }],
      mitemId: [{ required: true, message: '不能为空', trigger: 'change' }],
      name: [{ required: true, message: '不能为空', trigger: 'change' }],
    };

    const submit = async () => {
      if (isEmpty(formData.value.mitemId)) {
        MessagePlugin.warning('请选择物料');
        return false;
      }
      if (formData.value.type === 'add' && isEmpty(formData.value.inspectStdCode)) {
        MessagePlugin.warning('请选择产品检验标准');
        return false;
      }
      if (formData.value.mitemCategoryIds.length < 1) {
        MessagePlugin.warning('请选择物料类别');
        return false;
      }
      // const categotyList = formData.value.mitemCategortArr.map((item) => item.value);
      await api.oqcInspectStdMitem.assignOqcInspectStdMitem({
        stdId: formData.value.id,
        mitemId: formData.value.mitemId,
        mitemCategoryIds: formData.value.mitemCategoryIds.split(','),
      });
      MessagePlugin.success('操作成功');
      return true;
    };
    const getOqcInspectStdMitem = async () => {
      const res = await api.oqcInspectStdMitem.getOqcInspectStdMitem({ stdId: formData.value.id });
      if (res) {
        formData.value.mitemId = res[0]?.mitemId;
        const newData = res.map((item) => {
          return item.mitemCategoryId;
        });
        formData.value.mitemCategoryIds = newData.join(',');
      } else {
        formData.value.mitemId = '';
        formData.value.mitemCategoryIds = '';
      }
    };
    const namesOption = ref([]);
    const onChange = (value: any) => {
      formData.value.id = value;
    };
    const fetchSampingStdCodes = async () => {
      try {
        const data = (await api.oqcInspectStd.getOqcInspectList({
          pageNum: 1,
          pageSize: 10,
        })) as any;
        namesOption.value = data.list
          .filter((item) => item.status !== 'EXPIRED')
          .map((item) => ({
            label: item.inspectStdCode,
            value: item.id,
          }));
      } catch (e) {
        console.log(e);
      }
    };

    const querySelectChange = async (event) => {
      const res = (await api.oqcInspectStd.getOqcInspectList({
        inspectStdCode: event.length >= 1 ? event : '',
        pageNum: 1,
        pageSize: 10,
      })) as any;
      // 过滤出 status 不等于 'EXPIRED' 的数据，并映射为 namesOption.value
      namesOption.value = res.list
        .filter((item) => item.status !== 'EXPIRED' && item.status !== 'DISABLED')
        .map((item) => ({
          label: item.inspectStdCode,
          value: item.id,
        }));
    };
    const init = () => {
      formData.value = {
        type: '',
        id: '',
        inspectStdCode: '',
        inspectStdName: '',
        mitemCategoryIds: '',
        mitemId: '',
      };
    };

    return {
      init,
      fetchSampingStdCodes,
      querySelectChange,
      namesOption,
      submit,
      getOqcInspectStdMitem,
      rules,
      onChange,
      formData,
    };
  },
};
</script>
