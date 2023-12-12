import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../../pages/layout/index.vue'),
    meta: {
      title: {
        'zh-CN': '基础布局示例',
        'en-US': 'basic layout demo',
      },
    },
  },
] as Array<RouteRecordRaw>;
