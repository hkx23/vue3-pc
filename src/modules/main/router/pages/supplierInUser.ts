export default [
  {
    path: '/supplierInUser',
    name: 'supplierInUser',
    component: () => import('../../pages/supplierInUser/index.vue'),
    meta: {
      title: {
        zh_CN: '供应商与用户关系',
        en_US: 'supplierInUser',
      },
      orderNo: 0,
    },
  },
];
