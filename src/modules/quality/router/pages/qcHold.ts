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
    path: '/holdList',
    name: 'holdList',
    component: () => import('../../pages/qcHold/holdList.vue'),
    meta: {
      title: {
        'zh-CN': 'Hold单据列表',
        'en-US': 'holdList',
      },
      orderNo: 0,
    },
  },
];
