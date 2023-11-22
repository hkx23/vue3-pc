export default [
  {
    path: '/workStation',
    name: 'workStation',
    component: () => import('../../pages/workStation/index.vue'),
    meta: {
      title: {
        zh_CN: '工站',
        en_US: 'workStation',
      },
      orderNo: 0,
    },
  },
];
