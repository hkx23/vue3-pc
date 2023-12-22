<template>
  <cmp-container :full-screen="true">
    <cmp-card>
      <t-row align="middle" justify="space-around">
        <t-col :span="3">
          <t-space>
            <div>{{ t('business.main.workshop') }}</div>
            <div>{{ currUserOrgInfo.workShopName }}</div>
          </t-space>
        </t-col>
        <t-col :span="3">
          <t-space>
            <div>{{ t('business.main.workcenter') }}</div>
            <div>{{ currUserOrgInfo.workCenterName }}</div>
          </t-space>
        </t-col>
        <t-col :span="3">
          <t-space>
            <div>{{ t('business.main.workstation') }}</div>
            <div>{{ currUserOrgInfo.workStationName }}</div>
          </t-space>
        </t-col>
        <t-col :span="3" class="right-label">
          <t-space align="center">
            <div>{{ t('productPacking.scanType') }}</div>
            <t-radio-group v-model="scanType" variant="primary-filled" @change="scanTypeChange">
              <t-radio-button value="normal">{{ t('productPacking.normal') }}</t-radio-button>
              <t-radio-button value="delete">{{ t('common.button.delete') }}</t-radio-button>
            </t-radio-group>
          </t-space>
        </t-col>
      </t-row>
    </cmp-card>
    <cmp-row>
      <t-col :span="9">
        <t-space direction="vertical" :size="12" style="width: 100%">
          <t-card :header="t('productPacking.scanLabel')" class="scan-panel">
            <t-row align="middle" :gutter="10" class="scan-line">
              <t-col :span="10">
                <t-input v-model="scanLabel" :placeholder="scanPlaceholder" @enter="scan">
                  <template #suffixIcon>
                    <qrcode-icon />
                  </template>
                </t-input>
              </t-col>
              <t-col v-if="labelList.length > 0" :span="2" class="qty-info">
                <div class="label-qty">{{ allQty }}</div>
                <div>/{{ pkgInfo.packQty }}</div>
                <div class="label-uom">{{ pkgInfo.uom }}/{{ pkgInfo.packUom }}</div>
              </t-col>
            </t-row>
            <t-row v-if="labelList.length > 0" :gutter="16">
              <t-col :span="12" class="pkg-panel">
                <t-space>
                  <qrcode-icon />
                  <div>{{ pkgInfo.barcode }}</div>
                  <t-tag theme="success" variant="outline">{{ t('productPacking.productLabel') }}</t-tag>
                </t-space>
              </t-col>
              <t-col :span="1" class="label">工单</t-col>
              <t-col :span="3">{{ pkgInfo.moCode }}</t-col>
              <t-col :span="1" class="label">工作中心</t-col>
              <t-col :span="7">{{ pkgInfo.workcenterName }}</t-col>
              <t-col :span="1" class="label">产品编码</t-col>
              <t-col :span="3">{{ pkgInfo.mitemCode }}</t-col>
              <t-col :span="1" class="label">产品名称</t-col>
              <t-col :span="7">{{ pkgInfo.mitemName }}</t-col>
            </t-row>
          </t-card>
          <t-card v-if="labelList.length > 0" :header="t('productPacking.packingList')">
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
              <t-button theme="default">{{ t('productPacking.packingLog') }}</t-button>
            </div>
          </t-card>
        </t-space>
      </t-col>
      <cmp-card :span="3" :header="t('common.message.message')">
        <cmp-message v-model="msgList"></cmp-message>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { findIndex, remove, sumBy } from 'lodash';
import { CloseIcon, QrcodeIcon } from 'tdesign-icons-vue-next';
import { DialogPlugin } from 'tdesign-vue-next';
import { computed, ref } from 'vue';

import { api as apiControl, BarcodePkg, WipPkgInfoVO } from '@/api/control';
import { api as apiMain } from '@/api/main';
import { useUserStore } from '@/store';

import { useLang } from './lang';

// 使用多语言
const { t } = useLang();
const { currUserOrgInfo } = useUserStore();
const scanType = ref('normal');
const isOnlinePrint = ref(false);
// 获取是否在线打印配置
apiMain.profileValue
  .getValueByProfileCode({
    code: 'ONLINE_PRINT',
    orgId: fw.getOrgId(),
  })
  .then((val) => {
    if (val === '1' || val === 'Y') {
      isOnlinePrint.value = true;
    }
  });

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
const pkgLabel = ref<BarcodePkg>();
const allQty = computed(() => {
  if (labelList.value.length === 0) {
    return 0;
  }
  return sumBy(labelList.value, (o) => o.barcodeQty);
});
const pkgInfo = ref<WipPkgInfoVO>();
const labelList = ref<WipPkgInfoVO[]>([]);
const scanTypeChange = (val: any) => {
  if (val === 'delete') {
    pushMessage('info', t('productPacking.plsScanDelLabel'));
  } else {
    pushMessage('info', t('productPacking.plsScanLabel'));
  }
  isScanPkg.value = false;
};
const scan = () => {
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
      parentPkgType: pkgLabel.value ? pkgLabel.value.pkgBarcodeType : null,
      workshopId: currUserOrgInfo.workShopId,
      workcenterId: currUserOrgInfo.workCenterId,
      workstationId: currUserOrgInfo.workStationId,
    });
  });
  apiControl.pkgRelation
    .save(postData)
    .then(() => {
      pushMessage('success', t('productPacking.saveSuccess'));
      labelList.value = [];
      scanLabel.value = null;
      isScanPkg.value = false;
    })
    .catch(() => {
      pushMessage('error', t('productPacking.saveFailed'));
      scanLabel.value = null;
    });
};

// 消息
const msgList = ref<
  {
    theme: 'success' | 'info' | 'error' | 'warning';
    content: string;
    time: string;
  }[]
>([
  {
    theme: 'info',
    content: t('productPacking.plsScanLabel'),
    time: '16:27:11',
  },
]);
const pushMessage = (type: 'success' | 'info' | 'error' | 'warning', msg: string) => {
  let content: string;
  if (type === 'success') {
    content = `[${scanLabel.value}]${t('productPacking.scanSuccess')},${msg}`;
  } else if (type === 'error') {
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

.scan-panel {
  .scan-line {
    .qty-info {
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
  }

  .pkg-panel {
    color: var(--td-brand-color-active);
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 0;
  }

  .label {
    text-align: right;
  }
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
</style>
