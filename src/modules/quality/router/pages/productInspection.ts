export default [
  {
    path: '/productInspection',
    name: 'productInspection',
    component: () => import('../../pages/productInspection/index.vue'),
    meta: {
      title: {
        'zh-CN': '产品检验',
        'en-US': 'productInspection',
      },
      orderNo: 0,
    },
  },
];
