<template>
  <div class="module-tree-container">
    <t-card :bordered="false"> <t-button>新增</t-button></t-card>
    <t-card :bordered="false">
      <header class="module-header-box">
        <t-row justify="space-between">
          <!-- 左侧盒子 -->
          <t-col :span="3" flex="auto"></t-col>
          <!-- 右侧盒子 -->
          <t-col :span="8" flex="auto">
            <t-table :columns="columns" :data="moduleData">
              <template #pc>
                <t-checkbox></t-checkbox>
              </template>
              <template #mobile>
                <t-checkbox></t-checkbox>
              </template>
              <template #tv>
                <t-checkbox></t-checkbox>
              </template>
              <template #Watch>
                <t-checkbox></t-checkbox>
              </template>
              <template #WeChat>
                <t-checkbox></t-checkbox>
              </template>
              <template #operate>
                <icon name="delete"></icon>
                <icon name="edit-1" class="module-edit"></icon>
                <icon name="delete-1"></icon>
              </template>
            </t-table>
          </t-col>
        </t-row>
        <!-- <div>1</div> -->
        <!-- <div>2</div> -->
      </header></t-card
    >
    <t-dialog v-model:visible="formVisible" header="新增" :cancel-btn="null" :confirm-btn="null" width="40%">
      <t-form :rules="rules" :data="formData" @submit="onWorkStationSubmit">
        <t-form-item label="模块名称" name="moduleName">
          <t-input></t-input>
        </t-form-item>
        <t-form-item label="模块描述" name="moduleDes"> <t-input></t-input> </t-form-item>
      </t-form>
      <div class="control-box">
        <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
        <t-popconfirm content="确认保存吗" @confirm="onSecondary">
          <t-button theme="primary" type="submit">保存</t-button>
        </t-popconfirm>
      </div>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { Icon } from 'tdesign-icons-vue-next';
import { Data, FormRules, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { ref } from 'vue';

const formVisible = ref(true);
const formData = ref({
  moduleName: '', // 模块名称
  moduleDes: '', // 模块描述
});
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'moduleSort',
    title: '序号',
    align: 'center',
  },
  {
    colKey: 'moduleName',
    title: '模块名称',
    align: 'center',
  },
  {
    colKey: 'moduleDescribe',
    title: '模块描述',
    align: 'center',
  },
  {
    colKey: 'pc',
    title: 'pc端',
    align: 'center',
  },
  {
    colKey: 'mobile',
    title: '移动端',
    align: 'center',
  },
  {
    colKey: 'tv',
    title: '电视端',
    align: 'center',
  },
  {
    colKey: 'Watch',
    title: '手表端',
    align: 'center',
  },
  {
    colKey: 'WeChat',
    title: '微信端',
    align: 'center',
  },
  {
    colKey: 'moduleAddress',
    title: '模块地址',
    align: 'center',
    width: '160px',
  },
  {
    colKey: 'operate',
    title: '操作',
    align: 'center',
  },
];
const moduleData = ref([
  { moduleSort: '1', moduleName: '客户', moduleDescribe: '客户维护', moduleAddress: '/page/system/index' },
]);
// 取消
const onSecondaryReset = () => {
  console.log(1);
};
let submitShow = true; // 记录保存
// 保存
const onSecondary = () => {
  console.log(1);
};
// 保存确认按钮
interface RootObject {
  validateResult: boolean;
  firstError: string;
}
const onWorkStationSubmit = (context: RootObject) => {
  console.log(submitShow, context.validateResult);
  if (context.validateResult === true) {
    submitShow = false;
  }
};
const rules: FormRules<Data> = {
  moduleName: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  // moduleName: [
  //   {
  //     required: true,
  //     type: 'error',
  //     trigger: 'blur',
  //   },
  // ],
};
</script>

<style lang="less" scoped>
// 头
.module-tree-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);
}

// .module-header-box {
//   // display: flex;
//   // justify-content: space-between;
// }
.module-edit {
  margin: 0 10px;
}
</style>
