<template>
  <div class="detailed-box">
    <!-- from -->
    <t-card class="list-card-container" :bordered="true">
      <t-row>
        <t-col :span="4">
          <t-tag shape="round" size="large">{{ row.moCode }}</t-tag>
        </t-col>
        <t-col :span="1">
          <t-space class="tag-block-light">
            <t-tag shape="round" theme="primary" size="large">{{ row.moClassName }}</t-tag>
          </t-space>
        </t-col>
        <t-col :span="1">
          <t-tag shape="round" size="large">{{ row.statusName }}</t-tag>
        </t-col>
      </t-row>
    </t-card>
    <t-card :bordered="false">
      <div class="form-item-box">
        <t-form-item label="生产车间">
          {{ row.workshopName }}
        </t-form-item>
        <t-form-item label="工作中心"> {{ row.workCenterName }}</t-form-item>
        <t-form-item label="产品编码"> {{ row.mitemCode }}</t-form-item>
      </div>
      <div class="form-item-box">
        <t-form-item label="产品名称"> {{ row.mitemDesc }}</t-form-item>
        <t-form-item label="计划数量">
          {{ row.planQty }}
        </t-form-item>
        <t-form-item label="完工数量"> {{ row.completedQty }}</t-form-item>
      </div>
      <div class="form-item-box">
        <t-form-item label="计划开始时间"> {{ row.datetimePlanStart }}</t-form-item>
        <t-form-item label="计划完成时间"> {{ row.datetimePlanEnd }}</t-form-item>
        <t-form-item label="入库仓库"> {{ row.warehouseName }}</t-form-item>
      </div>
      <div class="form-item-box">
        <t-form-item label="销售订单"> {{ row.soNo }}</t-form-item>
        <t-form-item label="工艺路线版本"> {{ row.routingName }}</t-form-item>
        <t-form-item label=""> </t-form-item>
      </div>
      <div class="form-item-box">
        <t-form-item label="备注"> {{ row.memo }}</t-form-item>
      </div>
    </t-card>
    <t-row justify="space-between">
      <t-col>
        <t-space>
          <t-space direction="horizontal">
            <t-tabs v-for="(item, index) in tabModuleList" :key="index" v-model="selectModule" @change="onChangeTab">
              <t-tab-panel :value="item.moduleCode" :label="item.moduleName"> </t-tab-panel>
            </t-tabs>
          </t-space>
        </t-space>
      </t-col>
    </t-row>
    <!-- table表格 -->
    <footer class="detailed-work-center">
      <div v-show="selectModule == 'MOBOM'" class="table-work-header">
        <cmp-table
          ref="tableBomRef"
          row-key="name"
          :table-column="columnsBom"
          :table-data="moBomData"
          :loading="loadingBom"
          :show-pagination="false"
          @refresh="fetchTableBom"
        >
        </cmp-table>
      </div>

      <div v-show="selectModule == 'MOLOG'" class="table-work-header">
        <cmp-table
          ref="tableLogRef"
          row-key="name"
          :table-column="columnsLog"
          :table-data="moLogData"
          :loading="loadingLog"
          :show-pagination="false"
          @refresh="fetchTableLog"
        >
        </cmp-table>
      </div>
    </footer>

    <!-- <div class="popup-mo-foot-btn">
      <t-button theme="default" @click="onHandleCancellation">取消</t-button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { nextTick, ref, watch } from 'vue';

import { api as apicontrol } from '@/api/control';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
// 子修改传值
const props = defineProps({
  // 组件展示类型
  row: {
    type: Object,
    default: null,
  },
});
const { loading: loadingBom, setLoading: setLoadingBom } = useLoading();
const { loading: loadingLog, setLoading: setLoadingLog } = useLoading();

const Emit = defineEmits(['addedShow']);
const currentrow = ref({}); // 当前行工单信息
// 页签
const tabModuleList = ref([
  { moduleCode: 'MOBOM', moduleName: '工单BOM' },
  { moduleCode: 'MOLOG', moduleName: '作业日志' },
]);
const selectModule = ref('MOLOG');
// 工单BOM信息
const moBomData = ref([]);
// 工单日志信息
const moLogData = ref([]);
// 查询工单BOM
const fetchTableBom = async () => {
  try {
    setLoadingBom(true);
    const row = currentrow.value as any;
    if (row) {
      const { id } = row;
      const res = (await apicontrol.moBom.getMoBomListByMoCode({
        moId: id,
      })) as any;
      moBomData.value = res.list;
    }
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoadingBom(false);
  }
};

// 查询工单LOG
const fetchTableLog = async () => {
  try {
    setLoadingLog(true);
    const row = currentrow.value as any;
    if (row) {
      const { id } = row;
      const res = (await apicontrol.moLog.getMoLogListByMoCode({
        moId: id,
      })) as any;
      moLogData.value = res.list;
    }
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoadingLog(false);
  }
};
const columnsBom: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
  },
  {
    colKey: 'mitemCode',
    title: '组件编码',
    align: 'center',
  },
  {
    colKey: 'mitemDesc',
    title: '组件名称',
    align: 'center',
  },
  {
    colKey: 'bomVersion',
    title: 'BOM版本',
    align: 'center',
    width: 120,
  },
  {
    colKey: 'numeratorQty',
    title: '用量分子',
    align: 'center',
  },
  {
    colKey: 'denomainatorQty',
    title: '用量分母',
    align: 'center',
  },
  {
    colKey: 'uom',
    title: '单位',
    align: 'center',
  },
  {
    colKey: 'moRequestQty',
    title: '需求数量',
    align: 'center',
  },
  {
    colKey: 'pickQty',
    title: '实发数量',
    align: 'center',
  },
];
const columnsLog: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: '序号',
    align: 'center',
  },
  {
    colKey: 'timeCreate',
    title: '作业时间',
    align: 'center',
  },
  {
    colKey: 'logContent',
    title: '作业内容',
    align: 'center',
  },
  {
    colKey: 'displayName',
    title: '作业人员',
    align: 'center',
  },
  {
    colKey: 'memo',
    title: '说明',
    align: 'center',
  },
];
// 取消
const onHandleCancellation = () => {
  Emit('addedShow', false);
};

// 切换模块
const onChangeTab = () => {
  if (selectModule.value === 'MOBOM') {
    fetchTableBom();
  }
  if (selectModule.value === 'MOLOG') {
    fetchTableLog();
  }
};

watch(
  () => props.row,
  (value) => {
    console.log('🚀 ~ file: detailed.vue:255 ~ value:', value);
    nextTick(() => {
      currentrow.value = value;
      selectModule.value = 'MOBOM';
      fetchTableBom();
      fetchTableLog();
    });
  },
  { deep: true },
);
defineExpose({
  onHandleCancellation,
});
</script>

<style lang="less" scoped>
.t-card {
  border: 1px solid var(--td-border-level-2-color) !important;
  margin-bottom: 24px;
}

.detailed-box {
  // padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingLR-xl);

  .popup-mo-foot-btn {
    display: block;
    height: 30px;
    margin-top: 20px;
    text-align: right;
  }
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
  margin: 0;
  display: flex;

  .t-form__item {
    display: flex;
    margin: 0;
    flex: 1;
  }
}

// .tag-block-light {
//   /deep/ .t-tag--primary {
//     background-color: #548df3;
//   }
// }

.form-checkbox {
  margin: 10px 100px;
}
</style>
