<template>
  <t-button :theme="importTheme" variant="base" @click="formUserVisible = true">{{ importText }}</t-button>

  <t-dialog
    v-model:visible="formUserVisible"
    :close-on-overlay-click="false"
    top="25px"
    width="800px"
    :cancel-btn="null"
    :confirm-btn="null"
    header="导入数据"
  >
    <cmp-container>
      <t-steps :current="current" readonly>
        <t-step-item title="选择EXCEL" content="选择EXCEL" />
        <t-step-item title="预览数据" content="预览数据" />
        <t-step-item title="配置表单" content="配置表单" />
        <t-step-item title="导入数据" content="导入数据" />
      </t-steps>
      <div v-show="current == 0">
        <t-space direction="vertical" style="width: 100%">
          <ul class="import-tip">
            <li>
              <span>支持 5MB 以内的xls、xlsx格式文件</span>
            </li>
            <li><span>文件中数据不能超过50000行、500列</span></li>
            <li><span>导入前请下载模板文件，收集数据后导入</span></li>
          </ul>
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
                  (params && params.files.length > 0 && params.files[0].status == 'fail')
                "
                class="upload-btn"
              >
                <t-space direction="vertical" :size="8">
                  <cloud-upload-icon class="upload-icon" />
                  <span>将文件拖拽到此区域，或 <t-link theme="primary">点击添加</t-link></span
                  ><span class="size-text">文件大小不得超过 5 MB</span>
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

              <!-- <ul v-if="files && files.length" style="padding: 0">
                <li v-for="file in files" :key="file.name" style="list-style-type: none">{{ file.name }}</li>
              </ul>
              <template v-else>
                <p v-if="params && params.dragActive">释放鼠标</p>
                <t-button v-else-if="progress < 1"> <cloud-upload-icon /></t-button>
              </template>
              <t-button v-if="files && files.length" size="small" style="margin-top: 36px">更换文件</t-button> -->
              <!-- <span>数据状态：{{params}}</span> -->
            </template>
          </t-upload>
        </t-space>
      </div>
      <div v-show="current == 1">
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
      <div v-show="current == 2">
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
      <div v-show="current == 3">
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
    </cmp-container>
    <template #footer>
      <div v-if="current == 0">
        <t-button theme="default" @click="formUserVisible = false">取消</t-button>
        <!-- <t-button theme="primary">保存</t-button>
     -->
      </div>
      <div v-if="current == 1">
        <t-button theme="default" @click="current--">上一步</t-button>
        <t-button theme="primary" @click="previewNext">下一步</t-button>
      </div>
      <div v-if="current == 2">
        <t-button theme="default" @click="current--">上一步</t-button>
        <t-button theme="primary" @click="importSubmit">导入</t-button>
      </div>
      <div v-if="current == 3">
        <t-button theme="primary" :loading="true">导入</t-button>
      </div>
    </template>
  </t-dialog>
</template>

<script setup lang="tsx" name="BcmpSelectBusiness">
import _ from 'lodash';
import { CloudUploadIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin, RequestMethodResponse, TableRowData, UploadFile } from 'tdesign-vue-next';
import { computed, nextTick, PropType, ref } from 'vue';
import * as XLSX from 'xlsx';

const previewTable = ref();
const hoveredRowIndex = ref(1);
const activeRowKeys = ref([1]);
const tempRowKeys = ref([1]);
const activeRowData = ref([]);
// const settingTitles = ref([]);
const onActiveChange = (highlightRowKeys) => {
  if (highlightRowKeys && highlightRowKeys.length > 0) {
    activeRowKeys.value = _.cloneDeep(highlightRowKeys);
  } else {
    activeRowKeys.value = _.cloneDeep(tempRowKeys.value);
  }
  tempRowKeys.value = _.cloneDeep(activeRowKeys.value);
  activeRowData.value = tableData.value.filter((item) => activeRowKeys.value.includes(item.key));
  console.log(activeRowData.value);
  setSettingTableColumns();
  // console.log(highlightRowKeys, ctx);
};
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
const onMouseOver = (rowIndex) => {
  hoveredRowIndex.value = rowIndex;
  // 根据hoveredRowIndex更新相关数据或样式
};

const onMouseLeave = () => {
  hoveredRowIndex.value = null;
  // 清除相关数据或样式
};
const files = ref([]);
const uploadRef = ref();
const progress = ref(0);
type RequestMethod = (files: UploadFile | UploadFile[]) => Promise<RequestMethodResponse>;
// / 00-组件属性定义
const props = defineProps({
  // 导入按钮文字
  importText: {
    type: String,
    default: '导入',
  },
  // 导入按钮图标
  importIcon: {
    type: [String],
    default: '',
  },
  // 导入按钮样式
  importTheme: {
    type: String as PropType<'default' | 'success' | 'primary' | 'warning' | 'danger'>,
    default: 'default',
  },
});
// 示例代码：自定义上传方法，一个请求上传一个文件
// eslint-disable-next-line
// file 为等待上传的文件信息，用于提供给上传接口。file.raw 表示原始文件

