<template>
  <div>
    <!-- 子from -->
    <detailed
      v-if="detailedShow"
      :btn-show-disable="{ add: btnShowDisable.add, delete: btnShowDisable.delete }"
      :word-center-id="workCenterId"
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
    <!-- 头部 -->
    <t-card v-if="!detailedShow" class="list-card-container" :bordered="false">
      <t-space direction="horizontal" style="margin: 10px 0">
        <t-tabs
          v-for="item in allType"
          :key="item.id"
          v-model="valueItem"
          :value="item.name"
          @change="onHandelArr(item.opId)"
        >
          <t-tab-panel :value="item.id" :label="item.name">
            <template #label>
              <div>{{ item.name }}{{ item.code === '' ? '' : item.code }}</div>
            </template>
          </t-tab-panel>
        </t-tabs>
      </t-space>
      <t-row justify="space-between">
        <div class="work-center-box">
          <t-col>
            <t-button variant="base" @click="onHandelAdded">新增</t-button>
            <t-divider layout="vertical" />
            <t-button theme="default" variant="base">导出...</t-button>
          </t-col>
          <t-col>
            <div class="select-work">
              <span style="margin: 0 20px">
                <!-- <tm-select-business v-model="workState.workcenter" type="workcenter"></tm-select-business
              > -->
                <t-select-input
                  v-model="selectValue"
                  :options="selectValue"
                  :popup-visible="popupVisible"
                  allow-input
                  placeholder="工作中心或编号"
                  :default-input-value="selectValue1"
                  @input-change="onInputChange"
                  @popup-visible-change="onPopupVisibleChange"
                >
                  <template #panel>
                    <ul class="tdesign-demo__select-input-ul-auto-width">
                      <li v-for="item in options1" :key="item.id" @click="() => onOptionClick(item)">
                        {{ item }}
                      </li>
                    </ul>
                  </template>
                  <template #suffixIcon><search-icon /></template
                ></t-select-input>
              </span>
              <tm-select-business
                v-model="workState.shop"
                type="workshop"
                @selection-change="onSelectShop"
              ></tm-select-business>
            </div>
          </t-col>
        </div>
      </t-row>
      <!-- 表格 -->
      <tm-table
        ref="tableRef"
        v-model:pagination="pageUI"
        row-key="id"
        :table-column="columns"
        :table-data="workData"
        :total="page.total"
        :loading="loading"
        @refresh="onFetchData"
      >
        <template #wcCode="{ row }">
          <div>
            <t-icon name="chevron-right"></t-icon>
            <t-link theme="primary" underline @click="onHandelCenter(row)">{{ row.wcCode }} </t-link>
          </div>
        </template>
        <template #workshopName="{ row }">
          <div>{{ row.workshopCode }}-{{ row.workshopName }}</div>
        </template>
        <template #parentWcCode="{ row }">
          <div>{{ row.parentWcCode ? row.parentWcCode : '-' }}</div>
        </template>
        <template #edit="{ row }">
          <!-- 编辑 -->
          <icon name="edit-1" style="cursor: pointer" @click="onClickEdit(row)"></icon>
        </template>
      </tm-table>
      <!-- </t-table> -->
    </t-card>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { Icon } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/control';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import TmSelectBusiness from '../../../../components/tm-select-business/index.vue';
import detailed from './detailed.vue';

