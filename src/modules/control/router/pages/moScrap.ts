export default [
  {
    path: '/moScrap',
    name: 'moScrap',
    component: () => import('../../pages/moScrap/index.vue'),
    meta: {
      title: {
        'zh-CN': '工单报废',
        'en-US': 'moScrap',
      },
      orderNo: 0,
    },
  },
];
