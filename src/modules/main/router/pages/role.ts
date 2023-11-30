export default [
  {
    path: '/role',
    name: 'role',
    component: () => import('../../pages/role/index.vue'),
    meta: {
      title: {
        'zh-CN': '角色',
        'en-US': 'Role',
      },
      orderNo: 0,
    },
  },
];
