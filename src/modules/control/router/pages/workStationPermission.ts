export default [
  {
    path: '/workStationPermission',
    name: 'workStationPermission',
    component: () => import('../../pages/workStationPermission/index.vue'),
    meta: {
      title: {
        zh_CN: '工作中心',
        en_US: 'workStationPermission',
      },
      orderNo: 0,
    },
  },
];
