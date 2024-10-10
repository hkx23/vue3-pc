<template>
  <cmp-container :full="true">
    <cmp-row>
      <cmp-card flex="auto" :ghost="true">
        <cmp-container :full="true" header :full-sub-index="labelList.length > 0 ? [1] : [0]">
          <!-- 扫描区 -->
          <cmp-card>
            <bcmp-workstation-info @change="workChange" />
            <t-row :gutter="4" class="padding-top-line-8" style="padding-bottom: 8px">
              <t-col flex="auto">
                <cmp-scan-input v-model="scanLabel" :placeholder="scanPlaceholder" @enter="scan"></cmp-scan-input>
              </t-col>
              <t-col v-if="labelList.length > 0" flex="120px" style="text-align: right">
                <t-space :size="8" align="center" class="qty-info">
                  <div class="label-qty">{{ allQty }}</div>
                  <div>/{{ pkgInfo.packQty }}</div>
                  <div class="label-uom">{{ pkgInfo.uom }}/{{ pkgInfo.packUom }}</div>
                </t-space>
              </t-col>
              <t-col flex="120px" style="text-align: right">
                <t-radio-group v-model="scanType" variant="primary-filled" @change="scanTypeChange">
                  <t-radio-button value="normal">{{ t('productPacking.normal') }}</t-radio-button>
                  <t-radio-button value="delete">{{ t('common.button.delete') }}</t-radio-button>
                </t-radio-group>
              </t-col>
            </t-row>
            <t-row v-if="isOnlinePrint" :gutter="4" class="padding-top-line-8" style="padding-bottom: 8px">
              <t-col flex="240px">
                <t-select v-model="barcodeRuleId" :label="t('productPacking.barcodeRule')">
                  <t-option v-for="item in barcodeRuleList" :key="item.id" :label="item.ruleName" :value="item.id" />
                </t-select>
              </t-col>
              <t-col flex="240px">
                <t-select v-model="printTempId" :label="t('productPacking.printTemplate')">
                  <t-option v-for="item in printTempList" :key="item.id" :label="item.tmplName" :value="item.id" />
                </t-select>
              </t-col>
            </t-row>
            <t-form
              v-if="labelList.length > 0"
              label-width="80px"
              label-align="left"
              style="border-top: 1px solid var(--td-component-stroke)"
            >
              <t-row class="item-row" :gutter="[4, 0]">
                <t-col :span="12" class="pkg-panel">
                  <t-space>
                    <qrcode-icon />
                    <div>{{ pkgInfo && pkgInfo.barcode }}</div>
                    <t-tag v-if="pkgInfo.barcodeType === 'SN'" theme="success" variant="outline">{{
                      t('productPacking.productLabel')
                    }}</t-tag>
                    <t-tag v-else theme="success" variant="outline">{{ t('productPacking.packLabel') }}</t-tag>
                  </t-space>
                </t-col>
                <t-col flex="210px"
                  ><t-form-item label="工单">{{ pkgInfo && pkgInfo.moCode }} </t-form-item>
                </t-col>
                <t-col flex="210px"
                  ><t-form-item label="工作中心">{{ pkgInfo && pkgInfo.workcenterName }} </t-form-item>
                </t-col>
                <t-col flex="210px"
                  ><t-form-item label="产品编码">{{ pkgInfo && pkgInfo.mitemCode }} </t-form-item>
                </t-col>
                <t-col flex="210px"
                  ><t-form-item label="产品名称">{{ pkgInfo && pkgInfo.mitemName }} </t-form-item>
                </t-col>
              </t-row>
            </t-form>
          </cmp-card>
          <!-- 采集详情区 -->
          <cmp-card v-if="labelList.length > 0" :header="t('productPacking.packingList')" header-bordered>
            <t-row :gutter="10">
              <t-col v-for="(label, index) in labelList" :key="index" :span="4" class="label-list">
                <t-alert theme="info" :message="label.barcode">
                  <template #icon>{{ index + 1 }}</template>
                  <template #operation><close-icon @click="removeLabel(label.barcode)" /></template>
                </t-alert>
              </t-col>
            </t-row>
            <div class="label-footer">
              <t-button theme="primary" @click="tailPkg">{{ t('productPacking.tailPacking') }}</t-button>
              <!-- 后续扩展 -->
              <!-- <t-button theme="default">{{ t('productPacking.packingLog') }}</t-button> -->
            </div>
          </cmp-card>
        </cmp-container>
      </cmp-card>
      <cmp-card flex="300px" :ghost="true">
        <cmp-container :full="true" header>
          <cmp-card>
            <cmp-message v-model="msgList"></cmp-message>
          </cmp-card>
        </cmp-container>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { find, findIndex, remove, sumBy } from 'lodash';
