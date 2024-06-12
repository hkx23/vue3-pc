<template>
  <div id="pdfContainer" class="pdf-container">
    <t-loading v-if="loading" class="center-loading" />

    <!--此处根据pdf的页数动态生成相应数量的canvas画布-->
    <!-- navigation
          :pagination="{ clickable: true }"
          :centered-slides="true"
          :zoom="true"
          :autoplay="{
            delay: 10000,
            disableOnInteraction: false,
          }" -->
    <div class="swiper-container">
      <div class="file-info">
        <swiper
          :modules="modules"
          :navigation="navigationEnable"
          :pagination="paginationOption"
          :centered-slides="true"
          :zoom="zoomEnable"
          :autoplay="delayOption"
          :slides-per-view="1"
          :space-between="50"
          @swiper="onSwiper"
          @slide-change="onSlideChange"
          @autoplay-time-left="onAutoplayTimeLeft"
        >
          <swiper-slide v-for="pageIndex in pdfPages" :key="pageIndex">
            <div class="swiper-zoom-container">
              <canvas :id="`pdf-canvas-` + pageIndex" :key="pageIndex" class="pdf-canvas"></canvas>
            </div>
          </swiper-slide>
          <template #container-end>
            <div class="autoplay-progress">
              <svg ref="progressCircle" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref="progressContent"></span>
            </div>
          </template>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="CmpPdfPreview">
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';

import * as pdfjsLib from 'pdfjs-dist';
// import Swiper core and required modules
import { A11y, Autoplay, Navigation, Pagination, Scrollbar, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { nextTick, onMounted, ref, watch } from 'vue';

const props = defineProps<{
  pdfUrl?: string;
}>();

const modules = [Navigation, Pagination, Scrollbar, A11y, Autoplay, Zoom];
const onSwiper = (swiper) => {
  console.log(swiper);
};
const loading = ref(false);

const delayOption = {
  delay: 10000,
  disableOnInteraction: false,
} as any;
const zoomEnable = true as any;
const navigationEnable = true as any;
const paginationOption = {
  clickable: true,
} as any;
const progressCircle = ref(null);
const progressContent = ref(null);
const onAutoplayTimeLeft = (s, time, progress) => {
  progressCircle.value.style.setProperty('--progress', 1 - progress);
  progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
};
const onSlideChange = () => {
  console.log('slide change');
};
let pdfDoc: any = ''; // 文档内容—必须使用非响应式存储
const pdfPages = ref(0); // pdf文件的页数
const pdfUrlValue = ref(''); // pdf文件的链接
const pdfScale = ref(1.0); // 缩放比例
// 调用loadFile方法
onMounted(() => {
  pdfUrlValue.value = props.pdfUrl;
  loadFile(pdfUrlValue.value);
});
// 获取pdf文档流与pdf文件的页数
const loadFile = async (url) => {
  loading.value = true;
  // 设置PDFJS使用worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/libs/pdfjs/pdf.worker.min.js';
  const loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise
    .then((pdf) => {
      console.log(pdf);
      pdfDoc = pdf;
      pdfPages.value = pdf.numPages;
      nextTick(() => {
        renderPage(1);
      });
    })
    .finally(() => {
      loading.value = false;
    });
};

// 监控props.pdfUrl的变化,触发loadFile方法
watch(
  () => props.pdfUrl,
  (newValue, oldValue) => {
    if (newValue !== oldValue) {
      pdfUrlValue.value = newValue;
      loadFile(pdfUrlValue.value);
    }
  },
  {
    immediate: true,
  },
);

const viewParentRef = ref<HTMLElement>();
// 渲染pdf文件
const renderPage = (numV: number) => {
  pdfDoc
    .getPage(numV)
    .then((page) => {
      const canvasId = `pdf-canvas-${numV}`;
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      viewParentRef.value = canvas.parentElement;

      if (!viewParentRef.value) {
        console.error('Parent element not found.');
        return;
      }

      const ctx = canvas.getContext('2d');

      // 直接使用父元素的CSS像素尺寸
      const parentWidth = viewParentRef.value.clientWidth;
      const parentHeight = viewParentRef.value.clientHeight;

      // 计算PDF页面的视口尺寸，使其适应父元素大小，同时考虑pdfScale
      const viewportWidth = parentWidth * pdfScale.value;
      const viewportHeight = parentHeight * pdfScale.value;
      const viewport = page.getViewport({
        scale: Math.min(
          viewportWidth / page.getViewport({ scale: 1 }).width,
          viewportHeight / page.getViewport({ scale: 1 }).height,
        ),
      });

      // 设置canvas的实际像素尺寸等于其CSS尺寸，因为这里我们不直接处理设备像素比
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      // 设置canvas的样式尺寸也直接等于其实际尺寸
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      const renderContext = {
        canvasContext: ctx,
        viewport,
      };
      page.render(renderContext);

      if (numV < pdfPages.value - 1) {
        // 修正判断条件
        renderPage(numV + 1);
      }
    })
    .catch((error) => {
      console.error('Error rendering page:', error);
    });
};
</script>

<style lang="less" scoped>
.pdf-container {
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;

  .swiper-container {
    display: flex;
    flex: 1;
    flex-direction: column;

    .mo-info {
      height: 60px;
      background: blue;
    }

    .file-info {
      flex: 1;
      display: flex;
      text-align: center;
      vertical-align: middle;

      .swiper-slide {
        padding: 36px;

        .swiper-zoom-container {
          // background: #0000ff05;
          border-radius: 8px;

          .pdf-canvas {
            overflow-wrap: break-word;
            box-shadow: 0 3px 6px rgb(0 0 0 / 10%);
          }
        }
      }
    }
  }
}

.pdf-preview {
  position: relative;
  height: 100vh;
  padding: 20px 0;
  box-sizing: border-box;
  background-color: e9e9e9;
}

.pdf-wrap {
  overflow-y: auto;
}

.autoplay-progress {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--swiper-theme-color);
}

.autoplay-progress svg {
  --progress: 0;

  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: var(--swiper-theme-color);
  fill: none;
  stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
}

.center-loading {
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
}
</style>
