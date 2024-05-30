export default [
  {
    path: '/locationInMitem',
    name: 'locationInMitem',
    component: () => import('../../pages/locationInMitem/index.vue'),
    meta: {
      title: {
        zh_CN: '货位与物料维护',
        en_US: 'locationInMitem',
      },
      orderNo: 0,
    },
  },
];
