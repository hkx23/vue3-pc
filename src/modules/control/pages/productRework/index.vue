<template>
  <cmp-container :full="true" class="root">
    <cmp-row>
      <div class="main-page">
        <div class="main-page-content">
          <t-row justify="space-between">
            <t-col>
              <t-space>
                <t-space direction="horizontal">
                  <t-tabs v-for="(item, index) in tabModuleList" :key="index" v-model="selectModule">
                    <t-tab-panel :value="item.moduleCode" :label="item.moduleName"> </t-tab-panel>
                  </t-tabs>
                </t-space>
              </t-space>
            </t-col>
          </t-row>

          <t-layout v-show="selectModule == 'SETTING'" class="main-page-content-sub">
            <t-layout>
              <t-content>
                <t-space class="custom-row" direction="vertical" style="width: 98%">
                  <t-row class="custom-row">
                    <div class="groupbox" style="height: auto">
                      <span class="grouptitle">{{ t('productRework.setting') }}</span>
                      <t-card :bordered="false">
                        <t-form
                          ref="formRef"
                          :disabled="preSetting.isLock"
                          :data="preSetting"
                          :show-cancel="true"
                          :show-error-message="true"
                          :label-width="150"
                        >
                          <t-form-item :label="t('productRework.isSameProcess')" name="isSameProcess">
                            <t-switch v-model="preSetting.isSameProcess" size="large">
                              <template #label="slotProps">{{ slotProps.value ? '是' : '否' }}</template>
                            </t-switch>
                          </t-form-item>
                          <t-form-item :label="t('productRework.isSameMo')" name="isSameMo">
                            <t-switch v-model="preSetting.isSameMo" size="large">
                              <template #label="slotProps">{{ slotProps.value ? '是' : '否' }}</template>
                            </t-switch>
                          </t-form-item>
                          <t-form-item :label="t('productRework.isByReworkMo')" name="isByReworkMo">
                            <t-switch v-model="preSetting.isByReworkMo" size="large">
                              <template #label="slotProps">{{ slotProps.value ? '是' : '否' }}</template>
                            </t-switch>
                          </t-form-item>
                          <t-form-item
                            v-show="preSetting.isByReworkMo"
                            :label="t('productRework.reworkMo')"
                            name="reworkMo"
                          >
                            <bcmp-select-business
                              v-model="preSetting.reworkMo"
                              :placeholder="t('common.placeholder.input', [`${t('productRework.reworkMo')}`])"
                              type="moSchedule"
                              :show-title="false"
                              @selection-change="moScheduleSelectChange"
                            ></bcmp-select-business>
                          </t-form-item>
                          <t-form-item
                            v-show="preSetting.isByReworkMo"
                            :label="t('productRework.reworkRouting')"
                            name="reworkRouting"
                          >
                            <t-input v-model="preSetting.reworkRouting" :disabled="true" />
                          </t-form-item>
                          <t-form-item :label="t('productRework.reworkLine')" name="reworkLine">
                            <bcmp-select-business
                              v-model="preSetting.reworkLine"
                              type="line"
                              :placeholder="t('common.placeholder.input', [`${t('productRework.reworkLine')}`])"
                              :show-title="false"
                            ></bcmp-select-business>
                          </t-form-item>
                          <t-form-item :label="t('productRework.reworkProcess')" name="reworkProcess">
                            <bcmp-select-business
                              v-model="preSetting.reworkProcess"
                              type="process"
                              :placeholder="t('common.placeholder.input', [`${t('productRework.reworkProcess')}`])"
                              :show-title="false"
                            ></bcmp-select-business>
                            <!-- <t-input v-model="preSetting.reworkProcess" clearable /> -->
                          </t-form-item>
                        </t-form>
                        <t-space align="end" class="space-border text-align-rgiht">
                          <t-button :disabled="preSetting.isLock" @click="onClickSetting">确定 </t-button>
                        </t-space>
                      </t-card>
                    </div>
                  </t-row>
                </t-space>
              </t-content>
            </t-layout>
          </t-layout>

          <t-layout v-show="selectModule == 'REWORK'" class="main-page-content-sub">
            <t-layout>
              <t-content>
                <t-space class="custom-row" direction="vertical" style="width: 98%">
                  <t-row justify="center">
                    <t-tag shape="round" size="large">
                      <t-col class="header-title">
                        <span>{{ t('productRework.workshopName') }}: {{ mainform.workStationName }}</span>
                        <span> {{ t('productRework.workcentName') }}：{{ mainform.workCenterCode }}</span>
                        <span> {{ t('productRework.workstationName') }}：{{ mainform.workStationCode }}</span>
                      </t-col>
                    </t-tag>
                  </t-row>
                  <t-row class="custom-row">
                    <t-col :span="2" class="custom-row-item-header">{{ t('productRework.scanlabel') }}：</t-col>
                    <t-col v-if="scanType == 'SCANTEXT'" :span="7">
                      <t-input
                        v-model="mainform.serialNumber"
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
                      <span class="grouptitle">{{ t('productRework.product') }}</span>
                      <t-card :bordered="false">
                        <t-space class="custom-row-item" direction="horizontal" :break-line="true">
                          <t-input
                            v-model="productInfo.scheCode"
                            placeholder=""
                            :label="t('productRework.scheCode')"
                            readonly
                          />
                          <t-input
                            v-model="productInfo.moMitemCode"
                            placeholder=""
                            :label="t('productRework.mitemCode')"
                            readonly
                          />
                          <t-input
                            v-model="productInfo.moMitemName"
                            placeholder=""
                            :label="t('productRework.mitemName')"
                            readonly
                          />
                          <t-input
                            v-model="productInfo.scheDatetimeScheStr"
                            placeholder=""
                            :label="t('productRework.scheDate')"
                            readonly
                          />
                          <t-input
                            v-model="productInfo.scheQty"
                            placeholder=""
                            :label="t('productRework.scheQty')"
                            readonly
                          />
                          <t-input
                            v-model="productInfo.moCompletedQty"
                            placeholder=""
                            :label="t('productRework.completeQty')"
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
                                  t('productRework.requestqty')
                                }}:{{ item.moRequestQty }},{{ t('productRework.scanqty') }}: {{ item.scanQty }}
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
                        <span class="grouptitle">{{ t('productRework.collectDtl') }}</span>
                        <t-table row-key="id" :columns="scanInfoColumns" :data="scanInfoList" height="295px">
                          <template #serialNumber="{ row }">
                            <div class="talbe_col_nowrap" :title="row.serialNumber">
                              {{ row.serialNumber }}
                            </div>
                          </template>
                          <template #status="{ row }">
                            <div
                              class="talbe_col_nowrap"
                              :title="row.status"
                              :style="{
                                // eslint-disable-next-line prettier/prettier
                                backgroundColor: row.statusColor,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: 'white',
                              }"
                            >
                              {{ row.status }}
                            </div>
                          </template>
                          <template #errorinfo="{ row }">
                            <div class="talbe_col_nowrap" :title="row.errorinfo">
                              {{ row.errorinfo }}
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
                <span class="grouptitle">{{ t('productRework.messageCom') }}</span>
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
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import _, { isEmpty } from 'lodash';
import { LoadingPlugin, NotifyPlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api, WipKeyPartCollectVO } from '@/api/control';

