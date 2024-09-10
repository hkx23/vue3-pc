<template>
  <cmp-container :full="true" :full-sub-index="[0, 1]">
    <cmp-card>
      <cmp-container :full="true">
        <cmp-query :opts="opts" label-width="100" :bool-enter="true" :loading="loading" @submit="conditionEnter" />

        <cmp-card :ghost="true">
          <cmp-table
            ref="tableRef"
            v-model:pagination="pageUI"
            :title="tableTitle"
            row-key="id"
            :table-column="tableColumns"
            :table-data="tableData"
            :loading="loading"
            :show-pagination="usePager"
            :total="dataTotal"
            :fixed-height="true"
            :selected-row-keys="selectedRowKeys"
            @row-click="onPlanSelectChange"
            @select-change="onSelectChange"
            @refresh="fetchTable"
          >
            <!-- 头部按钮区 -->

            <!-- 行按钮区 -->

            <template #billNo="{ row }">
              <t-link theme="primary" @click="viewBill(row)"> {{ row.billNo || '-' }}</t-link>
            </template>

            <!-- <template #op="slotProps">
              <t-space :size="8">
                <t-link theme="primary" @click="onEditRow(slotProps.row)">查看日志</t-link>
                <t-popconfirm
                  theme="default"
                  :content="t('common.message.confirmDelete')"
                  @confirm="onDeleteRow(slotProps.row)"
                >
                  <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
                </t-popconfirm>
              </t-space>
            </template> -->
          </cmp-table>
        </cmp-card>
      </cmp-container>
    </cmp-card>
    <cmp-container>
      <!-- <cmp-row>
        <cmp-card :ghost="false">
          <bcmp-page-single
            ref="equipmentRelateRef"
            :page-setting="billItemSetting"
            :ghost="true"
            :relate-condition="relateCondition"
            @row-click="onItemRowClick"
          >
          </bcmp-page-single>
        </cmp-card>
        <cmp-card :ghost="false">
          <bcmp-page-single
            ref="equipmentRelateSpartRef"
            :page-setting="billItemSparePartSetting"
            :ghost="true"
            :relate-condition="relateItemCondition"
          >
          </bcmp-page-single>
        </cmp-card>
      </cmp-row> -->
      <!-- <bcmp-page-single
         
        :page-setting="mitemSetting"
        :ghost="true"
        :relate-condition="relateCondition"
      >
        <template #headerButton>
          <bcmp-import-auto-button theme="default" button-text="导入" type="m_equipment_in_mitem"></bcmp-import-auto-button>
        </template>
      </bcmp-page-single> -->
      <!-- <relate-item ref="equipmentRelateRef" :ghost="true" :relate-condition="relateCondition"> </relate-item> -->

      <!-- 弹出层 <router-view>class属性找不到根节点console警告问题=>弹出层移至内层，组件出现根节点 -->
      <t-dialog v-model:visible="viewFormVisible" :header="formTitle" width="80%" :confirm-btn="null" cancel-btn="关闭">
        <view-form ref="viewFormRef" :bill-id="currentBillId" />
      </t-dialog>
    </cmp-container>
  </cmp-container>

  <!-- 弹出层 -->
  <!-- <t-dialog v-model:visible="viewFormVisible" :header="formTitle" width="80%" :confirm-btn="null" cancel-btn="关闭">
    <view-form ref="viewFormRef" :bill-id="currentBillId" />
  </t-dialog> -->
  <!-- <t-dialog v-model:visible="formVisible" :header="formTitle" :on-confirm="onFormSubmit" :width="calculateFormWidth">
    <bcmp-dynamic-form
      ref="formRef"
      :lower-camel="true"
      :form-setting="formSetting"
      :form-data="currentFormData"
      label-width="150px"
      action-type="add"
      @change="onFormChange"
    />
  </t-dialog> -->
</template>
<script lang="ts">
export default {
  name: 'MouldRepairBill',
};
</script>
<script setup lang="ts">
import { computed, nextTick, onMounted, Ref, ref } from 'vue';

