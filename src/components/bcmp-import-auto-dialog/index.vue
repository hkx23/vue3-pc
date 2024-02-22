<template>
  <t-dialog
    v-model:visible="formImportVisible"
    :close-on-overlay-click="false"
    top="50px"
    width="800px"
    :cancel-btn="null"
    :confirm-btn="null"
    header="导入数据"
  >
    <!-- 导入过程界面 -->
    <cmp-container v-show="processing">
      <!-- 导入过程步骤 -->
      <t-steps :current="current" readonly>
        <t-step-item title="选择EXCEL" content="" />
        <t-step-item title="预览数据" content="" />
        <t-step-item title="配置表单" content="" />
        <t-step-item title="导入数据" content="" />
      </t-steps>
      <!-- #region 第一步：选择导入EXCEL与下载模板 -->
      <div v-if="current == 0">
        <t-space direction="vertical" style="width: 100%">
          <t-row style="width: 100%">
            <t-col flex="auto">
              <ul class="import-tip">
                <li>
                  <span>支持 {{ props.importFileSizeLimit }}MB 以内的xlsx格式文件</span>
                </li>
                <li>
                  <span>文件中数据不能超过{{ props.importRowCountLimit }}行、{{ props.importColumnCountLimit }}列</span>
                </li>
                <li>
                  <span
                    >导入前请下载 <t-link theme="primary" @click="downTemplate">模板文件</t-link>，收集数据后导入</span
                  >
                </li>
              </ul>
            </t-col>
          </t-row>

          <t-upload
            ref="uploadRef"
            v-model="files"
            style="width: 100%"
            :request-method="requestSuccessMethod"
            draggable
            theme="custom"
            @change="handleChange"
          >
            <template #dragContent="params">
              <!-- {{ JSON.stringify(params) }} -->
              <div
                v-if="
                  (params && params.files.length == 0 && !params.dragActive) ||
                  (params && params.files.length > 0 && params.files[0].status == 'fail' && !params.dragActive)
                "
                class="upload-btn"
              >
                <t-space direction="vertical" :size="8">
                  <cloud-upload-icon class="upload-icon" />
                  <span>将文件拖拽到此区域，或 <t-link theme="primary">点击添加</t-link></span
                  ><span class="size-text">文件大小不得超过 {{ props.importFileSizeLimit }} MB</span>
                </t-space>
              </div>
              <p v-if="params && params.dragActive">释放鼠标</p>
              <t-progress
                v-if="params && params.files.length > 0 && params.files[0].status == 'progress'"
                theme="plump"
                :color="{ from: '#3f5ded', to: '#00A870' }"
                stroke-width="16px"
                style="width: 600px"
                :percentage="params.files[0].percent"
              />
            </template>
          </t-upload>
        </t-space>
      </div>
      <!-- #endregion -->
      <!-- #region 第二步：解析模板后，加载数据，设置标题行 -->
      <div v-if="current == 1">
        <t-space direction="vertical" style="width: 100%">
          <t-space style="color: #b5b8be"> 点击任意一行可将其设置为标题行，标题行之前的数据不导入。 </t-space>
          <t-table
            ref="previewTable"
            v-model:activeRowKeys="activeRowKeys"
            row-key="key"
            :data="tableData"
            :columns="columns"
            height="300px"
            :show-header="false"
            :active-row-type="'single'"
            :hover="true"
            bordered
            lazy-load
            @active-change="onActiveChange"
          >
            <template #key-slot="{ col, row, rowIndex }">
              <span v-if="rowIndex + 1 == activeRowKeys[0]" class="row-label">标题行</span>
              <span v-else-if="rowIndex == hoveredRowIndex" class="row-label">标题行</span>
              <span v-else> {{ row[col.colKey] }}</span>
              <!-- <br />
              选中行： {{ activeRowKeys[0] }}
              <br />
              当前行： {{ rowIndex }} -->
            </template>
            <template #t-foot-required>
              <div class="t-table__row-filter-inner">最多可预览前30条数据</div>
            </template>
          </t-table>
        </t-space>
      </div>
      <!-- #endregion -->
      <!-- #region 第三步：针对表格进行表单列配置 -->
      <div v-if="current == 2">
        <t-space direction="vertical" style="width: 100%">
          <t-space style="width: 100%">
            <t-form direction="vertical" size="small" :label-align="'left'" label-width="80px">
              <t-form-item label="表单名称" name="name">
                <t-input v-model="settingFormName" disabled style="width: 200px" />
              </t-form-item>
            </t-form>
            <t-space class="count-alert">
              <t-alert :theme="alertTheme">
                <template #message> 导入 {{ setColumnCount }} 列 / {{ importColumns.length }} 列 </template>
              </t-alert>
            </t-space>
          </t-space>
          <t-table
            ref="settingTable"
            row-key="key"
            :data="settingTableData"
            :columns="settingColumns"
            height="300px"
            :hover="true"
            bordered
            lazy-load
          >
            <template #type-slot-name="{ col, row, rowIndex, colIndex }">
              <t-select
                v-if="rowIndex === 0 && colIndex !== 0"
                v-model="row[col.colKey]"
                filterable
                :options="settingTableOptions"
                placeholder="请选择表单字段"
                @change="handleSelectChange(row[col.colKey], col.colKey)"
              ></t-select>
              <!-- <div v-else-if="settingTableData[0] && settingTableData[0][col.colKey] === 'notset'" class="notset">
                {{ row[col.colKey] }}
              </div> -->
              <div v-else>
                {{ row[col.colKey] }}
              </div>
            </template>
          </t-table>
        </t-space>
      </div>
      <!-- #endregion -->
      <!-- #region 第四步：导入过程，显示进度条 -->
      <div v-if="current == 3">
        <t-space direction="vertical" class="import-progress">
          <t-progress
            theme="line"
            :color="{ from: '#3f5ded', to: '#00A870' }"
            stroke-width="16px"
            style="width: 600px"
            :percentage="0"
          >
            <template #label>
              <t-space> 0/{{ woeksheetRowCount }} </t-space>
            </template>
          </t-progress>
          <p>正在导入数据，请稍候...</p>
        </t-space>
      </div>
      <!-- #endregion -->
    </cmp-container>
    <!-- 导入结果界面 -->
    <cmp-container v-if="!processing" style="height: 300px">
      <div v-if="importAllSuccess" class="import-result">
        <!-- 成功显示 -->

        <t-space direction="vertical">
          <div><check-circle-filled-icon class="success" style="font-size: 68px" /></div>
          <div>
            导入完成，共新增 <span class="success">{{ successCount }}</span> 条数据
          </div>
        </t-space>
      </div>
      <div v-if="!importAllSuccess" class="import-result">
        <!-- 失败显示 -->
        <t-space direction="vertical">
          <div><error-circle-filled-icon class="fail" style="font-size: 68px" /></div>
          <div>
            导入完成，新增 <span class="success">{{ successCount }}</span> 条数据,失败
            <span class="fail">{{ failCount }}</span> 条数据
          </div>
          <div>
            <t-button theme="primary" @click="downErrorList">下载错误报告</t-button>
          </div>
        </t-space>
      </div>
    </cmp-container>
    <template #footer>
      <div v-if="current == 0">
        <t-button theme="default" @click="formImportVisible = false">取消</t-button>
      </div>
      <div v-if="current == 1">
        <t-button theme="default" @click="current = 0">上一步</t-button>
        <t-button theme="primary" @click="previewNext">下一步</t-button>
      </div>
      <div v-if="current == 2">
        <t-button theme="default" @click="current = 1">上一步</t-button>
        <t-button theme="primary" @click="importSubmit">导入</t-button>
      </div>
      <div v-if="current == 3 && processing">
        <t-button theme="primary" :loading="true">导入</t-button>
      </div>
      <div v-if="current == 3 && !processing">
        <t-button theme="primary" @click="formImportVisible = false">完成</t-button>
      </div>
    </template>
  </t-dialog>
