export default [
  {
    path: '/mitemRecheck',
    name: 'mitemRecheck',
    component: () => import('../../pages/mitemRecheck/index.vue'),
    meta: {
      title: {
        'zh-CN': '物料复检',
        'en-US': 'mitemRecheck',
      },
      orderNo: 0,
    },
  },
];
