import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/passTemplate',
    name: 'passTemplate',
    component: () => import('../../pages/passTemplate/index.vue'),
    meta: {
      title: {
        'zh-CN': '过站模板',
        'en-US': 'Pass Template',
      },
      orderNo: 0,
    },
  },
] as Array<RouteRecordRaw>;
