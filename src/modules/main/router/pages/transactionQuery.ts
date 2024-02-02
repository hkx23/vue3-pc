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
];
