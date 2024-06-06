<template>
  <cmp-kanban-default :title="t('conferenceKanban.会议看板')" grid-size="small">
    <div class="top">
      <div class="top-left box-content">
        <div class="flex-row">
          <div class="card" style="flex-direction: row">
            <div class="card-content">
              <bcmp-select-business
                v-model="condition.conferenceId"
                borderless
                :label="t('conferenceKanban.会议')"
                type="conferenceAuth"
                :show-title="false"
                @selection-change="conferenceLayoutChange"
              ></bcmp-select-business>
            </div>
          </div>
          <div class="card" style="flex-direction: row">
            <div class="card-content">
              <bcmp-select-business
                v-model="condition.attendanceModeId"
                borderless
                :label="t('conferenceKanban.出勤模式')"
                type="attendanceMode"
                :show-title="false"
                @selection-change="attendanceModeChange"
              ></bcmp-select-business>
            </div>
          </div>
          <div class="card" style="flex-direction: row">
            <div class="card-content">
              <t-select
                v-model="condition.dimension"
                borderless
                style="width: 100%"
                :options="dimensionOption"
                :label="t('conferenceKanban.时间维度')"
                :placeholder="t('common.placeholder.select', [t('conferenceKanban.时间维度')])"
                @change="onRefresh"
              >
              </t-select>
            </div>
          </div>
          <div class="card" style="flex-direction: row">
            <div class="card-content">
              <bcmp-select-business
                v-model="condition.conferenceOrgIds"
                borderless
                :parent-id="condition.conferenceId"
                :label="t('conferenceKanban.会议组织')"
                type="conferenceOrg"
                :show-title="false"
                :is-multiple="true"
                :auto-width="true"
                @selection-change="conferenceOrgIdsChange"
              ></bcmp-select-business>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="conference-layout-Com" style="height: 100%">
      <conference-layout-com
        ref="templateComRef"
        :is-auto-size="true"
        :option-type="LayoutViewType.viewKanban.toString()"
      ></conference-layout-com>
    </div>
  </cmp-kanban-default>
</template>
<script setup lang="ts">
import _, { debounce } from 'lodash';
// import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted, reactive, ref } from 'vue';

import { api as apiDaily, ConferenceOrgVO, ConferenceTemplateVO } from '@/api/daily';
import { api as apiMain } from '@/api/main';
import { componentCondition } from '@/modules/daily/pages/conferenceLayout/components/components';
import ConferenceLayoutCom from '@/modules/daily/pages/conferenceLayout/components/indexCom.vue';

import { useLang } from './lang';

// const { loading, setLoading } = useLoading();
const { t } = useLang();

// 组件信息
const templateComRef = ref(null);
enum LayoutViewType {
  addLayout = 'addLayout', // addLayout: 新增(占位符布局信息)
  editConferenceIndex = 'editConferenceIndex', // editConferenceIndex:编辑(配置关联指标)
  viewKanban = 'viewKanban', // viewKanban:查看模式(看板模式)
}

interface conditionInstance extends componentCondition {}
const condition: conditionInstance = reactive({
  conferenceId: '',
  conferenceCoode: '',
  conferenceName: '',
  attendanceModeId: '',
  attendanceModeCode: '',
  attendanceModeName: '',
  conferenceOrgIds: '',
  conferenceOrgs: [],
  defaultCnferenceOrgs: [],
  dimension: '',
  defaultDimension: [],
});

const dimensionOption = ref([]);
const totalDimensionOption = ref([]);

// 选择会议信息
const conferenceLayoutChange = async (rowData) => {
  if (rowData && rowData.templateIndexContent) {
    commonRefresh(rowData);
  } else {
    // 清空数据
    const noneData = [];
    const { setLayoutComData } = templateComRef.value;
    setLayoutComData(noneData);
    reset();
  }
};

