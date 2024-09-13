<!-- 企业信息 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query :opts="opts" :bool-enter="true" @submit="onInput"> </cmp-query>
    </cmp-card>
    <cmp-card>
      <!-- ################# 企业信息表格数据 ###################### -->
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        empty="没有符合条件的数据"
        row-key="id"
        :hover="false"
        :stripe="false"
        :fixed-height="false"
        :table-column="shiftColumns"
        active-row-type="single"
        :table-data="teamList.list"
        :total="teamTotal"
        :selected-row-keys="selectedRowKeys"
        @refresh="onFetchGroupData"
      >
        <template #title>
          {{ '企业信息列表' }}
        </template>
        <template #actionSlot="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onEditRow(row)">{{ '编辑' }}</t-link>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>

  <!-- #企业信息 dialog 弹窗 -->
  <t-dialog v-model:visible="formVisible" :cancel-btn="null" :confirm-btn="null" :header="diaLogTitle">
    <t-form ref="formRef" :rules="rules" :data="firmFormData" @submit="onAnomalyTypeSubmit">
      <!-- 第 1️⃣ 行数据 -->
      <t-form-item label="企业代码" name="epCode">
        <t-input v-model="firmFormData.epCode" disabled></t-input>
      </t-form-item>
      <!-- 第 2️⃣ 行数据 -->
      <t-form-item label="企业简介" name="epName">
        <t-input v-model="firmFormData.epName"></t-input>
      </t-form-item>
      <!-- 第 3️⃣ 行数据 -->
      <t-form-item label="企业全称" name="epFullName">
        <t-input v-model="firmFormData.epFullName"></t-input>
      </t-form-item>
      <!-- 第 4️⃣ 行数据 -->
      <t-form-item label="企业地址" name="epAddress">
        <t-input v-model="firmFormData.epAddress"></t-input>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="formVisible = false">取消</t-button>
      <t-button theme="primary" @click="eidtFormSubmit">保存</t-button>
    </template>
  </t-dialog>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

import { api } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

const firmFormData = ref({
  id: '', // 行 ID
  epCode: '', // 企业代码
  epName: '', // 企业简介
  epFullName: '', // 企业全称
  epAddress: '', // 企业地址
});

const formRef: Ref<FormInstanceFunctions> = ref(null); // 新增表单数据清除，获取表单实例
const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false); // 控制 企业信息dialog 弹窗显示隐藏
const diaLogTitle = ref(''); // 弹窗标题
const selectedRowKeys: Ref<any[]> = ref([]); // 删除计量单位 id
// $企业信息 表格数据
const teamList = reactive({ list: [] });
// 企业信息表格数据总条数
const teamTotal = ref(0);
// $人员 表格数据
const supportPersonInUserList = reactive({ list: [] });
// 人员表格数据总条数
const supportPersonTotal = ref(0);
// dialog 弹框数据

// ####班次 表头
const shiftColumns: PrimaryTableCol<TableRowData>[] = [
  {
    title: '序号',
    colKey: 'serial-number',
    width: 64,
  },
  {
    colKey: 'epCode',
    title: '企业代码',
    width: '100',
  },
  {
    colKey: 'epName',
    title: '企业简介',
    width: '100',
  },
  {
    colKey: 'epFullName',
    title: '企业全称',
    width: '130',
  },
  {
    colKey: 'epAddress',
    title: '企业地址',
    width: '80',
  },
  {
    colKey: 'actionSlot',
    title: '操作',
    fixed: 'right',
    width: '50',
  },
];

// # 企业信息刷新按钮
const onFetchGroupData = async () => {
  await onFirmTabData(); // 获取 企业信息表格 数据
  selectedRowKeys.value = [];
  supportPersonInUserList.list = [];
  supportPersonTotal.value = 0;
};

// 表单定义规则
const rules: FormRules = {
  epCode: [{ required: true, trigger: 'blur' }],
  epName: [{ required: true, trigger: 'blur' }],
  epFullName: [{ required: true, trigger: 'blur' }],
  epAddress: [{ required: true, trigger: 'blur' }],
};
// # 初始渲染
onMounted(async () => {
  await onFirmTabData(); // 获取 企业信息表格 数据
});

// #企业信息搜索
const opts = computed(() => {
  return {
    keyword: { label: '企业代码或简介', comp: 't-input', event: 'input', defaultval: '' },
  };
});
// 上侧搜索提交事件
const onInput = async (data: any) => {
  pageUI.value.page = 1;
  enterpriseParam.value.keyword = data.keyword;
  await onFirmTabData();
  selectedRowKeys.value = [];
  supportPersonInUserList.list = [];
  supportPersonTotal.value = 0;
};

const eidtFormSubmit = () => {
  formRef.value.submit();
};

// #企业信息 参数
const enterpriseParam = ref({
  pageNum: 1,
  pageSize: 20,
  keyword: '', // 仓库编码/名称
});

// #获取 企业信息 数据
const onFirmTabData = async () => {
  enterpriseParam.value.pageNum = pageUI.value.page;
  enterpriseParam.value.pageSize = pageUI.value.rows;
  const res = await api.enterprise.getList(enterpriseParam.value);
  teamList.list = res.list;
  teamTotal.value = res.total;
};

// // #编辑企业信息
const onEditRow = (row: any) => {
  formRef.value.reset({ type: 'empty' });
  Object.keys(row).forEach((key) => {
    if (key in firmFormData.value) {
      firmFormData.value[key] = row[key];
    }
  });
  formVisible.value = true;
  diaLogTitle.value = '编辑企业信息';
};

// #编辑企业信息请求
const onGroupRequest = async () => {
  await api.enterprise.modify(firmFormData.value);
  await onFirmTabData(); // 获取 企业信息表格 数据
  formVisible.value = false;
  MessagePlugin.success('编辑成功');
};

// // @表单提交事件
const onAnomalyTypeSubmit = async (context: { validateResult: boolean }) => {
  if (context.validateResult === true) {
    await onGroupRequest(); // 编辑请求
  }
};
</script>

<style lang="less" scoped>
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

.align-right {
  display: flex;
  justify-content: flex-end;
}

.filled-icon {
  color: var(--td-success-color);
}
</style>
