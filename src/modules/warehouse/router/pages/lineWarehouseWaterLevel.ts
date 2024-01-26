export default [
  {
    path: '/lineWarehouseWaterLevel',
    name: 'lineWarehouseWaterLevel',
    component: () => import('../../pages/lineWarehouseWaterLevel/index.vue'),
    meta: {
      title: {
        'zh-CN': '线边仓水位',
        'en-US': 'lineWarehouseWaterLevel',
      },
      orderNo: 0,
    },
  },
];
