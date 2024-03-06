export default [
  {
    path: '/productRule',
    name: 'productRule',
    component: () => import('../../pages/productRule/index.vue'),
    meta: {
      title: {
        'zh-CN': '产品包装规则',
        'en-US': 'productRule',
      },
      orderNo: 0,
    },
  },
];
