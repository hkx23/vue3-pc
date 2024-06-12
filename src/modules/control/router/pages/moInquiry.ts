import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/moInquiry',
    name: 'moInquiry',
    component: () => import('../../pages/moInquiry/index.vue'),
    meta: {
      title: {
        'zh-CN': '订单问询',
        'en-US': 'Mo Inquiry',
      },
    },
  },
] as Array<RouteRecordRaw>;
