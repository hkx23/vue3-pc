export default [
  {
    path: '/query',
    name: 'query',
    component: () => import('../../pages/query/index.vue'),
    meta: {
      title: {
        zh_CN: '查询组件例子',
        en_US: 'query example',
      },
    },
  },
];
