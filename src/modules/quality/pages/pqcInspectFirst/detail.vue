<template>
  <cmp-container :full="true">
    <!-- !单据基本信息部分 -->
    <cmp-card>
      <t-row :full="true">
        <t-col :flex="8">
          <h3>检验单号：{{ headerDate.billNo }}</h3>
        </t-col>
        <t-col :flex="2">创建时间：{{ headerDate.timeCreate }}</t-col>
        <t-col :flex="0.5"><icon name="close" size="20px" style="cursor: pointer" @click="onClose"></icon></t-col>
      </t-row>
      <t-row :full="true">
        <hr size="1" width="2000px" color="#808080" />
      </t-row>
      <t-descriptions :column="4" :label-style="{ width: '130px' }">
        <t-descriptions-item label="工作中心" name="wcName">{{ headerDate.wcName }}</t-descriptions-item>
        <t-descriptions-item label="排产单号" name="scheCode">{{ headerDate.scheCode }}</t-descriptions-item>
        <t-descriptions-item label="物料编码" name="mitemCode">{{ headerDate.mitemCode }}</t-descriptions-item>
        <t-descriptions-item label="物料描述" name="mitemDesc">{{ headerDate.mitemDesc }}</t-descriptions-item>
        <t-descriptions-item label="排产数量" name="scheQty">{{ headerDate.scheQty }}</t-descriptions-item>
        ><t-descriptions-item label="检验标准" name="inspectStdName">{{
          headerDate.inspectStdName
        }}</t-descriptions-item>
        <t-descriptions-item label="班组" name="reason">{{ headerDate.scheCode }}</t-descriptions-item>
        <t-descriptions-item label="检验时机" name="inspectOpportunityName">{{
          headerDate.inspectOpportunityName
        }}</t-descriptions-item>
        <t-descriptions-item label="检验完成时间" name="datetimeInspectEnd">{{
          headerDate.datetimeInspectEnd
        }}</t-descriptions-item>
        <t-descriptions-item label="检验员" name="userInspectName">{{
          headerDate.userInspectName
        }}</t-descriptions-item>
        <t-descriptions-item label="附件" name="attachment"
          ><t-link theme="primary" @click="formVisible = true"> 附件上传 </t-link>
        </t-descriptions-item>
        <t-descriptions-item> <t-image :src="stampUrl" class="stamp" /> </t-descriptions-item>
      </t-descriptions>
    </cmp-card>
    <!-- !条码部分 -->
    <cmp-card v-if="barcodeData.length > 0">
      <t-row v-model="tabValue" align="middle" type="flex">
        <t-col v-for="(item, index) in barcodeData" :key="index" :lg="{ span: 3 }" :offset="0">
          <t-card class="box-card">
            <div
              slot1="header"
              class="barcodeDiv"
              :style="{ backgroundColor: index === selectedCol ? 'lightblue' : 'white' }"
              @click="searchItems(item, index)"
            >
              <t-row>
                <t-col :flex="1">
                  <h2>{{ index + 1 }}</h2>
                </t-col>
                <t-col :flex="5">
                  {{ item.scanBarcode }}
                </t-col>
                <t-col :flex="1">
                  <t-tag
                    shape="round"
                    theme="primary"
                    :class="{
                      OK: item.inspectResultName === '合格',
                      NG: item.inspectResultName === '不合格',
                      UNDERWAY: item.inspectResultName === '暂无结果',
                    }"
                    >{{ item.inspectResultName }}</t-tag
                  >
                </t-col>
              </t-row>
            </div>
          </t-card>
        </t-col>
      </t-row>
    </cmp-card>
    <!-- !检验项目表格模块 -->
    <cmp-card>
      <t-tabs v-model="itemTabValue" @change="itemTabChange">
        <t-tab-panel label="检验项目" value="0" :destroy-on-hide="true" :full="true">
          <t-tabs v-model="tabValue" @change="tabChange">
            <t-tab-panel
              v-for="(tabData, index) in itemTab"
              :key="index"
              :value="tabData.itemCategory"
              :label="tabData.itemCategoryName"
              :destroy-on-hide="true"
            >
              <cmp-container style="margin-top: 12px">
                <cmp-table
                  ref="tableRefTop"
                  v-model:pagination="pageUI"
                  row-key="id"
                  :fixed-height="true"
                  :active-row-type="'single'"
                  :hover="true"
                  :table-column="columns"
                  :table-data="itemData"
                  :total="itemData.length"
                  max-height="300px"
                >
                  <template #button>
                    <t-radio-group v-model="tabData.inspectResult" @change="onRadioChange">
                      <t-radio allow-uncheck value="NG"> 仅显示不合格</t-radio>
                    </t-radio-group>
                    <t-input placeholder="请输入项目名称(回车)" @enter="keywordSearch">
                      <template #suffixIcon>
                        <search-icon :style="{ cursor: 'pointer' }" />
                      </template>
                    </t-input>
                  </template>
                  <template #operation="{ row }">
                    <t-link theme="primary" style="padding-right: 8px" @click="onView(row)">查看</t-link>
                  </template>
                </cmp-table>
              </cmp-container>
            </t-tab-panel>
          </t-tabs>
        </t-tab-panel>
        <t-tab-panel v-if="isShow" label="不合格处理" value="1" :destroy-on-hide="true">
          <t-descriptions style="margin-top: 12px" :label-style="{ width: '130px' }">
            <t-descriptions-item label="不合格分类：" name="defectCategoryName">{{
              firstData.defectCategoryName
            }}</t-descriptions-item>
            <t-descriptions-item label="责任部门：" name="scheCode">{{ headerDate.scheCode }}</t-descriptions-item>
            <t-descriptions-item label="跟进人：" name="mitemCode">{{ headerDate.mitemCode }}</t-descriptions-item>
            <t-descriptions-item label="处理意见：" name="correctOpinion">{{
              firstData.correctOpinion
            }}</t-descriptions-item>
            <!-- <t-descriptions-item label="" name="correctOpinion">
              <t-radio-group v-model="radioValue">
                <t-radio allow-uncheck:false :value="1"> 启用品质改善</t-radio>
              </t-radio-group></t-descriptions-item
            > -->
            <t-descriptions-item label="改善单据：" name="improveNos">
              <template v-for="(improve, index) in firstData.improveNos" :key="index">
                <t-link :value="improve" variant="text" theme="primary" name="edit" @click="onEditRowClick(improve)"
                  >{{ improve }}
                </t-link>
                <t-text
                  v-if="index < firstData.improveNos.length - 1"
                  :value="index"
                  variant="text"
                  theme="primary"
                  name="edit"
                  >、
                </t-text>
              </template>
            </t-descriptions-item>
          </t-descriptions>

          <t-row :gutter="[32, 16]">
            <t-col :span="3"> </t-col>
            <t-col :span="6">
              <t-descriptions> </t-descriptions>
            </t-col>
          </t-row>
        </t-tab-panel>
      </t-tabs>
    </cmp-card>
  </cmp-container>
  <!-- !上传组件 弹框 -->
  <t-dialog v-model:visible="formVisible" :close-on-overlay-click="false" header="附件上传" width="50%">
    <cmp-container :full="true">
      <bcmp-upload-content
        :file-list="fileList"
        upload-path="inspectStd"
        :is-hand-delete="true"
        :disabled="true"
      ></bcmp-upload-content>
    </cmp-container>
  </t-dialog>
