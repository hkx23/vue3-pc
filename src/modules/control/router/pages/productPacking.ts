export default [
  {
    path: '/productPacking',
    name: 'productPacking',
    component: () => import('../../pages/productPacking/index.vue'),
    meta: {
      title: {
        'zh-CN': '产品装箱',
        'en-US': 'productPacking',
      },
      orderNo: 0,
    },
  },
];
