export default [
  {
    path: '/equipmentEnergyConsumptionBoard',
    name: 'equipmentEnergyConsumptionBoard',
    component: () => import('../../pages/equipmentEnergyConsumptionBoard/index.vue'),
    meta: {
      title: {
        zh_CN: '能耗设备监控看板',
        en_US: 'equipmentEnergyConsumptionBoard',
      },
      orderNo: 0,
    },
  },
];
