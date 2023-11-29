export default [
  {
    path: '/supplier',
    name: 'supplier',
    component: () => import('../../pages/supplier/index.vue'),
    meta: {
      title: {
        'zh-CN': '供应商',
        'en-US': 'Supplier',
      },
      orderNo: 0,
    },
  },
];
