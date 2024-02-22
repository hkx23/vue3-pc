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
];
