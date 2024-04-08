<template>
  <cmp-container :full="true">
    <!-- 扫描区 -->
    <cmp-card>
      <bcmp-workstation-info @change="onWorkstationChange" />
      <t-row class="padding-top-line-8" style="padding-bottom: 8px">
        <t-col>
          <t-descriptions :column="4">
            <t-descriptions-item label="排产单号" span="2">
              <bcmp-select-business
                ref="scanInput"
                v-model="mainform.serialNumber"
                type="moSchedule"
                component-type="table"
                :show-title="false"
                @selection-change="serialNumberEnter"
              />
            </t-descriptions-item>
            <t-descriptions-item label="缺陷数量">100</t-descriptions-item>
            <t-descriptions-item>
              <template #label>
                <t-button style="width: 100px">保存</t-button>
              </template>
            </t-descriptions-item>

            <t-descriptions-item :label="t('processInspectionByMo.mitemCode')">
              <div style="width: 100px">{{ productInfo.moMitemCode }}</div>
            </t-descriptions-item>
            <t-descriptions-item :label="t('processInspectionByMo.mitemName')">
              <div style="width: 300px">{{ productInfo.moMitemName }}</div>
            </t-descriptions-item>
            <t-descriptions-item :label="t('processInspectionByMo.scheDate')">
              <div style="width: 150px">{{ productInfo.scheDatetimeSche }}</div>
            </t-descriptions-item>
            <t-descriptions-item :label="t('processInspectionByMo.scheQty')">
              <div style="width: 100px">{{ productInfo.scheQty }}</div>
            </t-descriptions-item>
          </t-descriptions>
        </t-col>
      </t-row>
    </cmp-card>
    <cmp-row>
      <!-- 缺陷信息 -->
      <cmp-card flex="auto">
        <cmp-container :full="true" :full-sub-index="[1]">
          <div
            style="
              border-bottom: 1px solid var(--td-component-border);
              padding: 0 0 4px;
              font-weight: bold;
              color: var(--td-gray-color-8);
              font-size: 16px;
            "
          >
            缺陷信息
          </div>
          <cmp-row ref="refDefectRow">
            <t-space class="anchor-defect" flex="120px">
              <t-anchor
                container="#anchor-container"
                :bounds="10"
                size="small"
                :style="{ height: `${anchorHeight}` }"
                @click="handleClick"
              >
                <template #cursor>
                  <div class="test-cursor" />
                </template>
                <t-anchor-item
                  v-for="(item, index) in defectCodeList.filter((sourceItem) => sourceItem.child.length > 0)"
                  :key="index"
                  :href="`#${item.defectName}`"
                  :title="item.defectName"
                />
              </t-anchor>
            </t-space>
            <cmp-card :bordered="false" flex="auto" class="defect-card">
              <t-space
                id="anchor-container"
                class="defect-card-content"
                direction="vertical"
                :style="{ height: `${anchorHeight}` }"
                style="overflow-y: auto"
              >
                <t-tabs
                  v-for="(item, index) in defectCodeList.filter((sourceItem) => sourceItem.child.length > 0)"
                  :id="`${item.defectName}`"
                  :key="index"
                  :default-value="1"
                  style="width: 100%"
                >
                  <t-tab-panel :value="1" :label="item.defectName">
                    <t-space break-line class="defect-buttons" :size="12">
                      <t-button
                        v-for="(item_child, index_child) in item.child"
                        :key="index_child"
                        :theme="getThemeButton(item_child.themeButton)"
                        @click="clickDefectCode(item_child)"
                      >
                        <template #content>
                          <div style="white-space: normal; word-wrap: break-word; width: 80px; text-align: left">
                            {{ item_child.defectName }}
                          </div>
                        </template>
                        <template #suffix>
                          <t-input-number v-model="item_child.ngQty" />
                        </template>
                      </t-button>
                    </t-space>
                  </t-tab-panel>
                </t-tabs>
              </t-space>
            </cmp-card>
          </cmp-row>
          <t-space style="overflow: auto" :size="12">
            <t-tooltip v-for="(item, index) in scanInfoSplicList" :key="index" :content="item.serialNumber">
              <t-button theme="default" shape="rectangle" variant="base" @click="clickHistoryDefectCode(item)">
                <t-space :size="8">
                  <span class="cardno">{{ item.serialNumber }} </span>
                  <t-tag :theme="item.status == 'OK' ? 'success' : 'danger'">{{ item.status }}</t-tag>
                </t-space>
              </t-button>
            </t-tooltip>
          </t-space>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import _, { isEmpty, isNil } from 'lodash';