</template>

<script setup lang="tsx" name="BcmpImportAutoDialog">
import _ from 'lodash';
import { CheckCircleFilledIcon, CloudUploadIcon, ErrorCircleFilledIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin, RequestMethodResponse, TableRowData, UploadFile } from 'tdesign-vue-next';
import { computed, nextTick, PropType, ref, watch } from 'vue';
import * as XLSX from 'xlsx';

import { api } from '@/api/main';

import { CommonImportMoodel } from './constants';
// 首先定义一个接口来描述列配置项
interface ColumnConfig {
  title: string;
  field: string;
}

type RequestMethod = (files: UploadFile | UploadFile[]) => Promise<RequestMethodResponse>;
// / 00-组件属性定义
const props = defineProps({
  visible: {
    type: Boolean as PropType<boolean>,
    required: true,
  },
  // 导入Key

  importKey: {
    type: String,
    default: '表单名称',
  },
  // 导入标题
  importTitle: {
    type: String,
    default: '表单名称',
  },
  // 导入数据表-后续使用，如果后端可以一个接口实现动态处理，这个参数会使用到
  importTableName: {
    type: String,
    default: '',
  },
  // 导入模板名称
  templateFileName: {
    type: String,
    default: '',
  },
  templateFileUrl: {
    type: String,
    default: '',
  },
  // 导入提交地址
  remoteUrl: {
    type: String,
    default: '',
  },
  // 导入文件大小限制，单位为M，默认为5
  importFileSizeLimit: {
    type: Number,
    default: 5,
  },
  // 导入文件行数限制，默认为50000
  importRowCountLimit: {
    type: Number,
    default: 50000,
  },

  // 导入文件列数限制，默认为100
  importColumnCountLimit: {
    type: Number,
    default: 100,
  },
  // 导入到后端批量处理每批的数量
  importBatchSize: {
    type: Number,
    default: 10,
  },
  // 导入列配置
  importColumns: {
    type: Array as PropType<ColumnConfig[]>,
    default: () => {
      return [];
    },
  },
});
const emit = defineEmits(['update:visible', 'close']);
// ref设置
const previewTable = ref();
const uploadRef = ref();

