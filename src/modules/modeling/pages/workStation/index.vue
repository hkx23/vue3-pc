<template>
  <div>
    <t-card class="list-card-container" :bordered="false" gutter>
      <t-row justify="space-between">
        <t-col :span="2"><t-input label="工站代码/名称：" placeholder="请输入工序代码/名称"></t-input> </t-col>
        <t-col :span="2"> <tm-select-business placeholder="状态"></tm-select-business></t-col>
        <t-col :span="2"><t-input label="工作中心：" placeholder="请输入工作中心/名称"></t-input> </t-col>
        <t-col :span="2"><t-input label="工序：" placeholder="请输入工序代码/名称"></t-input> </t-col>
      </t-row>
      <t-row justify="space-between" style="margin: 20px 0">
        <t-col>
          <div>
            <t-button variant="base" @click="onHandelAdd">新增</t-button>
            <!-- <t-button theme="default" variant="base">导入</t-button> -->
            <!-- <input type="file" @change="handleFileUpload" />
            <button @click="importData">导入</button> -->
          </div>
        </t-col>
        <t-col flex="220px">
          <div class="btn-left">
            <t-button variant="base" @click="onHandelQuery">查询</t-button>
            <t-button theme="default" variant="base">重置</t-button>
          </div>
        </t-col>
      </t-row>
      <t-table
        row-key="index"
        :columns="columns"
        :data="workData"
        lazy-load
        :pagination="workStationPagination"
        @page-change="onWorkStationPageChange"
      >
        <template #state>
          <t-button variant="outline" :theme="showDisabled ? 'danger' : 'success'">{{
            showDisabled ? '禁用' : '启用'
          }}</t-button>
        </template>
        <template #operate>
          <!-- 编辑 -->
          <icon name="edit-1" style="margin-right: 10px; cursor: pointer" @click="onHandelEdit"></icon>
          <!-- 禁用 -->
          <icon name="delete" style="margin-right: 10px; cursor: pointer" @click="onHandleDisable"></icon>
        </template>
      </t-table>
    </t-card>
    <t-dialog v-model:visible="formVisible" header="新增" :cancel-btn="null" :confirm-btn="null" width="40%">
      <t-form
        ref="form"
        :rules="rules"
        :data="formData"
        layout="inline"
        scroll-to-first-error="smooth"
        label-align="right"
        @submit="onWorkStationSubmit"
      >
        <!-- 工作中心-->
        <t-row class="form-customer-row">
          <t-col>
            <t-form-item label="工作中心:" name="workCenter">
              <!-- <t-select v-model="formData.workCenter"></t-select> -->
              <tm-select-business v-model="formData.workCenter"></tm-select-business>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 工序 -->
        <t-row class="form-work-station">
          <t-col>
            <t-form-item label="工序:" name="workSort">
              <tm-select-business v-model="formData.workSort"></tm-select-business>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 工站代码 -->
        <t-row class="form-work-station">
          <t-col>
            <t-form-item label="工站代码:" name="workCode">
              <t-input v-model="formData.workCode"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 工站名称 -->
        <t-row class="form-work-station">
          <t-col>
            <t-form-item label="工站名称:" name="workName">
              <t-input v-model="formData.workName"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!--工站描述  -->
        <t-row class="form-work-station">
          <t-col>
            <t-form-item label="工站描述:" name="workDescribe">
              <t-input v-model="formData.workDescribe"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
        <!--启用  -->
        <t-row class="form-work-station">
          <t-col>
            <t-form-item label="启用:" name="iShow">
              <t-switch v-model="formData.iShow" size="large" @change="onChange" />
            </t-form-item>
          </t-col>
        </t-row>
        <!-- 控制盒子 -->
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
          <t-popconfirm content="确认保存吗" @confirm="onSecondary">
            <t-button theme="primary" type="submit">保存</t-button>
          </t-popconfirm>
        </div>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { Data, FormRules, Icon, MessagePlugin } from 'tdesign-vue-next';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next/es/table/type';
import { ref } from 'vue';

import TmSelectBusiness from '../../../../components/tm-select-business/index.vue';

const formVisible = ref(false); // 控制弹窗显示
const showDisabled = ref(false); // 禁用控制
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'stationCode',
    title: '工站代码',
    width: '90px',
  },
  {
    colKey: 'stationName',
    title: '工站名称',
    width: '90px',
  },
  {
    colKey: 'workDescribe',
    title: '工站描述',
    width: '90px',
  },
  {
    colKey: 'workCenter',
    title: '工站中心',
    width: '90px',
  },
  {
    colKey: 'production',
    title: '工序',
    width: '90px',
  },
  {
    align: 'center',
    colKey: 'state',
    title: '状态',
    width: '90px',
  },
  {
    colKey: 'founder',
    title: '创建人',
    width: '90px',
  },
  {
    colKey: 'creationTime',
    title: '创建时间',
    width: '160px',
  },
  {
    colKey: 'renew',
    title: '更新人',
    width: '90px',
  },
  {
    colKey: 'renewTime',
    title: '更新时间',
    width: '160px',
  },
  {
    colKey: 'operate',
    title: '操作',
    width: '90px',
  },
];
const formData = ref({
  workCenter: '', // 工作中心
  workSort: '', // 工序
  workCode: '', // 工作代码
  workName: '', // 工作名称
  workDescribe: '', // 工作描述
  iShow: true, // 控制是否启用
});
const workData = ref([
  {
    stationCode: 'GZOO1',
    stationName: '201-装箱机',
    workDescribe: '201-装箱机',
    workCenter: '201线',
    production: '装箱',
    founder: '创建人',
    creationTime: '2023-11-20 17:34:52',
    renew: 'admin',
    renewTime: '2023-11-20 17:35:52',
  },
]);
// 分页控制初始数据
const workStationPagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 20,
  total: 0,
  showJumper: true,
});
const onWorkStationPageChange = (pageInfo: { current: number; pageSize: number }) => {
  workStationPagination.value.defaultCurrent = pageInfo.current;
};
// 新增
const onHandelAdd = () => {
  formVisible.value = true;
};
// 查询
const onHandelQuery = () => {
  console.log(1);
};
// 禁用
const onHandleDisable = () => {
  showDisabled.value = true;
};
// 编辑
const onHandelEdit = () => {
  console.log(1);
  formVisible.value = true;
};
const onChange = (value) => {
  console.log(value);
};
// 取消
const onSecondaryReset = () => {
  MessagePlugin.success('取消成功');
  formVisible.value = false;
};

let submitShow = true; // 记录保存
// 二次保存
const onSecondary = () => {
  if (submitShow === true) {
    return;
  }
  MessagePlugin.success('保存成功');
  formVisible.value = false;
};
// 保存确认按钮
interface RootObject {
  validateResult: boolean;
  firstError: string;
}
// form保存
const onWorkStationSubmit = (context: RootObject) => {
  console.log(submitShow, context.validateResult);
  if (context.validateResult === true) {
    submitShow = false;
  }
};
const rules: FormRules<Data> = {
  workCenter: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  workSort: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  workCode: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  workName: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
};
</script>

<style lang="less" scoped>
.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

.btn-left {
  display: flex;
  justify-content: flex-end;
}

.form-work-station {
  margin: 10px 0;
}
// 按钮盒子
.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
  color: red;
}
// 启动按钮样式更改
:deep(.t-switch.t-is-checked:hover) {
  background: var(--td-success-color-4);
}

:deep(.t-switch.t-is-checked) {
  background: var(--td-success-color-4);
}
</style>
