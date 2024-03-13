export default [
  {
    path: '/orgLevel',
    name: 'OrgLevel',
    component: () => import('../../pages/orgLevel/index.vue'),
    meta: {
      title: {
        'zh-CN': '组织层级',
        'en-US': 'Organizational Level',
      },
      orderNo: 0,
    },
  },
];
