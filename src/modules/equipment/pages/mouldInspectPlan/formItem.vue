<template>
  <t-dialog
    v-model:visible="formVisible"
    header="点检设备选择"
    width="95%"
    cancel-btn="取消"
    confirm-btn="保存"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
  >
    <!-- 新增表格数据 -->
    <t-row justify="space-around">
      <t-col :span="5">
        <cmp-table
          ref="tableRef"
          v-model:pagination="addPage"
          row-key="id"
          height="400px"
          :table-column="addPersonColumns"
          :table-data="onAddPersonTabList.list"
          :total="addPersonTotal"
          @refresh="onFetchAddData"
        >
          <template #addPerson="{ row }">
            <t-button size="small" variant="text" @click="addPerson(row)">
              <icon name="add" class="black-icon" />
            </t-button>
          </template>
          <template #operate>
            <cmp-query :opts="optsAdd" :bool-enter="true" :show-button="false" @submit="onInputAdd"></cmp-query>
          </template>
          <template #title> 选择模具 </template>
        </cmp-table>
      </t-col>
      <!-- 删除 表格数据 -->
      <t-col :span="5">
        <cmp-table
          ref="tableRef"
          v-model:pagination="delPage"
          row-key="id"
          height="400px"
          :table-column="delPersonColumns"
          :table-data="onDelPersonTabList.list"
          :total="delPersonTotal"
        >
          <!-- @refresh="onFetchDelData" -->
          <template #delPerson="{ row }">
            <t-button size="small" variant="text" @click="delPerson(row)">
              <icon name="remove" class="black-icon" />
            </t-button>
          </template>
          <template #operate>
            <cmp-query :opts="optsDel" :bool-enter="true" :show-button="false" @submit="onInputDel"></cmp-query>
          </template>
          <template #title> 已选模具 </template>
        </cmp-table></t-col
      >
    </t-row>
    <!-- <template #footer>
      <t-button theme="default" variant="base" @click="personVisible = false">取消</t-button>
      <t-button theme="primary" type="submit" :loading="personSaveLoading" @click="onAddPersons">保存</t-button>
    </template> -->
    <!-- <cmp-container :full="true" :ghost="true">
      <cmp-card :span="12" :ghost="true">
        <t-descriptions :column="1" bordered>
          <t-descriptions-item label="点检项目编码" :content="formData.inspectItemCode" />
          <t-descriptions-item label="点检项目名称" :content="formData.inspectItemName" />
          <t-descriptions-item label="关联资产类型">
            <t-radio-group v-model="formData.relateType" :options="options" @change="onChange"></t-radio-group>
          </t-descriptions-item>
          <t-descriptions-item v-if="formData.relateType === 'mouldType'" label="关联模具类型">
            <bcmp-select-param
              v-model="formData.mouldType"
              placeholder="请选择关联模具类型"
              param-group="E_MOULD_TYPE"
            ></bcmp-select-param>
          </t-descriptions-item>
          <t-descriptions-item v-if="formData.relateType === 'mould'" label="关联模具">
            <bcmp-select-business
              v-model="formData.mouldId"
              type="mould"
              placeholder="请选择关联模具"
              :show-title="false"
            />
          </t-descriptions-item>
        </t-descriptions>
      </cmp-card>
    </cmp-container> -->
  </t-dialog>
</template>
<script lang="ts" setup>
import _ from 'lodash';
import { Icon } from 'tdesign-icons-vue-next';
import { FormInstanceFunctions, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, reactive, Ref, ref, watch } from 'vue';

// import { api as apiEquimpent } from '@/api/equipment';
import { api } from '@/api/main';
// import BcmpSelectBusiness from '@/components/bcmp-select-business/index.vue';
import { usePage } from '@/hooks/modules/page';
import utils from '@/utils/common';

const Emit = defineEmits(['parent-refresh-event', 'form-close-event', 'change-equipment']);

const mouldType = ref('');
const formVisible = ref(false);
const { pageUI: addPage } = usePage();
const { pageUI: delPage } = usePage();
const formRef: Ref<FormInstanceFunctions> = ref(null);

const isEdit = ref(true); // 是否可编辑
const onAddPersonTabList = reactive({ list: [] });
const addPersonTotal = ref(null);
// const delOldArr = ref([]);
const onDelPersonTabList = reactive({ list: [], total: 0 });
const delPersonTotal = ref(null);
const formData = reactive({
  id: '',
  inspectItemId: '',
  inspectItemCode: '',
  inspectItemName: '',
  relateType: '',
  mouldType: '',
  mouldId: '',
});

// ####人员新增 表头
const addPersonColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'mouldCode',
    title: '模具编码',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'mouldName',
    title: '模具名称',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'warehouseName',
    title: '存放仓库',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'addPerson',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '70',
    cell: 'addPerson', // 引用具名插槽
  },
];
// ####人员删除 表头
const delPersonColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'mouldCode',
    title: '模具编码',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'mouldName',
    title: '模具名称',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'warehouseName',
    title: '存放仓库',
    align: 'center',
    width: '70',
  },
  {
    colKey: 'delPerson',
    title: '操作',
    align: 'center',
    fixed: 'right',
    width: '70',
    cell: 'delPerson',
  },
];

