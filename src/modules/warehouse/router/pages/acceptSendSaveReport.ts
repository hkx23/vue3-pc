export default [
  {
    path: '/acceptSendSaveReport',
    name: 'acceptSendSaveReport',
    component: () => import('../../pages/acceptSendSaveReport/index.vue'),
    meta: {
      title: {
        'zh-CN': '收发存报表',
        'en-US': 'acceptSendSaveReport',
      },
      orderNo: 0,
    },
  },
];
