export default [
  {
    path: '/paramGroup',
    name: 'paramGroup',
    component: () => import('../../pages/paramGroup/index.vue'),
    meta: {
      title: {
        zh_CN: '系统字典',
        en_US: 'paramGroup',
      },
      orderNo: 0,
    },
  },
];
