export default [
  {
    path: '/oqcInspectStd',
    name: 'oqcInspectStd',
    component: () => import('../../pages/oqcInspectStd/index.vue'),
    meta: {
      title: {
        'zh-CN': '产品检验标准',
        'en-US': 'oqcInspectStd',
      },
      orderNo: 0,
    },
  },
];
