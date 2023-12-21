<template>
  <cmp-container :full="true" class="root">
    <cmp-row>
      <cmp-card flex="280px">
        <t-tabs v-model="currProcessTab">
          <t-tab-panel value="process" label="工序">
            <t-input v-model="filterText" style="margin: 8px 0" :placeholder="t('common.placeholder.input')">
              <template #suffix-icon>
                <search-icon size="var(--td-comp-size-xxxs)" />
              </template>
            </t-input>

            <t-list size="small" split>
              <t-list-item v-for="item in filterProcessList" :key="item.id" @click="onClickProcess(item.id, 'process')">
                {{ item.processName }}
                <template #action>
                  <edit-icon v-if="currProcessId == item.id" />
                  <div v-if="headerCategoryData[item.id]" class="activeProcess"></div>
                </template>
              </t-list-item>
            </t-list>
          </t-tab-panel>
          <t-tab-panel value="routingProcess" label="工艺路线">
            <t-input v-model="filterText" style="margin: 8px 0" :placeholder="t('common.placeholder.input')">
              <template #suffix-icon>
                <search-icon size="var(--td-comp-size-xxxs)" />
              </template>
            </t-input>

            <t-tree
              :data="routingProcessTree"
              :keys="treeKeys"
              hover
              :filter="filterTreeByText"
              :expand-on-click-node="false"
              activable
              @click="({ node }) => (node.data.children ? null : onClickProcess(node.data.id, 'routingProcess'))"
            >
              <template #operations="{ node }">
                <edit-icon v-if="currProcessId == node.data.id" />
                <t-tag v-if="node.data.children" size="small" theme="success" variant="outline">
                  {{ node.data.version }}
                </t-tag>
                <div v-if="headerCategoryData[node.data.id]" class="activeProcess"></div>
              </template>
            </t-tree>
          </t-tab-panel>
        </t-tabs>
      </cmp-card>
      <cmp-card flex="auto">
        <div v-if="panelData == null || panelData.length == 0">
          <t-button block variant="dashed" style="margin-bottom: 32px" @click="onClickAddTab">选择条码类型</t-button>
          <ul>
            <li v-for="i in 3" :key="i" style="margin-bottom: 32px">
              <t-skeleton theme="paragraph"></t-skeleton>
            </li>
          </ul>
        </div>

        <t-tabs
          v-else
          v-model="barcodeCategoryTab"
          :addable="true"
          @change="onChangeTab"
          @add="onClickAddTab"
          @remove="onChangeRemoveTab"
        >
          <t-tab-panel
            v-for="item in panelData"
            :key="item.value"
            :value="item.value"
            :label="item.label"
            :removable="true"
          >
            <t-steps
              v-if="item?.detailList?.length > 0"
              v-draggable="[item.detailList as unknown as Ref<any[]>, { animation: 150 }]"
              layout="vertical"
              separator="dashed"
              readonly
              class="steps"
            >
              <t-step-item
                v-for="(detailItem, index) in item.detailList"
                :key="detailItem.businessUnitId"
                :title="getAtomInfo(detailItem.businessUnitId).apiName"
                :content="getAtomInfo(detailItem.businessUnitId).apiDesc"
                status="process"
              >
                <template #extra>
                  <div class="stepRemoveBtn">
                    <t-button shape="square" variant="text" @click="item?.detailList.splice(index, 1)">
                      <template #icon><close-icon /></template>
                    </t-button>
                  </div>
                  <div class="stepTag">
                    <t-tag theme="success" variant="outline">{{
                      atomById(detailItem.businessUnitId).paramCategory
                    }}</t-tag>
                  </div>
                </template>
              </t-step-item>
            </t-steps>
            <div style="margin-top: 24px; text-align: center">
              <t-button @click="onClickSaveData(item?.detailList)">保存</t-button>
              <t-button
                v-if="item?.detailList?.length > 0"
                theme="default"
                @click="onClickSaveTemplate(item?.detailList)"
                >添加到模板</t-button
              >
              <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onClickDeleteHeader(item.mainId)">
                <t-button theme="default">
                  {{ t('common.button.delete') }}
                </t-button>
              </t-popconfirm>
            </div>
          </t-tab-panel>
        </t-tabs>
      </cmp-card>
      <cmp-card flex="280px" :ghost="true">
        <cmp-container :full="true" :full-sub-index="[0]">
          <cmp-card>
            <t-tabs model-value="api">
              <t-tab-panel value="api" label="API" style="overflow-y: auto">
                <t-collapse :borderless="true" style="margin-top: 8px">
                  <t-collapse-panel
                    v-for="item in API_CATEGORY"
                    v-show="atomListByCategory(item.value)?.length > 0"
                    :key="item.value"
                    :value="item.value"
                    :header="`${item.value} ${item.label}`"
                  >
                    <!-- <template v-for="apiItem in atomListByCategory(item.value)" :key="apiItem.id">
                      <t-card :title="apiItem.apiName" header-bordered> {{ apiItem.apiDesc }} </t-card>
                    </template> -->
                    <t-list stripe>
                      <t-list-item
                        v-for="apiItem in atomListByCategory(item.value)"
                        :key="apiItem.id"
                        @click="onClickAtom(apiItem)"
                      >
                        <t-list-item-meta :title="apiItem.apiName" :description="apiItem.apiDesc" />
                      </t-list-item>
                    </t-list>
                  </t-collapse-panel>
                </t-collapse>
              </t-tab-panel>
              <!-- <t-tab-panel value="script" label="Script"></t-tab-panel> -->
            </t-tabs>
            <t-dialog v-model:visible="newTabSelectedVisible" :footer="false" header="选择条码类型">
              <t-select
                v-model="newTabSelectedValue"
                :options="barcodeTypeOptions"
                @change="(_value, { option }) => onChangeNewTab(option)"
              >
              </t-select>
            </t-dialog>
            <t-dialog v-model:visible="newTemplateVisible" header="请输入模板名称" @confirm="onConfirmNewTemplate">
              <t-input v-model="templateName" placeholder="模板名称"></t-input>
            </t-dialog>
          </cmp-card>
          <cmp-card title="模板库" header-bordered>
            <t-list size="small" split>
              <t-list-item v-for="item in templateList" :key="item.id">
                <div style="width: 100%" @click="onClickTemplate(item)">
                  {{ item.tmplName }}
                </div>
                <template #action>
                  <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onClickDeleteTemplate(item)">
                    <t-button variant="text" shape="square">
                      <delete-icon />
                    </t-button>
                  </t-popconfirm>
                </template>
              </t-list-item>
            </t-list>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash';
