export default [
  {
    path: '/productionScheduling',
    name: 'productionScheduling',
    component: () => import('../../pages/productionScheduling/index.vue'),
    meta: {
      title: {
        'zh-CN': '排产平台',
        'en-US': 'Production Scheduling',
      },
      orderNo: 0,
    },
  },
];
