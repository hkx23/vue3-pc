<template>
  <!-- 子from -->
  <detailed
    :type-show="parentTypeShow"
    :detailed-show="detailedShow"
    :btn-show-disable="{ add: btnShowDisable.add, delete: btnShowDisable.delete }"
    :word-center-id="workCenterId"
    :new-arr="newArr"
    :data="data"
    :next-arr="arr"
    :btn-show="btnShow"
    :type-detailed="typeDetailed"
    :disabled-word="disabledWord"
    :disabled-parent="disabledParent"
    @added-show="onHandleSave"
    @form-clear="onFormClear"
    @child-default="onChildDefault"
    @delete="onDelete"
  ></detailed>
  <cmp-container :full="true">
    <cmp-card :span="12">
      <t-tabs v-model="valueItem" @change="onHandelArr">
        <t-tab-panel v-for="item in allType" :key="item.wcType" :value="item.id" :label="item.wcType">
          <template #label>
            <div>{{ item.wcType }}{{ item.code !== 0 ? `(${item.code})` : '' }}</div>
          </template>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
    <cmp-card :span="12">
      <cmp-query :opts="opts" @submit="onInput"></cmp-query>
    </cmp-card>
    <cmp-card ref="tableCardRef" :span="12">
      <t-space style="text-align: end; width: 100%; margin-bottom: 8px">
        <t-space size="small" :align="'end'">
          <t-button theme="primary" variant="base" @click="onHandelAdded">新增</t-button>
          <t-button theme="default" variant="base">导出</t-button>
        </t-space>
      </t-space>

      <!-- 表格 -->
      <t-enhanced-table
        ref="tableRef"
        row-key="id"
        :columns="columns"
        :data="workData"
        resizable
        :tree="treeConfig"
        :max-height="boxHeight"
        :loading="loading"
        lazy-load
      >
        <template #wcCode="{ row }">
          <div>
            <t-link theme="primary" underline @click="onHandelCenter(row)">{{ row.wcCode }} </t-link>
          </div>
        </template>
        <template #workshopName="{ row }">
          <div>{{ row.workshopCode }}-{{ row.workshopName }}</div>
        </template>
        <template #parentWcCode="{ row }">
          <div>{{ row.parentWcName ? row.parentWcName : '-' }}</div>
        </template>
        <template #state="{ row }">
          <div>{{ row.state ? '启用' : '禁用' }}</div>
        </template>
        <template #op="{ row }">
          <t-space :size="8">
            <!-- 添加子 -->
            <t-link theme="primary" @click="onAddChilde(row)">新增</t-link>
            <t-link theme="primary" @click="onClickEdit(row)">编辑</t-link>
            <!-- 启用禁用 -->
            <t-popconfirm :content="row.state ? '确认禁用吗' : '确认启用吗'" @confirm="onDefult(row)">
              <t-link theme="primary">{{ row.state == 1 ? '禁用' : '启用' }}</t-link>
            </t-popconfirm>
          </t-space>
        </template>
      </t-enhanced-table>
      <t-pagination
        v-model="page.current"
        v-model:pageSize="page.pageSize"
        :total="page.total"
        show-jumper
        style="margin: 20px 0"
        @page-size-change="onPageSizeChange"
        @current-change="onCurrentChange"
      />
    </cmp-card>
  </cmp-container>
</template>

<script setup lang="ts">
import _ from 'lodash';
// import { SearchIcon } from 'tdesign-icons-vue-next';
import { MessagePlugin, PrimaryTableCol, TableRowData } from 'tdesign-vue-next';
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { useResizeObserver } from 'vue-hooks-plus';

import { api } from '@/api/main';
import CmpQuery from '@/components/cmp-query/index.vue';
import { usePage } from '@/hooks/modules/page';

import detailed from './detailed.vue';

