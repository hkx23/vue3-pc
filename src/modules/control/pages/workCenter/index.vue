<template>
  <div>
    <!-- 子from -->
    <detailed v-if="detailedShow" :btn-show="btnShow" @added-show="onHandleSave"></detailed>
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
                <!-- <t-select-input
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
                      <li v-for="item in options1" :key="item" @click="() => onOptionClick(item)">
                        {{ item }}
                      </li>
                    </ul>
                  </template></t-select-input
                > -->
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
        row-key="wcCode"
        :table-column="columns"
        :table-data="workData"
        :total="page.total"
        :loading="loading"
        :selected-row-keys="selectedRowKeys"
        @select-change="rehandleSelectChange"
        @refresh="onFetchData"
      >
        <template #wcCode="{ row }">
          <div>
            <t-icon name="chevron-right"></t-icon>
            <t-link theme="primary" underline @click="onHandelNumber(row.wcCode)">{{ row.wcCode }} </t-link>
          </div>
        </template>
        <template #parentWcCode="{ row }">
          <div>{{ row.parentWcCode ? row.parentWcCode : '-' }}</div>
        </template>
        <template #edit>
          <!-- 编辑 -->
          <icon name="edit-1" style="cursor: pointer" @click="onClickEdit"></icon>
        </template>
      </tm-table>
      <!-- </t-table> -->
    </t-card>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { Icon } from 'tdesign-vue-next';
import { onMounted, ref } from 'vue';

import { api } from '@/api/control';
import TmTable from '@/components/tm-table/index.vue';
import { useLoading } from '@/hooks/modules/loading';
import { usePage } from '@/hooks/modules/page';

import TmSelectBusiness from '../../../../components/tm-select-business/index.vue';
import detailed from './detailed.vue';

const btnShow = ref(false); // 控制子按钮禁用
const valueItem = ref(0); // 类型
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
const arr = ref([]); // 类型存储数组
const detailedShow = ref(false); // 控制子工作中心显示隐藏
// 初始数据
const idWorkCenter = ref(''); // id工作中心
const columns = [
  {
    colKey: 'select',
    type: 'multiple',
  },
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
    colKey: 'ownerName',
    title: '负责人',
    align: 'center',
  },
  {
    colKey: 'edit',
    title: '',
    align: 'center',
  },
];
const { pageUI } = usePage();
const { loading, setLoading } = useLoading();
const page = ref({
  total: 10,
});
const selectedRowKeys = ref([]); // 用于存储选中行的数组
const workData = ref([]); // table数据
// 通用下拉初始数据
const workState = ref({
  shop: '',
});
// const popupVisible = ref(false);
// const selectValue = ref();
// let OPTIONS = [];
// const options1 = ref(OPTIONS);
// const selectValue1 = ref('');
onMounted(() => {
  onFetchData();
});
// const onOptionClick = (value) => {
//   console.log(value);
// };
// const onInputChange = (keyword) => {
//   selectValue.value = keyword;
//   console.log('1', keyword);
//   options1.value = new Array(5).fill(null).map((t, index) => `${keyword} Student ${index}`);
// };
// const onPopupVisibleChange = (val) => {
//   OPTIONS = val;
//   popupVisible.value = val;
// };
// 点击的类型
const onHandelArr = (value) => {
  arr.value = value;
  onFetchData();
};
// 车间查询
const onSelectShop = (value) => {
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
    });
    workData.value = res.list;
    page.value.total = res.total;
    const typeData = await api.workcenter.getTagCount();
    allType.value[1].code = typeData.area;
    allType.value[2].code = typeData.device;
    allType.value[3].code = typeData.line;
    allType.value[4].code = typeData.section;
    console.log('list', typeData);
    console.log('11', allType.value);
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};
// 工作中心跳转到form
const onHandelNumber = (value) => {
  detailedShow.value = true; // 控制窗口
  btnShow.value = true; // 控制按钮禁用
  idWorkCenter.value = value;
  console.log(value);
};

// 新增按钮
const onHandelAdded = () => {
  detailedShow.value = true;
  btnShow.value = true; // 控制按钮禁用
};

// 子组件控制
const onHandleSave = (value: any) => {
  detailedShow.value = value; // 子窗口
  btnShow.value = false; // 按钮禁用
  pageUI.value.page = 1;
  workState.value.shop = '';
  onFetchData();
};
// 编辑
const onClickEdit = () => {
  detailedShow.value = true;
};
// checked事件
const rehandleSelectChange = (value: any, ctx: any) => {
  selectedRowKeys.value = value;
  console.log('value:', value, '1', ctx);
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