import { computed, onMounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api, DefectCodeVO } from '@/api/control';
import BcmpWorkstationInfo from '@/components/bcmp-workstation-info/index.vue';

import { scanInfoModel } from '../../api/processInspection';
import { useLang } from './lang';
// 全局信息
const scanInfoList = ref<scanInfoModel[]>([]);

const scanInfoSplicList = computed(() => {
  return scanInfoList.value.slice(0, 5);
});
import { useUserStore } from '@/store';

const { t } = useLang();
const userStore = useUserStore();

const handleClick = ({ e, href, title }) => {
  e.preventDefault();
  console.log('click', href, title);
};
const mainform = ref({
  serialNumber: '',
});

const scanInput = ref(null);

// 全局缺陷列表
const defectCodeList = ref<DefectCodeVO[]>([]);

// 当前选中的缺陷列表
const selectDefectCodeList = ref<DefectCodeVO[]>([]);

// 界面产品信息
const productInfo = ref({
  scheCode: '',
  scheDatetimeSche: '',
  scheQty: '',
  moCode: '',
  moMitemCode: '',
  moMitemName: '',
  moCompletedQty: '',
});

const Init = async () => {
  getDefectCodeTree();
};

const serialNumberEnter = async (value) => {
  if (!isEmpty(value)) {
    await api.processInspection
      .scanBarcodeWip({
        serialNumber: mainform.value.serialNumber,
        workcenterId: userStore.currUserOrgInfo.workCenterId,
        workCenterCode: userStore.currUserOrgInfo.workCenterCode,
        workCenterName: userStore.currUserOrgInfo.workCenterName,
        workstationId: userStore.currUserOrgInfo.workStationId,
        processId: userStore.currUserOrgInfo.processId,
        defectCodeList: selectDefectCodeList.value,
      })
      .then((reData) => {
        if (reData.scanSuccess) {
          productInfo.value.scheCode = reData.scheCode;
          productInfo.value.moCode = reData.moCode;
          productInfo.value.moMitemCode = reData.mitemCode;
          productInfo.value.moMitemName = reData.mitemName;
          productInfo.value.scheDatetimeSche = reData.datetimeSche;
          productInfo.value.scheQty = reData.scheQty.toString();
          productInfo.value.moCompletedQty = reData.completedQty.toString();
          mainform.value.serialNumber = '';
          selectDefectCodeList.value = [];
          defectCodeList.value.forEach((item) => {
            item.themeButton = 'default';
            item.child.forEach((cldItem) => {
              cldItem.themeButton = 'default';
            });
          });

          scanInput.value.selectAll();
        } else {
          scanInput.value.selectAll();
          throw new Error(reData.scanMessage);
        }
      })
      .catch((e) => {
        console.log(e);
        scanInput.value.selectAll();
      });
  }
};

const getDefectCodeTree = async () => {
  try {
    defectCodeList.value = [];
    const data = await api.processInDefectCode.getDefectCodeByProcessId({
      processId: userStore.currUserOrgInfo.processId,
    });

    data.forEach((first) => {
      defectCodeList.value.push(first);
    });
  } catch (error) {
    console.log(error);
  }
};

const clickDefectCode = async (item) => {
  const model = item as DefectCodeVO;

  const selectModel = selectDefectCodeList.value.find((n) => n.defectCode === model.defectCode);
  if (isNil(selectModel)) {
    selectDefectCodeList.value.push(model);
    model.themeButton = 'success';
  } else {
    selectDefectCodeList.value = selectDefectCodeList.value.filter((n) => n !== selectModel);
    model.themeButton = 'default';
  }
};

const clickHistoryDefectCode = (item) => {
  mainform.value.serialNumber = item.serialNumber;
};

