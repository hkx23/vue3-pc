export default [
  {
    path: '/districtInMitem',
    name: 'districtInMitem',
    component: () => import('../../pages/districtInMitem/index.vue'),
    meta: {
      title: {
        zh_CN: '货区与物料维护',
        en_US: 'districtInMitem',
      },
      orderNo: 0,
    },
  },
];
