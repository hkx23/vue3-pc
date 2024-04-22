<!-- 国标抽样方案 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query ref="queryRef" :opts="opts" @submit="onInput" @reset="onReset">
        <template #inspectionStringency="{ param }">
          <t-select
            v-model="param.inspectionStringency"
            :clearable="true"
            label="严格度"
            placeholder="请选择严格度"
            @change="passStringency()"
          >
            <t-option
              v-for="item in inspectionStringencyOption"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            />
          </t-select>
        </template>
        <template #aql="{ param }">
          <t-select v-model="param.aql" :clearable="true" label="AQL" placeholder="请选择AQL" @click="onAqls(param)">
            <t-option v-for="item in aqlDataList.list" :key="item" :label="item" :value="item" />
          </t-select>
        </template>
        <template #approvalNum="{ param }">
          <t-input-number
            v-model="param.approvalNum"
            label="报检数量"
            theme="column"
            placeholder="请输入报检数量"
            align="left"
            style="width: 100%"
          />
        </template>
      </cmp-query>
    </cmp-card>
    <cmp-card :span="12" class="full-tab">
      <t-tabs v-model="tabValue" @change="tabChange">
        <t-tab-panel label="国标抽样方案" value="0" :destroy-on-hide="true">
          <template #panel>
            <cmp-container :full="true">
              <cmp-card :ghost="true">
                <cmp-table
                  ref="tableRefTop"
                  v-model:pagination="pageUI"
                  row-key="_timestamp"
                  :columns="columns"
                  :table-data="tableData"
                  active-row-type="single"
                  :fixed-height="true"
                  :total="0"
                  :hover="true"
                  :bordered="true"
                  :show-pagination="false"
                  :show-toolbar="false"
                >
                  <template #batch="{ row }">
                    {{
                      row.batchStart !== null && row.batchEnd !== null
                        ? `${row.batchStart}${row.batchEnd == '2147483647' ? '及以上' : '~' + row.batchEnd}`
                        : ''
                    }}
                  </template>
                  <template #title>
                    {{ '国标抽样方案' }}
                  </template>
                </cmp-table>
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
        <t-tab-panel label="参考文件" value="1" :destroy-on-hide="true" style="overflow: auto">
          <template #panel>
            <cmp-container :full="false">
              <cmp-card :ghost="true">
                <t-image v-if="stringency == 'NORMAL'" :src="normalDrawing" />
                <t-image v-if="stringency == 'RELAX'" :src="relaxDrawing" />
                <t-image v-if="stringency == 'STRICT'" :src="strictDrawing" />
              </cmp-card>
            </cmp-container>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, reactive, ref } from 'vue';

import { api as apiMain } from '@/api/main';
import { api } from '@/api/quality';
import normalDrawing from '@/assets/images/NORMAL.jpg';
import relaxDrawing from '@/assets/images/RELAX.jpg';
import strictDrawing from '@/assets/images/STRICT.jpg';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();
const queryRef = ref();
const tabValue = ref('0'); // 主界面tab的默认选中
const stringency = ref(''); // 严格度值

onMounted(async () => {
  await getcheckLevel();
  await getinspectionStringency();
});

// TAb 栏切换事件
const tabChange = async (value) => {
  if (value === '0') {
    await queryRef.value.search();
  } else if (value === '1') {
    stringency.value = queryRef.value.getFromValue('inspectionStringency');
    if (stringency.value === '') {
      MessagePlugin.warning('请先选择严格度！');
    }
  }
};

const passStringency = () => {
  stringency.value = queryRef.value.getFromValue('inspectionStringency');
};

// #获取搜索 接收质量限 下拉框数据
const aqlDataList = reactive({ list: [] });
const onAqls = async (param) => {
  const res = await api.samplingAql.getAqlList({
    checkLevel: param.checkLevel,
    inspectionStringency: param.inspectionStringency,
  });
  aqlDataList.list = res;
};

//* 重置
const isResetting = ref(false);
// 重置按钮
const onReset = () => {
  queryRef.value = '';
  queryRef.value.search();
};

const opts = computed(() => {
  return {
    checkLevel: {
      label: '检验水平',
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: checkLevelOption.value,
        clearable: true,
      },
    },
    inspectionStringency: {
      label: '严格度',
      labelWidth: '60',
      event: 'select',
      defaultVal: '',
      slotName: 'inspectionStringency',
    },
    aql: {
      label: '接收质量限',
      labelWidth: '60',
      event: 'select',
      defaultVal: '',
      slotName: 'aql',
    },
    approvalNum: {
      label: '报批数量',
      event: 'input',
      defaultVal: '',
      slotName: 'approvalNum',
    },
  };
});

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  if (isResetting.value) {
    return;
  }
  const { checkLevel, inspectionStringency, aql, approvalNum } = data;
  if (!checkLevel || !inspectionStringency || !aql) {
    MessagePlugin.warning('请先选择检验水平、严格度和接收质量限！');
    return;
  }
  try {
    const updatedData = await api.samplingAql.getList({
      checkLevel,
      inspectionStringency,
      aql,
      approvalNum,
    });

    tableData.value = updatedData.map((item) => ({
      ...item,
      _timestamp: Date.now() + Math.random(), // 使用Date.now()加上随机数来生成唯一时间戳
    }));
    console.log('🚀 ~ tableData.value=batch.value.map ~ tableData.value111:', tableData.value);
  } catch (error) {
    console.error('查询出错:', error);
    MessagePlugin.error('查询失败，请稍后重试');
  }
};

//
/** 获取 数据字典 检验水平
 *  检验水平
 */
const checkLevelOption = ref([]);
const getcheckLevel = async () => {
  try {
    const res = await apiMain.param.getListByGroupCode({
      parmGroupCode: 'Q_INSPECTION_STD_LEVEL',
    });
    checkLevelOption.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};

/** 获取 数据字典 严格度
 *  严格度
 */
const inspectionStringencyOption = ref([]);
const getinspectionStringency = async () => {
  try {
    const res = await apiMain.param.getListByGroupCode({
      parmGroupCode: 'Q_INSPECTION_STRINGENCY',
    });
    inspectionStringencyOption.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};

const tableData = ref([]);

// 表格列表数据
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    title: '样本大小',
    colKey: 'batch',
    width: '70',
    cell: 'batchSlot',
  },
  {
    title: '样本数',
    colKey: 'sampleQty',
    width: '70',
  },
  {
    title: '允收数(AC)',
    colKey: 'acceptQty',
    width: '70',
  },
  {
    title: '拒收数(RE)',
    colKey: 'rejectQty',
    width: '70',
  },
];

onMounted(async () => {
  getcheckLevel();
  getinspectionStringency();
});
</script>

<style scoped>
.no-wrap {
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏超出部分 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}
</style>
