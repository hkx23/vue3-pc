export default [
  {
    path: '/productionReporting',
    name: 'ProductionReporting',
    component: () => import('../../pages/productionReporting/index.vue'),
    meta: {
      title: {
        'zh-CN': '生产报工',
        'en-US': 'productionReporting',
      },
      orderNo: 0,
    },
  },
];
