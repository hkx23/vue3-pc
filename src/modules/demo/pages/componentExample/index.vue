<template>
  <t-row justify="center" style="margin-bottom: 20px">
    <span style="font-size: large; color: brown"
      >参考代码路径：webpc\src\modules\demo\pages\componentExample\index.vue</span
    >
  </t-row>
  <t-row justify="space-around">
    <!-- 物料 -->
    <div class="left-operation-container">
      <t-select-business
        v-model="mitemValue"
        :is-multiple="true"
        type="mitem"
        @selection-change="onMitemChange"
      ></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="mitemValueSplit" label="物料值" />
    </div>
  </t-row>
  <!-- 物料分类 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="mitemCategoryValue" type="mitemCategory"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="mitemCategoryValue" label="物料分类值" />
    </div>
  </t-row>
  <!-- 供应商 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="supplierValue" type="supplier"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="supplierValue" label="供应商值" />
    </div>
  </t-row>
  <!-- 客户  -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="customerValue" type="customer"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="customerValue" label="客户值" />
    </div>
  </t-row>
  <!-- 人员 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="personValue" type="person"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="personValue" label="人员值" />
    </div>
  </t-row>
  <!-- 岗位 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="postValue" type="post"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="postValue" label="岗位值" />
    </div>
  </t-row>
  <!-- 用户 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="userValue" type="user"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="userValue" label="用户值" />
    </div>
  </t-row>
  <!-- 仓库 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="warehouseValue" type="warehouse"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="warehouseValue" label="仓库值" />
    </div>
  </t-row>
  <!-- 库区 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="districtValue" type="district"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="districtValue" label="库区值" />
    </div>
  </t-row>
  <!-- 库位 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="locationValue" type="location"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="locationValue" label="货位值" />
    </div>
  </t-row>
  <!-- 工厂 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="plantValue" type="plant"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="plantValue" label="工厂值" />
    </div>
  </t-row>
  <!-- 车间 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="workshopValue" type="workshop"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="workshopValue" label="车间值" />
    </div>
  </t-row>
  <!-- 出勤模式 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="attendanceModeValue" type="attendanceMode"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="attendanceModeValue" label="出勤模式值" />
    </div>
  </t-row>
  <!-- 班组 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="workgroupValue" type="workgroup"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="workgroupValue" label="班组值" />
    </div>
  </t-row>
  <!-- 工单 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="moValue" type="mo"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="moValue" label="工单值" />
    </div>
  </t-row>
  <!-- 排产单 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="moScheduleValue" type="moSchedule"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="moScheduleValue" label="排产单值" />
    </div>
  </t-row>
  <!-- 工序 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="processValue" type="process"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="processValue" label="工序值" />
    </div>
  </t-row>
  <!-- 工站 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="workstationValue" type="workstation"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="workstationValue" label="工站值" />
    </div>
  </t-row>
  <!-- 工作中心 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="workcenterValue" type="workcenter"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="workcenterValue" label="工作中心值" />
    </div>
  </t-row>
  <!-- 产线 -->
  <t-row justify="space-around">
    <div class="left-operation-container">
      <t-select-business v-model="lineValue" type="line"></t-select-business>
    </div>
    <div class="search-input">
      <t-input v-model="lineValue" label="产线值" />
    </div>
  </t-row>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import TSelectBusiness from '../../../../components/select-business/index.vue';

const mitemValue = ref([]);
const mitemCategoryValue = ref('');
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
// 使用mitemValue的结果，拼接成字符串，mitemValue结构为[{value:'',label:''}]

const mitemValueSplit = computed(() => mitemValue.value.map((item) => item.value).join(','));

const onMitemChange = (selectRows: any) => {
  console.log(selectRows);
};
onMounted(() => {
  mitemValue.value = [];
  mitemCategoryValue.value = '';
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
