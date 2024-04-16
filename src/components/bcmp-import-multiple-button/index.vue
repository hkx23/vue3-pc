<template>
  <!--  使用v-bind="$attrs"将未显式定义的所有属性透传给子组件t-button -->
  <t-button v-bind="$attrs" :theme="props.theme" @click="handleClick">
    {{ props.buttonText }}
  </t-button>
  <import-dialog v-model:visible="visible" v-bind="importDialogSettings" @close="handleClose"></import-dialog>
</template>

<script setup lang="ts" name="BcmpImportMultipleButton">
import { defineProps, onMounted, PropType, ref, watch } from 'vue';

import ImportDialog from '@/components/bcmp-import-multiple-dialog/index.vue';
// 首先定义一个接口来描述列配置项
interface ColumnConfig {
  title: string;
  field: string;
  list: ColumnConfig[];
}
// 定义默认属性和用户可自定义的属性
const props = defineProps({
  // 自定义默认主题
  theme: {
    type: String as PropType<'default' | 'success' | 'primary' | 'warning' | 'danger'>,
    default: 'default',
  },
  // 自定义按钮文本
  buttonText: {
    type: String,
    default: '导入',
  },
  // 导入业务类型-通过类型名称读取importSettig文件夹下的配置
  type: {
    type: String,
    default: '导入',
  },
  // 添加 bcmp-import-dialog 组件的所有属性
  importTitle: {
    type: String,
    default: '表单名称',
  },
  importTableName: {
    type: String,
    default: '',
  },
  templateFileName: {
    type: String,
    default: '',
  },
  remoteUrl: {
    type: String,
    default: '',
  },
  importFileSizeLimit: {
    type: Number,
    default: 5,
  },
  importRowCountLimit: {
    type: Number,
    default: 50000,
  },
  importColumnCountLimit: {
    type: Number,
    default: 100,
  },
  importBatchSize: {
    type: Number,
    default: 10,
  },
  importColumns: {
    type: Array as PropType<ColumnConfig[]>,
    default: () => [],
  },
});

const visible = ref(false);

// 处理点击事件
const handleClick = () => {
  // 在这里处理点击逻辑
  visible.value = !visible.value;
};

interface ImportDialogSettings {
  importTitle: string;
  importTableName: string;
  templateFileName: string;
  remoteUrl: string;
  importFileSizeLimit: number;
  importRowCountLimit: number;
  importColumnCountLimit: number;
  importBatchSize: number;
  importColumns: ColumnConfig[];
}

// 加载业务类型配置
// loadTypeSetting();
const importDialogSettings = ref<Partial<ImportDialogSettings>>({});
const loadTypeSetting = () => {
  // 加载业务类型配置
  if (props.type !== '') {
    const jsonAdd = `/import/types/${props.type}.json`;
    fetch(jsonAdd)
      .then((res) => res.json())
      .then((jsonConfig) => {
        // 成功数据
        if (jsonConfig) {
          importDialogSettings.value = {
            importTitle: jsonConfig.importTitle,
            importTableName: jsonConfig.importTableName,
            templateFileName: jsonConfig.templateFileName,
            remoteUrl: jsonConfig.remoteUrl,
            importFileSizeLimit: jsonConfig.importFileSizeLimit,
            importRowCountLimit: jsonConfig.importRowCountLimit,
            importColumnCountLimit: jsonConfig.importColumnCountLimit,
            importBatchSize: jsonConfig.importBatchSize,
            importColumns: jsonConfig.importColumns || [],
          };
        } else {
          // 如果JSON配置为空，则使用props的默认值
          importDialogSettings.value = {
            importTitle: props.importTitle,
            importTableName: props.importTableName,
            templateFileName: props.templateFileName,
            remoteUrl: props.remoteUrl,
            importFileSizeLimit: props.importFileSizeLimit,
            importRowCountLimit: props.importRowCountLimit,
            importColumnCountLimit: props.importColumnCountLimit,
            importBatchSize: props.importBatchSize,
            importColumns: props.importColumns,
          };
        }
      })
      .catch((_err) => {
        // console.log(err);
      });
  }
};

// 初始化远程数据
onMounted(() => {
  if (props.type) {
    loadTypeSetting();
  }
});
watch(
  () => props.type,
  (_val) => {
    // console.log(val);
    loadTypeSetting();
  },
  { deep: true },
);
const emit = defineEmits(['close']);
const handleClose = (data) => {
  emit('close', data);
};
</script>

<style scoped lang="less">
/* 添加额外的样式 */
</style>
