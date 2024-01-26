export default [
  {
    path: '/lineWarehouse',
    name: 'lineWarehouse',
    component: () => import('../../pages/lineWarehouse/index.vue'),
    meta: {
      title: {
        'zh-CN': '线边仓',
        'en-US': 'lineWarehouse',
      },
      orderNo: 0,
    },
  },
];
