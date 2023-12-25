export default [
  {
    path: '/location',
    name: 'location',
    component: () => import('../../pages/location/index.vue'),
    meta: {
      title: {
        'zh-CN': '货位',
        'en-US': 'location',
      },
      orderNo: 0,
    },
  },
];
