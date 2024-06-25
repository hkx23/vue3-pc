<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" label-width="100" :loading="loading" @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :span="12">
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
        @refresh="conditionEnter"
      >
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>
<script lang="ts">
export default {
  name: 'SearchTemplate',
};
</script>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { api } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

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
        tableName: 'm_asset_brand',
        field: key,
        operator: 'EQ',
        value: data[key],
      };
      filterList.value.push(addFilter);
    }
  }

  fetchTable();
};
// 加载角色数据表格
const fetchTable = async () => {
  setLoading(true);
  try {
    // 查询条件
    const searchCondition = {
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      filters: filterList.value,
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
const usePager = ref(true);

const loadSetting = () => {
  // 渲染表格列配置
  const route = useRoute();
  const { domainParamId } = route.query;

  api.domainParam.getItemById({ id: domainParamId.toString() }).then((res) => {
    settingObject.value = res;
    // 获取主要信息
    tableTitle.value = res.domainParamName;
    domainCategory.value = res.domainCategory;
    datasourceCategory.value = res.datasourceCategory;
    datasourceName.value = res.datasourceName;
    usePager.value = res.domainParmSetting.tableSetting.usePage;
    // 获取表格里面的field字段
    selectedFields.value = res.domainParmSetting.tableSetting.columnSetting.map((column) => ({
      tableName: column.tableName, // 假设column对象中有tableName属性
      fieldName: column.columnName, // 或者是fieldName，取决于你的实际属性名
    }));
    if (usePager.value) {
      pageUI.value.rows = res.domainParmSetting.tableSetting.pageSize || 20;
    } else {
      pageUI.value.rows = 99999;
    }

    // 获取表格列，配置
    const tableColumnSetting = res.domainParmSetting.tableSetting.columnSetting.map((column) => ({
      colKey: column.columnName, // 列绑定的字段名
      title: column.columnDesc || column.columnName, // 列显示的标题，默认使用columnDesc，不存在则使用columnName
      align: column.align, // 对齐方式
      width: column.isAutoWidth ? 'auto' : column.columnWidth, // 列宽
      fixed: column.isFixed, // 是否固定列
      showOverflowTooltip: !column.isAutoWidth, // 是否开启文本溢出 tooltip，如果autoWidth为true，则可能不需要此配置
      isShow: column.isVisible, // 是否显示该列
    }));
    // 过滤isShow为true的数据,作为表格的列配置
    tableColumns.value = tableColumnSetting.filter((column) => column.isShow);
    // 获取查询信息，配置
    opts.value = genOpts(res.domainParmSetting.searchSetting);
  });
};
const genOpts = (searchSetting) => {
  const optSetting = {};

  searchSetting.forEach((settingConfig) => {
    const optSettingItem = generateComponentConfig(settingConfig);
    optSetting[settingConfig.field] = optSettingItem;
  });

  return optSetting;
};

// 假设state和一些辅助函数（如focus, blur等）已经定义好
const generateComponentConfig = (setting) => {
  const optItem: any = {
    label: setting.label,
    comp: setting.component,
    defaultVal: setting.defaultValue,
  };
  let optionsData = [];
  switch (setting.component) {
    case 'bcmp-select-business':
      optItem.bind = {
        type: setting.componentParam,
        showTitle: false,
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

// 渲染函数
onMounted(() => {
  loadSetting();
});
</script>
