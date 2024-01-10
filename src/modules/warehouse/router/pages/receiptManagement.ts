export default [
  {
    path: '/receiptManagement',
    name: 'receiptManagement',
    component: () => import('../../pages/receiptManagement/index.vue'),
    meta: {
      title: {
        'zh-CN': '单据管理',
        'en-US': 'receiptManagement',
      },
      orderNo: 0,
    },
  },
];
