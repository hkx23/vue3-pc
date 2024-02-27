export default [
  {
    path: '/mitemIncomingInspection',
    name: 'mitemIncomingInspection',
    component: () => import('../../pages/mitemIncomingInspection/index.vue'),
    meta: {
      title: {
        'zh-CN': '物料入厂检验',
        'en-US': 'mitemIncomingInspection',
      },
      orderNo: 0,
    },
  },
];
