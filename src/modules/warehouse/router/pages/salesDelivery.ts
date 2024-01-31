export default [
  {
    path: '/salesDelivery',
    name: 'salesDelivery',
    component: () => import('../../pages/salesDelivery/index.vue'),
    meta: {
      title: {
        'zh-CN': '销售发货',
        'en-US': 'salesDelivery',
      },
      orderNo: 0,
    },
  },
];
