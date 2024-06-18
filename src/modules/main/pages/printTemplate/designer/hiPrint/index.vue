<template>
  <cmp-container :full="true">
    <cmp-row style="height: 60px">
      <cmp-card :span="12">
        <div class="template-title">{{ props.templateTitle ? props.templateTitle.split('/').pop() : '' }}</div>
        <t-space>
          <t-radio-group default-value="A4">
            <template v-for="(paper, type) in paperTypes" :key="type">
              <t-radio-button :value="type" @click="setPaper(type, paper)">{{ type }}</t-radio-button>
            </template>
            <t-popup v-model="paperPopVisible" trigger="click">
              <t-radio-button value="Custom"
                >自定义纸张{{ curPaper?.type == 'other' ? ` (${paperWidth} x ${paperHeight} mm)` : '' }}</t-radio-button
              >
              <template #content>
                <t-space direction="vertical">
                  <h4>设置纸张宽高(mm)</h4>
                  <div>
                    <t-input-number v-model="paperWidth" width="80px" theme="column" placeholder="宽度" min="1" /> x
                    <t-input-number v-model="paperHeight" width="80px" theme="column" placeholder="高度" min="1" />
                  </div>
                  <t-button block @click="setOtherPaper">确定</t-button>
                </t-space>
              </template>
            </t-popup>
          </t-radio-group>
          <t-input-number v-model="scaleValue" :min="10" :max="300" :step="10" width="60px" @change="changeScale" />
        </t-space>
        <div style="float: right">
          <t-upload
            theme="custom"
            accept=".hi"
            :use-mock-progress="false"
            :show-upload-progress="false"
            :request-method="importJson"
            style="display: inline-block; margin-right: var(--td-comp-margin-s)"
          >
            <t-button theme="default">导入</t-button>
          </t-upload>
          <t-button theme="default" @click="exportJson">导出</t-button>
          <t-button theme="default" @click="rotatePaper">旋转</t-button>
          <t-button theme="default" @click="preview">预览</t-button>
          <t-button theme="default" @click="print">打印</t-button>
          <t-button theme="primary" @click="save">保存</t-button>
        </div>
      </cmp-card>
    </cmp-row>
    <t-dialog v-model:visible="previewVisible" :width="previewWidth" :footer="false">
      <template #header>
        <t-space>
          <div>打印预览</div>
          <t-button theme="primary" @click="exportPdf">导出PDF</t-button>
          <t-button theme="primary" @click="print">打印</t-button>
        </t-space>
      </template>
      <div ref="previewContainer" style="margin: -16px"></div>
    </t-dialog>
    <cmp-row>
      <cmp-card :span="3">
        <div class="rect-printElement-types hiprintEpContainer"></div>
      </cmp-card>
      <cmp-card :span="6" class="print-template-container">
        <div class="hiprint-printTemplate"></div>
      </cmp-card>
      <cmp-card :span="3">
        <div class="PrintElementOptionSetting"></div>
      </cmp-card>
    </cmp-row>
  </cmp-container>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { defaultElementTypeProvider, hiprint } from 'vue-plugin-hiprint';

import { DesignerArgs } from '../../constants';

const paperTypes = {
  A3: {
    width: 420,
    height: 296.6,
  },
  A4: {
    width: 210,
    height: 296.6,
  },
  A5: {
    width: 210,
    height: 147.6,
  },
  B3: {
    width: 500,
    height: 352.6,
  },
  B4: {
    width: 250,
    height: 352.6,
  },
  B5: {
    width: 250,
    height: 175.6,
  },
};

const props = defineProps({
  templateTitle: String,
  templateBody: String,
  printData: Object,
});

const emit = defineEmits(['save']);

watch(
  () => props.templateTitle,
  (newVal) => {
    templateName.value = newVal;
  },
);

const templateName = ref(props.templateTitle || '未命名模板');

const previewVisible = ref(false);
const previewWidth = ref();
const previewContainer = ref();

const curPaper = ref();
const paperPopVisible = ref(false);
const paperHeight = ref();
const paperWidth = ref();
const hiprintTemplate = ref(undefined);
const scaleValue = ref(100);

onMounted(() => {
  init();
  // curPaper.value = paperTypes.A4;
  setPaper('A4', paperTypes.A4);
});

/**
 * 初始化
 */
