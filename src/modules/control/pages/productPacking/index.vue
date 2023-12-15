<template>
  <cmp-container :full-screen="true">
    <cmp-card>
      <t-row align="middle" justify="space-around">
        <t-col :span="3">
          <t-space>
            <div>{{ t('business.main.workshop') }}</div>
            <div>总装一车间</div>
          </t-space>
        </t-col>
        <t-col :span="3">
          <t-space>
            <div>{{ t('business.main.workcenter') }}</div>
            <div>总装一线</div>
          </t-space>
        </t-col>
        <t-col :span="3">
          <t-space>
            <div>{{ t('business.main.workstation') }}</div>
            <div>Z1-1成品装箱</div>
          </t-space>
        </t-col>
        <t-col :span="3" class="right-label">
          <t-space align="center">
            <div>{{ t('productPacking.scanType') }}</div>
            <t-radio-group v-model="scanType" variant="primary-filled">
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
              <t-col v-if="isScanPackage" :span="2" class="qty-info">
                <div class="label-qty">{{ pkgInfo.qty }}</div>
                <div>/{{ pkgInfo.qty }}</div>
                <div class="label-uom">{{ pkgInfo.uom }}/箱</div>
              </t-col>
            </t-row>
            <t-row v-if="isScanPackage" :gutter="16">
              <t-col :span="12" class="pkg-panel">
                <t-space>
                  <qrcode-icon />
                  <div>{{ pkgInfo.pkgBarcode }}</div>
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
          <t-card v-if="isScanPackage" :header="t('productPacking.packingList')">
            <t-row :gutter="10">
              <t-col v-for="index in pkgInfo.qty" :key="index" :span="4" class="sn-label">
                <t-alert theme="warning" message="">
                  <template #icon>{{ index }}</template>
                </t-alert>
              </t-col>
            </t-row>
          </t-card>
        </t-space>
      </t-col>
      <cmp-card :span="3" :header="t('common.message.message')">
        <div class="message">
          <t-space direction="vertical" size="small" class="info">
            <t-alert v-for="(msg, index) in msgList.slice().reverse()" :key="index" :theme="msg.theme">
              <div>{{ msg.content }}</div>
              <div class="time">{{ msg.time }}</div>
            </t-alert>
          </t-space>
          <t-space align="center" size="small" separator="|">
            <t-button variant="text">
              <template #icon><file-copy-icon /></template>
              {{ t('common.button.copy') }}
            </t-button>
            <t-button variant="text" theme="danger">
              <template #icon><clear-icon /></template>
              {{ t('common.button.clear') }}
            </t-button>
          </t-space>
        </div>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ClearIcon, FileCopyIcon, QrcodeIcon } from 'tdesign-icons-vue-next';
import { computed, ref } from 'vue';

import { useLang } from './lang';

// 使用多语言
const { t } = useLang();
const scanType = ref('normal');

// 扫描页
const scanPlaceholder = computed(() => {
  if (scanType.value === 'delete') {
    return t('productPacking.plsScanDelLabel');
  }
  return t('productPacking.plsScanLabel');
});
const isScanPackage = ref(false);
const scanLabel = ref();
const labelList = ref([]);
const pkgInfo = computed(() => {
  if (labelList.value.length > 0) {
    return labelList.value[0];
  }
  return {};
});
const scan = () => {
  if (scanType.value === 'delete') {
    // todo 删除标签
  }
  msgList.value.push({
    theme: 'success',
    content: `[${scanLabel.value}]${t('productPacking.scanSuccess')}`,
    time: dayjs().format('HH:mm:ss'),
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

.sn-label {
  margin-bottom: 10px;
}

.message {
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  .info {
    width: 100%;
    height: 600px;
    overflow: auto;

    :deep(.t-alert__description) {
      width: 100%;
    }

    .time {
      text-align: right;
    }
  }
}
</style>
