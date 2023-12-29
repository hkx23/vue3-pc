<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="main-page">
    <div class="main-page-content">
      <t-layout>
        <t-layout>
          <t-content>
            <t-space class="custom-row" direction="vertical" style="width: 98%">
              <t-row justify="center">
                <t-tag shape="round" size="large">
                  <t-col class="header-title">
                    <span>{{ t('wipCollect.workshopName') }}: {{ mainform.workshopCode }}</span>
                    <span> {{ t('wipCollect.workcentName') }}：{{ mainform.workCenterCode }}</span>
                    <span> {{ t('wipCollect.workstationName') }}：{{ mainform.workStationCode }}</span>
                  </t-col>
                </t-tag>
              </t-row>
              <t-row class="custom-row">
                <t-col :span="2" class="custom-row-item-header">{{ t('wipCollect.scanlabel') }}：</t-col>
                <t-col v-if="scanType == 'SCANTEXT'" :span="7">
                  <t-input
                    v-model="mainform.serialNumber"
                    :autofocus="true"
                    :placeholder="scanDesc"
                    size="large"
                    @enter="serialNumberEnter"
                  />
                </t-col>
                <t-col v-else :span="7">
                  <t-input
                    v-model="mainform.keypartCode"
                    :placeholder="scanDesc"
                    size="large"
                    @enter="serialNumberEnter"
                  />
                </t-col>
                <t-col :span="1" class="custom-row-item-reset">
                  <t-button class="btn_reset" theme="default" @click="resetHandle">{{
                    t('common.button.reset')
                  }}</t-button>
                </t-col>
              </t-row>
              <t-row class="custom-row">
                <div class="groupbox" style="height: auto">
                  <span class="grouptitle">{{ t('wipCollect.product') }}</span>
                  <t-card :bordered="false">
                    <t-space class="custom-row-item" direction="horizontal" :break-line="true">
                      <t-input
                        v-model="productInfo.scheCode"
                        placeholder=""
                        :label="t('wipCollect.scheCode')"
                        readonly
                      />
                      <t-input
                        v-model="productInfo.moMitemCode"
                        placeholder=""
                        :label="t('wipCollect.mitemCode')"
                        readonly
                      />
                      <t-input
                        v-model="productInfo.moMitemName"
                        placeholder=""
                        :label="t('wipCollect.mitemName')"
                        readonly
                      />
                      <t-input
                        v-model="productInfo.scheDatetimeScheStr"
                        placeholder=""
                        :label="t('wipCollect.scheDate')"
                        readonly
                      />
                      <t-input v-model="productInfo.scheQty" placeholder="" :label="t('wipCollect.scheQty')" readonly />
                      <t-input
                        v-model="productInfo.moCompletedQty"
                        placeholder=""
                        :label="t('wipCollect.completeQty')"
                        readonly
                      />
                    </t-space>
                  </t-card>
                </div>
              </t-row>
              <t-row v-if="keyPartSumList && keyPartSumList.length > 0" class="custom-row">
                <t-col class="custom-col">
                  <div class="groupbox">
                    <t-collapse :default-expand-all="true">
                      <t-collapse-panel destroy-on-collapse :header="productInfo.header">
                        <t-list v-for="(item, index) in keyPartSumList" :key="index">
                          <t-list-item>
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
              <t-row>
                <t-col>
                  <div class="groupbox">
                    <span class="grouptitle">{{ t('wipCollect.collectDtl') }}</span>
                    <t-table row-key="id" :columns="scanInfoColumns" :data="scanInfoList" height="295px">
                      <template #serialNumber="{ row }">
                        <div class="talbe_col_nowrap" :title="row.serialNumber">
                          {{ row.serialNumber }}
                        </div>
                      </template>
                    </t-table>
                  </div>
                </t-col>
              </t-row>
            </t-space>
          </t-content>
        </t-layout>
        <t-aside style="width: 30%">
          <div class="groupbox">
            <span class="grouptitle">{{ t('wipCollect.messageCom') }}</span>
            <t-list style="height: 96%" :scroll="{ type: 'virtual' }">
              <t-list-item v-for="(item, index) in messageList" :key="index">
                <t-list-item-meta style="align-items: center">
                  <template #description>
                    <t-space>
                      <t-icon v-if="item.status == 'OK'" name="check-circle-filled" style="color: green" />
                      <t-icon v-if="item.status == 'NG'" name="close-circle" style="color: red" />
                      <t-tooltip :content="item.content" placement="mouse">
                        <span>{{ item.title }}</span>
                        <span style="margin-left: 8px"> {{ item.datatime }}</span>
                      </t-tooltip>
                      <!-- <div>{{ item.datatime }}</div> -->
                    </t-space>
                  </template>
                </t-list-item-meta>
              </t-list-item>
            </t-list>
          </div>
        </t-aside>
      </t-layout>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import _, { isEmpty } from 'lodash';
import { LoadingPlugin, NotifyPlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api, WipKeyPartCollectVO } from '@/api/control';
import { useUserStore } from '@/store';

import { messageModel, scanCollectInfoModel } from '../../api/processInspection';
import { useLang } from './lang';

const userStore = useUserStore();
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
const messageList = ref<messageModel[]>([]);

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
    LoadingPlugin(true);
    // 原子校验
    // TODO 校验成功
    await api.barcodeWipCollect
      .scanBarcodeWipCollect({
        serialNumber: mainform.value.serialNumber,
        keypartCode: mainform.value.keypartCode,
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
          if (scanType.value === 'SCANTEXT') {
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

          writeMessageListSuccess(reData.scanMessage, reData.scanDatetimeStr);

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
          writeMessageListError(reData.scanMessage, reData.scanDatetimeStr);
          if (scanType.value === 'SCANTEXT') {
            resetBarcode();
          }
          if (reData.isCommit) {
            resetKeypartCode();
          }
          // writeScanInfoError(reData.serialNumber, reData.qty, reData.scanMessage); // 扫描失败
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
};

const resetKeypartCode = () => {
  mainform.value.keypartCode = '';
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
      writeMessageListError(`该条码(${lbNo})已扫描,请勿重复扫描`, dayjs().format('YYYY-MM-DD HH:mm:ss'));
    }
  }
  return isSuccess;
};

// 成功消息体
const writeMessageListSuccess = async (content, datatime) => {
  if (messageList.value && messageList.value.length > 10) {
    messageList.value.splice(0, messageList.value.length);
  }
  messageList.value.unshift({
    title: '扫描成功',
    content,
    datatime,
    status: 'OK',
  });
  NotifyPlugin.success({ title: '扫描成功', content, duration: 2000, closeBtn: true });
};
// 失败消息体
const writeMessageListError = async (content, datatime) => {
  if (messageList.value && messageList.value.length > 10) {
    messageList.value.splice(-1, 1);
  }
  messageList.value.unshift({
    title: '扫描失败',
    content,
    datatime,
    status: 'NG',
  });
  NotifyPlugin.error({ title: '扫描失败', content, duration: 2000, closeBtn: true });
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
  border: #d5d8db solid 1px;
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
</style>
