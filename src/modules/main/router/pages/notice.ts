export default [
  {
    path: '/notice',
    name: 'notice',
    component: () => import('../../pages/notice/index.vue'),
    meta: {
      title: {
        'zh-CN': '公告',
        'en-US': 'Notice',
      },
      orderNo: 0,
    },
  },
];
