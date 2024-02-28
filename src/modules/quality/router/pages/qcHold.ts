export default [
  {
    path: '/qcHold',
    name: 'qcHold',
    component: () => import('../../pages/qcHold/index.vue'),
    meta: {
      title: {
        'zh-CN': '品质控制',
        'en-US': 'qcHold',
      },
      orderNo: 0,
    },
  },
  {
    path: '/holdList/:viewType',
    params: { viewType: 'UNLOCK' },
    name: 'holdList',
    component: () => import('../../pages/qcHold/holdList.vue'),
    meta: {
      title: {
        'zh-CN': 'Hold单据列表',
        'en-US': 'holdList',
      },
      orderNo: 1,
    },
  },
  {
    path: '/holdListView/:viewType',
    params: { viewType: 'VIEW' },
    name: 'holdListView',
    component: () => import('../../pages/qcHold/holdList.vue'),
    meta: {
      title: {
        'zh-CN': 'Hold单据日志',
        'en-US': 'holdListView',
      },
      orderNo: 2,
    },
  },
];