// // # 人员刷新按钮
// const onFetchPersonData = async () => {
//   await supportPersonInUserTabData(); // 获取 人员表格 数据
// };
// # 人员添加刷新按钮
const onFetchAddData = async () => {
  await onAddPersonTabData();
};
// # 人员删除刷新按钮
// const onFetchDelData = async () => {
//   await onDelPersonTabData();
// };

// 变更后的全部 ID
const arrPersonID = ref([]);

// #点击 加号图标 事件
const addPerson = (row: { id: any }) => {
  arrPersonID.value = [];
  // 从 '添加' 表格中移除选中的行
  onAddPersonTabList.list = onAddPersonTabList.list.filter((item) => item.id !== row.id);
  // 将选中的行添加到 '删除' 表格
  onDelPersonTabList.list.push(row);
};
// #点击 减号图标 事件
const delPerson = (row: { id: any }) => {
  arrPersonID.value = [];
  // 从 '添加' 表格中移除选中的行
  onDelPersonTabList.list = onDelPersonTabList.list.filter((item) => item.id !== row.id);
  // 将选中的行添加到 '删除' 表格
  onAddPersonTabList.list.push(row);
};

// #监听 onDelPersonTabList.list 的变化
watch(
  () => onDelPersonTabList.list,
  (newList) => {
    // 提取 newList 中每个元素的 id 并更新 arrPersonID
    arrPersonID.value = newList.map((item) => item.id);
    addPersonTotal.value = onAddPersonTabList.list.length; // 页数变化
    delPersonTotal.value = onDelPersonTabList.list.length; // 页数变化
  },
  { deep: true },
);

// // 筛选删除数组
// function findElementsNotInA(a, b) {
//   // 创建集合 setA 包含数组 a 的所有元素
//   const setA = new Set(a);
//   // 使用 filter 方法过滤数组 b，只保留不在集合 setA 中的元素
//   return b.filter((item) => !setA.has(item));
// }
// // 筛选新增数组
// function findElementsNotInB(a, b) {
//   // 创建集合 setB 包含数组 b 的所有元素
//   const setB = new Set(b);
//   // 使用 filter 方法过滤数组 a，只保留不在集合 setB 中的元素
//   return a.filter((item) => !setB.has(item));
// }

// // 上侧搜索提交事件
// const onInput = async (data: any) => {
//   pageUI.value.page = 1;
//   personPage.value.page = 1;
//   const res = await api.supportGroup.getGroupList({
//     pageNum: pageUI.value.page,
//     pageSize: pageUI.value.rows,
//     groupKeyword: data.categoryName,
//     userKeyword: data.methodCodeName,
//   });
//   supportGroupInUserList.list = res.list;
//   supportGroupTotal.value = res.total;
//   selectedRowKeys.value = [];
//   supportPersonInUserList.list = [];
//   supportPersonTotal.value = 0;
//   rowGroupId.value = '';
// };

// # 获取 添加 人员信息
// const onAddPersonTabList = reactive({ list: [] });
// const addPersonTotal = ref(null);
const onAddPersonTabData = async () => {
  console.log('arrPersonID', arrPersonID);
  const res: any = await api.mould.search({
    // supportGroupId: rowGroupId.value,
    // mouldType: mouldType.value,
    filters: [
      {
        field: 'mouldType',
        operator: 'EQ',
        value: mouldType.value,
      },
    ],
    exceptIds: arrPersonID.value,
    pageNum: addPage.value.page,
    pageSize: addPage.value.rows,
  });
  console.log('res', res);
  onAddPersonTabList.list = res.list.filter((item) => !arrPersonID.value.includes(item.id));
  // onDelPersonTabList.list = res.list.filter((item) => arrPersonID.value.includes(item.id));
  addPersonTotal.value = res.total;
};

// # 获取 删除 人员信息
// const delOldArr = ref([]);
// const onDelPersonTabList = reactive({ list: [] });
// const delPersonTotal = ref(null);
// const onDelPersonTabData = async () => {
// const res = await api.assetLedger.getList({
//   // supportGroupId: rowGroupId.value,
//   pageNum: delPage.value.page,
//   pageSize: delPage.value.rows,
// });
// onDelPersonTabList.list = res.list;
// delPersonTotal.value = res.total;
// delOldArr.value = res.list.map((item) => item.id);
// };

// ## 添加 员工 搜索
const optsAdd = computed(() => {
  return {
    equipmentName: { label: '查询设备', comp: 't-input', event: 'input', defaultval: '' },
  };
});
// 上侧搜索提交事件
const onInputAdd = async (data: any) => {
  addPage.value.page = 1;
  const res = await api.mould.search({
    pageNum: addPage.value.page,
    pageSize: addPage.value.rows,
    mouldType: mouldType.value,
    expectedEquipmentIds: arrPersonID.value,
    equipmentName: data.equipmentName,
    // userKeyword: data.categoryName,
    // supportGroupId: rowGroupId.value,
  });
  onAddPersonTabList.list = res.list;
  addPersonTotal.value = res.total;
};

