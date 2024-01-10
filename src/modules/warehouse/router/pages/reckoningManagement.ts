export default [
  {
    path: '/reckoningManagement',
    name: 'reckoningManagement',
    component: () => import('../../pages/reckoningManagement/index.vue'),
    meta: {
      title: {
        'zh-CN': '盘点管理',
        'en-US': 'reckoningManagement',
      },
      orderNo: 0,
    },
  },
];
