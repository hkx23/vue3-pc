<template>
  <cmp-container :full="true" :full-sub-index="[0, 1]">
    <cmp-card>
      <cmp-container :full="true">
        <cmp-query :opts="opts" label-width="100" :loading="loading" @submit="conditionEnter" />

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
            @row-click="onGroupSelectChange"
            @select-change="onSelectChange"
            @refresh="fetchTable"
          >
            <!-- 头部按钮区 -->

            <template #button>
              <t-space :size="8">
                <t-button theme="primary" @click="onAddClick()"> 新增 </t-button>
              </t-space>
            </template>

            <!-- 行按钮区 -->
            <template #op="slotProps">
              <t-space :size="8">
                <t-link theme="primary" @click="onEditRow(slotProps.row)">{{ t('common.button.edit') }}</t-link>
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
    </cmp-card>
    <cmp-card>
      <bcmp-page-single
        ref="mitemRelateRef"
        :page-setting="mitemSetting"
        :ghost="true"
        :relate-condition="relateCondition"
      ></bcmp-page-single>
    </cmp-card>
  </cmp-container>

  <!-- 弹出层 -->
  <t-dialog v-model:visible="editFormVisible" header="编辑" :on-confirm="onEditFormSubmit" :width="calculateFormWidth">
    <bcmp-dynamic-form
      ref="editFormRef"
      :form-setting="mainEditFormJson"
      :form-data="currentEditFormData"
      action-type="edit"
    />
  </t-dialog>
  <t-dialog v-model:visible="addFormVisible" header="新增" :on-confirm="onAddFormSubmit" :width="calculateFormWidth">
    <bcmp-dynamic-form
      ref="addFormRef"
      :form-setting="mainAddFormJson"
      :form-data="currentEditFormData"
      action-type="edit"
    />
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'MouldManage',
};
</script>
<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, Ref, ref } from 'vue';

import common from '@/utils/common';

import { useLang } from './lang';

const { t } = useLang();
import { api } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import mainAddFormJson from './setting/mainAddForm.json';
import mainEditFormJson from './setting/mainEditForm.json';
import mainSettingJson from './setting/mainSetting.json';
import mitemSettingJson from './setting/mitemSetting.json';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();

const mainSetting: any = {
  ...mainSettingJson,
};
const mitemSetting: any = {
  ...mitemSettingJson,
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
const rowMouldId = ref(''); // 点击行ID
const mitemRelateRef = ref();
const onGroupSelectChange = async ({ row }) => {
  rowMouldId.value = row.id;
  relateCondition.value = [
    {
      tableName: 'm_mould_in_mitem',
      field: 'm_mould_id',
      operator: 'eq',
      value: rowMouldId.value,
    },
  ];
  // 等待 DOM 更新完成
  await nextTick();
  mitemRelateRef.value.fetchTable();
};

// 查询组件
// const opts = ref({});
const opts = computed(() => {
  return {
    keyWord: {
      label: t('mould.模具'),
      comp: 't-input',
      defaultVal: '',
      placeholder: t('common.placeholder.input', [`${t('mould.模具编码或名称或描述')}`]),
    },
  };
});
// 查询条件处理数据
const filterList = ref([]) as any;
// 表格标题
const tableTitle = ref('模具档案');
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
    const res = await api.mould.search(searchCondition);
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
    tableName: 'm_mould_in_mitem',
    field: 'm_mould_id',
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

const editFormVisible = ref(false);
const addFormVisible = ref(false);
const currentEditFormData = ref({});
const currentAddFormData = ref({});

// 计算窗口宽度
const calculateFormWidth = computed(() => {
  const inputWidth = 270; // 假设调整后的输入框宽度
  const labelWidth = 120;
  const margin = 16;
  const gap = 2;
  const columnGap = 12;
  if (mainEditFormJson.formColumnSetting.length < 6) {
    return `${inputWidth + labelWidth + margin * 2 + gap}px`;
  }
  if (mainEditFormJson.formColumnSetting.length >= 6 && mainEditFormJson.formColumnSetting.length < 16) {
    return `${inputWidth * 2 + labelWidth * 2 + margin * 2 + columnGap + gap}px`;
  }
  return '90%';
});
// 点击编辑按钮逻辑
const onEditRow = (row: any) => {
  currentEditFormData.value = row;
  editFormVisible.value = true;
};

// 点击添加按钮逻辑
const onAddClick = () => {
  currentAddFormData.value = null;
  addFormVisible.value = true;
};

// 单个数据实现删除逻辑
const onDeleteRow = async (row: any) => {
  const deleteModel = [row.id];
  await api.mould.removeItemsById(deleteModel);
  fetchTable();
};

const editFormRef = ref(null);
const addFormRef = ref(null);

// 编辑表单提交
const onEditFormSubmit = async () => {
  // 第一步:做校验
  editFormRef.value.handleSubmit().then(async (result) => {
    if (result !== true) {
      MessagePlugin.warning(Object.values(result)[0][0].message);
    } else {
      try {
        // 第二步：提交数据
        await api.mould.updateItemByCode(editFormRef.value.getFormData());
        MessagePlugin.success('提交成功');
        editFormVisible.value = false;
        fetchTable();
      } catch (e) {
        console.log(e);
      }
    }
  });
};

// 添加表单提交
const onAddFormSubmit = async () => {
  // 第一步:做校验
  addFormRef.value.handleSubmit().then(async (result) => {
    if (result !== true) {
      MessagePlugin.warning(Object.values(result)[0][0].message);
    } else {
      try {
        // 第二步：提交数据
        await api.mould.addItem(addFormRef.value.getFormData());
        MessagePlugin.success('提交成功');
        addFormVisible.value = false;
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
