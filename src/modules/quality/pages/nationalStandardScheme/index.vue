<!-- 国标抽样方案 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query ref="queryRef" :opts="opts" @submit="onInput" @reset="onReset"></cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRefTop"
        v-model:pagination="pageUI"
        row-key="_timestamp"
        :table-data="tableData"
        active-row-type="single"
        :total="0"
        :hover="true"
        :columns="columns"
        :bordered="true"
        :show-pagination="false"
        :fixed-height="true"
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

<script setup lang="ts">
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import { api as apiMain } from '@/api/quality';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();
const queryRef = ref();

onMounted(async () => {
  await getcheckLevel();
  await getinspectionStringency();
});

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
      comp: 't-select',
      defaultVal: '',
      bind: {
        options: inspectionStringencyOption.value,
        clearable: true,
      },
    },
  };
});

//* 查询
// const onInput = async (data: any) => {
//   if (isResetting.value) {
//     return;
//   }
//   const { checkLevel, inspectionStringency } = data;
//   // 检查是否选择了必要的选项
//   if (!checkLevel || !inspectionStringency) {
//     MessagePlugin.warning('请先选择检验水平和严格度');
//     return;
//   }
//   try {
//     const updatedData = await apiMain.samplingAql.getList({
//       checkLevel,
//       inspectionStringency,
//     });
//     const data = updatedData.map((item, index) => ({
//       batch: batch.value[index], // 从预定义的batch数组获取对应的值
//       sampleQty: item.sampleQty,
//       acRe: `${item.acceptQty} ${item.rejectQty}`,
//       aql: item.aql,
//     }));
//     tableData.value = data;
//   } catch (error) {
//     console.error('查询出错:', error);
//     MessagePlugin.error('查询失败，请稍后重试');
//   }
// };

const onInput = async (data: any) => {
  pageUI.value.page = 1;
  if (isResetting.value) {
    return;
  }
  const { checkLevel, inspectionStringency } = data;
  if (!checkLevel || !inspectionStringency) {
    MessagePlugin.warning('请先选择检验水平和严格度');
    return;
  }
  try {
    const updatedData = await apiMain.samplingAql.getList({
      checkLevel,
      inspectionStringency,
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
    const res = await api.param.getListByGroupCode({
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
    const res = await api.param.getListByGroupCode({
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
    width: '150',
    cell: 'batchSlot',
  },
  {
    title: '样本数',
    colKey: 'sampleQty',
    width: '70',
  },
  {
    title: '0.01',
    children: [{ title: 'Ac Re', colKey: 'aql001', width: '65' }],
    width: '110',
  },
  {
    title: '0.015',
    children: [{ title: 'Ac Re', colKey: 'aql0015', width: '65' }],
    width: '110',
  },
  {
    title: '0.025',
    children: [{ title: 'Ac Re', colKey: 'aql0025', width: '65' }],
    width: '110',
  },
  {
    title: '0.04',
    children: [{ title: 'Ac Re', colKey: 'aql004', width: '65' }],
    width: '110',
  },
  {
    title: '0.065',
    children: [{ title: 'Ac Re', colKey: 'aql0065', width: '65' }],
    width: '110',
  },
  {
    title: '0.1',
    children: [{ title: 'Ac Re', colKey: 'aql01', width: '65' }],
    width: '110',
  },
  {
    title: '0.15',
    children: [{ title: 'Ac Re', colKey: 'aql015', width: '65' }],
    width: '110',
  },
  {
    title: '0.25',
    children: [{ title: 'Ac Re', colKey: 'aql025', width: '65' }],
    width: '110',
  },
  {
    title: '0.4',
    children: [{ title: 'Ac Re', colKey: 'aql04', width: '65' }],
    width: '110',
  },
  {
    title: '0.65',
    children: [{ title: 'Ac Re', colKey: 'aql065', width: '65' }],
    width: '110',
  },
  {
    title: '1',
    children: [{ title: 'Ac Re', colKey: 'aql1', width: '65' }],
    width: '110',
  },
  {
    title: '1.5',
    children: [{ title: 'Ac Re', colKey: 'aql1_5', width: '65' }],
    width: '110',
  },
  {
    title: '2.5',
    children: [{ title: 'Ac Re', colKey: 'aql2_5', width: '65' }],
    width: '110',
  },
  {
    title: '4',
    children: [{ title: 'Ac Re', colKey: 'aql4', width: '65' }],
    width: '110',
  },
  {
    title: '6.5',
    children: [{ title: 'Ac Re', colKey: 'aql6_5', width: '65' }],
    width: '110',
  },
  {
    title: '10',
    children: [{ title: 'Ac Re', colKey: 'aql10', width: '65' }],
    width: '110',
  },
  {
    title: '15',
    children: [{ title: 'Ac Re', colKey: 'aql15', width: '65' }],
    width: '110',
  },
  {
    title: '25',
    children: [{ title: 'Ac Re', colKey: 'aql25', width: '65' }],
    width: '110',
  },
  {
    title: '40',
    children: [{ title: 'Ac Re', colKey: 'aql40', width: '65' }],
    width: '110',
  },
  {
    title: '65',
    children: [{ title: 'Ac Re', colKey: 'aql65', width: '65' }],
    width: '110',
  },
  {
    title: '100',
    children: [{ title: 'Ac Re', colKey: 'aql100', width: '65' }],
    width: '110',
  },
  {
    title: '150',
    children: [{ title: 'Ac Re', colKey: 'aql150', width: '65' }],
    width: '110',
  },
  {
    title: '250',
    children: [{ title: 'Ac Re', colKey: 'aql250', width: '65' }],
    width: '110',
  },
  {
    title: '400',
    children: [{ title: 'Ac Re', colKey: 'aql400', width: '65' }],
    width: '110',
  },
  {
    title: '650',
    children: [{ title: 'Ac Re', colKey: 'aql650', width: '65' }],
    width: '110',
  },
  {
    title: '1000',
    children: [{ title: 'Ac Re', colKey: 'aql1000', width: '65' }],
    width: '110',
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
