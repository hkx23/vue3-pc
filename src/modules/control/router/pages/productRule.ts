export default [
  {
    path: '/productRule',
    name: 'productRule',
    component: () => import('../../pages/productRule/index.vue'),
    meta: {
      title: {
        zh_CN: '产品包装规则',
        en_US: 'productRule',
      },
      orderNo: 0,
    },
  },
];
