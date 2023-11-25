<template>
  <div>
    <!-- 子from -->
    <t-dialog
      v-model:visible="detailedShow"
      :row="currentrow"
      header="工单BOM"
      :cancel-btn="null"
      :confirm-btn="null"
      width="90%"
    >
      <detailed :row="currentrow" @added-show="onHandleSave"></detailed>
    </t-dialog>
    <!-- 头部 -->
    <t-card class="list-card-container" :bordered="false">
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
            title="产品："
            type="mitem"
            value-field="mitemCode"
            :show-title="true"
            placeholder="请选择产品"
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
          <!-- <t-input v-model="queryCondition.moCode" label="计划时间：" placeholder="请输入"></t-input> -->
        </t-col>
        <t-col :span="2"> </t-col>
      </t-row>
      <t-row justify="space-between">
        <t-col :span="10">
          <span>工单状态：</span>
          <!-- 复选框框组受控模式 -->
          <t-checkbox-group
            class="check-box-conditon"
            :v-model="selectMoStatus"
            :options="moStatusOption"
            label="工单状态："
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
        <!-- <template #op="{ row }">
          <icon name="edit-1"></icon>
        </template> -->
      </tm-table>
    </t-card>
    <!-- 弹出层 -->
    <!-- <t-dialog v-model:visible="formVisible" header="客户维护编辑" :cancel-btn="null" :confirm-btn="null" width="40%">
      <t-form
        ref="form"
        :loading="loading"
        :rules="rules"
        :data="formData"
        layout="inline"
        scroll-to-first-error="smooth"
        label-align="right"
        @submit="onCustomerSubmit"
      >
        <t-row class="form-customer-row">
          <t-col>
            <t-form-item label="客户编辑:" name="customerCode">
              <t-input v-model="formData.customerCode" readonly></t-input>
            </t-form-item>
          </t-col>
        </t-row>
     
        <t-row class="form-customer-row">
          <t-col>
            <t-form-item label="客户名称:" name="customerName">
              <t-input v-model="formData.customerName"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
      
        <t-row class="form-customer-row">
          <t-col>
            <t-form-item label="客户简称:" name="abbreviation">
              <t-input v-model="formData.shortName"></t-input>
            </t-form-item>
          </t-col>
        </t-row>
      
        <div class="control-box">
          <t-button theme="default" variant="base" @click="onSecondaryReset">取消</t-button>
          <t-popconfirm content="确认提交吗" @confirm="onSecondary">
            <t-button theme="primary" type="submit">确认</t-button>
          </t-popconfirm>
        </div>
      </t-form>
    </t-dialog> -->
  </div>
</template>

<script setup lang="tsx">
import dayjs from 'dayjs';
import { onMounted, ref, watch } from 'vue';

import { api as apicontrol } from '@/api/control';
import { api as apimain } from '@/api/main';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import TmSelectBusiness from '../../../../components/tm-select-business/index.vue';
import detailed from './detailed.vue';

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
// 监听查询的时候把num改为1
watch(
  () => keyword.value,
  (newValue, oldValue) => {
    if (oldValue !== newValue) {
      console.log(oldValue !== newValue);
      pageUI.value.page = 1;
    }
  },
);
// 表格th数据
const columns = ref([
  {
    colKey: 'moCode',
    title: '工单号',
    width: '100',
    // cell: (h, { row }) => (
    //   <div style="color: #4d6af9;" onClick={onHandelDetail}>
    //     {row.moCode}
    //   </div>
    // ),
  },
  { colKey: 'moClass', title: '工单类型' },
  {
    colKey: 'status',
    title: '工单状态',
    // cell: (h, { row }) => <span>{moStatusOption[row.status].label}</span>,
    // cell: (h, { row }) => {
    //   return moStatusOption[row.status].label;
    // },
    // cell: (h, { row }) => {
    //   return moStatusOption.value[row.status];
    // },
  },
  { colKey: 'mitemCode', title: '物料编码', width: '120' },
  { colKey: 'mitemDesc', title: '物流描述', width: '150' },
  { colKey: 'planQty', title: '计划数量' },
  { colKey: 'completedQty', title: '完成数量' },
  { colKey: 'uom', title: '单位' },
  { colKey: 'workshopName', title: '车间' },
  { colKey: 'workCenterName', title: '工作中心' },
  { colKey: 'routingName', title: '工艺路线' },
  { colKey: 'datetimePlanStart', title: '计划开始时间', width: '150' },
  { colKey: 'datetimePlanEnd', title: '计划完成时间', width: '150' },
  { colKey: 'datetimeActualStart', title: '实际开始时间', width: '150' },
  { colKey: 'datetimeActualEnd', title: '实际完成时间', width: '150' },
  { colKey: 'datetimeMoClose', title: '工单关闭时间', width: '150' },
  { colKey: 'op', title: '操作', width: '100' },
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
    moClassOption.value = res.list.map((item) => {
      return {
        label: item.paramValue,
        value: item.paramCode,
      };
    });
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
    const checkall = { label: '全选', checkAll: true };
    moStatusOption.value = res.list.map((item) => {
      return {
        label: item.paramValue,
        value: item.paramCode,
      };
    });
    moStatusOption.value.splice(0, 1, checkall);
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

// 跳转到明细界面
const onHandelDetail = (row: any) => {
  detailedShow.value = true;
  currentrow.value = row;
  console.log(row);
};
// 子组件控制
const onHandleSave = (value: any) => {
  detailedShow.value = value;
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
  }

  .check-box-conditon {
    .t-checkbox {
      border: 1px solid var(--td-border-level-2-color) !important;
      height: 24px !important;
      padding: 6px !important;
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
</style>
