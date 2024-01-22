<template>
  <t-tabs v-model="activeTab">
    <!-- 默认插槽 和 具名插槽（panel）都是用来渲染面板内容 -->
    <t-tab-panel value="tab1" label="容器" :destroy-on-hide="false">
      <t-card>
        <cmp-query ref="queryComponent" :opts="optsContainer1" :bool-enter="false" @submit="onInput"> </cmp-query>
      </t-card>
      <!-- cmp-table 表格组件  -->
      <cmp-table
        v-model:pagination="pageUI"
        row-key="billNo"
        :table-column="tableContainerColumns1"
        :table-data="tableContainerData1"
        :total="dataTotal1"
        :loading="loading"
        empty="没有符合条件的数据"
      >
        <template #button>
          <!-- <t-button theme="primary">新增</t-button> -->
          <t-button theme="primary" @click="generate">生成</t-button>
          <t-button theme="primary">打印</t-button>
          <t-button theme="primary">删除</t-button>
        </template>

        <!-- 定义序号列的插槽 -->
        <template #indexSlot="{ rowIndex }">
          {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
        </template>
        <!-- 编辑 -->
        <template #op2>
          <t-space>
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick2()">编辑</t-link>
            <!-- @confirm="() => onStateRowClick2(row)" -->
            <t-popconfirm theme="default" content="确认删除吗">
              <t-link theme="primary"> 删除 </t-link>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </t-tab-panel>
    <!-- 物料关联 -->
    <t-tab-panel value="tab2" label="物料关联" :destroy-on-hide="false">
      <t-card>
        <cmp-query ref="queryComponent" :opts="optsContainer2" :bool-enter="false" @submit="onInput2"> </cmp-query>
      </t-card>
      <!-- cmp-table 表格组件  -->
      <cmp-table
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="tableContainerColumns2"
        :table-data="tableContainerData2"
        :total="dataTotal2"
        empty="没有符合条件的数据"
      >
        <template #button>
          <t-button theme="primary" @click="add">新增</t-button>
          <!-- <t-button theme="primary" @click="generate">生成</t-button> -->
          <!--  @click="print" -->
          <t-button theme="primary">打印</t-button>
          <t-button theme="primary">删除</t-button>
        </template>

        <!-- 定义序号列的插槽 -->
        <template #indexSlot="{ rowIndex }">
          {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
        </template>
        <!-- 编辑 -->
        <template #op2>
          <t-space>
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick2()">编辑</t-link>
          </t-space>
        </template>
      </cmp-table>
    </t-tab-panel>
  </t-tabs>

  <!-- 弹窗1 -->
  <t-dialog v-model:visible="containerVisible1" :footer="false" :close-on-overlay-click="false" header="容器条码生成">
    <t-form :data="formData1" label-width="110px" :rules="rules" @submit="submit1" @reset="cancel">
      <t-form-item label="容器类型" name="containerType">
        <t-input v-model="formData1.containerType" disabled></t-input>
        <!-- <t-select v-model="formData1.containerType">
          <t-option
            v-for="item in containerTypeDataOptions"
            :key="item.id"
            :label="item.containerType"
            :value="item.id"
          ></t-option>
        </t-select> -->
      </t-form-item>
      <t-form-item label="条码生成规则" name="barcodeRuleId">
        <t-select v-model="formData1.barcodeRuleId">
          <t-option
            v-for="item in barcodeRuleDataOptions"
            :key="item.id"
            :label="item.ruleName"
            :value="item.id"
          ></t-option>
        </t-select>
      </t-form-item>
      <t-form-item label="生成数量" name="createNum">
        <t-input-number v-model="formData1.createNum" :min="1" :max="100"></t-input-number>
      </t-form-item>

      <t-form-item>
        <div class="dialog-footer">
          <t-button theme="primary" type="reset">取消</t-button>
          <t-button theme="primary" type="submit">确认</t-button>
        </div>
      </t-form-item>
    </t-form>
  </t-dialog>

  <!-- 弹窗2 -->
  <t-dialog
    v-model:visible="containerVisible2"
    :footer="false"
    :close-on-overlay-click="false"
    header="新增容器类型与物料关系"
  >
    <!-- :rules="rules1" -->
    <t-form :data="formData2" label-width="110px" :rules="rules" @submit="submit2" @reset="cancel">
      <t-form-item label="容器类型" name="containerType">
        <t-input v-model="formData2.containerType"></t-input>
      </t-form-item>
      <t-form-item label="物料类别" name="mitemCategoryId">
        <t-select v-model="formData2.mitemCategoryId"></t-select>
      </t-form-item>
      <t-form-item label="物料类别编码" name="containerTypeId">
        <t-select v-model="formData2.containerTypeId"></t-select>
      </t-form-item>
      <t-form-item label="物料名称" name="mitemId">
        <t-select v-model="formData2.mitemId"></t-select>
      </t-form-item>
      <!-- <t-form-item label="物料编码" name="mitemCategoryId">
        <t-select v-model="formData2.mitemCategoryId"></t-select>
      </t-form-item> -->
      <t-form-item label="标准数量" name="qty">
        <t-input v-model="formData2.qty"></t-input>
      </t-form-item>

      <t-form-item>
        <div class="dialog-footer">
          <t-button theme="primary" type="reset">取消</t-button>
          <t-button theme="primary" type="submit">确认</t-button>
        </div>
      </t-form-item>
    </t-form>
  </t-dialog>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
import { Data, FormRules, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref, watch } from 'vue';

import { api, api as apiMain } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();
const containerVisible1 = ref(false); //* 弹窗默认关闭
const containerVisible2 = ref(false);
const { loading, setLoading } = useLoading();
const tableContainerData1 = ref([]);
const tableContainerData2 = ref([]);
const dataTotal1 = ref(0);
const dataTotal2 = ref(0);
const documentStatusOptions = ref([]);
const barcodeRuleDataOptions = ref([]); // 条码规则下拉数据
const preserveId = ref(''); // 入参id
const formData1 = ref({
  containerType: preserveId.value, // 传递id
  barcodeRuleId: '',
  createNum: 1,
});

const formData2 = ref({
  containerType: '',
  mitemCategoryId: '',
  containerTypeId: [],
  mitemId: '',
  qty: '',
});

// 校验规则
const rules: FormRules<Data> = {
  containerType: [
    {
      required: true,
      message: '请输入容器类型',
      trigger: 'blur',
    },
  ],
  barcodeRuleId: [
    {
      required: true,
      message: '请输入条码生成规则',
      trigger: 'blur',
    },
  ],
  // createNum: [
  //   {
  //     required: true,
  //     message: '请输入生成数量',
  //     trigger: 'blur',
  //   },
  // ],
};

const optsContainer1 = computed(() => {
  return {
    containerTypeId: {
      label: '容器状态',
      labelWidth: '20',
      event: 'select',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: documentStatusOptions.value,
        clearable: true,
      },
    },
    keyword: {
      label: '容器条码',
      labelWidth: '20',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
    printTemplate: {
      label: '打印模板',
      labelWidth: '20',
      event: 'select',
      comp: 't-select',
      defaultVal: '',
    },
  };
});

const optsContainer2 = computed(() => {
  return {
    keyword: {
      label: '物料编码/名称',
      labelWidth: '20',
      event: 'select',
      comp: 't-select',
      defaultVal: '',
    },
  };
});

const tableContainerColumns1: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 65, cell: 'indexSlot' },
  { title: '容器编码', colKey: 'containerCode', width: 80 },
  { title: '容器名称', width: 80, colKey: 'containerName' },
  { title: '状态', width: 80, colKey: 'statusName' },
];

