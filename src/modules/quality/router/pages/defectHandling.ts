export default [
  {
    path: '/defectHandling',
    name: 'defectHandling',
    component: () => import('../../pages/defectHandling/index.vue'),
    meta: {
      title: {
        'zh-CN': '缺陷处理',
        'en-US': 'defectHandling',
      },
      orderNo: 0,
    },
  },
];
