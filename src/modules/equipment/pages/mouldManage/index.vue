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
      >
        <template #headerButton>
          <bcmp-import-auto-button theme="default" button-text="导入" type="m_mould_in_mitem"></bcmp-import-auto-button>
        </template>
      </bcmp-page-single>
    </cmp-card>
  </cmp-container>

  <!-- 弹出层 -->
  <!-- <t-dialog v-model:visible="formVisible" header="编辑" :on-confirm="onEditFormSubmit" :width="calculateFormWidth">
    <t-tabs :default-value="1">
      <t-tab-panel :value="1" label="模具信息">
        <bcmp-dynamic-form
          ref="editFormRef"
          :form-setting="mainEditFormJson"
          :form-data="currentEditFormData"
          action-type="edit"
        />
      </t-tab-panel>
      <t-tab-panel :value="2" label="技术文件">
        <p style="margin: 20px">技术文件</p>
      </t-tab-panel>
      <t-tab-panel :value="3" label="扩展属性">
        <p style="margin: 20px">扩展属性</p>
      </t-tab-panel>
    </t-tabs>
  </t-dialog> -->
  <t-dialog v-model:visible="formVisible" :header="formTitle" :on-confirm="onFormSubmit" :width="calculateFormWidth">
    <t-tabs :default-value="1">
      <t-tab-panel :value="1" label="模具信息" :destroy-on-hide="false">
        <bcmp-dynamic-form ref="formRef" :form-setting="formSetting" :form-data="currentFormData" action-type="add" />
      </t-tab-panel>
      <t-tab-panel :value="2" label="技术文件" :destroy-on-hide="false">
        <bcmp-upload-content
          ref="uploadContentRef"
          :file-list="fileList"
          :upload-path="uploadPath"
          :is-hand-delete="false"
          @delete-success="addDeleteSuccess"
          @batch-delete-success="addBatchDeleteSuccess"
        ></bcmp-upload-content>
      </t-tab-panel>
      <t-tab-panel :value="3" label="扩展属性" :destroy-on-hide="false">
        <bcmp-extend ref="extendForm" :object-id="currentEditId" object-code="mould"> </bcmp-extend>
      </t-tab-panel>
    </t-tabs>
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

import { api } from '@/api/main';
import BcmpUploadContent from '@/components/bcmp-upload-content/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
import common from '@/utils/common';

import { useLang } from './lang';
import mainAddFormJson from './setting/mainAddForm.json';
import mainEditFormJson from './setting/mainEditForm.json';
import mainSettingJson from './setting/mainSetting.json';
import mitemSettingJson from './setting/mitemSetting.json';

const uploadPath = ref('main/mould');
const { t } = useLang();

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const uploadContentRef = ref();
const formSetting: any = ref({});
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
    const res: any = await api.mould.search(searchCondition);
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
  if (mainEditFormJson.formColumnSetting.length < 6) {
    return `${inputWidth + labelWidth + margin * 2 + gap}px`;
  }
  if (mainEditFormJson.formColumnSetting.length >= 6 && mainEditFormJson.formColumnSetting.length < 16) {
    return `${inputWidth * 2 + labelWidth * 2 + margin * 2 + columnGap + gap}px`;
  }
  return '90%';
});
// 点击编辑按钮逻辑
const onEditRow = async (row: any) => {
  formAction.value = 'edit';
  formSetting.value = {
    ...mainEditFormJson,
  };
  uploadPath.value = `main/mould/${row.id}`;
  // 加载附件列表
  currentEditId.value = row.id;
  fileList.value = (await api.mouldFile.getFileListByItemId(row.id)) as any;
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
  fileList.value = [];
  currentEditId.value = common.generateBigIntId().toString();
  uploadPath.value = `main/mould/${currentEditId.value}`;
  currentFormData.value = {
    id: currentEditId.value,
  };
  formVisible.value = true;
};

// 单个数据实现删除逻辑
const onDeleteRow = async (row: any) => {
  const deleteModel = [row.id];
  await api.mould.removeItemsById(deleteModel);
  fetchTable();
};

const formRef = ref(null);

const formTitle = computed(() => {
  return formAction.value === 'edit' ? '编辑' : '新增';
});
const extendForm = ref(null);
// 编辑表单提交
const onFormSubmit = async () => {
  // 第一步:做校验
  formRef.value.handleSubmit().then(async (result) => {
    if (result !== true) {
      MessagePlugin.warning(Object.values(result)[0][0].message);
    } else {
      const rlt = await extendForm.value.getComponentData();
      if (!rlt.success) {
        MessagePlugin.error('扩展属性校验不通过');
        return;
      }
      const properties = [];
      for (const key in rlt.data) {
        properties.push({
          objectPropertyId: key,
          propertyValue: rlt.data[key],
        });
      }
      const currentFileList = uploadContentRef.value.getFileList();
      const postData = {
        ...formRef.value.getFormData(),
        properties,
        fileList: currentFileList,
        deleteFileList: deleteFileList.value,
      };

      try {
        if (formAction.value === 'edit') {
          // 编辑
          await api.mould.updateItemByCode(postData);
        } else {
          // 新增
          await api.mould.addItem(postData);
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
// // 上传文件
const fileList = ref([]);
const deleteFileList = ref([]);
const addDeleteSuccess = (file: any) => {
  // MessagePlugin.info(
  //   `删除一个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  // );
  deleteFileList.value.push(file);
  console.log('deleteSuccess', file);
};

const addBatchDeleteSuccess = (files: any[]) => {
  // MessagePlugin.info(
  //   `删除多个文件成功,如果是需要实时更新业务数据，则可以使用参数里面的文件名,id等信息操作接口，进行关联数据删除`,
  // );
  deleteFileList.value.push(...files);
  console.log('batchDeleteSuccess', files);
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
