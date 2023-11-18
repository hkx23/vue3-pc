<template>
  <div>
    <t-card class="list-card-container" :bordered="false">
      <t-row justify="space-between">
        <t-col>
          <div>
            <t-input v-model="keyword" label="客户信息/名称：" placeholder="请输入" clearable />
          </div>
        </t-col>
        <t-col flex="220px">
          <div class="btn-left">
            <t-button variant="base" @click="onHandleQuery">查询</t-button>
            <t-button theme="default" variant="base" @click="onHandleResetting">重置</t-button>
            <span class="save-filter" style="cursor: pointer">保存筛选</span>
            <span style="cursor: pointer">展开<t-icon name="chevron-down"></t-icon></span>
          </div>
        </t-col>
      </t-row>
      <t-table
        row-key="index"
        :columns="columns"
        :data="customerData"
        lazy-load
        :pagination="customerPagination"
        @page-change="onPageChange"
      >
        <template #operate="{ row }">
          <t-link theme="primary" hover="color" @click="onHandleEdit(row.id)"> 编辑 </t-link>
        </template>
      </t-table>
    </t-card>
    <!-- 弹出层 -->
    <t-dialog v-model:visible="formVisible" header="客户维护编辑" :cancel-btn="null" :confirm-btn="null" width="40%">
      <t-form
        ref="form"
        :rules="rules"
        :data="formData"
        layout="inline"
        scroll-to-first-error="smooth"
        label-align="right"
        @submit="onCustomerSubmit"
      >
        <!-- 客户编辑： -->
        <t-row class="form-customer-row">
          <t-col>
            <t-form-item label="客户编辑:" name="customerCode">
              <t-input v-model="formData.customerCode" readonly></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 客户名称： -->
        <t-row class="form-customer-row">
          <t-col>
            <t-form-item label="客户名称:" name="customerName">
              <t-input v-model="formData.customerName"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 客户简称： -->
        <t-row class="form-customer-row">
          <t-col>
            <t-form-item label="客户简称:" name="abbreviation">
              <t-input v-model="formData.shortName"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 控制盒子 -->
        <div class="control-box">
          <t-popconfirm content="确认提交吗" @confirm="onSecondary">
            <t-button theme="primary" type="submit">确认</t-button>
          </t-popconfirm>
          <t-popconfirm content="确认提交吗" @confirm="onSecondaryReset">
            <t-button theme="default" variant="base">取消</t-button>
          </t-popconfirm>
        </div>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { Data, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import { customerModify, customerSearch, customerSelect, getCustomer } from '../../api/customer';

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

// 表格th数据
const columns = ref([
  { colKey: 'customerCode', title: '客户编码', width: '100' },
  { colKey: 'customerName', title: '客户名称', width: '100' },
  { colKey: 'shortName', title: '客户简称', width: '100' },
  { colKey: 'operate', title: '操作', width: '100' },
]);
// 客户信息
const customerData = ref([]);
const featCustomer = async () => {
  try {
    const res = await getCustomer();
    customerData.value = res.list;
    customerPagination.value = { ...customerPagination.value, total: res.total };
  } catch (e) {
    console.log('cus', e);
  }
};
featCustomer();
// 分页pagination
const customerPagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 20,
  total: 0,
  showJumper: true,
});
const onPageChange = (pageInfo: { current: number; pageSize: number }) => {
  customerPagination.value.defaultCurrent = pageInfo.current;
};
// 查询
const customerQuery = async () => {
  try {
    const list = await customerSearch({
      pageNum: customerPagination.value.defaultCurrent.toString(),
      pageSize: customerPagination.value.defaultPageSize.toString(),
      keyword: keyword.value,
      sorts: [],
      filters: [],
    });
    customerData.value = list.list;
  } catch (e) {
    console.log(e);
  }
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
const onHandleResetting = () => {
  keyword.value = '';
};

// 编辑
const onHandleEdit = (e: number) => {
  formVisible.value = true;
  customerData.value.forEach(async (item, index) => {
    if (index === Number(e - 1)) {
      // console.log(item.customerCode);
      try {
        const edit = await customerSelect({ code: item.customerCode });
        formData.value.id = edit.eid;
        formData.value.customerCode = edit.customerCode;
        formData.value.customerName = edit.customerName;
        formData.value.shortName = edit.shortName;
        console.log(formData.value.shortName);
      } catch (e) {
        console.log(e);
      }
    }
  });
};
// 取消按钮
const onSecondaryReset = () => {
  MessagePlugin.success('取消编辑');
  formVisible.value = false;
};
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
// 二次确认按钮
const onSecondary = async () => {
  if (submitShow === false) {
    return;
  }
  try {
    await customerModify({
      customerCode: formData.value.customerCode,
      customerName: formData.value.customerName,
      shortName: formData.value.shortName,
      oid: formData.value.id,
    });
    MessagePlugin.success('提交成功');
    formVisible.value = false;
    clearFrom();
  } catch (e) {
    console.log(e);
  }
  featCustomer();
};
let submitShow = false; // 控制二次确认按钮
// 确认保存
const onCustomerSubmit = (context: RootObject) => {
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
  margin-bottom: var(--td-comp-margin-xxl);
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
