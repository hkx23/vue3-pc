export default [
  {
    path: '/returnManagement',
    name: 'returnManagement',
    component: () => import('../../pages/returnManagement/index.vue'),
    meta: {
      title: {
        'zh-CN': '退货管理',
        'en-US': 'returnManagement',
      },
      orderNo: 0,
    },
  },
];
