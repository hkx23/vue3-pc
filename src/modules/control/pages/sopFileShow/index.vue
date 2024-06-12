<template>
  <cmp-container :full="true">
    <!-- 扫描区 -->
    <cmp-card>
      <bcmp-workstation-info @change="handleonChange" />
    </cmp-card>
    <cmp-card ref="refPreviewArea" class="pdf-preview-area" :ghost="true">
      <div class="full-screen-btn">
        <t-button theme="primary" shape="square" variant="base" @click="toggleFullScreen">
          <fullscreen-icon v-if="!isFullscreen" size="32" />
          <fullscreen-exit-icon v-if="isFullscreen" size="32" />
        </t-button>
      </div>
      <cmp-container :full="true">
        <cmp-card ref="titleCard" :ghost="true" class="mo-title-area">
          <t-descriptions item-layout="vertical" :column="4" class="mo-title-desc">
            <t-descriptions-item label="工站">总装车间#1/生产01线/刻蚀</t-descriptions-item>
            <t-descriptions-item label="工单">MO20231026001006</t-descriptions-item>
            <t-descriptions-item label="产品编码">713B0239917823</t-descriptions-item>
            <t-descriptions-item label="产品描述">M10单晶P型电池188 2mm*247MM</t-descriptions-item>
          </t-descriptions>
        </cmp-card>
        <cmp-card ref="contentCard" :ghost="true" class="mo-file-area">
          <cmp-pdf-preview :pdf-url="pdfURL" />
          <div class="float-menu-list">
            <t-collapse borderless="true">
              <t-collapse-panel value="3" header="展开3个文件">
                <t-list>
                  <t-list-item>
                    <t-link>链接1</t-link>
                  </t-list-item>
                  <t-list-item>
                    <t-link class="select-file">链接2</t-link>
                  </t-list-item>
                  <t-list-item>
                    <t-link>链接3</t-link>
                  </t-list-item>
                </t-list>
              </t-collapse-panel>
            </t-collapse>
          </div>
        </cmp-card>
      </cmp-container>
    </cmp-card>
  </cmp-container>
</template>

<script lang="ts">
export default {
  name: 'SopFileShow',
};
</script>
<script setup lang="ts">
import { useFullscreen } from '@vueuse/core';
import { FullscreenExitIcon, FullscreenIcon } from 'tdesign-icons-vue-next';
import { NotifyPlugin } from 'tdesign-vue-next';
import { ref } from 'vue';

import BcmpWorkstationInfo from '@/components/bcmp-workstation-info/index.vue';
import CmpPdfPreview from '@/components/cmp-pdf-preview/index.vue';
import { useUserStore } from '@/store';

import { useLang } from './lang';

const { t } = useLang();
const userStore = useUserStore();
const pdfURL =
  'http://10.140.38.205:7001/scm/Common/%E5%B8%B8%E9%9D%92-%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E4%BF%A1%E6%81%AF_20240605.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20240606%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240606T073607Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=6b3d4c9d52c1912d134dab1920ef867bccd72d81bc11f152c404ef39f62b8fa9';

const mainform = ref({
  serialNumber: '', // 条码
  keypartCode: '', // 关键件
  workshopCode: '',
  workshopName: '',
  workCenterId: '',
  workCenterCode: '',
  workCenterName: '',
  workStationId: '',
  workStationCode: '',
  workStationName: '',
  processId: '',
  isCommit: false,
});

// 切换工站
const handleonChange = () => {
  Init();
};
const Init = async () => {
  mainform.value.serialNumber = '';
  mainform.value.keypartCode = '';

  // 底座完成后从底座获取
  mainform.value.workCenterId = userStore.currUserOrgInfo.workCenterId;
  mainform.value.workStationId = userStore.currUserOrgInfo.workStationId;
  mainform.value.processId = userStore.currUserOrgInfo.processId;

  mainform.value.workCenterCode = userStore.currUserOrgInfo.workCenterCode;
  mainform.value.workCenterName = userStore.currUserOrgInfo.workCenterName;

  mainform.value.workStationCode = userStore.currUserOrgInfo.workStationCode;
  mainform.value.workStationName = userStore.currUserOrgInfo.workStationName;

  mainform.value.workshopCode = userStore.currUserOrgInfo.workShopCode;
  mainform.value.workshopName = userStore.currUserOrgInfo.workShopName;

  if (!mainform.value.workStationId) {
    NotifyPlugin.error({
      title: t('wipCollect.tip'),
      content: t('wipCollect.tipsetting'),
      duration: 2000,
      closeBtn: true,
    });
  }
};
const refPreviewArea = ref<HTMLElement | null>(null);

const { isFullscreen, enter, exit } = useFullscreen(refPreviewArea);
function toggleFullScreen() {
  if (!isFullscreen.value) {
    enter(); // 或者使用 this.$refs.myDiv
  } else {
    exit();
  }
}
</script>

<style lang="less" scoped>
.pdf-preview-area {
  background: white;

  .cmp-card {
    :deep(.t-card__body) {
      padding: 0 !important;
    }
  }

  .mo-title-area {
    background: var(--td-brand-color);
    padding: 12px;
    color: white;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;

    .mo-title-desc {
      color: white;

      :deep(.t-descriptions__body .t-descriptions__label) {
        color: #b3b3b3;
      }
    }
  }
}

.full-screen-btn {
  position: absolute;
  right: 8px;
  top: 8px;
  display: block;
  z-index: 999;
  color: white;
}

.float-menu-list {
  position: absolute;
  left: 0;
  top: 10px;
  padding: 0;
  background: #3f5cedaa;
  z-index: 999;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  color: white;

  .t-collapse {
    color: white;
    border-bottom: 0;
    background: transparent;

    .t-collapse-panel__body {
      /* background: var(--td-bg-color-container); */
      background: transparent;
    }
  }

  :deep(.t-collapse.t--border-less .t-collapse-panel__body) {
    background: transparent;
    border: none;

    .t-collapse-panel__content {
      padding: 4px 32px;

      .t-list {
        background: transparent;

        .t-list-item {
          padding: 4px;

          .t-link--theme-default {
            color: rgb(255 255 255 / 67.1%);
          }

          .select-file {
            color: white;
          }
        }
      }
    }
  }
}
</style>
