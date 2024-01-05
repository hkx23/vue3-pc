export default [
  {
    path: '/productionProgress',
    name: 'productionProgress',
    component: () => import('../../pages/productionProgress/index.vue'),
    meta: {
      title: {
        'zh-CN': '生产进度报表',
        'en-US': 'productionProgress',
      },
      orderNo: 0,
    },
  },
];
