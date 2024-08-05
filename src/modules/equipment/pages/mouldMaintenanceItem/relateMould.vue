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
    <bcmp-dynamic-form
      ref="formRef"
      :form-setting="formSetting"
      :form-data="currentFormData"
      action-type="add"
      @change="onFormChange"
    />
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
import relateAddFormJson from './setting/relateAddForm.json';
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
const formSetting: any = ref({});
const mainSetting: any = {
  ...tableSettingJson,
};
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
    mouldType: {
      label: t('maintenanceItem.模具类型'),
      comp: 'bcmp-select-param',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('maintenanceItem.模具类型')}`]),
      bind: {
        paramGroup: 'E_MOULD_TYPE',
      },
    },
    keyWord: {
      label: t('maintenanceItem.模具'),
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
      relateType: 'mould',
    };
    const res: any = await api.maintenanceItemInEquipment.search(searchCondition);
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
  const labelWidth = 120;
  const margin = 16;
  const gap = 2;
  const columnGap = 12;
  if (relateAddFormJson.formColumnSetting.length < 6) {
    return `${inputWidth + labelWidth + margin * 2 + gap}px`;
  }
  if (relateAddFormJson.formColumnSetting.length >= 6 && relateAddFormJson.formColumnSetting.length < 16) {
    return `${inputWidth * 2 + labelWidth * 2 + margin * 2 + columnGap + gap}px`;
  }
  return '90%';
});

const currentEditId = ref('');
// 点击添加按钮逻辑
const onAddClick = () => {
  formAction.value = 'add';
  formSetting.value = {
    ...relateAddFormJson,
  };
  currentEditId.value = common.generateBigIntId().toString();
  const relateConditons = _.cloneDeep(props.relateCondition);
  // 将field 属性转换为小写驼峰形式
  relateConditons.forEach((item: any) => {
    item.field = common.toLowerCamelCase(item.field);
  });
  const formData = { id: currentEditId.value };
  // formData 添加 relateConditons的属性值
  relateConditons.forEach((condition: any) => {
    formData[condition.field] = condition.value;
  });
  currentFormData.value = formData;
  formVisible.value = true;
};

// 单个数据实现删除逻辑
const onDeleteRow = async (row: any) => {
  const deleteModel = [row.id];
  await api.maintenanceItemInEquipment.removeItemsById(deleteModel);
  fetchTable();
};

const formRef = ref();

const formTitle = computed(() => {
  return formAction.value === 'edit' ? '编辑' : '新增';
});
const onFormChange = (formData: any) => {
  const formDataChange = _.cloneDeep(formData);
  console.log(formDataChange);
  // 如果 formData.relateType变化，对应的表单设置需要变化
  // formData.relateType 为mould,则field为m_mould_id的字段显示，field为mould_type隐藏
  // formData.relateType 为mouldType,则field为m_mould_id的字段隐藏，field为mould_type显示
  if (formDataChange.relateType === 'mould') {
    formSetting.value.formColumnSetting.forEach((item: any) => {
      if (item.field === 'm_mould_id' || item.field === common.toLowerCamelCase('m_mould_id')) {
        item.isVisible = true;
      }
      if (item.field === 'mouldType') {
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
      if (item.field === 'mouldType') {
        item.isVisible = true;
      }
    });
  }
  formRef.value.setFormData(formDataChange);
};

// 编辑表单提交
const onFormSubmit = async () => {
  // 第一步:做校验
  formRef.value.handleSubmit().then(async (result: any) => {
    if (result !== true) {
      MessagePlugin.warning(Object.values(result)[0][0].message);
    } else {
      const postData = {
        ...formRef.value.getFormData(),
        relateType: 'mould',
      };

      try {
        // 新增
        await api.maintenanceItemInEquipment.addItem(postData);

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
