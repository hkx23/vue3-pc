import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/importAuto',
    name: 'importAuto',
    component: () => import('../../pages/importAuto/index.vue'),
    meta: {
      title: {
        'zh-CN': '配置导入示例',
        'en-US': 'import demo',
      },
    },
  },
] as Array<RouteRecordRaw>;