import { messageModel, scanCollectInfoModel } from '../../api/processInspection';
import { useLang } from './lang';
// 全局信息
const scanInfoList = ref<scanCollectInfoModel[]>([]);
const { t } = useLang();
// 扫描信息
const scanInfoColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '产品条码', width: 80, colKey: 'serialNumber' },
  { title: '数量', width: '50', colKey: 'qty' },
  { title: '单位', width: 50, colKey: 'uomName' },
];
// 页签
const tabModuleList = ref([
  { moduleCode: 'SETTING', moduleName: '返工前配置项' },
  { moduleCode: 'REWORK', moduleName: '产品返工' },
]);
const selectModule = ref('SETTING');

const preSetting = ref({
  isSameProcess: false,
  isSameMo: true,
  isByReworkMo: false,
  reworkMo: '',
  reworkRouting: '',
  reworkRoutingName: '',
  reworkLine: '',
  reworkProcess: '',
  isLock: false,
});

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
  mainform.value.workCenterId = '1730421387954343937'; // 3-1-1
  mainform.value.workCenterCode = '3-1-1'; // 3-1-1
  mainform.value.workCenterName = '3号工厂1车间1区域'; // 3-1-1

  mainform.value.workStationId = '1729475654052753410'; // G_TP 高新产业园贴标
  mainform.value.workStationCode = 'G_TP';
  mainform.value.workStationName = '高新产业园贴标';
  mainform.value.processId = '3'; // PC001 贴标
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
  let scanDesc = t('productRework.scanBarcode');
  if (scanType.value === 'KEYPART') {
    scanDesc = t('productRework.scanKeypart');
  }
  return scanDesc;
});

