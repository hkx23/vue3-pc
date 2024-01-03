import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/import',
    name: 'import',
    component: () => import('../../pages/import/index.vue'),
    meta: {
      title: {
        'zh-CN': '导入示例',
        'en-US': 'import demo',
      },
    },
  },
] as Array<RouteRecordRaw>;
