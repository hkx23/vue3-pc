export default [
  {
    path: '/district',
    name: 'district',
    component: () => import('../../pages/district/index.vue'),
    meta: {
      title: {
        'zh-CN': '货区',
        'en-US': 'district',
      },
      orderNo: 0,
    },
  },
];
