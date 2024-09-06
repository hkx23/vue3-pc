export default [
  {
    path: '/equipmentRepairBill',
    name: 'equipmentRepairBill',
    component: () => import('../../pages/equipmentRepairBill/index.vue'),
    meta: {
      title: {
        'zh-CN': '设备维修单据',
        'en-US': 'equipmentRepairBill',
      },
      orderNo: 0,
    },
  },
];
