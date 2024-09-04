export default [
  {
    path: '/equipmentRepairItem',
    name: 'equipmentRepairItem',
    component: () => import('../../pages/equipmentRepairItem/index.vue'),
    meta: {
      title: {
        'zh-CN': '设备维修项目',
        'en-US': 'equipmentRepairItem',
      },
      orderNo: 0,
    },
  },
];
