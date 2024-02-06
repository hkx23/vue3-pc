<!-- 国标抽样方案 -->
<template>
  <cmp-container :full="true">
    <cmp-card ref="tableCardRef" :span="12">
      <!-- 查询条件 -->
      <t-form>
        <t-row :gutter="[32, 12]" style="margin-top: 10px">
          <t-form-item label="检验水平">
            <!-- @select-change="onSelectChange"  todo-->
            <t-select v-model="TestLevel" clearable>
              <t-option
                v-for="shift in TestLevelOption"
                :key="shift.value"
                :label="shift.label"
                :value="shift.value"
              ></t-option>
            </t-select>
          </t-form-item>
          <t-form-item label="严格度">
            <t-select v-model="Rigidity" clearable>
              <t-option
                v-for="shift in RigidityOption"
                :key="shift.value"
                :label="shift.label"
                :value="shift.value"
              ></t-option>
            </t-select>
          </t-form-item>
        </t-row>
      </t-form>
      <cmp-table
        :data="tableData"
        :columns="columns"
        :bordered="true"
        :show-pagination="false"
        :hover="true"
        :fixed-height="true"
      >
        <template #range="{ row }">
          <div v-for="(item, index) in row.range" :key="index" style="margin-bottom: 6px">{{ item }}</div>
        </template>
        <template #title>
          {{ '国标抽样方案' }}
        </template>
      </cmp-table>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { PrimaryTableCol } from 'tdesign-vue-next';
import { onMounted, ref, watch } from 'vue';

import { api } from '@/api/main';

const TestLevel = ref([]);
const Rigidity = ref([]);

onMounted(async () => {
  getTestLevel();
  getRigidity();
});

const TestLevelOption = ref([]); // 检验水平
// 获取 数据字典 检验水平
const getTestLevel = async () => {
  try {
    const res = await api.param.getListByGroupCode({
      parmGroupCode: 'Q_INSPECTION_STD_LEVEL',
    });
    TestLevelOption.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};

/** 获取 数据字典 严格度
 *  严格度  取 value 调用接口
 */
const RigidityOption = ref([]);
const getRigidity = async () => {
  try {
    const res = await api.param.getListByGroupCode({
      parmGroupCode: 'Q_INSPECTION_STRINGENCY',
    });
    RigidityOption.value = res.map((status) => ({
      label: status.label,
      value: status.value,
    }));
  } catch (e) {
    console.error(e);
  }
};

// 左侧数据结构
const tableData = ref([
  {
    range: ['2~8'],
    sampleNumber: '235',
  },
  {
    range: ['9~15'],
    sampleNumber: '235',
  },
  {
    range: ['16~25'],
    sampleNumber: '235',
  },
  {
    range: ['26~50'],
    sampleNumber: '81320',
  },
  {
    range: ['51~90'],
    sampleNumber: '81320',
  },
  {
    range: ['91~150'],
    sampleNumber: '81320',
  },
  {
    range: ['151~280'],
    sampleNumber: '81320',
  },
  {
    range: ['281~500'],
    sampleNumber: '81320',
  },
  {
    range: ['501~1200'],
    sampleNumber: '81320',
  },
  {
    range: ['1201~3200'],
    sampleNumber: '81320',
  },
  {
    range: ['3201~10000'],
    sampleNumber: '81320',
  },
  {
    range: ['10001~35000'],
    sampleNumber: '81320',
  },

  {
    range: ['35001~150000'],
    sampleNumber: '81320',
  },
  {
    range: ['150001~500000'],
    sampleNumber: '81320',
  },
  {
    range: ['500001及基以上'],
    sampleNumber: '81320',
  },
  {
    range: [''],
    sampleNumber: '81320',
  },
]);

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
  const columns: PrimaryTableCol<TableRowData>[] = [
    {
      // title: '',
      children: [
        {
          title: '样本大小',
          colKey: 'range',
          width: '150px',
        },
        { title: '样本数', colKey: 'sampleNumber' },
        ...sizes.map((size) => ({
          title: size,
          children: [{ title: 'Ac Re', colKey: `${size}.Ac .Re` }],
        })),
      ],
    },
  ];
  return columns;
};
const columns = ref(generateColumns());

interface TableRowData {
  range: string[];
  sampleNumber: string;
}

// Method to fetch updated table data
const updateTableData = async () => {
  // Your API call logic here, using TestLevel.value and Rigidity.value
  // For demonstration, let's say we're fetching data based on these selections
  try {
    // const updatedData = await api.fetchUpdatedData({
    //   testLevel: TestLevel.value,
    //   rigidity: Rigidity.value,
    // });
    // tableData.value = updatedData; // Assuming the API returns the data in the correct format
  } catch (error) {
    console.error('Error fetching updated table data:', error);
  }
};

// Watchers for TestLevel and Rigidity to update table data
watch(TestLevel, updateTableData);
watch(Rigidity, updateTableData);

// const onSelectChange = (value: string, option: any) => {
//   // 处理选择变更的逻辑
// };
</script>

<style scoped></style>