import { CloseIcon, DeleteIcon, EditIcon, SearchIcon } from 'tdesign-icons-vue-next';
import { DialogPlugin, MessagePlugin, TreeNodeModel } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, Ref, ref } from 'vue';
import { vDraggable } from 'vue-draggable-plus';

import {
  api,
  BusinessTmplLib,
  BusinessTmplLibDtl,
  BusinessUnit,
  KeyValuePairStringString,
  ProcessBusinessLibDtl,
  ProcessVO,
  RoutingProcessVO,
} from '@/api/main';

import { API_CATEGORY } from './constants';
import { useLang } from './lang';

const { t } = useLang();
const currProcessTab = ref('process');
const barcodeTypeOptions = ref<KeyValuePairStringString[]>([]);
const barcodeTypeObj = ref({});
const routingProcessTree = ref<RoutingProcessVO[]>([]);
const processList = ref<ProcessVO[]>([]);
const apiAtomList = ref<BusinessUnit[]>([]);
const templateList = ref<BusinessTmplLib[]>([]);

// 获取条码类型
const fetchBarcodeType = async () => {
  barcodeTypeOptions.value = await api.param.getListByGroupCode({ parmGroupCode: 'BARCODE_TYPE' });
  barcodeTypeObj.value = barcodeTypeOptions.value.reduce((acc, item) => {
    (acc as any)[item.value] = item.label;
    return acc;
  }, {});
};

// 获取工序
const fetchProcess = async () => {
  processList.value = (
    await api.process.search({
      pageNum: 1,
      pageSize: 99999,
    })
  ).list;
};

const fetchRoutingProcess = async () => {
  routingProcessTree.value = await api.routing.getProcessTree();
};

