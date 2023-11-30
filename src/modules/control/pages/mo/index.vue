<template>
  <div>
    <!-- 子from BOM -->
    <t-dialog
      v-model:visible="detailedShow"
      :row="currentrow"
      header="工单BOM"
      :cancel-btn="null"
      :confirm-btn="null"
      width="90%"
    >
      <detailed :row="currentrow" @added-show="onHandleBomShow"></detailed>
    </t-dialog>

    <!-- 子from routing -->
    <t-dialog
      v-model:visible="routingUpdateShow"
      :row="currentrow"
      header="工艺路线"
      :cancel-btn="null"
      :confirm-btn="null"
      width="90%"
    >
      <routingUpdate
        :row="currentrow"
        @routing-show="onHandleRoutingShow"
        @refresh-table="onHandleTableReresh"
      ></routingUpdate>
    </t-dialog>
    <!-- 头部 -->
    <t-card class="list-card-container" :bordered="true">
      <t-row justify="space-between">
        <t-col :span="3">
          <t-select
            v-model="queryCondition.moClass"
            :auto-width="false"
            label="工单类别："
            placeholder="请选择工单类别"
            :options="moClassOption"
            clearable
          >
          </t-select>
        </t-col>
        <t-col :span="3"
          ><t-input v-model="queryCondition.moCode" label="工单号：" placeholder="请输入工单号"></t-input>
        </t-col>
        <t-col :span="3">
          <tm-select-business
            v-model="queryCondition.mitemCategroyCode"
            type="mitemCategory"
            value-field="categoryCode"
            :show-title="true"
            title="产品类别："
            placeholder="请选择产品类别"
          ></tm-select-business>
        </t-col>
      </t-row>
      <t-row justify="space-between">
        <t-col :span="3">
          <tm-select-business
            v-model="queryCondition.mitemCode"
            title="产品编码："
            type="mitem"
            value-field="mitemCode"
            :show-title="true"
            placeholder="请选择产品编码"
          ></tm-select-business>
        </t-col>
        <t-col :span="3">
          <tm-select-business
            v-model="queryCondition.workshopCode"
            type="workshop"
            value-field="orgCode"
            :show-title="true"
            title="车间："
          ></tm-select-business>
        </t-col>
        <t-col :span="3">
          <tm-select-business
            v-model="queryCondition.workCenterCode"
            type="workcenter"
            value-field="wcCode"
            :show-title="true"
            title="工作中心："
            placeholder="请选择工作中心"
          ></tm-select-business>
        </t-col>
      </t-row>
      <t-row justify="space-between">
        <t-col :span="3">
          <tm-select-business
            v-model="queryCondition.rootingCode"
            type="routing"
            value-field="routingCode"
            :show-title="true"
            title="工艺路线："
            placeholder="请选择工艺路线"
          ></tm-select-business>
        </t-col>
        <t-col :span="7" class="range-time-query">
          <span>计划开始时间：</span>
          <t-space direction="vertical" style="width: 70%">
            <t-date-range-picker v-model="datePlanRange" />
          </t-space>
        </t-col>
        <t-col :span="2"> </t-col>
      </t-row>
      <t-row justify="space-between">
        <t-col :span="10">
          <span>工单状态：</span>
          <!-- 复选框框组受控模式 -->
          <t-checkbox-group
            v-model="selectMoStatus"
            class="check-box-conditon"
            :options="moStatusOption"
            @change="onChangeMoStatus"
          />
        </t-col>

        <t-col :span="2">
          <div style="display: flex; justify-content: flex-end">
            <t-button variant="base" @click="onHandleQuery">查询</t-button>
            <t-button theme="default" variant="base" @click="onHandleResetting">重置</t-button>
          </div>
        </t-col>
      </t-row>
      <tm-table
        v-model:pagination="pageUI"
        row-key="index"
        :loading="loading"
        :table-column="columns"
        :table-data="moData"
        :total="dataTotal"
        :header-affixed-top="true"
        @refresh="fetchTable"
      >
        <template #moCode="{ row }">
          <a
            style="color: #4d6af9"
            @click="
              {
                onHandelDetail(row);
              }
            "
          >
            {{ row.moCode }}
          </a>
        </template>
        <template #op="{ row }">
          <t-icon
            v-if="row.status == 'Download' || row.status == 'Scheduled' || row.status == 'Ready'"
            name="edit"
            @click="onEditRoutingClick(row)"
          />
        </template>
      </tm-table>
    </t-card>
  </div>
</template>

<script setup lang="tsx">
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';

import { api as apicontrol } from '@/api/control';
import { api as apimain } from '@/api/main';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import TmSelectBusiness from '../../../../components/tm-select-business/index.vue';
import detailed from './detailed.vue';
import routingUpdate from './routingUpdate.vue';

const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const currentrow = ref({}); // 当前行工单信息
// 控制
const keyword = ref(''); // 控制模糊搜索
// const formVisible = ref(false); // 控制弹窗显示
const selectMoStatus = ref([]); // 选中的工单状态
const datePlanRange = ref([dayjs().format('YYYY-MM-DD'), dayjs().subtract(-31, 'day').format('YYYY-MM-DD')]); // 初始化日期控件
// 工单类型下拉初始数据
const moClassOption = ref([]);
// 工单状态下拉初始数据
const moStatusOption = ref([]);
// 查询初始化
const queryCondition = ref({
  moCode: '',
  moClass: '',
  mitemCategroyCode: '',
  mitemCode: '',
  status: '',
  datetimePlanStart: '',
  datetimePlanEnd: '',
  workshopCode: '',
  workCenterCode: '',
  rootingCode: '',
});
const detailedShow = ref(false); // 控制工单BOM显示隐藏
const routingUpdateShow = ref(false); // 控制工单工艺路线显示隐藏

