export default [
  {
    path: '/equipmentInspectItem',
    name: 'equipmentInspectItem',
    component: () => import('../../pages/equipmentInspectItem/index.vue'),
    meta: {
      title: {
        zh_CN: '设备点检项目',
        en_US: 'equipmentInspectItem',
      },
      orderNo: 0,
    },
  },
];
