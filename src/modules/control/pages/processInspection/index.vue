<template>
  <cmp-container :full="true">
    <!-- 扫描区 -->
    <cmp-card>
      <bcmp-workstation-info />
      <t-row class="padding-top-line-8" style="padding-bottom: 8px">
        <t-col flex="auto">
          <cmp-scan-input
            v-model="mainform.serialNumber"
            label="产品条码"
            placeholder="请扫描或输入产品条码"
            @enter="serialNumberEnter"
          ></cmp-scan-input>
        </t-col>
        <t-col flex="80px" style="text-align: right">
          <!-- <t-button class="btn_reset" theme="default" @click="resetHandle">{{
                  t('common.button.reset')
                }}</t-button> -->
        </t-col>
      </t-row>
      <t-form label-width="100px" label-align="left" style="border-top: 1px solid var(--td-component-stroke)">
        <t-row class="item-row" :gutter="[4, 0]">
          <t-col flex="250px"
            ><t-form-item :label="t('processInspection.scheCode')">{{ productInfo.scheCode }} </t-form-item>
          </t-col>
          <t-col flex="250px"
            ><t-form-item :label="t('processInspection.mitemCode')">{{ productInfo.moCode }} </t-form-item>
          </t-col>
          <t-col flex="250px"
            ><t-form-item :label="t('processInspection.mitemName')">{{ productInfo.moMitemName }} </t-form-item>
          </t-col>
          <t-col flex="250px"
            ><t-form-item :label="t('processInspection.scheDate')">{{ productInfo.scheDatetimeSche }} </t-form-item>
          </t-col>
          <t-col flex="250px"
            ><t-form-item :label="t('processInspection.scheQty')">{{ productInfo.scheQty }} </t-form-item>
          </t-col>
          <t-col flex="250px"
            ><t-form-item :label="t('processInspection.completeQty')">{{ productInfo.moCompletedQty }} </t-form-item>
          </t-col>
        </t-row>
      </t-form>
    </cmp-card>
    <cmp-row>
      <!-- 缺陷信息 -->
      <cmp-card flex="auto">
        <cmp-container :full="true" :full-sub-index="[1]">
          <div style="border-bottom: 1px solid var(--td-component-border); padding: 0 0 4px; font-weight: bold">
            缺陷信息
          </div>
          <cmp-row ref="refDefectRow">
            <t-space class="anchor-defect" flex="120px">
              <t-anchor
                container="#anchor-container"
                :bounds="150"
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
                direction="vertical"
                :style="{ height: `${anchorHeight}` }"
                style="overflow-y: auto"
              >
                <t-space
                  v-for="(item, index) in defectCodeList.filter((sourceItem) => sourceItem.child.length > 0)"
                  :id="`${item.defectName}`"
                  :key="index"
                  style="width: 100%"
                  direction="vertical"
                >
                  <!-- <t-button
                    theme="default"
                    style="width: 70px; min-height: 80px; max-height: 80px; white-space: normal"
                    :v-model="item"
                    :content="item.defectName"
                  /> -->
                  <t-divider style="width: 100%">{{ item.defectName }}</t-divider>
                  <t-space break-line class="defect-buttons">
                    <t-button
                      v-for="(item_child, index_child) in item.child"
                      :key="index_child"
                      :content="item_child.defectName"
                      style="width: 120px"
                      :theme="getThemeButton(item_child.themeButton)"
                      @click="clickDefectCode(item_child)"
                    />
                  </t-space>
                </t-space>
              </t-space>
            </cmp-card>
          </cmp-row>
          <t-space>
            <t-tooltip v-for="(item, index) in scanInfoList.slice(0, 5)" :key="index" :content="item.serialNumber">
              <t-button theme="default" shape="rectangle" variant="base" @click="clickHistoryDefectCode(item)"
                ><t-space :size="8"
                  ><span class="cardno">{{ item.serialNumber }} </span
                  ><t-tag :theme="item.status == 'OK' ? 'success' : 'danger'">{{ item.status }}</t-tag></t-space
                >
              </t-button>
            </t-tooltip>
          </t-space>
        </cmp-container>
      </cmp-card>

      <cmp-card flex="300px" :ghost="true">
        <cmp-container :full="true" header>
          <cmp-card>
            <cmp-message v-model="msgList"></cmp-message>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import _, { isEmpty, isNil } from 'lodash';
import { NotifyPlugin } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/control';
import { api as apiMain, DefectCodeVO } from '@/api/main';
import BcmpWorkstationInfo from '@/components/bcmp-workstation-info/index.vue';

import { scanInfoModel } from '../../api/processInspection';
import { useLang } from './lang';
// 全局信息
const scanInfoList = ref<scanInfoModel[]>([]);
// const { ctx } = getCurrentInstance();
// const path = computed(() => _.get(ctx, '$route.path', ''));

import { useUserStore } from '@/store';

const { t } = useLang();
const userStore = useUserStore();
// 扫描信息
// const scanInfoColumns: PrimaryTableCol<TableRowData>[] = [
//   { title: '产品条码', width: 'auto', colKey: 'serialNumber' },
//   { title: '数量', width: 'auto', colKey: 'qty' },
//   { title: '状态', width: 'auto', colKey: 'status' },
//   { title: '缺陷信息', width: 'auto', colKey: 'errorinfo' },
// ];
// 消息
const msgList = ref<
  {
    theme: 'success' | 'info' | 'error' | 'warning';
    content: string;
    time: string;
  }[]
