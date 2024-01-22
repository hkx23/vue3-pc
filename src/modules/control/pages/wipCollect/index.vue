<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card flex="auto" :ghost="true">
        <cmp-container :full="true" header>
          <!-- 扫描区 -->
          <cmp-card>
            <bcmp-workstation-info @change="handleonChange" />
            <t-row class="padding-top-line-8" style="padding-bottom: 8px">
              <t-col flex="auto">
                <cmp-scan-input
                  v-if="scanType == 'SCANTEXT'"
                  ref="scanBarcodeInstance"
                  v-model="mainform.serialNumber"
                  label="产品条码"
                  :placeholder="scanDesc"
                  @enter="serialNumberEnter"
                ></cmp-scan-input>
                <cmp-scan-input
                  v-else
                  ref="scanKeypartInstance"
                  v-model="mainform.keypartCode"
                  label="关键件条码"
                  :placeholder="scanDesc"
                  @enter="serialNumberEnter"
                ></cmp-scan-input>
              </t-col>
              <t-col flex="80px" style="text-align: right">
                <t-button class="btn_reset" theme="default" @click="resetHandle">{{
                  t('common.button.reset')
                }}</t-button>
              </t-col>
            </t-row>
            <t-form label-width="80px" label-align="left" style="border-top: 1px solid var(--td-component-stroke)">
              <t-row class="item-row" :gutter="[4, 0]">
                <t-col flex="210px"
                  ><t-form-item :label="t('wipCollect.scheCode')">{{ productInfo.scheCode }} </t-form-item>
                </t-col>
                <t-col flex="210px"
                  ><t-form-item :label="t('wipCollect.mitemCode')">{{ productInfo.moMitemCode }} </t-form-item>
                </t-col>
                <t-col flex="210px"
                  ><t-form-item :label="t('wipCollect.mitemName')">{{ productInfo.moMitemName }} </t-form-item>
                </t-col>
                <t-col flex="210px"
                  ><t-form-item :label="t('wipCollect.scheDate')">{{ productInfo.scheDatetimeScheStr }} </t-form-item>
                </t-col>
                <t-col flex="210px"
                  ><t-form-item :label="t('wipCollect.scheQty')">{{ productInfo.scheQty }} </t-form-item>
                </t-col>
                <t-col flex="210px"
                  ><t-form-item :label="t('wipCollect.completeQty')">{{ productInfo.moCompletedQty }} </t-form-item>
                </t-col>
              </t-row>
            </t-form>
          </cmp-card>
          <!-- 信息区 -->

          <cmp-card v-if="keyPartSumList && keyPartSumList.length > 0">
            <t-row class="custom-row">
              <t-col class="custom-col">
                <div class="groupbox">
                  <t-collapse :default-expand-all="true" expand-icon-placement="right">
                    <t-collapse-panel destroy-on-collapse :header="productInfo.header">
                      <t-list v-for="(item, index) in keyPartSumList" :key="index">
                        <t-list-item :class="{ 'selected-item': item.isScanFinish }">
                          {{ item.keyPartCodeStr }}/{{ item.mitemCode }}/{{ item.mitemName }}/{{
                            t('wipCollect.requestqty')
                          }}:{{ item.requestQty }},{{ t('wipCollect.scanqty') }}: {{ item.scanQty }}
                          <template #action>
                            <t-icon v-if="item.isScanFinish" size="24px" name="check" class="success" />
                            <!-- <t-icon v-else class="error" size="24px" name="close" /> -->
                          </template>
                        </t-list-item>
                      </t-list>
                    </t-collapse-panel>
                  </t-collapse>
                </div>
              </t-col>
            </t-row>
          </cmp-card>
          <!-- 采集详情区 -->
          <cmp-card>
            <cmp-table
              ref="refInfoTable"
              row-key="serialNumber"
              :row-class-name="getRowClassName"
              :columns="scanInfoColumns"
              :fixed-height="true"
              :show-toolbar="true"
              :table-data="scanInfoList"
              :show-pagination="false"
              :show-setting="false"
              :hover="false"
              :stript="false"
            >
              <template #title> {{ t('wipCollect.collectDtl') }} </template>
              <template #serialNumber="{ row }">
                <div class="talbe_col_nowrap" :title="row.serialNumber">
                  {{ row.serialNumber }}
                </div>
              </template>
            </cmp-table>
          </cmp-card>
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
import _, { isEmpty } from 'lodash';
import { LoadingPlugin, NotifyPlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api, WipKeyPartCollectVO } from '@/api/control';
import BcmpWorkstationInfo from '@/components/bcmp-workstation-info/index.vue';
import { useUserStore } from '@/store';

import { scanCollectInfoModel } from '../../api/processInspection';
import { useLang } from './lang';

