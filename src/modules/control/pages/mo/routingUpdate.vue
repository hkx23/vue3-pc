<template>
  <div class="detailed-box">
    <t-card :bordered="false">
      <div class="form-item-box">
        <!-- <t-form-item label="工艺路线类型"> <t-input v-model="conditionData.routingType" /></t-form-item> -->
        <t-form-item label="工艺路线">
          <t-input v-model="conditionData.routingCode" @change="onChangeKeyword" />
        </t-form-item>
      </div>
    </t-card>
    <!-- table表格 -->
    <footer class="detailed-work-center">
      <div v-if="selectRouting == 'MOROUTING'" class="table-work-header">
        <tm-table
          ref="tableRoutingRef"
          row-key="id"
          :table-column="columnsRouting"
          :table-data="moRoutingData"
          :loading="loadingRouting"
          :show-pagination="false"
          select-on-row-click
          @refresh="fetchTableRouting"
          @select-change="onSelectChange"
        >
        </tm-table>
      </div>
    </footer>
    <div class="popup-mo-foot-btn">
      <t-button v-show="selectRoutingVerisonID > 0" theme="primary" @click="onHandlesave">保存</t-button>
      <t-button theme="default" @click="onHandleCancel">取消</t-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { nextTick, reactive, ref, watch } from 'vue';

import { api as apicontrol } from '@/api/control';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
// 子修改传值
const props = defineProps({
  // 组件展示类型
  row: {
    type: Object,
    default: null,
  },
});
const { loading: loadingRouting, setLoading: setLoadingRouting } = useLoading();
const Emit = defineEmits(['routingShow', 'refreshTable']);
const currentrow = ref({}); // 当前行工单信息
const conditionData = reactive({
  routingCode: '',
  routingType: '',
});
const selectRouting = ref('');
const selectRoutingVerisonID = ref(0);
// 工单Routing信息
const moRoutingData = ref([]);
// 查询工单Routing
const fetchTableRouting = async () => {
  try {
    setLoadingRouting(true);
    const row = currentrow.value as any;
    if (row) {
      const { routingCode } = conditionData;
      const res = (await apicontrol.routingRevision.getRoutRevisionByRoutingCode({
        routingCode,
      })) as any;
      moRoutingData.value = res.list;
    }
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoadingRouting(false);
  }
};

const columnsRouting: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'row-select',
    type: 'single',
    fixed: 'left',
  },

  {
    colKey: 'routingCode',
    title: '工艺路线编码',
    align: 'center',
  },
  {
    colKey: 'routingName',
    title: '工艺路线名称',
    align: 'center',
  },
  {
    colKey: 'routingDesc',
    title: '版本号',
    align: 'center',
  },
];
// 取消
const onHandleCancel = () => {
  Emit('routingShow', false);
};

// 保存
const onHandlesave = async () => {
  if (selectRoutingVerisonID.value) {
    const row = currentrow.value as any;
    await apicontrol.mo.updateMoRouting({
      id: row.moScheduleId,
      routingRevisionId: selectRoutingVerisonID.value.toString(),
    });
    MessagePlugin.success('保存成功');
    onHandleCancel();
    onHandleParentTableRefresh();
  }
};

// 父页面表格刷新
const onHandleParentTableRefresh = () => {
  Emit('refreshTable');
};

// 选中行
const onSelectChange = (value: any) => {
  selectRoutingVerisonID.value = value;
};

// 查询工艺路线编码
const onChangeKeyword = () => {
  fetchTableRouting();
};

watch(
  () => props.row,
  (value) => {
    nextTick(() => {
      selectRouting.value = 'MOLOG1'; // 由于弹出框表格无法显示，目前才采用弹出重绘临时解决
      selectRouting.value = 'MOROUTING'; // 由于弹出框表格无法显示，目前才采用弹出重绘临时解决
      currentrow.value = value;
      fetchTableRouting();
    });
  },
  { deep: true },
);
</script>

<style lang="less" scoped>
.t-card {
  border: 1px solid var(--td-border-level-2-color) !important;
  margin-bottom: 24px;
}

.detailed-box {
  padding: var(--td-comp-paddingTB-xl) var(--td-comp-paddingLR-xl);

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

  .t-form__item {
    display: inline-block;
    width: 30%;
    margin: 0;
  }

  /deep/ .t-form__label {
    display: inline-block !important;
  }

  /deep/ .t-form__controls {
    display: inline-block !important;
  }
}

.form-checkbox {
  margin: 10px 100px;
}
</style>
