<template>
  <div class="detailed-box">
    <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
      <t-card :bordered="false">
        <t-form-item label="工作中心编号">
          <t-input v-model="formData.mitemCode" disabled />
        </t-form-item>
        <t-form-item label="所属车间"> <t-select v-model="formData.mitemName" /></t-form-item>
        <t-form-item label="地点">
          <t-input v-model="formData.mitemCode" disabled />
        </t-form-item>
        <t-form-item label="工作中心名称">
          <t-input v-model="formData.mitemCode" disabled />
        </t-form-item>
        <t-form-item label="负责人">
          <t-input v-model="formData.mitemCode" disabled />
        </t-form-item>
        <t-form-item label="父类">
          <t-select />
        </t-form-item>
        <t-form-item label="类型">
          <ul class="type-box">
            <li v-for="item in typeData" :key="item.id" class="li-cur">{{ item.name }}</li>
          </ul>
        </t-form-item>
        <t-form-item label="关联设备">
          <t-select></t-select>
        </t-form-item>
        <div>
          <t-button>添加</t-button>
          <t-button>删除</t-button>
        </div>
      </t-card>
    </t-form>

    <t-table row-key="index" vertical-align="middle" :columns="columns" :data="workData" lazy-load>
      <template #sequence>
        <div>1</div>
      </template>
      <template #Work-center-number>
        <div>
          <t-icon name="chevron-right"></t-icon>
          <t-link theme="primary" underline> 0752-A01-WCO1 </t-link>
        </div>
      </template>
      <template #parentWorkCenter>
        <div>11</div>
      </template>
      <template #edit>
        <t-link theme="primary" underline> 编辑 </t-link>
      </template>
    </t-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const columns = ref([
  // {
  //   colKey: 'select',
  //   type: 'multiple',
  // },
  {
    colKey: 'sequence',
    title: '顺序号',
  },
  {
    colKey: 'Work-center-number',
    title: '工作中心编号',
  },
  {
    colKey: 'name',
    title: '名称',
  },
  {
    colKey: 'types',
    title: '类型',
  },
  {
    colKey: 'location',
    title: '地点',
  },
  {
    colKey: 'associated',
    title: '关联设备',
  },
  {
    colKey: 'head',
    title: '负责人',
  },
]);
const workData = ref([
  {
    name: ['你好'],
    types: '11',
    Workshop: 'Aag',
    location: '唱不上',
    associated: '-',
    head: '李四',
  },
]);
const formData = ref({
  id: -1,
  mitemCode: '',
  mitemName: '',
  mitemDesc: '',
  mmitemCategoryId: '',
  mmitemCategoryCode: '',
  mmitemCategoryName: '',
  uom: '',
  supplyCategory: '',
  isProduct: 0, // 是否成品
  isProductChecked: false,
  isInProcess: 0, // 是否半成品
  isInProcessChecked: false,
  isRaw: 0, // 是否原材料
  isRawChecked: false,
  wWarehouseId: '', // 完工默认仓库
  wWarehouseCode: '',
  wWarehouseName: '',
  shelfLifeDays: '', // 保质期天数
  isBatchNo: '', // 是否启用批次
});
const typeData = ref([
  {
    id: 1,
    name: '工作区',
  },
  {
    id: 2,
    name: '生产线',
  },
  {
    id: 3,
    name: '工段',
  },
  {
    id: 4,
    name: '设备',
  },
]);
const submit = () => {
  console.log(1);
};
</script>

<style lang="less" scoped>
.detailed-box {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);
}

.type-box {
  display: flex;
  text-align: center;
  align-items: center;

  li {
    width: 47px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #000;
  }

  .li-cur {
    background: #6bb2ff;
    color: #fff;
  }
}
</style>