</template>

<script setup lang="ts">
// import { debounce } from 'lodash';
import { SearchIcon } from 'tdesign-icons-vue-next';
import { Icon } from 'tdesign-vue-next';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { api, PqcInspectFirstVO } from '@/api/quality';
import ngStamp from '@/assets/images/NG.png';
import okStamp from '@/assets/images/OK.png';
import underwayStamp from '@/assets/images/UNDERWAY.png';
import { usePage } from '@/hooks/modules/page';

import BcmpUploadContent from './bcmp-upload-content/index.vue';

const { pageUI } = usePage(); // 分页工具
const formVisible = ref(false);
const dataTotal = ref(0);
const barcodeData = ref<PqcInspectFirstVO[]>([]); // 条码栏数据
const id = ref(''); // 用于watch监听，控制加载
const selectedCol = ref(0); // 条码部分被选中的index
const selectBarcode = ref(); // 第三部分展示选中的啥条码
const itemTab = ref<PqcInspectFirstVO[]>([]); // 检验项目类别Tab
const radioValue = ref(''); // 仅显示不合格单选按钮
const itemData = ref<PqcInspectFirstVO[]>([]); // 检验项目数据
const pqcInspectFirstId = ref(); // 首检单ID丢全局
const pqcInspectFirstBarcodeId = ref(); // 首检单条码ID丢全局
const itemTabValue = ref('0'); // 检验项目不合格分类tab的默认选中
const tabValue = ref(''); // 检验项目tab的默认选中
const isShow = ref(false); // 不合格处理panel的开关
const firstData = ref<PqcInspectFirstVO>(); // 检验单数据
const isImproveRadioValue = ref(1); // 不合格处理界面启用品质改善控件
const router = useRouter();
const itemCategoryTab = ref();

