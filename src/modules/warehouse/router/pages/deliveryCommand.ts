export default [
  {
    path: '/deliveryCommand',
    name: 'deliveryCommand',
    component: () => import('../../pages/deliveryCommand/index.vue'),
    meta: {
      title: {
        'zh-CN': '配送卡指令',
        'en-US': 'deliveryCommand',
      },
      orderNo: 0,
    },
  },
];