>([]);
const handleClick = ({ e, href, title }) => {
  e.preventDefault();
  console.log('click', href, title);
};
const mainform = ref({
  serialNumber: '',
  workShopId: userStore.currUserOrgInfo.workShopId,
  workShopCode: userStore.currUserOrgInfo.workShopCode,
  workShopName: userStore.currUserOrgInfo.workShopName,
  workCenterId: userStore.currUserOrgInfo.workCenterId,
  workCenterCode: userStore.currUserOrgInfo.workCenterCode,
  workCenterName: userStore.currUserOrgInfo.workCenterName,
  workStationId: userStore.currUserOrgInfo.workStationId,
  workStationCode: userStore.currUserOrgInfo.workStationCode,
  workStationName: userStore.currUserOrgInfo.workStationName,
  processId: userStore.currUserOrgInfo.processId,
});

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
  moMitemName: '',
  moCompletedQty: '',
});

// 界面消息列表
// const messageList = ref<messageModel[]>([]);

const Init = async () => {
  getDefectCodeTree();
};

const serialNumberEnter = async (value) => {
  if (!isEmpty(value)) {
    // 原子校验
    // TODO 校验成功

    await api.barcodeWip
      .scanBarcodeWip({
        serialNumber: mainform.value.serialNumber,
        workcenterId: mainform.value.workCenterId,
        workCenterCode: mainform.value.workCenterCode,
        workCenterName: mainform.value.workCenterName,
        workstationId: mainform.value.workStationId,
        // workStationCode: mainform.value.workStationCode,
        // workStationCode: mainform.value.workStationCode,
        processId: mainform.value.processId,
        defectCodeList: selectDefectCodeList.value,
      })
      .then((reData) => {
        if (reData.scanSuccess) {
          productInfo.value.scheCode = reData.scheCode;
          productInfo.value.moCode = reData.moCode;
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
          pushMessage('success', value, reData.scanMessage);
          // writeMessageListSuccess(reData.scanMessage, reData.scanDatetimeStr);

          if (reData.defectCodeStr.length > 0) {
            writeScanInfoError(reData.serialNumber, reData.qty, reData.defectCodeStr);
          } else {
            writeScanInfoSuccess(reData.serialNumber, reData.qty, reData.defectCodeStr);
          }
        } else {
          throw new Error(reData.scanMessage);
          // writeMessageListError(reData.scanMessage, reData.scanDatetimeStr);
          // writeScanInfoError(reData.serialNumber, reData.qty, reData.defectCodeStr);
        }
      })
      .catch((e) => {
        pushMessage('error', value, e.message);
        // writeMessageListError(e.message, dayjs().format('YYYY-MM-DD HH:mm:ss'));
      });

    // TODO 校验失败，写日志到右侧表
  }
};

const getDefectCodeTree = async () => {
  try {
    const data = await apiMain.defectCode.tree();

    data.forEach((first) => {
      if (!isEmpty(first.child)) {
        first.child.forEach((second) => {
          // 3级为空，加1和2级
          // 3级不为空，加2和3级
          if (isEmpty(second.child)) {
            defectCodeList.value.push(first);
          } else {
            defectCodeList.value.push(second);
          }
        });
      } else {
        // 2级为空
        defectCodeList.value.push(first);
      }
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

const writeScanInfoSuccess = async (lbNo, lbQty, lbError) => {
  scanInfoList.value.unshift({
    serialNumber: lbNo,
    qty: lbQty,
    status: 'OK',
    errorinfo: lbError,
    statusColor: 'green',
  });
};

const writeScanInfoError = async (lbNo, lbQty, lbError) => {
  scanInfoList.value.unshift({
    serialNumber: lbNo,
    qty: lbQty,
    status: 'NG',
    errorinfo: lbError,
    statusColor: 'red',
  });
};
const anchorHeight = ref('200px');
const refDefectRow = ref(null);
useResizeObserver(refDefectRow, (entries) => {
  const entry = entries[0];
  const { height } = entry.contentRect;
  anchorHeight.value = `${height - 30}px`;
});

// const writeMessageListSuccess = async (content, datatime) => {
//   messageList.value.unshift({
//     title: '扫描成功',
//     content,
//     datatime,
//     status: 'OK',
//   });
// };

// const writeMessageListError = async (content, datatime) => {
//   messageList.value.unshift({
//     title: '扫描失败',
//     content,
//     datatime,
//     status: 'NG',
//   });
// };

const pushMessage = (type: 'success' | 'info' | 'error' | 'warning', scanLabel: string, msg: string) => {
  let content: string;
  if (type === 'success') {
    content = `[${scanLabel}]${t('processInspection.scanSuccess')} , ${msg}`;
    NotifyPlugin.success({ title: t('processInspection.scanSuccess'), content, duration: 2000 });
  } else if (type === 'error') {
    content = `[${scanLabel}]${t('processInspection.scanFailed')} , ${msg}`;
    NotifyPlugin.error({ title: t('processInspection.scanFailed'), content, duration: 2000 });
  } else {
    content = msg;
  }
  msgList.value.push({
    theme: type,
    content,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  });
};

const themes = {
  default: 'default',
  success: 'success',
  primary: 'primary',
  warning: 'warning',
  danger: 'danger',
} as any;

const getThemeButton = (value: string) => {
  return themes[value] || themes.default;
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

/deep/ .t-list-item__meta-description {
  width: 100%;
}

/deep/.t-table--layout-fixed {
  border-width: 0;
}

/deep/ .t-collapse-panel__content {
  padding-right: 50px;
}

/deep/ .t-collapse {
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
  :deep(.t-button) {
    padding: 24px;
  }

  :deep(.t-button--variant-base) {
    background: #bfe9d3;
    border-color: #bfe9d3;
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
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
