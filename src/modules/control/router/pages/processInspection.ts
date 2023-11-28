export default [
  {
    path: '/processInspection',
    name: 'processInspection',
    component: () => import('../../pages/processInspection/index.vue'),
    meta: {
      title: {
        zh_CN: '工序检验',
        en_US: 'processInspection',
      },
      orderNo: 0,
    },
  },
];
