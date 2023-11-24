export default [
  {
    path: '/process',
    name: 'process',
    component: () => import('../../pages/process/index.vue'),
    meta: {
      title: {
        zh_CN: '工序',
        en_US: 'process',
      },
      orderNo: 0,
    },
  },
];
