import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/kanbanDefault',
    name: 'kanbanDefault',
    component: () => import('../../pages/kanbanDefault/index.vue'),
    meta: {
      title: {
        'zh-CN': '基础看板布局示例',
        'en-US': 'basic kanban demo',
      },
    },
  },
] as Array<RouteRecordRaw>;
