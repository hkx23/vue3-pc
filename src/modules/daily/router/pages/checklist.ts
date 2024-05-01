export default [
  {
    path: '/checklist',
    name: 'checklist',
    component: () => import('../../pages/checklist/index.vue'),
    meta: {
      title: {
        zh_CN: '点检清单',
        en_US: 'checklist',
      },
      orderNo: 0,
    },
  },
];