const userStore = useUserStore();
const scanBarcodeInstance = ref(null);
const scanKeypartInstance = ref(null);
// 全局信息
const scanInfoList = ref<scanCollectInfoModel[]>([]);
const { t } = useLang();
// 扫描信息
const scanInfoColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '产品条码', width: 80, colKey: 'serialNumber' },
  { title: '数量', width: '50', colKey: 'qty' },
  { title: '单位', width: 50, colKey: 'uomName' },
];

const mainform = ref({
  serialNumber: '', // 条码
  keypartCode: '', // 关键件
  workshopCode: '',
  workshopName: '',
  workCenterId: '',
  workCenterCode: '',
  workCenterName: '',
  workStationId: '',
  workStationCode: '',
  workStationName: '',
  processId: '',
  isCommit: false,
});

// 界面产品信息
const productInfo = ref({
  scheCode: '',
  scheDatetimeSche: '',
  scheDatetimeScheStr: '',
  scheQty: '',
  moCode: '',
  moMitemCode: '',
  moMitemName: '',
  moCompletedQty: '',
  header: '',
  moScheId: '',
});

// 关键件信息信息
const keyPartSumList = ref<WipKeyPartCollectVO[]>([]);

// 界面消息列表
// const messageList = ref<messageModel[]>([]);
// 消息
const msgList = ref<
  {
    theme: 'success' | 'info' | 'error' | 'warning';
    content: string;
    time: string;
  }[]
>([]);
const Init = async () => {
  mainform.value.serialNumber = '';
  mainform.value.keypartCode = '';

  // 底座完成后从底座获取
  mainform.value.workCenterId = userStore.currUserOrgInfo.workCenterId;
  mainform.value.workStationId = userStore.currUserOrgInfo.workStationId;
  mainform.value.processId = userStore.currUserOrgInfo.processId;

  mainform.value.workCenterCode = userStore.currUserOrgInfo.workCenterCode;
  mainform.value.workCenterName = userStore.currUserOrgInfo.workCenterName;

  mainform.value.workStationCode = userStore.currUserOrgInfo.workStationCode;
  mainform.value.workStationName = userStore.currUserOrgInfo.workStationName;

  mainform.value.workshopCode = userStore.currUserOrgInfo.workShopCode;
  mainform.value.workshopName = userStore.currUserOrgInfo.workShopName;

  if (!mainform.value.workStationId) {
    NotifyPlugin.error({
      title: t('wipCollect.tip'),
      content: t('wipCollect.tipsetting'),
      duration: 2000,
      closeBtn: true,
    });
  }
};

const scanType = computed(() => {
  let scanType = 'SCANTEXT';
  if (keyPartSumList.value && keyPartSumList.value.length > 0) {
    scanType = 'KEYPART';
  }

  if (mainform.value.isCommit) {
    scanType = 'SCANTEXT';
  }
  return scanType;
});

const scanDesc = computed(() => {
  let scanDesc = t('wipCollect.scanBarcode');
  if (scanType.value === 'KEYPART') {
    scanDesc = t('wipCollect.scanKeypart');
  }
  return scanDesc;
});

const serialNumberEnter = async (value) => {
  if (!mainform.value.workStationId) {
    NotifyPlugin.error({
      title: t('wipCollect.tip'),
      content: t('wipCollect.tipsetting'),
      duration: 2000,
      closeBtn: true,
    });
    return;
  }
  if (!isEmpty(value)) {
    // 前端校验一次，条码是否扫重复，后端再校验一次
    if (!checkBarcodeRepeat(mainform.value.serialNumber)) {
      return;
    }

    const currentScanType = scanType.value;
    const { serialNumber } = mainform.value;
    const { keypartCode } = mainform.value;

    LoadingPlugin(true);
    // 原子校验
    // TODO 校验成功
    await api.barcodeWipCollect
      .scanBarcodeWipCollect({
        serialNumber,
        keypartCode,
        workcenterId: mainform.value.workCenterId,
        workCenterCode: mainform.value.workCenterCode,
        workCenterName: mainform.value.workCenterName,
        workstationId: mainform.value.workStationId,
        processId: mainform.value.processId,
        scanType: scanType.value,
        moScheId: productInfo.value.moScheId,
      })
      .then((reData) => {
        if (reData.scanSuccess) {
          mainform.value.isCommit = reData.isCommit;
          if (currentScanType === 'SCANTEXT') {
            productInfo.value.scheCode = reData.scheCode;
            productInfo.value.moCode = reData.moCode;
            productInfo.value.moMitemCode = reData.mitemCode;
            productInfo.value.moMitemName = reData.mitemName;
            productInfo.value.scheDatetimeSche = reData.datetimeSche;
            productInfo.value.scheDatetimeScheStr = reData.datetimeScheStr;
            productInfo.value.scheQty = reData.scheQty.toString();
            productInfo.value.moCompletedQty = reData.completedQty.toString();
            productInfo.value.moScheId = reData.moScheId;
            writeScanInfoSuccess(reData.serialNumber, reData.qty, reData.uomName, reData.scanMessage); // 扫描成功
          }
          pushMessage('success', value, reData.scanMessage);
          // writeMessageListSuccess(reData.scanMessage, reData.scanDatetimeStr);

          if (reData.keyPartSumList.length > 0) {
            productInfo.value.header = `${t('wipCollect.keypartInfo')}:${productInfo.value.moMitemCode}(${
              productInfo.value.moMitemName
            })`;
            keyPartSumList.value = reData.keyPartSumList;
            resetKeypartCode();
          } else {
            // 没有关键件时，则清空以下信息
            resetBarcode();
            resetKeyPartList();
          }

          if (reData.isCommit) {
            // 提交时,清空扫描框即可
            resetBarcode();
            resetKeypartCode();
          }
        } else {
          pushMessage('error', value, reData.scanMessage);
          if (currentScanType === 'SCANTEXT') {
            resetBarcode();
          } else {
            resetKeypartCode();
          }
          if (reData.isCommit) {
            resetKeypartCode();
          }
        }
        LoadingPlugin(false);
      })
      .catch((message) => {
        console.log(message);
        LoadingPlugin(false);
      });

    // TODO 校验失败，写日志到右侧表
  }
};

