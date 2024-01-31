<template>
  <cmp-container :full="true">
    <bcmp-workstation-info @change="handleonChange" />
    <cmp-card>
      <t-tabs v-model="selectModule" @change="onchangeTab">
        <t-tab-panel
          v-for="(item, index) in tabModuleList"
          :key="index"
          :value="item.moduleCode"
          :label="item.moduleName"
        >
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
    <cmp-card :ghost="true">
      <cmp-card v-show="selectModule == 'SETTING'" :span="12">
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
          <t-form-item v-show="preSetting.isByReworkMo" :label="t('productRework.reworkMoSheId')" name="reworkMoSheId">
            <bcmp-select-business
              v-model="preSetting.reworkMoSheId"
              :placeholder="t('common.placeholder.input', [`${t('productRework.reworkMoSheId')}`])"
              type="reworkMoSchedule"
              :show-title="false"
              @selection-change="moScheduleSelectChange"
            ></bcmp-select-business>
          </t-form-item>
          <t-form-item v-show="preSetting.isByReworkMo" :label="t('productRework.reworkRouting')" name="reworkRouting">
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
              type="routingProcess"
              :parent-id="preSetting.reworkRoutingRevisionId"
              :placeholder="t('common.placeholder.input', [`${t('productRework.reworkProcess')}`])"
              :show-title="false"
            ></bcmp-select-business>
            <!-- <t-input v-model="preSetting.reworkProcess" clearable /> -->
          </t-form-item>
        </t-form>
        <t-space align="end" class="space-border text-align-rgiht">
          <t-button :disabled="preSetting.isLock" @click="onClickSetting">确定 </t-button>
        </t-space>
      </cmp-card>
      <cmp-card v-show="selectModule == 'REWORK'" :ghost="true" :span="12" :disabled="!preSetting.isLock">
        <cmp-row>
          <cmp-card flex="auto" :ghost="true">
            <cmp-container :full="true" header>
              <!-- 扫描区 -->
              <cmp-card>
                <t-row class="padding-top-line-8" style="padding-bottom: 8px">
                  <t-col flex="auto">
                    <cmp-scan-input
                      ref="scanBarcodeInstance"
                      v-model="mainform.serialNumber"
                      label="产品条码"
                      :placeholder="t('productRework.scanBarcode')"
                      @enter="serialNumberEnter"
                    ></cmp-scan-input>
                  </t-col>
                  <t-col flex="80px" style="text-align: right">
                    <!-- <t-button class="btn_reset" theme="default" @click="resetHandle">{{
                  t('common.button.reset')
                }}</t-button> -->
                  </t-col>
                </t-row>
                <t-form label-width="80px" label-align="left" style="border-top: 1px solid var(--td-component-stroke)">
                  <t-row class="item-row" :gutter="[4, 0]">
                    <t-col flex="210px"
                      ><t-form-item :label="t('productRework.scheCode')">{{ productInfo.scheCode }} </t-form-item>
                    </t-col>
                    <t-col flex="210px"
                      ><t-form-item :label="t('productRework.mitemCode')">{{ productInfo.moMitemCode }} </t-form-item>
                    </t-col>
                    <t-col flex="210px"
                      ><t-form-item :label="t('productRework.mitemName')">{{ productInfo.moMitemName }} </t-form-item>
                    </t-col>
                    <t-col flex="210px"
                      ><t-form-item :label="t('productRework.scheDate')"
                        >{{ productInfo.scheDatetimeScheStr }}
                      </t-form-item>
                    </t-col>
                    <t-col flex="210px"
                      ><t-form-item :label="t('productRework.scheQty')">{{ productInfo.scheQty }} </t-form-item>
                    </t-col>
                    <t-col flex="210px"
                      ><t-form-item :label="t('productRework.completeQty')"
                        >{{ productInfo.moCompletedQty }}
                      </t-form-item>
                    </t-col>
                  </t-row>
                </t-form>
              </cmp-card>
              <!-- 信息区 -->

              <cmp-card v-show="keyPartSumList && keyPartSumList.length > 0">
                <t-row class="custom-row">
                  <t-col class="custom-col">
                    <div class="groupbox">
                      <t-collapse :default-expand-all="true" expand-icon-placement="right">
                        <t-collapse-panel destroy-on-collapse :header="productInfo.header">
                          <t-list v-for="(item, index) in keyPartSumList" :key="index">
                            <t-list-item :class="{ 'selected-item': item.isScanFinish }">
                              {{ item.processName }}/{{ item.mitemCode }}/{{ item.mitemName }}
                              <template #action>
                                <t-checkbox v-model="item.isDeleteKeyPart"> </t-checkbox>
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
                  :fixed-height="false"
                  :show-toolbar="true"
                  :table-data="scanInfoList"
                  :show-pagination="false"
                  :show-setting="false"
                  :hover="false"
                  :stript="false"
                >
                  <template #title> {{ t('productRework.collectDtl') }} </template>
                  <template #serialNumber="{ row }">
                    <div class="talbe_col_nowrap" :title="row.serialNumber">
                      {{ row.serialNumber }}
                    </div>
                  </template>
                  <template #op="{ row }">
                    <t-link theme="primary" @click="onRemove(row)"> 移除 </t-link>
                  </template>
                  <template #button>
                    <t-popconfirm
                      theme="default"
                      :content="t('productRework.isconfirm')"
                      :confirm-btn="t('common.button.confirm')"
                      :cancel-btn="t('common.button.cancel')"
                      @confirm="onConfirm"
                    >
                      <t-button
                        class="btn_reset"
                        theme="primary"
                        :disabled="!(scanInfoList && scanInfoList.length > 0)"
                        >{{ t('productRework.confirm') }}</t-button
                      >
                    </t-popconfirm>

                    <t-button class="btn_reset" theme="default" @click="resetHandle">{{
                      t('common.button.reset')
                    }}</t-button></template
                  >
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
      </cmp-card>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import _, { isEmpty } from 'lodash';
