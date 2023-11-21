export default [
  {
    path: '/tableExample',
    name: 'tableExample',
    component: () => import('@/modules/demo/pages/tableExample/index.vue'),
    meta: {
      title: {
        zh_CN: '业务选择组件例子',
        en_US: 'bussiness example',
      },
    },
  },
];
