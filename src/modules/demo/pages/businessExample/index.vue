<template>
  <cmp-container>
    <cmp-card>
      <t-row justify="center" style="margin-bottom: 20px">
        <span style="font-size: large; color: brown">
          参考代码路径：webpc\src\modules\demo\pages\businessExample\index.vue
        </span>
      </t-row>
      <!-- 物料 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business
            v-model="mitemValue"
            :is-multiple="true"
            type="mitem"
            :custom-conditions="mitemCustom"
            @selection-change="onMitemChange"
          ></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="mitemValueSplit" label="物料值" disabled />
        </t-col>
      </t-row>
      <!-- 物料分类 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="mitemCategoryValue" type="mitemCategory"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="mitemCategoryValue" label="物料分类值-ID" disabled />
        </t-col>
      </t-row>
      <!-- 供应商 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="supplierValue" type="supplier"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="supplierValue" label="供应商值" disabled />
        </t-col>
      </t-row>
      <!-- 客户  -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="customerValue" type="customer"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="customerValue" label="客户值" disabled />
        </t-col>
      </t-row>
      <!-- 人员 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px"> <bcmp-select-business v-model="personValue" type="person"></bcmp-select-business></t-col>
        <t-col flex="300px">
          <t-input v-model="personValue" label="人员值" disabled />
        </t-col>
      </t-row>
      <!-- 岗位 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business
            v-model="mitemValue"
            :is-multiple="true"
            type="mitem"
            @selection-change="onMitemChange"
          ></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="mitemValueSplit" label="物料值" disabled />
        </t-col>
      </t-row>
      <t-row :gutter="[10, 10]">
        <t-col flex="300px"> <bcmp-select-business v-model="postValue" type="post"></bcmp-select-business></t-col>
        <t-col flex="300px">
          <t-input v-model="postValue" label="岗位值" disabled />
        </t-col>
      </t-row>
      <!-- 用户 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px"> <bcmp-select-business v-model="userValue" type="user"></bcmp-select-business></t-col>
        <t-col flex="300px">
          <t-input v-model="userValue" label="用户值" disabled />
        </t-col>
      </t-row>
      <!-- 仓库 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="warehouseValue" type="warehouse"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="warehouseValue" label="仓库值" disabled />
        </t-col>
      </t-row>
      <!-- 库区 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="districtValue" type="district"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="districtValue" label="库区值" disabled />
        </t-col>
      </t-row>
      <!-- 库位 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="locationValue" type="location"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="locationValue" label="货位值" disabled />
        </t-col>
      </t-row>
      <!-- 工厂 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="plantValue" component-type="list" type="plant"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="plantValue" label="工厂值" disabled />
        </t-col>
      </t-row>
      <!-- 车间 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="workshopValue" type="workshop"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="workshopValue" label="车间值" disabled />
        </t-col>
      </t-row>
      <!-- 出勤模式 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="attendanceModeValue" type="attendanceMode"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="attendanceModeValue" label="出勤模式值" disabled />
        </t-col>
      </t-row>
      <!-- 班组 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="workgroupValue" type="workgroup"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="workgroupValue" label="班组值" disabled />
        </t-col>
      </t-row>
      <!-- 工单 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px"> <bcmp-select-business v-model="moValue" type="mo"></bcmp-select-business></t-col>
        <t-col flex="300px">
          <t-input v-model="moValue" label="工单值" disabled />
        </t-col>
      </t-row>
      <!-- 排产单 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="moScheduleValue" type="moSchedule"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="moScheduleValue" label="排产单值" disabled />
        </t-col>
      </t-row>
      <!-- 工序 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px"> <bcmp-select-business v-model="processValue" type="process"></bcmp-select-business></t-col>
        <t-col flex="300px">
          <t-input v-model="processValue" label="工序值" disabled />
        </t-col>
      </t-row>
      <!-- 工站 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="workstationValue" type="workstation"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="workstationValue" label="工站值" disabled />
        </t-col>
      </t-row>
      <!-- 工作中心 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px">
          <bcmp-select-business v-model="workcenterValue" type="workcenter"></bcmp-select-business
        ></t-col>
        <t-col flex="300px">
          <t-input v-model="workcenterValue" label="工作中心值" disabled />
        </t-col>
      </t-row>
      <!-- 产线 -->
      <t-row :gutter="[10, 10]">
        <t-col flex="300px"> <bcmp-select-business v-model="lineValue" type="line"></bcmp-select-business></t-col>
        <t-col flex="300px">
          <t-input v-model="lineValue" label="产线值" disabled />
        </t-col>
      </t-row>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import BcmpSelectBusiness from '../../../../components/bcmp-select-business/index.vue';

const mitemValue = ref([
  { value: '2', label: '螺母M10' },
  { value: '1', label: '螺栓M10×1.51' },
]);
const mitemCategoryValue = ref('13');
const personValue = ref('');
const customerValue = ref('');
const supplierValue = ref('');
const postValue = ref('');
const userValue = ref('');
const warehouseValue = ref('');
const districtValue = ref('');
const locationValue = ref('');
const plantValue = ref('');
const attendanceModeValue = ref('');
const workshopValue = ref('');
const workgroupValue = ref('');
const moValue = ref('');
const moScheduleValue = ref('');
const processValue = ref('');
const workstationValue = ref('');
const workcenterValue = ref('');
const lineValue = ref('');

const mitemCustom = [{ field: 'mitemCode', operator: 'LIKE', value: '12' }];
// 使用mitemValue的结果，拼接成字符串，mitemValue结构为[{value:'',label:''}]

const mitemValueSplit = computed(() => mitemValue.value.map((item) => item.value).join(','));

const onMitemChange = (selectRows: any) => {
  console.log(selectRows);
};
onMounted(() => {
  mitemValue.value = [
    { value: '2', label: '螺母M10' },
    { value: '1', label: '螺栓M10×1.51' },
  ];
  mitemCategoryValue.value = '13';
  personValue.value = '';
  customerValue.value = '';
  supplierValue.value = '';
  postValue.value = '';
  userValue.value = '';
  warehouseValue.value = '';
  districtValue.value = '';
  locationValue.value = '';
  plantValue.value = '';
  workshopValue.value = '';
  workgroupValue.value = '';
  moValue.value = '';
  moScheduleValue.value = '';
  processValue.value = '';
  workstationValue.value = '';
  workcenterValue.value = '';
  attendanceModeValue.value = '';
  lineValue.value = '';
});
</script>

<style scoped></style>
