<template>
  <t-tabs v-model="activeTab">
    <!-- 默认插槽 和 具名插槽（panel）用来渲染面板内容 -->
    <t-tab-panel value="tab1" label="容器" :destroy-on-hide="false">
      <cmp-container :full="true">
        <t-card :span="12">
          <cmp-query ref="queryComponent" :opts="optsContainer1" :bool-enter="false" @submit="onInput"> </cmp-query>
        </t-card>
        <!-- cmp-table 表格组件  -->
        <cmp-table
          v-model:pagination="pageUI"
          v-model:selected-row-keys="selectedRowKeys"
          row-key="id"
          :table-column="tableContainerColumns1"
          :table-data="tableContainerData1"
          select-on-row-click
          :fixed-height="true"
          :total="dataTotal1"
          :loading="loading"
          style="height: 400px"
          empty="没有符合条件的数据"
          @select-change="handleRowSelectChange"
        >
          <template #title>
            {{ '容器' }}
          </template>
          <template #button>
            <t-space :size="8">
              <t-select label="打印模板" clearable>
                <t-option
                  v-for="item in PrintTmpReslutDataOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.value"
                >
                </t-option>
              </t-select>
              <!-- 选中数据再显示生成 -->
              <t-button
                v-if="props.selectedRowData && Object.keys(props.selectedRowData).length > 0"
                theme="primary"
                @click="generate"
                >生成</t-button
              >
              <!-- 批量打印 -->
              <t-popconfirm theme="default" content="确认批量打印吗" @confirm="print()">
                <t-button theme="default"> 批量打印 </t-button>
              </t-popconfirm>
              <!-- 批量作废 -->
              <t-popconfirm theme="default" content="确认批量作废吗" @confirm="onStateRowClick1()">
                <t-button theme="default"> 批量作废 </t-button>
              </t-popconfirm>
            </t-space>
          </template>

          <!-- 定义序号列的插槽 -->
          <!-- <template #indexSlot="{ rowIndex }">
            {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
          </template> -->
        </cmp-table>
      </cmp-container>
    </t-tab-panel>

    <!-- ######### 物料关联 ######## -->
    <t-tab-panel value="tab2" label="物料关联" :destroy-on-hide="false">
      <cmp-container :full="true">
        <div class="tableSytle">
          <t-card :span="12">
            <cmp-query ref="queryComponent" :opts="optsContainer2" :bool-enter="false" @submit="onInput2"> </cmp-query>
          </t-card>

          <!-- cmp-table 表格组件  -->
          <cmp-table
            v-model:pagination="pageUI"
            v-model:selected-row-keys="selectedRowKeys2"
            row-key="id"
            :table-column="tableContainerColumns2"
            :table-data="tableContainerData2"
            select-on-row-click
            :total="dataTotal2"
            :fixed-height="true"
            empty="没有符合条件的数据"
            style="height: 400px"
          >
            <template #title>
              {{ '物料关联' }}
            </template>

            <template #button>
              <t-space :size="8">
                <t-button theme="primary" @click="add">新增</t-button>
                <!-- <t-button theme="primary" @click="generate">生成</t-button> -->
                <!--   -->
                <!-- <t-button theme="primary">打印</t-button> -->
                <t-popconfirm theme="default" content="确认删除吗" @confirm="onRemoveRowClick2()">
                  <t-button theme="default"> 批量删除 </t-button>
                </t-popconfirm>
              </t-space>
            </template>

            <!-- 定义序号列的插槽 -->
            <!-- <template #indexSlot="{ rowIndex }">
            {{ (pageUI.page - 1) * pageUI.rows + rowIndex + 1 }}
          </template> -->
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
        </div>
      </cmp-container>
    </t-tab-panel>
  </t-tabs>

  <!-- 弹窗1 -->
  <t-dialog v-model:visible="containerVisible1" :close-on-overlay-click="false" header="容器条码生成">
    <t-form :data="formData1" label-width="110px" :rules="rules">
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
    </t-form>
    <!-- <div class="dialog-footer1">
      <t-button theme="primary" @click="cancel">取消</t-button>
      <t-button theme="primary" @click="submit1">确认</t-button>
    </div> -->
    <template #footer>
      <t-button theme="default" variant="base" @click="cancel">取消</t-button>
      <t-button theme="primary" @click="submit1">提交</t-button>
    </template>
  </t-dialog>

  <!-- 弹窗2  容器类型 :footer="false"  todo-->
  <t-dialog v-model:visible="containerVisible2" :close-on-overlay-click="false" :header="diaTilte">
    <t-form :data="formData2" label-width="110px" :rules="rules2">
      <t-form-item label="容器类型" name="containerType">
        <t-input v-model="formData2.containerType" disabled></t-input>
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
        <t-select v-model="formData2.categoryCode" disabled></t-select>
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
        <t-select v-model="formData2.mitemCode" disabled></t-select>
      </t-form-item>

      <t-form-item label="标准数量" name="qty">
        <t-input-number v-model="formData2.qty" :min="1" :max="100"></t-input-number>
      </t-form-item>
    </t-form>
    <template #footer>
      <t-button theme="default" variant="base" @click="cancel2">取消</t-button>
      <t-button theme="primary" @click="submit2">提交</t-button>
    </template>
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
      trigger: 'change',
    },
  ],
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
  mitemCategoryId: [
    {
      required: true,
      message: '请选择物料类别',
      trigger: 'change',
    },
  ],
  categoryCode: [
    {
      required: true,
      message: '请输入物料类别编码',
      trigger: 'change',
    },
  ],
  mitemId: [
    {
      required: true,
      message: '请选择物料名称',
      trigger: 'change',
    },
  ],
  mitemCode: [
    {
      required: true,
      message: '请输入物料编码',
      trigger: 'change',
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
    // containerTypeId: {
    //   label: '打印模板',
    //   labelWidth: '20',
    //   event: 'select',
    //   comp: 't-select',
    //   defaultVal: '',
    //   bind: {
    //     options: PrintTmpReslutDataOptions.value,
    //     clearable: true,
    //   },
    // },
  };
});