import { CloseIcon, QrcodeIcon } from 'tdesign-icons-vue-next';
import { DialogPlugin, LoadingPlugin } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { api as apiControl, PkgExtendVO, WipPkgInfoVO } from '@/api/control';
import { api as apiMain } from '@/api/main';
import BcmpWorkstationInfo from '@/components/bcmp-workstation-info/index.vue';
import { printByHiPrint } from '@/components/cmp-print-button/hiPrint';
import { printByStimulsoft } from '@/components/cmp-print-button/stimulsoft';
import { useUserStore } from '@/store';

import { useLang } from './lang';
// 使用多语言
const { t } = useLang();

const userStore = useUserStore();
const scanType = ref('normal');
const isOnlinePrint = ref(false);
const isProcessConsistent = ref(false);
const processCategory = ref();
const isWorckstationIsHold = ref(false);

const init = async () => {
  // 获取是否在线打印配置
  const profile = await apiMain.profileValue.getValueByProfileCode({
    code: 'ONLINE_PRINT',
    orgId: fw.getOrgId(),
    workshopId: userStore.currUserOrgInfo.workShopId,
    workcenterId: userStore.currUserOrgInfo.workCenterId,
    workstationId: userStore.currUserOrgInfo.workStationId,
  });
  if (profile === '1' || profile === 'Y') {
    isOnlinePrint.value = true;
  }

  // 判断工站对应的工序是否正确
  const category = await apiMain.workstation.getProcessCategory({
    workstationId: userStore.currUserOrgInfo.workStationId,
  });
  processCategory.value = category;
  if (category !== 'PACK') {
    pushMessage('error', t('productPacking.tipsProcessCategoryInconsistent', [category]));
    return;
  }
  isProcessConsistent.value = true;

  // 判断工站是否暂挂
  const ws = await apiMain.workstation.getItemById(userStore.currUserOrgInfo.workStationId);
  if (ws.isHold === 1) {
    isWorckstationIsHold.value = true;
    pushMessage('error', t('productPacking.tipsWorkstationIsHold'));
    return;
  }

  pushMessage('info', t('productPacking.plsScanLabel'));
};
init();
const workChange = () => {
  init();
};

