import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/business',
    name: 'business',
    component: () => import('../../pages/business/index.vue'),
    meta: {
      title: {
        'zh-CN': '业务组件例子',
        'en-US': 'bussiness example',
      },
    },
  },
] as Array<RouteRecordRaw>;
