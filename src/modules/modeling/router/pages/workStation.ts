export default [
  {
    path: '/workstation',
    name: 'workstation',
    component: () => import('../../pages/workStation/index.vue'),
    meta: {
      title: {
        zh_CN: '工站',
        en_US: 'workstation',
      },
      orderNo: 0,
    },
  },
];
