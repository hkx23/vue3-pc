export default [
  {
    path: '/query',
    name: 'query',
    component: () => import('../../pages/query/index.vue'),
    meta: {
      title: {
        'zh-CN': '查询组件例子',
        'en-US': 'query example',
      },
    },
  },
];
