export default [
  {
    path: '/sparePart',
    name: 'sparePart',
    component: () => import('../../pages/sparePart/index.vue'),
    meta: {
      title: {
        'zh-CN': '备品备件台账',
        'en-US': 'sparePart',
      },
      orderNo: 0,
    },
  },
];