// 删除 员工 搜索
const optsDel = computed(() => {
  return {
    equipmentName: { label: '已选设备', comp: 't-input', event: 'input', defaultval: '' },
  };
});

// 上侧搜索提交事件
const onInputDel = async (data: any) => {
  delPage.value.page = 1;
  const res = await api.mould.search({
    pageNum: delPage.value.page,
    pageSize: delPage.value.rows,
    equipmentName: data.equipmentName,
    mouldType: mouldType.value,
    expectedEquipmentIds: arrPersonID.value,
    // supportGroupId: rowGroupId.value,
  });
  onDelPersonTabList.list = res.list;
  delPersonTotal.value = res.total;
};

// #添加变更后员工事件
// const onAddPersons = async () => {
//   const delNewArr = onDelPersonTabList.list.map((item) => item.id);
//   const delArr = findElementsNotInA(delNewArr, delOldArr.value);
//   const addArr = findElementsNotInB(delNewArr, delOldArr.value);
//   try {
//     personSaveLoading.value = true;
//     await api.supportGroup.addSupportGroupPerson({
//       supportGroupId: rowGroupId.value,
//       insertList: addArr,
//       deleteList: delArr,
//     });
//     MessagePlugin.success('变更成功');
//     await supportPersonInUserTabData(); // 获取 人员表格 数据
//     personVisible.value = false;
//   } catch (error) {
//     console.error('Error occurred:', error);
//     MessagePlugin.error('变更失败');
//   } finally {
//     personSaveLoading.value = false;
//   }
// };

// const eidtFormSubmit = () => {
//   formRef.value.submit();
// };

const onConfirmForm = async () => {
  // try {
  // if (_.isEmpty(formData.inspectItemId)) {
  //   MessagePlugin.error('请选择点检项目');
  //   return;
  // }
  // if (_.isEmpty(formData.mouldType) && formData.relateType === 'mouldType') {
  //   MessagePlugin.error('请选择关联模具类型');
  //   return;
  // }
  // if (_.isEmpty(formData.mouldId) && formData.relateType === 'mould') {
  //   MessagePlugin.error('请选择关联模具');
  //   return;
  // }
  // if (_.isEmpty(formData.assetBrandId)) {
  //   MessagePlugin.error('请选择资产品牌');
  //   return;
  // }
  // if (_.isEmpty(formData.assetModelId)) {
  //   MessagePlugin.error('请选择资产型号');
  //   return;
  // }

  // if (isEdit.value) {
  //   await apiEquimpent.inspectItemInEquipment.update({
  //     id: formData.id,
  //     inspectItemId: formData.inspectItemId,
  //     relateType: 'mould',
  //     mouldId: formData.mouldId || undefined,
  //     mouldType: formData.mouldType || undefined,
  //   });
  // } else {
  //   await apiEquimpent.inspectItemInEquipment.insert({
  //     inspectItemId: formData.inspectItemId,
  //     relateType: 'mould',
  //     mouldId: formData.mouldId || undefined,
  //     mouldType: formData.mouldType || undefined,
  //   });
  // }

  // Emit('parent-refresh-event');
  Emit('change-equipment', onDelPersonTabList.list, arrPersonID.value);
  formVisible.value = false;
  // } catch (e) {
  //   console.log(e);
  // }
};

// const onChange = (val: string) => {
//   if (val === 'mouldType') {
//     formData.mouldId = '';
//   } else {
//     formData.mouldType = '';
//   }
// };
const showForm = async (edit, id) => {
  const oldMouldType = mouldType.value;
  formVisible.value = true;
  isEdit.value = edit;
  mouldType.value = id;
  arrPersonID.value = oldMouldType === mouldType.value ? arrPersonID.value : [];
  onDelPersonTabList.list = oldMouldType === mouldType.value ? onDelPersonTabList.list : [];
  utils.reset(formData);
  onAddPersonTabData();
  // formData.inspectItemId = row.id;
  // formData.inspectItemCode = row.inspectItemCode;
  // formData.inspectItemName = row.inspectItemName;
  // formData.relateType = 'mouldType';
};

// const onCheckItemSelectChange = async (row) => {
//   formData.itemId = row.id;
//   formData.itemCode = row.itemCode;
//   formData.itemName = row.itemName;
//   formData.itemDesc = row.itemDesc;
//   formData.itemTypeName = row.itemTypeName;
// };
const initDialog = () => {
  arrPersonID.value = [];
  onDelPersonTabList.list = [];
};

defineExpose({
  form: formRef,
  showForm,
  initDialog,
});

// onMounted(() => {
//   onAddPersonTabData(); // 获取 添加 表格人员数据
//   onDelPersonTabData();
// });
</script>
<style lang="less" scoped>
:deep .t-dialog__body {
  padding: 0 !important;
}

:deep .t-dialog {
  background: var(--td-bg-color-page) !important;
}

:deep .t-tabs__nav-container {
  margin-top: 5px;
}

:deep .t-tabs__operations {
  top: 0;
  border-bottom: 0;
}

.showHourMinutes {
  :deep .t-date-picker__panel-date {
    display: none !important;
  }
}
</style>
