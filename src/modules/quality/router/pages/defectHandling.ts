export default [
  {
    path: '/defectHandling',
    name: 'defectHandling',
    component: () => import('../../pages/defectHandling/index.vue'),
    meta: {
      title: {
        zh_CN: '缺陷处理',
        en_US: 'defectHandling',
      },
      orderNo: 0,
    },
  },
];
