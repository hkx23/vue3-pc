export default [
  {
    path: '/productRepair',
    name: 'productRepair',
    component: () => import('../../pages/productRepair/index.vue'),
    meta: {
      title: {
        'zh-CN': '产品返工',
        'en-US': 'productRepair',
      },
      orderNo: 0,
    },
  },
];
