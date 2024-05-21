export default [
  {
    path: '/checkBill',
    name: 'checkBill',
    component: () => import('../../pages/checkBill/index.vue'),
    meta: {
      title: {
        zh_CN: '点检单据',
        en_US: 'checkBill',
      },
      orderNo: 0,
    },
  },
];