const tableContainerColumns2: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '序号', colKey: 'index', width: 30, cell: 'indexSlot' },
  { title: '物料类别', colKey: 'mitemCategory', width: 80 },
  { title: '物料类别名称', width: 80, colKey: 'mitemCategoryName' },
  { title: '物料编码', width: 80, colKey: 'mitemCode' },
  { title: '物料名称', width: 85, colKey: 'mitemName' },
  { title: '物料描述', width: 85, colKey: 'mitemDesc' },
  { title: '标题数量', width: 85, colKey: 'qty' },
  { title: '操作', align: 'left', fixed: 'right', width: 100, colKey: 'op2' },
];
const props = defineProps({
  propsId: {
    type: String,
    default: '',
  },
  selectedRowData: {
    type: Object,
    default: () => ({}), // 使用函数返回一个新的对象
  },
});

//* 初始渲染
onMounted(async () => {
  console.log('Received from parent:', props.selectedRowData);
  await getBarcodeRuleList();
  await getcontainerType();
  // await getPrintTmplList(); // 打印模板
  await fetchTable2({});
});

// 打印模板
// const getPrintTmplList = async () => {
//   const PrintTmpReslut = await api.container.getPrintTmplList();
//   console.log('🚀 ~ getPrintTmplList ~ PrintTmpReslut:', PrintTmpReslut); // [] todo
// };

