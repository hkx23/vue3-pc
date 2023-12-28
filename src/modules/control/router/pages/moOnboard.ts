export default [
  {
    path: '/moOnboard',
    name: 'moOnboard',
    component: () => import('../../pages/moOnboard/index.vue'),
    meta: {
      title: {
        'zh-CN': '工单投料报表',
        'en-US': 'moOnboard',
      },
      orderNo: 0,
    },
  },
];
