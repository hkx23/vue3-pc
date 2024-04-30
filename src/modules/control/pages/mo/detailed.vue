<template>
  <div class="detailed-box">
    <!-- from -->
    <t-card class="customer-card">
      <t-row>
        <t-col :span="3" class="button-mo">
          <t-tag shape="round" size="large">{{ row.moCode }}</t-tag>
        </t-col>
        <t-col :span="2">
          <t-space class="col-moClass">
            <t-tag shape="round" size="large" class="button-moClass">{{ row.moClassName }}</t-tag>
          </t-space>
        </t-col>
        <t-col :span="2">
          <t-tag shape="round" size="large" class="button-statusName">{{ row.statusName }}</t-tag>
        </t-col>
      </t-row>
    </t-card>
    <t-card :bordered="false" class="customer-card">
      <t-descriptions :column="3" bordered>
        <t-descriptions-item label="生产车间"> {{ row.workshopName }}</t-descriptions-item>
        <t-descriptions-item label="工作中心">{{ row.workCenterName }}</t-descriptions-item>
        <t-descriptions-item label="产品编码">{{ row.mitemCode }}</t-descriptions-item>
        <t-descriptions-item label="产品名称">{{ row.mitemDesc }}</t-descriptions-item>
        <t-descriptions-item label="计划数量">{{ row.planQty }}</t-descriptions-item>
        <t-descriptions-item label="完工数量">{{ row.completedQty }}</t-descriptions-item>
        <t-descriptions-item label="计划开始时间">{{ row.datetimePlanStart }}</t-descriptions-item>
        <t-descriptions-item label="计划完成时间">{{ row.datetimePlanEnd }}</t-descriptions-item>
        <t-descriptions-item label="入库仓库">{{ row.warehouseName }}</t-descriptions-item>
        <t-descriptions-item label="销售订单">{{ row.soNo }}</t-descriptions-item>
        <t-descriptions-item label="工艺路线版本">{{ row.routingName }}</t-descriptions-item>
        <t-descriptions-item label="备注">{{ row.memo }}</t-descriptions-item>
      </t-descriptions>
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
          row-key="id"
          :table-column="columnsBom"
          :table-data="moBomData"
          :loading="loadingBom"
          :show-toolbar="false"
          :show-pagination="false"
          @refresh="fetchTableBom"
        >
        </cmp-table>
      </div>

      <div v-show="selectModule == 'MOLOG'" class="table-work-header">
        <cmp-table
          ref="tableLogRef"
          row-key="id"
          :table-column="columnsLog"
          :table-data="moLogData"
          :loading="loadingLog"
          :show-toolbar="false"
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

.form-checkbox {
  margin: 10px 100px;
}

:deep(.t-tag.t-tag--round) {
  border-radius: 4px !important;
}

.button-mo {
  padding-left: 10px !important;
}

.button-moClass {
  background-color: #ebeefd;
}

.col-moClass {
  margin-left: 110px;
}

.button-statusName {
  margin-left: 35px;
}

.customer-card {
  margin-bottom: 8px;

  :deep(.t-descriptions__body) {
    width: 100%;
  }

  :deep(.t-card__body) {
    padding: 8px 0;
  }
}
</style>
