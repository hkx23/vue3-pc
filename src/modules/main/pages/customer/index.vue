<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <!-- 查询组件  -->
      <cmp-query :opts="opts" @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        v-model:pagination="pageUI"
        row-key="index"
        :loading="loading"
        :table-column="columns"
        :table-data="customerData"
        :total="dataTotal"
        :fixed-height="true"
        @refresh="featCustomer"
      >
        <template #title> 客户列表 </template>
        <template #op="{ row }">
          <t-link theme="primary" @click="onHandleEdit(row.customerCode)">{{ t('common.button.edit') }}</t-link>
          <!-- <icon name="edit-1" style="cursor: pointer" @click="onHandleEdit(row.customerCode)"></icon> -->
          <!-- <icon name="edit-1" @click="onHandleEdit(row.customerCode)"></icon> -->
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- 弹出层 -->
  <t-dialog v-model:visible="formVisible" header="客户维护编辑" :on-confirm="onSecondary">
    <t-form
      ref="formRef"
      :loading="loading"
      :rules="rules"
      :data="formData"
      :label-width="95"
      scroll-to-first-error="smooth"
      label-align="right"
      @submit="onCustomerSubmit"
    >
      <!-- 客户编辑： -->
      <t-form-item label="客户编辑:" name="customerCode">
        <t-input v-model="formData.customerCode" disabled></t-input>
      </t-form-item>

      <!-- 客户名称： -->
      <t-form-item label="客户名称:" name="customerName">
        <t-input v-model="formData.customerName"></t-input>
      </t-form-item>

      <!-- 客户简称： -->
      <t-form-item label="客户简称:" name="abbreviation">
        <t-input v-model="formData.shortName"></t-input>
      </t-form-item>

      <!-- 控制盒子 -->
      <!-- <div class="control-box">
        <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>

        <t-button theme="primary" type="submit" @click="onSecondary">确认</t-button>
      </div> -->
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { Data, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

import { api } from '@/api/main';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

const { t } = useLang();
onMounted(() => {
  featCustomer();
});
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
// 控制
const keyword = ref(''); // 控制模糊搜索
const formVisible = ref(false); // 控制弹窗显示
// 表单初始化
const formData = ref({
  id: '1',
  customerCode: '',
  customerName: '',
  shortName: '',
});
// 监听查询的时候把num改为1
watch(
  () => keyword.value,
  (newValue, oldValue) => {
    if (oldValue !== newValue) {
      console.log(oldValue !== newValue);
      pageUI.value.page = 1;
    }
  },
);
// 表格th数据
const columns = ref([
  { colKey: 'customerCode', title: '客户编码', width: '100' },
  { colKey: 'customerName', title: '客户名称', width: '100' },
  { colKey: 'shortName', title: '客户简称', width: '100' },
  { colKey: 'op', title: '操作', width: '100' },
]);
// 客户信息
const customerData = ref([]);
const dataTotal = ref(0);
const featCustomer = async () => {
  try {
    setLoading(true);
    const res = await api.customer.search({
      keyword: keyword.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      sorts: [],
      filters: [],
    });
    customerData.value = res.list;
    dataTotal.value = Number(res.total);
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoading(false);
  }
};
// 查询组件
const opts = computed(() => {
  return {
    keyword: {
      label: '客户',
      comp: 't-input',
      placeholder: '请输入客户信息/名称',
      defaultVal: '',
    },
  };
});
// 点击查询按钮
const conditionEnter = (data: any) => {
  keyword.value = data.keyword;
  onHandleQuery();
};
// 查询
const customerQuery = async () => {
  featCustomer();
};
// 防抖
const debounce = (func: { (): void; apply?: any }, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      func.apply(this, args);
    }, delay);
  };
};
const onHandleQuery = debounce(() => {
  customerQuery();
}, 200);

// 重置
// const onHandleResetting = () => {
//   keyword.value = '';
//   pageUI.value.page = 1;
//   customerQuery();
// };

// 编辑
const onHandleEdit = (value: any) => {
  formVisible.value = true;
  customerData.value.forEach(async (item) => {
    if (item.customerCode === value) {
      try {
        const edit = await api.customer.getItemByCode({ code: item.customerCode });
        formData.value.id = edit.eid;
        formData.value.customerCode = edit.customerCode;
        formData.value.customerName = edit.customerName;
        formData.value.shortName = edit.shortName;
      } catch (e) {
        console.log(e);
      }
    }
  });
  featCustomer();
};
// 取消按钮
// const onSecondaryReset = () => {
//   MessagePlugin.success('取消编辑');
//   formVisible.value = false;
// };
// onCustomerSubmit
interface RootObject {
  validateResult: boolean;
  firstError: string;
}
// 清除from
const clearFrom = () => {
  formData.value.customerCode = '';
  formData.value.customerName = '';
  formData.value.shortName = '';
  formData.value.id = '';
};
const formRef = ref(null);
// 二次确认按钮
const onSecondary = async () => {
  formRef.value.validate().then(async (result) => {
    if (result !== true) {
      MessagePlugin.warning(Object.values(result)[0][0].message);
    } else {
      try {
        await api.customer.updateItemByCode({
          customerCode: formData.value.customerCode,
          customerName: formData.value.customerName,
          shortName: formData.value.shortName,
        });
        MessagePlugin.success('提交成功');
        formVisible.value = false;
        clearFrom();
      } catch (e) {
        console.log(e);
      }
      featCustomer();
    }
  });
};
let submitShow = false; // 控制二次确认按钮
// 确认保存
const onCustomerSubmit = (context: RootObject) => {
  // debugger;
  console.log(submitShow, context.validateResult);
  if (context.validateResult === true) {
    submitShow = true;
  }
};
// form 表单规则
const rules: FormRules<Data> = {
  customerCode: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  customerName: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
};
</script>

<style lang="less" scoped>
.save-filter {
  color: var(--brand-main);
}

.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.btn-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: var(--td-comp-margin-xxl);
}
// 控制盒子
.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
  color: red;
}
// form表单控制
.form-customer-row {
  margin: 10px 0;
}

.btn-disabled {
  cursor: pointer;
}
</style>
