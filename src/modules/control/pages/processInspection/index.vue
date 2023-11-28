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
                  <t-col flex="auto"> <t-input size="large" /> </t-col>
                  <t-col flex="40px" />
                </t-row>
                <t-row align="center">
                  <div class="groupbox" style="height: auto">
                    <span class="grouptitle">产品信息</span>
                    <t-space align="center" direction="horizontal" :break-line="true" style="margin: 10px">
                      <t-input label="排产单号" />
                      <t-input label="产品编码" />
                      <t-input label="产品名称" />
                      <t-input label="排产日期" />
                      <t-input label="排产数量" />
                      <t-input label="完工数量" />
                    </t-space>
                  </div>
                </t-row>
                <t-row>
                  <t-col :span="7">
                    <div class="groupbox">
                      <span class="grouptitle">缺陷信息</span>
                    </div>
                  </t-col>
                  <t-col flex="auto"></t-col>
                  <t-col flex="325px">
                    <div class="groupbox">
                      <span class="grouptitle">采集详情</span>
                      <t-table
                        row-key="id"
                        :columns="tableProcessColumns"
                        :data="tableDataProcess"
                        height="50vh"
                        active-row-type="single"
                      >
                        <template #processCode="{ row }">
                          <div class="talbe_col_nowrap" :title="row.processCode">
                            {{ row.processCode }}
                          </div>
                        </template>
                        <template #stateName="{ row }">
                          <div class="talbe_col_nowrap" :title="row.stateName">
                            {{ row.stateName }}
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
            <div class="groupbox" style="height: 88vh">
              <span class="grouptitle">消息组件</span>
              <t-list style="height: 98%" :scroll="{ type: 'virtual' }">
                <t-list-item v-for="(item, index) in list" :key="index">
                  <t-list-item-meta :image="item.imageurl" style="align-items: center">
                    <template #description>
                      <t-row>
                        <t-col flex="50px"> {{ item.content }}</t-col>
                        <t-col flex="10px" />
                        <t-col> {{ item.datatime }}</t-col>
                      </t-row>
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
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

const tableDataProcess = ref([]);
const tableProcessColumns: PrimaryTableCol<TableRowData>[] = [
  { title: '产品条码', width: 100, colKey: 'processCode' },
  { title: '数量', width: '50', colKey: 'processName' },
  { title: '状态', width: 50, colKey: 'processDesc' },
  { title: '缺陷信息', width: 100, colKey: 'stateName' },
];

const list = ref([]);
const imageUrl = 'https://tdesign.gtimg.com/site/avatar.jpg';

// import { api } from '@/api/control';
// const pagination = ref({ defaultPageSize: 20, total: 100, defaultCurrent: 1 });
const Init = () => {
  for (let i = 0; i < 28; i++) {
    tableDataProcess.value.push({
      id: i + 1,
      processCode: 'XX0099019101910191',
      processName: '111',
      processDesc: '启用',
      stateName: '缺陷信息缺陷信息缺陷信息',
    });
  }

  for (let i = 0; i < 3000; i++) {
    list.value.push({ imageurl: imageUrl, content: `扫描成功`, datatime: `2023-11-12 23:22:32` });
  }
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
  height: 55vh;

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

  div.t-list-item__meta-content {
    width: 100% !important;

    p.t-list-item__meta-description {
      width: 100% !important;
    }
  }
}
</style>
