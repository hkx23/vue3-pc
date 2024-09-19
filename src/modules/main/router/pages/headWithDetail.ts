export default [
  {
    path: '/headWithDetail',
    name: 'headWithDetail',
    component: () => import('../../pages/domainParam/domainTemplate/headWithDetail.vue'),
    meta: {
      title: {
        'zh-CN': '配置化功能-主从列表',
        'en-US': 'headWithDetail',
      },
      orderNo: 0,
    },
  },
];
