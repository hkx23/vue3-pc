import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/basic',
    name: 'basic',
    component: () => import('../../pages/basic/index.vue'),
    meta: {
      title: {
        'zh-CN': '基础示例',
        'en-US': 'basic demo',
      },
    },
    children: [
      {
        path: 'page1/:id',
        name: 'page1',
        props: true,
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