import { LoadingPlugin, NotifyPlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api, ProductReworkVO, WipKeyPartCollectVO } from '@/api/control';
import BcmpWorkstationInfo from '@/components/bcmp-workstation-info/index.vue';
import { useUserStore } from '@/store';

import { messageModel, scanCollectInfoModel } from '../../api/processInspection';
import { useLang } from './lang';

const userStore = useUserStore();
// 全局信息
const scanInfoList = ref<ProductReworkVO[]>([]);
const { t } = useLang();
// 扫描信息
const scanInfoColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '产品条码', width: 80, colKey: 'serialNumber' },
  { title: '数量', width: '50', colKey: 'qty' },
  { title: '单位', width: 50, colKey: 'uomName' },
  { title: '操作', width: 50, colKey: 'op' },
];
// 页签
const tabModuleList = ref([
  { moduleCode: 'SETTING', moduleName: '返工前配置项' },
  { moduleCode: 'REWORK', moduleName: '产品返工' },
]);
const selectModule = ref('SETTING');
const scanBarcodeInstance = ref(null);
const preSetting = ref({
  isSameProcess: false,
  isSameMo: true,
  isByReworkMo: false,
  reworkMoSheId: null, // 返工排产单id
  reworkMoId: null, // 返工工单id
  reworkMoCode: '', // 返工工单号
  reworkRoutingRevisionId: '', // 返工工单的工艺路线版本id
  reworkRouting: '',
  reworkRoutingName: '',
  reworkLine: '',
  reworkProcess: '',
  curMitemId: '', // 条码对应的物料id
  curProcessId: null, // 条码当前所在的工序
  curMoScheId: null, // 条码当前所在的排产单
  scanType: 'BARCODE', // BARCODE,RUNCARD
  isLock: false,
});

const mainform = ref({
  serialNumber: '', // 条码
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
      title: t('productRework.tip'),
      content: t('productRework.tipsetting'),
      duration: 2000,
      closeBtn: true,
    });
  }
};
// 消息
const msgList = ref<
  {
    theme: 'success' | 'info' | 'error' | 'warning';
    content: string;
    time: string;
  }[]
>([]);
const getRowClassName = ({ rowIndex }) => {
  if (rowIndex === 0) return 'custom-third-class-name';
  return '';
};

