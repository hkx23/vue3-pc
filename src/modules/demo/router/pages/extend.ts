export default [
  {
    path: '/extend',
    name: 'extend',
    component: () => import('../../pages/extend/index.vue'),
    meta: {
      title: {
        zh_CN: '扩展属性例子',
        en_US: 'extend example',
      },
    },
  },
];