// 接收父组件的参数
const props = defineProps({
  rowData: Object,
});
// 计算头部数据
const headerDate = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  id.value = props.rowData.bill.id;
  return props.rowData ? props.rowData.bill : {};
});
// 根据检查结果获取对应的戳
const stampUrl = computed(() => {
  const result = props.rowData.bill.inspectResult;
  switch (result) {
    case 'OK':
      return okStamp;
    case 'NG':
      return ngStamp;
    default:
      return underwayStamp;
  }
});
// 监听 id 的变化
watch(id, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    const barcodes = await api.pqcInspectFirst.getBarcodes(props.rowData.bill.id);
    if (barcodes.length > 0) {
      barcodeData.value = barcodes;

      pqcInspectFirstId.value = barcodes[0].pqcInspectFirstId;
      pqcInspectFirstBarcodeId.value = barcodes[0].id;
      // 获取tab数据
      const tab = await api.pqcInspectFirst.getTabs({
        pqcInspectFirstId: pqcInspectFirstId.value,
        pqcInspectFirstBarcodeId: pqcInspectFirstBarcodeId.value,
      });
      const newObject = { itemCategory: '', itemCategoryName: '全部' };
      tab.unshift(newObject);
      itemTab.value = tab;
      await getBarcodeItems();
    }
  }
});

// 监听 条码ID 的变化
watch(pqcInspectFirstBarcodeId, async (newValue, oldValue) => {
  if (newValue !== oldValue) {
    const res = await api.pqcInspectFirst.getList({
      billNo: headerDate.value.billNo,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    });
    const now = res.list[0];
    firstData.value = now; // 检验单的数据
    console.log('这是检验单的数据：', firstData.value.defectCategoryName);
    const { improveNos } = firstData.value;
    if (improveNos.length > 0) {
      isImproveRadioValue.value = 1;
    } else {
      isImproveRadioValue.value = 0;
    }
  }
});

// 父方法
const Emit = defineEmits(['permissionShow']);
// 关闭窗口回到主页面
const onClose = () => {
  Emit('permissionShow', false); // 回到父
};
// 条码区域条码的点击事件
const searchItems = async (item, index) => {
  // 如果点击事件拿到的index和他自己所持有的一样，则变bgc,当前方法做参数传递
  selectedCol.value = index;
  selectBarcode.value = item.scanBarcode;
  pqcInspectFirstId.value = item.pqcInspectFirstId;
  pqcInspectFirstBarcodeId.value = item.id;
  // 控制不合格分类是否展示
  if (item.inspectResult === 'NG') {
    isShow.value = true;
  } else {
    isShow.value = false;
  }
  // 清空原数据
  itemTab.value = [];
  itemData.value = [];
  itemTabValue.value = '0';
  // 获取tab数据
  const tab = await api.pqcInspectFirst.getTabs({
    pqcInspectFirstId: pqcInspectFirstId.value,
    pqcInspectFirstBarcodeId: pqcInspectFirstBarcodeId.value,
  });
  const newObject = { itemCategory: '', itemCategoryName: '全部' };
  tab.unshift(newObject);
  itemTab.value = tab;
  // 获取项目数据
  const res = await api.pqcInspectFirst.getBarcodeItems({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    pqcInspectFirstId: pqcInspectFirstId.value,
    pqcInspectFirstBarcodeId: pqcInspectFirstBarcodeId.value,
  });
  itemData.value = res.list;
};

