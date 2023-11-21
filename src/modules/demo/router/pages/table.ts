export default [
  {
    path: '/table',
    name: 'table',
    component: () => import('../../pages/table/index.vue'),
    meta: {
      title: {
        zh_CN: '业务选择组件例子',
        en_US: 'bussiness example',
      },
    },
  },
];
