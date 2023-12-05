<template>
  <div class="main-page">
    <div class="main-page-content">
      <cmp-table
        :table-column="templateColumn"
        :table-data="templateData?.list"
        :total="templateData?.total"
        :multiple="false"
        select-on-row-click
        @select-change="onSelectTemplate"
        @refresh="fetchTemplateData"
      >
        <template #button>
          <t-input v-model="filterText" :placeholder="t('common.placeholder.input')" @change="onInputFilter">
            <template #suffix-icon>
              <search-icon size="var(--td-comp-size-xxxs)" />
            </template>
          </t-input>
        </template>
        <template #oprate>
          <t-button @click="onClickAddTemplate">{{ t('common.button.add') }}</t-button>
          <t-button theme="default" @click="onClickAddTemplate">{{ t('common.button.delete') }}</t-button>
        </template>
        <template #op="{ row }">
          <t-link theme="primary" style="margin-right: 8px" @click="onClickEditTemplate(row)">{{
            t('common.button.edit')
          }}</t-link>
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onClickDeleteTemplate(row.id)">
            <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
          </t-popconfirm>
        </template>
      </cmp-table>
    </div>
    <div class="main-page-content">
      <cmp-table
        :table-column="templateCategoryColumn"
        :table-data="templateCategoryData?.list"
        :total="templateCategoryData?.total"
        @refresh="fetchTemplateCategoryData"
      >
        <template #button>
          <bcmp-select-business
            v-model="filterMitemId"
            type="mitem"
            @change="fetchTemplateCategoryData"
          ></bcmp-select-business>
          <bcmp-select-business
            v-model="filterMitemCategoryId"
            type="mitemCategory"
            @change="fetchTemplateCategoryData"
          ></bcmp-select-business>
        </template>
        <template #oprate>
          <t-button :disabled="!selectedRowTemplateId" @click="onClickAddMapTemplate">{{
            t('printTemplate.templateMap')
          }}</t-button>
        </template>
        <template #op="{ row }">
          <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onClickDeleteMapTemplate(row.id)">
            <t-link theme="primary">{{ t('common.button.delete') }}</t-link>
          </t-popconfirm>
        </template>
      </cmp-table>
    </div>
  </div>
  <t-dialog
    v-model:visible="templateFormVisible"
    :header="
      isEditTemplate
        ? t('common.dialog.header.edit', [t('printTemplate.title')])
        : t('common.dialog.header.add', [t('printTemplate.title')])
    "
    :on-confirm="onConfirmTemplateForm"
  >
    <template-form ref="templateFormRef" />
  </t-dialog>
  <t-dialog
    v-model:visible="templateMapFormVisible"
    :header="t('common.dialog.header.add', [t('printTemplate.templateMap')])"
    :on-confirm="onConfirmTemplateMapForm"
  >
    <template-map-form ref="templateMapFormRef" />
  </t-dialog>
</template>

<script setup lang="tsx">
import debounce from 'lodash/debounce';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api, PagingDataPrintTmpl, PagingDataPrintTmplMapDTO } from '@/api/main';

import { TEMPLATE_TYPE, TemplateFormRef, TemplateMapFormRef } from './constants';
import TemplateForm from './form.vue';
import { useLang } from './lang';
import TemplateMapForm from './mapForm.vue';

const { t } = useLang();

let templateCategoryObject = {};
const templateTypeObject = TEMPLATE_TYPE.reduce((acc, item) => {
  (acc as any)[item.value] = item.label;
  return acc;
}, {});

const fetchTemplateCategoryDic = async () => {
  templateCategoryObject = (await api.param.getListByGroupCode({ parmGroupCode: 'PRINT_TMPL_CATEGORY' })).reduce(
    (acc, item) => {
      (acc as any)[item.value] = item.label;
      return acc;
    },
    {},
  );
};

