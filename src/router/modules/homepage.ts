import { DashboardIcon } from 'tdesign-icons-vue-next';
import { shallowRef } from 'vue';

import Layout from '@/layouts/index.vue';

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: {
      title: {
        'zh-CN': '工作台',
        'en-US': 'Dashboard',
      },
      icon: shallowRef(DashboardIcon),
      orderNo: 0,
    },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/pages/dashboard/index.vue'),
        meta: {
          title: {
            'zh-CN': '工作台',
            'en-US': 'Workbenches',
          },
        },
      },
      // {
      //   path: 'detail',
      //   name: 'DashboardDetail',
      //   component: () => import('@/pages/dashboard/detail/index.vue'),
      //   meta: {
      //     title: {
      //       'zh-CN': '统计报表',
      //       'en-US': 'Dashboard Detail',
      //     },
      //   },
      // },
      // {
      //   path: 'table',
      //   name: 'table',
      //   component: () => import('@/modules/demo/pages/tableExample/index.vue'),
      //   meta: {
      //     title: {
      //       "zh-CN": '表格测试',
      //       "en-US": 'Dashboard Detail',
      //     },
      //   },
      // },
    ],
  },
];
