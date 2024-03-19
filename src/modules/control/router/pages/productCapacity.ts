export default [
  {
    path: '/productCapacity',
    name: 'ProductCapacity',
    component: () => import('../../pages/productCapacity/index.vue'),
    meta: {
      title: {
        'zh-CN': '生产经济批量配置',
        'en-US': 'productCapacity',
      },
      orderNo: 0,
    },
  },
];
