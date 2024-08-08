<template>
  <cmp-container :full="true">
    <cmp-card :span="12" :ghost="ghost">
      <cmp-query :opts="opts" label-width="100" :bool-enter="true" :loading="loading" @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :ghost="ghost">
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
        @select-change="onSelectChange"
        @refresh="fetchTable"
      >
        <!-- 头部按钮区 -->
        <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddClick()"> 新增 </t-button>
          </t-space>
        </template>

        <template #mouldTypeName="{ row }">
          {{ row.mouldTypeName || '-' }}
        </template>

        <template #mouldCode="{ row }">
          {{ row.mouldCode || '-' }}
        </template>
        <template #mouldName="{ row }">
          {{ row.mouldName || '-' }}
        </template>

        <!-- 行按钮区 -->
        <template #op="slotProps">
          <t-space :size="8">
            <!-- <t-link theme="primary" @click="onEditRow(slotProps.row)">{{ t('common.button.edit') }}</t-link> -->
            <t-popconfirm
              theme="default"
              :content="t('common.message.confirmDelete')"
              @confirm="onDeleteRow(slotProps.row)"
            >
              <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- 弹出层 -->
  <t-dialog v-model:visible="formVisible" :header="formTitle" :on-confirm="onFormSubmit" :width="calculateFormWidth">
    <relate-item-add-form ref="addFormRef" :plan-id="currentPlanId" />
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'RelateMould',
};
</script>
<script setup lang="ts">
import _ from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, Ref, ref } from 'vue';

import { api } from '@/api/equipment';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import common from '@/utils/common';

import { useLang } from './lang';
import relateItemAddForm from './relateItemAddForm.vue';
import tableSettingJson from './setting/relateTableSetting.json';

const props = defineProps({
  // 组件展示类型

  ghost: {
    type: [Boolean],
    default: false,
  },
  relateCondition: {
    type: [Array],
    default() {
      return [];
    },
  },
});
const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const mainSetting: any = {
  ...tableSettingJson,
};

const addFormRef = ref();
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
// 查询组件
// const opts = ref({});
const opts = computed(() => {
  return {
    keyWord: {
      label: t('maintenancePlan.保养项目'),
      placeholder: t('common.placeholder.input', [`${t('maintenancePlan.保养项目编码或名称')}`]),
      comp: 't-input',
      defaultVal: '',
    },
  };
});
// 查询条件处理数据
const filterList = ref([]) as any;
// 表格标题
const tableTitle = ref('模具保养项目信息');
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
    const finalFilterList: any = [];
    const relateConditons = _.cloneDeep(props.relateCondition);
    // 将field 属性转换为小写驼峰形式
    relateConditons.forEach((item: any) => {
      item.field = common.toLowerCamelCase(item.field);
    });

    finalFilterList.push(...(relateConditons || []));
    finalFilterList.push(...(filterList.value || []));
    // 查询条件
    const searchCondition = {
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      filters: finalFilterList,
    };
    const res: any = await api.maintenancePlanItem.search(searchCondition);
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
const datasourceName = ref('m_mould');
const selectedFields = ref([]);
const searchSettings = ref([]);
const usePager = ref(true);

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
  tableColumnSetting.push({
    colKey: 'op',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '130',
    isShow: true,
    showOverflowTooltip: true,
  });
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

const formVisible = ref(false);
// const currentFormData = ref({});
const formAction = ref('add');

// 计算窗口宽度
const calculateFormWidth = computed(() => {
  // const inputWidth = 270; // 假设调整后的输入框宽度
  // const labelWidth = 120;
  // const margin = 16;
  // const gap = 2;
  // const columnGap = 12;
  // if (relateAddFormJson.formColumnSetting.length < 6) {
  //   return `${inputWidth + labelWidth + margin * 2 + gap}px`;
  // }
  // if (relateAddFormJson.formColumnSetting.length >= 6 && relateAddFormJson.formColumnSetting.length < 16) {
  //   return `${inputWidth * 2 + labelWidth * 2 + margin * 2 + columnGap + gap}px`;
  // }
  return '50%';
});

const currentPlanId = ref('');
// 点击添加按钮逻辑
const onAddClick = () => {
  formAction.value = 'add';
  const relateConditons = _.cloneDeep(props.relateCondition);
  if (relateConditons && relateConditons.length > 0) {
    const selectItem: any = relateConditons.find((item: any) => item.field === 'e_maintenance_plan_id');
    if (selectItem.value === '-1') {
      MessagePlugin.warning('请先选择保养计划');
      return;
    }
    // 从relateConditons找到字段值为e_maintenance_plan_id的项目,取值
    currentPlanId.value = selectItem.value;
    formVisible.value = true;
  } else {
    MessagePlugin.warning('请先选择保养计划');
  }
};

// 单个数据实现删除逻辑
const onDeleteRow = async (row: any) => {
  const deleteModel = [row.id];
  await api.maintenancePlanItem.removeItemsById(deleteModel);
  fetchTable();
  addFormRef.value.getItemList();
};

const formTitle = computed(() => {
  return formAction.value === 'edit' ? '编辑' : '新增';
});

// 编辑表单提交
const onFormSubmit = async () => {
  const selectItemIds = addFormRef.value.getSelectItems();
  if (selectItemIds.length === 0) {
    MessagePlugin.warning('青选择保养项目');
    return;
  }
  const postData = {
    maintenancePlanId: currentPlanId.value,
    maintenanceItemIds: selectItemIds,
  };

  try {
    // 新增
    await api.maintenancePlanItem.batchAdd(postData);
    // 第二步：提交数据
    // await api.mould.updateItemByCode(formRef.value.getFormData());
    MessagePlugin.success('提交成功');
    formVisible.value = false;
    fetchTable();
    addFormRef.value.getItemList();
  } catch (e) {
    console.log(e);
  }
};

// 渲染函数
onMounted(() => {
  loadSetting();
});
// 暴露方法出去
defineExpose({ fetchTable, conditionEnter });
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
