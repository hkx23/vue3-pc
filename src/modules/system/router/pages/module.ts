export default [
  {
    path: '/module',
    name: 'module',
    component: () => import('../../pages/module/index.vue'),
    meta: {
      title: {
        zh_CN: '',
        en_US: 'module',
      },
      orderNo: 0,
    },
  },
];
