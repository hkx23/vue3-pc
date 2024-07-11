export default [
  {
    path: '/singleTableManage',
    name: 'singleTableManage',
    component: () => import('../../pages/domainParam/domainTemplate/singleTableManage.vue'),
    meta: {
      title: {
        'zh-CN': '配置化功能-单表维护',
        'en-US': 'singleTableManage',
      },
      orderNo: 0,
    },
  },
];
