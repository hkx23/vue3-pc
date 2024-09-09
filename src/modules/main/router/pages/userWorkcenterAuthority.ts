export default [
  {
    path: '/userWorkcenterAuthority',
    name: 'userWorkcenterAuthority',
    component: () => import('../../pages/userWorkcenterAuthority/index.vue'),
    meta: {
      title: {
        'zh-CN': '用户工作中心权限',
        'en-US': 'userWorkcenterAuthority',
      },
      orderNo: 0,
    },
  },
  {
    path: '/permissionAllocation',
    name: 'permissionAllocation',
    component: () => import('../../pages/userWorkcenterAuthority/permissionAllocation.vue'),
    meta: {
      title: {
        'zh-CN': '用户工作中心权限',
        'en-US': 'permissionAllocation',
      },
      orderNo: 0,
    },
  },
];
