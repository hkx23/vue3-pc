export default [
  {
    path: '/equipmentMaintenanceBill',
    name: 'equipmentMaintenanceBill',
    component: () => import('../../pages/equipmentMaintenanceBill/index.vue'),
    meta: {
      title: {
        'zh-CN': '设备保养单据',
        'en-US': 'equipmentMaintenanceBill',
      },
      orderNo: 0,
    },
  },
];
