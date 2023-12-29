export default [
  {
    path: '/reverseTraceabilityCriticalMaterials',
    name: 'reverseTraceabilityCriticalMaterials',
    component: () => import('../../pages/reverseTraceabilityCriticalMaterials/index.vue'),
    meta: {
      title: {
        'zh-CN': '关键物料反向追溯',
        'en-US': 'reverseTraceabilityCriticalMaterials',
      },
      orderNo: 0,
    },
  },
];
