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
        <!--  人员选择 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="personValue" :is-multiple="isMultiple" type="person"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="personValue" label="人员" disabled />
          </t-col>
        </t-row>

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
        <!-- 出勤模式 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="attendanceModeValue"
              :is-multiple="isMultiple"
              type="attendanceMode"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="attendanceModeValue" label="出勤模式值" disabled />
          </t-col>
        </t-row>

        <!-- 业务类型 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="businessCategoryValue"
              :is-multiple="isMultiple"
              type="businessCategory"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="businessCategoryValue" label="业务类型值" disabled />
          </t-col>
        </t-row>
        <!-- 缺陷代码 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="defectCodeValue"
              :is-multiple="isMultiple"
              type="defectCode"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="defectCodeValue" label="缺陷代码值" disabled />
          </t-col>
        </t-row>
        <!-- 仓库 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="warehouseValue"
              :is-multiple="isMultiple"
              type="warehouse"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="warehouseValue" label="仓库值" disabled />
          </t-col>
        </t-row>
        <!-- 仓库 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="warehouseAuthValue"
              :is-multiple="isMultiple"
              type="warehouseAuth"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="warehouseAuthValue" label="仓库值-带权限" disabled />
          </t-col>
        </t-row>
        <!-- 库区 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="districtValue"
              :is-multiple="isMultiple"
              type="district"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="districtValue" label="库区码值" disabled />
          </t-col>
        </t-row>
        <!-- 库位 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="locationValue"
              :is-multiple="isMultiple"
              type="location"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="locationValue" label="库位值" disabled />
          </t-col>
        </t-row>
        <!-- 线边仓 -->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="lineWarehouseValue"
              :is-multiple="isMultiple"
              type="lineWarehouse"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="lineWarehouseValue" label="线边仓值" disabled />
          </t-col>
        </t-row>
        <!-- 扩展属性分类-->
        <!-- <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="objectPropertyCategoryValue"
              :is-multiple="isMultiple"
              type="objectPropertyCategory"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="objectPropertyCategoryValue" label="扩展属性分类值" disabled />
          </t-col>
        </t-row> -->
        <!-- 岗位-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="postValue" :is-multiple="isMultiple" type="post"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="postValue" label="岗位值" disabled />
          </t-col>
        </t-row>
        <!-- 工序值-return-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="processReturnValue"
              :is-multiple="isMultiple"
              type="processReturn"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="processReturnValue" label="工序值-return" disabled />
          </t-col>
        </t-row>
        <!-- 角色-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="roleValue" :is-multiple="isMultiple" type="role"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="roleValue" label="角色值" disabled />
          </t-col>
        </t-row>
        <!-- 工艺路线工序-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="routingProcessValue"
              :is-multiple="isMultiple"
              type="routingProcess"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="routingProcessValue" label="工艺路线工序值" disabled />
          </t-col>
        </t-row>
        <!-- 系统字典-状态-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="stateValue" :is-multiple="isMultiple" type="state"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="stateValue" label="状态值" disabled />
          </t-col>
        </t-row>
        <!-- 计量单位-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="uomValue" :is-multiple="isMultiple" type="uom"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="uomValue" label="计量单位值" disabled />
          </t-col>
        </t-row>
        <!-- 工作中心-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="workcenterValue"
              :is-multiple="isMultiple"
              type="workcenter"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="workcenterValue" label="工作中心值" disabled />
          </t-col>
        </t-row>
        <!-- 班组-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="workgroupValue"
              :is-multiple="isMultiple"
              type="workgroup"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="workgroupValue" label="班组值" disabled />
          </t-col>
        </t-row>
        <!-- 工站-带权限-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="workstationAuthValue"
              :is-multiple="isMultiple"
              type="workstationAuth"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="workstationAuthValue" label="工站权限值" disabled />
          </t-col>
        </t-row>
        <!-- 工单-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="moValue" :is-multiple="isMultiple" type="mo"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="moValue" label="工单值" disabled />
          </t-col>
        </t-row>
        <!-- 排产单-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business
              v-model="moScheduleValue"
              :is-multiple="isMultiple"
              type="moSchedule"
            ></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="moScheduleValue" label="排产单值" disabled />
          </t-col>
        </t-row>

        <!-- 工艺路线-->
        <t-row :gutter="[10, 10]">
          <t-col flex="300px">
            <bcmp-select-business v-model="routingValue" :is-multiple="isMultiple" type="routing"></bcmp-select-business
          ></t-col>
          <t-col flex="300px">
            <t-input v-model="routingValue" label="工艺路线值" disabled />
          </t-col>
        </t-row>
      </t-space>
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const isMultiple = ref(true);

const personValue = ref();
const plantValue = ref('1744167886127157249,1725461564969635842');
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
const attendanceModeValue = ref();
const businessCategoryValue = ref();
const defectCodeValue = ref();
const warehouseValue = ref();
const warehouseAuthValue = ref();
const districtValue = ref();
const locationValue = ref();
const lineWarehouseValue = ref();
// const objectPropertyCategoryValue = ref();
const postValue = ref();
const processReturnValue = ref();
const roleValue = ref();
const routingProcessValue = ref();
const stateValue = ref();
const uomValue = ref();
const workcenterValue = ref();
const workgroupValue = ref();
const workstationAuthValue = ref();

const routingValue = ref();
const moValue = ref();
const moScheduleValue = ref();

onMounted(() => {});
</script>

<style scoped></style>