const onWorkstationChange = async () => {
  Init();
};

const anchorHeight = ref('200px');
const refDefectRow = ref(null);
useResizeObserver(refDefectRow, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  anchorHeight.value = `${height - 30}px`;
});

const themes = {
  default: 'default',
  success: 'success',
  primary: 'primary',
  warning: 'warning',
  danger: 'danger',
} as any;

// const getThemeButton = (value: string) => {
//   return themes[value] || themes.default;
// };

const getThemeButton = (value: string) => {
  console.log('click', value);
  return themes.default;
};

onMounted(() => {
  Init();
});
</script>

<style lang="less" scoped>
.t-layout {
  background-color: transparent;
}

.table-tree-container {
  background-color: var(--td-bg-color-container);
  border-radius: var(--td-radius-medium);

  .t-tree {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.list-tree-wrapper {
  overflow-y: hidden;
  float: left;
}

.list-tree-operator {
  width: 280px;
  float: left;
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
}

.list-tree-content {
  border-left: 1px solid var(--td-border-level-1-color);
  overflow: auto;
}

.search-input {
  width: 180px;
}

.list-common-table {
  background-color: var(--td-bg-color-container);
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
  border-radius: var(--td-radius-medium);
  align-items: center;

  .table-container {
    margin-top: var(--td-comp-margin-xxl);
  }
}

.form-container-row {
  margin-top: 20px;
}

.groupbox {
  width: 100%;
  border: 1px solid var(--td-component-border);
  //height: 100%;

  .grouptitle {
    display: block;
    margin-top: -10px;
    margin-left: 10px;
    width: 100px;
    text-align: center;
    background-color: white;
    font: var(--td-font-title-medium);
    color: var(--td-text-color-primary);
  }

  .talbe_col_nowrap {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.anchor-demo {
  border: 1px solid transparent;
}

:deep .t-list-item__meta-description {
  width: 100%;
}

:deep.t-table--layout-fixed {
  border-width: 0;
}

:deep .t-collapse-panel__content {
  padding-right: 50px;
}

:deep .t-collapse {
  border: none;
}

:deep(.t-form__label) {
  color: var(--td-gray-color-7);
}

:deep(.t-collapse-panel__wrapper .t-collapse-panel__body) {
  background: white;
}

:deep(.t-table .custom-third-class-name) > td {
  background-color: var(--td-brand-color-light);
  font-weight: bold;
}

.anchor-defect {
  // margin-right: 8px;
  :deep(.t-anchor) {
    overflow: auto;
  }

  :deep(.t-anchor__line) {
    position: absolute;
    top: 0;
    right: 10px;
    left: auto;
    width: 1px;
    height: 100%;
    background-color: var(--td-component-stroke);
    cursor: pointer;
  }

  .test-cursor {
    width: 10px;
    height: 10px;
    background-color: #0052d9;
    position: absolute;
    border-radius: 50%;
    left: 50%;
    margin-left: -5px;
    top: 50%;
    margin-top: -5px;
  }

  :deep(.t-anchor__item) {
    padding: 16px 8px;
  }

  :deep(.t-anchor__item.t-is-active) {
    font-weight: 500;
    background: var(--td-brand-color-light);
    border-radius: 4px;
  }
}

.defect-buttons {
  :deep(.t-button--variant-base) {
    background: white;
    border-color: #bfe9d3;
    height: 60px;
  }

  :deep(.t-button--variant-base:hover) {
    background: #f5d9b2;
    border-color: #f5d9b2;
  }

  :deep(.t-button--variant-base.t-button--theme-success) {
    color: black;
    background-color: #f5d9b2;
    border-color: #f5d9b2;
  }
}

:deep(.t-divider) {
  margin: 0;
}

.defect-card {
  :deep(.t-card__body) {
    background-color: #f9f9f9;
    border-radius: 4px;
  }
}

#anchor-container {
  overflow-y: auto;
  width: 100%;
}

.cardno {
  display: block;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.defect-card-content {
  :deep(.t-tabs) {
    background-color: transparent;
  }

  :deep(.t-tabs__content) {
    padding: 12px 0 0;
  }
}
</style>
