<!-- 异常处理配置 -->
<template>
  <div>
    <t-card>
      <tm-table
        v-model:pagination="pageUI"
        row-key="OrganizationName"
        :table-data="data"
        :table-column="column"
        :total="total"
        :selected-row-keys="selectedRowKeys"
        @refresh="onFetchData"
        @select-change="rehandleSelectChange"
      >
        <template #button>
          <tm-query :opts="opts" @submit="onInput"> </tm-query>
        </template>
        <template #oprate>
          <t-button @click="onAdd">新增</t-button>
          <t-button variant="outline">删除</t-button>
          <!-- <t-button>导入</t-button> -->
        </template>
        <template #operate="{ row }">
          <t-space>
            <!-- 编辑 -->
            <icon name="edit-1" style="cursor: pointer" @click="onEdit(row)"></icon>
            <!-- 删除 -->
            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelete(row)">
              <icon name="delete" style="cursor: pointer"></icon>
            </t-popconfirm>
          </t-space>
          <!-- <t-button>导入</t-button> -->
        </template>
      </tm-table>
    </t-card>
    <t-dialog
      v-model:visible="formVisible"
      header="新增(编辑)异常处理配置"
      :cancel-btn="null"
      :confirm-btn="null"
      width="40%"
    >
      <t-form ref="formRef" :data="formItem" :rules="rules" @submit="onSubmit">
        <t-form-item :label="t('exceptionHandling.OrganizationName')" name="OrganizationName">
          <t-select v-model="formItem.OrganizationName" placeholder="请输入"></t-select>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.abnormalModule')" name="abnormalModule">
          <t-select v-model="formItem.abnormalModule" placeholder="请输入"></t-select>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.treatmentGroup')" name="treatmentGroup">
          <t-select v-model="formItem.treatmentGroup" placeholder="请输入"></t-select>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.processOrder')" name="processOrder">
          <t-input v-model="formItem.processOrder" placeholder="请输入"></t-input>
        </t-form-item>
        <t-form-item :label="t('exceptionHandling.transferOrders')" name="transferOrders">
          <t-radio-group
            v-model="formItem.transferOrders"
            name="city"
            :options="itemOptions"
            @change="onChange"
          ></t-radio-group
        ></t-form-item>
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
          <t-button theme="primary" type="submit">保存</t-button>
        </div>
      </t-form>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Data, FormInstanceFunctions, FormRules, Icon } from 'tdesign-vue-next';
import { computed, onMounted, reactive, Ref, ref } from 'vue';

// import { api } from '@/api/daily';
import TmQuery from '@/components/tm-query/index.vue';
import { usePage } from '@/hooks/modules/page';

import TmTable from '../../../../components/tm-table/index.vue';
import { useLang } from './lang';

const formVisible = ref(false);