const optsContainer2 = computed(() => {
  return {
    keyword: {
      label: '物料编码/名称',
      labelWidth: '20',
      event: 'input',
      comp: 't-input',
      defaultVal: '',
    },
  };
});

const tableContainerColumns1: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '容器条码', colKey: 'containerCode', width: 100 },
  { title: '容器名称', width: 100, colKey: 'containerName' },
  { title: '状态', width: 80, colKey: 'statusName' },
];

const tableContainerColumns2: PrimaryTableCol<TableRowData>[] = [
  { colKey: 'row-select', width: 40, type: 'multiple', fixed: 'left' },
  { title: '物料类别', colKey: 'categoryCode', width: 80 },
  { title: '物料类别名称', width: 80, colKey: 'categoryName' },
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
  // await fetchTable2(props.propsId);
});

// 打印模板
const getPrintTmplList = async () => {
  const PrintTmpReslut = await api.container.getPrintTmplList();
  PrintTmpReslutDataOptions.value = PrintTmpReslut.map((item) => ({
    label: item.tmplName,
    value: item.id,
  }));
};

const multipleId = ref([]); // 接口入参
const handleRowSelectChange = (value: any[]) => {
  if (value.length > 0) {
    multipleId.value = value;
  }
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
const inventoryManagement1 = ref([]);
const onInput = async (data: any) => {
  // 检查是否选中了主表的某一项
  if (!props.propsId || props.propsId === '') {
    MessagePlugin.warning('请先选中主表数据');
    return; // 如果没有选中，则终止函数执行
  }
  pageUI.value.page = 1;
  setLoading(true);
  inventoryManagement1.value = [];
  tableContainerData1.value = [];
  const { status, keyword } = data;
  if (!data.value) {
    const result = await api.container.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      containerTypeId: props.propsId, // 查询时必须传左侧主表选中的id
      status,
      keyword,
    });
    tableContainerData1.value = result.list;
    dataTotal1.value = result.total;
  }
  setLoading(false);
};
//* 查询2
const inventoryManagement2 = ref([]);
const onInput2 = async (data: any) => {
  // 检查是否选中了主表的某一项
  if (!props.propsId || props.propsId === '') {
    MessagePlugin.warning('请先选中主表数据');
    return; // 如果没有选中，则终止函数执行
  }
  setLoading(true);
  pageUI.value.page = 1;
  inventoryManagement2.value = [];
  tableContainerData2.value = [];
  const { state, keyword } = data;
  if (!data.value) {
    const result = await api.containerInMitem.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      keyword,
      state,
      containerTypeId: props.propsId, // 查询时必须传左侧主表选中的id
    });
    tableContainerData2.value = result.list;
    dataTotal2.value = result.total;
  }
};

