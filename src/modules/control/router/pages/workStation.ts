export default [
  {
    path: '/workStation',
    name: 'workStation',
    component: () => import('../../pages/workStation/index.vue'),
    meta: {
      title: {
        'zh-CN': '工站',
        'en-US': 'workStation',
      },
      orderNo: 0,
    },
  },
];