// 扫描页
const scanPlaceholder = computed(() => {
  if (isScanPkg.value) {
    return t('productPacking.plsScanPackLabel');
  }
  if (scanType.value === 'delete') {
    return t('productPacking.plsScanDelLabel');
  }
  return t('productPacking.plsScanLabel');
});
const isScanPkg = ref(false);
const scanLabel = ref();
const pkgLabel = ref<PkgExtendVO>();
const allQty = computed(() => {
  if (labelList.value.length === 0) {
    return 0;
  }
  return sumBy(labelList.value, (o) => o.barcodeQty);
});
const pkgInfo = ref<WipPkgInfoVO>();
const labelList = ref<WipPkgInfoVO[]>([]);
const barcodeRuleId = ref();
const barcodeRuleList = ref([]);
const printTempId = ref();
const printTempList = ref([]);
const scanTypeChange = (val: any) => {
  if (val === 'delete') {
    pushMessage('info', t('productPacking.plsScanDelLabel'));
  } else {
    pushMessage('info', t('productPacking.plsScanLabel'));
  }
  isScanPkg.value = false;
};
const getBarcodeRuleList = (moScheId: string, packType: string) => {
  apiMain.barcodePkg
    .getBarcodeRuleList({
      moScheId,
      packType,
    })
    .then((data) => {
      barcodeRuleList.value = data.list;
      if (data.list.length > 0) {
        barcodeRuleId.value = data.list[0].id;
      }
    });
};
const getPrintTempList = (moScheId: string, packType: string) => {
  apiMain.barcodePkg
    .getPrintTmplList({
      moScheId,
      packType,
    })
    .then((data) => {
      printTempList.value = data.list;
      if (data.list.length > 0) {
        printTempId.value = data.list[0].id;
      }
    });
};
const scan = () => {
  if (!isProcessConsistent.value) {
    pushMessage('error', t('productPacking.tipsProcessCategoryInconsistent', [processCategory.value]));
    return;
  }
  if (isWorckstationIsHold.value) {
    pushMessage('error', t('productPacking.tipsWorkstationIsHold'));
    return;
  }
  if (isScanPkg.value) {
    apiControl.barcodePkg
      .getByBarcode({
        barcode: scanLabel.value,
      })
      .then((data) => {
        if (data.packRuleId !== labelList.value[0].packRuleId) {
          pushMessage('error', t('productPacking.tipsPkgRuleInconsistent'));
          return;
        }
        if (data.moCode !== labelList.value[0].moCode) {
          pushMessage('error', t('productPacking.tipsMoInconsistent'));
          return;
        }
        if (data.subPkgBarcodeType !== labelList.value[0].barcodeType) {
          pushMessage('error', t('productPacking.tipsPkgTypeInconsistent'));
          return;
        }
        if (allQty.value > data.qty) {
          pushMessage('error', t('productPacking.tipsQtyFailed'));
          return;
        }
        pkgLabel.value = data;
        packing();
      })
      .catch((err) => {
        pushMessage('error', err.message);
      });
    return;
  }
  if (scanType.value === 'delete') {
    removeLabel(scanLabel.value);
    scanLabel.value = null;
  } else {
    // 判断是否重复扫描
    if (findIndex(labelList.value, ['barcode', scanLabel.value]) > -1) {
      pushMessage('error', t('productPacking.tipsBarcodeRepeat'));
      return;
    }
    apiControl.barcodeWip
      .getWipPkgInfo({
        barcode: scanLabel.value,
      })
      .then((data) => {
        // 当前数量是否超出规格
        if (data.barcodeQty > data.packQty) {
          pushMessage('error', t('productPacking.tipsQtyUpperLimite'));
          return;
        }
        if (labelList.value.length > 0) {
          // 判断包装规则是否一致
          if (data.packRuleId !== labelList.value[0].packRuleId) {
            pushMessage('error', t('productPacking.tipsPkgRuleInconsistent'));
            return;
          }
          // 判断条码类型是否一致
          if (data.barcodeType !== labelList.value[0].barcodeType) {
            pushMessage('error', t('productPacking.tipsBarcodeTypeInconsistent'));
            return;
          }
          if (data.moCode !== labelList.value[0].moCode) {
            pushMessage('error', t('productPacking.tipsMoInconsistent'));
            return;
          }
          // 判断累加的数量是否超出规格
          if (allQty.value + data.barcodeQty > pkgInfo.value.packQty) {
            pushMessage('error', t('productPacking.tipsQtyUpperLimite'));
            return;
          }
        }

        pkgInfo.value = data;
        labelList.value.push(data);
        pushMessage('success', t('productPacking.plsContinueScanPackLabel'));
        scanLabel.value = null;

        // 判断累恰好等于箱包数量，自动装箱
        if (allQty.value === pkgInfo.value.packQty) {
          preparePack();
        }

        // 在线打印，需要选择条码规则和打印模板
        if (isOnlinePrint.value) {
          if (!barcodeRuleId.value) {
            getBarcodeRuleList(data.moScheId, data.parentPackType);
          }
          if (!printTempId.value) {
            getPrintTempList(data.moScheId, data.parentPackType);
          }
        }
      })
      .catch((err) => {
        pushMessage('error', err.message);
        scanLabel.value = null;
      });
  }
};
const removeLabel = (barcode: string) => {
  remove(labelList.value, (o) => {
    return o.barcode === barcode;
  });
};
const tailPkg = () => {
  const confirmDia = DialogPlugin.confirm({
    header: false,
    body: t('productPacking.tipsCompletedTail'),
    onConfirm: () => {
      preparePack();
      confirmDia.hide();
    },
    onClose: () => {
      confirmDia.hide();
    },
  });
};
const preparePack = () => {
  // 判断是否在线打印，如果是，则自动包装生成条码打印
  // 如果不是，需要扫箱条码
  if (isOnlinePrint.value) {
    packing();
  } else {
    isScanPkg.value = true;
    pushMessage('info', t('productPacking.plsScanPackLabel'));
  }
};
const packing = () => {
  const postData = [];
  labelList.value.forEach((val) => {
    postData.push({
      moScheId: val.moScheId,
      pkgBarcode: val.barcode,
      pkgBarcodeType: val.barcodeType,
      parentPkgBarcode: pkgLabel.value ? pkgLabel.value.pkgBarcode : null,
      parentPkgType: pkgLabel.value ? pkgLabel.value.pkgBarcodeType : val.parentPackType,
      workshopId: userStore.currUserOrgInfo.workShopId,
      workcenterId: userStore.currUserOrgInfo.workCenterId,
      workstationId: userStore.currUserOrgInfo.workStationId,
      packRuleId: val.packRuleId,
      barcodeQty: val.barcodeQty,
      barcodeRuleId: barcodeRuleId.value,
    });
  });
  const instance = LoadingPlugin({
    loading: true,
    text: t('productPacking.saving'),
  });
  apiControl.pkgRelation
    .save(postData)
    .then((data) => {
      instance.hide();
      pushMessage('success', t('productPacking.saveSuccess'));
      labelList.value = [];
      scanLabel.value = null;
      isScanPkg.value = false;
      // 在线打印需要触发打印
      if (isOnlinePrint.value) {
        print(data);
      }
    })
    .catch(() => {
      instance.hide();
      pushMessage('error', t('productPacking.saveFailed'));
      scanLabel.value = null;
    });
};

