export default [
  {
    path: '/mitemInSupplier',
    name: 'mitemInSupplier',
    component: () => import('../../pages/mitemInSupplier/index.vue'),
    meta: {
      title: {
        zh_CN: '物料与供应商关系',
        en_US: 'Mitem In Supplier',
      },
      orderNo: 0,
    },
  },
];
