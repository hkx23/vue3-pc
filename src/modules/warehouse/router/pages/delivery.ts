export default [
  {
    path: '/delivery',
    name: 'delivery',
    component: () => import('../../pages/delivery/index.vue'),
    meta: {
      title: {
        'zh-CN': '送货单查询',
        'en-US': 'delivery',
      },
      orderNo: 0,
    },
  },
];
