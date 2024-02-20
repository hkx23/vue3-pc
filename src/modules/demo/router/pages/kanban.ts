import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/kanban',
    name: 'kanban',
    component: () => import('../../pages/kanban/index.vue'),
    meta: {
      title: {
        'zh-CN': '基础看板布局示例',
        'en-US': 'basic kanban demo',
      },
    },
  },
] as Array<RouteRecordRaw>;