// 导入标题
const settingFormName = props.importTitle;
// 是否导入过程
const processing = ref(true);
// 导入步骤
const current = ref(0);
// 导入表单是否显示
const formImportVisible = ref(props.visible);

// 上传文件
const files = ref([]);

// excel表格数据解析
const worksheetData = ref<any[]>([]);
const worksheetHeaderData = ref<any[]>([]);
const woeksheetRowCount = ref(0);

// 表格行属性
const hoveredRowIndex = ref(1);
const activeRowKeys = ref([1]);
const tempRowKeys = ref([1]);
const activeRowData = ref([]);

// 导入结果
const importAllSuccess = ref(true);
const successCount = ref(0);
const failCount = ref(0);

// 设置表格数据（第3步的数据集合）
const settingTableData = ref([]);
// 导入表格列关联设置
const settingColumns: any = ref([]);

// 下载结果地址
const errPath = ref('');

// 计算属性 - 根据解析的数据计算出表格头
const columns = computed(() => {
  const tableColumn: Array<TableRowData> = worksheetHeaderData.value.map((item) => {
    return {
      align: 'center',
      ellipsis: true,
      colKey: item,
      title: item,
      width: 200,
    };
  });
  tableColumn.unshift({
    align: 'center',
    colKey: 'key',
    title: '',
    width: 150,
    cell: 'key-slot',
    fixed: 'left',
  });

  return tableColumn;
});

// 计算属性 - 根据解析的数据计算出表格数据
const tableData = computed(() => {
  let keySeq = 1;
  // 只取worksheetData 30条数据
  const result = _.cloneDeep(worksheetData.value.slice(0, 30));
  result.forEach((item) => {
    item.key = keySeq++;
  });
  return result;
});
// 计算属性 - 设置表格的列数如果满足设置成success
const alertTheme = computed(() => {
  return setColumnCount.value === props.importColumns.length ? 'success' : 'warning';
});

