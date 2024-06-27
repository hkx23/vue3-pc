import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/flow',
    name: 'flow',
    component: () => import('../../pages/flow/index.vue'),
    meta: {
      title: {
        'zh-CN': '流程配置',
        'en-US': 'flow config',
      },
    },
  },
] as Array<RouteRecordRaw>;
