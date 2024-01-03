export default [
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../../pages/todo/index.vue'),
    meta: {
      title: {
        'zh-CN': '我的待办',
        'en-US': 'My Todo List',
      },
      orderNo: 0,
    },
  },
];
