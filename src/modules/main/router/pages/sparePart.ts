export default [
  {
    path: '/sparePart',
    name: 'sparePart',
    component: () => import('../../pages/sparePart/index.vue'),
    meta: {
      title: {
        zh_CN: '备品备件台账',
        en_US: 'sparePart',
      },
      orderNo: 0,
    },
  },
];
