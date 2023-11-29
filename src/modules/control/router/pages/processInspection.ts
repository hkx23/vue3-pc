export default [
  {
    path: '/processInspection',
    name: 'processInspection',
    component: () => import('../../pages/processInspection/index.vue'),
    meta: {
      title: {
        'zh-CN': '工序检验',
        'en-US': 'processInspection',
      },
      orderNo: 0,
    },
  },
];
