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

            <template #state="{ row }">
              <t-popconfirm
                :content="
                  row.state == 0 ? t('maintenancePlan.是否确认启用计划') : t('maintenancePlan.是否确认禁用计划')
                "
                @confirm="onRowStateChange(row)"
              >
                <t-switch :custom-value="[1, 0]" :value="row.state" :default-value="row.state" size="large"></t-switch>
                <!-- <t-link theme="primary">{{ row.state == 0 ? t('user.enable') : t('user.disable') }}</t-link> -->
              </t-popconfirm>
            </template>
            <template #button>
              <t-space :size="8">
                <t-button theme="primary" @click="onAddClick()"> 新增 </t-button>
              </t-space>
            </template>

            <!-- 行按钮区 -->
            <template #op="slotProps">
              <t-space :size="8">
                <t-link theme="primary" @click="onEditRow(slotProps.row)">{{ t('common.button.edit') }}</t-link>
                <!-- <t-popconfirm
                  theme="default"
                  :content="t('common.message.confirmDelete')"
                  @confirm="onDeleteRow(slotProps.row)"
                >
                  <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
                </t-popconfirm> -->
              </t-space>
            </template>
          </cmp-table>
        </cmp-card>
      </cmp-container>
    </cmp-card>
    <cmp-card>
      <!-- <bcmp-page-single
         
        :page-setting="mitemSetting"
        :ghost="true"
        :relate-condition="relateCondition"
      >
        <template #headerButton>
          <bcmp-import-auto-button theme="default" button-text="导入" type="m_mould_in_mitem"></bcmp-import-auto-button>
        </template>
      </bcmp-page-single> -->
      <relate-item ref="mouldRelateRef" :ghost="true" :relate-condition="relateCondition"> </relate-item>
    </cmp-card>
  </cmp-container>

  <!-- 弹出层 -->
  <t-dialog v-model:visible="formVisible" :header="formTitle" :on-confirm="onFormSubmit" :width="calculateFormWidth">
    <bcmp-dynamic-form
      ref="formRef"
      :lower-camel="true"
      :form-setting="formSetting"
      :form-data="currentFormData"
      label-width="150px"
      action-type="add"
      @change="onFormChange"
    />
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'MouldmaintenancePlan',
};
</script>
<script setup lang="ts">
import _, { cloneDeep, isEqual } from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, Ref, ref } from 'vue';

import { api } from '@/api/equipment';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import common from '@/utils/common';

import { useLang } from './lang';
import relateItem from './relateItem.vue';
import mainAddFormJson from './setting/mainAddForm';
import mainEditFormJson from './setting/mainEditForm';
import mainSettingJson from './setting/mainSetting';

const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const formSetting: any = ref({});
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
const rowmaintenancePlanId = ref(''); // 点击行ID
const mouldRelateRef = ref();
const onPlanSelectChange = async ({ row }) => {
  rowmaintenancePlanId.value = row.id;
  relateCondition.value = [
    {
      tableName: 'e_maintenance_plan_item',
      field: 'e_maintenance_plan_id',
      operator: 'eq',
      value: rowmaintenancePlanId.value,
    },
  ];
  // 等待 DOM 更新完成
  await nextTick();
  mouldRelateRef.value.fetchTable();
};

