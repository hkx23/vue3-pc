export default [
  {
    path: '/deliveryCard',
    name: 'deliveryCard',
    component: () => import('../../pages/deliveryCard/index.vue'),
    meta: {
      title: {
        'zh-CN': '配送卡管理',
        'en-US': 'deliveryCard',
      },
      orderNo: 0,
    },
  },
];
