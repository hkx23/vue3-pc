<template>
  <cmp-container :full="true">
    <cmp-query :opts="opts" label-width="100" :bool-enter="true" :loading="loading" @submit="conditionEnter" />

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
        <!-- <template #button>
          <t-space :size="8">
            <t-button theme="primary" @click="onAddClick()"> 新增 </t-button>
          </t-space>
        </template> -->
        <template #inspectResult="{ row }">
          {{ showInspectLabel(row.inspectResult) }}
        </template>
        <template #files="rowData">
          <t-space>
            <t-link theme="primary" @click="showUplaodImg(rowData)">{{ '查看' }}</t-link>
          </t-space>
        </template>
        <template #photo="{ row }">
          <t-link theme="primary" @click="viewPhoto(row)">查看</t-link>
        </template>

        <!-- 行按钮区 -->
        <!-- <template #op="slotProps">
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
        </template> -->
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- 弹出层 -->
  <t-dialog v-model:visible="formVisible" :header="formTitle" :on-confirm="onFormSubmit" :width="calculateFormWidth">
    <bcmp-dynamic-form
      ref="formRef"
      :lower-camel="true"
      :form-setting="formSetting"
      :form-data="currentFormData"
      action-type="add"
      @change="onFormChange"
    />
  </t-dialog>
  <t-dialog v-model:visible="photoVisible" :close-on-overlay-click="false" header="点检项目照片" width="50%">
    <cmp-container :full="true">
      <bcmp-upload-content :file-list="fileList" upload-path="inspectItem" readonly ghost></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
  <cmp-files-upload
    ref="formFilesRef"
    upload-path="InspectItem"
    @upload-success="uploadSuccess"
    @delete-success="deleteSuccess"
    @batch-delete-success="batchDeleteSuccess"
  />
</template>
<script lang="ts">
export default {
  name: 'RelateEquipment',
};
</script>
<script setup lang="ts">
// import _, { cloneDeep, isEqual } from 'lodash';
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, Ref, ref } from 'vue';

import { api } from '@/api/equipment';
import { AddFileType } from '@/components/bcmp-upload-content/constants';
import BcmpUploadContent from '@/components/bcmp-upload-content/index.vue';
import CmpFilesUpload from '@/components/cmp-files-upload/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import common from '@/utils/common';

import { useLang } from './lang';
// import relateAddFormJson from './setting/relateAddForm';
// import tableSettingJson from './setting/relateTableSetting';

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
// const mainSetting: any = {
//   ...tableSettingJson,
// };
// 表格数据总数
const dataTotal = ref(0);
// 表格数据
const tableData = ref([]);
// 表格列配置
// const tableColumns = ref([]);
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'inspectItemCode',
    title: '点检项目编码',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectItemName',
    title: '点检项目名称',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectResult',
    title: '点检结果',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectItemStandard',
    title: '点检标准',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectMethodName',
    title: '点检方式',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'inspectItemTypeName',
    title: '点检类型',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'maxValue',
    title: '最大值',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'minValue',
    title: '最小值',
    align: 'center',
    width: '110',
  },
  {
    colKey: 'uomName',
    title: '单位',
    align: 'center',
    width: '110',
  },
  {
    title: '标准图片',
    align: 'left',
    fixed: 'right',
    width: 100,
    colKey: 'files',
  },
  {
    title: '点检图片',
    align: 'left',
    fixed: 'right',
    width: 100,
    colKey: 'photo',
  },
];
// 选中行 id
const selectedRowKeys: Ref<any[]> = ref([]);

// 选中行
const onSelectChange = (value) => {
  selectedRowKeys.value = value;
};

// 点检结果
const showInspectLabel = (status: any) => {
  enum statusList {
    OK = '正常',
    NG = '异常',
  }
  return statusList[status] || '-';
};

// 查询组件
// const opts = ref({});
const opts = computed(() => {
  return {
    inspectResult: {
      label: t('inspectBill.点检项目结果'),
      comp: 't-select',
      bind: {
        options: [
          // { label: '全部', value: '' },
          { label: '正常', value: 'OK' },
          { label: '异常', value: 'NG' },
        ],
      },
      defaultVal: '',
    },
  };
});
// 查询条件处理数据
const filterList = ref([]) as any;
// 表格标题
const tableTitle = ref('设备点检项目信息');
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
      relateType: 'equipment',
    };
    const res: any = await api.inspectBillDtl.search(searchCondition);
    tableData.value = res.list; // 表格数据赋值
    dataTotal.value = res.total; // 总页数赋值
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 数据源类型
// const settingObject = ref();
const datasourceName = ref('m_equipment');
// const selectedFields = ref([]);
const searchSettings = ref([]);
const usePager = ref(true);