// 获取api 原子清单
const fetchApiAtomList = async () => {
  apiAtomList.value = await api.businessUnit.items();
};

// 获取模板清单
const fetchTemplate = async () => {
  templateList.value = await api.businessTmplLib.items();
};

const atomListByCategory = (category: string) => {
  return apiAtomList.value?.filter((t) => t.paramCategory === category) as BusinessUnit[];
};

const atomById = (id: string) => {
  return apiAtomList.value?.find((t) => t.id === id) as BusinessUnit;
};

const headerCategoryData = ref<{ [key: string]: string[] }>({});
// 获取已维护工序
const fetchHeaderMaintained = async () => {
  headerCategoryData.value = {};
  const list = await api.processBusinessLib.list();
  for (const item of list) {
    const key = item.processId === '0' ? item.routingProcessId : item.processId;
    let data: string[] = [];
    if (Object.prototype.hasOwnProperty.call(headerCategoryData.value, key)) {
      data = headerCategoryData.value[key];
      if (data.indexOf(item.barcodeCategory) < 0) data.push(item.barcodeCategory);
    } else {
      data = [item.barcodeCategory];
    }
    headerCategoryData.value[key] = data;
  }
};

const fetchDetail = async (processId: string, barcodeCategory: string) => {
  const params = {
    processId: currProcessType.value === 'process' ? processId : '0',
    routingProcessId: currProcessType.value === 'routingProcess' ? processId : '0',
    barcodeCategory,
  };
  const detailList = await api.processBusinessLib.listByIds(params);

  const currPanelData = panelData.value.find((t) => t.value === barcodeCategory);
  if (currPanelData == null) return;

  if (detailList == null || detailList.length === 0) {
    currPanelData.mainId = await api.processBusinessLib.add(params);
    currPanelData.detailList = [];
    return;
  }

  currPanelData.mainId = detailList[0].processBusinessLibId;
  currPanelData.detailList = detailList;
};

const filterText = ref();
const filterTreeByText = computed(() => {
  if (isEmpty(filterText.value)) return null;
  return (node: TreeNodeModel) => {
    return node.label.indexOf(filterText.value) >= 0;
  };
});
const filterProcessList = computed(() => {
  if (isEmpty(filterText.value)) return processList.value;
  return processList.value.filter((t) => t.processName.includes(filterText.value));
});

onMounted(() => {
  fetchBarcodeType();
  fetchProcess();
  fetchRoutingProcess();
  fetchApiAtomList();
  fetchTemplate();
  fetchHeaderMaintained();
});

const treeKeys = { value: 'id', label: 'title' };

const barcodeCategoryTab = ref('');
const newTabSelectedValue = ref('');
const newTabSelectedVisible = ref(false);
const panelData = ref<{ label: string; value: string; mainId?: string; detailList?: ProcessBusinessLibDtl[] }[]>([]);
const onClickAddTab = () => {
  newTabSelectedVisible.value = true;
};
const onChangeTab = async (val) => {
  await fetchDetail(currProcessId.value, val);
};
const onChangeNewTab = (option) => {
  nextTick(() => {
    newTabSelectedValue.value = '';
    barcodeCategoryTab.value = option.value;
    newTabSelectedVisible.value = false;
  });
  if (panelData.value.find((t) => t.value === option.value)) {
    return;
  }
  panelData.value.push({
    value: option.value,
    label: option.label,
  });

  if (isEmpty(currProcessId.value)) return;
  fetchDetail(currProcessId.value, option.value);
};
const onChangeRemoveTab = (options) => {
  panelData.value = panelData.value.filter((t) => t.value !== options.value);
};

const currProcessId = ref('');
const currProcessType = ref('');
const onClickProcess = (id: string, type: string) => {
  if (id === currProcessId.value) return;
  currProcessId.value = id;
  currProcessType.value = type;
  const panel = [];
  const categoryList = headerCategoryData.value[id];
  if (categoryList && categoryList.length > 0) {
    for (let i = 0; i < categoryList.length; i++) {
      const item = categoryList[i];
      if (i === 0) {
        barcodeCategoryTab.value = item;
      }
      panel.push({
        value: item,
        label: barcodeTypeObj.value[item] || item,
      });
    }
  }

  panelData.value = panel;

  if (isEmpty(barcodeCategoryTab.value)) return;
  fetchDetail(id, barcodeCategoryTab.value);
};