const parentTypeShow = ref(false); // 子组件控制设备禁用
const onPageSizeChange = () => {
  page.value.current = 1;
  onFetchData();
};
const loading = ref(false);
const onCurrentChange = () => {
  onFetchData();
};
const select = ref({
  state: -1,
  stateVisible: [],
});
const treeConfig = reactive({
  childrenKey: 'children',
  treeNodeColumnIndex: 0,
});
const btnShow = ref(false); // 默认为禁用 隐藏按钮默认为不隐藏
const btnShowDisable = ref({
  add: false,
  delete: false,
}); // 控制子按钮禁用默认不禁用  添加和删除
const typeDetailed = ref(0); // 默认为0  1代表编辑 2代表父进子 3代表新增 4代表进入为添加到父级
const disabledWord = ref(false); // 工作中心编号控制禁用默认为不禁用
const disabledParent = ref(false); // 父
const valueItem = ref('全部'); // space类型
const tableRef = ref(); // 实例table
const tableCardRef = ref(null);
const allType = ref([
  {
    wcType: '全部',
    code: 0,
    id: 0,
    opId: 0,
  },
  {
    wcType: '工作区',
    code: 0,
    id: 1,
    opId: 1,
  },
  {
    wcType: '生产线',
    code: 0,
    id: 2,
    opId: 2,
  },
  {
    wcType: '工段',
    code: 0,
    id: 3,
    opId: 3,
  },
  {
    wcType: '设备',
    code: 0,
    id: 4,
    opId: 4,
  },
]); // 所有类型
const workCenterId = ref(); // 工作中心的obj
const arr = ref(); // 类型存储数组
const newArr = ref('');
const id = ref(0);
const detailedShow = ref(false); // 控制子工作中心显示隐藏

const showWcType = ref(false); // 控制关联设备是否显示隐藏
// const columns: any = computed(() => {
//   const wcObjectCode = showWcType.value
//     ? [
//         {
//           colKey: 'wcObjectCode',
//           title: '关联设备',
//           align: 'center',
//           width: '150px',
//         },
//       ]
//     : [];
//   const cols = [
//     {
//       colKey: 'wcCode',
//       title: '工作中心编号',
//       align: 'left',
//       width: '200px',
//     },
//     {
//       colKey: 'wcName',
//       title: '名称',
//       align: 'center',
//       width: '150px',
//     },
//     {
//       colKey: 'wcType',
//       title: '类型',
//       align: 'center',
//       width: '150px',
//     },
//     {
//       colKey: 'workshopName',
//       title: '所属车间',
//       align: 'center',
//       width: '150px',
//     },
//     {
//       colKey: 'wcLocation',
//       title: '地点',
//       align: 'center',
//       width: '150px',
//     },
//     {
//       colKey: 'parentWcCode',
//       title: '父工作中心',
//       align: 'center',
//       width: '150px',
//     },
//     {
//       colKey: 'wcOwner',
//       title: '负责人',
//       align: 'center',
//       width: '150px',
//     },
//     ...wcObjectCode,
//     {
//       colKey: 'wcSeq',
//       title: '顺序号',
//       align: 'center',
//       width: '150px',
//     },
//     {
//       colKey: 'state',
//       title: '状态',
//       align: 'center',
//     },
//     {
//       colKey: 'op',
//       title: '操作',
//       width: '150px',
//       align: 'center',
//       fixed: 'right',
//     },
//   ];
//   return cols;
// });

const columns: PrimaryTableCol<TableRowData>[] = [
  {
    colKey: 'wcCode',
    title: '工作中心编号',
    align: 'left',
    width: '150px',
  },
  {
    colKey: 'wcName',
    title: '名称',
    align: 'center',
    ellipsis: true,
  },
  {
    colKey: 'wcType',
    title: '类型',
    align: 'center',
    ellipsis: true,
  },
  {
    colKey: 'workshopName',
    title: '所属车间',
    align: 'center',
    ellipsis: true,
  },
  {
    colKey: 'wcLocation',
    title: '地点',
    align: 'center',
    ellipsis: true,
  },
  {
    colKey: 'parentWcName',
    title: '父工作中心',
    align: 'center',
    ellipsis: true,
  },
  {
    colKey: 'wcOwner',
    title: '负责人',
    align: 'center',
  },
  {
    colKey: 'wcObjectCodeName',
    title: '关联设备',
    align: 'center',
  },
  {
    colKey: 'wcSeq',
    title: '顺序号',
    align: 'center',
  },
  {
    colKey: 'state',
    title: '状态',
    align: 'center',
  },
  {
    colKey: 'op',
    title: '操作',
    width: '150px',
    align: 'center',
    fixed: 'right',
  },
];

const data = ref([]); // 存储数据给到新增数据
const { pageUI } = usePage();
// const { loading, setLoading } = useLoading();
const page = ref({
  total: 10,
  current: 1,
  pageSize: 10,
}); // 分页

// 监听分页
watch(
  () => page.value.pageSize,
  (oldSize, newSize) => {
    console.log(oldSize, newSize);
    if (oldSize === newSize) {
      page.value.current = 1;
    }
  },
);

