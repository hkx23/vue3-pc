export default [
  {
    path: '/supplier',
    name: 'supplier',
    component: () => import('../../pages/supplier/index.vue'),
    meta: {
      title: {
        zh_CN: '供应商',
        en_US: 'Supplier',
      },
      orderNo: 0,
    },
  },
];
