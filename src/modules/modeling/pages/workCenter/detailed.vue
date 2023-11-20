<template>
  <div class="detailed-box">
    <!-- from -->
    <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
      <t-card :bordered="false">
        <header class="form-item-box">
          <t-form-item label="工作中心编号">
            <t-input v-model="formData.workNumber" />
          </t-form-item>
          <t-form-item label="所属车间"> <t-select v-model="formData.workShop" /></t-form-item>
          <t-form-item label="地点">
            <t-input v-model="formData.location" style="width: 200px" />
          </t-form-item>
        </header>
        <div class="form-item-box">
          <t-form-item label="工作中心名称">
            <t-input v-model="formData.workName" />
          </t-form-item>
          <t-form-item label="负责人">
            <t-input v-model="formData.head" style="width: 180px" />
          </t-form-item>
        </div>
        <t-form-item label="父级">
          <t-select v-model="formData.parent" />
        </t-form-item>
        <footer class="form-item-box">
          <t-form-item label="类型">
            <ul class="type-box">
              <li
                v-for="item in typeData"
                :key="item.id"
                :class="item.show ? 'li-cur' : ''"
                @click="onHandleCur(item.id)"
              >
                {{ item.name }}
              </li>
            </ul>
          </t-form-item>
          <t-form-item label="关联设备">
            <t-select></t-select>
          </t-form-item>
        </footer>
        <span class="form-checkbox">
          <t-checkbox>启用</t-checkbox>
        </span>
        <div style="margin: 10px 100px">
          <t-button theme="default">添加</t-button>
          <t-button theme="default">删除</t-button>
        </div>
      </t-card>
    </t-form>
    <!-- table表格 -->
    <footer class="detailed-work-center">
      <span class="work-header">子工作中心</span>
      <div class="table-work-header">
        <t-table
          :active-row-type="activeRow ? 'single' : undefined"
          select-on-row-click
          row-key="name"
          vertical-align="middle"
          :columns="columns"
          :data="workData"
          lazy-load
          @select-change="rehandleSelectChange"
        >
          <template #expandedRow>
            <div>1</div>
          </template>
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
          <template #associated>
            <t-link theme="primary" underline>PE30332705-2 </t-link>
          </template>
        </t-table>
        <span class="table-btn">
          <t-button @click="onHandleSave">保存</t-button> <t-button theme="default">取消</t-button></span
        >
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// const expandedRow = (h, { row }) => (
//   // <div class="more-detail">
//   //   <p class="title">
//   //     <b>申请人:</b>
//   //   </p>
//   //   <p class="content">{row.applicant}</p>
//   //   <br />
//   //   <p class="title">
//   //     <b>邮箱地址:</b>
//   //   </p>
//   //   <p class="content">{row.detail.email}</p>
//   //   <br />
//   //   <p class="title">
//   //     <b>签署方式:</b>
//   //   </p>
//   //   <p class="content">{row.channel}</p>
//   // </div>
// );
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { ref } from 'vue';
// const curClass = ref(false);
const Emit = defineEmits(['addedShow']);
const selectedRowKeys = ref([]); // 用于存储选中行的数组
// const expandedRow = () => {};
// const expandIcon = ref(true);
// const expandOnRowClick = ref(true);
// const rehandleExpandChange = (value: string[], params: any) => {
//   expandedRowKeys.value = value;
//   console.log('rehandleExpandChange', value, params);
// };

const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'select',
    type: 'multiple',
  },
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
];
const workData = ref([
  {
    name: ['你好2'],
    types: '11',
    Workshop: 'Aag',
    location: '唱不上',
    associated: '-',
    head: '李四',
  },
  {
    name: ['你好1'],
    types: '11',
    Workshop: 'Aag',
    location: '唱不上',
    associated: '-',
    head: '李四',
  },
  {
    name: ['你好3'],
    types: '11',
    Workshop: 'Aag',
    location: '唱不上',
    associated: '-',
    head: '李四',
  },
]);
const formData = ref({
  workNumber: '', // 工作中心编号
  workName: '', // 工作中心名称
  location: '', // 地点
  workShop: '', // 所属车间
  head: '', // 负责人
  parent: '', // 父级
});
const typeData = ref([
  {
    id: 1,
    name: '工作区',
    show: true,
  },
  {
    id: 2,
    name: '生产线',
    show: false,
  },
  {
    id: 3,
    name: '工段',
    show: false,
  },
  {
    id: 4,
    name: '设备',
    show: false,
  },
]);
// const onHandelList = (item) => {
//   if (item === 'Item 2') {
//     // 返回指定的CSS类名，用于高亮显示
//     return 'li-cur';
//   }
//   // 返回默认的CSS类名，用于普通显示
//   return '';
// };
const activeRow = ref(false);
const onHandleCur = (id: number) => {
  typeData.value.forEach((item) => {
    if (item.id === id) {
      item.show = true;
    } else {
      item.show = false;
    }
  });
};
// checked事件
const rehandleSelectChange = (value: any, ctx: any) => {
  selectedRowKeys.value = value;
  console.log('value:', value, '1', ctx);
};
const onHandleSave = () => {
  Emit('addedShow', false);
};
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
    cursor: pointer;
    width: 47px;
    height: 28px;
    line-height: 28px;
    border: 1px solid #eee;
  }

  li:first-child {
    border-radius: 5px 0 0 5px;
  }

  li:last-child {
    border-radius: 0 5px 5px 0;
  }

  .li-cur {
    background: #0894fa;
    color: #fff;
  }
}
// 表单盒子边距
.form-item-box {
  margin: 10px 0;
}

.form-checkbox {
  margin: 10px 100px;
}
// 子工作中心
.detailed-work-center {
  display: flex;

  .work-header {
    margin: 20px;
  }

  .table-work-header {
    flex: 1;
    // 表格按钮
    .table-btn {
      display: block;
      height: 30px;
      margin: 10px;
    }
  }
}
</style>
