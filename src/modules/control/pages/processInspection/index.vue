<template>
  <div class="table-tree-container">
    <div class="list-tree-content">
      <div class="list-common-table">
        <t-layout>
          <t-layout>
            <t-content>
              <t-space align="center" direction="vertical" style="width: 98%">
                <t-row justify="center">
                  <t-col
                    >车间：XXXXX 工作中心：{{ mainform.workCenterCode }} 工站：{{ mainform.workStationCode }}</t-col
                  >
                </t-row>
                <t-row align="center">
                  <t-col :span="2" style="text-align: right">扫描 产品条码：</t-col>
                  <t-col flex="auto">
                    <t-input v-model="mainform.serialNumber" size="large" @enter="serialNumberEnter" />
                  </t-col>
                  <t-col flex="40px" />
                </t-row>
                <t-row align="center">
                  <div class="groupbox" style="height: auto">
                    <span class="grouptitle">产品信息</span>
                    <t-card :bordered="false">
                      <t-space align="center" direction="horizontal" :break-line="true">
                        <t-input v-model="productInfo.scheCode" label="排产单号" readonly />
                        <t-input v-model="productInfo.moCode" label="产品编码" readonly />
                        <t-input v-model="productInfo.moMitemName" label="产品名称" readonly />
                        <t-input v-model="productInfo.scheDatetimeSche" label="排产日期" readonly />
                        <t-input v-model="productInfo.scheQty" label="排产数量" readonly />
                        <t-input v-model="productInfo.moCompletedQty" label="完工数量" readonly />
                      </t-space>
                    </t-card>
                  </div>
                </t-row>
                <t-row>
                  <t-col flex="490px">
                    <div class="groupbox">
                      <span class="grouptitle">缺陷信息</span>
                      <t-card :bordered="false" style="height: 295px; max-height: 295px" class="t-table__content">
                        <t-space direction="vertical">
                          <t-space v-for="(item, index) in defectCodeList" :key="index">
                            <t-button
                              theme="default"
                              style="width: 70px; height: 73px; max-height: 73px; white-space: normal"
                              :v-model="item"
                              :content="item.defectName"
                            />
                            <t-space break-line>
                              <t-button
                                v-for="(item_child, index_child) in item.child"
                                :key="index_child"
                                :content="item_child.defectName"
                                style="width: 100px"
                                :theme="getThemeButton(item_child.themeButton)"
                                @click="clickDefectCode(item_child)"
                              />
                            </t-space>
                          </t-space>
                        </t-space>
                      </t-card>
                    </div>
                  </t-col>
                  <t-col flex="auto"></t-col>
                  <t-col flex="320px">
                    <div class="groupbox">
                      <span class="grouptitle">采集详情</span>
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
            <div class="groupbox" style="height: 540px">
              <span class="grouptitle">消息组件</span>
              <t-list style="height: 96%" :scroll="{ type: 'virtual' }">
                <t-list-item v-for="(item, index) in messageList" :key="index">
                  <t-list-item-meta style="align-items: center">
                    <template #description>
                      <t-space>
                        <t-icon v-if="item.status == 'OK'" name="check-circle-filled" style="color: green" />
                        <t-icon v-if="item.status == 'NG'" name="close-circle" style="color: red" />
                        <div :title="item.content">{{ item.title }}</div>
                        <div>{{ item.datatime }}</div>
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
  </div>
</template>

<script setup lang="ts">
import { isEmpty, isNil } from 'lodash';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/control';
import { api as apiMain, DefectCodeVO } from '@/api/main';

import { messageModel, scanInfoModel } from '../../api/processInspection';
// 全局信息
const scanInfoList = ref<scanInfoModel[]>([]);

// 扫描信息
const scanInfoColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '产品条码', width: 80, colKey: 'serialNumber' },
  { title: '数量', width: '50', colKey: 'qty' },
  { title: '状态', width: 50, colKey: 'status' },
  { title: '缺陷信息', width: 120, colKey: 'errorinfo' },
];

const mainform = ref({
  serialNumber: '',
  workCenterId: '',
  workCenterCode: '',
  workCenterName: '',
  workStationId: '',
  workStationCode: '',
  workStationName: '',
  processId: '',
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
const messageList = ref<messageModel[]>([]);

const Init = async () => {
  mainform.value.serialNumber = 'LB0001';
  mainform.value.workCenterId = '1730421387954343937'; // 3-1-1
  mainform.value.workCenterCode = '3-1-1'; // 3-1-1
  mainform.value.workCenterName = '3号工厂1车间1区域'; // 3-1-1

  mainform.value.workStationId = '1729475654052753410'; // G_TP 高新产业园贴标
  mainform.value.workStationCode = 'G_TP';
  mainform.value.workStationName = '高新产业园贴标';
  mainform.value.processId = '1'; // PC001 贴标
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
          writeMessageListSuccess(reData.scanMessage, reData.scanDatetimeStr);
          writeScanInfoSuccess(reData.serialNumber, reData.qty, reData.defectCodeStr);
        } else {
          writeMessageListError(reData.scanMessage, reData.scanDatetimeStr);
          writeScanInfoError(reData.serialNumber, reData.qty, reData.defectCodeStr);
        }
      })
      .catch((message) => {
        console.log(message);
      });

    // TODO 校验失败，写日志到右侧表
  }
};

const getDefectCodeTree = async () => {
  try {
    const data = await apiMain.defectCode.tree();

    data.forEach((n) => {
      n.child.forEach((m) => {
        defectCodeList.value.push(m);
      });
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

const writeMessageListSuccess = async (content, datatime) => {
  messageList.value.unshift({
    title: '扫描成功',
    content,
    datatime,
    status: 'OK',
  });
};

const writeMessageListError = async (content, datatime) => {
  messageList.value.unshift({
    title: '扫描失败',
    content,
    datatime,
    status: 'NG',
  });
};

const themes = {
  default: 'default',
  success: 'success',
  primary: 'primary',
  warning: 'warning',
  danger: 'danger',
};

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
</style>