// 父调子fn
/* * data 主表接口 的id 查右侧的数据 */
const fetchTable = async (data: any) => {
  setLoading(true);
  inventoryManagement1.value = [];
  tableContainerData1.value = [];
  if (!data.value) {
    const result = await api.container.getList({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      containerTypeId: data, // containerTypeId 必传
    });
    tableContainerData1.value = result.list;
    dataTotal1.value = result.total;
  }
  setLoading(false);
};

// fetchTable 物料关联
const fetchTable2 = async (data: any) => {
  inventoryManagement2.value = [];
  tableContainerData2.value = [];
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
  fetchTable(props.propsId); // 传主表id 防呆
  MessagePlugin.success('生成成功');
};

/** 打印
 * 检查所选行中是否有任何行处于“作废”状态
 * 如果所有选中行均为非作废状态，执行打印逻辑
 */
const print = async () => {
  selectedRowKeys.value.some(async (key) => {
    const rowData = tableContainerData1.value.find((row) => row.id === key);
    if (rowData.statusName === '已作废') {
      MessagePlugin.error('无法打印，选中行中包含作废状态的数据！');
      return;
    }
    try {
      await api.container.printBarcode(multipleId.value);
      await MessagePlugin.success('打印成功');
      await fetchTable(props.propsId); // 传主表id 防呆
    } catch (error) {
      console.error('打印失败:', error);
    }
  });
};

const rowId = ref('');
// 编辑
const onEditRowClick2 = async ({ row }) => {
  rowId.value = row.id; // 编辑时传行id
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
  try {
    const idsToDelete = [row.row.id];
    await api.containerInMitem.removeBatch(idsToDelete);
    if (tableContainerData2.value.length <= 1 && pageUI.value.page > 1) {
      pageUI.value.page--;
    }
    await fetchTable2(props.propsId);
    await MessagePlugin.success('删除成功!');
  } catch (error) {
    console.error('删除失败:', error);
  }
};

/** 批量作废
 *
 */
const onStateRowClick1 = async () => {
  selectedRowKeys.value.some(async (key) => {
    const rowData = tableContainerData1.value.find((row) => row.id === key);
    try {
      if (
        rowData.statusName === '使用中' ||
        rowData.statusName === '已入库' ||
        rowData.statusName === '已出库' ||
        rowData.statusName === '已作废'
      ) {
        MessagePlugin.error('无法作废，选中行中包含已入库、使用中、已出库、已作废的数据！');
        return;
      }
      await api.container.removeBatch(selectedRowKeys.value);
      await MessagePlugin.success('作废成功!');
      await fetchTable(props.propsId); // 传主表id 防呆
    } catch (error) {
      console.error('作废失败:', error);
    }
  });
};

// 批量删除 todo
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
    await fetchTable2(props.propsId);
    await MessagePlugin.success('批量删除成功!');
  } catch (error) {
    console.error('删除失败:', error);
  }
};

// 生成
const generate = () => {
  containerVisible1.value = true;
  // 清空数据
  formData1.value = {
    containerType: formData1.value.containerType,
    barcodeRuleId: '',
    createNum: 1,
  };
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
  // *提交时校验
  const fieldsToValidate = [
    { field: formData2.value.containerType, message: '请选择容器类型' },
    { field: formData2.value.mitemCategoryId, message: '请选择容器类别' },
    { field: formData2.value.mitemId, message: '请选择物料名称' },
  ];
  for (const field of fieldsToValidate) {
    if (isEmpty(field.field)) {
      MessagePlugin.error(field.message);
      return;
    }
  }
  // 创建提交的数据对象
  const submitData2 = {
    containerTypeId: preserveId.value,
    mitemCategoryId: formData2.value.mitemCategoryId,
    mitemId: formData2.value.mitemId,
    qty: formData2.value.qty,
  };
  if (diaTilte.value === '新增容器类型与物料关系') {
    await api.containerInMitem.add(submitData2);
    containerVisible2.value = false;
    fetchTable2(props.propsId);
    MessagePlugin.success('新增成功');
  } else {
    await api.containerInMitem.modify({
      ...submitData2,
      id: rowId.value,
    });
    containerVisible2.value = false;
    fetchTable2(props.propsId);
    MessagePlugin.success('编辑成功');
  }
  // 清空数据  todo
  formData2.value = {
    ...formData2.value, // 展开左侧表传来的值
    mitemCategoryId: '', // 物料类别编码
    mitemId: '', // 物料ID
    qty: 1, // 标准数量
    mitemCategoryCode: '', // 物料类别编码
  };
};
</script>

<style scoped lang="less">
.tableSytle {
  width: 81%;
}
</style>
