export default [
  {
    path: '/mouldManage',
    name: 'mouldManage',
    component: () => import('../../pages/mouldManage/index.vue'),
    meta: {
      title: {
        'zh-CN': '模具台账',
        'en-US': 'mouldManage',
      },
      orderNo: 0,
    },
  },
];
