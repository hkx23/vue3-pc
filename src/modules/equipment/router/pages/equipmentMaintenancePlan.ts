export default [
  {
    path: '/equipmentMaintenancePlan',
    name: 'equipmentMaintenancePlan',
    component: () => import('../../pages/equipmentMaintenancePlan/index.vue'),
    meta: {
      title: {
        'zh-CN': '设备保养计划',
        'en-US': 'equipmentMaintenancePlan',
      },
      orderNo: 0,
    },
  },
];