// 打印
const print = async (barcode: string) => {
  if (!printTempId.value) {
    pushMessage('error', t('productPacking.plsSelectPrintTemplate'));
    return;
  }
  const instance = LoadingPlugin({
    loading: true,
    text: t('productPacking.printing'),
  });
  try {
    // 获取条码相关信息
    const pkgInfo = await apiMain.barcodePkg.getByBarcode({ barcode });
    if (!pkgInfo) {
      pushMessage('error', t('productPacking.tipsNotFindPkgInfo'));
      return;
    }
    // 保存打印日志
    await apiMain.barcodePkg.printByBarcode({ pkgBarcode: barcode });
    // 组装打印数据
    const dataBase = [
      {
        PKG_BARCODE: pkgInfo.pkgBarcode,
        QTY: pkgInfo.qty,
        MITEM_CODE: pkgInfo.mitemCode,
        MITEM_NAME: pkgInfo.mitemName,
      },
    ];
    const printData = [
      {
        variable: dataBase,
        dataSource: dataBase,
      },
    ];
    // 获取打印模板
    const templateBody = await apiMain.printTmpl.getTmplByIdOrCode({ id: printTempId.value, code: null });
    // 获取模板类型
    const printTemp = find(printTempList.value, ['id', printTempId.value]);
    // 打印
    if (printTemp.tmplType === 'hiprint') {
      printByHiPrint(templateBody, printData);
    } else {
      printByStimulsoft(templateBody, printData);
    }
    pushMessage('success', t('productPacking.printSuccess'));
  } catch {
    pushMessage('error', t('productPacking.printFailed'));
  } finally {
    instance.hide();
    barcodeRuleId.value = null;
    barcodeRuleList.value = [];
    printTempId.value = null;
    printTempList.value = [];
  }
};

// 消息
const msgList = ref<
  {
    theme: 'success' | 'info' | 'error' | 'warning';
    content: string;
    time: string;
  }[]
>([
  // {
  //   theme: 'info',
  //   content: t('productPacking.plsScanLabel'),
  //   time: dayjs().format('HH:mm:ss'),
  // },
]);
const pushMessage = (type: 'success' | 'info' | 'error' | 'warning', msg: string) => {
  let content: string;
  if (scanLabel.value && type === 'success') {
    content = `[${scanLabel.value}]${t('productPacking.scanSuccess')},${msg}`;
  } else if (scanLabel.value && type === 'error') {
    content = `[${scanLabel.value}]${t('productPacking.scanFailed')},${msg}`;
  } else {
    content = msg;
  }
  msgList.value.push({
    theme: type,
    content,
    time: dayjs().format('HH:mm:ss'),
  });
};
</script>

<style lang="less" scoped>
.right-label {
  display: flex;
  justify-content: flex-end;
}

.qty-info {
  padding-top: 4px;
  padding-left: 16px;
  display: flex;
  align-items: baseline;

  .label-qty {
    font-size: 28px;
  }

  .label-uom {
    font-size: 10px;
    padding-left: 5px;
  }
}

.pkg-panel {
  color: var(--td-brand-color-active);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
}

.label-list {
  margin-bottom: 10px;

  :deep(.t-alert__description) {
    flex: 1;
  }
}

.label-footer {
  display: flex;
  justify-content: flex-end;
}

:deep(.t-form__label) {
  color: var(--td-gray-color-7);
}

:deep(.t-collapse-panel__wrapper .t-collapse-panel__body) {
  background: white;
}

:deep(.t-table .custom-third-class-name) > td {
  background-color: var(--td-brand-color-light);
  font-weight: bold;
}
</style>