// 选择出勤模式
const attendanceModeChange = async (rowData) => {
  if (rowData) {
    condition.attendanceModeCode = rowData.modeCode;
    condition.attendanceModeName = rowData.modeName;
    onRefresh();
  }
};

// 选择会议组织
const conferenceOrgIdsChange = async (rowData) => {
  if (rowData) {
    condition.conferenceOrgs = rowData;
    onRefresh();
  }
};

const commonRefresh = async (conferenceData: ConferenceTemplateVO) => {
  condition.conferenceCoode = conferenceData.conferenceCode;
  condition.conferenceName = conferenceData.conferenceName;

  // 初始化布局组件
  const layoutData = JSON.parse(conferenceData.templateIndexContent);
  const { setLayoutComData } = templateComRef.value;
  setLayoutComData(layoutData);

  // 设置会议对应的时间维度
  setDimensionOption(conferenceData);

  // 获取默认的所有会议组织信息
  await getDefaultCnferenceOrgs(conferenceData.conferenceId);

  onRefresh();
};

// 设置会议对应的时间维度
const setDimensionOption = async (conferenceData: ConferenceTemplateVO) => {
  if (totalDimensionOption.value && conferenceData.templateDimensionList) {
    dimensionOption.value = totalDimensionOption.value.filter(
      (item) => conferenceData.templateDimensionList.indexOf(item.value) > -1,
    );

    // 默认的所有时间维度信息
    condition.defaultDimension = dimensionOption.value.map((item) => item.value);
  }
};

// 获取默认的所有会议组织信息
const getDefaultCnferenceOrgs = async (conferenceId: string) => {
  const res = (await apiDaily.conference.itemsOrg({
    parentId: conferenceId,
  })) as ConferenceOrgVO[];
  condition.defaultCnferenceOrgs = res;
};

// 初始化系统字典
const initDimensionOption = async () => {
  const res = (await apiMain.param.getListByGroupCode({
    parmGroupCode: 'CONFERNCE_INDEX_DIMENSION',
  })) as any;
  totalDimensionOption.value = res;
};

const reset = () => {
  // 清除所有对象的值
  Object.keys(condition).forEach((key) => {
    if (_.isArray(condition[key])) {
      condition[key] = [];
    } else if (_.isNumber(condition[key])) {
      condition[key] = 0;
    } else if (_.isBoolean(condition[key])) {
      condition[key] = true;
    } else {
      condition[key] = '';
    }
  });
  dimensionOption.value = [];
};

// 刷新事件
const onRefresh = debounce(async () => {
  try {
    if (condition.conferenceId === '') {
      // MessagePlugin.warning(t('common.placeholder.select', [t('conferenceKanban.会议')]));
      return;
    }
    const { refresh } = templateComRef.value;
    if (refresh) {
      refresh(condition);
    }
  } catch (e) {
    console.log(e);
  }
}, 100);

// 初始渲染
onMounted(() => {
  initDimensionOption();
  onRefresh();
});
</script>
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="less" scoped>
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.top {
  height: 80px;
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 0 12px;

  .card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .card-title {
      font-size: 14px;
      color: rgb(199 241 255);
      letter-spacing: 0;
      line-height: 2;
      font-weight: normal;
      font-style: normal;
      transform: translate(0, 0);
      word-break: keep-all;
    }

    .card-content {
      display: flex;
      flex: 1;
      gap: 4px;

      .card-content-value {
        display: inline-flex;
        align-items: center;
        color: rgb(230 247 255);
        font-size: 26px;
        font-weight: bold;
        font-style: normal;
        text-shadow: none;
      }

      .card-content-uom {
        display: inline-flex;
        align-items: center;
        color: rgb(230 247 255 / 50%);
        font-size: 18px;
        letter-spacing: 0;
        font-weight: normal;
        font-style: normal;
        transform: translate(2px, 1px);
      }

      .warning-value {
        color: rgb(255 178 106);
      }

      .warning-uom {
        color: rgb(255 178 106 / 50%);
      }

      .complete-value {
        color: rgb(0 255 254);
      }

      .complete-uom {
        color: rgb(0 255 254 / 30%);
      }

      .t-input__prefix {
        color: aliceblue;
      }

      .t-input__inner {
        color: white;
      }

      .t-input--focused .t-input__prefix,
      .t-input--focused .t-input__inner {
        color: black;
      }

      .t-input:hover .t-input__prefix,
      .t-input:hover .t-input__inner {
        color: black;
      }
    }
  }

  .top-left {
    flex-grow: 2;
    display: flex;
    flex-direction: row;
    margin-top: 12px;
    //margin-bottom: 12px;
  }

  .top-right {
    flex-grow: 1;
    margin-top: 12px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: row;
    gap: 12px;
  }
}