import { api } from '@/api/equipment';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import common from '@/utils/common';

import { useLang } from './lang';
// import billItemSettingJson from './setting/billItemSetting';
// import billItemSparePartSettingJson from './setting/billItemSparePartSetting';
// import relateItem from './relateItem.vue';
// import mainAddFormJson from './setting/mainAddForm.json';
// import mainEditFormJson from './setting/mainEditForm.json';
import mainSettingJson from './setting/mainSetting';
import viewForm from './viewForm.vue';

const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
// const billItemSetting: any = {
//   ...billItemSettingJson,
// };
// const billItemSparePartSetting: any = {
//   ...billItemSparePartSettingJson,
// };

const mainSetting: any = {
  ...mainSettingJson,
};

// const mitemSetting: any = {
//   ...mitemSettingJson,
// };
// 表格数据总数
const dataTotal = ref(0);
// 表格数据
const tableData = ref([]);
// 表格列配置
const tableColumns = ref([]);
// 选中行 id
const selectedRowKeys: Ref<any[]> = ref([]);

// 选中行
const onSelectChange = (value) => {
  selectedRowKeys.value = value;
};
const rowMaintenanceBillID = ref(''); // 点击行ID
// const equipmentRelateRef = ref();
const onPlanSelectChange = async ({ row }) => {
  rowMaintenanceBillID.value = row.id || row.ID;
  relateCondition.value = [
    {
      tableName: 'E_REPAIR_BILL_DTL',
      field: 'E_REPAIR_BILL_HEAD_ID',
      operator: 'eq',
      value: rowMaintenanceBillID.value,
    },
  ];
  // 等待 DOM 更新完成
  await nextTick();
  // equipmentRelateRef.value.fetchTable();
};
// const equipmentRelateSpartRef = ref();
// const rowMaintenanceBillDtlID = ref(''); // 点击行ID
// const onItemRowClick = async (row) => {
//   rowMaintenanceBillDtlID.value = row.id || row.ID;
//   relateItemCondition.value = [
//     {
//       tableName: 'E_REPAIR_BILL_DTL_SPARE_PART',
//       field: 'E_REPAIR_BILL_DTL_ID',
//       operator: 'eq',
//       value: rowMaintenanceBillDtlID.value,
//     },
//   ];
//   // 等待 DOM 更新完成
//   await nextTick();
//   // equipmentRelateSpartRef.value.fetchTable();
// };