const requestSuccessMethod: RequestMethod = async (file: UploadFile) => {
  // 校验逻辑
  if (file.size / 1024 / 1024 > 5) {
    MessagePlugin.error('只能上传小于5M的文件');
    return { status: 'fail', response: {} };
  }
  if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    MessagePlugin.error('只能上传xlsx格式文件');
    return { status: 'fail', response: {} };
  }

  try {
    await loadFile(file);

    // 如果需要模拟进度条，可以在这里进行（但这里未展示具体实现）
    // const timer = setTimeout(() => {...}, 1000000);

    // 解析成功后，返回成功状态
    return { status: 'success', response: { url: 'https://tdesign.gtimg.com/site/avatar.jpg' } };
  } catch (error) {
    MessagePlugin.error(error.message);
    // 在这里可以根据错误类型返回失败状态
    return { status: 'fail', response: {} };
  }
};

const worksheetData = ref<any[]>([]);
const worksheetHeaderData = ref<any[]>([]);
const woeksheetRowCount = ref(0);
// 上传成功读取数据，走验证接口
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
      if (range.e.c > 500) {
        reject(new Error('导入文件列数不能超过500列'));
        return;
      }
      if (range.e.r > 50000) {
        reject(new Error('导入文件行数不能超过50000行'));
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
      console.log(`arrData${filteredData}`);
      worksheetData.value = filteredData;
      worksheetHeaderData.value = headers;
      setTimeout(() => {
        current.value = 1;
        files.value = [];

        resolve(); // 当所有数据解析完成后，resolve promise
        setTimeout(() => {
          registerHover();
        }, 500);
      }, 500);
    };

    reader.onerror = (error) => {
      reject(error); // 如果发生错误，reject promise
    };
  });
};
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
const handleChange = (value: any, context: any) => {
  console.log(`valueG:${JSON.stringify(value)}`);
  console.log(`progress:${JSON.stringify(progress.value)}`);
  console.log(`context:${JSON.stringify(context)}`);
  if (context.trigger === 'progress-fail') {
    files.value = [];
  } else {
    MessagePlugin.success(`EXCEL解析成功`);
    files.value = [];
  }
};

// const upload = () => {
//   uploadRef.value.triggerUpload();
// };
console.log(props);
const current = ref(0);
const formUserVisible = ref(false);
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

const settingColumns: any = ref([]);
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
    // currentColumn.cell = ( col, row, rowIndex ) => {
    //   debugger;
    //   if (rowIndex === 0) {
    //     return h('t-select', {
    //       modelValue: row[col.colKey],
    //       'onUpdate:modelValue': (val) => {
    //         row[col.colKey] = val;
    //       },
    //       options: settingTableOptions,
    //       placeholder: '请选择表单字段',
    //       clearable: false,
    //     });
    //   }
    //   return <div>{row[col.colKey]}</div>;
    // };
    if ((currentColumn.colKey as keyof (typeof activeRowData.value)[0]) in activeRowData.value[0]) {
      if (currentColumn.colKey !== 'key') {
        currentColumn.title = activeRowData.value[0][currentColumn.colKey];
      }
    }
  }
};
const tableData = computed(() => {
  let keySeq = 1;
  // 只取worksheetData 30条数据
  const result = _.cloneDeep(worksheetData.value.slice(0, 30));
  result.forEach((item) => {
    item.key = keySeq++;
  });
  return result;
});

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

const settingTableData = ref([]);

const settingFormName = ref('物料分类');
const importColumns = ref([
  { title: '分类编码', field: 'categoryCode' },
  { title: '分类名称', field: 'categoryName' },
  { title: '分类描述', field: 'categoryDesc' },
  { title: '计算类型', field: 'reqCalcRuleName' },
  { title: '投料规则', field: 'onboardRuleCodeName' },
]);

const settingTableOptions = computed(() => {
  // 只取worksheetData 30条数据
  const result = [];
  result.push({
    label: '不导入',
    value: 'notset',
  });
  importColumns.value.forEach((item) => {
    result.push({
      label: item.title,
      value: item.field,
    });
  });
  return result;
});
const previewNext = () => {
  current.value++;
  activeRowData.value = tableData.value.filter((item) => activeRowKeys.value.includes(item.key));
  console.log(activeRowData.value);
  setSettingTableColumns();
  getSettingTableData();
};

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
    const mapValues = importColumns.value.filter((ii) => ii.title === currentTitle || ii.field === currentTitle);
    insertRow[item.colKey] = mapValues[0]?.field || 'notset';
  }

  resultTableData.unshift(insertRow);

  settingTableData.value = resultTableData;
};
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

  console.log('handleChange:', value);
};
// 计算 alert 主题
const alertTheme = computed(() => {
  return setColumnCount.value === importColumns.value.length ? 'success' : 'warning';
});
const importSubmit = () => {
  console.log('gogogo');
  current.value++;
  const importTableData = _.cloneDeep(
    worksheetData.value.slice(activeRowKeys.value[0], activeRowKeys.value[0] + 999999),
  );
  console.warn(`导入数据：${JSON.stringify(importTableData)}`);

  const importHeader = _.cloneDeep(settingTableData.value[0]);
  console.warn(`导入关系设置：${JSON.stringify(importHeader)}`);

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

  console.warn(`处理数据：${JSON.stringify(mappedData)}`);
};
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
</style>
