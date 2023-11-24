import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/basic',
    name: 'basic',
    component: () => import('../../pages/basic/index.vue'),
    meta: {
      title: {
        zh_CN: '基础示例',
        en_US: 'basic demo',
      },
    },
    children: [
      {
        path: 'page1',
        name: 'page1',
        component: () => import('../../pages/basic/page1.vue'),
      },
      {
        path: 'page2',
        name: 'page2',
        component: () => import('../../pages/basic/page2.vue'),
      },
    ],
  },
] as Array<RouteRecordRaw>;