// 表格th数据
const columns = ref([
  {
    colKey: 'moCode',
    title: '工单号',
    width: '100',
  },
  { colKey: 'moClassName', title: '工单类型' },
  {
    colKey: 'statusName',
    title: '工单状态',
  },
  { colKey: 'mitemCode', title: '产品编码', width: '120' },
  { colKey: 'mitemDesc', title: '产品描述', width: '150' },
  { colKey: 'planQty', title: '计划数量' },
  { colKey: 'completedQty', title: '完成数量' },
  { colKey: 'uomName', title: '单位' },
  { colKey: 'workshopName', title: '车间' },
  { colKey: 'workCenterName', title: '工作中心' },
  { colKey: 'routingName', title: '工艺路线' },
  { colKey: 'datetimePlanStart', title: '计划开始时间', width: '150' },
  { colKey: 'datetimePlanEnd', title: '计划完成时间', width: '150' },
  { colKey: 'datetimeActualStart', title: '实际开始时间', width: '150' },
  { colKey: 'datetimeActualEnd', title: '实际完成时间', width: '150' },
  { colKey: 'datetimeMoClose', title: '工单关闭时间', width: '150' },
  { colKey: 'op', title: '操作', width: '100', fixed: 'right' },
]);
// 工单信息
const moData = ref([]);
const dataTotal = ref(0);
const fetchTable = async () => {
  try {
    setLoading(true);
    if (datePlanRange.value) {
      if (datePlanRange.value[0]) {
        queryCondition.value.datetimePlanStart = datePlanRange.value[0].toString();
      }
      if (datePlanRange.value[1]) {
        queryCondition.value.datetimePlanEnd = datePlanRange.value[1].toString();
      }
    }
    if (selectMoStatus.value) {
      queryCondition.value.status = selectMoStatus.value.join(',');
    }
    const res = (await apicontrol.mo.getmolist({
      ...queryCondition.value,
      pagenum: pageUI.value.page,
      pagesize: pageUI.value.rows,
    })) as any;
    moData.value = res.list;
    dataTotal.value = Number(res.total);
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoading(false);
  }
};

// 初始化系统字典工单类型
const initMoClass = async () => {
  try {
    setLoading(true);
    const res = (await apimain.param.getListByGroupCode({
      parmGroupCode: 'C_MO_TYPE',
    })) as any;
    moClassOption.value = res;
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoading(false);
  }
};

// 初始化系统字典工单状态
const initMoType = async () => {
  try {
    setLoading(true);
    const res = (await apimain.param.getListByGroupCode({
      parmGroupCode: 'C_MO_STATUS',
    })) as any;
    const checkall = { label: '全选', value: '', checkAll: true };
    moStatusOption.value = res;
    moStatusOption.value.unshift(checkall);
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoading(false);
  }
};

const onChangeMoStatus = (val) => {
  console.log(selectMoStatus.value, val);
};

// 防抖
const debounce = (func: { (): void; apply?: any }, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      func.apply(this, args);
    }, delay);
  };
};
const onHandleQuery = debounce(() => {
  fetchTable();
}, 200);

// 重置
const onHandleResetting = () => {
  keyword.value = '';
  pageUI.value.page = 1;
  fetchTable();
};

// 跳转到BOM明细界面
const onHandelDetail = (row: any) => {
  detailedShow.value = true;
  currentrow.value = row;
  console.log(row);
};

// 跳转到工艺路线明细界面
const onEditRoutingClick = (row: any) => {
  routingUpdateShow.value = true;
  currentrow.value = row;
};

// 子组件控制BOM窗口
const onHandleBomShow = (value: any) => {
  detailedShow.value = value;
};

// 子组件控制Routing窗口
const onHandleRoutingShow = (value: any) => {
  routingUpdateShow.value = value;
};

// 子组件控制刷新
const onHandleTableReresh = () => {
  fetchTable();
};

onMounted(() => {
  initMoClass();
  initMoType();
  fetchTable();
});
</script>

<style lang="less" scoped>
.save-filter {
  color: var(--brand-main);
}

.list-card-container {
  padding: var(--td-comp-paddingTB-xxl) var(--td-comp-paddingLR-xxl);

  .t-row {
    margin-bottom: 10px;

    .check-box-conditon {
      /deep/ .t-checkbox {
        border: 1px solid var(--td-border-level-2-color) !important;
        height: 24px !important;
        padding: 6px !important;
      }
    }
  }

  :deep(.t-card__body) {
    padding: 0;
  }
}

.btn-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--td-comp-margin-xxl);
}
// 控制盒子
.control-box {
  position: absolute;
  right: var(--td-comp-size-l);
  bottom: var(--td-comp-size-s);
  color: red;
}
// form表单控制
.form-customer-row {
  margin: 10px 0;
}

.btn-disabled {
  cursor: pointer;
}

.range-time-query {
  padding-left: 118px !important ;
}

/deep/ .t-dialog__ctx .t-dialog__position.t-dialog--top {
  padding-top: 5vh !important;
}
</style>
