export default [
  {
    path: '/allocation',
    name: 'allocation',
    component: () => import('../../pages/allocation/index.vue'),
    meta: {
      title: {
        'zh-CN': '调拨制单',
        'en-US': 'allocation',
      },
      orderNo: 0,
    },
  },
];
