export default [
  {
    path: '/miscellaneousManage',
    name: 'miscellaneousManage',
    component: () => import('../../pages/miscellaneousManage/index.vue'),
    meta: {
      title: {
        'zh-CN': '杂项管理',
        'en-US': 'miscellaneousManage',
      },
      orderNo: 0,
    },
  },
];
