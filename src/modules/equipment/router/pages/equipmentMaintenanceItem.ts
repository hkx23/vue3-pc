export default [
  {
    path: '/equipmentMaintenanceItem',
    name: 'equipmentMaintenanceItem',
    component: () => import('../../pages/equipmentMaintenanceItem/index.vue'),
    meta: {
      title: {
        'zh-CN': '设备保养项目',
        'en-US': 'equipmentMaintenanceItem',
      },
      orderNo: 0,
    },
  },
];
