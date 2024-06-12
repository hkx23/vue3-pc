import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/moInterface',
    name: 'moInterface',
    component: () => import('../../pages/moInterface/index.vue'),
    meta: {
      title: {
        'zh-CN': '需求订单接口',
        'en-US': 'Mo Interface',
      },
    },
  },
] as Array<RouteRecordRaw>;