const btnShow = ref(false); // 默认为禁用 隐藏按钮默认为不隐藏
const btnShowDisable = ref({
  add: false,
  delete: false,
}); // 控制子按钮禁用默认不禁用  添加和删除
const typeDetailed = ref(0); // 默认为0  1代表编辑 2代表父进子 3代表新增
const disabledWord = ref(false); // 工作中心编号控制禁用默认为不禁用
const disabledParent = ref(false); // 父
const valueItem = ref(0); // space类型
const tableRef = ref(); // 实例table
const allType = ref([
  {
    name: '所有类型',
    id: 0,
    opId: [1, 2, 3, 4],
    value: 'item1',
  },
  {
    name: '工作区',
    id: 1,
    opId: [1],
    value: 'item2',
    code: '',
  },
  {
    name: '生产线',
    id: 2,
    opId: [2],
    value: 'item3',
    code: '',
  },
  {
    name: '工段',
    id: 3,
    opId: [3],
    value: 'item4',
    code: '',
  },
  {
    name: '设备',
    id: 4,
    opId: [4],
    value: 'item5',
    code: '',
  },
]); // 所有类型
const workCenterId = ref(); // 工作中心的obj
const arr = ref([]); // 类型存储数组
const detailedShow = ref(false); // 控制子工作中心显示隐藏
// 初始数据
const columns = [
  // {
  //   colKey: 'select',
  //   type: 'multiple',
  // },
  {
    colKey: 'wcCode',
    title: '工作中心编号',
    align: 'center',
  },
  {
    colKey: 'wcName',
    title: '名称',
    align: 'center',
  },
  {
    colKey: 'wcType',
    title: '类型',
    align: 'center',
  },
  {
    colKey: 'workshopName',
    title: '所属车间',
    align: 'center',
  },
  {
    colKey: 'wcLocation',
    title: '地点',
    align: 'center',
  },
  {
    colKey: 'parentWcCode',
    title: '父工作中心',
    align: 'center',
  },
  {
    colKey: 'wcOwner',
    title: '负责人',
    align: 'center',
  },
  {
    colKey: 'edit',
    title: '',
    align: 'center',
  },
];
const data = ref([]); // 存储数据给到新增数据
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const page = ref({
  total: 10,
});
// const selectedRowKeys = ref([]); // 用于存储选中行的数组
const workData = ref([]); // table数据
// 通用下拉初始数据
const workState = ref({
  shop: '',
});
// input-select事件
const popupVisible = ref(false);
const selectValue = ref();
let OPTIONS = [];
const options1 = ref(OPTIONS);
const selectValue1 = ref('');
onMounted(() => {
  onFetchData();
});
const onOptionClick = (value: any) => {
  console.log('value', value);
  selectValue.value = value;
  onFetchData();
};
const debounce = (func: { (): void; apply?: any }, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      clearTimeout(timeoutId);
      func.apply(this, args);
    }, delay);
  };
};
// @ts-ignore
const onInputChange = debounce((keyword: any) => {
  options1.value.push(keyword);
  selectValue.value = keyword;
  if (options1.value.length > 10) {
    options1.value.splice(1, 1);
  }
  onFetchData();
}, 500);
const onPopupVisibleChange = (val) => {
  OPTIONS = val;
  popupVisible.value = val;
};
// 点击的类型
const onHandelArr = (value: any[]) => {
  pageUI.value.page = 1;
  arr.value = value;
  onFetchData();
};
// 车间查询
const onSelectShop = (value: any) => {
  if (!value) {
    return;
  }
  onFetchData();
};
// 首次进入刷新
const onFetchData = async () => {
  try {
    setLoading(true);
    const res = await api.workcenter.getlist({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      category: arr.value,
      workshopID: workState.value.shop,
      // eslint-disable-next-line no-bitwise
      workcenterword: selectValue.value,
    });
    workData.value = res.list;
    data.value = res.list;
    page.value.total = res.total;
    const typeData = await api.workcenter.getTagCount();
    allType.value[1].code = typeData.area;
    allType.value[2].code = typeData.line;
    allType.value[3].code = typeData.section;
    allType.value[4].code = typeData.device;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// 工作中心center跳转到form
const onHandelCenter = (row: any) => {
  detailedShow.value = true; // 控制窗口
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
  detailedShow.value = true; // 控制窗口
  btnShow.value = true; // 控制按钮禁用
  workCenterId.value = {}; // 清空对象
  typeDetailed.value = 3; // 代表编辑
  btnShowDisable.value.add = true;
  btnShowDisable.value.delete = true;
  disabledWord.value = false;
  disabledParent.value = false;
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
  btnShow.value = true;
  detailedShow.value = true;
  workCenterId.value = row; // 渲染子
  typeDetailed.value = 1; // 代表编辑
  btnShowDisable.value.add = true;
  btnShowDisable.value.delete = true;
  disabledWord.value = true;
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
