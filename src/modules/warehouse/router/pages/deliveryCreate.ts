export default [
  {
    path: '/deliveryCreate',
    name: 'deliveryCreate',
    component: () => import('../../pages/deliveryCreate/index.vue'),
    meta: {
      title: {
        'zh-CN': '送货单生成',
        'en-US': 'delivery',
      },
      orderNo: 0,
    },
  },
];
