<template>
  <cmp-container :full="true">
    <!-- !提交暂存模块 -->
    <cmp-card :span="12">
      <t-row justify="space-between" align="center">
        <t-col><span class="span_title">新增检验标准</span></t-col>
        <t-col>
          <t-button>提交</t-button>
          <t-button theme="default" @click="onClose">暂存</t-button>
        </t-col>
      </t-row>
    </cmp-card>
    <!-- !基础信息模块 -->
    <cmp-card :span="12" title="基础信息" class="cards_title">
      <t-form ref="formRef">
        <t-row :gutter="[32, 16]">
          <!-- 第 1️⃣ 行数据 -->
          <t-col :span="4">
            <t-form-item label="标准编码" name="mitemCode">
              <t-input></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="标准名称" name="mitemCode">
              <t-input></t-input>
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="版本号" name="mitemCode">
              <t-input></t-input>
            </t-form-item>
          </t-col>
          <!-- 第 2️⃣ 行数据 -->
          <t-col :span="4">
            <t-form-item label="集团检验标准" name="mitemId">
              <t-select>
                <t-option key="apple" label="是" value="apple" />
                <t-option key="orange" label="否" value="orange" />
                <t-option key="banana" label="中立？" value="banana" />
              </t-select>
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="生效时间" name="mitemCode" class="width: 100%">
              <t-date-picker clearable style="width: 100%" />
            </t-form-item>
          </t-col>
          <t-col :span="4">
            <t-form-item label="失效时间" name="mitemCode">
              <t-date-picker clearable style="width: 100%" />
            </t-form-item>
          </t-col>
          <!-- 第 3️⃣ 行数据 -->
          <t-col :span="4">
            <t-form-item label="附件：" name="mitemCode">
              <t-link theme="primary" @click="formVisible = true"> 附件上传 </t-link>
            </t-form-item>
          </t-col>
        </t-row>
      </t-form>
    </cmp-card>
    <!-- !检验项目表格模块 -->
    <cmp-card :span="12" class="cards_title">
      <cmp-table
        ref="tableRefCard"
        v-model:pagination="pageUI"
        row-key="deliveryCardId"
        :fixed-height="true"
        :active-row-type="'single'"
        :hover="true"
        :table-column="columns"
        :table-data="manageTabData"
        :total="0"
        select-on-row-click
      >
        <template #title>
          {{ '检验项目' }}
        </template>
        <template #button>
          <t-input placeholder="请输入搜索关键字">
            <template #suffixIcon>
              <search-icon :style="{ cursor: 'pointer' }" />
            </template>
          </t-input>
          <t-button @click="touchstoneFormVisible = true"> 新增 </t-button>
          <t-button theme="default"> 导入 </t-button>
          <t-button theme="default"> 批量删除 </t-button>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- !上传组件 弹框 -->
  <t-dialog
    v-model:visible="formVisible"
    :close-on-overlay-click="false"
    header="附件上传"
    :cancel-btn="null"
    :confirm-btn="null"
    width="50%"
  >
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="fileList"
        @upload-success="uploadSuccess"
        @uploadfail="uploadfail"
        @delete-success="deleteSuccess"
        @batch-delete-success="batchDeleteSuccess"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <!-- !检验项目新增 弹框 -->
  <t-dialog
    v-model:visible="touchstoneFormVisible"
    :close-on-overlay-click="false"
    header="附件上传"
    :cancel-btn="null"
    :confirm-btn="null"
    width="75%"
  >
    <touchstoneForm></touchstoneForm>
  </t-dialog>
</template>

<script setup lang="ts">
// import { debounce } from 'lodash';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import { AddFileType } from '@/components/bcmp-upload-content/constants';
import CmpTable from '@/components/cmp-table/index.vue';
import { usePage } from '@/hooks/modules/page';

import touchstoneForm from './touchstoneForm.vue';

const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false);
const touchstoneFormVisible = ref(false);
// 父方法
const Emit = defineEmits(['permissionShow']);
// 关闭窗口回到主页面
const onClose = () => {
  Emit('permissionShow', false); // 回到父
};

// // 上传文件
const fileList = ref([]);

const uploadSuccess = (file: AddFileType) => {
  MessagePlugin.info(
    `上传一个文件成功,如果是需要实时更新业务数据，可使用对应FILE的路径，文件名，文件大小等信息自行写逻辑上传到后端`,
  );
  fileList.value.push(file);
  console.log('🚀 ~ file: materialStandardAdd.vue:149 ~ uploadSuccess ~ files.value:', fileList.value);

  console.log('🚀 ~ file: materialStandardAdd.vue:150 ~ uploadSuccess ~ file:', file);
};

const uploadfail = (file: AddFileType) => {
  MessagePlugin.info(`上传一个文件失败,这个暂时没想到场景`);
  console.log('uploadSuccess', file);
};

const deleteSuccess = (file: AddFileType) => {
  MessagePlugin.info(
    `删除一个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  );
  console.log('deleteSuccess', file);
};

const batchDeleteSuccess = (files: AddFileType[]) => {
  MessagePlugin.info(
    `删除多个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  );
  console.log('batchDeleteSuccess', files);
};

const manageTabData = ref([]);
const columns = [
  {
    colKey: 'row-select',
    type: 'multiple',
  },
  {
    colKey: 'warehouseCode',
    title: '序号',
  },
  {
    colKey: 'warehouseCode',
    title: '项目类别',
  },
  {
    colKey: 'warehouseName',
    title: '检验内容',
  },
  {
    colKey: 'warehouseName',
    title: '检验类型',
  },
  {
    colKey: 'warehouseName',
    title: '技术要求',
  },
  {
    colKey: 'warehouseName',
    title: '不合格分类',
  },
  {
    colKey: 'warehouseName',
    title: '项目特性',
  },
  {
    colKey: 'warehouseName',
    title: '检验工具',
  },
  {
    colKey: 'warehouseName',
    title: '基准值',
  },
  {
    colKey: 'warehouseName',
    title: '单位',
  },
  {
    colKey: 'warehouseName',
    title: '合格范围',
  },
  {
    colKey: 'warehouseName',
    title: '抽样方案',
  },
  {
    colKey: 'warehouseName',
    title: '检验水平',
  },
  {
    colKey: 'warehouseName',
    title: '是否CTQ',
  },
  {
    colKey: 'warehouseName',
    title: '检验依据',
  },
  {
    colKey: 'operation',
    title: '操作',
    fixed: 'right',
  },
];
</script>

<style lang="less" scoped>
.cards_title {
  :deep(.t-card__title) {
    font-weight: bold;
    color: var(--td-gray-color-8);
    font-size: 16px;
  }
}

.span_title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 16px;
}
</style>