.center {
  flex: 1;
}

.event-kanban-bottom {
  height: 82px;
  display: flex;
  flex: 1;
  margin-top: 12px;
  background: rgb(48 99 195 / 20%);
  flex-direction: row;
  border-radius: 8px;
  padding: 12px;
}

.flex-row {
  display: flex;
  flex-direction: row;
  gap: 12px;
}

.flex-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.box-content {
  min-height: 10px;
  background: rgb(48 99 195 / 20%);
  padding: 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  border-radius: 8px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 根据需求调整列数和比例 */
  grid-gap: 10px; /* 可选，设置间隔 */
  grid-auto-rows: 1fr; /* 设置所有行的高度为自动填充剩余空间 */
  height: 100%; /* 如果外部有父容器，需要设置高度为100%以填充父容器高度 */
  flex: 1 1 auto;
}

.grid-item {
  overflow-y: auto; /* 如果内容超过单行高度，允许内容出现垂直滚动条 */
}

.grid-item.first {
  grid-column: span 3; /* 第一个盒子占据3列 */
}

.event-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.event-card {
  background: #d0a76b61;
  padding: 12px;
  border-radius: 8px;
}

.deptList {
  gap: 24px;
}

.dept-title {
  align-self: center;
  font-size: 18px;
}

.deptButton {
  padding: 8px 12px;
  background: #d0a76b61;
  align-items: center;
  align-self: center;
  border-radius: 4px;
}
</style>
<style lang="less" scoped>
.table-mom-wrapper {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  border: #0064f075 1px solid;
  overflow: hidden;
  background: transparent;
}

.table-mom-wrapper .table-header {
  margin: 0;
  height: 50px;
  flex: 1;
  list-style: none;
  padding-inline-start: 0;
  border: #0064f075 1px solid;
  background: linear-gradient(180deg, rgb(85 109 255 / 30%), rgb(45 67 139 / 30%), rgb(85 109 255 / 30%));
}

.table-mom-wrapper .table-header li {
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.table-mom-wrapper .table-header li span {
  line-height: 40px;
  flex: 1;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border: rgb(25 137 250 / 34.1%) 1px solid;
}

.table-mom-wrapper .seamless-warp {
  overflow: hidden;
}

.table-mom-wrapper .seamless-warp .list {
  overflow: hidden;
  padding-inline-start: 0;
  margin-block: 0 0;
}

.table-mom-wrapper .seamless-warp .list .devicelistitem {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
  padding-inline-start: 0;
}

.table-mom-wrapper .seamless-warp .list .devicelistitem span {
  overflow: hidden;
  flex: 1;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: 400;
  text-overflow: ellipsis;
  color: #d7def5;
  text-align: center;
  white-space: nowrap;
  border: rgb(25 137 250 / 34.1%) 1px solid;
}

:deep(.t-tag--default) {
  background-color: rgb(48 99 195 / 20%) !important;
  color: white !important;
}

:deep(.t-tag--default .t-tag__icon-close) {
  color: rgb(48 99 195 / 20%) !important;
}
</style>
