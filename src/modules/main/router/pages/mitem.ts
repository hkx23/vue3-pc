export default [
  {
    path: '/mitem',
    name: 'mitem',
    component: () => import('../../pages/mitem/index.vue'),
    meta: {
      title: {
        zh_CN: '物料',
        en_US: 'Mitem',
      },
      orderNo: 0,
    },
  },
];
