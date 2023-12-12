<template>
  <cmp-container :full="true" class="root">
    <cmp-row>
      <cmp-card :span="3">
        <t-tabs v-model="currProcessTab">
          <t-tab-panel value="process" label="工序">
            <t-list size="small" split>
              <t-list-item v-for="item in processList" :key="item.id" @click="onClickProcess(item)">
                {{ item.processName }}
                <template #action>
                  <edit-icon v-if="currProcess.id == item.id" />
                </template>
              </t-list-item>
            </t-list>
          </t-tab-panel>
          <t-tab-panel value="route" label="工艺路线"> </t-tab-panel>
        </t-tabs>
      </cmp-card>
      <cmp-card :span="6">
        <t-tabs v-model="barcodeCategoryTab" :addable="true" @add="onClickAddTab" @remove="onChangeRemoveTab">
          <t-tab-panel
            v-for="item in panelData"
            :key="item.value"
            :value="item.value"
            :label="item.label"
            :removable="true"
          >
            <t-steps layout="vertical" separator="dashed" readonly class="steps" style="width: 100%">
              <t-step-item
                v-for="(detailItem, index) in item.data?.detailList"
                :key="index"
                :title="getAtomInfo(detailItem.businessUnitId).apiName"
                :content="getAtomInfo(detailItem.businessUnitId).apiDesc"
                status="process"
              >
                <template #extra>
                  <div class="stepRemoveBtn">
                    <t-button shape="square" variant="text" @click="item.data?.detailList.splice(index, 1)">
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
            <div>
              <t-button @click="onClickSaveData(item.data?.detailList)">保存</t-button>
              <t-button
                v-if="item.data?.detailList.length > 0"
                theme="default"
                @click="onClickSaveTemplate(item.data?.detailList)"
                >添加到模板</t-button
              >
            </div>
          </t-tab-panel>
        </t-tabs>
      </cmp-card>
      <cmp-card :span="3" :ghost="true">
        <cmp-container :full="true">
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
            <t-dialog v-model:visible="newTabSelectedVisible" :footer="false" header="选择新增条码类型">
              <t-select
                v-model="newTabSelectedValue"
                :options="barcodeTypeOptions"
                @change="(_value, { option }) => onChangeNewTab(option)"
              >
              </t-select>
            </t-dialog>
            <t-dialog
              v-model:visible="newTemplateVisible"
              header="请确认是否添加到模板"
              @confirm="onConfirmNewTemplate"
            >
              <t-input v-model="templateName" placeholder="模板名称"></t-input>
            </t-dialog>
          </cmp-card>
          <cmp-card title="模板库" header-bordered>
            <t-list size="small" split>
              <t-list-item v-for="item in templateList" :key="item.id" @click="onClickTemplate(item)">
                {{ item.tmplName }}
                <template #action>
                  <t-popconfirm :content="t('common.message.confirmDelete')" @confirm="onClickDeleteTemplate(item)">
                    <!-- <t-link theme="primary">{{ t('common.button.delete') }}</t-link> -->
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
import { CloseIcon, DeleteIcon, EditIcon } from 'tdesign-icons-vue-next';
import { DialogPlugin, MessagePlugin } from 'tdesign-vue-next';
import { nextTick, onMounted, ref } from 'vue';

import {
  api,
  BusinessTmplLib,
  BusinessTmplLibDtl,
  BusinessUnit,
  KeyValuePairStringString,
  ProcessBusinessLibDtl,
  ProcessVO,
} from '@/api/main';

import { API_CATEGORY } from './constants';
import { useLang } from './lang';

const { t } = useLang();
const currProcessTab = ref('process');
const barcodeTypeOptions = ref<KeyValuePairStringString[]>([]);
const processList = ref<ProcessVO[]>([]);
const apiAtomList = ref<BusinessUnit[]>([]);
const templateList = ref<BusinessTmplLib[]>([]);

// 获取条码类型
const fetchBarcodeType = async () => {
  barcodeTypeOptions.value = await api.param.getListByGroupCode({ parmGroupCode: 'BARCODE_TYPE' });
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

const fetchDetail = async (processId: string, barcodeCategory: string) => {
  const params = {
    processId,
    barcodeCategory,
  };
  const detailList = await api.processBusinessLib.listByIds(params);

  const currPanelData = panelData.value.find((t) => t.value === barcodeCategory);
  if (currPanelData == null) return;

  if (detailList == null || detailList.length === 0) {
    currPanelData.data = {
      mainId: await api.processBusinessLib.add(params),
      detailList: [],
    };
    return;
  }

  const newItem = {
    mainId: detailList[0].processBusinessLibId,
    detailList,
  };
  currPanelData.data = newItem;
};

onMounted(() => {
  fetchBarcodeType();
  fetchProcess();
  fetchApiAtomList();
  fetchTemplate();
});

const barcodeCategoryTab = ref('');
const newTabSelectedValue = ref('');
const newTabSelectedVisible = ref(false);
const panelData = ref<
  { label: string; value: string; data?: { mainId: string; detailList: ProcessBusinessLibDtl[] } }[]
>([]);
const onClickAddTab = () => {
  newTabSelectedVisible.value = true;
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

  if (isEmpty(currProcess.value.id)) return;
  fetchDetail(currProcess.value.id, option.value);
};
const onChangeRemoveTab = (options) => {
  panelData.value = panelData.value.filter((t) => t.value !== options.value);
};

const currProcess = ref<ProcessVO>({});
const onClickProcess = (item: ProcessVO) => {
  if (item.id === currProcess.value.id) return;
  currProcess.value = item;
  if (isEmpty(barcodeCategoryTab.value)) return;
  fetchDetail(item.id, barcodeCategoryTab.value);
};

const getAtomInfo = (id: string) => {
  return apiAtomList.value.find((t) => t.id === id);
};

const onClickAtom = (item: BusinessUnit) => {
  const currPanelData = panelData.value.find((t) => t.value === barcodeCategoryTab.value);
  if (currPanelData == null) return;
  if (currPanelData.data.detailList.findIndex((t) => t.businessUnitId === item.id) >= 0) return;
  currPanelData.data.detailList.push({
    processBusinessLibId: currPanelData.data.mainId,
    businessUnitId: item.id,
  });
};

const onClickSaveData = async (list: ProcessBusinessLibDtl[]) => {
  await api.processBusinessLibDtl.addList(list);
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
  await fetchTemplate();
  newTemplateVisible.value = false;
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
      currPanelData.data.detailList = [];
      for (let i = 0; i < list.length; i++) {
        const detailItem = list[i];
        currPanelData.data.detailList.push({
          processBusinessLibId: currPanelData.data.mainId,
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
</style>