// 查询组件
// const opts = ref({});
const opts = computed(() => {
  return {
    keyWord: {
      label: t('maintenancePlan.保养计划'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('maintenancePlan.计划编码或计划名称')}`]),
    },
    state: {
      label: t('maintenancePlan.只显示启用'),
      comp: 't-checkbox',
      defaultVal: '',
    },
  };
});
// 查询条件处理数据
const filterList = ref([]) as any;
// 表格标题
const tableTitle = ref('模具保养计划信息');
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
    };
    const res: any = await api.maintenancePlan.search(searchCondition);
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
const relateCondition = ref([
  {
    tableName: 'e_maintenance_plan_item',
    field: 'e_maintenance_plan_id',
    operator: 'eq',
    value: '-1',
  },
]);

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
const currentFormData = ref({});
const formAction = ref('add');

// 计算窗口宽度
const calculateFormWidth = computed(() => {
  const inputWidth = 270; // 假设调整后的输入框宽度
  const labelWidth = 150;
  const margin = 16;
  const gap = 2;
  const columnGap = 12;

  const formSetting: any = cloneDeep(mainAddFormJson);
  if (!isEqual(formSetting, {})) {
    const currentColumns = formSetting.formColumnSetting.filter((column) => column.isVisible);

    if (currentColumns.length < 6) {
      return `${inputWidth + labelWidth + margin * 2 + gap}px`;
    }
    if (currentColumns.length >= 6 && currentColumns.length < 16) {
      return `${inputWidth * 2 + labelWidth * 2 + margin * 2 + columnGap + gap}px`;
    }
    return '90%';
  }
  return '50%';
});
// 点击编辑按钮逻辑
const onEditRow = async (row: any) => {
  formAction.value = 'edit';
  let relateType = 'mould';
  if (row.mouldId === null || row.mouldId === '') {
    relateType = 'mouldType';
  }
  row.relateType = relateType;
  const currentSetting = { ...mainEditFormJson };
  // 找到字段为m_mould_id的字段显示，field为mould_type隐藏
  currentSetting.formColumnSetting.forEach((column) => {
    if (column.field === 'm_mould_id' || column.field === common.toLowerCamelCase('m_mould_id')) {
      column.isVisible = relateType === 'mould';
    }

    if (column.field === 'mould_type' || column.field === common.toLowerCamelCase('mould_type')) {
      column.isVisible = relateType === 'mouldType';
    }

    if (
      column.field === 'day_maintenance_period' ||
      column.field === common.toLowerCamelCase('day_maintenance_period')
    ) {
      column.isVisible = row.maintenancePlanType === 'PERIOD';
    }
    if (column.field === 'day_early_warn' || column.field === common.toLowerCamelCase('day_early_warn')) {
      column.isVisible = row.maintenancePlanType === 'PERIOD';
    }
    if (column.field === 'hour_run' || column.field === common.toLowerCamelCase('hour_run')) {
      column.isVisible = row.maintenancePlanType !== 'PERIOD';
    }
    if (column.field === 'hour_run_early' || column.field === common.toLowerCamelCase('hour_run_early')) {
      column.isVisible = row.maintenancePlanType !== 'PERIOD';
    }
  });

  formSetting.value = currentSetting;
  // 加载附件列表
  currentEditId.value = row.id;

  currentFormData.value = row;
  formVisible.value = true;
};
const currentEditId = ref('');
// 点击添加按钮逻辑
const onAddClick = () => {
  formAction.value = 'add';
  formSetting.value = {
    ...mainAddFormJson,
  };
  currentEditId.value = common.generateBigIntId().toString();
  currentFormData.value = {
    id: currentEditId.value,
  };
  formVisible.value = true;
};

const onFormChange = (formData: any) => {
  const formDataChange = _.cloneDeep(formData);
  // 如果 formData.relateType变化，对应的表单设置需要变化
  // formData.relateType 为mould,则field为m_mould_id的字段显示，field为mould_type隐藏
  // formData.relateType 为mouldType,则field为m_mould_id的字段隐藏，field为mould_type显示
  if (formDataChange.maintenancePlanType === 'PERIOD') {
    formDataChange.hourRun = '';
    formDataChange.hourRunEarly = '';
    formSetting.value.formColumnSetting.forEach((item: any) => {
      if (item.field === 'day_maintenance_period' || item.field === common.toLowerCamelCase('day_maintenance_period')) {
        item.isVisible = true;
      }
      if (item.field === 'day_early_warn' || item.field === common.toLowerCamelCase('day_early_warn')) {
        item.isVisible = true;
      }
      if (item.field === 'hour_run' || item.field === common.toLowerCamelCase('hour_run')) {
        item.isVisible = false;
      }
      if (item.field === 'hour_run_early' || item.field === common.toLowerCamelCase('hour_run_early')) {
        item.isVisible = false;
      }
    });
  } else {
    formDataChange.dayMaintenancePeriod = '';
    formDataChange.dayEarlyWarn = '';
    formSetting.value.formColumnSetting.forEach((item: any) => {
      if (item.field === 'day_maintenance_period' || item.field === common.toLowerCamelCase('day_maintenance_period')) {
        item.isVisible = false;
      }
      if (item.field === 'day_early_warn' || item.field === common.toLowerCamelCase('day_early_warn')) {
        item.isVisible = false;
      }
      if (item.field === 'hour_run' || item.field === common.toLowerCamelCase('hour_run')) {
        item.isVisible = true;
      }
      if (item.field === 'hour_run_early' || item.field === common.toLowerCamelCase('hour_run_early')) {
        item.isVisible = true;
      }
    });
  }
  if (formDataChange.relateType === 'mould') {
    formSetting.value.formColumnSetting.forEach((item: any) => {
      if (item.field === 'm_mould_id' || item.field === common.toLowerCamelCase('m_mould_id')) {
        item.isVisible = true;
      }
      if (item.field === 'mould_type' || item.field === common.toLowerCamelCase('mould_type')) {
        item.isVisible = false;
        formDataChange.mouldType = '';
      }
    });
  } else {
    formSetting.value.formColumnSetting.forEach((item: any) => {
      if (item.field === 'm_mould_id' || item.field === common.toLowerCamelCase('m_mould_id')) {
        item.isVisible = false;
        formDataChange.mouldId = '';
      }
      if (item.field === 'mould_type' || item.field === common.toLowerCamelCase('mould_type')) {
        item.isVisible = true;
      }
    });
  }

  formRef.value.setFormData(formDataChange);
};

// 单个数据实现删除逻辑
// const onDeleteRow = async (row: any) => {
//   const deleteModel = [row.id];
//   await api.maintenancePlan.removeItemsById(deleteModel);
//   fetchTable();
// };

const formRef = ref(null);

const formTitle = computed(() => {
  return formAction.value === 'edit' ? '编辑' : '新增';
});

// 编辑表单提交
const onFormSubmit = async () => {
  // 第一步:做校验
  formRef.value.handleSubmit().then(async (result) => {
    if (result !== true) {
      MessagePlugin.warning(Object.values(result)[0][0].message);
    } else {
      const postData = {
        ...formRef.value.getFormData(),
      };

      try {
        if (formAction.value === 'edit') {
          // 编辑
          await api.maintenancePlan.updateItemByCode(postData);
        } else {
          // 新增
          await api.maintenancePlan.addItem(postData);
        }
        // 第二步：提交数据
        // await api.mould.updateItemByCode(formRef.value.getFormData());
        MessagePlugin.success('提交成功');
        formVisible.value = false;
        fetchTable();
      } catch (e) {
        console.log(e);
      }
    }
  });
};

const onRowStateChange = async (row: any) => {
  const postRow = _.cloneDeep(row);
  const idsList = [];
  idsList.push(row.id);
  if (postRow.state === 1) {
    postRow.state = 0;
  } else {
    postRow.state = 1;
  }
  let relateType = 'mould';
  if (postRow.mouldId === null || row.mouldId === '') {
    relateType = 'mouldType';
  }
  postRow.relateType = relateType;
  await api.maintenancePlan.updateItemByCode(postRow).then(() => {
    MessagePlugin.success('更新成功');
    row.state = postRow.state;
  });
};

// 添加表单提交
// const onAddFormSubmit = async () => {
//   // 第一步:做校验
//   addFormRef.value.handleSubmit().then(async (result) => {
//     if (result !== true) {
//       MessagePlugin.warning(Object.values(result)[0][0].message);
//     } else {
//       try {
//         // 第二步：提交数据
//         await api.mould.addItem(addFormRef.value.getFormData());
//         MessagePlugin.success('提交成功');
//         formVisible.value = false;
//         fetchTable();
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   });
// };
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