// const selectedRowKeys = ref([]); // 用于存储选中行的数组
const workData = ref([]); // table数据
// 通用下拉初始数据
const workState = ref({
  shop: '',
});

// input-select事件
// const popupVisible = ref(false);
const selectValue = ref();
// let OPTIONS = [];
// const options1 = ref(OPTIONS);
// const selectValue1 = ref('');
// 进入的时候
onMounted(() => {
  onFetchData();
});

// // 下拉事件
// const onOptionClick = (value: any) => {
//   console.log('value', value);
//   selectValue.value = value;
//   onFetchData();
// };

// const debounce = (func: { (): void; apply?: any }, delay: number) => {
//   let timeoutId: NodeJS.Timeout;
//   return (...args: any) => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       clearTimeout(timeoutId);
//       func.apply(this, args);
//     }, delay);
//   };
// };
// @ts-ignore
// const onInputChange = debounce((keyword: any) => {
//   options1.value.push(keyword);
//   selectValue.value = keyword;
//   if (options1.value.length > 10) {
//     options1.value.splice(1, 1);
//   }
//   onFetchData();
// }, 500);
// const onPopupVisibleChange = (val) => {
//   OPTIONS = val;
//   popupVisible.value = val;
// };
// // 下拉筛选
// const onHandelState = () => {
//   onFetchData();
// };
// 点击的类型

// #tab栏切换事件
const onHandelArr = (value: any) => {
  showWcType.value = value === 4;

  if (value === '') {
    arr.value = '';
  } else {
    arr.value = value;
  }
  console.log('类型', arr.value);
  page.value.current = 1;
  onFetchData();
};
// // 查询
// const onSelectShop = (value: any) => {
//   if (!value) {
//     return;
//   }
//   onFetchData();
// };
// #查询事件
const opts = computed(() => {
  return {
    state: {
      label: '状态',
      comp: 't-select',
      event: 'input',
      defaultVal: '01',
      labelWidth: '50',
      bind: {
        options: queryData.value.state,
      },
    },
    soltDemo: {
      label: '工作中心或编号',
      labelWidth: '120',
      comp: 't-input',
      event: 'input',
      defaultVal: '',
    },
    workshop: {
      label: '车间',
      comp: 'bcmp-select-business',
      labelWidth: '50',
      event: 'business',
      defaultVal: '',
      bind: {
        type: 'workshop',
        showTitle: false,
      },
    },
  };
});

const queryData = ref({
  state: [
    {
      label: '全部',
      value: '01',
    },
    {
      label: '启用',
      value: '1',
    },
    {
      label: '禁用',
      value: '0',
    },
  ],
  soltDemo: '',
});

// #搜索触发事件
const onInput = async (data: any) => {
  page.value.current = 1;
  const resultMap = {
    '01': [1, 0],
    '1': [1],
    '0': [0],
  };
  const result = resultMap[data.state] || [];
  const res = await api.workcenter.getlist({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    category: arr.value,
    workshopId: data.workshop,
    workcenterword: data.soltDemo,
    state: result,
  });
  workData.value = res.list; // table数据
  page.value.total = res.total;
  data.value = res.list; // 新增页面
};

// 首次进入刷新
const onFetchData = async () => {
  const STATE = select.value.state;
  try {
    if (STATE === -1) {
      select.value.stateVisible = [1, 0];
    } else if (STATE === 1) {
      select.value.stateVisible = [1];
    } else {
      select.value.stateVisible = [0];
    }
    // 父节点
    loading.value = true;
    const res = await api.workcenter.getlist({
      pageNum: page.value.current,
      pageSize: page.value.pageSize,
      category: arr.value,
      workshopId: workState.value.shop,
      // eslint-disable-next-line no-bitwise
      workcenterword: selectValue.value,
      state: select.value.stateVisible,
    });
    workData.value = res.list; // table数据
    data.value = res.list; // 新增页面
    page.value.total = res.total;
    console.log('🚀 ~ file: index.vue:506 ~ onFetchData ~  res.total:', res.total);
    console.log('🚀 ~ file: index.vue:506 ~ onFetchData ~ page.value.total:', page.value.total);
    // 只有第一次进来的时候才拿
    if (id.value === 0) {
      // 类型请求
      // const list = await api.workcenter.getCategory();
      // id.value = 1;
      // allType.value = list.list; // 标签列类型
      // allType.value.forEach((item) => {
      //   item.code = 0;
      // });

      const typeData = await api.workcenter.getTagCount();
      allType.value[1].code = typeData.area;
      allType.value[2].code = typeData.line;
      allType.value[3].code = typeData.section;
      allType.value[4].code = typeData.device;
    }
    // 标签页计数
  } catch (e) {
    console.log(e);
  } finally {
    loading.value = false;
  }
};
// 工作中心center跳转到form
const onHandelCenter = (row: any) => {
  newArr.value = row.wcType;
  detailedShow.value = true; // 控制窗口
  // arr.value = row.wcType;
  // btnShow.value = true; // 控制按钮禁用
  workCenterId.value = row; // 获取到工作中心id
  typeDetailed.value = 2; // 代表编辑
  btnShowDisable.value.add = false;
  btnShowDisable.value.delete = false;
  disabledWord.value = true;
  disabledParent.value = true;
};