// 查询组件
// const opts = ref({});
const opts = computed(() => {
  return {
    mouldCode: {
      label: t('repairBill.模具编码'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('repairBill.模具编码')}`]),
    },
    mouldName: {
      label: t('repairBill.模具名称'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('repairBill.模具名称')}`]),
    },
    mouldType: {
      label: t('repairBill.模具类型'),
      comp: 'bcmp-select-param',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('repairBill.模具类型')}`]),
      bind: {
        paramGroup: 'E_MOULD_TYPE',
      },
    },
    repairItemCode: {
      label: t('repairBill.故障编码'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('repairBill.故障编码')}`]),
    },
    repairItemDesc: {
      label: t('repairBill.故障描述'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('repairBill.故障描述')}`]),
    },
    timeCreate: {
      label: t('repairBill.报障日期范围'),
      comp: 't-date-range-picker',
      bind: {
        enableTimePicker: true,
        allowInput: true,
        clearable: true,
      },
      defaultVal: ['', ''],
    },
  };
});
// 查询条件处理数据
const filterList = ref([]) as any;
// 表格标题
const tableTitle = ref('模具维修单据');
// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  filterList.value = [];
  for (const key in data) {
    if (data[key] != null && data[key] !== '') {
      const addFilter = {
        tableName: datasourceName.value,
        field: key,
        operator: searchSettings.value.find((item: any) => item.field === key)?.operator || 'like',
        value: data[key],
      };
      filterList.value.push(addFilter);
    }
  }

  fetchTable();
};
// 加载数据表格
const fetchTable = async () => {
  setLoading(true);
  try {
    // 查询条件
    const searchCondition = {
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      filters: filterList.value,
      relateType: 'mould',
    };
    const res: any = await api.repairBillHead.search(searchCondition);
    tableData.value = res.list; // 表格数据赋值
    dataTotal.value = res.total; // 总页数赋值
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 数据源类型
const settingObject = ref();
const datasourceName = ref('E_REPAIR_BILL_HEAD');
const selectedFields = ref([]);
const searchSettings = ref([]);
const usePager = ref(true);
const relateCondition = ref([
  {
    tableName: 'E_REPAIR_BILL_DTL',
    field: 'E_REPAIR_BILL_HEAD_ID',
    operator: 'eq',
    value: '-1',
  },
]);
// const relateItemCondition = ref([
//   {
//     tableName: 'E_REPAIR_BILL_DTL_SPARE_PART',
//     field: 'E_REPAIR_BILL_DTL_ID',
//     operator: 'eq',
//     value: '-1',
//   },
// ]);

const loadSetting = async () => {
  const res = mainSetting;
  settingObject.value = res;
  // 获取主要信息
  tableTitle.value = res.tableSetting.tableTitle;
  usePager.value = res.tableSetting.usePage;
  // 获取表格里面的field字段
  selectedFields.value = res.tableSetting.columnSetting.map((column) => ({
    tableName: column.tableName, // 假设column对象中有tableName属性
    fieldName: common.toLowerCamelCase(column.columnName), // 或者是fieldName，取决于你的实际属性名
  }));
  if (usePager.value) {
    pageUI.value.rows = res.tableSetting.pageSize || 20;
  } else {
    pageUI.value.rows = 99999;
  }
  const tableColumnSetting = res.tableSetting.columnSetting.map((column) => ({
    colKey: common.toLowerCamelCase(column.columnName), // 列绑定的字段名
    title: column.columnDesc || column.columnName, // 列显示的标题，默认使用columnDesc，不存在则使用columnName
    align: column.align, // 对齐方式
    width: column.isAutoWidth ? 'auto' : column.columnWidth, // 列宽
    fixed: determineFixed(column.isLeftFixed, column.isRightFixed), // 是否固定列
    showOverflowTooltip: !column.isAutoWidth, // 是否开启文本溢出 tooltip，如果autoWidth为true，则可能不需要此配置
    isShow: column.isVisible, // 是否显示该列
    componentSource: column.componentSource,
  }));

  // tableColumnSetting.push({
  //   colKey: 'op',
  //   title: '操作',
  //   align: 'center',
  //   fixed: 'right',
  //   width: '130',
  //   isShow: true,
  //   showOverflowTooltip: true,
  // });

  tableColumnSetting.forEach((column: any) => {
    if (column.colKey !== 'op') {
      if (column.componentSource) {
        column.cell = (h, { row }) => {
          // 判断column的componentSource不为空
          return h(
            'span',
            {},
            column.componentSource.customDict.dicData.find((item) => item.value === row[column.colKey].toString())
              ?.label,
          );
        };
      }
    }
  });
  // 过滤isShow为true的数据,作为表格的列配置
  tableColumns.value = tableColumnSetting.filter((column) => column.isShow);
  conditionEnter(null);
};

// 获取固定左右的配置
const determineFixed = (isLeftFixed, isRightFixed) => {
  if (isLeftFixed) return 'left';
  if (isRightFixed) return 'right';
  return '';
};

// 模具查看窗口
const viewFormVisible = ref(false);
const formTitle = ref('模具维修单据查看');
const currentBillId = ref('');
const viewBill = async (row) => {
  currentBillId.value = row.id;
  viewFormVisible.value = true;
  await nextTick();
  // viewBillRef.value.fetchTable();
};

// 渲染函数
onMounted(() => {
  loadSetting();
});
</script>
<style lang="less" scoped>
:deep(.t-form__controls-content) {
  .t-date-picker,
  .t-input-number,
  .t-color-picker__trigger {
    width: 100%;
  }
}
</style>
./setting/mainSetting
