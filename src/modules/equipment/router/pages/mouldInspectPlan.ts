export default [
  {
    path: '/mouldInspectPlan',
    name: 'mouldInspectPlan',
    component: () => import('../../pages/mouldInspectPlan/index.vue'),
    meta: {
      title: {
        zh_CN: '模具点检计划',
        en_US: 'mouldInspectPlan',
      },
      orderNo: 0,
    },
  },
];