// 检验项目TAb 栏切换事件
const tabChange = async (value: string) => {
  itemCategoryTab.value = value;
  if (value === '') {
    await getBarcodeItems();
  } else {
    const res = await api.pqcInspectFirst.getBarcodeItems({
      itemCategory: value,
      pqcInspectFirstId: pqcInspectFirstId.value,
      pqcInspectFirstBarcodeId: pqcInspectFirstBarcodeId.value,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    });
    itemData.value = res.list; // 表格数据赋值
    dataTotal.value = res.total; // 总页数赋值
  }
};

// 检验项目不合格分类TAb 栏切换事件
const itemTabChange = async (value: string) => {
  if (value === '1') {
    const res = await api.pqcInspectFirst.getList({
      billNo: headerDate.value.billNo,
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
    });
    const now = res.list[0];
    firstData.value = now; // 检验单的数据
    const { improveNos } = firstData.value;
    if (improveNos.length > 0) {
      isImproveRadioValue.value = 1;
    } else {
      isImproveRadioValue.value = 0;
    }
  } else {
    await getBarcodeItems();
  }
};

const onRadioChange = async (checked: any) => {
  radioValue.value = checked;
  await getBarcodeItems();
};

// 检验项目数据获取方法
const getBarcodeItems = async () => {
  const res = await api.pqcInspectFirst.getBarcodeItems({
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    pqcInspectFirstId: pqcInspectFirstId.value,
    pqcInspectFirstBarcodeId: pqcInspectFirstBarcodeId.value,
    inspectResult: radioValue.value,
  });
  itemData.value = res.list;
};

// 检验项目关键词搜索
const keywordSearch = async (value) => {
  const res = await api.pqcInspectFirst.getBarcodeItems({
    itemCategory: itemCategoryTab.value,
    itemName: value,
    pageNum: pageUI.value.page,
    pageSize: pageUI.value.rows,
    pqcInspectFirstId: pqcInspectFirstId.value,
    pqcInspectFirstBarcodeId: pqcInspectFirstBarcodeId.value,
  });
  itemData.value = res.list;
};

// 跳转到单据管理
const onEditRowClick = (improve: String) => {
  const tabRouters = router.getRoutes();
  const routeInfo = tabRouters.find((item1) => item1.meta.sourcePath === `/quality#/qualityImprove`);
  if (routeInfo) {
    const url = `${routeInfo.path}?billNo=${improve}`;
    router.push(url);
  }
};

const onView = (row) => {
  const item = { ...row };
  fileList.value = item.fileList ? item.fileList : [];
  formVisible.value = true;
};
// // 上传文件
const fileList = ref([]);

const columns = [
  {
    colKey: 'itemName',
    title: '项目名称',
  },
  {
    colKey: 'technicalRequest',
    title: '技术要求',
  },
  {
    colKey: 'characteristicsName',
    title: '项目特性',
  },
  {
    colKey: 'inspectTool',
    title: '检验工具',
  },
  {
    colKey: 'inspectResultName',
    title: '检验结果',
  },
  {
    colKey: 'inspectValue',
    title: '检测值',
  },
  {
    colKey: 'ngReason',
    title: '不良原因',
  },
  {
    colKey: 'inspectBasis',
    title: '检验依据',
  },
  {
    colKey: 'operation',
    title: '操作',
    fixed: 'right',
    width: '130',
  },
];
</script>

<style lang="less" scoped>
.cards_title {
  :deep(.t-card__title) {
    font-weight: bold;
    color: var(--td-gray-color-8);
    font-size: 16px;
  }
}

.span_title {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 16px;
}

.itemTitle {
  font-weight: bold;
  color: var(--td-gray-color-8);
  font-size: 16px;
  line-height: 32px;
  text-align: left;
}

.stamp {
  position: absolute;
  background-color: transparent;
  top: 50px; /* 设置图片顶部距离容器顶部的距离 */
  right: 50px; /* 设置图片左侧距离容器左侧的距离 */
}

.barcodeDiv {
  width: 260px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(49 172 243);
  border-radius: 5px;
  padding: 10px;
}

//条码栏背景card去边框
.box-card {
  border: none;
}
//检验结果tag根据结果的不同适用不同的主题样式
.OK {
  background-color: green;
}

.NG {
  background-color: red;
}

.UNDERWAY {
  background-color: blueviolet;
}
</style>
