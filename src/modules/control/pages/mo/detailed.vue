<template>
  <div class="detailed-box">
    <!-- from -->
    <t-row>
      <t-col :span="12">
        <span> {{ row.moCode }}</span> <span> {{ row.moClass }}</span> <span> {{ row.status }}</span>
      </t-col>
    </t-row>
    <t-form layout="inline" :data="formData" :show-cancel="true" :show-error-message="false" @submit="submit">
      <t-card :bordered="false">
        <header class="form-item-box">
          <t-form-item label="生产车间">
            {{ row.workshopName }}
          </t-form-item>
          <t-form-item label="工作中心"> {{ row.workCenterName }}</t-form-item>
          <t-form-item label="产品编码"> {{ row.mitemCode }}</t-form-item>
        </header>
        <div class="form-item-box">
          <t-form-item label="产品名称"> {{ row.mitemName }}</t-form-item>
          <t-form-item label="计划数量">
            {{ row.planQty }}
          </t-form-item>
          <t-form-item label="完工数量"> {{ row.completedQty }}</t-form-item>
        </div>
        <div class="form-item-box">
          <t-form-item label="计划开始时间"> {{ row.datetimePlanStart }}</t-form-item>
          <t-form-item label="计划完成时间"> {{ row.datetimePlanEnd }}</t-form-item>
          <t-form-item label="入库仓库"> {{ row.warehouse_code }}</t-form-item>
        </div>
        <div class="form-item-box">
          <t-form-item label="销售订单"> {{ row.so_no }}</t-form-item>
          <t-form-item label="工艺路线版本"> {{ row.routingName }}</t-form-item>
        </div>
        <div class="form-item-box">
          <t-form-item label="备注"> {{ row.memo }}</t-form-item>
        </div>
      </t-card>
    </t-form>
    <t-row justify="space-between">
      <t-col>
        <t-space>
          <t-space direction="horizontal">
            <t-tabs v-for="(item, index) in tabModuleList" :key="index" v-model="selectModule">
              <t-tab-panel :value="item.moduleCode" :label="item.moduleName"> </t-tab-panel>
            </t-tabs>
          </t-space>
        </t-space>
      </t-col>
    </t-row>
    <!-- table表格 -->
    <footer class="detailed-work-center">
      <div class="table-work-header">
        <!-- 表格 -->
        <tm-table
          ref="tableRef"
          v-model:pagination="pageUI"
          row-key="name"
          :table-column="columns"
          :table-data="workData"
          :total="total"
          :loading="loading"
          :selected-row-keys="selectedRowKeys"
          @select-change="rehandleSelectChange"
          @refresh="fetchData"
        >
          <!-- <template #expandedRow="{ row }">
            <div>{{ row }}</div>
          </template> -->
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
          <!-- </t-table> -->
        </tm-table>
        <span class="table-btn"> <t-button theme="default" @click="onHandleCancellation">取消</t-button></span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

// import { api as apicontrol } from '@/api/control';
// import { api as apimain } from '@/api/main';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

// import TmSelectBusiness from '../../../../components/tm-select-business/index.vue';
// 子修改传值
const props = defineProps({
  // 组件展示类型
  row: {
    type: Object,
    default: null,
  },
});
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const total = ref(10);
const Emit = defineEmits(['addedShow']);
const currentrow = ref({}); // 当前行工单信息
const selectedRowKeys = ref([]); // 用于存储选中行的数组
// 页签
const tabModuleList = ref([
  { moduleCode: 'MOBOM', moduleName: '工单BOM' },
  { moduleCode: 'MOLOG', moduleName: '作业日志' },
]);
const selectModule = ref('MOBOM');
const fetchData = async () => {
  setLoading(true);
  setTimeout(() => {
    workData.value = _.cloneDeep(workData.value);
    setLoading(false);
  }, 500);
};
const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'select',
    type: 'multiple',
  },
  {
    colKey: 'sequence',
    title: '顺序号',
    align: 'center',
  },
  {
    colKey: 'Work-center-number',
    title: '工作中心编号',
    align: 'center',
  },
  {
    colKey: 'name',
    title: '名称',
    align: 'center',
  },
  {
    colKey: 'types',
    title: '类型',
    align: 'center',
  },
  {
    colKey: 'location',
    title: '地点',
    align: 'center',
  },
  {
    colKey: 'associated',
    title: '关联设备',
    align: 'center',
  },
  {
    colKey: 'head',
    title: '负责人',
    align: 'center',
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
// const typeData = ref([
//   {
//     id: 1,
//     name: '工作区',
//     show: true,
//   },
//   {
//     id: 2,
//     name: '生产线',
//     show: false,
//   },
//   {
//     id: 3,
//     name: '工段',
//     show: false,
//   },
//   {
//     id: 4,
//     name: '设备',
//     show: false,
//   },
// ]);

// 高亮事件
// const onHandleCur = (id: number) => {
//   typeData.value.forEach((item) => {
//     if (item.id === id) {
//       item.show = true;
//     } else {
//       item.show = false;
//     }
//   });
// };
// checked事件
const rehandleSelectChange = (value: any, ctx: any) => {
  selectedRowKeys.value = value;
  console.log('value:', value, '1', ctx);
};
// 取消
const onHandleCancellation = () => {
  Emit('addedShow', false);
};

// 初始化远程数据
onMounted(() => {
  if (props.row) {
    currentrow.value = props.row;
  }
});

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
      float: right;
      display: block;
      height: 30px;
      margin: 10px;
    }
  }
}
</style>
