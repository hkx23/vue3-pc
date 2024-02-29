<template>
  <cmp-container>
    <cmp-card title="业务组件示例">
      <t-row justify="center" style="margin-bottom: 20px">
        <span style="font-size: large; color: brown">
          参考代码路径：webpc\src\modules\demo\pages\businessExample\index.vue
        </span>
      </t-row>
      <p style="margin-bottom: 16px">
        <t-radio-group v-model="isMultiple" variant="default-filled">
          <t-radio-button :value="false">单选</t-radio-button>
          <t-radio-button :value="true">多选</t-radio-button>
        </t-radio-group>
      </p>

      <t-space direction="vertical" style="width: 680px">
        <!-- 工厂选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="plantValue" :is-multiple="isMultiple" type="plant"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="plantValue" label="工厂值" disabled />
          </t-col>
        </t-row>
        <!-- 工站选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="stationValue"
              :is-multiple="isMultiple"
              type="workstation"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="stationValue" label="工站值" disabled />
          </t-col>
        </t-row>
        <!-- 物料分类选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="mitemCategoryValue"
              :is-multiple="isMultiple"
              type="mitemCategory"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="mitemCategoryValue" label="物料分类值" disabled />
          </t-col>
        </t-row>
        <!-- 产线选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="lineValue" :is-multiple="isMultiple" type="line"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="lineValue" label="产线类值" disabled />
          </t-col>
        </t-row>
        <!-- 设备选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="equipmentValue"
              :is-multiple="isMultiple"
              type="equipment"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="equipmentValue" label="设备值" disabled />
          </t-col>
        </t-row>
        <!-- 工序选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="processValue" :is-multiple="isMultiple" type="process"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="processValue" label="工序值" disabled />
          </t-col>
        </t-row>
        <!-- 车间选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="workshopValue"
              :is-multiple="isMultiple"
              type="workshop"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="workshopValue" label="车间值" disabled />
          </t-col>
        </t-row>
        <!-- 用户选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="userValue" :is-multiple="isMultiple" type="user"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="userValue" label="用户值" disabled />
          </t-col>
        </t-row>
        <!-- 供应商选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="supplierValue"
              :is-multiple="isMultiple"
              type="supplier"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="supplierValue" label="供应商值" disabled />
          </t-col>
        </t-row>
        <!-- 客户选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="customerValue"
              :is-multiple="isMultiple"
              type="customer"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="customerValue" label="客户值" disabled />
          </t-col>
        </t-row>
        <!-- 物料选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="mitemValue" :is-multiple="isMultiple" type="mitem"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="mitemValue" label="物料值" disabled />
          </t-col>
        </t-row>
      </t-space>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isMultiple = ref(false);
const plantValue = ref();
const stationValue = ref('1739886055668158465');
const mitemCategoryValue = ref();
const lineValue = ref();
const equipmentValue = ref();
const processValue = ref();
const workshopValue = ref();
const userValue = ref();
const supplierValue = ref();
const customerValue = ref();
const mitemValue = ref();
onMounted(() => {});
</script>

<style scoped></style>
