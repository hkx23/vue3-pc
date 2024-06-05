<!-- 我的待办-我的工作台 -->
<template>
  <cmp-card v-model:pagination="pageUI" :full="true" height="100%" :title="t('notice.title')">
    <div class="header-msg">
      <t-list v-if="noticeData.length > 0" class="narrow-scrollbar" :split="false">
        <t-list-item v-for="(item, index) in noticeData" :key="index">
          <div style="width: 100%">
            <p class="msg-content ellipsis">{{ item.titleName }}</p>
            <p class="msg-type">{{ item.noticeTypeName }}</p>
          </div>
          <p class="msg-time">{{ item.timeCreate }}</p>
          <template #action>
            <t-button size="small" variant="outline" @click="onHandelNoticeMenu(item)">
              {{ t('notice.detailContent') }}
            </t-button>
          </template>
        </t-list-item>
      </t-list>

      <div v-else class="empty-list">
        <component :is="getEmpty()" />
        <p>{{ $t('layout.notice.empty') }}</p>
      </div>
    </div>
    <template #footer>
      <div style="float: right">
        <t-link theme="primary" size="small" @click="onHandelNoticeMenu">
          {{ t('common.button.more') }}
          <template #suffix-icon>
            <t-icon name="chevron-right"></t-icon>
          </template>
        </t-link>
      </div>
    </template>
  </cmp-card>
</template>

<script setup lang="ts">
// import dayjs from 'dayjs';
import _ from 'lodash';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { api as apiMain } from '@/api/main';
import UserIcon from '@/assets/assets-empty.svg?component';
import { usePage } from '@/hooks/modules/page';

import { useLang } from './lang';

onMounted(() => {
  onFetchData();
});

const getEmpty = () => {
  return UserIcon;
};

const router = useRouter();
const { pageUI } = usePage();
// 查询初始化
const queryCondition = ref({
  title: '',
  datetimeStart: '',
  datetimeEnd: '',
});

const { t } = useLang();

// table数据
const noticeData = ref([]);
// 获取通告列表和通告总数信息
const onFetchData = async () => {
  try {
    // 获取通告列表信息
    pageUI.value.page = 1;
    pageUI.value.rows = 4;
    const res = (await apiMain.notice.list({
      pageNum: pageUI.value.page,
      pageSize: pageUI.value.rows,
      ...queryCondition.value,
    })) as any;
    noticeData.value = res.list;
  } catch (e) {
    console.log(e);
  }
};

// 跳转到我的公告
const onHandelNoticeMenu = async (item: any) => {
  const toDoUrl = `/main#/notice`;
  const tabRouters = router.getRoutes();
  const routeInfo = tabRouters.find((item1) => item1.meta.sourcePath === toDoUrl);
  if (routeInfo) {
    let url = `${routeInfo.path}`;
    if (item && item.id) {
      url += `?id=${item.id}`;
    }
    router.push(url);
  }
};
</script>

<style lang="less" scoped>
.header-msg {
  .empty-list {
    // height: calc(100% - 120px);
    text-align: center;
    padding: var(--td-comp-paddingTB-xxl) 0;
    font: var(--td-font-body-medium);
    color: var(--td-text-color-secondary);

    img {
      width: var(--td-comp-size-xxxxl);
    }

    p {
      margin-top: var(--td-comp-margin-xs);
    }
  }

  &-top {
    position: relative;
    font: var(--td-font-title-medium);
    color: var(--td-text-color-primary);
    text-align: left;
    padding: var(--td-comp-paddingTB-l) var(--td-comp-paddingLR-xl) 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .clear-btn {
      right: calc(var(--td-comp-paddingTB-l) - var(--td-comp-paddingLR-xl));
    }
  }

  &-bottom {
    align-items: center;
    display: flex;
    justify-content: center;
    padding: var(--td-comp-paddingTB-s) var(--td-comp-paddingLR-s);
    border-top: 1px solid var(--td-component-stroke);

    &-link {
      text-decoration: none;
      cursor: pointer;
      color: var(--td-text-color-placeholder);
    }
  }

  .t-list {
    height: calc(100% - 104px);
    padding: var(--td-comp-margin-s) var(--td-comp-margin-xl);
  }

  .ellipsis {
    line-height: var(--td-line-height-body-medium);
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .t-list-item {
    overflow: hidden;
    width: 100%;
    padding: 4px 16px;
    border-radius: var(--td-radius-default);
    font: var(--td-font-body-medium);
    color: var(--td-text-color-primary);
    transition: background-color 0.2s linear;
    background-color: var(--td-bg-color-container-hover);
    margin-bottom: 4px;

    &:hover {
      background-color: var(--td-bg-color-page);
      // background-color: var(--td-bg-color-container-hover);

      .msg-content {
        color: var(--td-brand-color);
      }

      .t-list-item__action {
        button {
          height: 24px;
          bottom: 4px;
          opacity: 1;
          cursor: pointer;
        }
      }

      .msg-time {
        bottom: -7px;
        opacity: 0;
      }
    }

    .msg-content {
      margin-bottom: 4px;
      font-size: 12px;
    }

    .msg-type {
      /** 文本1 */
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0;
      line-height: 17.38px;
      color: var(--td-brand-color);
      text-align: left;
      vertical-align: middle;
      left: 0;
      top: 0;
      width: auto;
      height: 24px;
      opacity: 1;
      border-radius: 4px;
      background: rgb(63 93 237 / 20%);
      display: inline-flex;
      justify-content: left;
      align-items: center;
      padding: 10px 8px;
    }

    .t-list-item__action {
      button {
        opacity: 0;
        position: absolute;
        right: var(--td-comp-margin-xxl);
        bottom: -6px;
      }
    }

    .msg-time {
      color: var(--td-brand-color);
      transition: all 0.2s ease;
      opacity: 1;
      position: absolute;
      right: var(--td-comp-margin-xxl);
      bottom: 4px;
      font-size: 12px;
    }
  }
}

:deep(.t-card__body) {
  padding: 0;
}

.recommend-more {
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 0;
  line-height: 17.38px;
  color: #454545;
  position: absolute;
  bottom: 20px;
  right: 24px;
}

.gray-icon {
  color: rgb(179 179 195);
}

.green-icon {
  color: rgb(2 158 85 / 100%);
}

.card-foot {
  display: block;
}
</style>