const serialNumberEnter = async (value) => {
  if (!mainform.value.workStationId) {
    NotifyPlugin.error({
      title: t('productRework.tip'),
      content: t('productRework.tipsetting'),
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
    await api.productRework
      .scanProductNo({
        serialNumber: mainform.value.serialNumber,
        workcenterId: mainform.value.workCenterId,
        workCenterCode: mainform.value.workCenterCode,
        workCenterName: mainform.value.workCenterName,
        workstationId: mainform.value.workStationId,
        processId: mainform.value.processId,
        moScheId: productInfo.value.moScheId,
        preSetting: preSetting.value,
      })
      .then((reData) => {
        let isNeedClear = true;
        if (reData.scanSuccess) {
          mainform.value.isCommit = reData.isCommit;
          productInfo.value.scheCode = reData.scheCode;
          productInfo.value.moCode = reData.moCode;
          productInfo.value.moMitemCode = reData.mitemCode;
          productInfo.value.moMitemName = reData.mitemName;
          productInfo.value.scheDatetimeSche = reData.datetimeSche;
          productInfo.value.scheDatetimeScheStr = reData.datetimeScheStr;
          productInfo.value.scheQty = reData.scheQty.toString();
          productInfo.value.moCompletedQty = reData.completedQty.toString();
          productInfo.value.moScheId = reData.moScheId;
          if (reData.preSetting && reData.preSetting.curMitemId) {
            preSetting.value.curMitemId = reData.preSetting.curMitemId;
          }
          if (reData.preSetting && reData.preSetting.curMoScheId) {
            preSetting.value.curMoScheId = reData.preSetting.curMoScheId;
          }
          if (reData.preSetting && reData.preSetting.curProcessId) {
            preSetting.value.curProcessId = reData.preSetting.curProcessId;
          }
          addBarcodeInfo(reData); // 扫描成功

          writeMessageListSuccess(reData.scanMessage);

          if (reData.keyPartSumList.length > 0) {
            productInfo.value.header = `${t('productRework.keypartInfo')}:${productInfo.value.moMitemCode}(${
              productInfo.value.moMitemName
            })`;
            setKeypartList(reData.keyPartSumList);
            resetBarcode(isNeedClear);
          } else {
            // 没有关键件时，则清空以下信息
            resetBarcode(isNeedClear);
            if (keyPartSumList.value && keyPartSumList.value.length === 0) {
              resetKeyPartList();
            }
          }

          if (reData.isCommit) {
            // 提交时,清空扫描框即可
            resetBarcode(isNeedClear);
          }
        } else {
          isNeedClear = false;
          resetBarcode(isNeedClear);
          writeMessageListError(reData.scanMessage);
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

// 关键件信息赋值
const setKeypartList = (keypartList: WipKeyPartCollectVO[]) => {
  const partList = [];
  keypartList.forEach((item) => {
    const keypartInfo = _.find(
      keyPartSumList.value,
      (p: WipKeyPartCollectVO) => p.processId === item.processId && p.mitemId === item.mitemId,
    );
    // 如果是重复的关键件则无需添加
    if (!keypartInfo) {
      partList.push(item);
    }
  });
  keyPartSumList.value = [...keyPartSumList.value, ...partList];
};

const resetBarcode = (isNeedClear: boolean) => {
  if (isNeedClear) {
    mainform.value.serialNumber = '';
  } else {
    scanBarcodeInstance.value.selectAll();
  }
  if (scanBarcodeInstance.value) {
    const { customerFocus } = scanBarcodeInstance.value;
    customerFocus();
  }
};

const resetKeyPartList = () => {
  keyPartSumList.value = [];
};

const addBarcodeInfo = async (resData: ProductReworkVO) => {
  const barcodeInfo = _.find(scanInfoList.value, (item: ProductReworkVO) => item.serialNumber === resData.serialNumber);
  if (!barcodeInfo) {
    // 如果不存在则插入
    scanInfoList.value.unshift(resData);
  }
};

// 校验条码是否扫重复
const checkBarcodeRepeat = (lbNo) => {
  let isSuccess = true;
  const barcodeInfo = _.find(scanInfoList.value, (item: scanCollectInfoModel) => item.serialNumber === lbNo);
  if (barcodeInfo) {
    isSuccess = false;
    writeMessageListError(`该条码(${lbNo})已扫描,请勿重复扫描`);
  }
  return isSuccess;
};
const pushMessage = (type: 'success' | 'info' | 'error' | 'warning', msg: string) => {
  let content: string;
  if (type === 'success') {
    content = `${t('productRework.scanSuccess')} `;
    // NotifyPlugin.success({ title: t('productRework.scanSuccess'), content, duration: 2000 });
  } else if (type === 'error') {
    content = `${t('productRework.scanFailed')} , ${msg}`;
    // NotifyPlugin.error({ title: t('productRework.scanFailed'), content, duration: 2000 });
  } else {
    content = msg;
  }
  msgList.value.push({
    theme: type,
    content,
    time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  });
};
// 成功消息体
const writeMessageListSuccess = async (content) => {
  if (messageList.value && messageList.value.length > 10) {
    messageList.value.splice(0, messageList.value.length);
  }
  pushMessage('success', content);
  // messageList.value.unshift({
  //   title: '扫描成功',
  //   content,
  //   datatime,
  //   status: 'OK',
  // });
  NotifyPlugin.success({ title: '扫描成功', content, duration: 2000, closeBtn: true });
};
// 失败消息体
const writeMessageListError = async (content) => {
  if (messageList.value && messageList.value.length > 10) {
    messageList.value.splice(-1, 1);
  }
  pushMessage('error', content);
  // messageList.value.unshift({
  //   title: '扫描失败',
  //   content,
  //   datatime,
  //   status: 'NG',
  // });
  NotifyPlugin.error({ title: '扫描失败', content, duration: 2000, closeBtn: true });
};

const onchangeTab = () => {
  if (selectModule.value === 'REWORK') {
    if (!preSetting.value.isLock) {
      NotifyPlugin.error({
        title: t('productRework.tip'),
        content: t('productRework.checkPresetting'),
        duration: 2000,
        closeBtn: true,
      });
      selectModule.value = 'SETTING';
      return '';
    }
  }
  return '';
};

const onClickSetting = () => {
  if (preSetting.value.isByReworkMo) {
    if (!preSetting.value.reworkMoSheId) {
      NotifyPlugin.error({
        title: t('productRework.tip'),
        content: t('common.placeholder.input', [`${t('productRework.reworkMoSheId')}`]),
        duration: 2000,
        closeBtn: true,
      });
      return '';
    }
    if (!preSetting.value.reworkRouting) {
      NotifyPlugin.error({
        title: t('productRework.tip'),
        content: t('productRework.checkreworkRouting'),
        duration: 2000,
        closeBtn: true,
      });
      return '';
    }
  }
  if (!preSetting.value.reworkLine) {
    NotifyPlugin.error({
      title: t('productRework.tip'),
      content: t('common.placeholder.input', [`${t('productRework.reworkLine')}`]),
      duration: 2000,
      closeBtn: true,
    });
    return '';
  }
  if (!preSetting.value.reworkProcess) {
    NotifyPlugin.error({
      title: t('productRework.tip'),
      content: t('common.placeholder.input', [`${t('productRework.reworkProcess')}`]),
      duration: 2000,
      closeBtn: true,
    });
    return '';
  }

  preSetting.value.isLock = true;
  selectModule.value = 'REWORK';
  return '';
};

// 工序编码Change事件
const moScheduleSelectChange = (data) => {
  if (!preSetting.value.isLock) {
    preSetting.value.reworkMoId = data.moId;
    preSetting.value.reworkMoCode = data.moCode;
    preSetting.value.reworkProcess = '';
    preSetting.value.reworkRoutingRevisionId = data.routingRevisionId;
    preSetting.value.reworkRouting = data.routingCode;
    preSetting.value.reworkRoutingName = data.routingName;
  }
};

// 移除条码
const onRemove = (row) => {
  scanInfoList.value = scanInfoList.value.filter((item) => item.id !== row.id);
};

// 执行
const onConfirm = async () => {
  LoadingPlugin(true);
  // 原子校验
  // TODO 校验成功
  // const scanTime = dayjs().format('YYYY-MM-DD hh:mm:ss');
  await api.productRework
    .save({
      barcodeList: scanInfoList.value,
      preSetting: preSetting.value,
      keyPartSumList: keyPartSumList.value,
      centersetting: { ...mainform.value },
    })
    .then(() => {
      resetHandle();
      writeMessageListSuccess(t('productRework.success'));
      LoadingPlugin(false);
    })
    .catch((message) => {
      console.log(message);
      LoadingPlugin(false);
      writeMessageListError(message);
    });
};

// 重置
const resetHandle = () => {
  mainform.value.serialNumber = '';
  preSetting.value.curMitemId = '';
  preSetting.value.curMoScheId = '';
  preSetting.value.curProcessId = '';
  keyPartSumList.value = [];
  scanInfoList.value = [];
  // 清除所有对象的值
  Object.keys(productInfo.value).forEach((key) => {
    delete productInfo.value[key];
  });
};

// 切换工站
const handleonChange = () => {
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
  text-align: right;
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

.text-align-rgiht {
  margin-top: 8px;
  text-align: right;
  width: 100%;
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
// .card-left {
//   margin-top: -12px; //由于tdesign的bug，先临时解决
// }
</style>
