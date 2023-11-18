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
            <span class="save-filter">保存筛选</span>
            <span>展开<t-icon name="chevron-down"></t-icon></span>
          </div>
        </t-col>
      </t-row>
      <t-table
        row-key="index"
        :columns="columns"
        :data="customerData"
        drag-sort="row"
        lazy-load
        :pagination="pagination"
        @page-change="onPageChange"
      >
        <template #operate="{ row }">
          <t-link theme="primary" hover="color" @click="onHandleEdit(row)"> 编辑 </t-link>
        </template>
      </t-table>
    </t-card>
    <!-- 弹出层 -->
    <t-dialog v-model:visible="formVisible" header="客户维护编辑" :cancel-btn="null" :confirm-btn="null" width="40%">
      <!-- <org-level-form ref="formRef"></org-level-form> -->
      <t-form
        ref="form"
        :rules="rules"
        :data="formData"
        layout="inline"
        scroll-to-first-error="smooth"
        label-align="right"
        @reset="onCustomerReset"
        @submit="onCustomerSubmit"
      >
        <!-- 客户编辑： -->
        <t-row class="form-customer-row">
          <t-col>
            <t-form-item label="客户编辑:" name="customerCode" :disabled="formDisabled">
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
              <t-input v-model="formData.abbreviation"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 控制盒子 -->
        <div class="control-box">
          <t-button theme="primary" type="submit">确认</t-button>
          <t-button theme="default" variant="base" type="reset">取消</t-button>
        </div>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { Data, FormRules, MessagePlugin } from 'tdesign-vue-next';
import { reactive, ref } from 'vue';

const formDisabled = ref(true);
const keyword = ref('');
const TOTAL = 120;
// 表格th数据
const columns = ref([
  { colKey: 'customerCode', title: '客户编码', width: '100' },
  { colKey: 'customerName', title: '客户名称', width: '100' },
  { colKey: 'customerAbbreviation', title: '客户简称', width: '100' },
  { colKey: 'operate', title: '操作', width: '100' },
]);
// 客户信息
const customerData = ref([
  {
    customerCode: '123',
    customerName: '123',
    customerAbbreviation: '123',
  },
]);
// const fetchData = async() => {
//     const list=await getCustomer()
// };
// 分页pagination
const pagination = reactive({
  current: 1,
  pageSize: 5,
  // defaultCurrent: 2,
  // defaultPageSize: 5,
  total: TOTAL,
  showJumper: true,
});
const onPageChange = (pageInfo: { current: number; pageSize: number }, context: any) => {
  console.log('page-change', pageInfo, context);
  // 受控用法需要下面两行代码
  pagination.current = pageInfo.current;
  pagination.pageSize = pageInfo.pageSize;
};
// 查询
const onHandleQuery = () => {
  console.log(1);
};
// 重置
const onHandleResetting = () => {
  console.log(1);
};
// 控制弹窗显示
const formVisible = ref(false);
// 编辑
const onHandleEdit = (row: any) => {
  formVisible.value = true;
  console.log(row);
};
// 表单初始化
const formData = reactive({
  customerCode: '',
  customerName: '',
  abbreviation: '',
});
// 取消按钮
const onCustomerReset = () => {
  MessagePlugin.success('取消编辑');
  formVisible.value = false;
};
// 确认按钮
// @ts-ignore
const onCustomerSubmit = ({ validateResult, firstError }) => {
  if (validateResult === true) {
    MessagePlugin.success('提交成功');
  } else {
    console.log('Validate Errors: ', firstError, validateResult);
    MessagePlugin.warning(firstError);
  }
};
// form 表单规则
const rules: FormRules<Data> = {
  customerCode: [
    {
      required: true,
      // disabled: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  customerName: [
    {
      required: true,
      // disabled: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
};
</script>

<style lang="less" scoped>
.save-filter {
  color: #3b96ff;
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
  right: 70px;
  bottom: 20px;
  color: red;
}
// form表单控制
.form-customer-row {
  margin: 10px 0;
}
</style>
