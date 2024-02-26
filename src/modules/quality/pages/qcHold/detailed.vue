<template>
  <t-dialog
    v-model:visible="formVisible"
    :header="t('qcHold.formtitle')"
    width="75%"
    top="20"
    :confirm-btn="{
      content: t('common.button.save'),
      theme: 'primary',
    }"
    :on-confirm="onConfirmForm"
    :close-on-overlay-click="false"
    class="add-form"
  >
    <div class="detailed-box">
      <!-- from -->
      <cmp-card :span="12" :ghost="false" :bordered="true">
        <t-form
          ref="formRefDetail"
          :disabled="formData.viewType == ViewType.VIEW"
          :data="formData"
          :show-cancel="true"
          :show-error-message="false"
          :rules="FORM_RULES"
          label-width="120px"
        >
          <t-row :gutter="[0, 12]">
            <t-col v-if="!(formData.viewType == ViewType.LOCK)" :span="6">
              <t-form-item :label="t('qcHold.billNo')" name="billNo"> {{ formData.billNo }}</t-form-item></t-col
            >
            <t-col :span="6">
              <t-form-item :label="t('qcHold.creatorName')" name="creatorName"> {{ formData.creatorName }}</t-form-item>
            </t-col>
            <t-col :span="6">
              <t-form-item :label="t('qcHold.reasonCategory')" name="reasonCategory">
                <t-select v-model="formData.reasonCategory">
                  <t-option
                    v-for="item in reasonCategoryOption"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                  />
                </t-select>
              </t-form-item>
            </t-col>
            <t-col :span="6">
              <t-form-item :label="t('qcHold.datetimePlanHandle')" name="datetimePlanHandle">
                <t-date-picker v-model="formData.datetimePlanHandle" allow-input clearable format="YYYY-MM-DD"
              /></t-form-item>
            </t-col>
            <t-col :span="6">
              <t-form-item :label="t('qcHold.customerId')" name="customerId">
                <bcmp-select-business
                  v-model="formData.customerId"
                  type="customer"
                  :show-title="false"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col :span="6">
              <t-form-item :label="t('qcHold.personResponsibilityId')" name="personResponsibilityId">
                <bcmp-select-business
                  v-model="formData.personResponsibilityId"
                  type="person"
                  :show-title="false"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col v-if="!(formData.viewType == ViewType.LOCK)" :span="6">
              <t-form-item :label="t('qcHold.personHandleId')" name="personHandleId">
                <bcmp-select-business
                  v-model="formData.personHandleId"
                  type="person"
                  :show-title="false"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col v-if="!(formData.viewType == ViewType.LOCK)" :span="6">
              <t-form-item :label="t('qcHold.personFollowUpId')" name="personFollowUpId">
                <bcmp-select-business
                  v-model="formData.personFollowUpId"
                  type="person"
                  :show-title="false"
                ></bcmp-select-business
              ></t-form-item>
            </t-col>
            <t-col :span="12" class="customer-remark">
              <t-form-item :label="t('qcHold.memo')" name="memo">
                <t-textarea v-model="formData.memo" name="description" :autosize="{ minRows: 3, maxRows: 5 }" />
              </t-form-item>
            </t-col>
          </t-row>
        </t-form>
      </cmp-card>
      <!-- table表格 -->
      <footer class="detailed-work-center">
        <div v-show="operatorType == OperatorType.MO" class="table-work-header">
          <cmp-table
            ref="tableMoRefDetail"
            row-key="id"
            :table-column="MoColumns"
            :table-data="selectRows"
            :loading="loadingBom"
            :show-toolbar="false"
            :show-pagination="false"
            @refresh="fetchTableDetail"
          >
          </cmp-table>
        </div>

        <div v-show="operatorType == OperatorType.PRODUCT" class="table-work-header">
          <cmp-table
            ref="tableProductRefDetail"
            row-key="id"
            :table-column="productColumns"
            :table-data="selectRows"
            :loading="loadingBom"
            :show-toolbar="false"
            :show-pagination="false"
            @refresh="fetchTableDetail"
          >
          </cmp-table>
        </div>

        <div v-show="operatorType == OperatorType.WORKSTATION" class="table-work-header">
          <cmp-table
            ref="tableWorkstationRefDetail"
            row-key="id"
            :table-column="workStationColumns"
            :table-data="selectRows"
            :loading="loadingBom"
            :show-toolbar="false"
            :show-pagination="false"
            @refresh="fetchTableDetail"
          >
          </cmp-table>
        </div>

        <div v-show="operatorType == OperatorType.MITEM" class="table-work-header">
          <cmp-table
            ref="tableMitemRefDetail"
            row-key="id"
            :table-column="mitemColumns"
            :table-data="selectRows"
            :loading="loadingBom"
            :show-toolbar="false"
            :show-pagination="false"
            @refresh="fetchTableDetail"
          >
          </cmp-table>
        </div>
      </footer>

      <!-- <div class="popup-mo-foot-btn">
      <t-button theme="default" @click="onHandleCancellation">取消</t-button>
    </div> -->
    </div>
  </t-dialog>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { FormInstanceFunctions, LoadingPlugin, MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { onMounted, reactive, Ref, ref } from 'vue';

import { api as apimain } from '@/api/main';
import { api as apiQuality, QcHoldVO } from '@/api/quality';
import CmpTable from '@/components/cmp-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { useUserStore } from '@/store';

import { useLang } from './lang';

const userStore = useUserStore();
const { t } = useLang();
const formRefDetail: Ref<FormInstanceFunctions> = ref(null);
// 原因类别下拉初始数据
const reasonCategoryOption = ref([]);
const selectRows = ref([]); // 冻结执行，所选择的行信息
const keyList = ref([]); // 冻结的唯一key列表信息
const operatorType = ref('');
const formVisible = ref(false);
enum OperatorType {
  MO = 'MO', // 工单
  PRODUCT = 'PRODUCT', // 产品
  WORKSTATION = 'WORKSTATION', // 工站
  MITEM = 'MITEM', // 物料
}

enum ViewType {
  LOCK = 'LOCK', // 冻结模式
  UNLOCK = 'UNLOCK', // 解冻模式
  VIEW = 'VIEW', // 查看模式
}

const { loading: loadingBom, setLoading: setLoadingDetail } = useLoading();

interface FormQcHold extends QcHoldVO {
  viewType: ViewType;
}

const formData: FormQcHold = reactive({
  viewType: ViewType.VIEW,
});
const FORM_RULES = {
  reasonCategory: [{ required: true, message: t('common.placeholder.input', [t('qcHold.reasonCategory')]) }],
  datetimePlanHandle: [{ required: true, message: t('common.placeholder.input', [t('qcHold.datetimePlanHandle')]) }],
  customerId: [{ required: false, message: t('common.placeholder.input', [t('qcHold.customerId')]) }],
  personResponsibilityId: [
    { required: true, message: t('common.placeholder.input', [t('qcHold.personResponsibilityId')]) },
  ],
  memo: [{ required: true, message: t('common.placeholder.input', [t('qcHold.memo')]) }],
};

const Emit = defineEmits(['showCloseEvent']);
// 查询工单BOM
const fetchTableDetail = async () => {
  try {
    setLoadingDetail(true);
  } catch (e) {
    console.log('cus', e);
  } finally {
    setLoadingDetail(false);
  }
};

// #### 工单 表头
const MoColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
    align: 'center',
    width: '60',
  },
  {
    colKey: 'scheCode',
    title: `${t('qcHold.moCode')}`,
    align: 'center',
    width: '150',
  },
  {
    colKey: 'moClassName',
    title: `${t('qcHold.moClass')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'statusName',
    title: `${t('qcHold.moStatusName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemCode',
    title: `${t('qcHold.mitemCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemDesc',
    title: `${t('qcHold.mitemDesc')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'planQty',
    title: `${t('qcHold.planQty')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'completedQty',
    title: `${t('qcHold.completedQty')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'uomName',
    title: `${t('qcHold.uomName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workshopName',
    title: `${t('qcHold.workshopName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'routingName',
    title: `${t('qcHold.routingName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'datetimePlanStart',
    title: `${t('qcHold.datetimePlanStart')}`,
    align: 'center',
    width: '180',
  },
  {
    colKey: 'datetimePlanEnd',
    title: `${t('qcHold.datetimePlanEnd')}`,
    align: 'center',
    width: '180',
  },
];

// #### 产品 表头
const productColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
    align: 'center',
    width: '60',
  },
  {
    colKey: 'barcode',
    title: `${t('qcHold.barcode')}`,
    align: 'center',
    width: '160',
  },
  {
    colKey: 'barcodeStatusName',
    title: `${t('qcHold.barcodeStatus')}`,
    align: 'center',
    width: '110',
  },
  {
    colKey: 'workshopName',
    title: `${t('qcHold.workshopName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workCenterName',
    title: `${t('qcHold.workCenterName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'scheCode',
    title: `${t('qcHold.moCode')}`,
    align: 'center',
    width: '160',
  },
  {
    colKey: 'mitemCode',
    title: `${t('qcHold.mitemCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemDesc',
    title: `${t('qcHold.mitemDesc')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'uomName',
    title: `${t('qcHold.uomName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'curProcessName',
    title: `${t('qcHold.curProcessName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'curWorkStationName',
    title: `${t('qcHold.curWorkStationName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'productStatus',
    title: `${t('qcHold.productStatus')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'processTime',
    title: `${t('qcHold.processTime')}`,
    align: 'center',
    width: '190',
  },
  {
    colKey: 'datetimePlanEnd',
    title: `${t('qcHold.datetimePlanEnd')}`,
    align: 'center',
    width: '180',
  },
];
// ####机台工站 表头
const workStationColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
    align: 'center',
    width: '60',
  },
  {
    colKey: 'workstationCode',
    title: `${t('qcHold.workstationCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workstationName',
    title: `${t('qcHold.workstationName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workstationDesc',
    title: `${t('qcHold.workstationDesc')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workshopName',
    title: `${t('qcHold.workshopName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workCenterName',
    title: `${t('qcHold.workCenterCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'processName',
    title: `${t('qcHold.processName')}`,
    align: 'center',
    width: '130',
  },
  // {
  //   colKey: 'state',
  //   title: `${t('qcHold.state')}`,
  //   align: 'center',
  //   width: '130',
  // },
];
// ####W物料 表头
const mitemColumns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'serial-number',
    title: `${t('business.main.serialNumber')}`,
    align: 'center',
    width: '60',
  },
  {
    colKey: 'workshopName',
    title: `${t('qcHold.workshopName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'workCenterName',
    title: `${t('qcHold.workCenterCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'scheCode',
    title: `${t('qcHold.moCode')}`,
    align: 'center',
    width: '160',
  },
  {
    colKey: 'mitemCode',
    title: `${t('qcHold.mitemCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemName',
    title: `${t('qcHold.mitemName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'labelNo',
    title: `${t('qcHold.labelNo')}`,
    align: 'center',
    width: '200',
  },
  {
    colKey: 'mitemCodeLabel',
    title: `${t('qcHold.mitemCodeLabel')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'mitemDescLabel',
    title: `${t('qcHold.mitemDescLabel')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'labelStatus',
    title: `${t('qcHold.labelStatus')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'qty',
    title: `${t('qcHold.labelQty')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'balanceQty',
    title: `${t('qcHold.balanceQty')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'uomName',
    title: `${t('qcHold.uomName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'supplierCode',
    title: `${t('qcHold.supplierCode')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'supplierName',
    title: `${t('qcHold.supplierName')}`,
    align: 'center',
    width: '130',
  },
  {
    colKey: 'lotNo',
    title: `${t('qcHold.batchNo')}`,
    align: 'center',
    width: '130',
  },
];

// 初始化冻结界面信息
const initLockDetailForm = (rowDatas: any, keys: String[], type: OperatorType) => {
  selectRows.value = rowDatas;
  keyList.value = keys;
  operatorType.value = type.toString();
  formData.viewType = ViewType.LOCK;
  formData.creatorName = userStore.userInfo.name;
  formData.holdCategory = operatorType.value;
};

// 冻结解冻提交
const onConfirmForm = async () => {
  try {
    LoadingPlugin(true);
    await apiQuality.hold.saveData({
      qcHoldInfo: formData,
      keyList: keyList.value,
      saveType: formData.viewType === ViewType.LOCK ? ViewType.LOCK : ViewType.UNLOCK,
    });

    MessagePlugin.success(t('common.message.saveSuccess'));
    formVisible.value = false;
    Emit('showCloseEvent', false);
  } catch (e) {
    console.log(e);
  } finally {
    LoadingPlugin(false);
  }
};

const reset = () => {
  formRefDetail.value.reset({ type: 'empty' });
  keyList.value = [];
  selectRows.value = [];
  for (const key in formData) {
    formData[key] = null;
  }
};

const showPopform = () => {
  formVisible.value = true;
};

// 初始化系统字典
const initOptions = async () => {
  const res = (await apimain.param.getListByGroupCode({
    parmGroupCode: 'Q_HOLD_CATEGORY',
  })) as any;
  reasonCategoryOption.value = res;
};

defineExpose({
  initLockDetailForm,
  showPopform,
  reset,
});

onMounted(() => {
  initOptions();
});
</script>

<style lang="less" scoped>
.detailed-work-center {
  margin-top: 12px;
}

:deep(.t-date-picker) {
  width: 100%;
}

.customer-remark {
  :deep(.t-form__controls-content) {
    width: 100% !important;
  }
}
</style>
