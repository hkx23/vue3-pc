export default [
  {
    path: '/sopFileShow',
    name: 'sopFileShow',
    component: () => import('../../pages/sopFileShow/index.vue'),
    meta: {
      title: {
        'zh-CN': '工艺文件展示',
        'en-US': 'sopFileShow',
      },
      orderNo: 0,
    },
  },
];
