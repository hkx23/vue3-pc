export default [
  {
    path: '/qualityImprove',
    name: 'qualityImprove',
    component: () => import('../../pages/qualityImprove/index.vue'),
    meta: {
      title: {
        'zh-CN': '品质改善',
        'en-US': 'qualityImprove',
      },
      orderNo: 0,
    },
  },
];
