export default [
  {
    path: '/transactionQuery',
    name: 'transactionQuery',
    component: () => import('../../pages/transactionQuery/index.vue'),
    meta: {
      title: {
        'zh-CN': '事务明细查询',
        'en-US': 'transactionQuery',
      },
      orderNo: 0,
    },
  },
  {
    path: '/receiptManagement/:viewType',
    params: { viewType: 'UNLOCK' },
    name: 'receiptManagement',
    component: () => import('../../pages/receiptManagement/index.vue'),
    meta: {
      title: {
        'zh-CN': '单据管理',
        'en-US': 'receiptManagement',
      },
      orderNo: 1,
    },
  },
];
