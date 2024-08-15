<template>
  <cmp-container :full="true">
    <cmp-card v-if="opts" :span="12" :ghost="ghost">
      <cmp-query :opts="opts" label-width="100" :loading="loading" @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :span="12" :ghost="ghost">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        :title="tableTitle"
        row-key="ID"
        :table-column="tableColumns"
        :table-data="tableData"
        :loading="loading"
        :hover="true"
        :active-row-type="'single'"
        :selected-row-keys="selectedRowKeys"
        :show-pagination="usePager"
        :total="dataTotal"
        :fixed-height="true"
        @select-change="rehandleSelectChange"
        @refresh="fetchTable"
      >
        <!-- 头部按钮区 -->

        <template #button>
          <t-space :size="8">
            <template v-for="(item, index) in tableHeaderButtons" :key="index">
              <template v-if="item.actionType === 'delete'">
                <t-popconfirm content="确认删除吗" @confirm="onHeaderClick(item)">
                  <t-button :theme="item.buttonTheme">{{ item.buttonName }}</t-button>
                </t-popconfirm>
              </template>
              <template v-else-if="item.actionType === 'import'">
                <bcmp-import-auto-button
                  theme="item.buttonTheme"
                  :button-text="item.buttonName"
                  :type="item.importCode"
                ></bcmp-import-auto-button>
              </template>
              <template v-else>
                <t-button :theme="item.buttonTheme" @click="onHeaderClick(item)">
                  {{ item.buttonName }}
                </t-button>
              </template>
            </template>
            <slot name="headerButton"></slot>
          </t-space>
        </template>

        <!-- 行按钮区 -->
        <template #op="slotProps">
          <t-space :size="8">
            <template v-for="(item, index) in rowButtons" :key="index">
              <template v-if="item.actionType === 'delete'">
                <t-popconfirm content="确认删除吗" @confirm="onRowClick(slotProps, item)">
                  <t-link theme="primary">{{ item.buttonName }}</t-link>
                </t-popconfirm>
              </template>
              <template v-else>
                <t-link theme="primary" @click="onRowClick(slotProps, item)">
                  {{ item.buttonName }}
                </t-link>
              </template>
            </template>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <!-- 弹出层 -->
  <t-dialog
    v-model:visible="formVisible"
    :header="currentFormAction === 'edit' ? '编辑' : '新增'"
    :on-confirm="onFormSubmit"
    :width="calculateFormWidth"
  >
    <bcmp-dynamic-form ref="formRef" :form-setting="currentFormSetting" :form-data="currentFormData" />
  </t-dialog>
</template>
<script lang="ts">
export default {
  name: 'BcmpPageSingle',
};
</script>
<script setup lang="ts">
import { cloneDeep, isEqual } from 'lodash';
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';
// import { openPage } from '@/router';