// 获得条码规则下拉数据
const getBarcodeRuleList = async () => {
  const reslut = await api.container.getBarcodeRuleList();
  barcodeRuleDataOptions.value = reslut;
};

// 获取 数据字典 容器状态
const getcontainerType = async () => {
  try {
    const res = await apiMain.param.getListByGroupCode({
      parmGroupCode: 'CONTAINER_STATUS',
    });
    documentStatusOptions.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};

//* 查询
const onInput = async (data: any) => {
  setLoading(true);
  const { containerTypeId, state, keyword } = data;
  if (!data.value) {
    const result = await api.container.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      keyword,
      state,
      containerTypeId,
    });
    tableContainerData1.value = result.list;
    dataTotal1.value = result.total;
  }
};
//* 查询2
const onInput2 = async (data: any) => {
  setLoading(true);
  const { containerTypeId, state, keyword } = data;
  if (!data.value) {
    const result = await api.container.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      keyword,
      state,
      containerTypeId,
    });
    tableContainerData1.value = result.list;
    dataTotal1.value = result.total;
  }
};

// 父调子fn
const fetchTable = async (data: any) => {
  setLoading(true);
  if (!data.value) {
    const result = await api.container.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      barcodeRuleId: data,
    });
    tableContainerData1.value = result.list;
    dataTotal1.value = result.total;
  }

  setLoading(false);
};
// fetchTable 物料关联
const fetchTable2 = async (data: any) => {
  setLoading(true);
  if (!data.value) {
    const result = await api.containerInMitem.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    });
    tableContainerData2.value = result.list;
    dataTotal2.value = result.total;
  }
  setLoading(false);
};

// 提交1
const submit1 = async () => {
  // 校验必填
  const fieldsToValidate = [
    { field: formData1.value.containerType, message: '请输入容器类型' },
    { field: formData1.value.barcodeRuleId, message: '请输入条码生成规则' },
  ];
  for (const field of fieldsToValidate) {
    if (isEmpty(field.field)) {
      MessagePlugin.error(field.message);
      return;
    }
  }

  // 创建提交的数据对象
  const submitData = {
    containerTypeId: preserveId.value, // 使用 preserveId.value 作为 containerType 的值
    barcodeRuleId: formData1.value.barcodeRuleId,
    createNum: formData1.value.createNum,
  };
  await api.container.generateBarcode(submitData);
  containerVisible1.value = false;
  MessagePlugin.success('提交成功');
  fetchTable({});
};

// 打印
// const print = () => {
//  const reslutPrin =  api.container.printBarcode({
//   ids:'',
//  })  //todo
// };

//
const submit2 = () => {
  console.log('🚀 ~ file: tabsContainer.vue:418 ~ submit2 ~ submit2:', 'submit2');
};
// 编辑
const onEditRowClick2 = async () => {
  // containerVisible.value = true;
};
//* 删除
// const onStateRowClick2 = async () => {
// await api.district.removeDistrict({ id: row.row.id });
// if (tableDataWarehouse.value.length <= 1 && pageUI.value.page > 1) {
//   pageUI.value.page--;
// }
// await fetchTable(); // *获取 货区 数据
// MessagePlugin.success('删除成功');
// };
// 生成
const generate = () => {
  containerVisible1.value = true;
};

// 取消
const cancel = () => {
  // 清空数据
  formData1.value = {
    containerType: '',
    barcodeRuleId: '',
    createNum: 1,
  };
  containerVisible1.value = false;
  MessagePlugin.success('已取消');
};

const activeTab = ref('tab1');

defineExpose({
  fetchTable,
});

// watch(
//   () => props.selectedRowData,
//   (newValue, oldValue) => {
//     console.log('selectedRowData changed from', oldValue, 'to', newValue);
//     // 在这里可以执行任何基于 selectedRowData 变化的操作
//     // 检查 newValue 是否有效并包含所需的属性
//     if (newValue && newValue.containerType) {
//       // 更新 formData1.containerType
//       formData1.value.containerType = newValue.containerType;
//     }
//   },
// );

watch(
  () => props.selectedRowData,
  (newValue) => {
    // console.log('selectedRowData changed to', newValue);
    // const { containerTypeName, id } = newValue;
    // formData1.value.containerType = containerTypeName;
    // preserveId.value = id; //传递入参id
    if (newValue) {
      formData1.value.containerType = newValue.containerTypeName;
      preserveId.value = newValue.id;

      formData2.value.containerType = newValue.containerTypeName;
      // preserveId.value = newValue.id;
    }
  },
);

// ################### 物料关联 function ####################
const add = () => {
  containerVisible2.value = true;
};
</script>