const init = () => {
  hiprint.init({
    // eslint-disable-next-line new-cap
    providers: [new defaultElementTypeProvider()],
    // lang: this.$parent.lang
  });
  hiprint.PrintElementTypeManager.build('.hiprintEpContainer', 'defaultModule');

  hiprintTemplate.value = new hiprint.PrintTemplate({
    template: props.templateBody ? JSON.parse(props.templateBody) : {},
    dataMode: 1, // 1:getJson 其他：getJsonTid 默认1
    history: true, // 是否需要 撤销重做功能
    // onDataChanged: (type, json) => {
    //   console.log(type); // 新增、移动、删除、修改(参数调整)、大小、旋转
    //   console.log(json); // 返回 template
    //   // 更新模板
    //   // hiprintTemplate.update(json)
    //   // console.log(hiprintTemplate.historyList)
    // },
    // 图片选择功能
    onImageChooseClick: (target) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target.result;
          target.refresh(url, {
            // auto: true, // 根据图片宽高自动等比(宽>高?width:height)
            // width: true, // 按宽调整高
            // height: true, // 按高调整宽
            real: true, // 根据图片实际尺寸调整(转pt)
          });
        };
        reader.readAsDataURL(file);
      };
      input.click();
    },
    settingContainer: '.PrintElementOptionSetting',
  });
  hiprintTemplate.value.design('.hiprint-printTemplate');
  // 获取当前放大比例, 当zoom时传true 才会有
  scaleValue.value = (hiprintTemplate.value.editingPanel.scale || 1) * 100;
};

/**
 * 设置纸张大小
 * @param type [A3, A4, A5, B3, B4, B5, other]
 * @param value {width,height} mm
 */
const setPaper = (type, value) => {
  try {
    if (Object.keys(paperTypes).includes(type)) {
      curPaper.value = { type, width: value.width, height: value.height };
      hiprintTemplate.value.setPaper(value.width, value.height);
    } else {
      curPaper.value = { type: 'other', width: value.width, height: value.height };
      hiprintTemplate.value.setPaper(value.width, value.height);
    }
  } catch (error) {
    // this.$message.error(`操作失败: ${error}`);
  }
};

const setOtherPaper = () => {
  const value = {
    width: paperWidth.value,
    height: paperHeight.value,
  };
  paperPopVisible.value = false;
  setPaper('other', value);
};

const rotatePaper = () => {
  hiprintTemplate.value.rotatePaper();
};

const changeScale = () => {
  hiprintTemplate.value.zoom(scaleValue.value / 100, true);
};

const exportJson = () => {
  const json = JSON.stringify(hiprintTemplate.value.getJson() || {});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([json], { type: 'text/plain' }));
  a.download = `${templateName.value}.hi`;
  a.click();
};

const importJson = (file) => {
  return new Promise((resolve, reject) => {
    templateName.value = file.name;
    file.raw
      .text()
      .then((text) => {
        const json = JSON.parse(text);
        hiprintTemplate.value.update(json);
        // rotatePaper();
        setTimeout(() => {
          rotatePaper();
        }, 500);
        resolve({ status: 'success', response: { message: '导入成功' } });
      })
      .catch((error) => {
        console.error('Error reading file:', error);
        reject(new Error('文件读取失败'));
      });
  });
};

const print = () => {
  hiprintTemplate.value.print(props.printData || {});
};

const exportPdf = () => {
  hiprintTemplate.value.toPdf(props.printData, '打印预览pdf');
};

const preview = () => {
  previewVisible.value = true;
  const width = hiprintTemplate.value.editingPanel ? hiprintTemplate.value.editingPanel.width : curPaper.value.width;
  previewWidth.value = `${width + 1}mm`;
  setTimeout(() => {
    previewContainer.value.innerHTML = hiprintTemplate.value.getHtml(props.printData || {}).html();
  }, 500);
};

const save = () => {
  const json = hiprintTemplate.value.getJson();
  const args = {
    fileName: templateName.value,
    fileContent: json,
  } as DesignerArgs;

  emit('save', args);
};
</script>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style>
@import './print-lock.css';
</style>
<style scoped lang="less">
.template-title {
  font-weight: 700;
  display: inline;
  margin-right: 48px;
  top: 5px;
  position: relative;
}

/deep/ .hiprint-printElement-type > li > ul > li > a {
  // padding: 4px 4px;
  color: var(--td-brand-color);
  height: 48px;
  height: auto;
  text-overflow: ellipsis;

  &:hover {
    background-color: var(--td-brand-color-light);
  }
}

.print-template-container {
  /deep/ .t-card__body {
    padding: 16px;
  }
}
</style>
