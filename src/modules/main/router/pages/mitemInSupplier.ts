export default [
  {
    path: '/mitemInSupplier',
    name: 'mitemInSupplier',
    component: () => import('../../pages/mitemInSupplier/index.vue'),
    meta: {
      title: {
        'zh-CN': '物料与供应商关系',
        'en-US': 'Mitem In Supplier',
      },
      orderNo: 0,
    },
  },
];
