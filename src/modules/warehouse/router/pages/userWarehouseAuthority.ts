export default [
  {
    path: '/userWarehouseAuthority',
    name: 'userWarehouseAuthority',
    component: () => import('../../pages/userWarehouseAuthority/index.vue'),
    meta: {
      title: {
        'zh-CN': '用户仓库权限',
        'en-US': 'userWarehouseAuthority',
      },
      orderNo: 0,
    },
  },
  {
    path: '/permissionAllocation',
    name: 'permissionAllocation',
    component: () => import('../../pages/userWarehouseAuthority/permissionAllocation.vue'),
    meta: {
      title: {
        'zh-CN': '用户仓库权限',
        'en-US': 'permissionAllocation',
      },
      orderNo: 0,
    },
  },
];