const getAtomInfo = (id: string) => {
  return apiAtomList.value.find((t) => t.id === id);
};

const onClickAtom = (item: BusinessUnit) => {
  const currPanelData = panelData.value.find((t) => t.value === barcodeCategoryTab.value);
  if (currPanelData == null) return;
  if (currPanelData.detailList.findIndex((t) => t.businessUnitId === item.id) >= 0) return;
  currPanelData.detailList.push({
    processBusinessLibId: currPanelData.mainId,
    businessUnitId: item.id,
  });
};

const onClickSaveData = async (list: ProcessBusinessLibDtl[]) => {
  await api.processBusinessLibDtl.addList(list);
  await fetchDetail(currProcessId.value, barcodeCategoryTab.value);
  fetchHeaderMaintained();
  MessagePlugin.success(t('common.message.saveSuccess'));
};

const onClickSaveTemplate = async (list: ProcessBusinessLibDtl[]) => {
  newTemplateVisible.value = true;
  templateDetailList.value = list;
};

const templateName = ref('');
const newTemplateVisible = ref(false);
const templateDetailList = ref<ProcessBusinessLibDtl[]>([]);

const onConfirmNewTemplate = async () => {
  await addTemplate(templateName.value, templateDetailList.value);
  fetchTemplate();
  newTemplateVisible.value = false;
  MessagePlugin.success(t('common.message.saveSuccess'));
};
const addTemplate = async (tmplName: string, list: ProcessBusinessLibDtl[]) => {
  const mainId = await api.businessTmplLib.add({
    tmplName,
  });
  await api.businessTmplLibDtl.addList(
    list.map((t) => {
      return {
        businessTmplId: mainId,
        businessUnitId: t.businessUnitId,
      } as BusinessTmplLibDtl;
    }),
  );
  templateName.value = '';
};

const onClickTemplate = async (item: BusinessTmplLib) => {
  const confirmDia = DialogPlugin.confirm({
    header: '警告',
    body: '是否使用模板覆盖当前配置',
    onConfirm: async () => {
      const list = await api.businessTmplLib.listByIds(item);
      const currPanelData = panelData.value.find((t) => t.value === barcodeCategoryTab.value);
      if (currPanelData == null) return;
      currPanelData.detailList = [];
      for (let i = 0; i < list.length; i++) {
        const detailItem = list[i];
        currPanelData.detailList.push({
          processBusinessLibId: currPanelData.mainId,
          businessUnitId: detailItem.businessUnitId,
        });
      }
      confirmDia.hide();
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};
const onClickDeleteTemplate = async (item: BusinessTmplLib) => {
  await api.businessTmplLib.batchDelete([item.id]);
  await fetchTemplate();
  MessagePlugin.success(t('common.message.deleteSuccess'));
};

const onClickDeleteHeader = async (mainId) => {
  if (!mainId) return;
  await api.processBusinessLib.batchDelete([mainId]);
  panelData.value = panelData.value.filter((t) => t.value !== barcodeCategoryTab.value);
  if (panelData.value.length > 0) {
    barcodeCategoryTab.value = panelData.value[0].value;
  }
  fetchHeaderMaintained();
  MessagePlugin.success(t('common.message.deleteSuccess'));
};
</script>

<style lang="less" scoped>
.root {
  :deep(.t-list-item) {
    cursor: pointer;

    &:hover {
      color: var(--td-brand-color);
      font-weight: 700;
    }
  }
}

.steps {
  width: 100%;

  :deep(.t-steps-item__inner) {
    width: 100%;
  }

  .stepRemoveBtn {
    position: absolute;
    right: 0;
    top: 0;
  }

  .stepTag {
    position: absolute;
    top: 4px;
    right: 48px;
  }
}

.activeProcess {
  background-color: var(--td-brand-color);
  width: 4px;
  height: 16px;
  border-radius: 2px;
  position: absolute;
  left: 0;
  top: 11px;
}
</style>
