export default [
  {
    path: '/person',
    name: 'person',
    component: () => import('../../pages/person/index.vue'),
    meta: {
      title: {
        zh_CN: '员工',
        en_US: 'Person',
      },
      orderNo: 0,
    },
  },
];
