export default [
  {
    path: '/Workgroup',
    name: 'Workgroup',
    component: () => import('../../pages/Workgroup/index.vue'),
    meta: {
      title: {
        'zh-CN': '班组信息',
        'en-US': 'Workgroup',
      },
      orderNo: 0,
    },
  },
];