const loadSetting = async () => {
  // const res = mainSetting;
  // settingObject.value = res;
  // // 获取主要信息
  // // tableTitle.value = res.tableSetting.tableTitle;
  // usePager.value = res.tableSetting.usePage;
  // // 获取表格里面的field字段
  // selectedFields.value = res.tableSetting.columnSetting.map((column) => ({
  //   tableName: column.tableName, // 假设column对象中有tableName属性
  //   fieldName: common.toLowerCamelCase(column.columnName), // 或者是fieldName，取决于你的实际属性名
  // }));
  // if (usePager.value) {
  //   pageUI.value.rows = res.tableSetting.pageSize || 20;
  // } else {
  //   pageUI.value.rows = 99999;
  // }
  // const tableColumnSetting = res.tableSetting.columnSetting.map((column) => ({
  //   colKey: common.toLowerCamelCase(column.columnName), // 列绑定的字段名
  //   title: column.columnDesc || column.columnName, // 列显示的标题，默认使用columnDesc，不存在则使用columnName
  //   align: column.align, // 对齐方式
  //   width: column.isAutoWidth ? 'auto' : column.columnWidth, // 列宽
  //   fixed: determineFixed(column.isLeftFixed, column.isRightFixed), // 是否固定列
  //   showOverflowTooltip: !column.isAutoWidth, // 是否开启文本溢出 tooltip，如果autoWidth为true，则可能不需要此配置
  //   isShow: column.isVisible, // 是否显示该列
  // }));
  // tableColumnSetting.push({
  //   colKey: 'op',
  //   title: '操作',
  //   align: 'center',
  //   fixed: 'right',
  //   width: '130',
  //   isShow: true,
  //   showOverflowTooltip: true,
  // });
  // // 过滤isShow为true的数据,作为表格的列配置
  // tableColumns.value = tableColumnSetting.filter((column) => column.isShow);
  conditionEnter(null);
};

// 获取固定左右的配置
// const determineFixed = (isLeftFixed, isRightFixed) => {
//   if (isLeftFixed) return 'left';
//   if (isRightFixed) return 'right';
//   return '';
// };

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
  // const formSetting: any = cloneDeep(relateAddFormJson);
  // if (!isEqual(formSetting, {}) && !isEqual(formSetting, [])) {
  // const currentColumns = formSetting.formColumnSetting.filter((column) => column.isVisible);

  // if (currentColumns.length < 6) {
  //   return `${inputWidth + labelWidth + margin * 2 + gap}px`;
  // }
  // if (currentColumns.length >= 6 && currentColumns.length < 16) {
  //   return `${inputWidth * 2 + labelWidth * 2 + margin * 2 + columnGap + gap}px`;
  // }
  // return '90%';
  // }
  return '50%';
});

// const currentEditId = ref('');
// 点击添加按钮逻辑
// const onAddClick = () => {
//   formAction.value = 'add';
//   formSetting.value = {
//     // ...relateAddFormJson,
//   };
//   currentEditId.value = common.generateBigIntId().toString();
//   const relateConditons = _.cloneDeep(props.relateCondition);
//   // 将field 属性转换为小写驼峰形式
//   relateConditons.forEach((item: any) => {
//     item.field = common.toLowerCamelCase(item.field);
//   });
//   const formData = { id: currentEditId.value };
//   // formData 添加 relateConditons的属性值
//   relateConditons.forEach((condition: any) => {
//     formData[condition.field] = condition.value;
//   });
//   currentFormData.value = formData;
//   formVisible.value = true;
// };

// 单个数据实现删除逻辑
// const onDeleteRow = async (row: any) => {
//   const deleteModel = [row.id];
//   await api.maintenanceItemInEquipment.removeItemsById(deleteModel);
//   fetchTable();
// };

const formRef = ref();

const formTitle = computed(() => {
  return formAction.value === 'edit' ? '编辑' : '新增';
});
const onFormChange = (formData: any) => {
  const formDataChange = _.cloneDeep(formData);
  console.log(formDataChange);
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
        relateType: 'equipment',
      };

      try {
        // 新增
        await api.maintenanceItemInEquipment.addItem(postData);

        // 第二步：提交数据
        // await api.equipment.updateItemByCode(formRef.value.getFormData());
        MessagePlugin.success('提交成功');
        formVisible.value = false;
        fetchTable();
      } catch (e) {
        console.log(e);
      }
    }
  });
};

// 点检图片
const photoVisible = ref(false);
const fileList: any = ref([]);
const viewPhoto = async (row: any) => {
  fileList.value = [];
  // const dtlId = [row.id];
  // const fileListData = await api.inspectBillDtlFile.getFilesByDtlIds(dtlId);
  // fileList.value = fileListData || [];
  fileList.value = row.billDtlFiles || [];
  photoVisible.value = true;
};

// 标准图片 begin 文件上传

const formFilesRef = ref(null);
const selectRowId = ref('');
const showUplaodImg = async (rowData) => {
  selectRowId.value = rowData.row.inspectItemId;
  try {
    if (!_.isEmpty(selectRowId.value)) {
      const list = await api.inspectItemFile.getInspectItemFileList(selectRowId.value);
      rowData.row.fileList = list;
    }
    const { showForm } = formFilesRef.value;
    await showForm(false, rowData.row.fileList);
  } catch (e) {
    console.log(e);
  }
};
const uploadSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectRowId.value)) {
      await api.inspectItemFile.addInspectItemFile({
        inspectItemId: selectRowId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success('文件上传成功');
    }
  } catch (e) {
    console.log(e);
  }
};
const deleteSuccess = async (file: AddFileType) => {
  try {
    if (!_.isEmpty(selectRowId.value)) {
      await api.inspectItemFile.deleteInspectItemFile({
        inspectItemId: selectRowId.value,
        fileName: file.fileName,
      });
      MessagePlugin.success(t('mitemIncomingInspection.文件删除成功'));
    }
  } catch (e) {
    console.log(e);
  }
};
const batchDeleteSuccess = async (files: AddFileType[]) => {
  try {
    if (!_.isEmpty(selectRowId.value)) {
      const deleteList = [];
      files.forEach((n) => deleteList.push({ inspectItemId: selectRowId.value, fileName: n.fileName }));

      await api.inspectItemFile.deleteBatchInspectItemFile(deleteList);
      MessagePlugin.success('文件删除成功');
    }
  } catch (e) {
    console.log(e);
  }
};

// end 文件上传

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
