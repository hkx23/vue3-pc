export default [
  {
    path: '/customer',
    name: 'customer',
    component: () => import('../../pages/customer/index.vue'),
    meta: {
      title: {
        'zh-CN': '客户信息',
        'en-US': 'customer',
      },
      orderNo: 0,
    },
  },
];