// 计算属性 - 表格第一行的下拉框可选项，根据属性importColumns计算
const settingTableOptions = computed(() => {
  const result = [];
  result.push({
    label: '不导入',
    value: 'notset',
  });
  props.importColumns.forEach((item) => {
    result.push({
      label: item.title,
      value: item.field,
    });
  });
  return result;
});

// 计算属性 - 设置了映射关系的列数量
const setColumnCount = computed(() => {
  if (settingTableData.value[0]) {
    let setCount = 0;
    const row = settingTableData.value[0];
    for (let i = 0; i < settingColumns.value.length; i++) {
      const currentColumn = settingColumns.value[i];
      if (currentColumn.colKey !== 'key') {
        if (row[currentColumn.colKey] !== 'notset') {
          setCount++;
        }
      }
    }
    return setCount;
  }
  return 0;
});
// 监控 - 导入表单是否显示
watch(formImportVisible, (value: boolean) => {
  if (value) {
    current.value = 0;
    processing.value = true;
  } else if (current.value === 3 && !processing.value) {
    emit('close');
  }
  emit('update:visible', value);
});
watch(
  () => props.visible,
  (val) => {
    if (!val && current.value === 3 && !processing.value) {
      emit('close');
    }
    formImportVisible.value = val;
  },
  { deep: true },
);

// #region 导入第一步，下载模板，上传模板
// 下载导入模板
const downTemplate = () => {
  // 通过URL下载模板
  const link = document.createElement('a');
  // const importAddress = `/import/template/${props.templateFileName}.xlsx`;
  const importAddress = props.templateFileUrl;
  const fileName = getFileName(importAddress);
  link.href = importAddress;
  link.download = fileName; // 自定义文件名，根据实际情况调整
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 上传状态更新
const handleChange = (value: any, context: any) => {
  if (context.trigger === 'progress-fail') {
    files.value = [];
  } else {
    MessagePlugin.success(`EXCEL解析成功`);
    current.value = 1;
    nextTick(() => {
      // 确保 worksheetData 和 worksheetHeaderData 已经初始化
      if (worksheetData.value && worksheetHeaderData.value) {
        setTimeout(() => {
          files.value = [];
          registerHover();
        }, 1000);
      }
    });
  }
};

// 编辑的时候，需要加载文件列表的时候取路径做处理
const getFileName = (filePath) => {
  // 假设你有一个完整的URL字符串
  const url = filePath;

  // 截取URL中的文件名部分
  const filenameEncoded = url.split('/').pop().split('?')[0];

  // 将URL编码解码为中文
  const filenameDecoded = decodeURIComponent(filenameEncoded);

  return filenameDecoded;
};

// 上传文件处理-文件校验，读取解析EXCEL
const requestSuccessMethod: RequestMethod = async (file: UploadFile) => {
  // 校验逻辑
  if (file.size / 1024 / 1024 > props.importFileSizeLimit) {
    MessagePlugin.error(`只能上传小于${props.importFileSizeLimit}M的文件`);
    return { status: 'fail', response: {} };
  }
  if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    MessagePlugin.error('只能上传xlsx格式文件');
    return { status: 'fail', response: {} };
  }

  try {
    await loadFile(file);
    // 解析成功后，返回成功状态
    return { status: 'success', response: { url: 'none' } };
  } catch (error) {
    MessagePlugin.error(error.message);
    // 在这里可以根据错误类型返回失败状态
    return { status: 'fail', response: {} };
  }
};

