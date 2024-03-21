import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/gantt',
    name: 'gantt',
    component: () => import('../../pages/gantt/index.vue'),
    meta: {
      title: {
        'zh-CN': '甘特图组件例子',
        'en-US': 'gantt example',
      },
    },
  },
] as Array<RouteRecordRaw>;
