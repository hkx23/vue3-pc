<template>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <cmp-query :opts="opts" label-width="100" :loading="loading" @submit="conditionEnter" />
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRef"
        v-model:pagination="pageUI"
        title="导入配置列表"
        row-key="id"
        :table-column="tableColumns"
        :table-data="tableData"
        :loading="loading"
        :total="dataTotal"
        :fixed-height="true"
        @refresh="conditionEnter"
      >
        <template #businessDomain="{ row }">
          <span>{{ getBusinessDomainName(row.businessDomain) }}</span>
        </template>
        <template #importTemplateUrl="{ row }">
          <t-link theme="primary" @click="downAtta(row)">{{ getFileName(row.importTemplateUrl) }}</t-link>
        </template>
        <template #button>
          <t-button theme="primary" @click="onAddClick"> {{ t('common.button.add') }} </t-button>
        </template>

        <template #op="{ row }">
          <t-space :size="8">
            <t-link theme="primary" @click="onRowEdit(row)">{{ t('common.button.edit') }}</t-link>
            <t-link theme="primary" @click="onRowDownLoad(row)">下载配置</t-link>
            <t-link theme="primary" @click="onRowCopy(row)">复制按钮</t-link>
            <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onDelete(row)">
              <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
  <dialog-import-setting
    ref="importDialogRef"
    v-model:visible="editDialogVisable"
    @close="handleEditClose"
    @success="conditionEnter"
  ></dialog-import-setting>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';
import useClipboard from 'vue-clipboard3';

import { api } from '@/api/main';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import DialogImportSetting from './dialogImportSetting.vue';
import { useLang } from './lang';

const { t } = useLang();
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const importDialogRef = ref(null);
const editDialogVisable = ref(false);
// 表格数据总数
const dataTotal = ref(0);
// 表格数据
const tableData = ref([]);
// 表格列配置
const tableColumns: PrimaryTableCol<TableRowData>[] = [
  { title: `导入Key`, colKey: 'importKeyCode' },
  { title: `所属领域`, colKey: 'businessDomain' },
  { title: `导入表名`, colKey: 'tableName' },
  { title: `导入说明`, colKey: 'importDesc' },
  { title: `导入模板`, colKey: 'importTemplateUrl' },
  {
    colKey: 'op',
    title: `${t('common.button.operation')}`,
    width: '250px',
    fixed: 'right',
  },
];
// 查询组件
const opts = computed(() => {
  return {
    importKeyCode: {
      label: '导入Key',
      comp: 't-input',
      defaultVal: '',
    },
    tableName: {
      label: '导入表名',
      comp: 't-input',
      defaultVal: '',
    },
    businessDomain: {
      label: '所属领域',
      comp: 't-input',
      defaultVal: '',
    },
  };
});
const keyWord = ref('');
// 查询条件处理数据
const filterList = ref([]) as any;
// 点击查询按钮
const conditionEnter = (data: any) => {
  pageUI.value.page = 1;
  filterList.value = [];
  for (const key in data) {
    const addFilter = {
      field: key,
      operator: 'LIKE',
      value: data[key],
    };
    if (addFilter.value) {
      filterList.value.push(addFilter);
    }
  }

  fetchTable();
};
// 下载附件
const downAtta = (row: any) => {
  console.log('下载附件：', row);
  // 通过URL下载附件
  downFile(row.importTemplateUrl);
};

const downFile = (downUrl) => {
  const link = document.createElement('a');
  const downLink = downUrl;
  const fileName = downLink.substring(downLink.lastIndexOf('/') + 1);
  link.href = downLink;
  link.download = fileName; // 自定义文件名，根据实际情况调整
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
      keyWord: keyWord.value,
    };

    const data = (await api.importManage.search(searchCondition)) as any;
    const { list } = data;
    tableData.value = list;
    dataTotal.value = data.total;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

const getFileName = (filePath) => {
  // 假设你有一个完整的URL字符串
  const url = filePath;

  // 截取URL中的文件名部分
  const filenameEncoded = url.split('/').pop().split('?')[0];

  // 将URL编码解码为中文
  const filenameDecoded = decodeURIComponent(filenameEncoded);

  return filenameDecoded;
};
// 加载表格
// const getDataTables = async () => {
//   const params = { businessCode: 'quality' };
//   const tables = (await api.importManage.tables(params)) as any;
//   console.log(tables);
// };

const onAddClick = () => {
  console.log('新增');
  importDialogRef.value.initAddData();
  editDialogVisable.value = true;
  // reset(false, null);
  // formAdd.value = true;
  // formVisible.value = true;
};
// 行编辑按钮按下，加载行对应的信息，根据导入ID从接口获取明细数据，赋值后打开编辑窗口
const onRowEdit = (row: any) => {
  console.log(row);
  // 根据行ID获取明细数据
  const { id } = row;
  api.importManage.getItemById({ id }).then((res) => {
    const editModel = res;
    importDialogRef.value.initEditData(editModel);
    editDialogVisable.value = true;
  });
};

const onRowDownLoad = (row: any) => {
  console.log(row);
  // 根据行ID获取明细数据
  const { importKeyCode } = row;
  api.importManage.getSettingFileByKey({ key: importKeyCode }).then((res) => {
    const editModel = res;
    downFile(editModel);
    console.log(editModel);
  });
};

const onRowCopy = (row: any) => {
  console.log(row);
  const typeVariable = row.importKeyCode;
  const buttonText = '导入';
  const importButtonTemplate = `<bcmp-import-auto-button theme="default" button-text="${buttonText}" type="${typeVariable}"></bcmp-import-auto-button>`;

  copyImportCode(importButtonTemplate);
};

const copyImportCode = async (item) => {
  try {
    const { toClipboard } = useClipboard();
    await toClipboard(item);
    MessagePlugin.success('复制成功,请粘贴到需要此导入按钮的页面代码中');
  } catch (e) {
    console.error(e);
  }
};

// 行删除按钮按下，删除对应行信息

const onDelete = async (row: any) => {
  await api.importManage.delete({ id: row.id });
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchTable();
};

const handleEditClose = () => {
  // 关闭窗口事件
  editDialogVisable.value = false;
};
const businessDomainList = ref([]);
const loadBusinessDomainList = async () => {
  const res = await api.importManage.businessDomain();
  businessDomainList.value = res;
};

const getBusinessDomainName = (businessDomainValue) => {
  const businessDomain = businessDomainList.value.find((item) => {
    return item.value === businessDomainValue;
  });
  return businessDomain?.label;
};
// 渲染函数
onMounted(async () => {
  loadBusinessDomainList(); // 业务领域 上 请求
  fetchTable();
  // getDataTables();
});
</script>

<style scoped>
.main-page-content:not(:last-child) {
  border-bottom: 1px solid rgb(213 216 219 / 100%);
}
</style>
