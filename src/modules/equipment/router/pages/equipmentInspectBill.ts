export default [
  {
    path: '/equipmentInspectBill',
    name: 'equipmentInspectBill',
    component: () => import('../../pages/equipmentInspectBill/index.vue'),
    meta: {
      title: {
        zh_CN: '设备点检单据',
        en_US: 'equipmentInspectBill',
      },
      orderNo: 0,
    },
  },
];