const selectedRowKeys = ref([]); // 全选控制存入字段
// / 00-组件属性定义
const props = defineProps({
  // 组件展示类型
  pageSetting: {
    type: [Object],
    default: null,
  },
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

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
// 表格数据总数
const dataTotal = ref(0);
// 表格数据
const tableData = ref([]);
// 表格列配置
const tableColumns = ref([]);
// 查询组件
const opts = ref({});
// 查询条件处理数据
const filterList = ref([]) as any;
// 表格标题
const tableTitle = ref('');
// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  filterList.value = [];
  for (const key in data) {
    if (data[key] != null && data[key] !== '') {
      const addFilter = {
        tableName: datasourceName.value,
        field: key.toUpperCase(),
        operator:
          searchSettings.value.find((item: any) => item.field.toUpperCase() === key.toUpperCase())?.operator || 'like',
        value: data[key.toUpperCase()],
      };
      filterList.value.push(addFilter);
    }
  }

  fetchTable();
};
// 全选
const rehandleSelectChange = (value: any) => {
  selectedRowKeys.value = value;
  console.log(selectedRowKeys.value);
};
// 加载角色数据表格
const fetchTable = async () => {
  setLoading(true);
  try {
    const finalFilterList: any = [];
    finalFilterList.push(...(props.relateCondition || []));
    finalFilterList.push(...(filterList.value || []));
    // 查询条件
    const searchCondition = {
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      filters: finalFilterList,
      dynamicTableName: datasourceName.value,
      dynamicBusinessDomain: domainCategory.value,
      selectedFields: selectedFields.value,
      datasourceSetting: settingObject.value.domainParmSetting.datasourceSetting,
    };
    const postUrl = `/api/${domainCategory.value.toLowerCase()}/dynamicManage/dynamicQueryDataSql`;

    const { list, total } = await http.post<any>(postUrl, searchCondition);
    tableData.value = list;
    // 转换为数字
    dataTotal.value = Number(total);
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// 数据源类型
const settingObject = ref();
const domainCategory = ref('MAIN');
const datasourceCategory = ref('TABLE');
const datasourceName = ref('');
const selectedFields = ref([]);
const searchSettings = ref([]);
const usePager = ref(true);
const currentFormAction = ref('');

// 按钮列表
const tableHeaderButtons = ref<any[]>([]);
const rowButtons = ref<any[]>([]);

const loadSetting = async () => {
  // 渲染表格列配置

  const res = props.pageSetting;
  settingObject.value = res;
  // 获取主要信息
  tableTitle.value = res.domainParamName;
  domainCategory.value = res.domainCategory;
  datasourceCategory.value = res.datasourceCategory;
  datasourceName.value = res.datasourceName;
  usePager.value = res.domainParmSetting.tableSetting.usePage;
  // 获取表格里面的field字段
  selectedFields.value = res.domainParmSetting.tableSetting.columnSetting.map((column) => ({
    tableName: column.tableName.toUpperCase(), // 假设column对象中有tableName属性
    fieldName: column.columnName.toUpperCase(), // 或者是fieldName，取决于你的实际属性名
  }));
  if (usePager.value) {
    pageUI.value.rows = res.domainParmSetting.tableSetting.pageSize || 20;
  } else {
    pageUI.value.rows = 99999;
  }

  // 获取按钮信息，配置
  const allButtonSetting = res.domainParmSetting.buttonSetting;
  tableHeaderButtons.value = allButtonSetting.filter(
    (button) => button.buttonPosition === 'tableHeader' || button.buttonPosition === 'both',
  );
  rowButtons.value = allButtonSetting.filter(
    (button) => button.buttonPosition === 'row' || button.buttonPosition === 'both',
  );

  // 获取表格列，配置
  const tableColumnSetting = res.domainParmSetting.tableSetting.columnSetting.map((column) => ({
    colKey: column.columnName.toUpperCase(), // 列绑定的字段名
    title: column.columnDesc || column.columnName.toUpperCase(), // 列显示的标题，默认使用columnDesc，不存在则使用columnName
    align: column.align, // 对齐方式
    width: column.isAutoWidth ? 'auto' : column.columnWidth, // 列宽
    fixed: determineFixed(column.isLeftFixed, column.isRightFixed), // 是否固定列
    showOverflowTooltip: !column.isAutoWidth, // 是否开启文本溢出 tooltip，如果autoWidth为true，则可能不需要此配置
    isShow: column.isVisible, // 是否显示该列
    componentSource: column.componentSource,
  }));
  if (rowButtons.value.length > 0) {
    // 根据所有按钮的内容计算宽度
    const charWidth = 20;
    let labelSumWidth = 0;
    for (let index = 0; index < rowButtons.value.length; index++) {
      labelSumWidth += rowButtons.value[index].buttonName.length * charWidth;
    }
    // 添加一些额外的空间作为缓冲
    const totalWidth = labelSumWidth + 10 * rowButtons.value.length;
    tableColumnSetting.push({
      colKey: 'op',
      title: '操作',
      align: 'center',
      fixed: 'right',
      width: totalWidth,
      isShow: true,
      showOverflowTooltip: true,
    });
  }
  if (tableHeaderButtons.value.filter((column) => column.name !== 'add').length > 0) {
    tableColumnSetting.unshift({
      colKey: 'checked',
      type: 'multiple',
      width: '80',
      isShow: true,
    });
  }
  // 过滤isShow为true的数据,作为表格的列配置
  tableColumnSetting.forEach((column: any) => {
    if (column.colKey !== 'op' && column.colKey !== 'checked') {
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
  // 获取查询信息，配置
  searchSettings.value = res.domainParmSetting.searchSetting;
  const genOptsResult = await genOpts(res.domainParmSetting.searchSetting);
  opts.value = genOptsResult;
  conditionEnter(null);
};
const determineFixed = (isLeftFixed, isRightFixed) => {
  if (isLeftFixed) return 'left';
  if (isRightFixed) return 'right';
  return '';
};
const genOpts = async (searchSetting) => {
  const optSetting: any = {};
  const promises = []; // 用于存储所有generateComponentConfig的Promise

  searchSetting.forEach((settingConfig) => {
    // 将每个异步调用放入promises数组中
    promises.push(
      generateComponentConfig(settingConfig).then((optSettingItem: any) => {
        optSetting[settingConfig.field.toUpperCase()] = optSettingItem;
      }),
    );
  });

  // 等待所有Promise完成
  await Promise.all(promises);
  return optSetting;
};

// 假设state和一些辅助函数（如focus, blur等）已经定义好
const generateComponentConfig = async (setting) => {
  const optItem: any = {
    label: setting.label,
    comp: setting.component,
    defaultVal: setting.defaultValue,
  };
  let optionsData = [];
  const sourceComponents = ['t-select', 't-radio-group', 't-checkbox-group'];
  if (sourceComponents.includes(setting.component) && setting.componentSource.sourceType === 'dataTable') {
    const postSetting = setting.componentSource.dataTable;
    const { mapBusinessDomain } = setting.componentSource.dataTable;
    const postUrl = `/api/${mapBusinessDomain.toLowerCase()}/dynamicManage/dynamicQueryDropdownListSql`;
    try {
      const res = await http.post<any>(postUrl, postSetting);
      const { list } = res;
      optionsData = list;
    } catch (error) {
      console.error('Error fetching data:', error);
      // 可能需要处理错误情况，比如设置默认值或抛出错误
    }
  }

  switch (setting.component) {
    case 't-date-range-picker-time':
      optItem.comp = 't-date-range-picker';
      optItem.bind = {
        enableTimePicker: true,
        allowInput: true,
        clearable: true,
      };
      if (optItem.defaultVal === '') {
        optItem.defaultVal = ['', ''];
      }
      break;
    case 't-date-range-picker':
      optItem.comp = 't-date-range-picker';
      optItem.bind = {
        allowInput: true,
        clearable: true,
      };
      if (optItem.defaultVal === '') {
        optItem.defaultVal = ['', ''];
      }
      break;
    case 'bcmp-select-business':
      optItem.bind = {
        type: setting.componentParam,
        multiple: setting.isMutiple,
      };
      break;
    case 'bcmp-select-param':
      optItem.bind = {
        paramGroup: setting.componentParam,
        multiple: setting.isMutiple,
      };
      break;
    case 't-select':
    case 't-radio-group':
    case 't-checkbox-group':
      if (setting.componentSource) {
        switch (setting.componentSource.sourceType) {
          case 'customDict':
            optionsData = setting.componentSource.customDict.dicData;
            break;
          case 'dataTable':
            // :todo 访问通用接口,获取列表赋值到选项

            break;
          default:
            break;
        }
      }
      optItem.bind = {
        options: optionsData,
        multiple: setting.isMutiple,
      };
      break;

    default:
      break;
  }
  return optItem;
};

const onRowClick = async (rowValue, buttonSetting) => {
  // console.log(rowValue);
  // console.log(buttonSetting);
  const rowData = tableData.value.find((item) => item.ID === rowValue.row.ID);

  let deleteTypeUrl = 'dynamicDeleteDataSql';
  let jumpLink = '';
  let customApi = '';
  const formValue = cloneDeep(rowData);
  const deleteModel = {
    tableName: datasourceName.value,
    ids: [rowData.ID],
  };
  const apiPostModel = [rowData.ID];
  // 判断是否编辑动作
  switch (buttonSetting.actionType) {
    case 'delete':
      // 删除动作
      // 根据删除类型调用不同的接口,区分物理删除与逻辑删除

      if (buttonSetting.deleteType === 'logical') {
        // 逻辑删除
        deleteTypeUrl = 'dynamicLogicDeleteDataSql';
        // 调用接口
      }

      await http.post<any>(`/api/${domainCategory.value.toLowerCase()}/dynamicManage/${deleteTypeUrl}`, deleteModel);
      MessagePlugin.success('删除成功');
      fetchTable();
      break;
    case 'form-edit':
      currentFormAction.value = 'edit';
      currentFormSetting.value = buttonSetting;
      currentFormData.value = formValue;
      formVisible.value = true;

      break;
    case 'form-custom':
      currentFormAction.value = 'edit';
      currentFormSetting.value = buttonSetting;
      currentFormData.value = formValue;
      formVisible.value = true;

      break;
    case 'link':
      jumpLink = buttonSetting.jumpLink;

      // 替换参数 {id} 把对应字段替换
      // link原数据为 /main#/moRelease?id={id}
      // 需要把{id} 替换为当前行formValue.id
      jumpLink = replacePlaceholders(jumpLink, formValue);
      // openPage(jumpLink);
      break;
    case 'customApi':
      customApi = buttonSetting.customApi;
      await http.post<any>(customApi, apiPostModel);
      MessagePlugin.success('执行成功');
      fetchTable();
      break;
    default:
      break;
  }
};

const replacePlaceholders = (url, params) => {
  return url.replace(/\{(\w+)\}/gi, (match, key) => {
    const paramKey = key.toLowerCase();
    return params[paramKey] || match;
  });
};

const onHeaderClick = async (buttonSetting) => {
  let deleteTypeUrl = 'dynamicDeleteDataSql';
  let jumpLink = '';
  let customApi = '';
  const formValue = {};
  // :todo:这里的应该是要做成批量删除-根据选中行删除
  const deleteModel = {
    tableName: datasourceName.value,
    ids: selectedRowKeys.value,
  };
  const apiPostModel = selectedRowKeys.value;
  if (
    buttonSetting.actionType !== 'form-add' &&
    buttonSetting.actionType !== 'import' &&
    buttonSetting.actionType !== 'link'
  ) {
    if (selectedRowKeys.value.length === 0) {
      MessagePlugin.warning('请选择行');
      return;
    }
  }
  const relateConditons = cloneDeep(props.relateCondition);
  const formData = {};
  // 判断是否编辑动作
  switch (buttonSetting.actionType) {
    case 'delete':
      // 删除动作
      // 根据删除类型调用不同的接口,区分物理删除与逻辑删除

      if (buttonSetting.deleteType === 'logical') {
        // 逻辑删除
        deleteTypeUrl = 'dynamicLogicDeleteDataSql';
        // 调用接口
      }

      await http.post<any>(`/api/${domainCategory.value.toLowerCase()}/dynamicManage/${deleteTypeUrl}`, deleteModel);
      MessagePlugin.success('删除成功');
      fetchTable();
      break;
    case 'form-add':
      currentFormAction.value = 'add';
      currentFormSetting.value = buttonSetting;

      // 将field 属性转换为小写驼峰形式
      relateConditons.forEach((item: any) => {
        item.field = item.field.toUpperCase();
      });

      // formData 添加 relateConditons的属性值
      relateConditons.forEach((condition: any) => {
        formData[condition.field] = condition.value;
      });
      currentFormData.value = formData;
      formVisible.value = true;

      break;
    case 'link':
      jumpLink = buttonSetting.jumpLink;
      // openPage(jumpLink);
      break;
    case 'customApi':
      customApi = buttonSetting.customApi;
      await http.post<any>(customApi, apiPostModel);
      MessagePlugin.success('执行成功');
      fetchTable();
      break;

    default:
      break;
  }
};
const formVisible = ref(false);
const currentFormSetting: any = ref([]);
const currentFullFormSetting = ref([]);
const currentFormData = ref({});
// 计算窗口宽度
// const calculateFormWidth = computed(() => {
//   const inputWidth = 270; // 假设调整后的输入框宽度
//   const labelWidth = 120;
//   const margin = 16;
//   const gap = 2;
//   const columnGap = 12;
//   if (currentFormSetting.value.length < 6) {
//     return `${inputWidth + labelWidth + margin * 2 + gap}px`;
//   }
//   if (currentFormSetting.value.length >= 6 && currentFormSetting.value.length < 16) {
//     return `${inputWidth * 2 + labelWidth * 2 + margin * 2 + columnGap + gap}px`;
//   }
//   return '90%';
// });
const calculateFormWidth = computed(() => {
  const inputWidth = 270; // 假设调整后的输入框宽度
  const labelWidth = 120;
  const margin = 16;
  const gap = 2;
  const columnGap = 12;
  const formSetting: any = cloneDeep(currentFormSetting.value);
  if (!isEqual(formSetting, {}) && !isEqual(formSetting, [])) {
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

// const formSpan = computed(() => {
//   if (currentFormSetting.value.length < 6) {
//     return 12;
//   }
//   if (currentFormSetting.value.length >= 6 && currentFormSetting.value.length < 16) {
//     return 6;
//   }
//   return 4;
// });

const formRef = ref(null);

const onFormSubmit = async () => {
  // console.log(formData);

  // 第一步:做校验

  // 第二步：提交数据
  formRef.value.handleSubmit().then(async (result) => {
    if (result !== true) {
      MessagePlugin.warning(Object.values(result)[0][0].message);
    } else {
      try {
        let actionUrl = 'dynamicInsertDataSql';
        if (currentFormAction.value === 'edit') {
          actionUrl = 'dynamicUpdateDataSql';
        }
        const postValues = formRef.value.getFormData();
        const postUrl = `/api/${domainCategory.value.toLowerCase()}/dynamicManage/${actionUrl}`;
        currentFullFormSetting.value = currentFormSetting.value.formColumnSetting;
        // 更新的时候,除了ID跟currentFormSetting.value里面的字段,其他字段不上传

        if (currentFormAction.value === 'edit') {
          // postValues 需要去掉一些字段再post到接口
          const editColumns = currentFormSetting.value.formColumnSetting.map((column) => column.field.toUpperCase());
          // 除了下面的字段,其他字段都不要
          const fieldsToInclude = ['ID', ...editColumns];

          Object.keys(postValues).forEach((key) => {
            if (!fieldsToInclude.includes(key)) {
              delete postValues[key];
            }
          });
        }
        const postModel = {
          columnSetting: currentFullFormSetting.value,
          tableName: datasourceName.value,
          fieldValues: postValues,
        };
        await http.post<any>(postUrl, postModel);
        MessagePlugin.success('提交成功');
        formVisible.value = false;
        // clearFrom();
        fetchTable();
      } catch (e) {
        console.log(e);
      }
      // featCustomer();
    }
  });
};

// const convertToBoolean = (value) => {
//   // 将值转换为小写字符串，以便进行比较
//   const lowerCaseValue = value.toString().toLowerCase();

//   // 检查值是否为 "1"、"true" 或数字 1
//   if (lowerCaseValue === '1' || lowerCaseValue === 'true' || value === 1) {
//     return true;
//   }

//   // 如果不是上述情况，则返回 false
//   return false;
// };
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
