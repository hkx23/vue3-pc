<template>
  <t-tabs v-model="activeTab">
    <!-- 默认插槽 和 具名插槽（panel）用来渲染面板内容 -->
    <t-tab-panel value="tab1" label="容器" :destroy-on-hide="false">
      <t-card>
        <cmp-query ref="queryComponent" :opts="optsContainer1" :bool-enter="false" @submit="onInput"> </cmp-query>
      </t-card>
      <!-- cmp-table 表格组件  -->
      <cmp-table
        v-model:pagination="pageUI"
        v-model:selected-row-keys="selectedRowKeys"
        row-key="id"
        :table-column="tableContainerColumns1"
        :table-data="tableContainerData1"
        :total="dataTotal1"
        :loading="loading"
        empty="没有符合条件的数据"
      >
        <template #button>
          <!-- <t-button theme="primary">新增</t-button> -->
          <!-- <t-button v-if="props.selectedRowData" theme="primary" @click="generate">生成</t-button> -->
          <t-button
            v-if="props.selectedRowData && Object.keys(props.selectedRowData).length > 0"
            theme="primary"
            @click="generate"
            >生成</t-button
          >

          <t-button theme="primary">打印</t-button>
          <t-button theme="primary" @click="onStateRowClick1">作废</t-button>
        </template>

        <!-- 定义序号列的插槽 -->
        <template #indexSlot="{ rowIndex }">
          {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
        </template>
      </cmp-table>
    </t-tab-panel>

    <!-- ######### 物料关联 ######## -->
    <t-tab-panel value="tab2" label="物料关联" :destroy-on-hide="false">
      <t-card>
        <cmp-query ref="queryComponent" :opts="optsContainer2" :bool-enter="false" @submit="onInput2"> </cmp-query>
      </t-card>
      <!-- cmp-table 表格组件  -->
      <cmp-table
        v-model:pagination="pageUI"
        v-model:selected-row-keys="selectedRowKeys2"
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
          <t-button theme="primary" @click="onRemoveRowClick2">删除</t-button>
        </template>

        <!-- 定义序号列的插槽 -->
        <template #indexSlot="{ rowIndex }">
          {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
        </template>
        <!-- 编辑2 -->
        <template #op2="row">
          <t-space>
            <t-link variant="text" theme="primary" name="edit" @click="onEditRowClick2(row)">编辑</t-link>
            <!-- -->
            <t-popconfirm theme="default" content="确认删除吗" @confirm="() => onRowClick(row)">
              <t-link theme="primary"> 删除 </t-link>
            </t-popconfirm>
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

  <!-- 弹窗2  :footer="false"  todo-->
  <t-dialog v-model:visible="containerVisible2" :footer="false" :close-on-overlay-click="false" :header="diaTilte">
    <t-form :data="formData2" label-width="110px" :rules="rules2" @submit="submit2" @reset="cancel2">
      <t-form-item label="容器类型" name="containerType">
        <t-input v-model="formData2.containerType"></t-input>
      </t-form-item>
      <!-- v-if="diaTilte === '新增容器类型与物料关系'"  -->
      <t-form-item label="物料类别" name="mitemCategoryId">
        <bcmp-select-business
          v-model="formData2.mitemCategoryId"
          :is-multiple="false"
          :show-title="false"
          type="mitemCategory"
          label-field="categoryName"
          @selection-change="SelectionChange1"
        ></bcmp-select-business>
      </t-form-item>
      <!-- 
      <t-form-item label="物料类别" name="mitemCategoryId">
        <t-input v-model="formData2.mitemCategoryId"></t-input>
      </t-form-item> -->

      <t-form-item label="物料类别编码" name="mitemCategoryId">
        <t-input v-model="formData2.categoryCode"></t-input>
      </t-form-item>

      <t-form-item label="物料名称" name="mitemId">
        <bcmp-select-business
          v-model="formData2.mitemId"
          :is-multiple="false"
          :show-title="false"
          type="mitem"
          @selection-change="SelectionChange2"
        ></bcmp-select-business>
      </t-form-item>

      <t-form-item label="物料编码" name="mitemId">
        <t-input v-model="formData2.mitemCode"></t-input>
      </t-form-item>

      <t-form-item label="标准数量" name="qty">
        <t-input v-model="formData2.qty" :min="1" :max="100"></t-input>
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
const PrintTmpReslutDataOptions = ref([]); // 打印规则下拉数据
const preserveId = ref(''); // 入参id
const selectedRowKeys = ref([]); // 批量作废
const selectedRowKeys2 = ref([]); // 批量删除

const formData1 = ref({
  containerType: '',
  barcodeRuleId: '',
  createNum: 1,
});
const diaTilte = ref('');

const formData2 = ref({
  containerType: '', // 容器类型
  containerTypeId: '',
  mitemCategoryId: '', // 物料类别编码
  categoryCode: '',
  mitemId: '', // 物料ID
  mitemCode: '',
  qty: 1,
  mitemCategoryCode: '',
});

// 校验规则1
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
// 校验规则2
const rules2: FormRules<Data> = {
  containerType: [
    {
      required: true,
      message: '请输入容器类型',
      trigger: 'blur',
    },
  ],
  // mitemCategoryId: [
  //   {
  //     required: true,
  //     message: '请输入物料类别',
  //     trigger: 'blur',
  //   },
  // ],
  // containerTypeId: [
  //   {
  //     required: true,
  //     message: '请输入物料类别编码',
  //     trigger: 'blur',
  //   },
  // ],
  mitemId: [
    {
      required: true,
      message: '请输入物料名称',
      trigger: 'blur',
    },
  ],
  qty: [
    {
      required: true,
      message: '请输入标准数量',
      trigger: 'blur',
    },
  ],
};

const optsContainer1 = computed(() => {
  return {
    status: {
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
    // todo
    containerTypeId: {
      label: '打印模板',
      labelWidth: '20',
      event: 'select',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: PrintTmpReslutDataOptions.value,
        clearable: true,
      },
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
  { title: '序号', colKey: 'index', width: 65, cell: 'indexSlot' },
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
  await getBarcodeRuleList();
  await getcontainerType();
  await getPrintTmplList(); // 打印模板
  await fetchTable2({});
});

// 打印模板
const getPrintTmplList = async () => {
  const PrintTmpReslut = await api.container.getPrintTmplList();
  console.log('🚀 ~ getPrintTmplList ~ PrintTmpReslut:', PrintTmpReslut); // [] todo
  PrintTmpReslutDataOptions.value = PrintTmpReslut;
};

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
  const { containerTypeId, status, keyword } = data;
  // let status = Array.isArray(state) ? state : [state];
  if (!data.value) {
    const result = await api.container.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      containerTypeId,
      status,
      keyword,
    });
    tableContainerData1.value = result.list;
    dataTotal1.value = result.total;
  }
  setLoading(false);
};
//* 查询2
const onInput2 = async (data: any) => {
  setLoading(true);
  const { containerTypeId, state, keyword } = data;
  if (!data.value) {
    const result = await api.containerInMitem.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      keyword,
      state,
      containerTypeId,
    });
    tableContainerData2.value = result.list;
    dataTotal2.value = result.total;
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
  console.log('🚀 ~ fetchTable2 ~ data:', data);
  setLoading(true);
  if (!data.value) {
    const result = await api.containerInMitem.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      containerTypeId: data,
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
  MessagePlugin.success('生成成功');
  fetchTable({});
};

// 打印
// const print = () => {
//  const reslutPrin =  api.container.printBarcode({
//   ids:'',
//  })  //todo
// };

// 编辑
const onEditRowClick2 = async ({ row }) => {
  console.log('🚀 ~ onEditRowClick2 ~ row:', row);
  diaTilte.value = '编辑容器类型与物料关系';
  containerVisible2.value = true;
  formData2.value = {
    ...formData2.value,
    mitemCategoryId: row.mitemCategoryId, // 编辑不需要修改  todo
    mitemId: row.mitemId,
    qty: row.qty,
  };
};

// 单个删除
const onRowClick = async (row: { row: any }) => {
  console.log('🚀 ~ onRowClick ~ id:', row.row.id);
  try {
    // 等待删除操作完成  将单个ID包装成数组
    const idsToDelete = [row.row.id];
    await api.containerInMitem.removeBatch(idsToDelete);
    if (tableContainerData2.value.length <= 1 && pageUI.value.page > 1) {
      pageUI.value.page--;
    }
    // 删除操作成功，现在调用 fetchTable
    await MessagePlugin.success('删除成功!');
    await fetchTable2({}); // 刷新表格数据
  } catch (error) {
    console.error('删除失败:', error);
  }
};

// 批量作废
const onStateRowClick1 = async () => {
  try {
    // 等待删除操作完成
    await api.container.removeBatch(selectedRowKeys.value);
    // 删除操作成功，现在调用 fetchTable
    await MessagePlugin.success('批量作废成功!');
    await fetchTable({}); // 刷新表格数据
  } catch (error) {
    console.error('作废失败:', error);
  }
};
// 批量删除  todo
// const onRemoveRowClick2 = async () => {
//   try {
//     // 等待删除操作完成
//     await api.containerInMitem.removeBatch(selectedRowKeys2.value);
//     // 删除操作成功，现在调用 fetchTable
//     await MessagePlugin.success('批量删除成功!');
//     await fetchTable2({}); // 刷新表格数据
//   } catch (error) {
//     console.error('删除失败:', error);
//   }
// };

// 批量删除
const onRemoveRowClick2 = async () => {
  // 检查是否所有选中的容器都可以删除
  const canDelete = selectedRowKeys2.value.every((key) => {
    const container = tableContainerData2.value.find((c) => c.id === key);
    return container && container.status !== '使用中' && container.status !== '已入库' && container.status !== '已出库';
  });

  if (!canDelete) {
    MessagePlugin.error('选中的容器中存在不允许删除的状态（使用中、已入库、已出库），请重新选择！');
    return;
  }

  try {
    // 等待删除操作完成
    await api.containerInMitem.removeBatch(selectedRowKeys2.value);

    // 更新状态为“作废”
    selectedRowKeys2.value.forEach((key) => {
      const container = tableContainerData2.value.find((c) => c.id === key);
      if (container) {
        container.status = '作废'; // 或其他表示作废的状态
      }
    });

    // 删除操作成功，刷新表格数据
    await MessagePlugin.success('批量删除成功!');
    await fetchTable2({});
  } catch (error) {
    console.error('删除失败:', error);
  }
};

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
// 取消
const cancel2 = () => {
  // 重置表单项，但保留 containerType 字段的值
  // formData2.value = {
  // ...formData2.value, // 保留当前表单的值
  //   mitemCategoryId: '', // 清空物料类别编码
  //   mitemId: '', // 清空物料ID
  //   qty: 1, // 重置标准数量为1
  //   mitemCategoryCode: '', // 清空物料类别编码
  //   categoryCode: '', // 清空物料类别编码
  //   mitemCode: '', // 清空物料编码
  // };

  containerVisible2.value = false;
  MessagePlugin.success('已取消');
};
const activeTab = ref('tab1');

defineExpose({
  fetchTable,
  fetchTable2,
});

/**
 * preserveId.value = id 传递入参id
 * 绑定新增时获取的默认值
 */
watch(
  () => props.selectedRowData,
  (newValue) => {
    if (newValue) {
      const result = newValue.containerTypeName;
      formData1.value.containerType = result;
      preserveId.value = newValue.id;
      formData2.value.containerType = result;
    }
  },
);

// ################### 物料关联 function ####################

// 显示  code
const SelectionChange1 = (item) => {
  formData2.value.categoryCode = item.categoryCode;
};

const SelectionChange2 = (item) => {
  formData2.value.mitemCode = item.mitemCode;
};
const add = () => {
  diaTilte.value = '新增容器类型与物料关系';
  containerVisible2.value = true;
  // 重置表单项，但保留 containerType 字段的值
  formData2.value = {
    ...formData2.value, // 展开左侧表传来的值
    mitemCategoryId: '', // 物料类别编码
    mitemId: '', // 物料ID
    qty: 1, // 标准数量
    mitemCategoryCode: '', // 物料类别编码
  };
};

const submit2 = async () => {
  // 创建提交的数据对象  todo
  const submitData2 = {
    // containerType: formData2.value.containerType, // todo  不传 主表带过来
    containerTypeId: preserveId.value,
    mitemCategoryId: formData2.value.mitemCategoryId,
    mitemId: formData2.value.mitemId,
    qty: formData2.value.qty,
  };
  await api.containerInMitem.add(submitData2);
  containerVisible2.value = false;
  MessagePlugin.success('新增成功');
  fetchTable2({});
};
</script>
