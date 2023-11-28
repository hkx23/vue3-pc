export default [
  {
    path: '/person',
    name: 'person',
    component: () => import('../../pages/person/index.vue'),
    meta: {
      title: {
        'zh-CN': '员工',
        'en-US': 'Person',
      },
      orderNo: 0,
    },
  },
];