// 上传EXCEL文件解析
const loadFile = (res): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsBinaryString(res.raw);
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = e.target?.result;
      if (typeof data !== 'string') {
        reject(new Error('无法读取文件内容'));
        return;
      }

      const workbook = XLSX.read(data, { type: 'binary' });
      if (typeof workbook.Sheets[workbook.SheetNames[0]] === 'undefined') {
        reject(new Error('导入文件格式错误'));
        return;
      }
      // 初始化JSON数组和标题行
      const jsonData: any[] = [];
      const headers: string[] = [];

      const sheetName = workbook.SheetNames[0]; // 假设我们只处理第一个工作表
      const worksheet = workbook.Sheets[sheetName];
      // 获取单元格范围和合并单元格信息
      const range = XLSX.utils.decode_range(worksheet['!ref']);
      const merges = worksheet['!merges'] || [];

      woeksheetRowCount.value = range.e.r;
      if (range.e.c > props.importColumnCountLimit) {
        reject(new Error(`导入文件列数不能超过${props.importColumnCountLimit}列`));
        return;
      }
      if (range.e.r > props.importRowCountLimit) {
        reject(new Error(`导入文件行数不能超过${props.importRowCountLimit}行`));
        return;
      }
      if (range.e.r < 1) {
        reject(new Error('不存在导入数据行,请检查导入文件'));
        return;
      }

      for (let col = range.s.c; col <= range.e.c; col++) {
        const columnHeader = String.fromCharCode(65 + col); // 将列索引转换为字母（A, B, C...）
        headers.push(columnHeader);
      }
      let tempPercent = 0;
      // 遍历数据行，并考虑合并单元格的情况
      for (let row = range.s.r; row <= range.e.r; row++) {
        const rowData: Record<string, string> = {};
        const currentPercent = Math.round((row / range.e.r) * 100);
        if (currentPercent !== tempPercent) {
          uploadRef.value.uploadFilePercent({ file: res, percent: currentPercent });
          tempPercent = currentPercent;
        }

        for (let col = range.s.c; col <= range.e.c; col++) {
          let cellValue = '';

          // 检查当前单元格是否在合并范围内
          for (const merge of merges) {
            const mergedRangeStart = XLSX.utils.decode_cell(merge.s.toString());

            if (mergedRangeStart.r === row && mergedRangeStart.c === col) {
              const mergedRange = XLSX.utils.decode_range(merge.toString());
              cellValue = getMergedCellValue(worksheet, mergedRange);
              break;
            }
          }

          // 如果不在合并范围内，则获取常规单元格值
          if (!cellValue) {
            const cellAddress = { r: row, c: col };
            const encodedCellAddress = XLSX.utils.encode_cell(cellAddress);
            const cell = worksheet[encodedCellAddress];
            cellValue = cell ? cell.v : null;
          }

          if (cellValue !== null) {
            rowData[headers[col - range.s.c]] = cellValue; // 使用当前列对应的标题
          }
        }

        jsonData.push(rowData);
      }
      const filteredData = jsonData.filter((rowItem) => Object.keys(rowItem).length > 1);

      worksheetData.value = filteredData;
      worksheetHeaderData.value = headers;
      resolve(); // 当所有数据解析完成后，resolve promise
    };

    reader.onerror = (error) => {
      reject(error); // 如果发生错误，reject promise
    };
  });
};

// 获取合并单元格
const getMergedCellValue: any = (worksheet: XLSX.WorkSheet, mergedRange: XLSX.Range) => {
  for (let { r } = mergedRange.s; r <= mergedRange.e.r; r++) {
    for (let { c } = mergedRange.s; c <= mergedRange.e.c; c++) {
      const cellAddress = { r, c };
      const cell = XLSX.utils.encode_cell(cellAddress);
      const cellValue = worksheet[cell]?.v;

      if (cellValue) {
        return cellValue;
      }
    }
  }
  return '';
};

// #endregion

// #region 导入第二步，解析EXCEL数据后，预览数据，设置标题行
// 表格选中行，作为标题行，对应下一步的设置表格的列配置
const onActiveChange = (highlightRowKeys) => {
  if (highlightRowKeys && highlightRowKeys.length > 0) {
    activeRowKeys.value = _.cloneDeep(highlightRowKeys);
  } else {
    activeRowKeys.value = _.cloneDeep(tempRowKeys.value);
  }
  tempRowKeys.value = _.cloneDeep(activeRowKeys.value);
  activeRowData.value = tableData.value.filter((item) => activeRowKeys.value.includes(item.key));
  setSettingTableColumns();
};

