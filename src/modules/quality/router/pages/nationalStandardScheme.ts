export default [
  {
    path: '/nationalStandardScheme',
    name: 'nationalStandardScheme',
    component: () => import('../../pages/nationalStandardScheme/index.vue'),
    meta: {
      title: {
        'zh-CN': '国标抽样方案',
        'en-US': 'nationalStandardScheme',
      },
      orderNo: 0,
    },
  },
];