// 重置
const resetHandle = () => {
  mainform.value.serialNumber = '';
  mainform.value.keypartCode = '';
  keyPartSumList.value = [];
  scanInfoList.value = [];
  // 清除所有对象的值
  Object.keys(productInfo.value).forEach((key) => {
    delete productInfo.value[key];
  });
};

const resetBarcode = () => {
  mainform.value.serialNumber = '';
  scanBarcodeInstance.value.ref.focus();
};

const resetKeypartCode = () => {
  mainform.value.keypartCode = '';
  scanKeypartInstance.value.ref.focus();
};

const resetKeyPartList = () => {
  keyPartSumList.value = [];
};

const writeScanInfoSuccess = async (lbNo, lbQty, uomName, lbError) => {
  const barcodeInfo = _.find(scanInfoList.value, (item: scanCollectInfoModel) => item.serialNumber === lbNo);
  if (!barcodeInfo) {
    // 如果不存在则插入
    scanInfoList.value.unshift({
      serialNumber: lbNo,
      qty: lbQty,
      uomName,
      status: 'OK',
      errorinfo: lbError,
      statusColor: 'green',
    });
  }
};

// const writeScanInfoError = async (lbNo, lbQty, lbError) => {
//   scanInfoList.value.unshift({
//     serialNumber: lbNo,
//     qty: lbQty,
//     status: 'NG',
//     errorinfo: lbError,
//     statusColor: 'red',
//   });
// };

// 校验条码是否扫重复
const checkBarcodeRepeat = (lbNo) => {
  let isSuccess = true;
  if (scanType.value === 'SCANTEXT') {
    const barcodeInfo = _.find(scanInfoList.value, (item: scanCollectInfoModel) => item.serialNumber === lbNo);
    if (barcodeInfo) {
      isSuccess = false;
      pushMessage('error', lbNo, `该条码已扫描,请勿重复扫描`);
      // writeMessageListError(`该条码(${lbNo})已扫描,请勿重复扫描`, dayjs().format('YYYY-MM-DD HH:mm:ss'));
    }
  }
  return isSuccess;
};

const pushMessage = (type: 'success' | 'info' | 'error' | 'warning', scanLabel: string, msg: string) => {
  let content: string;
  if (type === 'success') {
    content = `[${scanLabel}]${t('wipCollect.scanSuccess')}`;
    NotifyPlugin.success({ title: t('wipCollect.scanSuccess'), content, duration: 2000, closeBtn: true });
  } else if (type === 'error') {
    content = `[${scanLabel}]${t('wipCollect.scanFailed')} , ${msg}`;
    NotifyPlugin.error({ title: t('wipCollect.scanFailed'), content, duration: 2000, closeBtn: true });
  } else {
    content = msg;
  }
  msgList.value.push({
    theme: type,
    content,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  });
};
const getRowClassName = ({ rowIndex }) => {
  if (rowIndex === 0) return 'custom-third-class-name';
  return '';
};

// 切换工站
const handleonChange = () => {
  resetHandle();
  Init();
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

.selected-item {
  background: #18c9771a;
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
  // border: #d5d8db solid 1px;
  height: 100%;

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

/deep/ .t-list-item__meta-description {
  width: 100%;
}

// /deep/ .t-table__content {
//   height: 100%;
//   .t-table--layout-fixed {
//     height: 100%;
//   }
// }
.header-title {
  span {
    margin-right: 30px;
  }
}

.custom-row {
  align-items: center;
  width: 100%;
}

.custom-col {
  width: 100%;
}

.custom-row-item {
  align-items: center;

  /deep/ .t-space-item {
    width: 30%;
  }
}

.custom-row-item-header {
  margin-left: 26px;
}

.custom-row-item-reset {
  margin-left: 33px;
}

/deep/ .t-table table {
  border-left: none;
  border-right: none;
}

.success {
  color: #18c977;
}

.error {
  color: #f00;
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
</style>