const opts = computed(() => {
  return {
    keyWord: {
      label: '处理组或异常类型查询',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
  };
});
// 搜索触发事件
const onInput = (data) => {
  formItem.keyWord = data.keyWord;
  onFetchData();
};
const itemOptions = [
  { label: '允许', value: 1 },
  { label: '不允许', value: 0 },
];
const { pageUI } = usePage();
onMounted(() => {
  onFetchData();
});
const { t } = useLang();

// 单选触发F
const onChange = (checkedValues) => {
  console.log('checkedValues:', checkedValues);
};

// 多选框
const selectedRowKeys = ref([]); // 选择的要删除数据
// 多选的值事件触发
const rehandleSelectChange = (value: any) => {
  selectedRowKeys.value = value;
  console.log(selectedRowKeys.value);
};
// form实例
const formRef: Ref<FormInstanceFunctions> = ref(null);
// 表单
const formItem = reactive({
  OrganizationName: '', // 组织名称
  abnormalModule: '', // 异常模块
  treatmentGroup: '', // 是否允许转单
  processOrder: '', // 处理组
  transferOrders: 1, // 处理顺序
  keyWord: '',
});
// 页面总数
const total = ref(10);
// table数据定义
const column = ref([
  {
    colKey: 'select',
    type: 'multiple',
  },
  {
    colKey: 'OrganizationName',
    title: t('exceptionHandling.OrganizationName'),
    align: 'center',
  },
  {
    colKey: 'abnormalModule',
    title: t('exceptionHandling.abnormalModule'),
    align: 'center',
  },
  {
    colKey: 'treatmentGroup',
    title: t('exceptionHandling.treatmentGroup'),
    align: 'center',
  },
  {
    colKey: 'processOrder',
    title: t('exceptionHandling.processOrder'),
    align: 'center',
  },
  {
    colKey: 'transferOrders',
    title: t('exceptionHandling.transferOrders'),
    align: 'center',
  },
  {
    colKey: 'operate',
    title: t('exceptionHandling.operate'),
    align: 'center',
    fixed: 'right',
  },
]);
// table数据存储
const data = ref([
  {
    OrganizationName: '测试',
    abnormalModule: '品质隐藏',
    treatmentGroup: '天外来物',
    processOrder: '12',
    transferOrders: '允许',
  },
  {
    OrganizationName: '测试2',
    abnormalModule: '品质隐藏3',
    treatmentGroup: '天外来物4',
    processOrder: '好',
    transferOrders: '不允许',
  },
]);
// 进入首页请求
const onFetchData = async () => {
  // try {
  //   const list = await api.exceptionHandling.geslist({
  //     pageNum: pageUI.value.page,
  //     pageSize: pageUI.value.rows,
  //     keyWord: formItem.keyWord,
  //   });
  //   data.value = list.list;
  //   total.value = list.total;
  //   console.log(list);
  // } catch (e) {
  //   console.log(e);
  // }

  data.value = _.cloneDeep(data.value);
};
const isAddAanEdit = ref(1); // 默认为添加1新增 0编辑
// 控制编辑和新增
const addAanEdit = async () => {
  if (isAddAanEdit.value === 1) {
    console.log('新增');
    try {
      // await api.exceptionHandling.add({});
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      // await api.exceptionHandling.removeDefectCode({});
      console.log('编辑');
    } catch (e) {
      console.log(e);
    }
  }
};

// 新增
const onAdd = () => {
  formRef.value.reset({ type: 'initial' });
  isAddAanEdit.value = 1; // 1为新增
  addAanEdit();
  formVisible.value = true; // 添加窗口控制
};

// 编辑
const onEdit = (row) => {
  isAddAanEdit.value = 0; // 编辑
  if (row.transferOrders === '允许') {
    formItem.transferOrders = 1;
  } else {
    formItem.transferOrders = 0;
  }
  formItem.OrganizationName = row.OrganizationName;
  formItem.abnormalModule = row.abnormalModule;
  formItem.processOrder = row.processOrder;
  // formItem.transferOrders = row.transferOrders;
  formItem.treatmentGroup = row.treatmentGroup;

  formVisible.value = true; // 添加窗口控制
  console.log(row);
};

// 删除
const onDelete = async (row) => {
  try {
    console.log(row);
    // api.exceptionHandling.removeDefectCode({id:row.id})
  } catch (e) {
    console.log(e);
  }
};

// 保存
const onSubmit = (context) => {
  if (context.validateResult === true) {
    addAanEdit();
  }
};

// 窗口取消
const onSecondaryReset = () => {
  formVisible.value = false;
};

// form效验
const rules: FormRules<Data> = {
  OrganizationName: [
    {
      required: true,
      type: 'error',
      trigger: 'change',
    },
  ],
  abnormalModule: [
    {
      required: true,
      type: 'error',
      trigger: 'change',
    },
  ],
  treatmentGroup: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  processOrder: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
  transferOrders: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
    },
  ],
};
</script>

<style lang="less" scoped>
.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
}
</style>
