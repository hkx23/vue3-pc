export default [
  {
    path: '/mouldInspectItem',
    name: 'mouldInspectItem',
    component: () => import('../../pages/mouldInspectItem/index.vue'),
    meta: {
      title: {
        zh_CN: '模具点检项目',
        en_US: 'mouldInspectItem',
      },
      orderNo: 0,
    },
  },
];
