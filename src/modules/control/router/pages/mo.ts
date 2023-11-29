export default [
  {
    path: '/mo',
    name: 'mo',
    component: () => import('../../pages/mo/index.vue'),
    meta: {
      title: {
        'zh-CN': '工单管理',
        'en-US': 'mo',
      },
      orderNo: 0,
    },
  },
];
