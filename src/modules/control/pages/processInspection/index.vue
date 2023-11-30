<template>
  <div class="table-tree-container">
    <div class="list-tree-content">
      <div class="list-common-table">
        <t-layout>
          <t-layout>
            <t-content>
              <t-space align="center" direction="vertical" style="width: 98%">
                <t-row justify="center">
                  <t-col>车间：组装车间 工作中心：XXXXXX 工站：XXXXXX</t-col>
                </t-row>
                <t-row align="center">
                  <t-col :span="2" style="text-align: right">扫描 产品条码：</t-col>
                  <t-col flex="auto">
                    <t-input v-model="serialNumber" size="large" @enter="serialNumberEnter" />
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
                  <t-col :span="7">
                    <div class="groupbox">
                      <span class="grouptitle">缺陷信息</span>
                      <t-card :bordered="false" style="height: 400px" class="t-table__content">
                        <t-space direction="vertical">
                          <t-space>
                            <t-button>缺陷分类1</t-button>
                            <t-space break-line>
                              <t-button theme="default">缺陷1</t-button>
                              <t-button theme="default">缺陷2</t-button>
                              <t-button theme="default">缺陷3</t-button>
                              <t-button theme="default">缺陷4</t-button>
                              <t-button theme="default">缺陷5</t-button>
                              <t-button theme="default">缺陷6</t-button>
                              <t-button theme="default">缺陷7</t-button>
                              <t-button theme="default">缺陷8</t-button>
                              <t-button theme="default">缺陷9</t-button>
                            </t-space>
                          </t-space>

                          <t-space>
                            <t-button>缺陷分类2</t-button>
                            <t-space break-line>
                              <t-button theme="default">缺陷1</t-button>
                              <t-button theme="default">缺陷2</t-button>
                              <t-button theme="default">缺陷3</t-button>
                              <t-button theme="default">缺陷4</t-button>
                              <t-button theme="default">缺陷5</t-button>
                              <t-button theme="default">缺陷6</t-button>
                              <t-button theme="default">缺陷7</t-button>
                              <t-button theme="default">缺陷8</t-button>
                              <t-button theme="default">缺陷9</t-button>
                            </t-space>
                          </t-space>

                          <t-space>
                            <t-button>缺陷分类3</t-button>
                            <t-space break-line>
                              <t-button theme="default">缺陷1</t-button>
                              <t-button theme="default">缺陷2</t-button>
                              <t-button theme="default">缺陷3</t-button>
                              <t-button theme="default">缺陷4</t-button>
                              <t-button theme="default">缺陷5</t-button>
                              <t-button theme="default">缺陷6</t-button>
                              <t-button theme="default">缺陷7</t-button>
                              <t-button theme="default">缺陷8</t-button>
                              <t-button theme="default">缺陷9</t-button>
                            </t-space>
                          </t-space>

                          <t-space>
                            <t-button>缺陷分类3</t-button>
                            <t-space break-line>
                              <t-button theme="default">缺陷1</t-button>
                              <t-button theme="default">缺陷2</t-button>
                              <t-button theme="default">缺陷3</t-button>
                              <t-button theme="default">缺陷4</t-button>
                              <t-button theme="default">缺陷5</t-button>
                              <t-button theme="default">缺陷6</t-button>
                              <t-button theme="default">缺陷7</t-button>
                              <t-button theme="default">缺陷8</t-button>
                              <t-button theme="default">缺陷9</t-button>
                            </t-space>
                          </t-space>
                        </t-space>
                      </t-card>
                    </div>
                  </t-col>
                  <t-col flex="auto"></t-col>
                  <t-col flex="325px">
                    <div class="groupbox">
                      <span class="grouptitle">采集详情</span>
                      <t-table
                        row-key="id"
                        :columns="scanInfoColumns"
                        :data="scanInfoList"
                        height="400px"
                        active-row-type="single"
                      >
                        <template #serialNumber="{ row }">
                          <div class="talbe_col_nowrap" :title="row.serialNumber">
                            {{ row.serialNumber }}
                          </div>
                        </template>
                        <template #status="{ row }">
                          <div class="talbe_col_nowrap" :title="row.status" :style="row.statusColor">
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
            <div class="groupbox" style="height: 610px">
              <span class="grouptitle">消息组件</span>
              <t-list style="height: 98%" :scroll="{ type: 'virtual' }">
                <t-list-item v-for="(item, index) in list" :key="index">
                  <t-list-item-meta style="align-items: center">
                    <template #description>
                      <t-space>
                        <t-icon name="check-circle-filled" style="color: green" />
                        <t-icon name="close-circle" style="color: red" />
                        <div>{{ item.content }}</div>
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
import { isEmpty } from 'lodash';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

// import { api } from '@/api/control';

interface scanInfoModel {
  serialNumber: string;

  qty: number;

  status: string;

  errorinfo: string;

  statusColor: string;
}

const scanInfoList = ref<scanInfoModel[]>([]);

const scanInfoColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '产品条码', width: 100, colKey: 'serialNumber' },
  { title: '数量', width: '50', colKey: 'qty' },
  { title: '状态', width: 50, colKey: 'status' },
  { title: '缺陷信息', width: 100, colKey: 'errorinfo' },
];

const serialNumber = ref('');
const productInfo = ref({
  scheCode: '',
  scheDatetimeSche: '',
  scheQty: '',
  moCode: '',
  moMitemName: '',
  moCompletedQty: '',
});

// const defectCodeList = ref([]); // M_DEFECT_CODE | 缺陷代码表 table

const list = ref([]);

// import { api } from '@/api/control';
// const pagination = ref({ defaultPageSize: 20, total: 100, defaultCurrent: 1 });
const Init = () => {
  serialNumber.value = 'LB0001';

  for (let i = 0; i < 3000; i++) {
    list.value.push({ content: `扫描成功`, datatime: `2023-11-12 23:22:32` });
  }
};

const serialNumberEnter = async (value) => {
  if (!isEmpty(value)) {
    // 原子校验
    // TODO 校验成功

    // TODO 校验失败，写日志到右侧表
    writeScanInfoError(value, 0, '');
    writeScanInfoSuccess(value, 0, '');
    // api.barcodeWip
    //   .getBarcodeWip({ serialNumber: value })
    //   .then((reData) => {
    //     debugger;
    //     writeScanInfoSuccess(reData.serialNumber, reData.qty, 'message');
    //   })
    //   .catch((reData) => {
    //     debugger;
    //     writeScanInfoError(reData.data.serialNumber, reData.data.qty, reData.message);
    //   });
  }
};

const writeScanInfoSuccess = async (lbNo, lbQty, lbError) => {
  scanInfoList.value.push({
    serialNumber: lbNo,
    qty: lbQty,
    status: 'OK',
    errorinfo: lbError,
    statusColor: 'green',
  });
};

const writeScanInfoError = async (lbNo, lbQty, lbError) => {
  scanInfoList.value.push({
    serialNumber: lbNo,
    qty: lbQty,
    status: 'NG',
    errorinfo: lbError,
    statusColor: 'red',
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
</style>
