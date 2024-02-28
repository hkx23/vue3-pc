<!-- 国标抽样方案 -->
<template>
  <cmp-container :full="true">
    <cmp-card>
      <cmp-query :opts="opts" @submit="onInput" @reset="onReset"></cmp-query>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-table
        ref="tableRefTop"
        v-model:pagination="pageUI"
        row-key="batch"
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
          <div class="no-wrap">{{ row.batch }}</div>
        </template>
        <template #title>
          {{ '国标抽样方案' }}
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, ref } from 'vue';

import { api } from '@/api/main';
import { api as apiMain } from '@/api/quality';
import { usePage } from '@/hooks/modules/page';

const { pageUI } = usePage();

onMounted(async () => {
  await getcheckLevel();
  await getinspectionStringency();
});

//* 重置
const isResetting = ref(false);
const onReset = () => {
  // 阻止调用接口
  isResetting.value = true;
  nextTick(() => {
    tableData.value = batch.value.map((batchItem) => ({
      batch: batchItem,
      sampleQty: '',
      acRe: '',
    }));
    isResetting.value = false;
  });
  MessagePlugin.success('重置成功');
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

    tableData.value = batch.value.map((batchItem, index) => {
      const item = updatedData[index] || {};
      console.log('🚀 ~ tableData.value=batch.value.map ~ item:000', item);
      return {
        batch: batchItem,
        sampleQty: item.sampleQty || '',
        acRe: item.acceptQty ? `${item.acceptQty}/${item.rejectQty}` : '',
        aql: item.aql ? `${item.aql}/${item.aql}` : '',
      };
    });
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

// 最左侧数据结构
const batch = ref([
  '2~8',
  '9~15',
  '16~25',
  '26~50',
  '51~90',
  '91~150',
  '151~280',
  '281~500',
  '501~1200',
  '1201~3200',
  '3201~10000',
  '10001~35000',
  '35001~150000',
  '150001~500000',
  '500001及基以上',
  '',
]);
const tableData = ref([]);

// 生成列数据结构
const generateColumns = () => {
  const sizes = [
    '0.01',
    '0.015',
    '0.025',
    '0.04',
    '0.065',
    '0.1',
    '0.15',
    '0.25',
    '0.4',
    '0.65',
    '1',
    '1.5',
    '2.5',
    '4',
    '6.5',
    '10',
    '15',
    '25',
    '40',
    '65',
    '100',
    '150',
    '250',
    '400',
    '650',
    '1000',
  ];
  const columns = ref([
    {
      children: [
        {
          title: '样本大小',
          colKey: 'batch',
          width: '150px',
          cell: 'batchSlot',
        },
        { title: '样本数', colKey: 'sampleQty' },
        ...sizes.map((size) => ({
          title: size,
          children: [{ title: 'Ac Re', colKey: 'acRe' }],
        })),
      ],
    },
  ]);
  return columns;
};
const columns = ref(generateColumns());

onMounted(() => {
  tableData.value = batch.value.map((batch) => ({
    batch,
    sampleQty: '',
    acRe: '', // 没有初始Ac/Re值
  }));
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