// 设置悬停行
const registerHover = () => {
  nextTick(() => {
    const tableBody = previewTable.value.$el.querySelector('tbody');
    if (tableBody) {
      tableBody.addEventListener('mouseover', (event) => {
        const targetRow = event.target.closest('tr');
        if (targetRow) {
          const rowIndex = Array.from(tableBody.querySelectorAll('tr')).indexOf(targetRow);
          // 更新悬停行索引
          onMouseOver(rowIndex);
        }
      });

      tableBody.addEventListener('mouseleave', () => {
        onMouseLeave();
      });
    }
  });
};
// 表格鼠标悬停事件
const onMouseOver = (rowIndex) => {
  hoveredRowIndex.value = rowIndex;
  // 根据hoveredRowIndex更新相关数据或样式
};
// 表格鼠标离开事件
const onMouseLeave = () => {
  hoveredRowIndex.value = null;
  // 清除相关数据或样式
};
// 下一页，跳转到第三步的设置页
const previewNext = () => {
  current.value = 2;
  activeRowData.value = tableData.value.filter((item) => activeRowKeys.value.includes(item.key));
  // console.log(activeRowData.value);
  setSettingTableColumns();
  getSettingTableData();
};

// #endregion

// #region 导入第三步，获取第二步设置的标题行，与组件设置的标题进行匹配导入字段
// 设置表格的列配置
const setSettingTableColumns = () => {
  // 循环columns,根据activeRowDatas设置每一列的title
  settingColumns.value = _.cloneDeep(columns.value);
  for (let i = 0; i < settingColumns.value.length; i++) {
    const currentColumn = settingColumns.value[i];
    currentColumn.cell = 'type-slot-name';
    // 设置单元格类名
    currentColumn.className = ({ col, rowIndex }) => {
      if (rowIndex !== 0 && settingTableData.value[0] && settingTableData.value[0][col.colKey] === 'notset') {
        return 'notset';
      }
      return '';
    };
    if ((currentColumn.colKey as keyof (typeof activeRowData.value)[0]) in activeRowData.value[0]) {
      if (currentColumn.colKey !== 'key') {
        currentColumn.title = activeRowData.value[0][currentColumn.colKey];
      }
    }
  }
};

// 设置表格的数据
const getSettingTableData = () => {
  let keySeq = 1;
  const resultTableData = _.cloneDeep(worksheetData.value.slice(activeRowKeys.value[0], activeRowKeys.value[0] + 30));
  resultTableData.forEach((item) => {
    item.key = keySeq++;
  });
  // 在表格数据最前面插入一行，用于设置表格列的title
  // 循环settingColumns，使用每一列的key跟title跟importColumns比对，如果有一样的，设置值
  const insertRow: any = {};
  insertRow.key = '表单字段';
  for (let i = 0; i < settingColumns.value.length; i++) {
    const item = settingColumns.value[i];
    if (item.colKey === 'key') {
      insertRow[item.colKey] = '表单字段';
      continue;
    }
    const currentTitle = item.title;
    const mapValues = props.importColumns.filter((ii) => ii.title === currentTitle || ii.field === currentTitle);
    insertRow[item.colKey] = mapValues[0]?.field || 'notset';
  }

  resultTableData.unshift(insertRow);

  settingTableData.value = resultTableData;
};

