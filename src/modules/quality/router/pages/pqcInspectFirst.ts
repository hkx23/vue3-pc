export default [
  {
    path: '/pqcInspectFirst',
    name: 'pqcInspectFirst',
    component: () => import('../../pages/pqcInspectFirst/index.vue'),
    meta: {
      title: {
        'zh-CN': '首末检查询',
        'en-US': 'pqcInspectFirst',
      },
      orderNo: 0,
    },
  },
];
