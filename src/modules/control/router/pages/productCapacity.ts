export default [
  {
    path: '/productCapacity',
    name: 'ProductCapacity',
    component: () => import('../../pages/productCapacity/index.vue'),
    meta: {
      title: {
        'zh-CN': '产能型谱',
        'en-US': 'productCapacity',
      },
      orderNo: 0,
    },
  },
];
