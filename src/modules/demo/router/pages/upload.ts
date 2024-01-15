import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/uploadContent',
    name: 'uploadContent',
    component: () => import('../../pages/uploadContent/index.vue'),
    meta: {
      title: {
        'zh-CN': '上传附件',
        'en-US': 'import demo',
      },
    },
  },
] as Array<RouteRecordRaw>;
