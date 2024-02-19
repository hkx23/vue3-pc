export default [
  {
    path: '/lineWarehouseWaterLevelBoard',
    name: 'lineWarehouseWaterLevelBoard',
    component: () => import('../../pages/lineWarehouseWaterLevelBoard/index.vue'),
    meta: {
      title: {
        'zh-CN': '收发存报表',
        'en-US': 'lineWarehouseWaterLevelBoard',
      },
      orderNo: 0,
    },
  },
];
