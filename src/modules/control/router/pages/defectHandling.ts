export default [
  {
    path: '/defecthandling',
    name: 'defecthandling',
    component: () => import('../../pages/defectHandling/index.vue'),
    meta: {
      title: {
        zh_CN: '缺陷处理',
        en_US: 'defecthandling',
      },
      orderNo: 0,
    },
  },
];
