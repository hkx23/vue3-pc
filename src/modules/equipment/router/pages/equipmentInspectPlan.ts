export default [
  {
    path: '/equipmentInspectPlan',
    name: 'equipmentInspectPlan',
    component: () => import('../../pages/equipmentInspectPlan/index.vue'),
    meta: {
      title: {
        zh_CN: '模具点检计划',
        en_US: 'equipmentInspectPlan',
      },
      orderNo: 0,
    },
  },
];
