export default [
  {
    path: '/extend',
    name: 'extend',
    component: () => import('../../pages/extend/index.vue'),
    meta: {
      title: {
        'zh-CN': '扩展属性例子',
        'en-US': 'extend example',
      },
    },
  },
];
