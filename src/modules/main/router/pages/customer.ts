export default [
  {
    path: '/customer',
    name: 'customer',
    component: () => import('../../pages/customer/index.vue'),
    meta: {
      title: {
        zh_CN: '客户信息',
        en_US: 'customer',
      },
      orderNo: 0,
    },
  },
];
