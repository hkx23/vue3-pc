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
          <div class="float-menu-list">
            <t-collapse v-model="currentItem" :borderless="true">
              <t-collapse-panel value="1" :header="expendHeader">
                <t-list>
                  <t-list-item v-for="(item, index) in fileList" :key="index">
                    <t-link
                      :class="{ 'select-file': selectFileIndex == index }"
                      @click="selectFileClickFn(item, index)"
                      >{{ index + 1 + '.' + item.fileName }}</t-link
                    >
                  </t-list-item>
                </t-list>
              </t-collapse-panel>
            </t-collapse>
          </div>
          <!-- 显示PDF -->
          <cmp-pdf-preview v-if="displayComponent === 'pdf'" :pdf-url="currentFileUrl" />
          <!-- 显示视频 -->
          <div v-if="displayComponent === 'video'" class="video-area">
            <cmp-video autoplay :src="currentFileUrl" />
          </div>
          <!-- 显示图片 -->
          <div v-if="displayComponent === 'image'" class="video-area">
            <t-image :src="currentFileUrl" fit="contain" />
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
import { computed, onMounted, ref } from 'vue';

import { api } from '@/api/control';
import BcmpWorkstationInfo from '@/components/bcmp-workstation-info/index.vue';
import CmpPdfPreview from '@/components/cmp-pdf-preview/index.vue';
import CmpVideo from '@/components/cmp-video/index.vue';
import { useUserStore } from '@/store';

import { useLang } from './lang';

const { t } = useLang();
const userStore = useUserStore();
// const loading = ref(false);

const currentItem = ref([]);
const currentFileUrl = ref('');
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

// expendHeader改成计算属性,如果为选择,则根据文件列表数量-显示文字为 展开X个文件
const expendHeader = computed(() => {
  if (currentItem.value.length === 0) {
    return `展开${fileCount.value}个文件`;
  }
  return '收起';
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
  onGetFileList();
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
const selectFileIndex = ref(0);
const currentFileName = ref('');
const selectFileClickFn = (item, index) => {
  currentFileUrl.value = item.fileUrl;
  currentFileName.value = item.fileName;
  selectFileIndex.value = index;
};

const fileList = ref<any[]>([]);
const fileCount = ref(0);
// 获取作业指导书列表
const onGetFileList = async () => {
  const getFileCondition: any = {
    pageNum: 1,
    pageSize: 50,
    filters: [
      {
        field: 'status',
        operator: 'EQ',
        value: 'EFFECTIVE',
      },
      {
        field: 'sopCategory',
        operator: 'EQ',
        value: 'ZY',
      },
      {
        field: 'mitemId',
        operator: 'EQ',
        value: '7',
      },
      {
        field: 'processId',
        operator: 'EQ',
        value: '1738026010655346690',
      },
      {
        field: 'workcenterId',
        operator: 'EQ',
        value: '1739886725355900930',
      },
    ],
  };
  const res = await api.sopFile.search(getFileCondition); // 获取第二节点的数据
  fileList.value = res.list; // 表格数据赋值
  fileCount.value = res.total;
  if (fileList.value && fileList.value.length > 0) {
    selectFileClickFn(fileList.value[0], 0);
  }
};

onMounted(() => {
  Init();
});

const getFileType = (url: string): string => {
  const extension = url.split('.').pop()?.toLowerCase();
  if (!extension) return '';
  return ['pdf', 'mp4', 'jpg', 'jpeg', 'png', 'gif'].includes(extension) ? extension : 'unknown';
};

const displayComponent = computed(() => {
  const fileType = getFileType(currentFileName.value);
  switch (fileType) {
    case 'pdf':
      return 'pdf';
    case 'mp4':
      return 'video';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'image';
    default:
      // 处理未知类型的文件或提供一个默认组件
      return 'unknown';
  }
});
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

.video-area {
  padding: 80px;
  text-align: center;
}
</style>