const templateColumn = [
  { colKey: 'row-select', type: 'single', width: 64, fixed: 'left' },
  {
    colKey: 'serial-number',
    title: t('business.main.serialNumber'),
  },
  {
    title: t('printTemplate.templateCode'),
    colKey: 'tmplCode',
  },
  {
    title: t('printTemplate.templateName'),
    colKey: 'tmplName',
  },
  {
    title: t('printTemplate.templateDesc'),
    colKey: 'tmplDesc',
  },
  {
    title: t('printTemplate.templateCategory'),
    colKey: 'tmplCategory',
    // @ts-ignore
    cell: (_h: any, { row }) => {
      // @ts-ignore
      return <div>{templateCategoryObject[row.tmplCategory]}</div>;
    },
  },
  {
    title: t('printTemplate.templateType'),
    colKey: 'tmplType',
    // @ts-ignore
    cell: (_h: any, { row }) => {
      // @ts-ignore
      return <div>{templateTypeObject[row.tmplType]}</div>;
    },
  },
  {
    title: t('business.main.creator'),
    colKey: 'creator',
  },
  {
    title: t('business.main.timeCreate'),
    colKey: 'timeCreate',
  },
  {
    title: '操作',
    colKey: 'op',
  },
];
const templateData = ref<PagingDataPrintTmpl>(null);
const fetchTemplateData = async () => {
  templateData.value = await api.printTmpl.search({
    keyword: filterText.value,
  });
};
const onClickAddTemplate = () => {
  const { reset } = templateFormRef.value;
  reset(false);
  templateFormVisible.value = true;
};
const onClickEditTemplate = (row) => {
  const { reset } = templateFormRef.value;

  reset(true, row);
  templateFormVisible.value = true;
};
const onClickDeleteTemplate = async (id) => {
  await api.printTmpl.batchDelete([id]);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchTemplateData();
};
const selectedRowTemplateId = ref<string>(null);
const onSelectTemplate = (ids: string[]) => {
  if (ids.length > 0) {
    const [first] = ids;
    selectedRowTemplateId.value = first;
    fetchTemplateCategoryData();
  }
};
const templateFormVisible = ref(false);
const isEditTemplate = ref(false);
const templateFormRef = ref<TemplateFormRef>(null);
const onConfirmTemplateForm = () => {
  const { submit } = templateFormRef.value;
  submit().then(() => {
    templateFormVisible.value = false;
    fetchTemplateData();
  });
};
const filterText = ref('');
const onInputFilter = debounce(() => {
  fetchTemplateData();
}, 1000);

const templateCategoryColumn = [
  {
    colKey: 'serial-number',
    title: t('business.main.serialNumber'),
  },
  {
    title: t('business.main.mitemCategoryCode'),
    colKey: 'mitemCategoryCode',
  },
  {
    title: t('business.main.mitemCategoryName'),
    colKey: 'mitemCategoryName',
  },
  {
    title: t('business.main.mitemCode'),
    colKey: 'mitemCode',
  },
  {
    title: t('business.main.mitemName'),
    colKey: 'mitemName',
  },
  {
    title: t('common.button.operation'),
    colKey: 'op',
  },
];
const filterMitemId = ref('');
const filterMitemCategoryId = ref('');

const templateCategoryData = ref<PagingDataPrintTmplMapDTO>(null);
const fetchTemplateCategoryData = async () => {
  templateCategoryData.value = await api.printTmplMap.search({
    printTmplId: selectedRowTemplateId.value,
    mitemId: filterMitemId.value,
    mitemCategoryId: filterMitemCategoryId.value,
  });
};
const onClickAddMapTemplate = () => {
  const { reset } = templateMapFormRef.value;
  reset(false, {
    printTmplId: selectedRowTemplateId.value,
  });
  templateMapFormVisible.value = true;
};
const onClickDeleteMapTemplate = async (id) => {
  await api.printTmplMap.batchDelete([id]);
  MessagePlugin.success(t('common.message.deleteSuccess'));
  fetchTemplateCategoryData();
};
const templateMapFormVisible = ref(false);
const templateMapFormRef = ref<TemplateMapFormRef>(null);
const onConfirmTemplateMapForm = () => {
  const { submit } = templateMapFormRef.value;
  submit().then(() => {
    templateMapFormVisible.value = false;
    fetchTemplateCategoryData();
  });
};

onMounted(() => {
  fetchTemplateCategoryDic();
  fetchTemplateData();
});
</script>

<style lang="less" scoped></style>