// 新增按钮
const onHandelAdded = () => {
  newArr.value = '';
  detailedShow.value = true; // 控制窗口
  btnShow.value = true; // 控制按钮禁用
  workCenterId.value = {}; // 清空对象
  typeDetailed.value = 3; // 代表编辑
  btnShowDisable.value.add = true;
  btnShowDisable.value.delete = true;
  disabledWord.value = false;
  disabledParent.value = false;
};

// 禁用或者启用
const onDefult = async (row) => {
  if (row.state === 0) {
    row.state = 1;
  } else {
    const list = row.children.every((item) => {
      return item.state === 0;
    });
    console.log(list);
    if (!list) {
      MessagePlugin.error('子级是启用转态,无法禁用');
      return;
    }
    row.state = 0;
  }
  try {
    await api.workcenter.modify({ id: row.id, parentWcId: row.parentWcId, state: row.state });
  } catch (e) {
    console.log(e);
  }
};
// 保存时子组件控制
const onHandleSave = (i: boolean) => {
  detailedShow.value = i; // 子窗口
  btnShow.value = false; // 按钮禁用
  pageUI.value.page = 1;
  workState.value.shop = '';
  onFetchData();
};
// 编辑
const onClickEdit = (row: any) => {
  newArr.value = row.wcType;
  if (row.wcType === '设备') {
    parentTypeShow.value = false;
  } else {
    parentTypeShow.value = true;
  }
  btnShow.value = true;
  detailedShow.value = true;
  workCenterId.value = row; // 渲染子
  typeDetailed.value = 1; // 代表编辑
  btnShowDisable.value.add = true;
  btnShowDisable.value.delete = true;
  disabledWord.value = true;
  disabledParent.value = true;
};
// 添加父
const onAddChilde = (row) => {
  newArr.value = '';
  detailedShow.value = true;
  typeDetailed.value = 4;
  workCenterId.value = { parentWcId: row.id };
  btnShow.value = true;
  disabledWord.value = false;
  disabledParent.value = true;
};
// 添加修改转态
const onFormClear = (value: boolean) => {
  disabledWord.value = value;
  btnShow.value = !value;
  btnShowDisable.value.add = !value;
  btnShowDisable.value.delete = !value;
};

// 控制进入子中心的按钮
const onChildDefault = (value: boolean) => {
  disabledWord.value = value;
  btnShowDisable.value.add = !value;
  btnShowDisable.value.delete = !value;
};

// 控制table数组小于1删除按钮禁用
const onDelete = (value: boolean) => {
  btnShowDisable.value.delete = value;
};
// checked事件
// const rehandleSelectChange = (value: any, ctx: any) => {
//   selectedRowKeys.value = value;
//   console.log('value:', value, '1', ctx);
// };
const boxHeight = ref(0);
const boxWidth = ref(0);
useResizeObserver(tableCardRef, (entries) => {
  const entry = entries[0];
  debounceFunction(entry);
});
const debounceFunction = _.debounce((entry) => {
  computedTableContentSize(entry);
}, 100);

const computedTableContentSize = (entry) => {
  // 组件处于不可见状态时将不进行计算
  const { width: _w, height: _h } = entry.contentRect;
  boxWidth.value = 0;
  boxHeight.value = 0;
  nextTick(() => {
    boxHeight.value = _h - 145;
  });
};
</script>

<style lang="less" scoped>
.work-center-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--td-comp-margin-xxl);
}

.list-card-container {
  padding: var(--td-comp-paddingLR-xl) var(--td-comp-paddingLR-xxl);

  :deep(.t-card__body) {
    padding: 0;
  }
}

:deep(.t-divider) {
  height: var(--td-comp-size-s);
}

.select-work {
  display: flex;
  width: 100%;
}
</style>
