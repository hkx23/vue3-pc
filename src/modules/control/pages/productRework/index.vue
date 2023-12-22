<template>
  <cmp-container :full="true">
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
    <cmp-card v-if="selectModule == 'SETTING'">
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
            type="moSchedule"
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
    <cmp-row v-if="selectModule == 'REWORK'" :disabled="!preSetting.isLock">
      <cmp-card :span="9" :ghost="false">
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
            <t-col :span="7">
              <t-input
                v-model="mainform.serialNumber"
                :placeholder="t('productRework.scanBarcode')"
                size="large"
                @enter="serialNumberEnter"
              />
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
                  <t-input v-model="productInfo.scheQty" placeholder="" :label="t('productRework.scheQty')" readonly />
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
                  <template #op="{ row }">
                    <t-link theme="primary" @click="onRemove(row)"> 移除 </t-link>
                  </template>
                </t-table>
              </div>
            </t-col>
          </t-row>
          <t-row>
            <t-col :span="12" class="custom-row-item-reset">
              <t-popconfirm
                theme="default"
                content="t('productRework.isconfirm')"
                confirm-btn="t('common.button.confirm')"
                cancel-btn="t('common.button.cancel')"
                @confirm="onConfirm"
              >
                <t-button class="btn_reset" theme="primary" :disabled="!(scanInfoList && scanInfoList.length > 0)">{{
                  t('productRework.confirm')
                }}</t-button>
              </t-popconfirm>

              <t-button class="btn_reset" theme="default" @click="resetHandle">{{ t('common.button.reset') }}</t-button>
            </t-col>
          </t-row>
        </t-space>
      </cmp-card>
      <cmp-card :span="3">
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
        </div></cmp-card
      >
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import _, { isEmpty } from 'lodash';
import { LoadingPlugin, NotifyPlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api, ProductReworkVO, WipKeyPartCollectVO } from '@/api/control';
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

const preSetting = ref({
  isSameProcess: false,
  isSameMo: true,
  isByReworkMo: false,
  reworkMoSheId: '', // 返工排产单id
  reworkMoId: '', // 返工工单id
  reworkRoutingRevisionId: '', // 返工工单的工艺路线版本id
  reworkRouting: '',
  reworkRoutingName: '',
  reworkLine: '',
  reworkProcess: '',
  curMitemId: '', // 条码对应的物料id
  curProcessId: '', // 条码当前所在的工序
  curMoScheId: '', // 条码当前所在的排产单
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

  if (!mainform.value.workStationId) {
    NotifyPlugin.error({ title: t('wipCollect.tip'), content: t('wipCollect.tipsetting'), duration: 2000 });
  }
};

const serialNumberEnter = async (value) => {
  if (!mainform.value.workStationId) {
    NotifyPlugin.error({ title: t('productRework.tip'), content: t('productRework.tipsetting'), duration: 2000 });
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
          addBarcodeInfo(reData); // 扫描成功

          writeMessageListSuccess(reData.scanMessage, reData.scanDatetimeStr);

          if (reData.keyPartSumList.length > 0) {
            productInfo.value.header = `${t('productRework.keypartInfo')}:${productInfo.value.moMitemCode}(${
              productInfo.value.moMitemName
            })`;
            setKeypartList(reData.keyPartSumList);
          } else {
            // 没有关键件时，则清空以下信息
            resetBarcode();
            resetKeyPartList();
          }

          if (reData.isCommit) {
            // 提交时,清空扫描框即可
            resetBarcode();
          }
        } else {
          writeMessageListError(reData.scanMessage, reData.scanDatetimeStr);
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
      partList.push(keypartInfo);
    }
  });
  keyPartSumList.value = [...keyPartSumList.value, ...partList];
};

const resetBarcode = () => {
  mainform.value.serialNumber = '';
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
  const barcodeInfo = _.find(
    scanInfoList.value,
    (item: scanCollectInfoModel) => item.status === 'OK' && item.serialNumber === lbNo,
  );
  if (barcodeInfo) {
    isSuccess = false;
    writeMessageListError(`该条码(${lbNo})已扫描,请勿重复扫描`, dayjs().format('YYYY-MM-DD HH:mm:ss'));
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

const onchangeTab = () => {
  if (selectModule.value === 'REWORK') {
    if (!preSetting.value.isLock) {
      NotifyPlugin.error({
        title: t('productRework.tip'),
        content: t('productRework.checkPresetting'),
        duration: 2000,
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
  if (!preSetting.value.isLock) {
    preSetting.value.reworkMoId = data.moId;
    preSetting.value.reworkProcess = '';
    preSetting.value.reworkRoutingRevisionId = data.routingRevisionId;
    preSetting.value.reworkRouting = data.routingCode;
    preSetting.value.reworkRoutingName = data.routingName;
  }
};

// 移除条码
const onRemove = (row) => {
  scanInfoList.value.splice(0, row);
};

// 执行
const onConfirm = () => {
  scanInfoList.value = [];
};

// 重置
const resetHandle = () => {
  mainform.value.serialNumber = '';
  keyPartSumList.value = [];
  scanInfoList.value = [];
  // 清除所有对象的值
  Object.keys(productInfo.value).forEach((key) => {
    delete productInfo.value[key];
  });
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

/deep/ .t-form__controls-content {
  width: 40%;
}

.text-align-rgiht {
  margin-top: 8px;
  text-align: right;
  width: 100%;
}
</style>
