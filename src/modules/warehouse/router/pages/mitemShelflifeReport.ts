export default [
  {
    path: '/mitemShelflifeReport',
    name: 'mitemShelflifeReport',
    component: () => import('../../pages/mitemShelflifeReport/index.vue'),
    meta: {
      title: {
        'zh-CN': '物料保质期报表',
        'en-US': 'mitemShelflifeReport',
      },
      orderNo: 0,
    },
  },
];
