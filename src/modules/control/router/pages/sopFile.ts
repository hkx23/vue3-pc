export default [
  {
    path: '/sopFile',
    name: 'sopFile',
    component: () => import('../../pages/sopFile/index.vue'),
    meta: {
      title: {
        'zh-CN': '工艺文件管理',
        'en-US': 'sopFile',
      },
      orderNo: 0,
    },
  },
];
