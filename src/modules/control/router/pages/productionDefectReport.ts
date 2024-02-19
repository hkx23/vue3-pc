export default [
  {
    path: '/productionDefectReport',
    name: 'productionDefectReport',
    component: () => import('../../pages/productionDefectReport/index.vue'),
    meta: {
      title: {
        'zh-CN': '生产缺陷不良统计报表',
        'en-US': 'productionDefectReport',
      },
      orderNo: 0,
    },
  },
];
