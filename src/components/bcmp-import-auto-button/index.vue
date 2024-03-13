<template>
  <!--  使用v-bind="$attrs"将未显式定义的所有属性透传给子组件t-button -->
  <t-button v-bind="$attrs" :theme="props.theme" @click="handleClick">
    {{ props.buttonText }}
  </t-button>
  <bcmp-import-auto-dialog
    v-model:visible="visible"
    v-bind="importDialogSettings"
    :setting-type="settingType"
    :setting-json="settingJson"
    @close="handleClose"
  ></bcmp-import-auto-dialog>
</template>

<script setup lang="ts" name="BcmpImportAutoButton">
import { defineProps, onMounted, PropType, ref, watch } from 'vue';

import { api } from '@/api/main';
// 首先定义一个接口来描述列配置项
interface ColumnConfig {
  title: string;
  field: string;
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
  // 导入业务类型-通过类型名称读取接口或importSettig文件夹下的配置
  type: {
    type: String,
    default: '导入',
  },
  // 添加 bcmp-import-auto-dialog 组件的部分属性-暂时没用
  // importFileSizeLimit: {
  //   type: Number,
  //   default: 5,
  // },
  // importRowCountLimit: {
  //   type: Number,
  //   default: 50000,
  // },
  // importColumnCountLimit: {
  //   type: Number,
  //   default: 100,
  // },
  // importBatchSize: {
  //   type: Number,
  //   default: 10,
  // },
  // importColumns: {
  //   type: Array as PropType<ColumnConfig[]>,
  //   default: () => [],
  // },
});

const visible = ref(false);

// 处理点击事件
const handleClick = () => {
  // 在这里处理点击逻辑
  visible.value = !visible.value;
};

interface ImportDialogSettings {
  importKey: String;
  importTitle: string;
  importTableName: string;
  templateFileName: string;
  templateFileUrl: string;
  importFileSizeLimit: number;
  importRowCountLimit: number;
  importColumnCountLimit: number;
  importBatchSize: number;
  importColumns: ColumnConfig[];
}

const settingType = ref('db');
const settingJson = ref(null);
// 加载业务类型配置
// loadTypeSetting();
const importDialogSettings = ref<Partial<ImportDialogSettings>>({});

const loadTypeSetting = () => {
  // 加载业务类型配置
  if (props.type !== '') {
    const jsonAdd = `/import/types/${props.type}.json`;
    // 先判断是否存在文件

    fetch(jsonAdd)
      .then((res) => res.json())
      .then((res) => {
        settingJson.value = res;
        setSetting(res);
        settingType.value = 'json';
      })
      .catch((_err) => {
        // 请求失败数据
        // console.log(err);
        loadTypeSettingByURL();
        settingType.value = 'db';
      });
  }
};

const loadTypeSettingByURL = () => {
  // 加载业务类型配置
  if (props.type !== '') {
    api.importManage.getItemByKey({ key: props.type }).then((res) => {
      setSetting(res);
    });
  }
};
const setSetting = (res) => {
  // 成功数据
  if (res) {
    // 过滤insetModel.columnList中isExcel为true的数据
    const filterColumns = res.columnList.filter((item) => item.isTemplate === 1);
    const importList: ColumnConfig[] = [];
    filterColumns.forEach((item) => {
      importList.push({
        title: item.columnDesc,
        field: item.columnField,
      });
    });

    importDialogSettings.value = {
      importKey: res.settingModel.importKeyCode,
      importTitle: res.settingModel.importDesc,
      importTableName: res.settingModel.tableName,
      templateFileName: getFileName(res.settingModel.importTemplateUrl),
      templateFileUrl: res.settingModel.importTemplateUrl,
      importFileSizeLimit: 5,
      importRowCountLimit: 50000,
      importColumnCountLimit: 100,
      importBatchSize: res.settingModel.batchCount,
      importColumns: importList || [],
    };
  }
};
const getFileName = (filePath) => {
  // 假设你有一个完整的URL字符串
  const url = filePath;

  // 截取URL中的文件名部分
  const filenameEncoded = url.split('/').pop().split('?')[0];

  // 将URL编码解码为中文
  const filenameDecoded = decodeURIComponent(filenameEncoded);

  return filenameDecoded;
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
const handleClose = () => {
  emit('close');
};
</script>

<style scoped lang="less">
/* 添加额外的样式 */
</style>
