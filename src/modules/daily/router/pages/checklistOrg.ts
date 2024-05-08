export default [
  {
    path: '/checklistOrg',
    name: 'checklistOrg',
    component: () => import('../../pages/checklistOrg/index.vue'),
    meta: {
      title: {
        zh_CN: '点检清单分配',
        en_US: 'checklistOrg',
      },
      orderNo: 0,
    },
  },
];