const serialNumberEnter = async (value) => {
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
            productInfo.value.header = `${t('productRework.keypartInfo')}:${productInfo.value.moMitemCode}(${
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
    const barcodeInfo = _.find(
      scanInfoList.value,
      (item: scanCollectInfoModel) => item.status === 'OK' && item.serialNumber === lbNo,
    );
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
  NotifyPlugin.success({ title: '扫描成功', content, duration: 2000 });
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
  NotifyPlugin.error({ title: '扫描失败', content, duration: 2000 });
};

const getQueryString = (paramName: string) => {
  const queryString = window.location.href.split('?')[1];
  if (queryString) {
    const paramsArray = queryString.split('&');
    const paramsNameList = [{ name: '', value: '' }];
    paramsArray.forEach((item: string) => {
      const obj = { name: '', value: '' };
      obj.name = item.split('=')[0].toString();
      obj.value = item.split('=')[1].toString();
      paramsNameList.push(obj);
    });
    const objInfo = _.find(paramsNameList, (item: any) => {
      return item.name === paramName;
    }) as any;
    return objInfo?.value;
  }
  return '';
};

const onClickSetting = () => {
  if (preSetting.value.isByReworkMo) {
    if (!preSetting.value.reworkMo) {
      NotifyPlugin.error({
        title: t('productRework.tip'),
        content: t('common.placeholder.input', [`${t('productRework.reworkMo')}`]),
        duration: 2000,
      });
      return '';
    }
    if (!preSetting.value.reworkRouting) {
      NotifyPlugin.error({
        title: t('productRework.tip'),
        content: t('productRework.checkreworkRouting'),
        duration: 2000,
      });
      return '';
    }
  }
  if (!preSetting.value.reworkLine) {
    NotifyPlugin.error({
      title: t('productRework.tip'),
      content: t('common.placeholder.input', [`${t('productRework.reworkLine')}`]),
      duration: 2000,
    });
    return '';
  }
  if (!preSetting.value.reworkProcess) {
    NotifyPlugin.error({
      title: t('productRework.tip'),
      content: t('common.placeholder.input', [`${t('productRework.reworkProcess')}`]),
      duration: 2000,
    });
    return '';
  }
  preSetting.value.isLock = true;
  selectModule.value = 'REWORK';
  return '';
};

// 工序编码Change事件
const moScheduleSelectChange = (data) => {
  preSetting.value.reworkRouting = data.routingCode;
  preSetting.value.reworkRoutingName = data.routingName;
};

onMounted(() => {
  // 底座完成后从底座获取
  const serialNumber = getQueryString('serialNumber');
  const workCenterId = getQueryString('workCenterId');
  const workStationId = getQueryString('workStationId');
  const processId = getQueryString('processId');
  if (serialNumber) {
    mainform.value.serialNumber = serialNumber;
  }
  if (workCenterId) {
    mainform.value.workCenterId = workCenterId;
  }
  if (workStationId) {
    mainform.value.workStationId = workStationId;
  }
  if (processId) {
    mainform.value.processId = processId;
  }

  Init();
});
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

.custom-row-item-setting {
  align-items: center;

  /deep/ .t-space-item {
    width: 60%;
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

.main-page-content-sub {
  margin-top: 8px;
}

/deep/ .t-form__controls-content {
  width: 40%;
}

.text-align-rgiht {
  text-align: right;
  width: 100%;
}
</style>