// 第一行数据是可选择的，选择变化触发事件
const handleSelectChange = (value, colKey) => {
  if (settingTableData.value[0]) {
    const rowData = settingTableData.value[0];

    // 检查第一行其他列是否已有选中同样的值，如果有，需要把其他行的值，再次设置成notset
    for (let i = 0; i < settingColumns.value.length; i++) {
      const item = settingColumns.value[i];
      if (item.colKey === 'key' || item.colKey === colKey) {
        continue;
      }
      if (rowData[item.colKey] === value) {
        rowData[item.colKey] = 'notset';
      }
    }
  }
};
// 导入提交
const importSubmit = async () => {
  current.value++;
  const importTableData = _.cloneDeep(
    worksheetData.value.slice(activeRowKeys.value[0], activeRowKeys.value[0] + 999999),
  );
  const importHeader = _.cloneDeep(settingTableData.value[0]);
  // 创建一个新的数组，将原始数据按照映射关系进行替换
  const mappedData = importTableData.map((item) => {
    const newItem: { [key: string]: any } = {}; // 使用 any 类型作为临时类型，也可以指定更具体的类型
    for (const key in item) {
      if (key in importHeader) {
        newItem[importHeader[key]] = item[key];
      }
    }
    return newItem;
  });

  const postData: CommonImportMoodel = {
    title: props.importTitle,
    tableName: props.importTableName,
    data: mappedData,
    columns: props.importColumns,
    batchSize: props.importBatchSize,
    importKey: props.importKey,
  };
  // await http
  //   .post<ImportSummary>(props.remoteUrl, postData)
  //   .then((data) => {
  //     errPath.value = data.errorListFilePath;
  //     importAllSuccess.value = data.allSuccess;
  //     successCount.value = data.successCount;
  //     failCount.value = data.failCount;

  //     processing.value = false;
  //   })
  //   .catch(() => {
  //     importAllSuccess.value = false;
  //     processing.value = false;
  //   });
  await api.importManage
    .importData(postData)
    .then((data) => {
      errPath.value = data.errorListFilePath;
      importAllSuccess.value = data.allSuccess;
      successCount.value = data.successCount;
      failCount.value = data.failCount;

      processing.value = false;
    })
    .catch(() => {
      importAllSuccess.value = false;
      processing.value = false;
    });
};
// #endregion

// #region 导入第4步&结果
// 错误文件下载
const downErrorList = () => {
  // 通过URL下载模板
  const link = document.createElement('a');
  const downAddress = errPath.value;
  const fileName = downAddress.substring(downAddress.lastIndexOf('/') + 1);
  link.href = downAddress;
  link.download = fileName; // 自定义文件名，根据实际情况调整
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
// #endregion
</script>

<style scoped lang="less">
.import-tip {
  background: #f5f6f8;
  border-radius: 3px;
  color: #141e31;
  font-size: 14px;
  line-height: 22px;
  padding: 20px 20px 20px 40px;

  li {
    list-style-type: disc;
  }
}

:deep(.t-upload__dragger) {
  width: 100%;
  border: 1px dashed var(--td-brand-color-light);
}

.upload-btn {
  text-align: center;

  .upload-icon {
    font-size: 42px;
    color: var(--td-brand-color);
  }

  .size-text {
    color: #838892;
    font-size: 12px;
    margin-top: 8px;
  }
}

.row-label {
  background: var(--brand-main, #3f5ded);
  color: #fff;
  height: 24px;
  line-height: 24px;
  margin: 0 auto;
  overflow: visible;
  position: relative;
  width: 85px;
  display: block;
}

.row-label::after {
  border: 12px solid transparent;
  border-color: transparent transparent transparent var(--brand-main, #3f5ded);
  border-left-color: var(--brand-main, #3f5ded);
  bottom: 0;
  content: '';
  position: absolute;
  right: -24px;
  top: 0;
}

:deep(.t-table th),
:deep(.t-table td) {
  line-height: 24px;
  padding: var(--td-comp-paddingTB-xs) var(--td-comp-paddingLR-l);
}

:deep(.t-table.t-table__row--active-single tbody > tr.t-table__row--active),
:deep(.t-table.t-table__row--active-multiple tbody > tr.t-table__row--active) {
  background-color: var(--td-brand-color-2);
}

:deep(.t-table.t-table__row--active-single tbody > tr.t-table__row--active td),
:deep(.t-table.t-table__row--active-multiple tbody > tr.t-table__row--active td) {
  font-weight: bold;
}

:deep(.t-table td.notset) {
  background: var(--td-bg-color-container-hover);
}

.count-alert {
  float: right;
}

:deep(.count-alert .t-alert) {
  padding: 8px;

  .t-alert__description {
    font-size: 12px;
    line-height: 16px;
  }

  .t-alert__icon {
    line-height: 16px;
    font-size: 16px;
  }
}

.import-progress {
  width: 100%;
  text-align: center;

  :deep(.t-space-item) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}

.import-result {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}

.success {
  color: var(--td-success-color-6);
}

.fail {
  color: var(--td-warning-color-6);
}
</style>
