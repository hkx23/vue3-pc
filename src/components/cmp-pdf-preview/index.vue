<template>
  <div id="pdfContainer" class="pdf-container">
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
import { computed, nextTick, onMounted, ref } from 'vue';

const modules = [Navigation, Pagination, Scrollbar, A11y, Autoplay, Zoom];
const onSwiper = (swiper) => {
  console.log(swiper);
};
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
const pdfUrl = ref(''); // pdf文件的链接
const pdfScale = ref(1.0); // 缩放比例
const currentFile = ref(null);
const scale = computed(() => `transform:scale(${pdfScale.value})`);

function pageZoomOut() {
  if (pdfScale.value < 2) {
    pdfScale.value += 0.1;
    nextTick(() => {
      renderPage(1);
    });
  }
}
function pageZoomIn() {
  if (pdfScale.value > 1) {
    pdfScale.value -= 0.1;
    nextTick(() => {
      renderPage(1);
    });
  }
}

// 调用loadFile方法
onMounted(() => {
  pdfUrl.value =
    'http://10.140.38.205:7001/scm/Common/%E5%B7%A5%E6%97%B6%E7%AE%A1%E7%90%86%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C_20240607140627.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20240607%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240607T060904Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=09b6d7f2a72d6b17ed7fb3deb74e807754028e004703986c8498e6ea2e1e9b06';
  loadFile(pdfUrl.value);
});
// 获取pdf文档流与pdf文件的页数
const loadFile = async (url) => {
  // 设置PDFJS使用worker
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/libs/pdfjs/pdf.worker.min.js';
  const loadingTask = pdfjsLib.getDocument(url);
  loadingTask.promise.then((pdf) => {
    console.log(pdf);
    pdfDoc = pdf;
    pdfPages.value = pdf.numPages;
    nextTick(() => {
      renderPage(1);
    });
  });
};

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
</style>
