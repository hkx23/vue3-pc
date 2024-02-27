export default [
  {
    path: '/workStationPermission',
    name: 'workStationPermission',
    component: () => import('../../pages/workStationPermission/index.vue'),
    meta: {
      title: {
        'zh-CN': '工作中心',
        'en-US': 'workStationPermission',
      },
      orderNo: 0,
    },
  },
];
